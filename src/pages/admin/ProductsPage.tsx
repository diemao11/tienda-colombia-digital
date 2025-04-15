
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice, products } from "@/data/products";
import { Product } from "@/types/product";
import { Link } from "react-router-dom";
import AddProductModal from "@/components/admin/AddProductModal";
import DeleteProductDialog from "@/components/admin/DeleteProductDialog";
import EditProductModal from "@/components/admin/EditProductModal";
import { useToast } from "@/components/ui/use-toast";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  
  // Función para filtrar productos por nombre
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'furniture': return 'Muebles';
      case 'electronics': return 'Electrónica';
      case 'technology': return 'Tecnología';
      default: return category;
    }
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setShowEditProductModal(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteDialog(true);
  };

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
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
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
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(product)}>
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
      />
      
      {selectedProduct && (
        <>
          <EditProductModal 
            open={showEditProductModal} 
            onOpenChange={setShowEditProductModal}
            product={selectedProduct}
          />
          
          <DeleteProductDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            product={selectedProduct}
          />
        </>
      )}
    </AdminLayout>
  );
}
