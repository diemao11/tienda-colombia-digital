
import { ReactNode } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { LayoutDashboard, Package, Users, ShoppingCart, Settings, LogOut, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <AdminSidebar />
        <SidebarInset className="p-6">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function AdminSidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente."
      });
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast({
        title: "Error",
        description: "No se pudo cerrar sesión. Intenta de nuevo.",
        variant: "destructive"
      });
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">TiendaColombia</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Panel de Control</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/admin">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/admin/productos">
                  <Package className="h-4 w-4" />
                  <span>Productos</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/admin/clientes">
                  <Users className="h-4 w-4" />
                  <span>Clientes</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/admin/pedidos">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Pedidos</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/admin/ajustes">
                  <Settings className="h-4 w-4" />
                  <span>Ajustes</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="py-4">
        <div className="px-4 space-y-4">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Ver tienda
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
