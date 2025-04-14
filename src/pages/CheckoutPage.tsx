
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { 
  ArrowLeft, CreditCard, Landmark, Shield, ShoppingBag 
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

const CheckoutPage = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [loading, setLoading] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-medium mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-500 mb-8">
            No puedes proceder al pago sin productos en tu carrito.
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      clearCart();
      toast.success("¡Pedido realizado con éxito!");
      window.location.href = "/pedido-exitoso";
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl font-bold mb-2">Finalizar Compra</h1>
      <p className="text-gray-500 mb-8">
        Complete sus datos para procesar el pedido
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Personal Information */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-lg font-medium mb-4">Información Personal</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" placeholder="Ingrese su nombre" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" placeholder="Ingrese su apellido" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="ejemplo@correo.com" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input 
                        id="phone" 
                        placeholder="3XX XXX XXXX" 
                        required 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Information */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-lg font-medium mb-4">Dirección de Envío</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección</Label>
                      <Input 
                        id="address" 
                        placeholder="Calle / Carrera / Avenida" 
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ciudad</Label>
                        <Input id="city" placeholder="Ciudad" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">Departamento</Label>
                        <Input id="state" placeholder="Departamento" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">Código Postal</Label>
                        <Input id="zip" placeholder="Código Postal" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notas Adicionales (opcional)</Label>
                      <Textarea 
                        id="notes" 
                        placeholder="Instrucciones especiales para la entrega" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-lg font-medium mb-4">Método de Pago</h2>
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="creditCard" id="creditCard" />
                      <Label htmlFor="creditCard" className="flex items-center cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5 mr-2 text-gray-600" />
                        Tarjeta de Crédito / Débito
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="pse" id="pse" />
                      <Label htmlFor="pse" className="flex items-center cursor-pointer flex-1">
                        <Landmark className="h-5 w-5 mr-2 text-gray-600" />
                        PSE - Pagos Seguros en Línea
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "creditCard" && (
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                        <Input 
                          id="cardNumber" 
                          placeholder="XXXX XXXX XXXX XXXX" 
                          required 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiry">Fecha de Expiración</Label>
                          <Input 
                            id="cardExpiry" 
                            placeholder="MM/AA" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardCvc">CVC/CVV</Label>
                          <Input 
                            id="cardCvc" 
                            placeholder="XXX" 
                            required 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex items-center">
                    <Shield className="h-5 w-5 text-green-600 mr-2" />
                    <p className="text-sm text-gray-600">
                      Sus datos de pago están protegidos con encriptación segura
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Link to="/carrito">
                  <Button variant="outline" type="button">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al carrito
                  </Button>
                </Link>
                <Button type="submit" disabled={loading}>
                  {loading ? "Procesando..." : "Realizar Pedido"}
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="pt-6">
              <h2 className="text-lg font-medium mb-4">Resumen del Pedido</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between py-2">
                    <div className="flex flex-1">
                      <span className="text-sm font-medium">
                        {item.quantity} x {item.product.name}
                      </span>
                    </div>
                    <span className="text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
                
                <Separator />
                
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
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
