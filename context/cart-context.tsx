"use client"

import { createContext, useState, useCallback, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface ShippingQuote {
  provider: 'correo_argentino' | 'andreani'
  cost: number
  estimatedDays: string
  serviceType: string
  currency: string
  pickupAvailable?: boolean
}

export type ShippingMethod = 'pickup' | 'quote'

interface ShippingState {
  method: ShippingMethod
  destinationCP: string
  quote: ShippingQuote | null
  isLoading: boolean
  error: string | null
}

interface CartContextType {
  items: CartItem[]
  shipping: ShippingState
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
  setShippingMethod: (method: ShippingMethod) => void
  setDestinationCP: (cp: string) => void
  getShippingQuote: (provider: 'correo_argentino' | 'andreani') => Promise<void>
  getTotalWithShipping: () => number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([])
  const [shipping, setShipping] = useState<ShippingState>({
    method: 'pickup',
    destinationCP: '',
    quote: null,
    isLoading: false,
    error: null
  })

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    const storedShipping = localStorage.getItem('cart_shipping')

    if (storedCart) {
      setItems(JSON.parse(storedCart))
    }

    if (storedShipping) {
      setShipping(JSON.parse(storedShipping))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    localStorage.setItem('cart_shipping', JSON.stringify(shipping))
  }, [shipping])

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

  const getTotal = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [items])

  const getItemCount = useCallback(() => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }, [items])

  const setShippingMethod = useCallback((method: ShippingMethod) => {
    setShipping(prev => ({
      ...prev,
      method,
      quote: method === 'pickup' ? null : prev.quote,
      error: null
    }))
  }, [])

  const setDestinationCP = useCallback((cp: string) => {
    setShipping(prev => ({
      ...prev,
      destinationCP: cp,
      error: null
    }))
  }, [])

  const getShippingQuote = useCallback(async (provider: 'correo_argentino' | 'andreani') => {
    if (!shipping.destinationCP) {
      setShipping(prev => ({ ...prev, error: 'Ingrese el código postal de destino' }))
      return
    }

    setShipping(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Calculate package dimensions and weight
      // For now, using estimated values - in production you'd want to calculate based on actual products
      const totalWeight = items.reduce((weight, item) => weight + (item.quantity * 500), 0) // 500g per item estimate
      const dimensions = {
        length: Math.max(30, Math.min(100, items.length * 10)), // Estimated dimensions
        width: 20,
        height: 15
      }

      const response = await fetch(`/api/shipping/${provider}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destinationCP: shipping.destinationCP,
          weight: totalWeight,
          dimensions
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al obtener cotización')
      }

      setShipping(prev => ({
        ...prev,
        quote: data,
        isLoading: false
      }))

    } catch (error) {
      setShipping(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      }))
    }
  }, [items, shipping.destinationCP])

  const getTotalWithShipping = useCallback(() => {
    const subtotal = getTotal()
    if (shipping.method === 'pickup' || !shipping.quote) {
      return subtotal
    }
    return subtotal + shipping.quote.cost
  }, [getTotal, shipping])

  const value: CartContextType = {
    items,
    shipping,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    setShippingMethod,
    setDestinationCP,
    getShippingQuote,
    getTotalWithShipping,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
