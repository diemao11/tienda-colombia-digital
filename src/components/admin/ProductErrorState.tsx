
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ProductErrorStateProps {
  onRetry: () => void;
}

export const ProductErrorState = ({ onRetry }: ProductErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Error al cargar productos</h2>
      <p className="text-muted-foreground mb-4">
        No se pudieron cargar los productos. Intenta de nuevo más tarde.
      </p>
      <Button onClick={onRetry}>
        Reintentar
      </Button>
    </div>
  );
};
