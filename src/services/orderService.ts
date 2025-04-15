
import { supabase } from "@/integrations/supabase/client";
import { Order, OrderStatus } from "@/pages/admin/OrdersPage";

export const fetchOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      user_id,
      status,
      total,
      created_at,
      profiles(first_name, last_name)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }

  // Transformar los datos para que coincidan con la estructura de Order
  return data.map(item => {
    let firstName = '';
    let lastName = '';
    
    // Verificación más segura usando una variable temporal
    const profiles = item.profiles;
    if (profiles !== null && 
        typeof profiles === 'object') {
      // Solo accedemos a las propiedades si profiles es un objeto válido
      firstName = profiles.first_name || '';
      lastName = profiles.last_name || '';
    }
    
    const customerName = firstName && lastName 
      ? `${firstName} ${lastName}` 
      : `Usuario ${item.user_id.substring(0, 8)}`;

    return {
      id: item.id,
      customer: customerName,
      date: item.created_at,
      total: item.total,
      status: item.status as OrderStatus,
      items: 0 // Se cargará después con una consulta adicional
    };
  }) as Order[];
};

export const fetchOrderWithItems = async (id: string) => {
  // Obtener el pedido
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select(`
      *,
      profiles(first_name, last_name, phone, address, city, state, postal_code)
    `)
    .eq('id', id)
    .single();

  if (orderError) throw orderError;

  // Obtener los items del pedido
  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select(`
      *,
      product:product_id(name, id)
    `)
    .eq('order_id', id);

  if (itemsError) throw itemsError;

  // Verificación más segura usando una variable temporal
  let firstName = '';
  let lastName = '';
  let phone = '';
  
  const profiles = order.profiles;
  if (profiles !== null && 
      typeof profiles === 'object') {
    // Solo accedemos a las propiedades si profiles es un objeto válido
    firstName = profiles.first_name || '';
    lastName = profiles.last_name || '';
    phone = profiles.phone || '';
  }
  
  const customerName = firstName && lastName 
    ? `${firstName} ${lastName}` 
    : `Usuario ${order.user_id.substring(0, 8)}`;

  return {
    id: order.id,
    customer: customerName,
    customerDetails: {
      name: customerName,
      phone: phone,
      address: order.shipping_address,
      city: order.shipping_city,
      state: order.shipping_state,
      postalCode: order.shipping_postal_code
    },
    date: order.created_at,
    total: order.total,
    status: order.status as OrderStatus,
    items: items.map(item => ({
      id: item.id,
      productId: item.product_id,
      productName: item.product?.name || 'Producto no disponible',
      quantity: item.quantity,
      price: item.price
    }))
  };
};

export const updateOrderStatus = async (id: string, status: OrderStatus) => {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id);

  if (error) throw error;
  return true;
};
