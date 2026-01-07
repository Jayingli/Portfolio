"use client"

import { useState, useRef, useEffect } from "react"
import type { CardData } from "@/data/portfolio-data"
import { SkillCarousel } from "./skills/skill-carousel"
import { SkillDetails } from "./skills/skill-details"

interface ChatSkillsSectionProps {
  skills: CardData[]
}

export function ChatSkillsSection({ skills }: ChatSkillsSectionProps) {
  const [selectedSkill, setSelectedSkill] = useState<CardData | null>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedSkill && detailsRef.current) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }, [selectedSkill])

  return (
    <div className="space-y-6 overflow-visible">
      {!selectedSkill && <SkillCarousel skills={skills} onSkillClick={setSelectedSkill} />}

      {selectedSkill && (
        <div ref={detailsRef} className="scroll-mt-4">
          <SkillDetails skill={selectedSkill} onClose={() => setSelectedSkill(null)} />

          <div className="mt-12 mb-6 space-y-6">
            <p className="text-center text-sm text-muted-foreground">Explore more of my skills</p>
            <SkillCarousel skills={skills.filter((s) => s.id !== selectedSkill.id)} onSkillClick={setSelectedSkill} />
          </div>
        </div>
      )}
    </div>
  )
}
