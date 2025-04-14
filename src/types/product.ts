
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Price in COP
  category: 'furniture' | 'electronics' | 'technology';
  subcategory: string;
  images: string[];
  stock: number;
  features: string[];
  brand?: string;
  rating?: number;
  reviews?: Review[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
