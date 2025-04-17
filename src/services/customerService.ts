
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
  // Obtener los perfiles de usuario con sus correos
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
    
    // Extraer correo del usuario de manera segura
    let email = 'Sin email';
    
    if (profile.auth_users) {
      const authUsers = profile.auth_users;
      if (authUsers && typeof authUsers === 'object' && 'email' in authUsers) {
        const emailValue = authUsers.email;
        email = emailValue ? String(emailValue) : 'Sin email';
      }
    }
    
    // Construir el objeto de cliente
    customers.push({
      id: profile.id,
      name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || `Usuario ${profile.id.substring(0, 8)}`,
      email: email,
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

  // Extraer correo del usuario de manera segura
  let email = '';
  
  if (profile.auth_users) {
    const authUsers = profile.auth_users;
    if (authUsers && typeof authUsers === 'object' && 'email' in authUsers) {
      const emailValue = authUsers.email;
      email = emailValue ? String(emailValue) : '';
    }
  }

  return {
    id: profile.id,
    firstName: profile.first_name || '',
    lastName: profile.last_name || '',
    email: email,
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
