import { notFound } from "next/navigation"
import ProductDetail from "@/components/product-detail"
import { PRODUCTS } from "@/lib/products"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = PRODUCTS.find(p => p.id === params.id)

  if (!product) {
    notFound()
  }

  const handleBack = () => {
    // Navigate to catalog
  }

  return <ProductDetail product={product} />
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }))
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = PRODUCTS.find(p => p.id === params.id)

  if (!product) {
    return {
      title: 'Producto no encontrado',
    }
  }

  return {
    title: `${product.name} - Roma Descartables`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  }
}