
import { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { motion } from "framer-motion";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No se encontraron productos</h3>
        <p className="text-gray-500 mt-2">Intenta con otra categoría o filtro</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <div className="flex space-x-2">
            <Button
              variant={layout === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setLayout("grid")}
              aria-label="Vista de cuadrícula"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="ml-1 hidden sm:inline">Cuadrícula</span>
            </Button>
            <Button
              variant={layout === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setLayout("list")}
              aria-label="Vista de lista"
            >
              <List className="h-4 w-4" />
              <span className="ml-1 hidden sm:inline">Lista</span>
            </Button>
          </div>
        </div>
      )}

      {layout === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
              className="border rounded-lg p-4 flex flex-col md:flex-row"
            >
              <div className="md:w-48 h-48 flex-shrink-0 mb-4 md:mb-0 md:mr-4 bg-gray-50">
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-contain p-2 rounded-md"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 line-clamp-3 mb-4">{product.description}</p>
                <div className="mt-auto flex flex-wrap items-end justify-between">
                  <p className="text-xl font-bold text-brand-600">
                    {new Intl.NumberFormat('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(product.price)}
                  </p>
                  <Button className="bg-brand-600 hover:bg-brand-700">Añadir al carrito</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
