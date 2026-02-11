"use client"

import { Link as TransitionLink } from "next-view-transitions"
import { Button } from "@/components/ui/button"

export default function TransitionTest() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Test de Transiciones</h1>
        
        <div className="space-y-4">
          <p className="text-gray-600 text-center mb-8">
            Prueba las transiciones suaves entre páginas:
          </p>
          
          <div className="space-y-3">
            <TransitionLink href="/catalogo" className="block">
              <Button className="w-full">
                Ir al Catálogo (con transición)
              </Button>
            </TransitionLink>
            
            <TransitionLink href="/carrito" className="block">
              <Button variant="outline" className="w-full">
                Ir al Carrito (con transición)
              </Button>
            </TransitionLink>
            
            <TransitionLink href="/" className="block">
              <Button variant="secondary" className="w-full">
                Volver al Inicio (con transición)
              </Button>
            </TransitionLink>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Qué observar:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Desvanecimiento suave entre páginas</li>
              <li>• Animación de entrada desde abajo</li>
              <li>• Mantenimiento del estado del carrito</li>
              <li>• Sin parpadeo durante la transición</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}