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
    const volume = dimensions.length * dimensions.width * dimensions.height

    // Check if API keys are configured
    const apiKey = process.env.ANDREANI_API_KEY
    const contractCode = process.env.ANDREANI_CONTRACT || 'AND00SUC'
    const originCP = process.env.ANDREANI_ORIGIN_CP || '1754' // Default to San Justo

    if (!apiKey) {
      // En desarrollo, retornar datos simulados para pruebas
      if (process.env.NODE_ENV === 'development') {
        console.log('API de Andreani no configurada - retornando datos simulados')
        return NextResponse.json({
          provider: 'andreani',
          cost: Math.round((weight / 1000) * 30 + 120), // Cálculo simulado
          estimatedDays: '2-3 días hábiles',
          serviceType: 'express',
          currency: 'ARS',
          pickupAvailable: true,
          note: 'Datos simulados - configurar API para producción'
        })
      }

      return NextResponse.json(
        {
          error: 'Shipping service not configured',
          details: 'Andreani API credentials not found. Configure ANDREANI_API_KEY environment variable.'
        },
        { status: 503 }
      )
    }

    // Llamar API de Andreani para cotización
    // Basado en ejemplos del SDK, necesitamos llamar su endpoint de cotizacion
    const response = await fetch('https://api.andreani.com/v1/cotizacion', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cpOrigen: originCP, // San Justo, Provincia de Buenos Aires
        cpDestino: destinationCP,
        peso: weight,
        volumen: volume,
        contrato: contractCode,
        // Additional parameters based on SDK examples
        tipoEnvio: 'domicilio', // or 'sucursal'
        valorDeclarado: 0 // Can be calculated based on cart value
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        {
          error: 'Failed to get shipping quote',
          details: errorData.message || 'Unknown error'
        },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Transform response to our format
    // Based on SDK examples, the response includes tarifa (rate)
    return NextResponse.json({
      provider: 'andreani',
      cost: data.tarifa || data.precio || 0,
      estimatedDays: data.plazo || data.diasEntrega || '2-3',
      serviceType: 'express',
      currency: 'ARS',
      // Include branch information if available
      pickupAvailable: data.sucursales?.length > 0 || false
    })

  } catch (error) {
    console.error('Andreani API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}