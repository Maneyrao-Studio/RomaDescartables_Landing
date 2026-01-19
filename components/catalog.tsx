"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PRODUCTS, Product } from "@/lib/products"
import ProductCard from "@/components/ui/product-card"

interface CatalogProps {
  categoriaFilter?: string
}

export default function Catalog({ categoriaFilter }: CatalogProps) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>(categoriaFilter || "All")

  // Update selected category when categoriaFilter changes
  useEffect(() => {
    if (categoriaFilter) {
      setSelectedCategory(categoriaFilter)
    } else if (!categoriaFilter) {
      setSelectedCategory("All")
    }
  }, [categoriaFilter])

  const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))]

  // Use categoriaFilter directly if present, otherwise use selectedCategory
  const currentCategory = categoriaFilter || selectedCategory

  const filteredProducts =
    currentCategory === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === currentCategory)

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
          {categories.map((cat) => {
            const isActive = currentCategory === cat
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat)
                  // If we have a categoriaFilter from URL and user clicks "All", remove the filter
                  if (categoriaFilter && cat === "All") {
                    router.push('/catalogo', { scroll: false })
                  }
                  // If user clicks a specific category, update URL if we're not already there
                  else if (cat !== "All" && !categoriaFilter) {
                    router.push(`/catalogo?categoria=${encodeURIComponent(cat)}`, { scroll: false })
                  }
                }}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-white text-primary border-2 border-primary hover:bg-primary/5"
                }`}
              >
                {cat === "All" ? "Todos" : cat}
              </button>
            )
          })}
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
