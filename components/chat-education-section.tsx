"use client"

import { useState, useRef, useEffect } from "react"
import type { CardData } from "@/data/portfolio-data"
import { EducationCarousel } from "./education/education-carousel"
import { EducationDetails } from "./education/education-details"

interface ChatEducationSectionProps {
  education: CardData[]
}

export function ChatEducationSection({ education }: ChatEducationSectionProps) {
  const [selectedEducation, setSelectedEducation] = useState<CardData | null>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedEducation && detailsRef.current) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }, [selectedEducation])

  return (
    <div className="space-y-6">
      {!selectedEducation && <EducationCarousel education={education} onEducationClick={setSelectedEducation} />}

      {selectedEducation && (
        <div ref={detailsRef} className="scroll-mt-4">
          <EducationDetails education={selectedEducation} onClose={() => setSelectedEducation(null)} />

          <div className="mt-8 space-y-4">
            <p className="text-center text-sm text-muted-foreground">Explore more of my education</p>
            <EducationCarousel
              education={education.filter((e) => e.id !== selectedEducation.id)}
              onEducationClick={setSelectedEducation}
            />
          </div>
        </div>
      )}
    </div>
  )
}
