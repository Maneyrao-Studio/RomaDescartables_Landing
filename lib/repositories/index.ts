import { 
  Product, 
  ProductStatus, 
  LegacyProduct 
} from '../types'
import { getSupabaseClient } from '../supabase'

export interface ProductRepository {
  findById(id: string): Promise<Product | null>
  findAll(options?: any): Promise<Product[]>
  findByStatus(status: ProductStatus): Promise<Product[]>
  search(query: string): Promise<Product[]>
  getLegacyProducts(): Promise<LegacyProduct[]>
  getLegacyProduct(id: string): Promise<LegacyProduct | null>
}

export class SupabaseProductRepository implements ProductRepository {
  private supabase = getSupabaseClient()

  async findById(id: string): Promise<Product | null> {
    try {
      const { data, error } = await this.supabase
        .from('products')
        .select(`
          *,
          product_media(id, url, is_primary, type, order)
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching product:', error)
      return null
    }
  }

  async findAll(options: any = {}): Promise<Product[]> {
    try {
      let query = this.supabase
        .from('products')
        .select(`
          *,
          product_media(id, url, is_primary, type, order)
        `)

      if (options.filters?.status) {
        query = query.eq('status', options.filters.status)
      }

      if (options.orderBy) {
        query = query.order(options.orderBy, { ascending: options.orderDirection !== 'desc' })
      }

      if (options.limit) {
        query = query.limit(options.limit)
      }

      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
      }

      const { data, error } = await query
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching products:', error)
      return []
    }
  }

  async findByStatus(status: ProductStatus): Promise<Product[]> {
    return this.findAll({ filters: { status } })
  }

  async search(query: string): Promise<Product[]> {
    try {
      const { data, error } = await this.supabase
        .from('products')
        .select(`
          *,
          product_media(id, url, is_primary, type, order)
        `)
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .eq('status', ProductStatus.ACTIVE)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error searching products:', error)
      return []
    }
  }

  async getLegacyProducts(): Promise<LegacyProduct[]> {
    try {
      const { data, error } = await this.supabase
        .from('products')
        .select(`
          *,
          product_media(id, url, is_primary, type, order)
        `)
        .eq('status', ProductStatus.ACTIVE)

      if (error) throw error
      
      return data?.map(product => 
        this.adaptProductToLegacy(product, product.product_media || [])
      ) || []
    } catch (error) {
      console.error('Error fetching legacy products:', error)
      return []
    }
  }

  async getLegacyProduct(id: string): Promise<LegacyProduct | null> {
    try {
      const { data, error } = await this.supabase
        .from('products')
        .select(`
          *,
          product_media(id, url, is_primary, type, order)
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      if (!data) return null

      return this.adaptProductToLegacy(data, data.product_media || [])
    } catch (error) {
      console.error('Error fetching legacy product:', error)
      return null
    }
  }

  

  private adaptProductToLegacy(product: Product, media: any[] = []): LegacyProduct {
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
}

export const productRepository = new SupabaseProductRepository()