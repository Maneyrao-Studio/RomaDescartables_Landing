import { Phone, MapPin, Clock, Instagram } from "lucide-react"
import Logo from "./ui/logo"

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Logo className="bg-muted" />
            <p className="mt-4 text-white/80">Distribuidora de papelería y descartables con venta por mayor y menor.</p>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-bold text-lg mb-4">Ubicación</h4>
            <div className="flex gap-3 mb-4">
              <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div className="text-white/80">
                <p className="font-semibold">San Justo</p>
                <p className="text-sm">Jujuy 2983 y Tomás Justo Villegas</p>
                <p className="text-sm">La Matanza, Buenos Aires</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div className="text-white/80 text-sm">
                <p>Atención al cliente</p>
                <p>Lunes a Viernes: 8:00 - 18:00</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contacto</h4>
            <div className="flex flex-col gap-3 mb-4">
              <a
                href="https://wa.me/5491132813830"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-primary px-4 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                <Phone className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href="https://www.instagram.com/romadescartables"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-red-500 to-[#EED30B] text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </a>
            </div>
            <p className="text-white/80 text-sm">Hace tu pedido directo por WhatsApp</p>
            <p className="text-white/80 text-sm">Síguenos en Instagram para novedades</p>
          </div>
        </div>

        {/* Divider */}
        <div className="pt-2 pb-4 text-center text-white/60">
          <p>&copy; 2026 Distribuidora Roma Descartables. Todos los derechos reservados.</p>
        </div>

        {/* Developer Attribution */}
        <div className="border-t border-white/20 py-16 text-center">
          <a
            href="https://maneyrao.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white/60 text-base transition-colors"
          >
            Desarrollado por Maneyrao Studio
          </a>
        </div>
      </div>
    </footer>
  )
}
