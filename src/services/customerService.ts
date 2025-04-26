
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
  // Get user profiles with their emails
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select(`
      id, 
      first_name, 
      last_name,
      auth_users:id(email)
    `);

  if (profilesError) throw profilesError;

  // For each profile, get their orders and calculate statistics
  const customers: Customer[] = [];
  
  for (const profile of profiles) {
    // Get user's orders
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('id, total, created_at')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false });
    
    if (ordersError) throw ordersError;
    
    // Calculate total spent
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    // Get last order date
    const lastOrder = orders.length > 0 ? orders[0].created_at : null;
    
    // Safely extract email from auth_users
    let email = 'Sin email';
    
    // Improve type checking for auth_users
    if (profile.auth_users && typeof profile.auth_users === 'object') {
      const authUsers = profile.auth_users as { email?: string | null };
      email = authUsers.email ? String(authUsers.email) : 'Sin email';
    }
    
    // Build customer object
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

