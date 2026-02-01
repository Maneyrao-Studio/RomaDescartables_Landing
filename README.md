# Online Papelería Store

A Next.js application for an online stationery and disposables store (Distribuidora Roma Descartables). Selling wholesale and retail.

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

To build for production:

```bash
pnpm build
pnpm start
```

## Lint

```bash
pnpm lint
```

## Deployment

Deployed on Vercel.

### 🚨 Guías Importantes de Despliegue

**Consistencia del Gestor de Paquetes**

Este proyecto utiliza **pnpm** como gestor de paquetes. Para evitar fallos en el despliegue:

1. **Usa siempre pnpm para gestionar dependencias**
   ```bash
   pnpm install <nombre-del-paquete>
   ```

2. **Nunca mezcles gestores de paquetes** - No uses `npm install` o `yarn add`
   - Esto crea lockfiles conflictivos (`package-lock.json`, `yarn.lock`)
   - Vercel detecta `pnpm-lock.yaml` y usa pnpm automáticamente
   - Los lockfiles mixtos causan errores de "frozen-lockfile" en CI

3. **Mantén pnpm-lock.yaml actualizado**
   - Después de agregar dependencias, el lockfile se actualiza automáticamente
   - Siempre haz commit del `pnpm-lock.yaml` actualizado a git
   - Nunca edites el lockfile manualmente

4. **Solución de problemas de despliegue**
   ```bash
   # Si el despliegue falla por problemas de lockfile:
   rm package-lock.json yarn.lock  # Eliminar lockfiles conflictivos
   pnpm install                    # Regenerar pnpm-lock.yaml
   git add pnpm-lock.yaml         # Hacer commit del lockfile actualizado
   ```

**¿Por qué esto es importante:**
- Vercel CI ejecuta con `--frozen-lockfile` por defecto
- Esto asegura builds reproducibles entre entornos
- Los lockfiles desactualizados causan fallos en producción

Para más información, consulta la [documentación de gestores de paquetes de Vercel](https://vercel.com/docs/concepts/projects/overview#package-manager).