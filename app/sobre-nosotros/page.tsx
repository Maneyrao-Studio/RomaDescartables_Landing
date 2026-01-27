import BackButton from "@/components/ui/back-button"

export default function SobreNosotros() {
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <BackButton href="/" />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8 text-center">Sobre Roma Descartables</h1>

          <div className="prose prose-lg mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-border mb-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Nuestra Historia</h2>
              <p className="text-foreground/70 mb-4">
                Roma Descartables nació con la visión de proporcionar productos de calidad para el sector comercial y minorista.
                Ubicados en San Justo, La Matanza, nos hemos convertido en referentes del mercado de papelería y descartables.
              </p>
              <p className="text-foreground/70 mb-4">
                Desde nuestros inicios, nos hemos comprometido con la excelencia, ofreciendo productos que combinan calidad,
                durabilidad y diseño funcional. Nuestro objetivo es ser el aliado confiable de comercios, oficinas y hogares.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
                <h3 className="text-xl font-bold text-primary mb-4">Nuestra Misión</h3>
                <p className="text-foreground/70">
                  Proporcionar productos de papelería y descartables de la más alta calidad,
                  facilitando el día a día de nuestros clientes con soluciones prácticas y duraderas.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
                <h3 className="text-xl font-bold text-primary mb-4">Nuestra Visión</h3>
                <p className="text-foreground/70">
                  Ser la empresa líder en distribución de productos descartables,
                  reconocida por nuestra calidad, servicio y compromiso con el medio ambiente.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-border mb-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Nuestros Valores</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Calidad</h4>
                  <p className="text-sm text-foreground/70">Solo los mejores productos para nuestros clientes</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Confianza</h4>
                  <p className="text-sm text-foreground/70">Relaciones sólidas basadas en la honestidad</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Servicio</h4>
                  <p className="text-sm text-foreground/70">Atención rápida y eficiente</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Sostenibilidad</h4>
                  <p className="text-sm text-foreground/70">Compromiso con el medio ambiente</p>
                </div>
              </div>
            </div>

            <div className="bg-primary text-white rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">¿Listo para trabajar con nosotros?</h2>
              <p className="mb-6 opacity-90">
                Contáctanos para conocer nuestras opciones de venta mayorista y distribución.
              </p>
              <a
                href="https://wa.me/5491132813830?text=Hola%20Roma%20Descartables%2C%20quisiera%20información%20sobre%20venta%20mayorista"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                📱 Contactar WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}