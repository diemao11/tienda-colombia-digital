
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OrdersTableHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export default function OrdersTableHeader({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange
}: OrdersTableHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-grow max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por ID o cliente..."
          className="w-full pl-8"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="w-full max-w-[200px]">
        <Select 
          value={statusFilter} 
          onValueChange={onStatusFilterChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="pending">Pendientes</SelectItem>
            <SelectItem value="processing">En proceso</SelectItem>
            <SelectItem value="shipping">Enviados</SelectItem>
            <SelectItem value="completed">Completados</SelectItem>
            <SelectItem value="cancelled">Cancelados</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
