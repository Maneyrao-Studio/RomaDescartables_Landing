"use client"

import { useQuery } from "@tanstack/react-query"
import { productService } from "../services/product.service"

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const products = await productService.getProductsForCatalog()
      const categories = new Set(products.map((p) => p.category))
      return ["All", ...Array.from(categories).sort()]
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  })
}