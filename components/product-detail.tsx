"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Minus, Plus, ShoppingCart, Zap, RotateCcw, Headphones, ArrowLeft } from "lucide-react";
import { toast } from "sonner"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/utils"
import { Button } from "./ui/button";
import BackButton from "./ui/back-button";

interface Pack {
  quantity: number
  price: number
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  specs?: string[]
  packs?: Pack[]
  quantity?: number
}

interface ProductDetailProps {
  product: Product
}

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

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

   const handleAddToCart = () => {
     addItem({
       id: product.id,
       name: product.name,
       price: product.price,
       quantity: quantity,
       image: product.image,
       packs: product.packs,
     })
     toast.success('Producto agregado al carrito')
    }
  return (
     <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton href="/catalogo" text="Volver al Catálogo" />

        <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative p-8 lg:p-12">
              <img
                src={product.image}
                alt={product.name}
                className="relative z-10 w-full max-w-sm mx-auto aspect-square object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-4 lg:p-8 flex flex-col">
              <span className="inline-flex self-start text-black text-base font-bold py-1.5 rounded-full mb-4">
                {product.category}
              </span>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <p className="text-base text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="mb-8">
                <span className="text-base text-gray-500 mb-1 block">Precio</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-black">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>

              <section className="bg-gray-50 p-2">

                {product.packs && product.packs.length > 0 && (
                <div className="mb-8">
                  <span className="text-base text-gray-500 mb-3 block">¡Ahorra con packs!</span>
                   <div className="flex flex-wrap gap-2">
                    {product.packs.map((pack, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuantity(pack.quantity)}
                        className={`relative px-4 py-3 rounded-2xl border-2 transition-all ${
                          quantity === pack.quantity
                            ? "border-black bg-accent text-white"
                            : "border-gray-400 hover:border-gray-700 bg-white"
                        }`}
                      >
                        {quantity === pack.quantity && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                        <div className={`text-lg font-extrabold ${quantity === pack.quantity ? "text-white" : "text-gray-900"}`}>
                          {pack.quantity}x
                        </div>
                        <div className={`text-base font-medium ${quantity === pack.quantity ? "text-white/90" : "text-black"}`}>
                          {formatPrice(pack.price)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm text-gray-500">Cantidad</span>
                <div className="flex items-center bg-gray-100 rounded-full">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 text-gray-500 hover:text-purple-600 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-10 text-center font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 text-gray-500 hover:text-purple-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-auto">
                <div className="flex items-center justify-between mb-6 p-4 bg-gray-100 rounded-2xl">
                  <span className="text-gray-700">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(calculatePackPrice(product.packs, quantity, product.price))}
                  </span>
                </div>

                 <Button onClick={handleAddToCart} className="w-full mb-4">
                   ¡Lo quiero!
                 </Button>
              </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
