import { 
  Product, 
  ProductStatus, 
  LegacyProduct,
  ProductMedia
} from '../types'
import { ApiClient } from '../api-client'

export interface ProductRepository {
  findById(id: string): Promise<Product | null>
  findAll(options?: any): Promise<Product[]>
  findByStatus(status: ProductStatus): Promise<Product[]>
  search(query: string): Promise<Product[]>
  getLegacyProducts(): Promise<LegacyProduct[]>
  getLegacyProduct(id: string): Promise<LegacyProduct | null>
}

export class BackendProductRepository implements ProductRepository {
  private api = new ApiClient()

  async findById(id: string): Promise<Product | null> {
    try {
      const data = await this.api.get(`/public/products/${id}`)
      return this.mapToProduct(data)
    } catch (error) {
      console.error('Error fetching product:', error)
      return null
    }
  }

  async findAll(options: any = {}): Promise<Product[]> {
    try {
      const data = await this.api.get<any[]>('/public/products')
      return data.map((product: any) => this.mapToProductList(product))
    } catch (error) {
      console.error('Error fetching products:', error)
      return []
    }
  }

  async findByStatus(status: ProductStatus): Promise<Product[]> {
    // Backend solo devuelve productos activos
    if (status !== ProductStatus.ACTIVE) {
      return []
    }
    return this.findAll()
  }

  async search(query: string): Promise<Product[]> {
    try {
      const allProducts = await this.findAll()
      if (!query || !query.trim()) {
        return allProducts
      }
      
      const searchLower = query.toLowerCase()
      return allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchLower) ||
        (product.description && product.description.toLowerCase().includes(searchLower))
      )
    } catch (error) {
      console.error('Error searching products:', error)
      return []
    }
  }

  async getLegacyProducts(): Promise<LegacyProduct[]> {
    try {
      const data = await this.api.get<any[]>('/public/products')
      return data.map((product: any) => 
        this.adaptProductToLegacy(this.mapToProductList(product), [])
      )
    } catch (error) {
      console.error('Error fetching legacy products:', error)
      return []
    }
  }

  async getLegacyProduct(id: string): Promise<LegacyProduct | null> {
    try {
      const data = await this.api.get(`/public/products/${id}`)
      const product = this.mapToProduct(data)
      return this.adaptProductToLegacy(product, product.product_media || [])
    } catch (error) {
      console.error('Error fetching legacy product:', error)
      return null
    }
  }

  private mapToProduct(data: any): Product {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      status: ProductStatus.ACTIVE, // Backend solo devuelve activos
      is_featured: data.is_featured,
      created_at: '', // No utilizado según indicación
      product_media: data.images?.map((img: any) => ({
        id: img.id,
        url: img.url,
        is_primary: img.is_primary,
        type: 'image',
        order: img.order
      })) || []
    }
  }

  private mapToProductList(data: any): Product {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      status: ProductStatus.ACTIVE, // Backend solo devuelve activos
      is_featured: data.is_featured,
      created_at: '', // No utilizado
      product_media: []
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