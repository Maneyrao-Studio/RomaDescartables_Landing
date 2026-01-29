"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroCarouselProps {
  images: Array<{
    src: string
    alt: string
    title?: string
    description?: string
    isVideo?: boolean
  }>
}

export default function HeroCarousel({ images }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set())
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const currentSlide = images[currentIndex]
    if (currentSlide?.isVideo && !loadedVideos.has(currentIndex)) {
      setLoadedVideos(prev => new Set(prev).add(currentIndex))
    }
  }, [currentIndex, images, loadedVideos])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) 

    return () => clearInterval(interval)
  }, [images.length])

  // Pause inactive videos and play active video
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play().catch(() => {
            // Ignore autoplay errors
          })
        } else {
          video.pause()
        }
      }
    })
  }, [currentIndex])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {image.isVideo ? (
              <video
                src={image.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            )}
            {/* Overlay content */}
            {(image.title || image.description) && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white px-6">
                  {image.title && (
                    <h3 className="text-5xl md:text-6xl font-bold mb-2">{image.title}</h3>
                  )}
                  {image.description && (
                    <p className="text-lg md:text-xl opacity-90">{image.description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="secondary"
        size="sm"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-2 h-10 w-10"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="secondary"
        size="sm"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-2 h-10 w-10"
        onClick={goToNext}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}