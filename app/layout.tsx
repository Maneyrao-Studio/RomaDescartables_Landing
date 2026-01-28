import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/context/cart-context"
import { QueryProvider } from "@/lib/react-query"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Distribuidora Roma Descartables",
  description: "Tienda online de papelería y descartables. Venta por mayor y menor.",
  icons: {
    icon: [
      {
        url: "/RomaDescartable_LOGO.png",
        sizes: "32x32",
        type: "image/jpeg",
      },
      {
        url: "/RomaDescartable_LOGO.png",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        url: "/RomaDescartable_LOGO.png",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
    shortcut: "/RomaDescartable_LOGO.png",
    apple: [
      {
        url: "/RomaDescartable_LOGO.png",
        sizes: "180x180",
        type: "image/jpeg",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        <QueryProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </QueryProvider>
        <Analytics />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
