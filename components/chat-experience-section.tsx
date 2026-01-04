"use client"

import { useState, useRef } from "react"
import { ExperienceCarousel } from "./experience/experience-carousel"
import { ExperiencePanel } from "./experience/experience-panel"
import { ExperienceDetailsPanel } from "./experience/experience-details-panel"
import type { CardData } from "@/data/portfolio-data"
import { AnimatePresence, motion } from "framer-motion"

interface ChatExperienceSectionProps {
  experiences: CardData[]
}

export function ChatExperienceSection({ experiences }: ChatExperienceSectionProps) {
  const [selectedExperience, setSelectedExperience] = useState<CardData | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const handleExperienceSelect = (experience: CardData) => {
    setSelectedExperience(experience)
    setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const handleClose = () => {
    setSelectedExperience(null)
  }

  const otherExperiences = selectedExperience
    ? experiences.filter((exp) => exp.title !== selectedExperience.title)
    : experiences

  return (
    <div className="space-y-4 overflow-visible">
      {/* Carousel - hides when experience is selected */}
      <AnimatePresence mode="wait">
        {!selectedExperience && (
          <motion.div
            key="carousel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="overflow-visible"
          >
            <ExperienceCarousel experiences={experiences} onExperienceSelect={handleExperienceSelect} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Experience Panel - shows inline like projects */}
      <AnimatePresence mode="wait">
        {selectedExperience && (
          <motion.div
            key="panel"
            ref={panelRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 px-6 scroll-mt-4"
          >
            <ExperiencePanel experience={selectedExperience} onClose={handleClose} />
            <ExperienceDetailsPanel experience={selectedExperience} />

            {otherExperiences.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="pt-4 space-y-3"
              >
                <p className="text-sm text-muted-foreground px-1">Explore more of my experience</p>
                <ExperienceCarousel experiences={otherExperiences} onExperienceSelect={handleExperienceSelect} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
