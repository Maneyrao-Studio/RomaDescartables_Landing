"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Landing from "@/app/(index)/landing"
import Footer from "@/components/footer"

type PageView = "landing"

function HomeContent() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<PageView>("landing")

  const handleGoToCatalog = () => {
    router.push('/catalogo')
  }

  const handleBackToLanding = () => {
    setCurrentView("landing")
  }

  const handleGoToCart = () => {
    router.push('/carrito')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {currentView === "landing" && <Landing onExploreClick={handleGoToCatalog} />}
      </main>

      <Footer />
    </div>
  )
}

export default function Home() {
  return <HomeContent />
}
