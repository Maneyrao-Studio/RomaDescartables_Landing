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
    const apiKey = process.env.SHIPNOW_API_KEY
    const apiUrl = process.env.SHIPNOW_API_URL || 'https://api.shipnow.com.ar/v1'

    if (!apiKey) {
      // In development, return mock data for testing
      if (process.env.NODE_ENV === 'development') {
        console.log('Shipnow API not configured - returning mock data')
        // Shipnow typically offers faster delivery with competitive pricing
        const cost = Math.round((weight / 1000) * 35 + 100) // More premium pricing
        return NextResponse.json({
          provider: 'shipnow',
          cost: cost,
          estimatedDays: '1-2 días hábiles',
          serviceType: 'express',
          currency: 'ARS',
          note: 'Datos simulados - configurar API para producción'
        })
      }

      return NextResponse.json(
        {
          error: 'Shipping service not configured',
          details: 'Shipnow API credentials not found. Configure SHIPNOW_API_KEY environment variable.'
        },
        { status: 503 }
      )
    }

    // Call Shipnow API for quote
    // Shipnow offers fulfillment services, so we need to check their shipping endpoints
    // Based on their documentation, they have endpoints for quotes and shipping calculations
    const response = await fetch(`${apiUrl}/quotes/shipping`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-API-Key': apiKey // Some APIs use X-API-Key header
      },
      body: JSON.stringify({
    origin: {
      postal_code: process.env.SHIPNOW_ORIGIN_CP || '1754', // San Justo, Provincia de Buenos Aires
      country: 'AR'
    },
        destination: {
          postal_code: destinationCP,
          country: 'AR'
        },
        package: {
          weight: weight / 1000, // Convert to kg
          dimensions: {
            length: dimensions.length,
            width: dimensions.width,
            height: dimensions.height
          },
          volume: volume
        },
        service_type: 'standard' // or 'express', 'fulfillment'
      })
    })

    if (!response.ok) {
      let errorDetails = 'Unknown error'

      try {
        const responseText = await response.text()

        // Check if response is HTML (likely an error page)
        if (responseText.includes('<!DOCTYPE') || responseText.includes('<html>')) {
          errorDetails = 'Endpoint de API retornó HTML en lugar de JSON. Verificar URL de API y credenciales.'
        } else {
          // Try to parse as JSON
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
    // Shipnow typically returns more comprehensive shipping data
    return NextResponse.json({
      provider: 'shipnow',
      cost: data.total_cost || data.cost || data.price || 0,
      estimatedDays: data.estimated_delivery || data.delivery_time || '1-2 días hábiles',
      serviceType: data.service_type || 'express',
      currency: 'ARS',
      // Shipnow often includes additional service information
      tracking_available: true,
      insurance_included: data.insurance_included || false,
      service_level: data.service_level || 'standard'
    })

  } catch (error) {
    console.error('Shipnow API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}