
import { Product } from "@/types/product";
import { translateCategoryName } from "./categoryService";

export const mapProductFromDB = (item: any): Product => {
  const categoryName = item.category?.name || "Sin categoría";
  
  return {
    id: item.id,
    name: item.name,
    description: item.description || "",
    price: item.price,
    category: translateCategoryName(categoryName),
    subcategory: item.subcategory?.name || "",
    images: item.product_images?.map(img => img.url) || [],
    stock: item.stock,
    features: item.features || [],
    brand: item.brand?.name
  };
};
