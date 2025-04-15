
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/data/products";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Default image if no product images or if image fails to load
  const imageUrl = (product.images?.length > 0 && !imageError) 
    ? product.images[0] 
    : "/placeholder.svg";

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-lg border border-gray-100 rounded-xl group">
      <Link to={`/producto/${product.id}`} className="flex-1 flex flex-col">
        <div className="relative pt-[100%] bg-gray-50 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover product-image transition-transform duration-500 group-hover:scale-105"
            onError={handleImageError}
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all"
            >
              <Heart className="h-4 w-4 text-gray-600" />
            </motion.button>
          </div>
          {product.stock <= 3 && product.stock > 0 && (
            <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
              ¡Pocas unidades!
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              Agotado
            </Badge>
          )}
        </div>
        <CardContent className="flex-1 p-4">
          <div className="flex items-center mb-2">
            <Badge variant="outline" className="text-xs bg-brand-50 text-brand-700 hover:bg-brand-100 border-brand-200">
              {product.category === "furniture" ? "Muebles" : 
               product.category === "electronics" ? "Electrónica" : "Tecnología"}
            </Badge>
            {product.rating && (
              <div className="ml-auto flex items-center">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm text-gray-600">{product.rating}</span>
              </div>
            )}
          </div>
          <h3 className="font-medium text-base mb-1 line-clamp-2 group-hover:text-brand-600 transition-colors">{product.name}</h3>
          <p className="text-lg font-bold text-brand-600">
            {formatPrice(product.price)}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-brand-600 hover:bg-brand-700 transition-all shadow-sm" 
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          variant={product.stock === 0 ? "outline" : "default"}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock === 0 ? "Sin stock" : "Añadir al carrito"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
