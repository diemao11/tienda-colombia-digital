
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Order, OrderStatus } from "@/pages/admin/OrdersPage";
import OrderStatusMenu from "@/components/admin/OrderStatusMenu";
import OrderStatusBadge from "./OrderStatusBadge";

interface OrdersTableProps {
  orders: Order[];
  isLoading: boolean;
  onViewOrder: (order: Order) => void;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}

export default function OrdersTable({ 
  orders, 
  isLoading, 
  onViewOrder, 
  onStatusChange 
}: OrdersTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID del Pedido</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                  <span className="text-muted-foreground">Cargando pedidos...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id.substring(0, 8)}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{formatDate(order.date)}</TableCell>
                <TableCell>{formatCurrency(order.total)}</TableCell>
                <TableCell>
                  <OrderStatusMenu 
                    status={order.status} 
                    orderId={order.id}
                    onStatusChange={onStatusChange}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => onViewOrder(order)}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Ver detalles</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No se encontraron pedidos
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
