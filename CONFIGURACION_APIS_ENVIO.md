# Configuración de APIs de Envío

## Correo Argentino (Paq.ar)

### Registro y Credenciales

1. **Acceder al portal**: https://www.correoargentino.com.ar/MiCorreo/public
2. **Completar registro**: Proporcionar datos comerciales (CUIT, razón social, etc.)
3. **Solicitar API**: Una vez aprobado, contactar soporte para obtener:
   - Clave API (API Key)
   - Código de contrato
   - URL específica del endpoint

### Variables de Entorno Requeridas

```env
CORREO_ARGENTINO_API_KEY=tu_clave_api_aqui
CORREO_ARGENTINO_CONTRACT=tu_codigo_contrato
CORREO_ARGENTINO_ORIGIN_CP=1754  # Código postal de origen
CORREO_ARGENTINO_API_URL=https://tu-endpoint-especifico
```

### Endpoint de API

- **Método**: POST
- **URL**: Variable (proporcionada por Correo Argentino)
- **Autenticación**: Bearer Token
- **Content-Type**: application/json

### Formato de Solicitud

```json
{
  "cp_origen": "1754",
  "cp_destino": "1000",
  "peso": 2500,
  "volumen": 0.000009,
  "contrato": "TU_CONTRATO"
}
```

### Formato de Respuesta

```json
{
  "costo_total": 1250.50,
  "plazo_entrega": "3-5",
  "moneda": "ARS"
}
```

## Andreani

### Registro y Credenciales

1. **Contactar ventas**: Comunicarse con el equipo comercial de Andreani
2. **Proporcionar datos**: CUIT, volumen estimado de envíos, etc.
3. **Obtener credenciales**:
   - Clave API
   - Código de contrato (generalmente "AND00SUC")
   - Código postal de origen

### Variables de Entorno Requeridas

```env
ANDREANI_API_KEY=tu_clave_api_aqui
ANDREANI_CONTRACT=AND00SUC
ANDREANI_ORIGIN_CP=1754
```

### Endpoint de API

- **Método**: POST
- **URL**: https://api.andreani.com/v1/cotizacion
- **Autenticación**: Bearer Token
- **Content-Type**: application/json

### Formato de Solicitud

```json
{
  "cpOrigen": "1754",
  "cpDestino": "1000",
  "peso": 2500,
  "volumen": 9000,
  "contrato": "AND00SUC",
  "tipoEnvio": "domicilio"
}
```

### Formato de Respuesta

```json
{
  "tarifa": 1100.00,
  "plazo": "2-3",
  "moneda": "ARS"
}
```

## Shipnow

### Registro y Credenciales

1. **Contactar ventas**: Comunicarse con el equipo comercial de Shipnow
2. **Registro**: Completar proceso de registro para servicios logísticos
3. **Servicios disponibles**:
   - **Shipfull**: Fulfillment completo
   - **Ship2B**: Logística mayorista
   - **Shipcross**: Crossdocking y última milla
   - **Shipwow**: Campañas puntuales y one-shot

4. **Obtener credenciales**:
   - API Key
   - URL base de la API
   - Código postal de origen

### Variables de Entorno Requeridas

```env
SHIPNOW_API_KEY=tu_clave_api_aqui
SHIPNOW_API_URL=https://api.shipnow.com.ar/v1
SHIPNOW_ORIGIN_CP=1754
```

### Endpoint de API

- **Método**: POST
- **URL**: `/quotes/shipping`
- **Autenticación**: Bearer Token
- **Content-Type**: application/json

### Formato de Solicitud

```json
{
  "origin": {
    "postal_code": "1754",
    "country": "AR"
  },
  "destination": {
    "postal_code": "1000",
    "country": "AR"
  },
  "package": {
    "weight": 2.5,
    "dimensions": {
      "length": 30,
      "width": 20,
      "height": 15
    },
    "volume": 9000
  },
  "service_type": "standard"
}
```

### Formato de Respuesta

```json
{
  "total_cost": 1350.00,
  "estimated_delivery": "1-2 días hábiles",
  "service_type": "express",
  "currency": "ARS",
  "tracking_available": true,
  "insurance_included": false,
  "service_level": "standard"
}
```

## Configuración en Desarrollo

### Datos Simulados

Cuando las APIs no están configuradas, el sistema automáticamente proporciona datos simulados:

- **Correo Argentino**: Costo = (peso/1000) × 25 + 150
- **Andreani**: Costo = (peso/1000) × 30 + 120
- **Tiempos**: Correo Argentino: "3-5 días", Andreani: "2-3 días"

### Verificación

Revisar la consola del navegador para mensajes:
```
Correo Argentino API not configured - returning mock data
Andreani API not configured - returning mock data
```

## Testing de APIs

### Usando cURL

```bash
# Probar Correo Argentino
curl -X POST http://localhost:3000/api/shipping/correo-argentino \
  -H "Content-Type: application/json" \
  -d '{"destinationCP":"1754","weight":1000,"dimensions":{"length":30,"width":20,"height":15}}'

# Probar Andreani
curl -X POST http://localhost:3000/api/shipping/andreani \
  -H "Content-Type: application/json" \
  -d '{"destinationCP":"1754","weight":1000,"dimensions":{"length":30,"width":20,"height":15}}'
```

### Respuestas Esperadas

#### Con APIs Configuradas
```json
{
  "provider": "correo_argentino",
  "cost": 1250.50,
  "estimatedDays": "3-5 días hábiles",
  "serviceType": "standard",
  "currency": "ARS"
}
```

#### Sin APIs (Desarrollo)
```json
{
  "provider": "correo_argentino",
  "cost": 175,
  "estimatedDays": "3-5 días hábiles",
  "serviceType": "standard",
  "currency": "ARS",
  "note": "Datos simulados - configurar API para producción"
}
```

## Solución de Problemas

### Error: "Unexpected token '<'"
- La API está retornando HTML (página de error)
- Verificar URL correcta del endpoint
- Comprobar credenciales válidas
- Contactar soporte del proveedor

### Error: "Shipping service not configured"
- Variables de entorno no configuradas
- Verificar archivo `.env.local`
- Reiniciar servidor de desarrollo

### Error: "Failed to get shipping quote"
- Endpoint de API inaccesible
- Problemas de red
- Credenciales inválidas
- Servicio temporalmente no disponible

## Contactos de Soporte

### Correo Argentino
- **Portal**: https://www.correoargentino.com.ar/MiCorreo/public
- **Soporte**: Contactar desde el portal de MiCorreo

### Andreani
- **Ventas**: Contactar equipo comercial
- **Soporte técnico**: Según credenciales proporcionadas

## Consideraciones Importantes

1. **Registro obligatorio**: Ambas compañías requieren registro comercial
2. **Contratos**: Pueden incluir compromisos de volumen mínimo
3. **URLs específicas**: Correo Argentino proporciona URLs personalizadas
4. **Testing**: Usar datos simulados durante desarrollo
5. **Monitoreo**: Verificar estado de APIs en producción