
import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import OrderDetailsModal from "@/components/admin/OrderDetailsModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, fetchOrderWithItems, updateOrderStatus } from "@/services/orderService";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrdersTableHeader from "@/components/admin/orders/OrdersTableHeader";
import OrdersTable from "@/components/admin/orders/OrdersTable";

// Types
export type OrderStatus = "pending" | "processing" | "shipping" | "completed" | "cancelled";

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: number | OrderItem[];
  customerDetails?: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Queries
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders
  });

  // Order details query
  const { data: orderDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['order', selectedOrder?.id],
    queryFn: () => selectedOrder ? fetchOrderWithItems(selectedOrder.id) : null,
    enabled: !!selectedOrder && showOrderDetails
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, newStatus }: { orderId: string, newStatus: OrderStatus }) => 
      updateOrderStatus(orderId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Estado actualizado",
        description: "El estado del pedido ha sido actualizado exitosamente."
      });
    },
    onError: (error) => {
      console.error("Error al actualizar estado:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del pedido. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  });

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => 
    (order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
     order.customer.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (statusFilter === "all" || order.status === statusFilter)
  );

  // Event handlers
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateStatusMutation.mutate({ orderId, newStatus });
  };

  if (error) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Error al cargar pedidos</h2>
          <p className="text-muted-foreground mb-4">
            No se pudieron cargar los pedidos. Intenta de nuevo más tarde.
          </p>
          <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['orders'] })}>
            Reintentar
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Pedidos</h1>
          <p className="text-muted-foreground">Gestiona y visualiza todos los pedidos de tu tienda</p>
        </div>
        
        <OrdersTableHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
        
        <OrdersTable
          orders={filteredOrders}
          isLoading={isLoading}
          onViewOrder={handleViewOrder}
          onStatusChange={handleStatusChange}
        />

        {selectedOrder && (
          <OrderDetailsModal
            open={showOrderDetails}
            onOpenChange={setShowOrderDetails}
            order={orderDetails || selectedOrder}
            onStatusChange={handleStatusChange}
            isLoading={isLoadingDetails}
          />
        )}
      </div>
    </AdminLayout>
  );
}
