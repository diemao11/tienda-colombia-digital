
import React from "react";
import { Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import CategoryPage from "@/pages/CategoryPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import OrderSuccessPage from "@/pages/OrderSuccessPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import AuthPage from "@/pages/AuthPage";
import { ProtectedRoute } from "./ProtectedRoute";

export const PublicRoutes = () => {
  return (
    <>
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
    </>
  );
};
