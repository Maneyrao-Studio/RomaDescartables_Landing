import { 
  Product, 
  ProductStatus, 
  LegacyProduct,
  ProductMedia,
  Variant
} from '../types'
import { supabase } from '../supabase-client'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!

function getFullImageUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${SUPABASE_URL}/storage/v1/object/public/products/${path}`
}

export interface ProductRepository {
  findById(id: string): Promise<Product | null>
  findAll(options?: any): Promise<Product[]>
  findByStatus(status: ProductStatus): Promise<Product[]>
  search(query: string): Promise<Product[]>
  getLegacyProducts(): Promise<LegacyProduct[]>
  getLegacyProduct(id: string): Promise<LegacyProduct | null>
}

const LOCAL_IMAGE_MAP: Record<string, string> = {
  "bolsa-tela-1": "/tela-bolsa-15x26.jpg",
  "bolsa-tela-2": "/tela-bolsa-22x30.jpg",
  "bolsa-tela-3": "/tela-bolsa-30x40.jpg",
  "bolsa-tela-4": "/tela-bolsa-45x40.jpg",
  "bandeja-carton-1": "/bandeja-carton-blanca.jpg",
  "bandeja-carton-2": "/bandeja-carton-numero-7.jpg",
  "bandeja-carton-3": "/bandeja-carton-numero-8.jpg",
}

export class SupabaseProductRepository implements ProductRepository {
  async findById(id: string): Promise<Product | null> {
    try {
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error || !product) return null

      const [media, variants] = await Promise.all([
        this.getProductMedia(product.id),
        this.getProductVariants(product.id)
      ])

      return this.mapToProduct(product, media, variants)
    } catch (error) {
      console.error('Error fetching product:', error)
      return null
    }
  }

  async findAll(options: any = {}): Promise<Product[]> {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error || !products) return []

      const productsWithRelations = await Promise.all(
        products.map(async (product) => {
          const variants = await this.getProductVariants(product.id)
          return this.mapToProductList(product, variants)
        })
      )

      return productsWithRelations
    } catch (error) {
      console.error('Error fetching products:', error)
      return []
    }
  }

  async findByStatus(status: ProductStatus): Promise<Product[]> {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false })

      if (error || !products) return []

      const productsWithRelations = await Promise.all(
        products.map(async (product) => {
          const variants = await this.getProductVariants(product.id)
          return this.mapToProductList(product, variants)
        })
      )

      return productsWithRelations
    } catch (error) {
      console.error('Error fetching products by status:', error)
      return []
    }
  }

  async search(query: string): Promise<Product[]> {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .order('created_at', { ascending: false })

      if (error || !products) return []

      const productsWithRelations = await Promise.all(
        products.map(async (product) => {
          const variants = await this.getProductVariants(product.id)
          return this.mapToProductList(product, variants)
        })
      )

      return productsWithRelations
    } catch (error) {
      console.error('Error searching products:', error)
      return []
    }
  }

  async getLegacyProducts(): Promise<LegacyProduct[]> {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error || !products) return []

      const productsWithMedia = await Promise.all(
        products.map(async (product) => {
          const media = await this.getProductMedia(product.id)
          return this.adaptProductToLegacy(
            this.mapToProductList(product, []),
            media
          )
        })
      )

      return productsWithMedia
    } catch (error) {
      console.error('Error fetching legacy products:', error)
      return []
    }
  }

  async getLegacyProduct(id: string): Promise<LegacyProduct | null> {
    try {
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error || !product) return null

      const [media, variants] = await Promise.all([
        this.getProductMedia(product.id),
        this.getProductVariants(product.id)
      ])

      const fullProduct = this.mapToProduct(product, media, variants)
      return this.adaptProductToLegacy(fullProduct, media)
    } catch (error) {
      console.error('Error fetching legacy product:', error)
      return null
    }
  }

  private async getProductMedia(productId: string): Promise<ProductMedia[]> {
    const { data, error } = await supabase
      .from('product_media')
      .select('*')
      .eq('product_id', productId)
      .order('order', { ascending: true })

    if (error || !data) return []

    return data.map((item) => ({
      id: item.id,
      url: item.url,
      is_primary: item.is_primary,
      type: item.type,
      order: item.order
    }))
  }

  private async getProductVariants(productId: string): Promise<Variant[]> {
    const { data, error } = await supabase
      .from('product_variants')
      .select('*')
      .eq('product_id', productId)
      .order('sort_order', { ascending: true })

    if (error || !data) return []

    return data.map((item) => ({
      id: item.id,
      product_id: item.product_id,
      label: item.label,
      measure_value: item.measure_value,
      price: item.price,
      stock: item.stock,
      is_default: item.is_default,
      sort_order: item.sort_order
    }))
  }

  private mapToProduct(data: any, media: ProductMedia[], variants: Variant[]): Product {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      status: data.status as ProductStatus,
      is_featured: data.is_featured,
      created_at: data.created_at,
      product_media: media,
      variants
    }
  }

  private mapToProductList(data: any, variants: Variant[]): Product {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      status: data.status as ProductStatus,
      is_featured: data.is_featured,
      created_at: data.created_at,
      product_media: [],
      variants
    }
  }

  private adaptProductToLegacy(product: Product, media: ProductMedia[] = []): LegacyProduct {
    const dbImage = getFullImageUrl(media.find(m => m.is_primary)?.url || '')
    const localImage = LOCAL_IMAGE_MAP[product.id] || ''
    return {
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: product.price,
      image: dbImage || localImage,
      category: 'Sin categoría',
      is_featured: product.is_featured,
      specs: [],
      packs: [],
      variants: product.variants
    }
  }
}
