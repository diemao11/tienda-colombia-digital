
import { supabase } from "@/integrations/supabase/client";

export const findOrCreateBrand = async (brandName: string | undefined): Promise<string | null> => {
  if (!brandName) return null;

  // Buscar si ya existe la marca
  const { data: existingBrand } = await supabase
    .from('brands')
    .select('id')
    .eq('name', brandName)
    .maybeSingle();
  
  if (existingBrand) {
    console.log("Brand exists, using id:", existingBrand.id);
    return existingBrand.id;
  }

  // Crear la marca si no existe
  const { data: newBrand, error: brandError } = await supabase
    .from('brands')
    .insert({ name: brandName })
    .select('id')
    .single();
  
  if (brandError) {
    console.error("Error creating brand:", brandError);
    throw brandError;
  }

  console.log("Created new brand with id:", newBrand.id);
  return newBrand.id;
};

