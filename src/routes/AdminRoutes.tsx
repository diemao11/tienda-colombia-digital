
import React from "react";
import { Route } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ProductsPage from "@/pages/admin/ProductsPage";
import CustomersPage from "@/pages/admin/CustomersPage";
import AdminOrdersPage from "@/pages/admin/OrdersPage";
import { ProtectedRoute } from "./ProtectedRoute";

export const AdminRoutes = () => {
  return (
    <>
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiresAdmin>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/productos" 
        element={
          <ProtectedRoute requiresAdmin>
            <ProductsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/clientes" 
        element={
          <ProtectedRoute requiresAdmin>
            <CustomersPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/pedidos" 
        element={
          <ProtectedRoute requiresAdmin>
            <AdminOrdersPage />
          </ProtectedRoute>
        } 
      />
    </>
  );
};
