import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const authFormSchema = z.object({
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type AuthFormValues = z.infer<typeof authFormSchema>;

const AuthPage = () => {
  const { signIn, signUp, refreshUserRole } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("login");

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: AuthFormValues) => {
    setIsSubmitting(true);
    setAuthError(null);
    
    try {
      if (activeTab === "login") {
        await signIn(values.email, values.password);
        await refreshUserRole();
        navigate("/");
      } else {
        await signUp(values.email, values.password);
        setActiveTab("login");
        form.reset();
      }
    } catch (error: any) {
      setAuthError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-12rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Accede a tu cuenta
          </CardTitle>
          <CardDescription className="text-center">
            Ingresa tus credenciales para acceder a la plataforma
          </CardDescription>
        </CardHeader>
        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>
          <CardContent className="pt-4">
            {authError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="correo@ejemplo.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {activeTab === "login"
                        ? "Iniciando sesión..."
                        : "Registrando..."}
                    </>
                  ) : activeTab === "login" ? (
                    "Iniciar Sesión"
                  ) : (
                    "Registrarse"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Tabs>
        <CardFooter className="flex flex-col">
          <p className="text-center text-sm text-muted-foreground mt-2">
            {activeTab === "login"
              ? "¿No tienes una cuenta? Haz clic en Registrarse"
              : "¿Ya tienes una cuenta? Haz clic en Iniciar Sesión"}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;
