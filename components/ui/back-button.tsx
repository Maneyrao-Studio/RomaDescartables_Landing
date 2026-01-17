"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface BackButtonProps {
  href: string
  text?: string
  className?: string
}

export default function BackButton({ href, text = "Volver", className }: BackButtonProps) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-semibold", className)}
    >
      <ArrowLeft className="w-5 h-5" />
      {text}
    </Link>
  )
}