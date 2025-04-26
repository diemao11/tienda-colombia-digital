
import React from "react";
import { Route } from "react-router-dom";
import UserDashboard from "@/pages/user/UserDashboard";
import ProfilePage from "@/pages/user/ProfilePage";
import OrdersPage from "@/pages/user/OrdersPage";
import { ProtectedRoute } from "./ProtectedRoute";

// Esta función ya no se usa directamente en App.tsx
// Se mantiene como referencia para futuras modificaciones
export const UserRoutes = () => {
  return (
    <>
      <Route 
        path="/cuenta" 
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      >
        <Route path="perfil" element={<ProfilePage />} />
        <Route path="pedidos" element={<OrdersPage />} />
      </Route>
    </>
  );
};
