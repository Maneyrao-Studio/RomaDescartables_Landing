"use client"

import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

interface CartViewProps {
  onBack: () => void
}

export default function CartView({ onBack }: CartViewProps) {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart()

  const handleCheckout = () => {
    if (items.length === 0) return

    const itemsList = items
      .map((item) => `- ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`)
      .join("%0A")

    const message = `Hola Roma Descartables! Quiero hacer el siguiente pedido:%0A%0A${itemsList}%0A%0ATotal: $${getTotal().toFixed(2)}`

    window.open(`https://wa.me/541123456789?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        <h1 className="text-4xl font-bold text-primary mb-12">Mi Carrito</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border border-border">
            <p className="text-foreground/60 text-lg mb-6">Tu carrito está vacío</p>
            <button
              onClick={onBack}
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Seguir comprando
            </button>
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
                      <p className="text-foreground/60 text-sm mb-4">${item.price.toFixed(2)} c/u</p>

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
                        <p className="text-xl font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
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

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-foreground/60">
                    <span>Subtotal:</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/60">
                    <span>Envío:</span>
                    <span>Consultar</span>
                  </div>
                </div>

                <div className="flex justify-between text-2xl font-bold text-primary mb-6">
                  <span>Total:</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors mb-3"
                >
                  Comprar por WhatsApp
                </button>

                <button
                  onClick={() => {
                    clearCart()
                    onBack()
                  }}
                  className="w-full text-primary border-2 border-primary py-2 rounded-lg font-medium hover:bg-primary/5 transition-colors"
                >
                  Seguir comprando
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
