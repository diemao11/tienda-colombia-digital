
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Search } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group products by category
  const furnitureProducts = products.filter(p => p.category === "furniture");
  const electronicsProducts = products.filter(p => p.category === "electronics");
  const technologyProducts = products.filter(p => p.category === "technology");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already happening in real-time
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Nuestra Tienda</h1>
          <p className="text-gray-500">
            Explora nuestra selección de productos de calidad
          </p>
        </div>
        
        <form onSubmit={handleSearch} className="w-full md:w-auto flex gap-2">
          <Input
            type="search"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:w-80"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Category Highlights */}
      {!searchQuery && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="relative rounded-lg overflow-hidden h-40 group">
            <img
              src="/categories/furniture.jpg"
              alt="Muebles"
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white p-4">
              <h3 className="text-xl font-bold mb-2">Muebles</h3>
              <Badge className="mb-2 bg-white text-gray-800">
                {furnitureProducts.length} productos
              </Badge>
              <Link to="/categoria/furniture">
                <Button variant="outline" size="sm" className="mt-2 text-white border-white hover:bg-white/20 hover:text-white">
                  Explorar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative rounded-lg overflow-hidden h-40 group">
            <img
              src="/categories/electronics.jpg"
              alt="Electrónica"
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white p-4">
              <h3 className="text-xl font-bold mb-2">Electrónica</h3>
              <Badge className="mb-2 bg-white text-gray-800">
                {electronicsProducts.length} productos
              </Badge>
              <Link to="/categoria/electronics">
                <Button variant="outline" size="sm" className="mt-2 text-white border-white hover:bg-white/20 hover:text-white">
                  Explorar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative rounded-lg overflow-hidden h-40 group">
            <img
              src="/categories/technology.jpg"
              alt="Tecnología"
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white p-4">
              <h3 className="text-xl font-bold mb-2">Tecnología</h3>
              <Badge className="mb-2 bg-white text-gray-800">
                {technologyProducts.length} productos
              </Badge>
              <Link to="/categoria/technology">
                <Button variant="outline" size="sm" className="mt-2 text-white border-white hover:bg-white/20 hover:text-white">
                  Explorar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {searchQuery ? (
        <>
          <h2 className="text-2xl font-semibold mb-6">
            Resultados para "{searchQuery}"
          </h2>
          <ProductGrid products={filteredProducts} />
        </>
      ) : (
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Todos los Productos</TabsTrigger>
            <TabsTrigger value="furniture">Muebles</TabsTrigger>
            <TabsTrigger value="electronics">Electrónica</TabsTrigger>
            <TabsTrigger value="technology">Tecnología</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ProductGrid products={products} />
          </TabsContent>
          <TabsContent value="furniture">
            <ProductGrid products={furnitureProducts} />
          </TabsContent>
          <TabsContent value="electronics">
            <ProductGrid products={electronicsProducts} />
          </TabsContent>
          <TabsContent value="technology">
            <ProductGrid products={technologyProducts} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ShopPage;
