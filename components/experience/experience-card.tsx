"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import type { CardData } from "@/data/portfolio-data"

interface ExperienceCardProps {
  experience: CardData
  onHover?: (isHovered: boolean) => void
  onClick?: (experience: CardData) => void
}

export function ExperienceCard({ experience, onHover, onClick }: ExperienceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover?.(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onHover?.(false)
  }

  const handleClick = () => {
    onClick?.(experience)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleClick()
    }
  }

  // Get company name from subtitle
  const companyName = experience.subtitle.split(",")[0].trim()

  return (
    <motion.div
      className="flex-shrink-0 w-[260px] max-w-[260px] relative overflow-hidden cursor-pointer rounded-xl shadow-md bg-card border border-border transition-all duration-300 ease-in-out"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${experience.title} experience`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center gap-3 p-3">
        {/* Logo on left */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden">
          {experience.imageUrl ? (
            <motion.img
              src={experience.imageUrl}
              alt={`${companyName} logo`}
              className="w-10 h-10 object-contain"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          ) : (
            <span className="text-lg font-bold text-muted-foreground/50">{companyName.charAt(0)}</span>
          )}
        </div>

        {/* Text on right */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-foreground truncate leading-tight">{experience.title}</h3>
          <p className="text-xs text-muted-foreground truncate mt-0.5">{companyName}</p>
          <p className="text-[10px] text-muted-foreground/70 truncate mt-0.5">{experience.dates}</p>
        </div>

        {/* Arrow indicator */}
        <motion.div
          className="flex-shrink-0 text-muted-foreground"
          animate={{ x: isHovered ? 2 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}
