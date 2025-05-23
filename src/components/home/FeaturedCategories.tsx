
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Muebles",
    description: "Diseños que transforman tu espacio",
    image: "/lovable-uploads/0215b4a6-7d45-48f4-bbde-fce166395909.png",
    link: "/categoria/furniture"
  },
  {
    name: "Electrónica",
    description: "Vive la innovación en sonido e imagen",
    image: "/lovable-uploads/826bd909-8423-4f32-b7b7-77e03afca3d1.png",
    link: "/categoria/electronics"
  },
  {
    name: "Tecnología",
    description: "Rendimiento superior para tus ideas",
    image: "/lovable-uploads/7246abdb-61eb-48a6-93e1-5609efa5d283.png",
    link: "/categoria/technology"
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-600 font-medium text-sm uppercase tracking-wider"
          >
            Explora nuestras
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mt-1 mb-4"
          >
            Categorías Destacadas
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-accent mx-auto mb-6"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div 
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl shadow-lg h-80"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                <p className="text-white/90 mb-4 text-sm">{category.description}</p>
                <Link to={category.link} className="inline-block">
                  <Button 
                    variant="outline" 
                    className="bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-brand-700 border-white/20"
                  >
                    Ver productos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
