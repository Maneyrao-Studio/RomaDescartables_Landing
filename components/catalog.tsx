"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Product } from "@/lib/products"
import ProductCard from "@/components/ui/product-card-enhanced"
import { useProductsWithImages } from "@/lib/hooks/useProductsWithImages"
import { useCategories } from "@/lib/hooks/useCategories"
import { Link as TransitionLink } from "next-view-transitions"

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

  // Fetch categories and products using React Query
  const { data: categories = [], isLoading: categoriesLoading } = useCategories()
  const { products, isLoading: productsLoading, error: productsError } = useProductsWithImages({ 
    category: categoriaFilter || selectedCategory 
  })

  // Use categoriaFilter directly if present, otherwise use selectedCategory
  const currentCategory = categoriaFilter || selectedCategory

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
          {!categoriesLoading && categories.map((cat) => {
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

        {/* Loading State */}
        {(categoriesLoading || productsLoading) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {productsError && (
          <div className="text-center py-8">
            <p className="text-red-500">Error loading products. Please try again later.</p>
          </div>
        )}

        {/* Products Grid */}
        {!categoriesLoading && !productsLoading && !productsError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <TransitionLink key={product.id} href={`/producto/${product.id}`}>
                <ProductCard
                  product={product}
                  onClick={() => {}}
                />
              </TransitionLink>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
