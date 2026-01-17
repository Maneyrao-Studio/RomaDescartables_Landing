"use client"

import CartView from "@/components/cart-view"

export default function CarritoPage() {
  const handleBack = () => {
    window.history.back()
  }

  return <CartView />
}