
import { supabase } from "@/integrations/supabase/client";

export const findOrCreateSubcategory = async (subcategoryName: string, categoryId: string): Promise<string | null> => {
  if (!subcategoryName || !categoryId) return null;

  // Buscar si ya existe la subcategoría
  const { data: existingSubcategory } = await supabase
    .from('subcategories')
    .select('id')
    .eq('name', subcategoryName)
    .eq('category_id', categoryId)
    .maybeSingle();
  
  if (existingSubcategory) {
    console.log("Subcategory exists, using id:", existingSubcategory.id);
    return existingSubcategory.id;
  }

  // Crear la subcategoría si no existe
  const slug = subcategoryName.toLowerCase().replace(/\s+/g, '-');
  const { data: newSubcategory, error: subcategoryError } = await supabase
    .from('subcategories')
    .insert({ 
      name: subcategoryName, 
      slug, 
      category_id: categoryId 
    })
    .select('id')
    .single();
  
  if (subcategoryError) {
    console.error("Error creating subcategory:", subcategoryError);
    throw subcategoryError;
  }

  console.log("Created new subcategory with id:", newSubcategory.id);
  return newSubcategory.id;
};

