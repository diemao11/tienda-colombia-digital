
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ArrowRight, TrendingUp, Shield, Truck, Clock } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const HomePage = () => {
  // Get a selection of featured products (one from each category)
  const featuredProducts = products.filter((product, index) => index < 4);
  
  // Get the latest products (most recently added)
  const newArrivals = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  
  // Get bestsellers (products with highest rating)
  const bestSellers = [...products]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section relative flex items-center justify-center min-h-[70vh] mb-16">
        <div className="container mx-auto px-4 md:px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Tu Hogar, Tu Tecnología
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Los mejores productos para tu hogar y tus necesidades tecnológicas, con envíos a todo Colombia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/categoria/furniture">
              <Button size="lg" className="min-w-[150px]">Muebles</Button>
            </Link>
            <Link to="/categoria/electronics">
              <Button size="lg" variant="outline" className="min-w-[150px] bg-white text-brand-600 hover:bg-gray-100">Electrónica</Button>
            </Link>
            <Link to="/categoria/technology">
              <Button size="lg" variant="outline" className="min-w-[150px] bg-white text-brand-600 hover:bg-gray-100">Tecnología</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 md:px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Truck className="h-10 w-10 text-brand-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Envío a Todo Colombia</h3>
              <p className="text-gray-600">
                Entregamos tus productos con rapidez y seguridad en todo el territorio nacional.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Shield className="h-10 w-10 text-brand-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Garantía de Calidad</h3>
              <p className="text-gray-600">
                Todos nuestros productos cuentan con garantía de 12 meses como mínimo.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <TrendingUp className="h-10 w-10 text-brand-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Soporte Personalizado</h3>
              <p className="text-gray-600">
                Nuestro equipo está disponible para asesorarte antes, durante y después de tu compra.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Clock className="h-10 w-10 text-brand-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Compra Segura</h3>
              <p className="text-gray-600">
                Utilizamos los más altos estándares de seguridad para proteger tus datos y pagos.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-16 mb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Nuestras Categorías</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explora nuestra amplia selección de productos para todas tus necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video relative">
                <img 
                  src="/categories/furniture.jpg" 
                  alt="Muebles" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Muebles</h3>
                    <p className="text-white/80 mb-4">Diseños que transforman tu espacio</p>
                    <Link to="/categoria/furniture">
                      <Button variant="outline" className="bg-white text-brand-600 hover:bg-gray-100">
                        Explorar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video relative">
                <img 
                  src="/categories/electronics.jpg" 
                  alt="Electrónica" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Electrónica</h3>
                    <p className="text-white/80 mb-4">Vive la innovación en sonido e imagen</p>
                    <Link to="/categoria/electronics">
                      <Button variant="outline" className="bg-white text-brand-600 hover:bg-gray-100">
                        Explorar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video relative">
                <img 
                  src="/categories/technology.jpg" 
                  alt="Tecnología" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Tecnología</h3>
                    <p className="text-white/80 mb-4">Rendimiento superior para tus ideas</p>
                    <Link to="/categoria/technology">
                      <Button variant="outline" className="bg-white text-brand-600 hover:bg-gray-100">
                        Explorar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 md:px-6 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Productos Destacados</h2>
          <Link to="/tienda" className="text-brand-600 hover:underline flex items-center">
            Ver todos
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 md:px-6 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Nuevos Ingresos</h2>
          <Link to="/tienda" className="text-brand-600 hover:underline flex items-center">
            Ver todos
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <ProductGrid products={newArrivals} />
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4 md:px-6 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Los Más Vendidos</h2>
          <Link to="/tienda" className="text-brand-600 hover:underline flex items-center">
            Ver todos
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <ProductGrid products={bestSellers} />
      </section>

      {/* Testimonials */}
      <section className="bg-brand-50 py-16 mb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Miles de colombianos confían en nosotros para sus compras de muebles y tecnología
            </p>
          </div>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              <CarouselItem className="md:basis-1/2">
                <div className="p-4 h-full">
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full">
                        <div className="mb-4">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className="w-5 h-5 text-yellow-400 fill-current"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-6 flex-1">
                          "Compré un sofá nuevo y estoy encantada con la calidad. El proceso de compra fue muy sencillo y la entrega puntual. Sin duda volveré a comprar en TiendaColombia."
                        </p>
                        <div className="mt-auto">
                          <Separator className="mb-4" />
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                            <div>
                              <p className="font-medium">María Rodríguez</p>
                              <p className="text-sm text-gray-500">Bogotá</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2">
                <div className="p-4 h-full">
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full">
                        <div className="mb-4">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className="w-5 h-5 text-yellow-400 fill-current"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-6 flex-1">
                          "Increíble selección de laptops y la atención al cliente es de primera. Mi pedido llegó antes de lo esperado y con todo en perfecto estado. Recomiendo 100%!"
                        </p>
                        <div className="mt-auto">
                          <Separator className="mb-4" />
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                            <div>
                              <p className="font-medium">Carlos Jiménez</p>
                              <p className="text-sm text-gray-500">Medellín</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2">
                <div className="p-4 h-full">
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full">
                        <div className="mb-4">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className="w-5 h-5 text-yellow-400 fill-current"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-6 flex-1">
                          "Compré un televisor y un sistema de audio. La calidad de los productos es excelente y el precio muy competitivo. El servicio post-venta también ha sido muy bueno."
                        </p>
                        <div className="mt-auto">
                          <Separator className="mb-4" />
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                            <div>
                              <p className="font-medium">Ana Martínez</p>
                              <p className="text-sm text-gray-500">Cali</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 md:px-6 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Suscríbete a nuestro newsletter</h2>
          <p className="text-gray-600 mb-6">
            Mantente al día con nuestras últimas novedades, promociones exclusivas y consejos para tu hogar y tecnología.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="flex-1"
            />
            <Button>Suscribirme</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
