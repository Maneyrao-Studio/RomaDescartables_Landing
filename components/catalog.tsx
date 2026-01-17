"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PRODUCTS, Product } from "@/lib/products"
import ProductCard from "@/components/ui/product-card"

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
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => router.push(`/producto/${product.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
