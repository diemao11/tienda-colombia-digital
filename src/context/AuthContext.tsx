
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User & { role?: string } | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUserRole: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Función para obtener el rol del usuario de forma segura utilizando la función de la BD
  const fetchUserRole = async (userId: string) => {
    try {
      console.log("Fetching user role for", userId);
      // Utilizamos la función que hemos creado en la base de datos
      const { data, error } = await supabase
        .rpc('get_user_role', { user_id: userId });

      if (error) {
        console.error('Error fetching user role using RPC:', error);
        return 'user';
      }

      console.log('Fetched role from RPC:', data);
      return data || 'user';
    } catch (error) {
      console.error('Error in fetchUserRole:', error);
      return 'user';
    }
  };

  // Nueva función para actualizar manualmente el rol del usuario
  const refreshUserRole = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const role = await fetchUserRole(user.id);
      console.log('Refreshed user role:', role);
      setUser({ ...user, role });
    } catch (error) {
      console.error('Error refreshing user role:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Configuramos el listener para cambios en el estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        // Actualizamos inmediatamente el estado de sesión
        setSession(session);
        
        // Si hay un usuario en la sesión, obtenemos su rol
        if (session?.user) {
          // Usamos setTimeout para evitar conflictos con otros listeners
          setTimeout(async () => {
            try {
              const role = await fetchUserRole(session.user.id);
              console.log('User role:', role);
              setUser({ ...session.user, role });
              setIsLoading(false);
            } catch (error) {
              console.error('Error setting user with role:', error);
              setUser(session.user);
              setIsLoading(false);
            }
          }, 0);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    // Verificamos si ya existe una sesión
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id);
      
      if (session?.user) {
        try {
          const role = await fetchUserRole(session.user.id);
          console.log('Initial session user role:', role);
          setUser({ ...session.user, role });
        } catch (error) {
          console.error('Error setting initial user with role:', error);
          setUser(session.user);
        }
      } else {
        console.log('No initial session found');
      }
      
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email, 
        password
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Registro exitoso",
        description: "Revisa tu correo para confirmar tu cuenta",
      });
    } catch (error: any) {
      toast({
        title: "Error al registrarse",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error al cerrar sesión",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
        refreshUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
