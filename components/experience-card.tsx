"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import type { CardData } from "@/data/portfolio-data"

interface ExperienceCardProps {
  experience: CardData
  className?: string
}

// Tag prefix types and their colors
const tagPrefixes = {
  "Role:": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "Tool:": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "Focus:": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "Skill:": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "Tech:": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
} as const

type TagPrefix = keyof typeof tagPrefixes

// Function to determine tag prefix based on tag content
function getTagPrefix(tag: string): TagPrefix {
  if (
    tag.includes("Manager") ||
    tag.includes("Owner") ||
    tag.includes("Lead") ||
    tag.includes("Agile") ||
    tag.includes("Scrum")
  ) {
    return "Role:"
  }
  if (
    tag.includes("Jira") ||
    tag.includes("Asana") ||
    tag.includes("Monday") ||
    tag.includes("GTM") ||
    tag.includes("GA4")
  ) {
    return "Tool:"
  }
  if (tag.includes("Stakeholder") || tag.includes("Documentation") || tag.includes("Planning") || tag.includes("SOW")) {
    return "Focus:"
  }
  if (tag.includes("SQL") || tag.includes("API") || tag.includes("REST") || tag.includes("NoSQL")) {
    return "Tech:"
  }
  return "Skill:"
}

export function ExperienceCard({ experience, className }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Split description into bullet points
  const bulletPoints = experience.description
    .split("\n\n")
    .filter((point) => point.trim().length > 0)
    .map((point) => point.trim())

  // Get preview and remaining bullet points
  const previewBullets = bulletPoints.slice(0, 2)
  const remainingBullets = bulletPoints.slice(2)
  const hasMoreContent = remainingBullets.length > 0

  // Check if this is the XLMedia logo (which has a different aspect ratio)
  const isXLMedia = experience.imageUrl?.includes("xlmedia-logo.png")

  return (
    <motion.div
      className={cn(
        "flex-shrink-0 w-full max-w-[360px] rounded-xl overflow-hidden",
        "bg-white dark:bg-[#1e1e1e]",
        "border dark:border-white/10",
        "transition-all duration-300",
        isHovered ? "shadow-lg" : "shadow-sm",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="p-4">
        {/* Top section with logo and title */}
        <div className="flex items-start gap-3 mb-3">
          {experience.imageUrl ? (
            <div
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-md overflow-hidden",
                isXLMedia ? "bg-white p-0.5" : "",
              )}
            >
              <Image
                src={experience.imageUrl || "/placeholder.svg"}
                alt={`${experience.title} logo`}
                width={40}
                height={40}
                className="object-contain max-h-10 max-w-10"
              />
            </div>
          ) : (
            <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-md">
              <span className="text-primary font-bold text-lg">{experience.title.charAt(0)}</span>
            </div>
          )}

          <div className="flex-1">
            <h3 className="font-bold text-base line-clamp-1">{experience.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{experience.subtitle}</p>
            {experience.dates && <p className="text-xs text-muted-foreground italic mt-0.5">{experience.dates}</p>}
          </div>
        </div>

        {/* Middle section with bullet points */}
        <div className="mb-4">
          <ul className="space-y-2 text-sm">
            {previewBullets.map((bullet, index) => (
              <li key={`preview-${index}`} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Expandable content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.ul
                className="space-y-2 text-sm mt-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {remainingBullets.map((bullet, index) => (
                  <li key={`expanded-${index}`} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* View more/less button */}
          {hasMoreContent && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-xs w-full flex items-center justify-center gap-1 h-7"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "View Less" : "View More"}
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="h-3 w-3" />
              </motion.div>
            </Button>
          )}
        </div>

        {/* Bottom section with tags */}
        {experience.tags && experience.tags.length > 0 && (
          <div className="pt-2 border-t border-border/30">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {experience.tags.map((tag) => {
                const prefix = getTagPrefix(tag)
                return (
                  <div key={tag} className={cn("text-xs px-2 py-0.5 rounded-full", tagPrefixes[prefix])}>
                    <span className="font-medium">{prefix}</span> {tag.replace(prefix, "")}
                  </div>
                )
              })}
            </div>

            {/* External link button if available */}
            {experience.link && (
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs mt-2 flex items-center justify-center gap-1"
                asChild
              >
                <a href={experience.link} target="_blank" rel="noopener noreferrer">
                  View Project <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
