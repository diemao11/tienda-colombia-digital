
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

interface ProductTableHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddProduct: () => void;
}

export const ProductTableHeader = ({
  searchQuery,
  onSearchChange,
  onAddProduct
}: ProductTableHeaderProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-muted-foreground">Gestiona el catálogo de productos de tu tienda</p>
        </div>
        <Button onClick={onAddProduct}>
          <Plus className="mr-2 h-4 w-4" />
          Añadir Producto
        </Button>
      </div>
      
      <div className="flex items-center max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
