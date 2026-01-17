export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  specs?: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: "bolsa-tela-1",
    name: "BOLSA DE TELA 15X26,5",
    description: "Bolsa de tela resistente y reutilizable",
    price: 92.0,
    image: "/tela-bolsa-15x26.jpg",
    category: "Bolsas de Tela",
    specs: ["Dimensiones: 15 x 26.5 cm", "Material: Tela 100%", "Reutilizable", "Resistente"],
  },
  {
    id: "bolsa-tela-2",
    name: "BOLSA DE TELA 22,5X30",
    description: "Bolsa de tela grande para compras",
    price: 238.95,
    image: "/tela-bolsa-22x30.jpg",
    category: "Bolsas de Tela",
    specs: ["Dimensiones: 22.5 x 30 cm", "Material: Tela 100%", "Reutilizable", "Resistente"],
  },
  {
    id: "bolsa-tela-3",
    name: "BOLSA DE TELA 30X40",
    description: "Bolsa de tela extra grande",
    price: 269.0,
    image: "/tela-bolsa-30x40.jpg",
    category: "Bolsas de Tela",
    specs: ["Dimensiones: 30 x 40 cm", "Material: Tela 100%", "Reutilizable", "Máxima capacidad"],
  },
  {
    id: "bolsa-tela-4",
    name: "BOLSA DE TELA 45X40",
    description: "Bolsa de tela jumbo para compras grandes",
    price: 351.0,
    image: "/tela-bolsa-45x40.jpg",
    category: "Bolsas de Tela",
    specs: ["Dimensiones: 45 x 40 cm", "Material: Tela premium", "Reutilizable", "Para carga pesada"],
  },
  {
    id: "bandeja-carton-1",
    name: "BANDEJA CARTÓN N.6 BLANCA REF",
    description: "Bandeja de cartón tamaño número 6",
    price: 6288.75,
    image: "/bandeja-carton-blanca.jpg",
    category: "Bandejas de Cartón",
    specs: ["Tamaño: N.6", "Color: Blanco", "Material: Cartón reforzado", "Referencia REF"],
  },
  {
    id: "bandeja-carton-2",
    name: "BANDEJA CARTÓN N.7 BLANCA REF",
    description: "Bandeja de cartón tamaño número 7",
    price: 10537.8,
    image: "/bandeja-carton-numero-7.jpg",
    category: "Bandejas de Cartón",
    specs: ["Tamaño: N.7", "Color: Blanco", "Material: Cartón reforzado", "Referencia REF"],
  },
  {
    id: "bandeja-carton-3",
    name: "BANDEJA CARTÓN N.8 BLANCA REF",
    description: "Bandeja de cartón tamaño número 8",
    price: 11748.75,
    image: "/bandeja-carton-numero-8.jpg",
    category: "Bandejas de Cartón",
    specs: ["Tamaño: N.8", "Color: Blanco", "Material: Cartón reforzado", "Referencia REF"],
  },
]