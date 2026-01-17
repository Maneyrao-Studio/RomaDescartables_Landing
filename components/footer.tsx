import { Phone, MapPin, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded flex items-center justify-center">
                <span className="text-primary font-bold">RD</span>
              </div>
              <div>
                <div className="font-bold text-sm">ROMA</div>
                <div className="font-bold text-xs">DESCARTABLES</div>
              </div>
            </div>
            <p className="text-white/80">Distribuidora de papelería y descartables con venta por mayor y menor.</p>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-bold text-lg mb-4">Ubicación</h4>
            <div className="flex gap-3 mb-4">
              <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div className="text-white/80">
                <p className="font-semibold">San Justo</p>
                <p className="text-sm">Zona Oeste, La Matanza</p>
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
            <a
              href="https://wa.me/5491132813830"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-primary px-4 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-colors mb-3"
            >
              <Phone className="w-5 h-5" />
              WhatsApp
            </a>
            <p className="text-white/80 text-sm">📲 Hace tu pedido directo por WhatsApp</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8 text-center text-white/60">
          <p>&copy; 2026 Distribuidora Roma Descartables. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
