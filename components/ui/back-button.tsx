"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link as TransitionLink } from "next-view-transitions"

interface BackButtonProps {
  href: string
  text?: string
  className?: string
}

export default function BackButton({ href, text = "Volver", className }: BackButtonProps) {
  return (
    <TransitionLink
      href={href}
      className={cn("inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-semibold", className)}
    >
      <ArrowLeft className="w-5 h-5" />
      {text}
    </TransitionLink>
  )
}