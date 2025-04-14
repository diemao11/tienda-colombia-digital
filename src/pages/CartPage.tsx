
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import { formatPrice } from "@/data/products";

const CartPage = () => {
  const { cart, clearCart, totalItems, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-2xl font-bold mb-8">Carrito de Compras</h1>
        <div className="text-center py-16">
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-medium mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-500 mb-8">
            Parece que no has añadido ningún producto a tu carrito todavía.
          </p>
          <Link to="/">
            <Button>Explorar productos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const deliveryFee = totalPrice > 500000 ? 0 : 15000;
  const totalWithDelivery = totalPrice + deliveryFee;

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
      <p className="text-gray-500 mb-8">
        {totalItems} {totalItems === 1 ? "producto" : "productos"} en tu carrito
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Productos</h2>
              <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-500">
                <Trash2 className="h-4 w-4 mr-1" />
                Vaciar carrito
              </Button>
            </div>

            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            <div className="mt-8">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continuar comprando
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumen de Compra</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>
                    {deliveryFee === 0 
                      ? "¡Gratis!" 
                      : formatPrice(deliveryFee)}
                  </span>
                </div>
                {deliveryFee === 0 && (
                  <div className="text-xs text-green-600">
                    ¡Has aplicado envío gratis por compra superior a COP 500.000!
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(totalWithDelivery)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/checkout" className="w-full">
                <Button className="w-full">Proceder al pago</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
