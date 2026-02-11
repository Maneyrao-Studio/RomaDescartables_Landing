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

import { BackendProductRepository } from './backend'

export const productRepository = new BackendProductRepository()