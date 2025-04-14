
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types/product";
import ProductGrid from "@/components/ProductGrid";
import { motion } from "framer-motion";

interface ProductShowcaseProps {
  title: string;
  products: Product[];
  viewAllLink: string;
  bgColor?: string;
}

const ProductShowcase = ({ title, products, viewAllLink, bgColor = "bg-white" }: ProductShowcaseProps) => {
  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-600 font-medium text-sm uppercase tracking-wider"
          >
            Selección especial
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mt-1 mb-4"
          >
            {title}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-accent mx-auto mb-6"
          ></motion.div>
        </div>
        
        <ProductGrid products={products} />
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <Link to={viewAllLink} className="group flex items-center gap-2 text-brand-600 hover:text-brand-800 font-medium transition-all">
            <span>Ver todos los productos</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
