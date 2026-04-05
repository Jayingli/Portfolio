"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CardCarousel } from "./card-carousel"
import { CareerTimeline } from "./career-timeline"
import { ExperienceViewToggle } from "./experience-view-toggle"
import type { CardData } from "@/data/portfolio-data"

interface ChatExperienceSectionProps {
  experiences: CardData[]
  className?: string
}

export function ChatExperienceSection({ experiences, className }: ChatExperienceSectionProps) {
  const [currentView, setCurrentView] = useState<"carousel" | "timeline">("carousel")

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <ExperienceViewToggle currentView={currentView} onViewChange={setCurrentView} className="mb-4" />

      {currentView === "carousel" ? (
        <CardCarousel
          cards={experiences}
          onCardClick={(card) => window.dispatchEvent(new CustomEvent("cardClick", { detail: card }))}
        />
      ) : (
        <CareerTimeline experiences={experiences} />
      )}
    </motion.div>
  )
}
