
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Default image if no product images
  const imageUrl = product.images?.length > 0 
    ? product.images[0] 
    : "/placeholder.svg";

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
      <Link to={`/producto/${product.id}`} className="flex-1 flex flex-col">
        <div className="relative pt-[100%] bg-gray-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover product-image"
          />
          {product.stock <= 3 && product.stock > 0 && (
            <Badge className="absolute top-2 right-2 bg-yellow-500">
              ¡Pocas unidades!
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500">
              Agotado
            </Badge>
          )}
        </div>
        <CardContent className="flex-1 p-4">
          <div className="flex items-center mb-2">
            <Badge variant="outline" className="text-xs">
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
          <h3 className="font-medium text-base mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-lg font-bold text-brand-600">
            {formatPrice(product.price)}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
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
