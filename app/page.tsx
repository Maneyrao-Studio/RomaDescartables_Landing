"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CartProvider } from "@/context/cart-context"
import Header from "@/components/header"
import Landing from "@/components/landing"
import ProductDetail from "@/components/product-detail"
import CartView from "@/components/cart-view"
import Footer from "@/components/footer"

type PageView = "landing" | "catalog" | "product" | "cart"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  specs?: string[]
  quantity?: number
}

function HomeContent() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<PageView>("landing")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setCurrentView("product")
  }

  const handleBackToCatalog = () => {
    setCurrentView("catalog")
  }

  const handleGoToCatalog = () => {
    router.push('/catalogo')
  }

  const handleBackToLanding = () => {
    setCurrentView("landing")
  }

  const handleGoToCart = () => {
    setCurrentView("cart")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header
        onLogoClick={handleBackToLanding}
        showNavigation={currentView !== "landing"}
        onCartClick={handleGoToCart}
      />

      <main className="flex-1">
        {currentView === "landing" && <Landing onExploreClick={handleGoToCatalog} />}
        {currentView === "product" && selectedProduct && (
          <ProductDetail product={selectedProduct} onBack={handleBackToCatalog} />
        )}
        {currentView === "cart" && <CartView onBack={handleBackToCatalog} />}
      </main>

      <Footer />
    </div>
  )
}

export default function Home() {
  return (
    <CartProvider>
      <HomeContent />
    </CartProvider>
  )
}
