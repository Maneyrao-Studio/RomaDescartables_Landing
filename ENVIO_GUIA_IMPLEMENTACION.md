# Guía de Implementación de Cotizaciones de Envío

## Resumen

Esta implementación permite a los usuarios de Roma Descartables obtener cotizaciones de envío en tiempo real desde dos proveedores argentinos principales: Correo Argentino y Andreani.

## Funcionalidades Implementadas

### 1. Opciones de Envío
- **Retiro en sucursal**: Sin costo adicional
- **Envío a domicilio**: Con cotización automática

### 2. Integración API
- Endpoints REST para ambas compañías
- Manejo de errores robusto
- Datos simulados para desarrollo

### 3. Interfaz de Usuario
- Selección intuitiva de método de envío
- Formulario para código postal
- Indicadores de carga y errores
- Actualización automática del total

## Configuración Inicial

### Registro con Proveedores

1. **Correo Argentino**:
   - Visitar: https://www.correoargentino.com.ar/MiCorreo/public
   - Completar formulario de registro comercial
   - Solicitar credenciales API
   - Obtener URL específica del endpoint

2. **Andreani**:
   - Contactar equipo comercial
   - Solicitar acceso a API
   - Obtener clave API y códigos de contrato

### Variables de Entorno

Crear archivo `.env.local` con:

```env
# Correo Argentino
CORREO_ARGENTINO_API_KEY=tu_clave_aqui
CORREO_ARGENTINO_CONTRACT=codigo_contrato
CORREO_ARGENTINO_ORIGIN_CP=1424
CORREO_ARGENTINO_API_URL=https://tu_endpoint

# Andreani
ANDREANI_API_KEY=tu_clave_aqui
ANDREANI_CONTRACT=AND00SUC
ANDREANI_ORIGIN_CP=1424
```

## Flujo de Cotización

### Proceso Técnico

1. **Usuario selecciona "Cotizar envío"**
2. **Ingresa código postal de destino**
3. **Selecciona transportista**
4. **Sistema calcula peso y dimensiones del paquete**
5. **Llama a API correspondiente**
6. **Muestra resultado al usuario**

### Cálculos Automáticos

- **Peso**: 500g por artículo (configurable)
- **Dimensiones**: Estimadas por cantidad de productos
- **Volumen**: Largo × Ancho × Alto (m³)

## Manejo de Errores

### Errores Comunes y Soluciones

#### "Unexpected token '<'"
**Causa**: API retorna HTML en lugar de JSON
**Solución**:
- Verificar URL de API
- Comprobar credenciales
- Contactar soporte del proveedor

#### "Shipping service not configured"
**Causa**: Variables de entorno faltantes
**Solución**:
- Verificar archivo `.env`
- Reiniciar servidor de desarrollo

#### "Failed to get shipping quote"
**Causa**: Problemas de conectividad o API
**Solución**:
- Verificar conexión a internet
- Comprobar estado de APIs
- Usar datos simulados en desarrollo

## Modo Desarrollo

Sin configuración de APIs, el sistema automáticamente:

- Retorna datos simulados
- Muestra cálculos basados en peso
- Permite probar la interfaz completa
- Registra mensajes en consola

## Personalización

### Cambiar Cálculos de Paquete

Editar `context/cart-context.tsx`:

```typescript
// Modificar cálculo de peso
const totalWeight = items.reduce((weight, item) => weight + (item.quantity * 300), 0) // 300g por item
```

### Agregar Más Transportistas

1. Crear nuevo endpoint en `app/api/shipping/`
2. Agregar opción en UI del carrito
3. Actualizar contexto del carrito

## Testing

### Pruebas Manuales

1. Agregar productos al carrito
2. Seleccionar "Cotizar envío"
3. Probar con diferentes códigos postales
4. Verificar mensajes de WhatsApp
5. Probar ambos transportistas

### Pruebas de API

```bash
# Probar endpoint
curl -X POST http://localhost:3000/api/shipping/correo-argentino \
  -H "Content-Type: application/json" \
  -d '{"destinationCP":"1754","weight":1000,"dimensions":{"length":30,"width":20,"height":15}}'
```

## Despliegue en Producción

### Checklist Pre-Despliegue

- [ ] APIs configuradas con credenciales reales
- [ ] Variables de entorno actualizadas
- [ ] Probar cotizaciones con datos reales
- [ ] Verificar manejo de errores
- [ ] Testear integración WhatsApp

### Monitoreo

- Monitorear logs de errores de API
- Verificar uptime de servicios externos
- Mantener credenciales actualizadas

## Soporte

Para problemas específicos:

- **Correo Argentino**: Contactar soporte MiCorreo
- **Andreani**: Contactar equipo comercial
- **Código**: Revisar logs de aplicación y consola del navegador

## Mejoras Futuras

- Dimensiones específicas por producto
- Múltiples paquetes por pedido
- Seguro de envío opcional
- Seguimiento de envíos integrado
- Mapa interactivo de sucursales