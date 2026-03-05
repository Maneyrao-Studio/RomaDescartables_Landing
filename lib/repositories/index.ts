import { 
  Product, 
  ProductStatus, 
  LegacyProduct 
} from '../types'

export interface ProductRepository {
  findById(id: string): Promise<Product | null>
  findAll(options?: any): Promise<Product[]>
  findByStatus(status: ProductStatus): Promise<Product[]>
  search(query: string): Promise<Product[]>
  getLegacyProducts(): Promise<LegacyProduct[]>
  getLegacyProduct(id: string): Promise<LegacyProduct | null>
}

import { SupabaseProductRepository } from './supabase'

export const productRepository = new SupabaseProductRepository()