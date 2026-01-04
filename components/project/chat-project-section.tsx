"use client"

import { useState } from "react"
import { ProjectCarousel } from "./project-carousel"
import { ProjectPanel } from "./project-panel"
import { ProjectDetailsPanel } from "./project-details-panel"
import type { Project } from "@/lib/types"
import { AnimatePresence, motion } from "framer-motion"

interface ChatProjectSectionProps {
  projects: Project[]
}

export function ChatProjectSection({ projects }: ChatProjectSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
  }

  const handleClose = () => {
    setSelectedProject(null)
  }

  return (
    <div className="space-y-6">
      {/* Carousel */}
      <AnimatePresence mode="wait">
        {!selectedProject && (
          <motion.div
            key="carousel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectCarousel projects={projects} onProjectSelect={handleProjectSelect} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Project Panel */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 px-6"
          >
            <ProjectPanel project={selectedProject} onClose={handleClose} />
            <ProjectDetailsPanel project={selectedProject} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
