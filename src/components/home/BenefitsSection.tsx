
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Truck, HeadphonesFilled, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Truck,
    title: "Envío a Todo Colombia",
    description: "Entregamos tus productos con rapidez y seguridad en todo el territorio nacional."
  },
  {
    icon: ShieldCheck,
    title: "Garantía de Calidad",
    description: "Todos nuestros productos cuentan con garantía de 12 meses como mínimo."
  },
  {
    icon: HeadphonesFilled,
    title: "Soporte Personalizado",
    description: "Nuestro equipo está disponible para asesorarte antes, durante y después de tu compra."
  },
  {
    icon: CreditCard,
    title: "Compra Segura",
    description: "Utilizamos los más altos estándares de seguridad para proteger tus datos y pagos."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-16 container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center h-full">
                <div className="rounded-full bg-brand-100 p-4 mb-4">
                  <benefit.icon className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
