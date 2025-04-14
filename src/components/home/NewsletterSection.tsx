
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { EnvelopeOpen } from "lucide-react";

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
    <section className="py-16 bg-brand-700 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-brand-600 rounded-full p-3 inline-block">
              <EnvelopeOpen className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Suscríbete a nuestro newsletter</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Mantente al día con nuestras últimas novedades, promociones exclusivas y consejos para tu hogar y tecnología.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-white">
              Suscribirme
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
