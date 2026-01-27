"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { useParams } from "next/navigation"
import PageLayout from "@/components/ui/page-layout"
import ProductDetail from "@/components/product-detail"
import { useProduct } from "@/lib/hooks/useProducts"

export default function ProductPage() {
  const params = useParams()
  const id = params.id as string
  
  const { data: product, isLoading, error } = useProduct(id)

  if (isLoading) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4"></div>
            <div className="h-8 bg-gray-200 rounded mb-2 w-64 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
          </div>
        </div>
      </PageLayout>
    )
  }

  if (error || !product) {
    notFound()
  }

  return (
    <PageLayout>
      <ProductDetail product={product} />
    </PageLayout>
  )
}