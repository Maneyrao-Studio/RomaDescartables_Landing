"use client"

import { useState, useEffect, useRef } from "react"

export function useIntersectionObserver(
  enabled: boolean = true,
  rootMargin: string = "50px"
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasBeenIntersected, setHasBeenIntersected] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled || hasBeenIntersected) return

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          setHasBeenIntersected(true)
        }
      },
      { rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [enabled, hasBeenIntersected, rootMargin])

  return {
    ref,
    isIntersecting,
    hasBeenIntersected
  }
}