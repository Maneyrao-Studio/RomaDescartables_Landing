"use client"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import Logo from "@/components/ui/logo"

interface HeaderProps {
  showNavigation?: boolean
}

export default function Header({ showNavigation = false }: HeaderProps) {
  const { getItemCount } = useCart()
  const itemCount = getItemCount()

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Navigation */}
          {showNavigation && (
            <nav className="hidden md:flex items-center gap-6">
              <button className="text-foreground hover:text-primary transition-colors text-sm font-medium">
                Catálogo
              </button>
              <button className="text-foreground hover:text-primary transition-colors text-sm font-medium">
                Contacto
              </button>
            </nav>
          )}

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/541123456789?text=Hola%20Roma%20Descartables"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              WhatsApp
            </a>
            <Link href="/carrito" className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-accent rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
