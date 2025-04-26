
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { MainLayout } from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";

// Import pages directly for use in Routes
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import UserDashboard from "./pages/user/UserDashboard";
import ProfilePage from "./pages/user/ProfilePage";
import OrdersPage from "./pages/user/OrdersPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductsPage from "./pages/admin/ProductsPage";
import CustomersPage from "./pages/admin/CustomersPage";
import AdminOrdersPage from "./pages/admin/OrdersPage";

// Import ProtectedRoute component
import { ProtectedRoute } from "./routes/ProtectedRoute";

// Create QueryClient instance outside the component to avoid recreation on renders
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <MainLayout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/tienda" element={<ShopPage />} />
                <Route path="/categoria/:category" element={<CategoryPage />} />
                <Route path="/categoria/:category/:subcategory" element={<CategoryPage />} />
                <Route path="/producto/:id" element={<ProductDetailPage />} />
                <Route path="/carrito" element={<CartPage />} />
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/pedido-exitoso" 
                  element={
                    <ProtectedRoute>
                      <OrderSuccessPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/nosotros" element={<AboutPage />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="/auth" element={<AuthPage />} />
                
                {/* User Routes */}
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
                
                {/* Admin Routes */}
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
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
