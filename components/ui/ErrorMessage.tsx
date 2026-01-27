"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorMessageProps {
  error: Error | unknown
  onRetry?: () => void
  title?: string
  description?: string
}

export default function ErrorMessage({ 
  error, 
  onRetry, 
  title = "Error al cargar los datos",
  description 
}: ErrorMessageProps) {
  const errorMessage = error instanceof Error ? error.message : "Error desconocido"
  const finalDescription = description || errorMessage || "No pudimos cargar la información. Por favor, intenta nuevamente."

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      
      <p className="text-muted-foreground mb-6 max-w-md">
        {finalDescription}
      </p>
      
      {onRetry && (
        <Button 
          onClick={onRetry} 
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Reintentar
        </Button>
      )}
    </div>
  )
}