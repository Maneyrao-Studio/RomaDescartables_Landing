"use client"

import { ShoppingCart } from "lucide-react"
import { cn, formatPrice } from "@/lib/utils"
import { Product } from "@/lib/products"
import { useProductImages } from "@/lib/hooks/useProductImages"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

interface ProductCardProps {
  product: Product
  onClick?: () => void
  className?: string
  enableLazyLoad?: boolean
}

export default function ProductCard({ 
  product, 
  onClick, 
  className,
  enableLazyLoad = true 
}: ProductCardProps) {
  const { ref, isIntersecting } = useIntersectionObserver(
    enableLazyLoad && !product.image
  )
  
  const { imageUrl, isLoading } = useProductImages(
    product.id,
    isIntersecting && !product.image
  )

  // Use the best available image source
  const displayImage = imageUrl || product.image || "/placeholder.svg"
  const isPlaceholder = displayImage === "/placeholder.svg"

  return (
    <div
      ref={enableLazyLoad && !product.image ? ref : undefined}
      className={cn(
        "bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer border border-border group", 
        className
      )}
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="aspect-square bg-muted overflow-hidden relative">
        {/* Loading skeleton when fetching image */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        <img
          src={displayImage}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover group-hover:scale-105 transition-transform",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => {
            // Remove any loading states
          }}
          onError={(e) => {
            // Fallback to placeholder on error
            const target = e.target as HTMLImageElement
            if (!isPlaceholder) {
              target.src = "/placeholder.svg"
            }
          }}
        />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <p className="text-accent text-sm font-semibold mb-2">{product.category}</p>
        <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-foreground/60 text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">{formatPrice(product.price)}</div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClick?.()
            }}
            className="bg-accent hover:bg-accent/90 text-primary p-2 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}