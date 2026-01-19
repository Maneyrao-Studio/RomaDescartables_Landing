import { Button } from "@/components/ui/button"
import ProductCard from "@/components/ui/product-card"
import { Product } from "@/lib/products"
import { useRouter } from "next/navigation"


interface ProductsSection {
    products: Product[]
    title: string
    description?: string
    onExploreClick: () => void
    className?: string
}

function ProductsSection(productSectionProps: ProductsSection) {
    const { products, onExploreClick, title, className = "", description ='' } = productSectionProps
    const router = useRouter()

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