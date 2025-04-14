
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-700 to-brand-800 text-white">
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="/hero-background.jpg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container relative z-10 mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-28">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-block bg-accent/90 text-white px-4 py-1 rounded-full text-sm font-medium"
          >
            La mejor tienda en Colombia
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Tu Hogar, <span className="text-accent">Tu Tecnología</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl"
          >
            Los mejores productos para tu hogar y tus necesidades tecnológicas, con envíos a todo Colombia.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-white text-lg px-8 shadow-lg">
              <Link to="/tienda">Explorar Tienda</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white/10 text-lg px-8">
              <Link to="/nosotros">Conocer Más</Link>
            </Button>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
