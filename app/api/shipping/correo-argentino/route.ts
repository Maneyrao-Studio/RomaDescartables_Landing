import { NextResponse } from 'next/server'

interface ShippingRequest {
  destinationCP: string
  weight: number // in grams
  dimensions: {
    length: number
    width: number
    height: number
  }
}

export async function POST(request: Request) {
  try {
    const { destinationCP, weight, dimensions }: ShippingRequest = await request.json()

    // Validate input
    if (!destinationCP || !weight || !dimensions) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Calculate volume (length × width × height in cm³)
    const volume = (dimensions.length * dimensions.width * dimensions.height) / 1000000 // Convert to m³

    // Check if API keys are configured
    const apiKey = process.env.CORREO_ARGENTINO_API_KEY
    const contractCode = process.env.CORREO_ARGENTINO_CONTRACT
    const originCP = process.env.CORREO_ARGENTINO_ORIGIN_CP || '1754' // Default to San Justo

    if (!apiKey || !contractCode) {
      // En desarrollo, retornar datos simulados para pruebas
      if (process.env.NODE_ENV === 'development') {
        console.log('API de Correo Argentino no configurada - retornando datos simulados')
        return NextResponse.json({
          provider: 'correo_argentino',
          cost: Math.round((weight / 1000) * 25 + 150), // Cálculo simulado
          estimatedDays: '3-5 días hábiles',
          serviceType: 'standard',
          currency: 'ARS',
          note: 'Datos simulados - configurar API para producción'
        })
      }

      return NextResponse.json(
        {
          error: 'Shipping service not configured',
          details: 'Correo Argentino API credentials not found. Configure CORREO_ARGENTINO_API_KEY and CORREO_ARGENTINO_CONTRACT environment variables.'
        },
        { status: 503 }
      )
    }

    // Llamar API de Correo Argentino
    // Nota: La URL real de la API se proporciona después del registro
    // Esta es una URL de placeholder - reemplazar con endpoint real después de obtener credenciales
    const apiUrl = process.env.CORREO_ARGENTINO_API_URL || 'https://api.correoargentino.com.ar/v1/cotizador'

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cp_origen: originCP, // San Justo, Provincia de Buenos Aires
        cp_destino: destinationCP,
        peso: weight,
        volumen: volume,
        contrato: contractCode
      })
    })

    if (!response.ok) {
      let errorDetails = 'Unknown error'

      try {
        const responseText = await response.text()

        // Verificar si respuesta es HTML (probablemente página de error)
        if (responseText.includes('<!DOCTYPE') || responseText.includes('<html>')) {
          errorDetails = 'Endpoint de API retornó HTML en lugar de JSON. Verificar URL de API y credenciales.'
        } else {
          // Intentar parsear como JSON
          const errorData = JSON.parse(responseText)
          errorDetails = errorData.message || errorData.error || responseText
        }
      } catch (parseError) {
        errorDetails = `HTTP ${response.status}: ${response.statusText}`
      }

      return NextResponse.json(
        {
          error: 'Failed to get shipping quote',
          details: errorDetails
        },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Transform response to our format
    return NextResponse.json({
      provider: 'correo_argentino',
      cost: data.costo_total || data.precio || 0,
      estimatedDays: data.plazo_entrega || data.dias_entrega || '3-5',
      serviceType: 'standard',
      currency: 'ARS'
    })

  } catch (error) {
    console.error('Correo Argentino API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}