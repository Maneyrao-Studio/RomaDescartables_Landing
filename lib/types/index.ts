export enum ProductStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  OUT_OF_STOCK = 'out_of_stock',
  DISCONTINUED = 'discontinued'
}

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  stock: number
  status: ProductStatus
  is_featured: boolean
  created_at: string
}

export interface LegacyProduct {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  is_featured: boolean
  specs?: string[]
  packs?: Pack[]
}

export interface Pack {
  id?: string
  product_id: string
  quantity: number
  price: number
  is_active?: boolean
}

export function adaptProductToLegacy(product: Product, media: any[] = []): LegacyProduct {
  return {
    id: product.id,
    name: product.name,
    description: product.description || '',
    price: product.price,
    image: media.find(m => m.is_primary)?.url || '',
    category: 'Sin categoría',
    is_featured: product.is_featured,
    specs: [],
    packs: []
  }
}