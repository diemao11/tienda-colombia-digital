
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ArrowRight, ShieldCheck, Truck, HeadphonesFilled, CreditCard } from "lucide-react";
import { products } from "@/data/products";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import ProductShowcase from "@/components/home/ProductShowcase";
import BenefitsSection from "@/components/home/BenefitsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";

const HomePage = () => {
  // Get a selection of featured products (one from each category)
  const featuredProducts = products.filter((product, index) => index < 4);
  
  // Get the latest products (most recently added)
  const newArrivals = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  
  // Get bestsellers (products with highest rating)
  const bestSellers = [...products]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Categories Section */}
      <FeaturedCategories />

      {/* Featured Products */}
      <ProductShowcase 
        title="Productos Destacados" 
        products={featuredProducts} 
        viewAllLink="/tienda" 
      />

      {/* New Arrivals */}
      <ProductShowcase 
        title="Nuevos Ingresos" 
        products={newArrivals} 
        viewAllLink="/tienda" 
        bgColor="bg-brand-50"
      />

      {/* Best Sellers */}
      <ProductShowcase 
        title="Los Más Vendidos" 
        products={bestSellers} 
        viewAllLink="/tienda" 
      />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
