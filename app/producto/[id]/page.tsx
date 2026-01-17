import { notFound } from "next/navigation"
import Header from "@/components/header"
import ProductDetail from "@/components/product-detail"
import Footer from "@/components/footer"
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
    <>
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </>
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

