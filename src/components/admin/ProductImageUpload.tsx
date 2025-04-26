
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { AlertCircle, Upload, X } from "lucide-react";

interface ProductImageUploadProps {
  uploadedImages: string[];
  isUploading: boolean;
  uploadError: string | null;
  onUpload: (files: FileList | null) => void;
  onRemove: (index: number) => void;
}

export const ProductImageUpload = ({
  uploadedImages,
  isUploading,
  uploadError,
  onUpload,
  onRemove
}: ProductImageUploadProps) => {
  return (
    <div className="space-y-4">
      <FormLabel>Imágenes del producto</FormLabel>
      
      {uploadError && (
        <div className="bg-red-50 p-3 rounded-md flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
          <div className="text-sm text-red-600">{uploadError}</div>
        </div>
      )}
      
      <div className="flex flex-wrap gap-4">
        {uploadedImages.map((url, index) => (
          <div key={url} className="relative">
            <div className="w-24 h-24 border rounded-md overflow-hidden bg-gray-50">
              <img
                src={url}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-contain p-1"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6"
              onClick={() => onRemove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp, image/gif"
          multiple
          onChange={(e) => onUpload(e.target.files)}
          className="hidden"
          id="image-upload"
          disabled={isUploading}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('image-upload')?.click()}
          disabled={isUploading}
        >
          <Upload className="mr-2 h-4 w-4" />
          {isUploading ? "Subiendo..." : "Subir imágenes"}
        </Button>
        <div className="text-sm text-gray-500">
          Formatos permitidos: JPG, PNG, WebP, GIF. Máx 5MB.
        </div>
      </div>
    </div>
  );
};
