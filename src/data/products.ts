
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
    images: [
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1589384417894-0c587a3a1811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1601944177325-f8867652837f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1610041321327-b794c052db7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=329&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=327&q=80"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      "https://images.unsplash.com/photo-1623126908029-58c58da8ba8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
    stock: 9,
    features: ["Pantalla 10.4\" 2000x1200", "Procesador Octa-core", "4GB RAM", "64GB almacenamiento", "Batería 7040mAh", "Android 12"],
    brand: "SamsungCO",
    rating: 4.5
  },
  
  // Adding more products
  {
    id: "f4",
    name: "Mesa de Centro de Cristal",
    description: "Elegante mesa de centro con superficie de cristal templado y estructura de acero inoxidable. Añade un toque de sofisticación a tu sala de estar.",
    price: 350000,
    category: "furniture",
    subcategory: "mesas",
    images: [
      "https://images.unsplash.com/photo-1533090368676-1fd25485db88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      "https://images.unsplash.com/photo-1532372576444-dda954194ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    ],
    stock: 12,
    features: ["Cristal templado", "Estructura de acero inoxidable", "Fácil limpieza", "Dimensiones: 90x50x40 cm"],
    brand: "DiseñoHogar",
    rating: 4.3
  },
  {
    id: "e3",
    name: "Auriculares Bluetooth con Cancelación de Ruido",
    description: "Auriculares premium con tecnología de cancelación activa de ruido, batería de larga duración y sonido de alta fidelidad. Perfectos para viajes y trabajo.",
    price: 499000,
    category: "electronics",
    subcategory: "audio",
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1465&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80"
    ],
    stock: 20,
    features: ["Cancelación activa de ruido", "30 horas de batería", "Conexión Bluetooth 5.0", "Micrófono integrado", "Plegables"],
    brand: "SonyCO",
    rating: 4.8
  },
  {
    id: "t4",
    name: "Smartwatch Deportivo",
    description: "Reloj inteligente con múltiples modos deportivos, monitor de frecuencia cardíaca, GPS integrado y batería de larga duración. Tu compañero ideal para entrenamientos.",
    price: 789000,
    category: "technology",
    subcategory: "wearables",
    images: [
      "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    ],
    stock: 14,
    features: ["20 modos deportivos", "GPS integrado", "Monitor cardíaco", "Resistente al agua 5ATM", "Batería 14 días", "Notificaciones inteligentes"],
    brand: "GarminCO",
    rating: 4.6
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
