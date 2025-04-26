
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiresAdmin?: boolean;
};

export const ProtectedRoute = ({ 
  children, 
  requiresAdmin = false 
}: ProtectedRouteProps) => {
  const { user, isLoading, userRole } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requiresAdmin && userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};
