
import { useAuth } from "@/context/AuthContext";
import { Link, Navigate, Outlet } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Package, UserRound } from "lucide-react";

export default function UserDashboard() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Mi Cuenta</h1>
      
      <div className="grid md:grid-cols-[250px_1fr] gap-6">
        <Card className="p-4 h-fit">
          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <Link to="/cuenta/perfil">
                <UserRound className="mr-2" />
                Mi Perfil
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <Link to="/cuenta/pedidos">
                <Package className="mr-2" />
                Mis Pedidos
              </Link>
            </Button>
          </nav>
        </Card>

        <Card className="p-6">
          <Outlet />
        </Card>
      </div>
    </div>
  );
}
