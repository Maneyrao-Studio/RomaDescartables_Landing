"use client"

import { useQuery } from "@tanstack/react-query"
import { productService } from "../services/product.service"

interface UseProductsOptions {
  category?: string
  search?: string
  enabled?: boolean
}

export function useProducts(options: UseProductsOptions = {}) {
  const { category, search, enabled = true } = options

  return useQuery({
    queryKey: ["products", { category, search }],
    queryFn: () => productService.getProductsForCatalog(),
    enabled,
    select: (data) => {
      let filteredData = data

      if (category && category !== "All") {
        filteredData = filteredData.filter((p) => p.category === category)
      }

      if (search && search.trim()) {
        const searchLower = search.toLowerCase()
        filteredData = filteredData.filter((p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        )
      }

      return filteredData
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}

export function useProduct(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getProductForCatalog(id),
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  })
}

export function useFeaturedProducts(count: number = 4) {
  return useQuery({
    queryKey: ["featured-products", count],
    queryFn: () => productService.getProductsForCatalog(),
    select: (data) => data
      .filter(product => product.is_featured)
      .slice(0, count),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}
