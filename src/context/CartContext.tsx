
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, Product } from "../types/product";
import { toast } from "@/components/ui/sonner";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Calculate totals
    const items = cart.reduce((total, item) => total + item.quantity, 0);
    const price = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    
    setTotalItems(items);
    setTotalPrice(price);
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Check if we have enough stock
        if (existingItem.quantity + quantity > product.stock) {
          toast.error(`Solo quedan ${product.stock} unidades disponibles.`);
          return prevCart;
        }
        
        // Update existing item
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Check if we have enough stock
        if (quantity > product.stock) {
          toast.error(`Solo quedan ${product.stock} unidades disponibles.`);
          return prevCart;
        }
        
        // Add new item
        toast.success("Producto añadido al carrito.");
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    toast.info("Producto eliminado del carrito.");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === productId);
      
      if (existingItem) {
        if (quantity > existingItem.product.stock) {
          toast.error(`Solo quedan ${existingItem.product.stock} unidades disponibles.`);
          return prevCart;
        }
        
        return prevCart.map(item => 
          item.product.id === productId ? { ...item, quantity } : item
        );
      }
      return prevCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Carrito vaciado.");
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
