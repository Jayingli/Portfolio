"use client"

import type { CardData } from "@/data/portfolio-data"
import { CertificationCard } from "./certification-card"
import { useEffect, useRef } from "react"

interface CertificationCarouselProps {
  certifications: CardData[]
  onCertificationClick: (certification: CardData) => void
}

export function CertificationCarousel({ certifications, onCertificationClick }: CertificationCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollAmount = 0
    const scrollSpeed = 0.5

    const scroll = () => {
      scrollAmount += scrollSpeed
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollAmount
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0
        }
      }
    }

    const intervalId = setInterval(scroll, 30)
    return () => clearInterval(intervalId)
  }, [])

  const tripleCertifications = [...certifications, ...certifications, ...certifications]

  return (
    <div className="relative w-full bg-background py-6">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4"
        style={{ scrollBehavior: "auto" }}
      >
        {tripleCertifications.map((certification, index) => (
          <CertificationCard
            key={`${certification.id}-${index}`}
            certification={certification}
            onClick={() => onCertificationClick(certification)}
          />
        ))}
      </div>
    </div>
  )
}
