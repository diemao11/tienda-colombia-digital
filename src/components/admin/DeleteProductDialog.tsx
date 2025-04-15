
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Product } from "@/types/product";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface DeleteProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

export default function DeleteProductDialog({ 
  open, 
  onOpenChange, 
  product 
}: DeleteProductDialogProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    
    // Simulando una petición a la API
    setTimeout(() => {
      // Aquí iría la lógica para eliminar el producto de la base de datos
      console.log("Producto a eliminar:", product.id);
      
      // Mostrar notificación de éxito
      toast({
        title: "Producto eliminado",
        description: `El producto "${product.name}" ha sido eliminado exitosamente.`,
      });
      
      // Cerrar diálogo
      onOpenChange(false);
      setIsDeleting(false);
    }, 1000);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro de eliminar este producto?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente el producto 
            <span className="font-semibold"> {product.name}</span> y eliminará sus datos de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
