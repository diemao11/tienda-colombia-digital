
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Truck, Box } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  product: {
    name: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  created_at: string;
  status: OrderStatus;
  total: number;
  tracking_number?: string;
  items: OrderItem[];
}

function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const statusConfig = {
    pending: { icon: Box, label: "Pendiente", className: "bg-yellow-100 text-yellow-800" },
    processing: { icon: Package, label: "En Bodega", className: "bg-blue-100 text-blue-800" },
    shipped: { icon: Truck, label: "En Camino", className: "bg-purple-100 text-purple-800" },
    delivered: { icon: Package, label: "Entregado", className: "bg-green-100 text-green-800" },
    cancelled: { icon: Package, label: "Cancelado", className: "bg-red-100 text-red-800" },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      <Icon className="w-4 h-4 mr-1" />
      {config.label}
    </span>
  );
}

function OrderDetails({ order }: { order: Order }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Número de Orden</p>
          <p className="font-medium">{order.id.substring(0, 8)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Fecha</p>
          <p className="font-medium">
            {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Estado</p>
          <OrderStatusBadge status={order.status} />
        </div>
        <div>
          <p className="text-muted-foreground">Total</p>
          <p className="font-medium">
            {new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP'
            }).format(order.total)}
          </p>
        </div>
      </div>

      {order.tracking_number && (
        <div className="bg-muted p-3 rounded-md">
          <p className="text-sm font-medium">Número de Guía</p>
          <p className="text-sm">{order.tracking_number}</p>
        </div>
      )}

      <div>
        <p className="font-medium mb-2">Productos</p>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.product.name} x{item.quantity}</span>
              <span className="font-medium">
                {new Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP'
                }).format(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data: orders, isLoading } = useQuery({
    queryKey: ['userOrders', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('No user');

      const { data: orders, error } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(
            id,
            quantity,
            price,
            product:product_id(name)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return orders as Order[];
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Mis Pedidos</h2>
      
      <div className="space-y-4">
        {orders?.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Orden #{order.id.substring(0, 8)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP'
                  }).format(order.total)}
                </p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      Ver Detalles
                    </Button>
                  </DialogTrigger>
                  {selectedOrder && (
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Detalles del Pedido</DialogTitle>
                      </DialogHeader>
                      <OrderDetails order={selectedOrder} />
                    </DialogContent>
                  )}
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}

        {orders?.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-medium text-muted-foreground">No hay pedidos</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              No has realizado ningún pedido todavía
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
