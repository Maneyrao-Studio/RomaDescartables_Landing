import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  isText?: boolean
}

export default function Logo({ className, isText = true }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 hover:opacity-80 transition-opacity", className)}>
      <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
        <img src='/RomaDescartable_LOGO.jpg' className="w-10 h-10 text-primary" />
      </div>
      { isText && <div className="hidden sm:block">
        <div className="font-bold text-sm leading-none text-primary">ROMA</div>
        <div className="font-bold text-xs text-accent">DESCARTABLES</div>
      </div>}
    </Link>
  )
}