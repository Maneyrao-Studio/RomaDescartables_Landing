"use client"
import { ArrowRight, Package, Truck, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PRODUCTS } from "@/lib/products"
import ProductsSection from "./components/ProductsSection"
import HeroCarousel from "@/components/ui/hero-carousel"

interface LandingProps {
  onExploreClick: () => void
}

export default function Landing({ onExploreClick }: LandingProps) {
  const featuredProducts = PRODUCTS.slice(0, 4)

  const carouselImages = [
    {
      src: "/tela-bolsa-45x40.jpg",
      alt: "Bolsas de tela resistentes",
      title: "Bolsas de Tela Premium",
      description: "Resistentes y reutilizables para tu negocio"
    },
    {
      src: "/bandeja-carton-blanca.jpg",
      alt: "Bandejas de cartón",
      title: "Bandejas de Cartón",
      description: "Perfectas para alimentos y presentaciones"
    },
    {
      src: "/RomaDescartable_LOGO.jpg",
      alt: "Roma Descartables - Logo",
      title: "Roma Descartables",
      description: "Tu aliado en papelería y descartables"
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        {/* Carousel ocupando 100% del ancho */}
        <div className="w-full h-96 md:h-[500px] lg:h-[600px] mb-12">
          <HeroCarousel images={carouselImages} />
        </div>

        {/* Textos abajo del carousel */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
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
            <Button onClick={onExploreClick} size="lg" className="mx-auto">
              Explorar Catálogo
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <header className="text-center mb-12">
            <h2 className="text-3xl font-extrabold pb-2">
              Nuestras Categorías
            </h2>
            <p className="text-black/80">Encuentra todo lo que necesitas en un solo lugar</p>
         </header>
          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer px-4 py-6 flex flex-col items-center text-center group">
              <div className="mb-6 h-40 w-full rounded-lg aspect-square bg-muted overflow-hidden">
                <img 
                  src="/tela-bolsa-45x40.jpg" 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"  
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Bandejas y envases desechables</h3>
              <p className="text-black/80">Bandejas de aluminio, bandejas de cartón, bandejas plástica, platos y discos dorados, entre otros.</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer px-4 py-6 flex flex-col items-center text-center group">
              <div className="mb-6 h-40 w-full rounded-lg aspect-square bg-muted overflow-hidden">
                <img 
                  src="/tela-bolsa-45x40.jpg" 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"  
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Bolsas y empaques</h3>
              <p className="text-black/80">Bolsas de polipropileno, bolsas de tela, bolsas kraft, bolsas de papel, bolsas riñón y rollos de arranque.</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer px-4 py-6 flex flex-col items-center text-center group">
              <div className="mb-6 h-40 w-full rounded-lg aspect-square bg-muted overflow-hidden ">
                <img 
                  src="/tela-bolsa-45x40.jpg" 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"  
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Artículos de librería y papelería</h3>
              <p className="text-black/80">Cuadernos, carpetas, calculadoras, marcadores, cintas adhesivas y otros materiales de oficina.</p>
            </div>

          </div>
        </div>
      </section>


      {/* Featured Products Section */}
      <ProductsSection
        title="Novedades"
        description="Descubre lo último en productos innovadores y exclusivos."
        products={featuredProducts}
        className="bg-section-contrast text-section-contrast-foreground"
        onExploreClick={onExploreClick}
      />

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

      <ProductsSection 
        title="Productos Destacados"
        description="Descubre nuestros productos más populares y de mayor demanda"
        products={featuredProducts}
        onExploreClick={onExploreClick}
      />
      <ProductsSection 
        title="Ofertas Populares"
        description="Aprovecha los productos más elegidos a precios imparables."
        className="bg-secondary text-secondary-foreground"
        products={featuredProducts}
        onExploreClick={onExploreClick}
      />


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
