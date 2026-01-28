"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ShoppingCart, Menu as MenuIcon } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import Logo from "@/components/ui/logo"
import Menu from "@/components/ui/menu"

interface HeaderProps {
  showNavigation?: boolean
}

export default function Header({ showNavigation = false }: HeaderProps) {
  const { getItemCount } = useCart()
  const itemCount = getItemCount()
  const [isMenuOpen, setIsMenuOpen] = useState(showNavigation)

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <div className="flex items-center gap-4">
            <Link 
              href="/carrito" 
              className={`relative p-2 hover:bg-muted rounded-lg transition-colors`}
              style={itemCount > 0 ? {
                animation: 'shake 2s ease-in-out infinite'
              } : {}}
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-accent rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Abrir menú"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <Menu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  )
}
