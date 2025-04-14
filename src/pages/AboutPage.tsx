
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, Users, TrendingUp, ThumbsUp } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Sobre Nosotros</h1>
        <p className="text-lg text-gray-600">
          Descubre nuestra historia y nuestra misión de ofrecer los mejores productos para el hogar y la tecnología en Colombia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Nuestra Historia</h2>
          <p className="text-gray-700 mb-4">
            TiendaColombia nació en 2018 con un propósito claro: transformar la forma en que los colombianos compran muebles y tecnología. Fundada por emprendedores con experiencia en diseño, tecnología y comercio electrónico, nuestra empresa comenzó con un pequeño catálogo de productos cuidadosamente seleccionados.
          </p>
          <p className="text-gray-700 mb-4">
            Con el paso de los años, hemos crecido hasta convertirnos en una de las tiendas online de referencia en Colombia, ampliando nuestro catálogo para ofrecer miles de productos de alta calidad en las categorías de muebles, electrónica y tecnología.
          </p>
          <p className="text-gray-700">
            Hoy, nos enorgullece haber servido a más de 50,000 clientes satisfechos en todo el país, manteniendo siempre nuestro compromiso con la calidad, el servicio y la innovación.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src="/about-us.jpg"
            alt="Equipo de TiendaColombia"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Nuestros Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="bg-brand-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Award className="text-brand-600 h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Calidad</h3>
            <p className="text-gray-600">
              Seleccionamos cuidadosamente cada producto de nuestro catálogo, asegurando que cumpla con los más altos estándares.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="bg-brand-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <ThumbsUp className="text-brand-600 h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Confianza</h3>
            <p className="text-gray-600">
              Construimos relaciones duraderas con nuestros clientes basadas en la transparencia y el cumplimiento.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="bg-brand-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <TrendingUp className="text-brand-600 h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Innovación</h3>
            <p className="text-gray-600">
              Estamos constantemente buscando nuevas formas de mejorar la experiencia de compra de nuestros clientes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="bg-brand-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Users className="text-brand-600 h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Servicio</h3>
            <p className="text-gray-600">
              Nuestro equipo está comprometido a ofrecer un servicio excepcional, antes, durante y después de la compra.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-brand-50 rounded-lg p-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
          <p className="text-gray-700 mb-8">
            En TiendaColombia, nos dedicamos a mejorar la calidad de vida de los colombianos a través de productos de calidad para el hogar y la tecnología. Nos esforzamos por ofrecer una experiencia de compra excepcional, combinando la mejor selección de productos, precios competitivos y un servicio de atención al cliente de primera clase.
          </p>
          <Link to="/contacto">
            <Button size="lg">Contáctanos</Button>
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">¿Cómo realizan sus envíos?</h3>
            <p className="text-gray-600">
              Trabajamos con empresas de logística líderes en Colombia para garantizar que tus productos lleguen de manera segura y puntual a tu hogar u oficina.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">¿Cuál es su política de devoluciones?</h3>
            <p className="text-gray-600">
              Ofrecemos 10 días para devoluciones en la mayoría de nuestros productos. Puedes consultar nuestra política completa en la sección de Devoluciones y Reembolsos.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">¿Ofrecen garantía en sus productos?</h3>
            <p className="text-gray-600">
              Sí, todos nuestros productos tienen garantía. El período varía según la categoría y el fabricante, siendo el mínimo 12 meses para la mayoría de los artículos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
