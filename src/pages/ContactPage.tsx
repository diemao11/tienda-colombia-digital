
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Mensaje enviado con éxito. Nos pondremos en contacto pronto.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h1>
        <p className="text-lg text-gray-600">
          Estamos aquí para ayudarte. Ponte en contacto con nuestro equipo para
          cualquier consulta, sugerencia o soporte.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-brand-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Phone className="text-brand-600 h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Llámanos</h3>
              <p className="text-gray-600 mb-2">Atención al cliente de lunes a viernes</p>
              <a
                href="tel:+573001234567"
                className="text-brand-600 font-medium hover:underline"
              >
                +57 300 123 4567
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-brand-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Mail className="text-brand-600 h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Envíanos un email</h3>
              <p className="text-gray-600 mb-2">Te responderemos lo antes posible</p>
              <a
                href="mailto:info@tiendacolombia.com"
                className="text-brand-600 font-medium hover:underline"
              >
                info@tiendacolombia.com
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-brand-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MapPin className="text-brand-600 h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Visítanos</h3>
              <p className="text-gray-600 mb-2">Nuestra oficina principal</p>
              <address className="not-italic text-brand-600 font-medium">
                Calle 85 #11-53, Bogotá, Colombia
              </address>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Envíanos un mensaje</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono (opcional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="300 123 4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="¿Cómo podemos ayudarte?"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí..."
                rows={6}
                required
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </Button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Horario de atención</h2>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-start mb-4">
              <Clock className="text-brand-600 h-5 w-5 mt-0.5 mr-3" />
              <div>
                <p className="font-medium">Lunes a Viernes</p>
                <p className="text-gray-600">8:00 AM - 6:00 PM</p>
              </div>
            </div>
            <div className="flex items-start mb-4">
              <Clock className="text-brand-600 h-5 w-5 mt-0.5 mr-3" />
              <div>
                <p className="font-medium">Sábados</p>
                <p className="text-gray-600">9:00 AM - 2:00 PM</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="text-brand-600 h-5 w-5 mt-0.5 mr-3" />
              <div>
                <p className="font-medium">Domingos y festivos</p>
                <p className="text-gray-600">Cerrado</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-6">Servicio al cliente</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="mb-4">
              Nuestro equipo de atención al cliente está disponible para ayudarte con:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span>Consultas sobre productos y disponibilidad</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span>Estado de pedidos y envíos</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span>Devoluciones y garantías</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span>Soporte técnico post-venta</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span>Cotizaciones para clientes empresariales</span>
              </li>
            </ul>
            <p className="text-gray-600">
              Tiempo promedio de respuesta: 24 horas hábiles
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden h-96 mb-16">
        <iframe
          title="Ubicación de TiendaColombia"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.5841467905384!2d-74.05565684971822!3d4.6686005432112945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a52c968b079%3A0x14fa78a4ac0afc79!2sCl.%2085%20%2311-53%2C%20Bogot%C3%A1%2C%20Colombia!5e0!3m2!1sen!2sus!4v1617800000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
