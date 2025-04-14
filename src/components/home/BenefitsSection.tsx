
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Truck, Headphones, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Truck,
    title: "Envío Gratuito",
    description: "Entregamos tus productos sin costo adicional en todo Colombia."
  },
  {
    icon: ShieldCheck,
    title: "Garantía de Calidad",
    description: "Todos nuestros productos con garantía de 12 meses."
  },
  {
    icon: Headphones,
    title: "Soporte 24/7",
    description: "Nuestro equipo disponible para ayudarte en cualquier momento."
  },
  {
    icon: CreditCard,
    title: "Pago Seguro",
    description: "Utilizamos los más altos estándares de seguridad para tus pagos."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 p-4">
                <div className="rounded-full bg-brand-50 p-3 flex-shrink-0">
                  <benefit.icon className="h-5 w-5 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-medium text-base mb-0.5 text-gray-800">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
