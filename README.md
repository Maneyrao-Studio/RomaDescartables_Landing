# Online Papelería Store

A Next.js application for an online stationery and disposables store (Distribuidora Roma Descartables). Selling wholesale and retail.

## Getting Started

First, install dependencies:

```bash
npm install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

To build for production:

```bash
npm run build
npm run start
# or
pnpm build
pnpm start
```

## Lint

```bash
npm run lint
# or
pnpm lint
```

## Deployment

Deployed on Vercel.

### 🚨 Guías Importantes de Despliegue

**Gestores de Paquetes Soportados**

Este proyecto soporta tanto **npm** como **pnpm** para desarrollo local. Para evitar fallos en el despliegue:

**Para Desarrollo Local:**
```bash
# Puedes usar tu gestor preferido:
npm install <nombre-del-paquete>
# o
pnpm install <nombre-del-paquete>
```

**Para Despliegue en Vercel:**
- **Configurado para usar npm** mediante `vercel.json`
- Vercel usará `npm install` y `npm run build`
- Esto evita conflictos con `pnpm-lock.yaml`

**Manejo de Lockfiles:**
1. **package-lock.json** - Usado por Vercel (npm)
2. **pnpm-lock.yaml** - Opcional para desarrollo local

**Manteniendo Ambos Lockfiles Sincronizados:**
```bash
# Después de agregar dependencias con npm:
npm install                    # Actualiza package-lock.json
npx pnpm install               # Sincroniza pnpm-lock.yaml
git add package-lock.json pnpm-lock.yaml
```

**Solución de Problemas de Despliegue:**
```bash
# Si el despliegue falla por problemas de lockfile:
rm -rf node_modules
npm install                    # Regenerar package-lock.json principal
npx pnpm install               # Sincronizar si usas pnpm localmente
git add package-lock.json pnpm-lock.yaml
```

**¿Por qué esta configuración?**
- **Flexibilidad local** - Usa tu gestor preferido
- **Consistencia en producción** - Vercel usa npm configurado explícitamente
- **Sin conflictos** - vercel.json define el gestor para CI/CD

Para más información, consulta la [documentación de configuración de Vercel](https://vercel.com/docs/concepts/projects/configuration).