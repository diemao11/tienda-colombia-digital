
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Order, OrderStatus } from "@/pages/admin/OrdersPage";
import { products } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import OrderStatusMenu from "./OrderStatusMenu";

interface OrderDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

export default function OrderDetailsModal({ 
  open, 
  onOpenChange,
  order,
  onStatusChange
}: OrderDetailsModalProps) {
  // Función para formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Simulamos productos en el pedido (en un sistema real vendrían de la base de datos)
  const orderProducts = products
    .slice(0, order.items)
    .map(product => ({
      ...product,
      quantity: Math.floor(Math.random() * 3) + 1  // Cantidad aleatoria entre 1 y 3
    }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Detalles del Pedido #{order.id}</span>
            <OrderStatusMenu 
              status={order.status} 
              orderId={order.id}
              onStatusChange={onStatusChange}
            />
          </DialogTitle>
          <DialogDescription>
            Pedido realizado el {formatDate(order.date)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Información del Cliente</h3>
            <Card>
              <CardContent className="pt-4">
                <p className="font-medium text-lg">{order.customer}</p>
                <p className="text-muted-foreground">cliente@ejemplo.com</p>
                <p className="text-muted-foreground">+57 300 123 4567</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-medium mb-2">Dirección de Envío</h3>
            <Card>
              <CardContent className="pt-4">
                <p>Calle 123 # 45-67</p>
                <p>Apto 101</p>
                <p>Bogotá, Colombia</p>
                <p>Código Postal: 110111</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-medium mb-2">Productos ({order.items})</h3>
            <Card>
              <CardContent className="pt-4 px-0">
                <div className="px-4 space-y-4">
                  {orderProducts.map((product, index) => (
                    <div key={product.id} className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="h-12 w-12 rounded bg-muted flex-shrink-0 overflow-hidden">
                          {product.images && product.images.length > 0 && (
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(product.price)} x {product.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">
                        {formatCurrency(product.price * product.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-medium mb-2">Resumen</h3>
            <Card>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(order.total * 0.84)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span>{formatCurrency(order.total * 0.05)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impuestos</span>
                    <span>{formatCurrency(order.total * 0.11)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
