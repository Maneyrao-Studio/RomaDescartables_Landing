"use client"
import Link from "next/link"
import { Package, Truck, Award } from "lucide-react"
import ProductsSection from "./components/ProductsSection"
import HeroCarousel from "@/components/ui/hero-carousel"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface LandingProps {
  onExploreClick: () => void
}

export default function Landing({ onExploreClick }: LandingProps) {
  const featuredProductsAnimation = useScrollAnimation()
  const categoriesSectionAnimation = useScrollAnimation()
  const categoriesGridAnimation = useScrollAnimation()
  const featuresAnimation = useScrollAnimation()
  const regularProductsAnimation = useScrollAnimation()
  const locationAnimation = useScrollAnimation()

  const carouselImages = [
    {
      src: "/slide_video1.webm",
      alt: "Todo lo que necesitas al mejor precio en un solo lugar.",
      description: "Todo lo que necesitas al mejor precio en un solo lugar.",
      title: "Roma Descartables",
      isVideo: true,
    },
    {
      src: "/slide_video2.webm",
      title: "Roma Descartables",
      description: "Todo lo que necesitas al mejor precio en un solo lugar.",
      alt: "Todo lo que necesitas al mejor precio en un solo lugar.",
      isVideo: true,
    },
    {
      src: "/slide_video3.webm",
      title: "Roma Descartables",
      description: "Todo lo que necesitas al mejor precio en un solo lugar.",
      alt: "Todo lo que necesitas al mejor precio en un solo lugar.",
      isVideo: true,
    },
  ]

  return (
    <div className="bg-white">
      <div className="w-full h-96 md:h-[500px] lg:h-[600px]">
        <HeroCarousel images={carouselImages} />
      </div>
      
      <div ref={featuredProductsAnimation.ref} className={featuredProductsAnimation.animationClass}>
        <ProductsSection 
          title="Productos Destacados"
          description="Descubre nuestros productos más populares y de mayor demanda"
          onExploreClick={onExploreClick}
          productType="featured"
        />
      </div>

      <section ref={categoriesSectionAnimation.ref} className={`${categoriesSectionAnimation.animationClass} bg-secondary text-secondary-foreground py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <header className="text-center mb-12">
            <h2 className="text-3xl font-extrabold pb-2">
              Nuestras Categorías
            </h2>
            <p className="text-black/80">Encuentra todo lo que necesitas en un solo lugar</p>
         </header>
          <div ref={categoriesGridAnimation.ref} className={`${categoriesGridAnimation.animationClass} grid md:grid-cols-3 gap-8`}>

            <Link href="/catalogo?categoria=Bandejas%20de%20Cartón">
              <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow px-4 py-6 flex flex-col items-center text-center group animate-fade-up" style={{animationDelay: "100ms"}}>
                <div className="mb-6 h-40 w-full rounded-lg aspect-square bg-muted overflow-hidden">
                  <img
                    src="/tela-bolsa-45x40.jpg"
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Bandejas y envases desechables</h3>
              </div>
            </Link>

            <Link href="/catalogo?categoria=Bolsas%20de%20Tela">
              <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow px-4 py-6 flex flex-col items-center text-center group animate-fade-up" style={{animationDelay: "200ms"}}>
                <div className="mb-6 h-40 w-full rounded-lg aspect-square bg-muted overflow-hidden">
                  <img
                    src="/tela-bolsa-45x40.jpg"
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Bolsas y empaques</h3>
              </div>
            </Link>

            <Link href="/catalogo">
              <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow px-4 py-6 flex flex-col items-center text-center group animate-fade-up" style={{animationDelay: "300ms"}}>
                <div className="mb-6 h-40 w-full rounded-lg aspect-square bg-muted overflow-hidden ">
                  <img
                    src="/tela-bolsa-45x40.jpg"
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Artículos de librería y papelería</h3>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresAnimation.ref} className={`${featuresAnimation.animationClass} bg-primary text-white py-16`}>
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

      <div ref={regularProductsAnimation.ref} className={regularProductsAnimation.animationClass}>
        <ProductsSection 
          title="Descubre nuestros productos"
          description="Todo lo que necesitas al mejor precio en un solo lugar."
          onExploreClick={onExploreClick}
          productType="regular"
        />
      </div>

      {/* Location Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 animate-fade-up">Nuestra Ubicación</h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto animate-fade-up">
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
