# Cotizaciones de Envío - Documentación Técnica

## Implementación de Cotizaciones de Envío

Esta aplicación incluye funcionalidad integrada de cotizaciones de envío para Argentina utilizando dos transportistas principales: Correo Argentino (Paq.ar) y Andreani.

### Características

- **Dos opciones de envío**: Retiro en sucursal o cotizaciones de envío a domicilio
- **Cotizaciones en tiempo real**: Integración con APIs de Correo Argentino y Andreani
- **Cálculo automático**: Estimación de dimensiones y peso del paquete
- **Estado persistente del carrito**: Preferencias de envío guardadas en localStorage
- **Integración WhatsApp**: Detalles de envío incluidos en mensajes de pedidos

### Opciones de Envío

1. **Retiro en Sucursal**
   - Sin costo de envío
   - Cliente retira en sucursales designadas

2. **Cotizaciones de Envío a Domicilio**
   - Cotizaciones en tiempo real de Correo Argentino o Andreani
   - Requiere código postal de destino
   - Incluye tiempos estimados de entrega

### Integración de APIs

#### Correo Argentino (Paq.ar)

**Endpoint**: `POST /api/shipping/correo-argentino`

**Requisitos**:
- Registro comercial con Correo Argentino
- Credenciales de API (token Bearer)
- Código de contrato
- Código postal de origen

**Variables de Entorno**:
```env
CORREO_ARGENTINO_API_KEY=your_api_key_here
CORREO_ARGENTINO_CONTRACT=your_contract_code
CORREO_ARGENTINO_ORIGIN_CP=1424
CORREO_ARGENTINO_API_URL=https://your-api-endpoint-here  # Proporcionado después del registro
```

#### Andreani

**Endpoint**: `POST /api/shipping/andreani`

**Requisitos**:
- Cuenta comercial con Andreani
- Autenticación con clave API
- Código de contrato
- Código postal de origen

**Variables de Entorno**:
```env
ANDREANI_API_KEY=your_api_key_here
ANDREANI_CONTRACT=AND00SUC
ANDREANI_ORIGIN_CP=1424
```

#### Shipnow

**Endpoint**: `POST /api/shipping/shipnow`

**Requisitos**:
- Cuenta comercial con Shipnow
- Servicio de fulfillment/logística
- Credenciales de API
- Código postal de origen

**Servicios Ofrecidos**:
- Shipfull: Fulfillment completo
- Ship2B: Logística mayorista
- Shipcross: Crossdocking
- Shipwow: Campañas puntuales

**Variables de Entorno**:
```env
SHIPNOW_API_KEY=your_api_key_here
SHIPNOW_API_URL=https://api.shipnow.com.ar/v1  # URL base de la API
SHIPNOW_ORIGIN_CP=1424
```

### Implementación Técnica

#### Actualizaciones del Contexto del Carrito

El contexto del carrito (`context/cart-context.tsx`) ha sido extendido para incluir:

```typescript
interface ShippingState {
  method: 'pickup' | 'quote'
  destinationCP: string
  quote: ShippingQuote | null
  isLoading: boolean
  error: string | null
}
```

#### Formato de Solicitud API

```typescript
// Solicitud
{
  "destinationCP": "1754",
  "weight": 2500,  // gramos
  "dimensions": {
    "length": 30,   // cm
    "width": 20,    // cm
    "height": 15    // cm
  }
}

// Respuesta
{
  "provider": "correo_argentino",
  "cost": 1250.50,
  "estimatedDays": "3-5 días hábiles",
  "serviceType": "standard",
  "currency": "ARS"
}
```

#### Cálculo de Paquetes

Actualmente utiliza valores estimados:
- **Peso**: 500g por artículo (configurable)
- **Dimensiones**: Calculadas basadas en cantidad de artículos
- **Volumen**: Largo × Ancho × Alto (convertido a m³ para API)

### Instrucciones de Configuración

1. **Registrarse con Proveedores de Envío**:
   - Correo Argentino: https://www.correoargentino.com.ar/MiCorreo/public
   - Andreani: Contactar equipo comercial para acceso API

2. **Configurar Variables de Entorno**:
   ```env
   # Correo Argentino
   CORREO_ARGENTINO_API_KEY=your_key
   CORREO_ARGENTINO_CONTRACT=your_contract
   CORREO_ARGENTINO_ORIGIN_CP=1424
   CORREO_ARGENTINO_API_URL=https://your-api-endpoint  # Proporcionado después del registro

   # Andreani
   ANDREANI_API_KEY=your_key
   ANDREANI_CONTRACT=AND00SUC
   ANDREANI_ORIGIN_CP=1424
   ```

3. **Modo Desarrollo**:
   - Sin credenciales API, el sistema retorna datos simulados para pruebas
   - Cálculos simulados basados en peso del paquete
   - Revisar consola del navegador para mensajes "API not configured"
   - Configurar APIs reales para uso en producción

4. **Probar la Integración**:
   - Agregar artículos al carrito
   - Seleccionar "Cotizar envío"
   - Ingresar código postal argentino válido (ej: 1754)
   - Hacer clic en "Calcular envío"
   - Verificar que mensaje de WhatsApp incluye detalles de envío

### Manejo de Errores

- **Códigos postales inválidos**: Validación en frontend
- **Fallos de API**: Retroceso elegante con mensajes de error
- **Credenciales faltantes**: Mensajes de servicio no disponible (modo desarrollo usa datos simulados)
- **Errores de red**: Mecanismos de reintento y retroalimentación al usuario
- **Respuestas HTML**: Indica URL de API incorrecta o problemas de autenticación

### Solución de Problemas

**"Unexpected token '<', "<!DOCTYPE "... is not valid JSON"**
- La API está retornando una página de error HTML en lugar de JSON
- Verificar que la URL de API sea correcta (proporcionada después del registro)
- Verificar que las credenciales de API sean válidas
- Contactar soporte de Correo Argentino para endpoint correcto

**"Shipping service not configured"**
- Variables de entorno no están configuradas
- Verificar que archivo `.env` contenga variables requeridas
- En desarrollo, datos simulados serán retornados automáticamente

**"Failed to get shipping quote"**
- Endpoint de API puede estar caído o inaccesible
- Verificar conectividad de red
- Verificar credenciales y códigos de contrato de API
- Contactar soporte del proveedor si el problema persiste

### Mejoras Futuras

- **Dimensiones específicas por producto**: Agregar peso/dimensiones a base de datos de productos
- **Soporte para múltiples paquetes**: Dividir pedidos grandes en múltiples paquetes
- **Localizador de sucursales**: Mapa interactivo para ubicaciones de retiro
- **Opciones de seguro**: Cobertura adicional para envíos de alto valor
- **Envío internacional**: Expandir más allá de Argentina

### Estructura de Archivos

```
app/api/shipping/
├── correo-argentino/route.ts    # Integración API Correo Argentino
└── andreani/route.ts            # Integración API Andreani

context/
└── cart-context.tsx             # Extendido con funcionalidad de envío

components/
└── cart-view.tsx                # UI actualizada con opciones de envío

hooks/
└── use-cart.ts                  # Actualizado con funciones de envío
```

### Archivos de Configuración

- **`.env.example`**: Variables de entorno requeridas
- **`ENVIO_GUIA_IMPLEMENTACION.md`**: Guía completa de implementación
- **`CONFIGURACION_APIS_ENVIO.md`**: Configuración detallada de APIs