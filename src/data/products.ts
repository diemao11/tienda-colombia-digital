
import { Product } from "../types/product";

export const products: Product[] = [
  // Furniture
  {
    id: "f1",
    name: "Silla Ergonómica de Oficina",
    description: "Silla ergonómica de alta calidad con soporte lumbar ajustable y reposabrazos. Perfecta para largas jornadas de trabajo en casa u oficina.",
    price: 450000,
    category: "furniture",
    subcategory: "sillas",
    images: ["/products/chair-1.jpg", "/products/chair-2.jpg"],
    stock: 15,
    features: ["Soporte lumbar ajustable", "Reposabrazos 3D", "Base giratoria 360°", "Material transpirable", "Altura ajustable"],
    brand: "ErgoColombia",
    rating: 4.7,
    reviews: [
      {
        id: "r1",
        user: "Carlos Martínez",
        rating: 5,
        comment: "Excelente silla, muy cómoda para trabajar largas horas. La recomiendo totalmente.",
        date: "2023-10-15"
      }
    ]
  },
  {
    id: "f2",
    name: "Escritorio de Madera con Cajones",
    description: "Escritorio elegante de madera con tres cajones y amplia superficie de trabajo. Diseño moderno que combina con cualquier decoración.",
    price: 680000,
    category: "furniture",
    subcategory: "escritorios",
    images: ["/products/desk-1.jpg", "/products/desk-2.jpg"],
    stock: 8,
    features: ["Madera de alta calidad", "Tres cajones espaciosos", "Fácil montaje", "Resistente a rayones", "Dimensiones: 120x60x75 cm"],
    brand: "MaderaColombia",
    rating: 4.5
  },
  {
    id: "f3",
    name: "Sofá Modular de 3 Plazas",
    description: "Sofá modular de 3 plazas con tapizado premium y estructura resistente. Ideal para sala de estar o espacios de entretenimiento.",
    price: 1250000,
    category: "furniture",
    subcategory: "sofás",
    images: ["/products/sofa-1.jpg", "/products/sofa-2.jpg"],
    stock: 5,
    features: ["Tapizado premium", "Estructura resistente", "Cojines reversibles", "Fácil de limpiar", "Dimensiones: 220x85x90 cm"],
    brand: "ConfortHogar",
    rating: 4.8
  },
  
  // Electronics
  {
    id: "e1",
    name: "Smart TV 4K 55 pulgadas",
    description: "Televisor Smart 4K UHD de 55 pulgadas con resolución excepcional y sistema operativo intuitivo. Disfruta de tus contenidos favoritos con una calidad de imagen impresionante.",
    price: 1899000,
    category: "electronics",
    subcategory: "televisores",
    images: ["/products/tv-1.jpg", "/products/tv-2.jpg"],
    stock: 10,
    features: ["Resolución 4K UHD", "Smart TV", "HDR", "Bluetooth", "3 puertos HDMI", "2 puertos USB"],
    brand: "SamsungCO",
    rating: 4.6
  },
  {
    id: "e2",
    name: "Barra de Sonido 2.1 con Subwoofer",
    description: "Sistema de sonido 2.1 con barra y subwoofer inalámbrico. Potencia total de 300W para una experiencia de audio inmersiva.",
    price: 549000,
    category: "electronics",
    subcategory: "audio",
    images: ["/products/soundbar-1.jpg", "/products/soundbar-2.jpg"],
    stock: 12,
    features: ["Potencia 300W", "Subwoofer inalámbrico", "Bluetooth 5.0", "HDMI ARC", "Modos de sonido predefinidos"],
    brand: "SonyCO",
    rating: 4.4
  },
  
  // Technology
  {
    id: "t1",
    name: "Laptop Ultradelgada 15.6\"",
    description: "Laptop ultradelgada con pantalla 15.6\", procesador de última generación, 16GB de RAM y 512GB SSD. Ideal para trabajo y entretenimiento.",
    price: 2750000,
    category: "technology",
    subcategory: "laptops",
    images: ["/products/laptop-1.jpg", "/products/laptop-2.jpg"],
    stock: 7,
    features: ["Procesador Intel Core i7", "16GB RAM", "512GB SSD", "Pantalla 15.6\" Full HD", "Teclado retroiluminado", "Windows 11"],
    brand: "DellCO",
    rating: 4.9
  },
  {
    id: "t2",
    name: "Smartphone Premium 128GB",
    description: "Smartphone de gama alta con cámara cuádruple, 128GB de almacenamiento y batería de larga duración. La mejor tecnología en la palma de tu mano.",
    price: 2899000,
    category: "technology",
    subcategory: "smartphones",
    images: ["/products/phone-1.jpg", "/products/phone-2.jpg"],
    stock: 15,
    features: ["Cámara cuádruple 108MP", "128GB almacenamiento", "8GB RAM", "Batería 5000mAh", "Pantalla AMOLED 6.7\"", "Android 13"],
    brand: "SamsungCO",
    rating: 4.7
  },
  {
    id: "t3",
    name: "Tablet 10.4\" 64GB",
    description: "Tablet con pantalla 10.4\", procesador octa-core, 4GB de RAM y 64GB de almacenamiento. Perfecta para productividad y entretenimiento.",
    price: 1199000,
    category: "technology",
    subcategory: "tablets",
    images: ["/products/tablet-1.jpg", "/products/tablet-2.jpg"],
    stock: 9,
    features: ["Pantalla 10.4\" 2000x1200", "Procesador Octa-core", "4GB RAM", "64GB almacenamiento", "Batería 7040mAh", "Android 12"],
    brand: "SamsungCO",
    rating: 4.5
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
