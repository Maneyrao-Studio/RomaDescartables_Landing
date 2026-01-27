"use client"

import { Button } from "@/components/ui/button"
import ProductCard from "@/components/ui/product-card"
import { useFeaturedProducts } from "@/lib/hooks/useProducts"
import { useRouter } from "next/navigation"


interface ProductsSection {
    title: string
    description?: string
    onExploreClick: () => void
    className?: string
    featuredCount?: number
}

function ProductsSection(productSectionProps: ProductsSection) {
    const { onExploreClick, title, className = "", description = '', featuredCount = 4 } = productSectionProps
    const router = useRouter()
    const { data: products, isLoading, error } = useFeaturedProducts(featuredCount)

    if (isLoading) {
        return (
            <section className={`py-16 ${className}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{title}</h2>
                        {description && <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                            {description}
                        </p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Array.from({ length: featuredCount }).map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    if (error || !products) {
        return (
            <section className={`py-16 ${className}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{title}</h2>
                        {description && <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                            {description}
                        </p>}
                    </div>
                    <div className="text-center py-8">
                        <p className="text-red-500">Error loading products. Please try again later.</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className={`py-16 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{title}</h2>
                    {description && <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                        {description}
                    </p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => router.push(`/producto/${product.id}`)}
                    />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Button onClick={onExploreClick} size="lg">
                    Ver Catálogo
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default ProductsSection