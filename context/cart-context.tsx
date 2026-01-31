"use client"

import { createContext, useState, useCallback, useEffect, type ReactNode } from "react"

export interface Pack {
  quantity: number
  price: number
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  packs?: Pack[]
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
  shippingType: 'with' | 'without'
  setShippingType: (type: 'with' | 'without') => void
  getShippingDiscount: () => number
  getTotalWithDiscount: () => number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([])
  const [shippingType, setShippingType] = useState<'with' | 'without'>('with')

  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) {
      setItems(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = useCallback((newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item,
        )
      }
      return [...prevItems, newItem]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(id)
        return
      }
      setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
    },
    [removeItem],
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const calculatePackPrice = (packs: Pack[] | undefined, quantity: number, regularPrice: number): number => {
    if (!packs || packs.length === 0) return regularPrice * quantity

    // Sort packs by quantity descending
    const sortedPacks = [...packs].sort((a, b) => b.quantity - a.quantity)
    let total = 0
    let remainingQuantity = quantity

    for (const pack of sortedPacks) {
      const packCount = Math.floor(remainingQuantity / pack.quantity)
      total += packCount * pack.price
      remainingQuantity -= packCount * pack.quantity
    }

    // Add remaining at regular price
    total += remainingQuantity * regularPrice
    return total
  }

  const getTotal = useCallback(() => {
    return items.reduce((total, item) => total + calculatePackPrice(item.packs, item.quantity, item.price), 0)
  }, [items])

  const getShippingDiscount = useCallback(() => {
    const subtotal = getTotal()
    return shippingType === 'without' ? subtotal * 0.10 : 0
  }, [getTotal, shippingType])

  const getTotalWithDiscount = useCallback(() => {
    return getTotal() - getShippingDiscount()
  }, [getTotal, getShippingDiscount])

  const getItemCount = useCallback(() => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }, [items])

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    shippingType,
    setShippingType,
    getShippingDiscount,
    getTotalWithDiscount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
