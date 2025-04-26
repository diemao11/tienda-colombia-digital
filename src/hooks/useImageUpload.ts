
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useImageUpload = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);
    try {
      const newImages: string[] = [];

      for (const file of Array.from(files)) {
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`El archivo ${file.name} excede el tamaño máximo de 5MB`);
        }

        if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
          throw new Error(`El archivo ${file.name} no es una imagen válida`);
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('products')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);

        newImages.push(publicUrl);
      }

      setUploadedImages([...uploadedImages, ...newImages]);
      toast({
        title: "Imágenes subidas",
        description: "Las imágenes se han subido correctamente.",
      });
      return newImages;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      setUploadError(error.message || "Error al subir las imágenes");
      toast({
        title: "Error",
        description: error.message || "Error al subir las imágenes. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
    return newImages;
  };

  return {
    uploadedImages,
    isUploading,
    uploadError,
    handleImageUpload,
    removeImage,
    setUploadedImages
  };
};
