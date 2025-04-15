
import AdminLayout from "@/components/admin/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Eye, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomers } from "@/services/customerService";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Consulta para obtener clientes
  const { data: customers = [], isLoading, error } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers
  });
  
  // Función para filtrar clientes por nombre o email
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Sin pedidos";
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Error al cargar clientes</h2>
          <p className="text-muted-foreground mb-4">
            No se pudieron cargar los clientes. Intenta de nuevo más tarde.
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">Gestiona y visualiza la información de tus clientes</p>
        </div>
        
        <div className="flex items-center max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes..."
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
                <TableHead>Email</TableHead>
                <TableHead>Pedidos</TableHead>
                <TableHead>Gasto Total</TableHead>
                <TableHead>Último Pedido</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <div className="flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                      <span className="text-muted-foreground">Cargando clientes...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.id.substring(0, 8)}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{customer.orders}</Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(customer.spent)}</TableCell>
                    <TableCell>{formatDate(customer.lastOrder)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Ver detalles</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No se encontraron clientes
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
