"use client"

import { useRouter } from "next/navigation"
import { Trash2, Plus, Minus } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/utils"
import BackButton from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import { Pack } from "@/context/cart-context"

function calculatePackPrice(packs: Pack[] | undefined, quantity: number, regularPrice: number): number {
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

export default function CartView() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, getTotal, clearCart, shippingType, setShippingType, getShippingDiscount, getTotalWithDiscount } = useCart()

  const handleCheckout = () => {
    if (items.length === 0) return

    const itemsList = items
      .map((item) => `- ${item.name} (x${item.quantity}) - ${formatPrice(calculatePackPrice(item.packs, item.quantity, item.price))}`)
      .join("%0A")

    const shippingText = shippingType === 'with' ? 'Con envío' : 'Retiro en sucursal'
    const message = `Hola Roma Descartables! Quiero hacer el siguiente pedido:%0A%0A${itemsList}%0A%0ATipo de envío: ${shippingText}%0A%0ATotal: ${formatPrice(getTotalWithDiscount())}`

    window.open(`https://wa.me/5491132813830?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <BackButton href="/catalogo" />

        <h1 className="text-4xl font-bold text-primary mb-12">Mi Carrito</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border border-border">
            <p className="text-foreground/60 text-lg mb-6">Tu carrito está vacío</p>
            <Button onClick={() => router.push('/catalogo')}>
              Seguir comprando
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-border overflow-hidden">
                {items.map((item) => (
                  <div key={item.id} className="p-6 border-b border-border last:border-b-0 flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-primary mb-2">{item.name}</h3>
                       <p className="text-foreground/60 text-sm mb-4">{formatPrice(item.price)} c/u</p>
                       {item.packs && item.packs.length > 0 && (
                         <p className="text-green-600 text-xs">Pack aplicado</p>
                       )}

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-muted rounded transition-colors text-primary"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 bg-muted rounded font-semibold text-primary">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-muted rounded transition-colors text-primary"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal and Delete */}
                    <div className="text-right flex flex-col justify-between">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <div>
                        <p className="text-foreground/60 text-xs mb-1">Subtotal</p>
                         <p className="text-xl font-bold text-primary">{formatPrice(calculatePackPrice(item.packs, item.quantity, item.price))}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 border border-border sticky top-32">
                <h2 className="text-xl font-bold text-primary mb-6">Resumen del Pedido</h2>

                {/* Shipping Type Toggle */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground/80 mb-3 block">Tipo de envío:</label>
                  <div className="flex bg-muted rounded-lg p-1">
                    <button
                      onClick={() => setShippingType('with')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        shippingType === 'with'
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-foreground/60 hover:text-foreground'
                      }`}
                    >
                      Con envío
                    </button>
                    <button
                      onClick={() => setShippingType('without')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        shippingType === 'without'
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-foreground/60 hover:text-foreground'
                      }`}
                    >
                      Sin envío (retiro)
                    </button>
                  </div>
                </div>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-foreground/60">
                    <span>Subtotal:</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>
                  <div className="flex justify-between text-foreground/60">
                    <span>Envío:</span>
                    <span>{shippingType === 'with' ? 'A domicilio' : 'Retiro en sucursal'}</span>
                  </div>
                  {getShippingDiscount() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Descuento (10% retiro):</span>
                      <span>-{formatPrice(getShippingDiscount())}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between text-2xl font-bold text-primary mb-6">
                  <span>Total:</span>
                  <span>{formatPrice(getTotalWithDiscount())}</span>
                </div>

                <Button onClick={handleCheckout} className="w-full mb-3">
                  Comprar por WhatsApp
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    clearCart()
                    router.push('/catalogo')
                  }}
                  className="w-full"
                >
                  Limpiar carrito
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
