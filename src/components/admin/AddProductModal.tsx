
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { createProduct } from "@/services/productService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductImageUpload } from "./ProductImageUpload";
import { ProductFormFields, productSchema } from "./ProductFormFields";
import { useImageUpload } from "@/hooks/useImageUpload";
import * as z from "zod";

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function AddProductModal({ open, onOpenChange, onSuccess }: AddProductModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { 
    uploadedImages, 
    isUploading, 
    uploadError, 
    handleImageUpload, 
    removeImage, 
    setUploadedImages 
  } = useImageUpload();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      subcategory: "",
      stock: 0,
      brand: "",
      images: [],
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: z.infer<typeof productSchema>) => {
      // Asegurar que todos los campos obligatorios estén correctamente tipados
      const productData = {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        subcategory: data.subcategory,
        stock: data.stock,
        brand: data.brand || undefined,
        images: uploadedImages,
        features: [],
      };
      return createProduct(productData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Producto creado",
        description: "El producto ha sido creado exitosamente.",
      });
      onSuccess?.();
      form.reset();
      setUploadedImages([]);
      onOpenChange(false);
    },
    onError: (error) => {
      console.error('Error creating product:', error);
      toast({
        title: "Error",
        description: "Hubo un error al crear el producto. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof productSchema>) => {
    createProductMutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Añadir nuevo producto</DialogTitle>
          <DialogDescription>
            Completa el formulario para añadir un nuevo producto al catálogo.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ProductFormFields form={form} />
            
            <ProductImageUpload
              uploadedImages={uploadedImages}
              isUploading={isUploading}
              uploadError={uploadError}
              onUpload={handleImageUpload}
              onRemove={removeImage}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  onOpenChange(false);
                  form.reset();
                  setUploadedImages([]);
                }}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={createProductMutation.isPending || isUploading}
              >
                {createProductMutation.isPending ? "Creando..." : "Crear producto"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
