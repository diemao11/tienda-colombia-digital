import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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

// Protected route component
const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const { user, isLoading, refreshUserRole } = useAuth();
  const location = useLocation();
  
  console.log("ProtectedRoute checking access. User:", user?.email, "Role:", user?.role, "Admin only:", adminOnly);
  
  React.useEffect(() => {
    // Actualizar automáticamente el rol del usuario cuando se intenta acceder a una ruta protegida
    if (user && adminOnly) {
      console.log("Refreshing user role for admin route access");
      refreshUserRole();
    }
  }, [user, adminOnly, refreshUserRole]);
  
  if (isLoading) {
    console.log("Auth is still loading...");
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }
  
  if (!user) {
    console.log("No user found, redirecting to auth");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  if (adminOnly && user.role !== 'admin') {
    console.log("User is not admin, redirecting to home. User role:", user.role);
    return <Navigate to="/" replace />;
  }
  
  console.log("Access granted to", adminOnly ? "admin route" : "protected route");
  return <>{children}</>;
};

const App = () => {
  console.log("App rendering");
  
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
                      {/* Rutas de la tienda */}
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
                      
                      {/* Rutas del panel de administración */}
                      <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
                      <Route path="/admin/productos" element={<ProtectedRoute adminOnly={true}><ProductsPage /></ProtectedRoute>} />
                      <Route path="/admin/clientes" element={<ProtectedRoute adminOnly={true}><CustomersPage /></ProtectedRoute>} />
                      <Route path="/admin/pedidos" element={<ProtectedRoute adminOnly={true}><OrdersPage /></ProtectedRoute>} />
                      
                      {/* Ruta 404 */}
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
