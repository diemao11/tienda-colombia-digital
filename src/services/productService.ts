
import { supabase } from "@/integrations/supabase/client";
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

export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:category_id(name),
      subcategory:subcategory_id(name),
      brand:brand_id(name),
      product_images(url, position)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  // Transformar los datos para que coincidan con la estructura de Product
  return data.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description || "",
    price: item.price,
    category: item.category?.name || "Sin categoría",
    subcategory: item.subcategory?.name || "",
    images: item.product_images?.map(img => img.url) || [],
    stock: item.stock,
    features: item.features || [],
    brand: item.brand?.name
  })) as Product[];
};

export const fetchProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:category_id(id, name),
      subcategory:subcategory_id(id, name),
      brand:brand_id(id, name),
      product_images(id, url, position)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    throw error;
  }

  return {
    id: data.id,
    name: data.name,
    description: data.description || "",
    price: data.price,
    category: data.category?.name || "Sin categoría",
    subcategory: data.subcategory?.name || "",
    images: data.product_images?.map(img => img.url) || [],
    stock: data.stock,
    features: data.features || [],
    brand: data.brand?.name
  } as Product;
};

export const createProduct = async (productData: ProductFormData) => {
  try {
    console.log("Creating product with data:", productData);
    
    // Primero buscamos o creamos la categoría
    let categoryId = null;
    if (productData.category) {
      // Buscar si ya existe la categoría
      const { data: existingCategory } = await supabase
        .from('categories')
        .select('id')
        .eq('name', productData.category)
        .maybeSingle();
      
      if (existingCategory) {
        categoryId = existingCategory.id;
        console.log("Category exists, using id:", categoryId);
      } else {
        // Crear la categoría si no existe
        const slug = productData.category.toLowerCase().replace(/\s+/g, '-');
        const { data: newCategory, error: categoryError } = await supabase
          .from('categories')
          .insert({ name: productData.category, slug })
          .select('id')
          .single();
        
        if (categoryError) {
          console.error("Error creating category:", categoryError);
          throw categoryError;
        }
        categoryId = newCategory.id;
        console.log("Created new category with id:", categoryId);
      }
    }

    // Luego buscamos o creamos la subcategoría si tenemos una categoría
    let subcategoryId = null;
    if (productData.subcategory && categoryId) {
      // Buscar si ya existe la subcategoría
      const { data: existingSubcategory } = await supabase
        .from('subcategories')
        .select('id')
        .eq('name', productData.subcategory)
        .eq('category_id', categoryId)
        .maybeSingle();
      
      if (existingSubcategory) {
        subcategoryId = existingSubcategory.id;
        console.log("Subcategory exists, using id:", subcategoryId);
      } else {
        // Crear la subcategoría si no existe
        const slug = productData.subcategory.toLowerCase().replace(/\s+/g, '-');
        const { data: newSubcategory, error: subcategoryError } = await supabase
          .from('subcategories')
          .insert({ 
            name: productData.subcategory, 
            slug, 
            category_id: categoryId 
          })
          .select('id')
          .single();
        
        if (subcategoryError) {
          console.error("Error creating subcategory:", subcategoryError);
          throw subcategoryError;
        }
        subcategoryId = newSubcategory.id;
        console.log("Created new subcategory with id:", subcategoryId);
      }
    }

    // Buscamos o creamos la marca
    let brandId = null;
    if (productData.brand) {
      // Buscar si ya existe la marca
      const { data: existingBrand } = await supabase
        .from('brands')
        .select('id')
        .eq('name', productData.brand)
        .maybeSingle();
      
      if (existingBrand) {
        brandId = existingBrand.id;
        console.log("Brand exists, using id:", brandId);
      } else {
        // Crear la marca si no existe
        const { data: newBrand, error: brandError } = await supabase
          .from('brands')
          .insert({ name: productData.brand })
          .select('id')
          .single();
        
        if (brandError) {
          console.error("Error creating brand:", brandError);
          throw brandError;
        }
        brandId = newBrand.id;
        console.log("Created new brand with id:", brandId);
      }
    }

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

export const updateProduct = async (id: string, productData: ProductFormData) => {
  // Similar a createProduct pero actualizando un producto existente
  // [Código para actualizar categoría, subcategoría y marca, similar a createProduct]

  // Actualizar el producto
  const { error: productError } = await supabase
    .from('products')
    .update({
      name: productData.name,
      description: productData.description,
      price: productData.price,
      stock: productData.stock,
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
};

export const deleteProduct = async (id: string) => {
  // Eliminar el producto (las imágenes se eliminarán automáticamente por la relación ON DELETE CASCADE)
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};
