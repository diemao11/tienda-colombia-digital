import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/data/products";
import { Product } from "@/types/product";
import AddProductModal from "@/components/admin/AddProductModal";
import DeleteProductDialog from "@/components/admin/DeleteProductDialog";
import EditProductModal from "@/components/admin/EditProductModal";
import { useToast } from "@/components/ui/use-toast";
import { fetchProducts, deleteProduct } from "@/services/productService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

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
        <div className="flex flex-col items-center justify-center h-96">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Error al cargar productos</h2>
          <p className="text-muted-foreground mb-4">
            No se pudieron cargar los productos. Intenta de nuevo más tarde.
          </p>
          <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['products'] })}>
            Reintentar
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Productos</h1>
            <p className="text-muted-foreground">Gestiona el catálogo de productos de tu tienda</p>
          </div>
          <Button onClick={() => setShowAddProductModal(true)}>
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <div className="flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                      <span className="text-muted-foreground">Cargando productos...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id.substring(0, 8)}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getCategoryLabel(product.category)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatPrice(product.price)}</TableCell>
                    <TableCell>
                      <Badge className={
                        product.stock > 10 
                          ? "bg-green-500" 
                          : product.stock > 3 
                            ? "bg-yellow-500" 
                            : product.stock > 0 
                              ? "bg-red-500" 
                              : "bg-gray-500"
                      }>
                        {product.stock} unidades
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(product)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteClick(product)}
                          disabled={deleteProductMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No se encontraron productos
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
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
