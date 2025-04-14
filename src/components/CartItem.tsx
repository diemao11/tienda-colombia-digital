
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Minus } from "lucide-react";
import { CartItem as CartItemType } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { product, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();
  const [itemQuantity, setItemQuantity] = useState(quantity);

  useEffect(() => {
    setItemQuantity(quantity);
  }, [quantity]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setItemQuantity(newQuantity);
      updateQuantity(product.id, newQuantity);
    }
  };

  const incrementQuantity = () => {
    if (itemQuantity < product.stock) {
      const newQuantity = itemQuantity + 1;
      setItemQuantity(newQuantity);
      updateQuantity(product.id, newQuantity);
    }
  };

  const decrementQuantity = () => {
    if (itemQuantity > 1) {
      const newQuantity = itemQuantity - 1;
      setItemQuantity(newQuantity);
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex flex-col md:flex-row border-b pb-4 mb-4">
      <div className="md:w-24 md:h-24 h-32 flex-shrink-0 mb-4 md:mb-0 md:mr-4">
        <Link to={`/producto/${product.id}`}>
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
          />
        </Link>
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <Link to={`/producto/${product.id}`} className="font-medium hover:text-brand-600">
            {product.name}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="h-8 w-8"
            aria-label="Eliminar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          {product.category === "furniture" ? "Muebles" : 
           product.category === "electronics" ? "Electrónica" : "Tecnología"}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center border rounded-md overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={decrementQuantity}
              disabled={itemQuantity <= 1}
              className="h-8 w-8 rounded-none"
              aria-label="Disminuir cantidad"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Input
              type="number"
              min="1"
              max={product.stock}
              value={itemQuantity}
              onChange={handleQuantityChange}
              className="w-12 h-8 border-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={incrementQuantity}
              disabled={itemQuantity >= product.stock}
              className="h-8 w-8 rounded-none"
              aria-label="Aumentar cantidad"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">{formatPrice(product.price * itemQuantity)}</p>
            <p className="text-sm text-gray-500">{formatPrice(product.price)} c/u</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
