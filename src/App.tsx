import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductsPage from "./pages/admin/ProductsPage";
import CustomersPage from "./pages/admin/CustomersPage";
import OrdersPage from "./pages/admin/OrdersPage";

// Create QueryClient instance outside the component to avoid recreation on renders
const queryClient = new QueryClient();

// Updated ProtectedRoute component to handle admin routes
const ProtectedRoute = ({ 
  children, 
  requiresAdmin = false 
}: { 
  children: React.ReactNode;
  requiresAdmin?: boolean;
}) => {
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

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      {/* Public routes */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/tienda" element={<ShopPage />} />
                      <Route path="/categoria/:category" element={<CategoryPage />} />
                      <Route path="/categoria/:category/:subcategory" element={<CategoryPage />} />
                      <Route path="/producto/:id" element={<ProductDetailPage />} />
                      <Route path="/carrito" element={<CartPage />} />
                      <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                      <Route path="/pedido-exitoso" element={<ProtectedRoute><OrderSuccessPage /></ProtectedRoute>} />
                      <Route path="/nosotros" element={<AboutPage />} />
                      <Route path="/contacto" element={<ContactPage />} />
                      <Route path="/auth" element={<AuthPage />} />
                      
                      {/* User routes */}
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

                      {/* Protected routes that require admin */}
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
                            <OrdersPage />
                          </ProtectedRoute>
                        } 
                      />
                      
                      {/* Regular protected routes */}
                      <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                      <Route path="/pedido-exitoso" element={<ProtectedRoute><OrderSuccessPage /></ProtectedRoute>} />
                      
                      {/* 404 Route */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
