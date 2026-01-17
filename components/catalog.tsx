"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { PRODUCTS, Product } from "@/lib/products"

export default function Catalog() {
  const router = useRouter()
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
              onClick={() => router.push(`/producto/${product.id}`)}
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
                      router.push(`/producto/${product.id}`)
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
