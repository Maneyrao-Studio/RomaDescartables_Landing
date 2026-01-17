"use client"
import { useRouter } from "next/navigation"
import { ArrowRight, Package, Truck, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/ui/product-card"
import { PRODUCTS } from "@/lib/products"

interface LandingProps {
  onExploreClick: () => void
}

export default function Landing({ onExploreClick }: LandingProps) {
  const router = useRouter()
  const featuredProducts = PRODUCTS.slice(0, 4)

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
            <Button onClick={onExploreClick} size="lg">
              Explorar Catálogo
              <ArrowRight className="w-5 h-5" />
            </Button>
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

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Productos Destacados</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Descubre nuestros productos más populares y de mayor demanda
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => router.push(`/producto/${product.id}`)}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button onClick={onExploreClick} size="lg">
              Ver Catálogo
            </Button>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Nuestra Ubicación</h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Visítanos en San Justo, La Matanza. Papelera Roma Descartables 
          </p>
          
          <div className="mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.123!2d-58.5669873!3d-34.6794676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb438c420a0d%3A0x554dada6bb82b722!2sPapelera+Roma+Descartables!5e0!3m2!1ses!2sar!4v1705500000000!5m2!1ses!2sar"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <a
            href="https://www.google.com/maps/place/Papelera+Roma+Descartables/@-34.6794676,-58.5669873,17z/data=!3m1!4b1!4m6!3m5!1s0x95bccb438c420a0d:0x554dada6bb82b722!8m2!3d-34.679472!4d-58.5644124!16s%2Fg%2F11rcrj8f3n?entry=ttu&g_ep=EgoyMDI1MTIwOC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors mt-8"
          >
            Ver en Google Maps
          </a>
        </div>
      </section>
    </div>
  )
}
