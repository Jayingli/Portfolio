"use client"

import type { CardData } from "@/data/portfolio-data"
import { SkillCard } from "./skill-card"
import { useEffect, useRef } from "react"

interface SkillCarouselProps {
  skills: CardData[]
  onSkillClick: (skill: CardData) => void
}

export function SkillCarousel({ skills, onSkillClick }: SkillCarouselProps) {
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

  const tripleSkills = [...skills, ...skills, ...skills]

  return (
    <div className="relative w-full bg-background py-8 overflow-y-visible">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto overflow-y-visible scrollbar-hide px-4"
        style={{ scrollBehavior: "auto" }}
      >
        {tripleSkills.map((skill, index) => (
          <SkillCard key={`${skill.id}-${index}`} skill={skill} onClick={() => onSkillClick(skill)} />
        ))}
      </div>
    </div>
  )
}
