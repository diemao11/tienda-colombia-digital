
import { Product } from "@/types/product";

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  stock: number;
  images: string[];
  features: string[];
  brand?: string;
}

export interface CategoryData {
  id: string;
  name: string;
}

export interface SubcategoryData {
  id: string;
  name: string;
}

export interface BrandData {
  id: string;
  name: string;
}

export interface ProductImageData {
  url: string;
  position: number;
}

