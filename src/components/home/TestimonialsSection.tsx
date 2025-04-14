
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "María Rodríguez",
    location: "Bogotá",
    text: "Compré un sofá nuevo y estoy encantada con la calidad. El proceso de compra fue muy sencillo y la entrega puntual. Sin duda volveré a comprar en TiendaColombia."
  },
  {
    name: "Carlos Jiménez",
    location: "Medellín",
    text: "Increíble selección de laptops y la atención al cliente es de primera. Mi pedido llegó antes de lo esperado y con todo en perfecto estado. Recomiendo 100%!"
  },
  {
    name: "Ana Martínez",
    location: "Cali",
    text: "Compré un televisor y un sistema de audio. La calidad de los productos es excelente y el precio muy competitivo. El servicio post-venta también ha sido muy bueno."
  },
  {
    name: "Juan López",
    location: "Barranquilla",
    text: "Excelente servicio y productos de calidad. La entrega fue rápida y el empaque muy seguro. No dudaré en recomendarlos a mis amigos y familiares."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-600 font-medium text-sm uppercase tracking-wider"
          >
            Testimonios
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mt-1 mb-4"
          >
            Lo que dicen nuestros clientes
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-accent mx-auto mb-6"
          ></motion.div>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-4 h-full">
                  <Card className="h-full border-none shadow-md bg-white">
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full">
                        <div className="mb-4 text-accent">
                          <Quote className="h-8 w-8 rotate-180" />
                        </div>
                        <p className="text-gray-700 mb-6 flex-1">
                          "{testimonial.text}"
                        </p>
                        <div className="mt-auto">
                          <Separator className="mb-4" />
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold mr-3">
                              {testimonial.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{testimonial.name}</p>
                              <p className="text-sm text-gray-500">{testimonial.location}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
