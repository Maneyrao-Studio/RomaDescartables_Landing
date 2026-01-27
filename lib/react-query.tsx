"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import React from "react"

// Create a client with optimized defaults for e-commerce
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5 minutes for product data (good balance between freshness and performance)
      staleTime: 5 * 60 * 1000,
      // Retry failed requests up to 2 times
      retry: 2,
      // Don't refetch on window focus (better UX for e-commerce)
      refetchOnWindowFocus: false,
      // Refetch on reconnect to ensure fresh data
      refetchOnReconnect: true,
      // Use exponential backoff for retries
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
      // Don't retry mutations on error by default (easier to handle)
      retryDelay: 1000,
    },
  },
})

interface QueryProviderProps {
  children: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools 
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      )}
    </QueryClientProvider>
  )
}

// Export the client for direct access if needed
export { queryClient }