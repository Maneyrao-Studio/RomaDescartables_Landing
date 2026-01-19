# Tienda Online de Papelería

Una aplicación Next.js para una tienda online de papelería y descartables (Distribuidora Roma Descartables). Venta al por mayor y menor.

## Documentación

### 📚 Documentación Técnica

- **[Cotizaciones de Envío](docs/cotizaciones-envio.md)** - Sistema completo de cotizaciones integrado con Correo Argentino y Andreani
- **[Guía de Implementación](ENVIO_GUIA_IMPLEMENTACION.md)** - Guía detallada para desarrolladores
- **[Configuración de APIs](CONFIGURACION_APIS_ENVIO.md)** - Configuración paso a paso de proveedores de envío

### 🚀 Inicio Rápido

Esta aplicación incluye un sistema completo de cotizaciones de envío integrado con Correo Argentino y Andreani para Argentina.

#### Andreani

**Endpoint**: `POST /api/shipping/andreani`

**Requirements**:
- Business account with Andreani
- API key authentication
- Contract code
- Origin postal code

**Environment Variables**:
```env
ANDREANI_API_KEY=your_api_key_here
ANDREANI_CONTRACT=AND00SUC  # Default contract
ANDREANI_ORIGIN_CP=1424  # Buenos Aires origin
```

### Technical Implementation

#### Cart Context Updates

The cart context (`context/cart-context.tsx`) has been extended to include:

```typescript
interface ShippingState {
  method: 'pickup' | 'quote'
  destinationCP: string
  quote: ShippingQuote | null
  isLoading: boolean
  error: string | null
}
```

#### API Request Format

```typescript
// Request
{
  "destinationCP": "1754",
  "weight": 2500,  // grams
  "dimensions": {
    "length": 30,   // cm
    "width": 20,    // cm
    "height": 15    // cm
  }
}

// Response
{
  "provider": "correo_argentino",
  "cost": 1250.50,
  "estimatedDays": "3-5 días hábiles",
  "serviceType": "standard",
  "currency": "ARS"
}
```

#### Package Calculation

Currently uses estimated values:
- **Weight**: 500g per item (configurable)
- **Dimensions**: Calculated based on number of items
- **Volume**: Length × Width × Height (converted to m³ for API)

### Setup Instructions

1. **Register with Shipping Providers**:
   - Correo Argentino: https://www.correoargentino.com.ar/MiCorreo/public
   - Andreani: Contact their sales team for API access

2. **Configure Environment Variables**:
   ```env
   # Correo Argentino
   CORREO_ARGENTINO_API_KEY=your_key
   CORREO_ARGENTINO_CONTRACT=your_contract
   CORREO_ARGENTINO_ORIGIN_CP=1424
   CORREO_ARGENTINO_API_URL=https://your-api-endpoint  # Provided after registration

   # Andreani
   ANDREANI_API_KEY=your_key
   ANDREANI_CONTRACT=AND00SUC
   ANDREANI_ORIGIN_CP=1424
   ```

3. **Development Mode**:
   - Without API credentials, the system returns mock data for testing
   - Mock calculations are based on package weight
   - Check browser console for "API not configured" messages
   - Configure actual APIs for production use

4. **Test the Integration**:
   - Add items to cart
   - Select "Cotizar envío"
   - Enter a valid Argentine postal code (e.g., 1754)
   - Click "Calcular envío"
   - Check WhatsApp message includes shipping details

### Error Handling

- **Invalid postal codes**: Frontend validation
- **API failures**: Graceful fallback with error messages
- **Missing credentials**: Service unavailable messages (development mode uses mock data)
- **Network errors**: Retry mechanisms and user feedback
- **HTML responses**: Indicates incorrect API URL or authentication issues

### Troubleshooting

**"Unexpected token '<', "<!DOCTYPE "... is not valid JSON"**
- The API is returning an HTML error page instead of JSON
- Check that the API URL is correct (provided after registration)
- Verify API credentials are valid
- Contact Correo Argentino support for correct endpoint

**"Shipping service not configured"**
- Environment variables are not set
- Check `.env` file contains required variables
- In development, mock data will be returned automatically

**"Failed to get shipping quote"**
- API endpoint may be down or unreachable
- Check network connectivity
- Verify API credentials and contract codes
- Contact provider support if issue persists

### Future Improvements

- **Product-specific dimensions**: Add weight/dimensions to product database
- **Multiple package support**: Split large orders into multiple packages
- **Branch locator**: Interactive map for pickup locations
- **Insurance options**: Additional coverage for high-value shipments
- **International shipping**: Expand beyond Argentina

### File Structure

```
app/api/shipping/
├── correo-argentino/route.ts    # Correo Argentino API integration
└── andreani/route.ts            # Andreani API integration

context/
└── cart-context.tsx             # Extended with shipping functionality

components/
└── cart-view.tsx                # Updated UI with shipping options

hooks/
└── use-cart.ts                  # Updated with shipping functions
```

## Primeros Pasos

Primero, instalar dependencias:

```bash
npm install
# o
pnpm install
```

Luego, ejecutar el servidor de desarrollo:

```bash
npm run dev
# o
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Compilación

Para compilar para producción:

```bash
npm run build
npm run start
```

## Linting

```bash
npm run lint
```

## Despliegue

Desplegado en Vercel.