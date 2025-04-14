
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RefreshCcw,
  Check,
  MinusCircle,
  PlusCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getProductById, formatPrice } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-medium mb-4">Producto no encontrado</h2>
          <p className="text-gray-500 mb-8">
            El producto que buscas no existe o ha sido removido.
          </p>
          <Link to="/">
            <Button>Volver a la tienda</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get related products from the same category
  const relatedProducts = products
    .filter(
      (p) => p.category === product.category && p.id !== product.id
    )
    .slice(0, 4);

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const getStockStatus = () => {
    if (product.stock === 0) {
      return <Badge variant="destructive">Agotado</Badge>;
    } else if (product.stock <= 3) {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">¡Pocas unidades!</Badge>;
    } else {
      return <Badge variant="secondary" className="bg-green-100 text-green-800">En Stock</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-brand-600">Inicio</Link>
        <span className="mx-2">/</span>
        <Link 
          to={`/categoria/${product.category}`} 
          className="hover:text-brand-600"
        >
          {product.category === "furniture" ? "Muebles" : 
          product.category === "electronics" ? "Electrónica" : "Tecnología"}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images[activeImageIndex] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${
                    activeImageIndex === index ? "border-brand-600" : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Vista ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          {/* Rating and SKU */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {product.rating && (
                <>
                  <div className="flex items-center mr-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating}/5 ({product.reviews?.length || 0} reseñas)
                  </span>
                </>
              )}
            </div>
            <div className="text-sm text-gray-500">
              <span>SKU: {product.id.toUpperCase()}</span>
            </div>
          </div>
          
          {/* Price and Stock */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-brand-600">
                {formatPrice(product.price)}
              </div>
              <div>{getStockStatus()}</div>
            </div>
            {product.stock > 0 && (
              <p className="text-sm text-gray-600">
                {product.stock} unidades disponibles
              </p>
            )}
          </div>
          
          {/* Short Description */}
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Add to Cart */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center border rounded-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1 || product.stock === 0}
                  className="rounded-none h-10 w-10"
                >
                  <MinusCircle className="h-5 w-5" />
                </Button>
                <div className="w-12 h-10 flex items-center justify-center">
                  {quantity}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock || product.stock === 0}
                  className="rounded-none h-10 w-10"
                >
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Añadir al carrito
              </Button>
            </div>
          </div>
          
          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center bg-gray-50 p-3 rounded-md">
              <Truck className="h-5 w-5 text-brand-600 mr-2" />
              <div className="text-sm">
                <p className="font-medium">Envío rápido</p>
                <p className="text-gray-500">Todo Colombia</p>
              </div>
            </div>
            <div className="flex items-center bg-gray-50 p-3 rounded-md">
              <Shield className="h-5 w-5 text-brand-600 mr-2" />
              <div className="text-sm">
                <p className="font-medium">Garantía</p>
                <p className="text-gray-500">12 meses</p>
              </div>
            </div>
            <div className="flex items-center bg-gray-50 p-3 rounded-md">
              <RefreshCcw className="h-5 w-5 text-brand-600 mr-2" />
              <div className="text-sm">
                <p className="font-medium">Devoluciones</p>
                <p className="text-gray-500">10 días</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for additional information */}
      <Tabs defaultValue="details" className="mb-12">
        <TabsList className="w-full">
          <TabsTrigger value="details" className="flex-1">Detalles</TabsTrigger>
          <TabsTrigger value="features" className="flex-1">Características</TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1">Reseñas</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="p-4 border rounded-md mt-4">
          <h3 className="text-xl font-semibold mb-4">Descripción del producto</h3>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget
            aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies
            tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
          </p>
        </TabsContent>
        <TabsContent value="features" className="p-4 border rounded-md mt-4">
          <h3 className="text-xl font-semibold mb-4">Características</h3>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="reviews" className="p-4 border rounded-md mt-4">
          <h3 className="text-xl font-semibold mb-4">Reseñas de clientes</h3>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <Card key={review.id} className="p-4">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">{review.user}</h4>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(review.date).toLocaleDateString('es-CO')}
                  </p>
                  <p>{review.comment}</p>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              Este producto aún no tiene reseñas. ¡Sé el primero en opinar!
            </p>
          )}
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
