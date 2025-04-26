
import { OrderStatus } from "@/pages/admin/OrdersPage";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Package, Truck, XCircle } from "lucide-react";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  switch(status) {
    case "completed":
      return <Badge className="bg-green-500 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Completado</Badge>;
    case "processing":
      return <Badge className="bg-blue-500 flex items-center gap-1"><Clock className="h-3 w-3" /> En proceso</Badge>;
    case "shipping":
      return <Badge className="bg-indigo-500 flex items-center gap-1"><Truck className="h-3 w-3" /> Enviado</Badge>;
    case "pending":
      return <Badge className="bg-yellow-500 flex items-center gap-1"><Package className="h-3 w-3" /> Pendiente</Badge>;
    case "cancelled":
      return <Badge className="bg-red-500 flex items-center gap-1"><XCircle className="h-3 w-3" /> Cancelado</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}
