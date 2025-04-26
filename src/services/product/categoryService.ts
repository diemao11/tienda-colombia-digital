
import { supabase } from "@/integrations/supabase/client";
import { CategoryData } from "./types";

export const findOrCreateCategory = async (categoryName: string): Promise<string | null> => {
  // Buscar si ya existe la categoría
  const { data: existingCategory } = await supabase
    .from('categories')
    .select('id')
    .eq('name', categoryName)
    .maybeSingle();
  
  if (existingCategory) {
    console.log("Category exists, using id:", existingCategory.id);
    return existingCategory.id;
  }

  // Crear la categoría si no existe
  const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
  const { data: newCategory, error: categoryError } = await supabase
    .from('categories')
    .insert({ name: categoryName, slug })
    .select('id')
    .single();
  
  if (categoryError) {
    console.error("Error creating category:", categoryError);
    throw categoryError;
  }

  console.log("Created new category with id:", newCategory.id);
  return newCategory.id;
};

export const translateCategoryName = (categoryName: string): "furniture" | "electronics" | "technology" => {
  const lowerCaseName = categoryName.toLowerCase();
  
  // Map Spanish category names to their English equivalents for the type system
  if (lowerCaseName === "muebles" || lowerCaseName === "furniture") return "furniture";
  if (lowerCaseName === "electrónica" || lowerCaseName === "electronica" || lowerCaseName === "electronics") return "electronics";
  if (lowerCaseName === "tecnología" || lowerCaseName === "tecnologia" || lowerCaseName === "technology") return "technology";
  
  // Default to "furniture" as a fallback to satisfy the type system
  console.warn(`Unknown category: ${categoryName}, defaulting to "furniture"`);
  return "furniture";
};
