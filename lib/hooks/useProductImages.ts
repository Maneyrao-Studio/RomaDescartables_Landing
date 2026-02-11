"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { productService } from "../services/product.service"
import { LegacyProduct } from "../types"

export function useProductImages(productId: string, enabled: boolean = true) {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ["product-with-images", productId],
    queryFn: () => productService.getProductForCatalog(productId),
    enabled: enabled && !!productId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  })

  // Update cache when data is fetched (replaces deprecated onSuccess)
  useEffect(() => {
    if (result.data?.image) {
      // Update the product in the products cache with the image
      queryClient.setQueriesData(
        { queryKey: ["products"] },
        (oldData: LegacyProduct[] | undefined) => {
          if (!oldData) return oldData
          return oldData.map((product) =>
            product.id === productId
              ? { ...product, image: result.data!.image }
              : product
          )
        }
      )
    }
  }, [result.data, productId, queryClient])

  return {
    ...result,
    imageUrl: result.data?.image || null,
    hasImage: !!result.data?.image
  }
}