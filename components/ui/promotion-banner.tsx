"use client"

export default function PromotionBanner() {
  const bannerText = "10% en efectivo por sucursal";
  const repetitions = 12;

  return (
    <div className="w-full bg-accent overflow-hidden">
      <div className="animate-scroll-text flex whitespace-nowrap">
        {Array.from({ length: repetitions }, (_, index) => (
          <span key={index} className="text-primary font-bold text-lg px-8">
            {bannerText}
          </span>
        ))}
      </div>
    </div>
  )
}