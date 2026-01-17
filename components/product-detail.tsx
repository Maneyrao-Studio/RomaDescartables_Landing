"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Minus } from "lucide-react"
import { toast } from "sonner"
import { useCart } from "@/hooks/use-cart"
import BackButton from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"

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

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    })
    toast.success('Producto agregado al carrito')
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <BackButton href="/catalogo" text="Volver al Catálogo" />

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-lg p-8 shadow-sm">
          {/* Image */}
          <div className="flex items-center justify-center bg-muted rounded-lg overflow-hidden min-h-96">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-accent text-sm font-semibold mb-2">{product.category}</p>
              <h1 className="text-4xl font-bold text-primary mb-4">{product.name}</h1>
              <p className="text-foreground/70 text-lg mb-8">{product.description}</p>

              {/* Specs */}
              {product.specs && product.specs.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-primary mb-4">Características</h3>
                  <ul className="space-y-2">
                    {product.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-foreground/70">
                        <span className="w-2 h-2 bg-accent rounded-full"></span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Purchase Section */}
            <div className="border-t border-border pt-8">
              {/* Price */}
              <div className="mb-6">
                <p className="text-foreground/60 text-sm mb-2">Precio unitario</p>
                <div className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-foreground/60 text-sm mb-3">Cantidad</p>
                <div className="flex items-center border-2 border-primary rounded-lg w-fit">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-muted transition-colors text-primary"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-2 font-bold text-primary text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-muted transition-colors text-primary"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="bg-muted p-4 rounded-lg mb-6">
                <p className="text-foreground/60 text-sm mb-1">Total</p>
                <p className="text-2xl font-bold text-primary">${(product.price * quantity).toFixed(2)}</p>
              </div>

              {/* CTA Buttons */}
              <Button onClick={handleAddToCart} className="w-full mb-4">
                Agregar al Carrito
              </Button>

              <p className="text-center text-foreground/60 text-sm">
                También puedes contactarnos directamente por WhatsApp para consultas sobre precios mayoristas.
              </p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-accent/10 border-l-4 border-accent p-6 rounded">
          <h3 className="font-bold text-primary mb-2">📍 ¿Dónde estamos?</h3>
          <p className="text-foreground/70 mb-3">
            Distribuidora Roma Descartables se encuentra en San Justo, Zona Oeste, La Matanza.
          </p>
          <p className="text-foreground/60 text-sm">
            Realizamos envíos y atendemos consultas sobre precios para compras en volumen.
          </p>
        </div>
      </div>
    </div>
  )
}
