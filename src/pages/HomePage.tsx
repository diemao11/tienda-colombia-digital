
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/productService";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import ProductShowcase from "@/components/home/ProductShowcase";
import BenefitsSection from "@/components/home/BenefitsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";

const HomePage = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
  
  // Get a selection of featured products (one from each category if possible)
  const getUniqueByCategory = () => {
    const categories = ["muebles", "electrónica", "tecnología"];
    const featured = [];
    
    // Try to get one product from each category
    for (const cat of categories) {
      const found = products.find(p => p.category.toLowerCase() === cat.toLowerCase());
      if (found) featured.push(found);
    }
    
    // Fill with other products if needed
    while (featured.length < 4 && featured.length < products.length) {
      const remaining = products.filter(p => !featured.includes(p));
      if (remaining.length === 0) break;
      featured.push(remaining[0]);
    }
    
    return featured.slice(0, 4);
  };
  
  const featuredProducts = getUniqueByCategory();
  
  // Get the latest products (based on their IDs for simplicity)
  const newArrivals = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  
  // Get bestsellers (random for now, could be based on rating later)
  const bestSellers = [...products]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
