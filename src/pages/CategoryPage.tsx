
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { FilterX, SlidersHorizontal } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import { formatPrice } from "@/data/products";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/product/productService";

const CategoryPage = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory: string }>();
  
  // Make sure the category is a valid one
  const validCategory = ["furniture", "electronics", "technology"].includes(category || "") 
    ? category 
    : null;
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000]);
  const [filters, setFilters] = useState({
    inStock: false,
    onSale: false,
  });

  // Fetch products from the database
  const { data: dbProducts = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  // Get category label
  const getCategoryLabel = () => {
    switch(validCategory) {
      case "furniture":
        return "Muebles";
      case "electronics":
        return "Electrónica";
      case "technology":
        return "Tecnología";
      default:
        return "Productos";
    }
  };

  const getSubcategoryLabel = () => {
    return subcategory ? subcategory.charAt(0).toUpperCase() + subcategory.slice(1) : null;
  };

  // Filter products based on category, subcategory, and other filters
  const filteredProducts = dbProducts.filter(product => {
    // For debugging
    console.log("Filtering product:", product.name, "Category:", product.category, "Looking for:", validCategory);
    
    // Category filter - use validCategory directly since it's already normalized
    if (validCategory && product.category !== validCategory) {
      return false;
    }
    
    // Subcategory filter
    if (subcategory && product.subcategory.toLowerCase() !== subcategory.toLowerCase()) {
      return false;
    }
    
    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // In stock filter
    if (filters.inStock && product.stock === 0) {
      return false;
    }
    
    return true;
  });

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handleFilterChange = (key: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetFilters = () => {
    setPriceRange([0, 3000000]);
    setFilters({
      inStock: false,
      onSale: false,
    });
  };

  const renderFilters = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Precio</h3>
        <Slider
          defaultValue={[priceRange[0], priceRange[1]]}
          max={3000000}
          step={50000}
          value={[priceRange[0], priceRange[1]]}
          onValueChange={handlePriceChange}
          className="mb-6"
        />
        <div className="flex items-center justify-between text-sm">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-4">Disponibilidad</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={filters.inStock}
              onCheckedChange={() => handleFilterChange("inStock")}
            />
            <Label htmlFor="inStock">Productos en stock</Label>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={resetFilters}
        className="w-full"
      >
        <FilterX className="mr-2 h-4 w-4" />
        Limpiar filtros
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {getSubcategoryLabel() || getCategoryLabel()}
        </h1>
        <p className="text-gray-500">
          {isLoading ? "Cargando productos..." : `${filteredProducts.length} ${filteredProducts.length === 1 ? "producto" : "productos"} encontrados`}
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Mobile filter button */}
        <div className="lg:hidden mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                {renderFilters()}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop filters */}
        <div className="hidden lg:block lg:col-span-1">
          {renderFilters()}
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ProductGrid 
              products={filteredProducts} 
              title={getSubcategoryLabel() || getCategoryLabel()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
