import { Link } from "react-router-dom";
import { Mail, Phone, CreditCard, Shield, Truck } from "lucide-react";
const Footer = () => {
  return <footer className="bg-gray-100 mt-16">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Electro-Estelar</h3>
            <p className="text-gray-600 mb-4">
              Tu tienda online de muebles, electrónica y tecnología de alta calidad en Colombia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-brand-600">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-600">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-600">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li><Link to="/categoria/furniture" className="text-gray-600 hover:text-brand-600">Muebles</Link></li>
              <li><Link to="/categoria/electronics" className="text-gray-600 hover:text-brand-600">Electrónica</Link></li>
              <li><Link to="/categoria/technology" className="text-gray-600 hover:text-brand-600">Tecnología</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Información</h3>
            <ul className="space-y-2">
              <li><Link to="/nosotros" className="text-gray-600 hover:text-brand-600">Sobre Nosotros</Link></li>
              <li><Link to="/politica-envios" className="text-gray-600 hover:text-brand-600">Política de Envíos</Link></li>
              <li><Link to="/politica-devoluciones" className="text-gray-600 hover:text-brand-600">Política de Devoluciones</Link></li>
              <li><Link to="/politica-garantia" className="text-gray-600 hover:text-brand-600">Política de Garantía</Link></li>
              <li><Link to="/contacto" className="text-gray-600 hover:text-brand-600">Contacto</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contáctanos</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-brand-600" />
                <span className="text-gray-600">+57 310-7722311</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-brand-600" />
                <span className="text-gray-600">info@electroestelar.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Métodos de Pago</h4>
              <div className="flex items-center space-x-3">
                <CreditCard className="h-8 w-8 text-gray-600" />
                <Shield className="h-8 w-8 text-gray-600" />
                <span className="font-medium text-gray-600">PSE</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-center md:justify-start">
              <Truck className="h-6 w-6 mr-2 text-brand-600" />
              <span className="text-gray-600">Envío a todo Colombia</span>
            </div>
            <div className="flex items-center justify-center">
              <Shield className="h-6 w-6 mr-2 text-brand-600" />
              <span className="text-gray-600">Pago 100% Seguro</span>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <CreditCard className="h-6 w-6 mr-2 text-brand-600" />
              <span className="text-gray-600">Múltiples métodos de pago</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Electro-Estelar. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;