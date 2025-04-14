
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
        <div className="flex justify-between items-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold"
          >
            {title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to={viewAllLink} className="text-brand-600 hover:text-brand-800 flex items-center group">
              <span className="mr-1">Ver todos</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
};

export default ProductShowcase;
