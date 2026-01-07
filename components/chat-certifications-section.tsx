"use client"

import { useState, useRef, useEffect } from "react"
import type { CardData } from "@/data/portfolio-data"
import { CertificationCarousel } from "./certifications/certification-carousel"
import { CertificationDetails } from "./certifications/certification-details"

interface ChatCertificationsSectionProps {
  certifications: CardData[]
}

export function ChatCertificationsSection({ certifications }: ChatCertificationsSectionProps) {
  const [selectedCertification, setSelectedCertification] = useState<CardData | null>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedCertification && detailsRef.current) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }, [selectedCertification])

  return (
    <div className="space-y-6">
      {!selectedCertification && (
        <CertificationCarousel certifications={certifications} onCertificationClick={setSelectedCertification} />
      )}

      {selectedCertification && (
        <div ref={detailsRef} className="scroll-mt-4">
          <CertificationDetails certification={selectedCertification} onClose={() => setSelectedCertification(null)} />

          <div className="mt-8 space-y-4">
            <p className="text-center text-sm text-muted-foreground">View more certifications</p>
            <CertificationCarousel
              certifications={certifications.filter((c) => c.id !== selectedCertification.id)}
              onCertificationClick={setSelectedCertification}
            />
          </div>
        </div>
      )}
    </div>
  )
}
