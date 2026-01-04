"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Project } from "@/lib/types"
import { PlaceholderProjectVisual } from "./placeholder-project-visual"

interface ProjectCardProps {
  project: Project
  onHover?: (isHovered: boolean) => void
  onClick?: (project: Project) => void
}

export function ProjectCard({ project, onHover, onClick }: ProjectCardProps) {
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
    onClick?.(project)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleClick()
    }
  }

  // Get subtitle for each project
  const getSubtitle = (projectName: string) => {
    switch (projectName) {
      case "Dr. Cat Wellness":
        return "Booking-ready site for a wellness clinic"
      case "BrowFix":
        return "Premium brow and lash studio with online booking"
      case "Elixir1 Skincare Clinic":
        return "Premium medical aesthetics clinic website"
      case "M&A CAFE":
        return "Artisanal coffee shop with online ordering"
      case "Your New Website":
        return "" // No subtitle for placeholder
      default:
        return "Professional web design"
    }
  }

  const isPlaceholder = project.name === "Your New Website"

  return (
    <motion.div
      className={`flex-shrink-0 w-[280px] max-w-[280px] aspect-[16/9] relative overflow-hidden cursor-pointer rounded-2xl shadow-lg ${
        isPlaceholder ? "bg-card/50" : "bg-card"
      } border border-border transition-all duration-300 ease-in-out`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${project.name} project`}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Background Content */}
      {isPlaceholder ? (
        <PlaceholderProjectVisual isHovered={isHovered} />
      ) : (
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <motion.img
            src={project.image || "/placeholder.svg"}
            alt={project.name}
            className="w-full h-full object-cover object-top"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>
      )}

      {/* Hover Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 z-10 flex flex-col justify-between p-6 text-foreground rounded-2xl bg-background/95 backdrop-blur-sm"
          >
            {/* Tags - Top, one line with separators */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.05, ease: "easeInOut" }}
              className="text-left"
            >
              <p className="text-xs text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">
                {project.tags.slice(0, 3).join(" • ")}
              </p>
            </motion.div>

            {/* Bottom Content: Title/Description (left) and CTA (right) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15, ease: "easeInOut" }}
              className="flex justify-between items-end"
            >
              {/* Title and Description - Bottom left */}
              <div className="text-left flex-1 pr-4">
                <h3 className="text-base font-semibold leading-tight">{project.name}</h3>
                {getSubtitle(project.name) && (
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{getSubtitle(project.name)}</p>
                )}
              </div>

              {/* CTA Button - Bottom right, smaller */}
              <div className="flex-shrink-0">
                <button
                  className="border border-primary text-primary text-xs px-3 py-1.5 rounded-md hover:bg-primary hover:text-primary-foreground transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClick()
                  }}
                >
                  {project.name === "Your New Website" ? "Let's Talk →" : "View →"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
