
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, CheckCircle, Clock, Package, Truck, XCircle } from "lucide-react";
import { OrderStatus } from "@/pages/admin/OrdersPage";
import { useToast } from "@/components/ui/use-toast";

interface OrderStatusMenuProps {
  status: OrderStatus;
  orderId: string;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

export default function OrderStatusMenu({ status, orderId, onStatusChange }: OrderStatusMenuProps) {
  const { toast } = useToast();

  const getStatusBadge = (status: OrderStatus) => {
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
  };

  const handleStatusChange = (newStatus: OrderStatus) => {
    onStatusChange(orderId, newStatus);
    
    toast({
      title: "Estado actualizado",
      description: `El pedido ${orderId} ahora está ${getStatusText(newStatus)}.`,
    });
  };

  const getStatusText = (status: OrderStatus) => {
    switch(status) {
      case "completed": return "completado";
      case "processing": return "en proceso";
      case "shipping": return "enviado";
      case "pending": return "pendiente";
      case "cancelled": return "cancelado";
      default: return status;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 p-0 data-[state=open]:bg-muted">
          <div className="flex items-center gap-2">
            {getStatusBadge(status)}
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => handleStatusChange("pending")}>
          <Package className="mr-2 h-4 w-4" />
          <span>Pendiente</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("processing")}>
          <Clock className="mr-2 h-4 w-4" />
          <span>En proceso</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("shipping")}>
          <Truck className="mr-2 h-4 w-4" />
          <span>Enviado</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("completed")}>
          <CheckCircle className="mr-2 h-4 w-4" />
          <span>Completado</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("cancelled")}>
          <XCircle className="mr-2 h-4 w-4" />
          <span>Cancelado</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
