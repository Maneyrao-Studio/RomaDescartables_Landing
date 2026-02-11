"use client"

import { useEffect } from "react"
import Link from "next/link"
import { X, Home, Package, Users, RefreshCw, MessageCircle } from "lucide-react"
import { Link as TransitionLink } from "next-view-transitions"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-primary">Menú</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
             {/* Inicio */}
             <TransitionLink
               href="/"
               onClick={onClose}
               className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
             >
               <Home className="w-5 h-5 text-primary" />
               <span className="font-medium">Inicio</span>
             </TransitionLink>

             {/* Productos */}
             <div className="space-y-1">
               <div className="flex items-center gap-3 p-3 text-foreground/60">
                 <Package className="w-5 h-5" />
                 <span className="font-medium">Productos</span>
               </div>

               {/* Subcategorías */}
               <div className="ml-8 space-y-1">
                 <TransitionLink
                   href="/catalogo?categoria=Bolsas%20de%20Tela"
                   onClick={onClose}
                   className="block p-2 rounded-lg hover:bg-muted transition-colors text-sm"
                 >
                   Bolsas de Tela
                 </TransitionLink>
                 <TransitionLink
                   href="/catalogo?categoria=Bandejas%20de%20Cartón"
                   onClick={onClose}
                   className="block p-2 rounded-lg hover:bg-muted transition-colors text-sm"
                 >
                   Bandejas de Cartón
                 </TransitionLink>
                 <TransitionLink
                   href="/catalogo"
                   onClick={onClose}
                   className="block p-2 rounded-lg hover:bg-muted transition-colors text-sm"
                 >
                   Ver Todo
                 </TransitionLink>
               </div>
             </div>

             {/* Sobre Nosotros */}
             <TransitionLink
               href="/sobre-nosotros"
               onClick={onClose}
               className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
             >
               <Users className="w-5 h-5 text-primary" />
               <span className="font-medium">Sobre Nosotros</span>
             </TransitionLink>

             {/* Reventa */}
             <TransitionLink
               href="/reventa"
               onClick={onClose}
               className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
             >
               <RefreshCw className="w-5 h-5 text-primary" />
               <span className="font-medium">Reventa</span>
             </TransitionLink>

            {/* WhatsApp */}
            <a
              href="https://wa.me/5491132813830?text=Hola%20Roma%20Descartables"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 text-green-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">WhatsApp</span>
            </a>
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <p className="text-sm text-foreground/60 text-center">
            Roma Descartables © 2026
          </p>
        </div>
      </div>
    </>
  )
}