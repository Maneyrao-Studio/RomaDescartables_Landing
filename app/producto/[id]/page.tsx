import { notFound } from "next/navigation"
import PageLayout from "@/components/ui/page-layout"
import ProductDetail from "@/components/product-detail"
import { PRODUCTS } from "@/lib/products"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = PRODUCTS.find(p => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <PageLayout>
      <ProductDetail product={product} />
    </PageLayout>
  )
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }))
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const product = PRODUCTS.find(p => p.id === id)

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

