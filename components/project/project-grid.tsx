"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Project } from "@/lib/types"

interface ProjectGridProps {
  projects: Project[]
  onProjectSelect?: (project: Project) => void
}

interface ProjectCardProps {
  project: Project
  onClick?: (project: Project) => void
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    onClick?.(project)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleClick()
    }
  }

  // Get a shorter tagline for each project
  const getTagline = (projectName: string) => {
    switch (projectName) {
      case "Dr. Cat Wellness":
        return "Reconnect. Restore. Heal through touch."
      case "Your Site Here":
        return "Your brand story, beautifully told."
      case "Your Brand Here":
        return "Stand out from the competition."
      case "Your Project Here":
        return "Convert visitors into customers."
      case "Your Business Here":
        return "Make those first 3 seconds count."
      case "Your Vision Here":
        return "Professional growth starts here."
      default:
        return "Custom solutions for your business."
    }
  }

  // Get a shorter subtitle for each project
  const getSubtitle = (projectName: string) => {
    switch (projectName) {
      case "Dr. Cat Wellness":
        return "Booking-Ready Site for a Wellness Clinic"
      case "Your Site Here":
        return "Custom Website Design & Development"
      case "Your Brand Here":
        return "Brand Identity & Digital Presence"
      case "Your Project Here":
        return "Full-Stack Business Solution"
      case "Your Business Here":
        return "Performance-Focused Web Design"
      case "Your Vision Here":
        return "Strategic Digital Transformation"
      default:
        return "Professional Web Design"
    }
  }

  return (
    <motion.div
      className="relative bg-stone-100 dark:bg-stone-800 contrast:bg-stone-200 rounded-lg overflow-hidden cursor-pointer group h-64 md:h-80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${project.name} project`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={project.image || "/placeholder.svg"} alt={project.name} className="w-full h-full object-cover" />
        {/* Overlay that darkens on hover */}
        <motion.div
          className="absolute inset-0 bg-black/20"
          animate={{ opacity: isHovered ? 0.7 : 0.2 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Default State Content */}
      <AnimatePresence>
        {!isHovered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-10"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white font-serif mb-2 leading-tight">{project.name}</h3>
            <p className="text-sm md:text-base text-white/90 font-sans leading-relaxed">{getSubtitle(project.name)}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover State Content */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col justify-between p-6 z-20"
          >
            {/* Top: Tags */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Middle: Tagline */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex-1 flex items-center justify-center text-center"
            >
              <p className="text-lg md:text-xl text-white font-serif italic leading-relaxed">
                {getTagline(project.name)}
              </p>
            </motion.div>

            {/* Bottom: CTA and Summary */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="space-y-3"
            >
              <p className="text-sm text-white/90 font-sans leading-tight line-clamp-2">{project.description}</p>
              <button
                className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium py-2 px-4 rounded-full border border-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                tabIndex={0}
              >
                View Project →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function ProjectGrid({ projects, onProjectSelect }: ProjectGridProps) {
  const handleProjectClick = (project: Project) => {
    onProjectSelect?.(project)
  }

  return (
    <section className="px-6 lg:px-12 py-8 bg-stone-50 dark:bg-stone-900 contrast:bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} onClick={handleProjectClick} />
          ))}
        </div>
      </div>
    </section>
  )
}
