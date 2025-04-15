
import { supabase } from "@/integrations/supabase/client";

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  lastOrder: string;
}

export const fetchCustomers = async () => {
  // Obtener los perfiles de usuario
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select(`
      id, 
      first_name, 
      last_name,
      auth_users:id(email)
    `);

  if (profilesError) throw profilesError;

  // Para cada perfil, obtener sus pedidos y calcular estadísticas
  const customers: Customer[] = [];
  
  for (const profile of profiles) {
    // Obtener los pedidos del usuario
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('id, total, created_at')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false });
    
    if (ordersError) throw ordersError;
    
    // Calcular total gastado
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    // Último pedido
    const lastOrder = orders.length > 0 ? orders[0].created_at : null;
    
    // Construir el objeto de cliente
    customers.push({
      id: profile.id,
      name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || `Usuario ${profile.id.substring(0, 8)}`,
      email: profile.auth_users?.email || 'Sin email',
      orders: orders.length,
      spent: totalSpent,
      lastOrder: lastOrder || ''
    });
  }
  
  return customers;
};

export const fetchCustomerDetails = async (id: string) => {
  // Obtener el perfil del usuario
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select(`
      *,
      auth_users:id(email)
    `)
    .eq('id', id)
    .single();

  if (profileError) throw profileError;

  // Obtener los pedidos del usuario
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', id)
    .order('created_at', { ascending: false });
  
  if (ordersError) throw ordersError;

  return {
    id: profile.id,
    firstName: profile.first_name || '',
    lastName: profile.last_name || '',
    email: profile.auth_users?.email || '',
    phone: profile.phone || '',
    address: profile.address || '',
    city: profile.city || '',
    state: profile.state || '',
    postalCode: profile.postal_code || '',
    orders: orders,
    totalSpent: orders.reduce((sum, order) => sum + order.total, 0),
    orderCount: orders.length
  };
};
