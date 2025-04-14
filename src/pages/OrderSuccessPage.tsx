
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Home, Box } from "lucide-react";

const OrderSuccessPage = () => {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 1000000)}`;

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <Card className="max-w-lg mx-auto">
        <CardContent className="pt-6 text-center">
          <div className="mb-6">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">¡Pedido Exitoso!</h1>
          <p className="text-gray-500 mb-6">
            Gracias por tu compra. Tu pedido ha sido procesado correctamente.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="font-medium">Número de Pedido:</p>
            <p className="text-lg text-brand-600 font-bold">{orderNumber}</p>
          </div>
          
          <p className="text-sm text-gray-600 mb-8">
            Hemos enviado un correo electrónico con los detalles de tu pedido.
            Puedes hacer seguimiento del estado de tu envío con el número de pedido.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="outline" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Volver al inicio
              </Button>
            </Link>
            <Link to="/mis-pedidos">
              <Button className="w-full">
                <Box className="mr-2 h-4 w-4" />
                Ver mis pedidos
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccessPage;
