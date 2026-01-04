"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import type { Project } from "@/lib/types"

interface ProjectPanelProps {
  project: Project
  onClose: () => void
}

export function ProjectPanel({ project, onClose }: ProjectPanelProps) {
  // Get the appropriate project detail image
  const getProjectDetailImage = (projectName: string) => {
    switch (projectName) {
      case "Dr. Cat Wellness":
        return "/images/dr-cat-wellness-project.svg"
      case "BrowFix":
        return "/images/browfix-combined-mockup.png"
      case "Elixir1 Skincare Clinic":
        return "/images/elixir1-project-detail.svg"
      default:
        return project.image
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6 md:space-y-8"
    >
      {/* Project Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-serif leading-none whitespace-nowrap overflow-hidden text-ellipsis">
            {project.name}
          </h1>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 overflow-hidden">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-muted text-muted-foreground text-sm font-sans rounded-full whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Project Image */}
      <div
        className={`relative overflow-hidden rounded-lg ${
          project.name === "Elixir1 Skincare Clinic" ? "bg-white dark:bg-white contrast:bg-white" : "bg-card"
        }`}
      >
        <motion.img
          src={getProjectDetailImage(project.name)}
          alt={project.name}
          className="w-full h-auto max-h-96 object-contain"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Project Description */}
      <div className="space-y-4">
        <p className="text-base sm:text-lg text-foreground leading-relaxed font-sans">{project.description}</p>

        {/* External Link */}
        {project.url && (
          <div className="pt-2">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors group"
            >
              View Live Site
              <ExternalLink
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </div>
        )}
      </div>
    </motion.div>
  )
}
