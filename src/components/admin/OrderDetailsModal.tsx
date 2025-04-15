
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Order, OrderStatus, OrderItem } from "@/pages/admin/OrdersPage";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import OrderStatusMenu from "./OrderStatusMenu";

interface OrderDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
  isLoading?: boolean;
}

export default function OrderDetailsModal({ 
  open, 
  onOpenChange,
  order,
  onStatusChange,
  isLoading = false
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

  // Determinar si los items son un número o un array
  const orderItems = Array.isArray(order.items) 
    ? order.items 
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Detalles del Pedido #{order.id.substring(0, 8)}</span>
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
                {order.customerDetails && (
                  <>
                    <p className="text-muted-foreground">{order.customerDetails.phone || 'Sin teléfono'}</p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-medium mb-2">Dirección de Envío</h3>
            <Card>
              <CardContent className="pt-4">
                {order.customerDetails ? (
                  <>
                    <p>{order.customerDetails.address}</p>
                    <p>{order.customerDetails.city}, {order.customerDetails.state}</p>
                    <p>Código Postal: {order.customerDetails.postalCode}</p>
                  </>
                ) : (
                  <p>No hay información de envío disponible</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-medium mb-2">Productos {!Array.isArray(order.items) ? `(${order.items})` : `(${orderItems.length})`}</h3>
            <Card>
              <CardContent className="pt-4 px-0">
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="px-4 space-y-4">
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      order.items.map((item) => (
                        <div key={item.id} className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="h-12 w-12 rounded bg-muted flex-shrink-0"></div>
                            <div>
                              <p className="font-medium">{item.productName}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatCurrency(item.price)} x {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-4 text-muted-foreground">
                        No hay detalles de productos disponibles
                      </p>
                    )}
                  </div>
                )}
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
