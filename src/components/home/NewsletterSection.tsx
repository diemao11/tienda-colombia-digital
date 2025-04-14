
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "¡Subscripción exitosa!",
        description: "Te has suscrito correctamente a nuestro newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-16 container mx-auto px-4 md:px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100"
      >
        <h2 className="text-2xl font-bold mb-4">Suscríbete a nuestro newsletter</h2>
        <p className="text-gray-600 mb-6">
          Mantente al día con nuestras últimas novedades, promociones exclusivas y consejos para tu hogar y tecnología.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input 
            type="email" 
            placeholder="Tu correo electrónico" 
            className="flex-1"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="bg-brand-600 hover:bg-brand-700">
            Suscribirme
          </Button>
        </form>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
