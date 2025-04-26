
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/types/product";
import { fetchProducts, deleteProduct } from "@/services/productService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductTable } from "@/components/admin/ProductTable";
import { ProductTableHeader } from "@/components/admin/ProductTableHeader";
import { ProductErrorState } from "@/components/admin/ProductErrorState";
import AddProductModal from "@/components/admin/AddProductModal";
import EditProductModal from "@/components/admin/EditProductModal";
import DeleteProductDialog from "@/components/admin/DeleteProductDialog";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado exitosamente."
      });
      setShowDeleteDialog(false);
    },
    onError: (error) => {
      console.error("Error al eliminar producto:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  });

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setShowEditProductModal(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      deleteProductMutation.mutate(selectedProduct.id);
    }
  };

  if (error) {
    return (
      <AdminLayout>
        <ProductErrorState 
          onRetry={() => queryClient.invalidateQueries({ queryKey: ['products'] })} 
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <ProductTableHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddProduct={() => setShowAddProductModal(true)}
      />
      
      <div className="mt-6">
        <ProductTable
          products={filteredProducts}
          isLoading={isLoading}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          isDeleting={deleteProductMutation.isPending}
        />
      </div>
      
      <AddProductModal 
        open={showAddProductModal} 
        onOpenChange={setShowAddProductModal} 
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ['products'] })}
      />
      
      {selectedProduct && (
        <>
          <EditProductModal 
            open={showEditProductModal} 
            onOpenChange={setShowEditProductModal}
            product={selectedProduct}
            onSuccess={() => queryClient.invalidateQueries({ queryKey: ['products'] })}
          />
          
          <DeleteProductDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            product={selectedProduct}
            onDelete={handleDeleteConfirm}
            isDeleting={deleteProductMutation.isPending}
          />
        </>
      )}
    </AdminLayout>
  );
}
