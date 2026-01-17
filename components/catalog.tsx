"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  specs?: string[]
}

interface CatalogProps {
  onProductSelect: (product: Product) => void
}

const PRODUCTS: Product[] = [
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

export default function Catalog({ onProductSelect }: CatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))]

  const filteredProducts =
    selectedCategory === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === selectedCategory)

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Catálogo de Productos</h1>
          <p className="text-foreground/70 text-lg">Explora nuestros productos de papelería y descartables</p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : "bg-white text-primary border-2 border-primary hover:bg-primary/5"
              }`}
            >
              {cat === "All" ? "Todos" : cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer border border-border"
              onClick={() => onProductSelect(product)}
            >
              {/* Product Image */}
              <div className="aspect-square bg-muted overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <p className="text-accent text-sm font-semibold mb-2">{product.category}</p>
                <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-foreground/60 text-sm mb-4 line-clamp-2">{product.description}</p>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onProductSelect(product)
                    }}
                    className="bg-accent hover:bg-accent/90 text-primary p-2 rounded-lg transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
