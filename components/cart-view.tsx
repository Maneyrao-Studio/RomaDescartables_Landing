"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Trash2, Plus, Minus, Truck, MapPin, Loader2 } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/utils"
import BackButton from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"

export default function CartView() {
  const router = useRouter()
  const {
    items,
    shipping,
    removeItem,
    updateQuantity,
    getTotal,
    clearCart,
    setShippingMethod,
    setDestinationCP,
    getShippingQuote,
    getTotalWithShipping
  } = useCart()

  const [selectedProvider, setSelectedProvider] = useState<'correo_argentino' | 'andreani' | 'shipnow'>('correo_argentino')

  const handleCheckout = () => {
    if (items.length === 0) return

    const itemsList = items
      .map((item) => `- ${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}`)
      .join("%0A")

    let shippingInfo = ""
    if (shipping.method === 'pickup') {
      shippingInfo = "Envío: Retiro por sucursal"
    } else if (shipping.quote) {
      const providerName = {
        'correo_argentino': 'Correo Argentino',
        'andreani': 'Andreani',
        'shipnow': 'Shipnow'
      }[shipping.quote.provider] || shipping.quote.provider

      shippingInfo = `Envío: ${providerName} - ${formatPrice(shipping.quote.cost)} (${shipping.quote.estimatedDays})`
    } else {
      shippingInfo = "Envío: Por cotizar"
    }

    const message = `Hola Roma Descartables! Quiero hacer el siguiente pedido:%0A%0A${itemsList}%0A%0A${shippingInfo}%0A%0ATotal: ${formatPrice(getTotalWithShipping())}`

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
                        <p className="text-xl font-bold text-primary">{formatPrice(item.price * item.quantity)}</p>
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

                {/* Shipping Options */}
                <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Opción de envío
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="shipping-method"
                        checked={shipping.method === 'pickup'}
                        onChange={() => setShippingMethod('pickup')}
                        className="text-primary"
                      />
                      <span className="text-sm">Retiro por sucursal</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="shipping-method"
                        checked={shipping.method === 'quote'}
                        onChange={() => setShippingMethod('quote')}
                        className="text-primary"
                      />
                      <span className="text-sm">Cotizar envío a domicilio</span>
                    </label>
                  </div>

                  {shipping.method === 'quote' && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-1">
                          Código postal de destino
                        </label>
                        <input
                          type="text"
                          value={shipping.destinationCP}
                          onChange={(e) => setDestinationCP(e.target.value)}
                          placeholder="Ej: 1754"
                          className="w-full px-3 py-2 border border-border rounded-md text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                          Transportista
                        </label>
                        <div className="flex flex-wrap gap-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="provider"
                              checked={selectedProvider === 'correo_argentino'}
                              onChange={() => setSelectedProvider('correo_argentino')}
                              className="text-primary"
                            />
                            <span className="text-xs">Correo Argentino</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="provider"
                              checked={selectedProvider === 'andreani'}
                              onChange={() => setSelectedProvider('andreani')}
                              className="text-primary"
                            />
                            <span className="text-xs">Andreani</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="provider"
                              checked={selectedProvider === 'shipnow'}
                              onChange={() => setSelectedProvider('shipnow')}
                              className="text-primary"
                            />
                            <span className="text-xs">Shipnow</span>
                          </label>
                        </div>
                      </div>

                      <Button
                        onClick={() => getShippingQuote(selectedProvider)}
                        disabled={shipping.isLoading || !shipping.destinationCP}
                        className="w-full"
                        size="sm"
                      >
                        {shipping.isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Calculando...
                          </>
                        ) : (
                          <>
                            <MapPin className="w-4 h-4 mr-2" />
                            Calcular envío
                          </>
                        )}
                      </Button>

                      {shipping.error && (
                        <p className="text-red-600 text-xs mt-2">{shipping.error}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-foreground/60">
                    <span>Subtotal:</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>
                  <div className="flex justify-between text-foreground/60">
                    <span>Envío:</span>
                    <span>
                      {shipping.method === 'pickup' ? (
                        'Retiro por sucursal'
                      ) : shipping.quote ? (
                        `${formatPrice(shipping.quote.cost)} (${shipping.quote.estimatedDays})`
                      ) : (
                        'Por calcular'
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-2xl font-bold text-primary mb-6">
                  <span>Total:</span>
                  <span>{formatPrice(getTotalWithShipping())}</span>
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
