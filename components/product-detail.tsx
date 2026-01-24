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

  const sortedPacks = [...packs].sort((a, b) => b.quantity - a.quantity)
  let total = 0
  let remainingQuantity = quantity

  for (const pack of sortedPacks) {
    const packCount = Math.floor(remainingQuantity / pack.quantity)
    total += packCount * pack.price
    remainingQuantity -= packCount * pack.quantity
  }

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
     <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton href="/catalogo" text="Volver al Catálogo" />

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative p-8 lg:p-12 bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-sm mx-auto aspect-square object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-4 lg:p-8 flex flex-col">
              <span className="inline-flex self-start text-black text-base font-bold py-1.5 rounded-full mb-4">
                {product.category}
              </span>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="mb-8">
                <span className="text-lg text-gray-500 mb-1 block">Precio</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-black">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>

              {product.packs && product.packs.length > 0 && (
                <div className="mb-8 p-6 bg-secondary rounded-2xl">
                  <span className="text-base text-gray-900 mb-3 block font-bold">¡Ahorra con packs!</span>
                   <div className="flex flex-wrap gap-2">
                    {product.packs.map((pack, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuantity(pack.quantity)}
                        className={`relative px-4 py-3 rounded-2xl border-2 transition-all ${
                          quantity === pack.quantity
                            ? "border-gray-900 bg-gray-900 shadow-lg scale-105"
                            : "border-gray-300 bg-white hover:border-gray-400 hover:shadow-md"
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
                <span className="text-lg text-gray-700">Cantidad</span>
                <div className="flex items-center bg-gray-300 rounded-full">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 text-black hover:text-purple-600 transition-colors"
                    aria-label="Menos"
                  >
                    <Minus className="w-6 h-6" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-10 text-center text-lg font-bold text-gray-900 bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    min="1"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 text-black hover:text-purple-600 transition-colors"
                    aria-label="Mas"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="mt-auto">
                <div className="flex items-center justify-between mb-6 p-4 bg-gray-300 rounded-2xl">
                  <span className="text-xl text-gray-700">Total</span>
                  <span className="text-3xl font-bold text-black">
                    {formatPrice(calculatePackPrice(product.packs, quantity, product.price))}
                  </span>
                </div>

                 <Button onClick={handleAddToCart} className="text-xl py-6 w-full font-bold" size="lg">
                   ¡Lo quiero!
                 </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}