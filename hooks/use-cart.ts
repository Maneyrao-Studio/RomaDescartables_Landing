"use client"

import { useContext } from "react"
import { CartContext } from "@/context/cart-context"

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart debe ser usado dentro de CartProvider")
  }
  return context
}

// Re-export types for convenience
export type { CartItem, ShippingQuote, ShippingMethod } from "@/context/cart-context"
