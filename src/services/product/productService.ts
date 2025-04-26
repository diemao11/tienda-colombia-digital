
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";
import { ProductFormData } from "./types";
import { findOrCreateCategory } from "./categoryService";
import { findOrCreateSubcategory } from "./subcategoryService";
import { findOrCreateBrand } from "./brandService";
import { mapProductFromDB } from "./productMapper";

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(id, name),
      subcategory:subcategories(id, name),
      brand:brands(name),
      product_images(url, position)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  console.log("Products fetched from DB:", data);
  return data.map(mapProductFromDB);
};

export const fetchProduct = async (id: string): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(id, name),
      subcategory:subcategories(id, name),
      brand:brands(id, name),
      product_images(id, url, position)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    throw error;
  }

  return mapProductFromDB(data);
};

export const createProduct = async (productData: ProductFormData): Promise<string> => {
  try {
    console.log("Creating product with data:", productData);
    
    const categoryId = await findOrCreateCategory(productData.category);
    const subcategoryId = categoryId ? await findOrCreateSubcategory(productData.subcategory, categoryId) : null;
    const brandId = await findOrCreateBrand(productData.brand);

    // Crear el slug del producto
    const slug = productData.name.toLowerCase().replace(/\s+/g, '-');

    // Insertamos el producto
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert({
        name: productData.name,
        slug,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        category_id: categoryId,
        subcategory_id: subcategoryId,
        brand_id: brandId,
        features: productData.features
      })
      .select('id')
      .single();

    if (productError) {
      console.error("Error creating product:", productError);
      throw productError;
    }
    
    console.log("Product created with id:", product.id);

    // Insertamos las imágenes del producto
    if (productData.images && productData.images.length > 0) {
      const imagesData = productData.images.map((url, index) => ({
        product_id: product.id,
        url,
        position: index
      }));

      const { error: imagesError } = await supabase
        .from('product_images')
        .insert(imagesData);

      if (imagesError) {
        console.error("Error creating product images:", imagesError);
        throw imagesError;
      }
      
      console.log("Added images for product:", imagesData.length);
    }

    return product.id;
  } catch (error) {
    console.error("Complete error in createProduct:", error);
    throw error;
  }
};

export const updateProduct = async (id: string, productData: ProductFormData): Promise<string> => {
  try {
    console.log("Updating product with data:", productData);
    
    const categoryId = await findOrCreateCategory(productData.category);
    const subcategoryId = categoryId ? await findOrCreateSubcategory(productData.subcategory, categoryId) : null;
    const brandId = await findOrCreateBrand(productData.brand);

    // Actualizar el producto
    const { error: productError } = await supabase
      .from('products')
      .update({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        category_id: categoryId,
        subcategory_id: subcategoryId,
        brand_id: brandId,
        features: productData.features
      })
      .eq('id', id);

    if (productError) throw productError;

    // Actualizar las imágenes (eliminar las existentes y añadir las nuevas)
    if (productData.images) {
      // Eliminar imágenes existentes
      await supabase
        .from('product_images')
        .delete()
        .eq('product_id', id);

      // Añadir nuevas imágenes
      if (productData.images.length > 0) {
        const imagesData = productData.images.map((url, index) => ({
          product_id: id,
          url,
          position: index
        }));

        const { error: imagesError } = await supabase
          .from('product_images')
          .insert(imagesData);

        if (imagesError) throw imagesError;
      }
    }

    return id;
  } catch (error) {
    console.error("Complete error in updateProduct:", error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

