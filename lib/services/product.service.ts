import { 
  LegacyProduct 
} from '../types'
import { productRepository } from '../repositories'

export class ProductService {
  async getProductsForCatalog(): Promise<LegacyProduct[]> {
    try {
      return await productRepository.getLegacyProducts()
    } catch (error) {
      console.error('Error fetching catalog products:', error)
      return []
    }
  }

  async getProductForCatalog(id: string): Promise<LegacyProduct | null> {
    try {
      return await productRepository.getLegacyProduct(id)
    } catch (error) {
      console.error('Error fetching catalog product:', error)
      return null
    }
  }
}

export const productService = new ProductService()