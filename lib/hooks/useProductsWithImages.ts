"use client"

import { useProducts } from "./useProducts"
import { LegacyProduct } from "../types"

export function useProductsWithImages(options: Parameters<typeof useProducts>[0] = {}) {
  const productsResult = useProducts(options)

  return {
    ...productsResult,
    products: productsResult.data || [],
    // Helper to check if any products need images loaded
    hasProductsWithoutImages: productsResult.data?.some(product => !product.image) ?? false,
    // Helper to count products without images
    productsWithoutImagesCount: productsResult.data?.filter(product => !product.image).length ?? 0
  }
}