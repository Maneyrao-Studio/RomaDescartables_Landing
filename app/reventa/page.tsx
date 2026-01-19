import BackButton from "@/components/ui/back-button"

export default function Reventa() {
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackButton href="/" />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8 text-center">Oportunidades de Reventa</h1>

          <div className="prose prose-lg mx-auto">
            <div className="bg-primary text-white rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">¿Interesado en ser distribuidor?</h2>
              <p className="mb-6 opacity-90">
                Lleva tu negocio al siguiente nivel distribuyendo nuestras soluciones líderes en el mercado.
              </p>
              <a
                href="https://wa.me/5491132813830?text=Hola%20Roma%20Descartables%2C%20estoy%20interesado%20en%20ser%20distribuidor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Solicitar Información
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}