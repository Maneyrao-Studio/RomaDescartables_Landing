"use client"
import { ArrowRight, Package, Truck, Award } from "lucide-react"

interface LandingProps {
  onExploreClick: () => void
}

export default function Landing({ onExploreClick }: LandingProps) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              Papelería y Descartables de Calidad
            </h1>
            <p className="text-lg text-foreground/70 mb-4">
              Distribuidora Roma Descartables ofrece los mejores productos para tu negocio. Venta por mayor y menor en
              San Justo, La Matanza.
            </p>
            <p className="text-lg text-foreground/70 mb-8">
              Bolsas de tela, bandejas de cartón y mucho más. Todos nuestros productos están pensados para tu
              conveniencia.
            </p>
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Explorar Catálogo
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="bg-accent/10 rounded-2xl p-8 flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="w-24 h-24 bg-accent rounded-full mx-auto mb-6 flex items-center justify-center">
                <Package className="w-12 h-12 text-primary" />
              </div>
              <p className="text-primary font-semibold text-lg">🏆 Distribuidora Roma Descartables</p>
              <p className="text-foreground/60 text-sm mt-2">Especialistas en papelería y descartables</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Truck className="w-12 h-12 mb-4 text-accent" />
              <h3 className="text-xl font-bold mb-2">Envíos Rápidos</h3>
              <p className="text-white/80">Entrega en toda la zona oeste de La Matanza</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Award className="w-12 h-12 mb-4 text-accent" />
              <h3 className="text-xl font-bold mb-2">Productos Premium</h3>
              <p className="text-white/80">Calidad garantizada en todos nuestros artículos</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Package className="w-12 h-12 mb-4 text-accent" />
              <h3 className="text-xl font-bold mb-2">Venta Mayor y Menor</h3>
              <p className="text-white/80">Precios especiales para compras en volumen</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">¿Listo para hacer tu pedido?</h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Contáctanos por WhatsApp o explora nuestro catálogo completo. Estamos listos para servirte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onExploreClick}
              className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Ver Catálogo
            </button>
            <a
              href="https://wa.me/541123456789?text=Hola%20Roma%20Descartables%20quiero%20hacer%20un%20pedido"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-accent text-primary rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
