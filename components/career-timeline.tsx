"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown, ExternalLink, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import type { CardData } from "@/data/portfolio-data"

interface CareerTimelineProps {
  experiences: CardData[]
  className?: string
}

export function CareerTimeline({ experiences, className }: CareerTimelineProps) {
  // Sort experiences by date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    // Extract years from dates (assuming format like "Aug 2023 – Feb 2024")
    const getEndYear = (dateStr?: string) => {
      if (!dateStr) return 0
      const match = dateStr.match(/(\d{4})(?!.*\d{4})/) // Get the last 4-digit number (year)
      return match ? Number.parseInt(match[1]) : 0
    }

    return getEndYear(b.dates) - getEndYear(a.dates)
  })

  return (
    <div className={cn("w-full py-4", className)}>
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        Career Progression
      </h3>

      <div className="relative">
        {/* Main timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20 dark:bg-primary/10" />

        {/* Timeline items */}
        <div className="space-y-20">
          {sortedExperiences.map((experience, index) => (
            <TimelineItem
              key={experience.id}
              experience={experience}
              index={index}
              isLast={index === sortedExperiences.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface TimelineItemProps {
  experience: CardData
  index: number
  isLast: boolean
}

function TimelineItem({ experience, index, isLast }: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Extract year range from dates
  const getYearRange = (dateStr?: string) => {
    if (!dateStr) return ""

    // Parse the date string (format like "Aug 2023 – Feb 2024" or "Mar 2024 – Present")
    const parts = dateStr.split("–").map((part) => part.trim())

    // Handle current position with "Present"
    if (parts.length > 0 && parts[parts.length - 1].includes("Present")) {
      const startPart = parts[0]
      const startParts = startPart.split(" ")
      if (startParts.length >= 2) {
        const startMonth = startParts[0]
        const startYear = startParts[1]
        return `${startYear} - Present`
      }
    }

    // Handle positions with specific start and end dates
    if (parts.length === 2) {
      const startParts = parts[0].split(" ")
      const endParts = parts[1].split(" ")

      if (startParts.length >= 2 && endParts.length >= 2) {
        const startMonth = startParts[0]
        const startYear = startParts[1]
        const endMonth = endParts[0]
        const endYear = endParts[1]

        // For positions within the same year, show the months
        if (startYear === endYear) {
          return `${startMonth} - ${endMonth} ${startYear}`
        }

        // For positions spanning multiple years
        return `${startYear} - ${endYear}`
      }
    }

    // Fallback to extracting any years found
    const years = dateStr.match(/\d{4}/g) // Extract all 4-digit numbers (years)
    if (!years) return ""
    if (years.length === 1) return years[0]
    return `${years[0]} - ${years[years.length - 1]}`
  }

  // Split description into bullet points
  const bulletPoints = experience.description
    .split("\n\n")
    .filter((point) => point.trim().length > 0)
    .map((point) => point.trim())

  // Check if this is the XLMedia logo (which has a different aspect ratio)
  const isXLMedia = experience.imageUrl?.includes("xlmedia-logo.png")

  // Calculate duration
  const getDuration = (dateStr?: string) => {
    if (!dateStr) return ""

    // Check if it contains "Present"
    if (dateStr.includes("Present")) {
      const startDate = dateStr.split("–")[0].trim()
      const [startMonth, startYear] = startDate.split(" ")

      // Calculate months between start date and now
      const start = new Date(`${startMonth} 1, ${startYear}`)
      const now = new Date()

      const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth())
      const years = Math.floor(months / 12)
      const remainingMonths = months % 12

      if (years > 0 && remainingMonths > 0) {
        return `${years}y ${remainingMonths}m`
      } else if (years > 0) {
        return `${years}y`
      } else {
        return `${remainingMonths}m`
      }
    }

    // For past positions, extract from date range
    const [startDate, endDate] = dateStr.split("–").map((d) => d.trim())
    if (!startDate || !endDate) return ""

    const startParts = startDate.split(" ")
    const endParts = endDate.split(" ")

    if (startParts.length < 2 || endParts.length < 2) return ""

    const startMonth = startParts[0]
    const startYear = startParts[1]
    const endMonth = endParts[0]
    const endYear = endParts[1]

    try {
      const start = new Date(`${startMonth} 1, ${startYear}`)
      const end = new Date(`${endMonth} 1, ${endYear}`)

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return ""
      }

      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
      const years = Math.floor(months / 12)
      const remainingMonths = months % 12

      if (years > 0 && remainingMonths > 0) {
        return `${years}y ${remainingMonths}m`
      } else if (years > 0) {
        return `${years}y`
      } else {
        return `${remainingMonths}m`
      }
    } catch (e) {
      return ""
    }
  }

  return (
    <motion.div
      ref={ref}
      className="relative pl-12 pt-10"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute left-3 top-12 w-4 h-4 rounded-full bg-primary z-10 border-2 border-background dark:border-[#121212]"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
      />

      {/* Year label - positioned above */}
      <div className="absolute left-12 top-[-4px] text-sm font-medium text-primary bg-background dark:bg-[#121212] px-3 py-1 rounded border border-primary/20 z-10 whitespace-nowrap">
        {getYearRange(experience.dates)}
      </div>

      {/* Content card */}
      <div className="bg-card border dark:border-white/10 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 w-full max-w-5xl">
        {/* Header with logo and title */}
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5 mb-6 relative">
          {/* Logo section */}
          {experience.imageUrl ? (
            <div
              className={cn(
                "w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-md overflow-hidden mb-2 md:mb-0",
                isXLMedia ? "bg-white p-0.5" : "",
              )}
            >
              <Image
                src={experience.imageUrl || "/placeholder.svg"}
                alt={`${experience.title} logo`}
                width={64}
                height={64}
                className="object-contain max-h-16 max-w-16"
              />
            </div>
          ) : (
            <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-md">
              <span className="text-primary font-bold text-2xl">{experience.title.charAt(0)}</span>
            </div>
          )}

          {/* Text content */}
          <div className="flex-1 w-full relative pt-2 md:pt-0">
            {/* Duration badge - positioned at top right */}
            {experience.dates && (
              <div className="absolute top-0 right-0">
                <span className="inline-block px-3 py-1 bg-muted/50 rounded-full text-sm text-muted-foreground font-medium">
                  {getDuration(experience.dates)}
                </span>
              </div>
            )}

            {/* Title and company */}
            <h3 className="font-bold text-xl mb-1.5">{experience.title}</h3>
            <p className="text-base font-medium text-foreground/80">{experience.subtitle.split(",")[0]}</p>

            {/* Location with icon */}
            {experience.subtitle.includes(",") && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
                <MapPin className="h-4 w-4" />
                <span>{experience.subtitle.split(",")[1].trim()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Location (extracted from subtitle) */}
        {/*{experience.subtitle.includes(",") && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
            <MapPin className="h-4 w-4" />
            <span>{experience.subtitle.split(",")[1].trim()}</span>
          </div>
        )}*/}

        {/* Preview of responsibilities */}
        <div className="mb-5">
          <AnimatePresence initial={false}>
            <motion.div
              className="text-base space-y-4"
              initial={false}
              animate={{ height: isExpanded ? "auto" : "4.5rem", overflow: isExpanded ? "visible" : "hidden" }}
              transition={{ duration: 0.3 }}
            >
              <p className={cn("line-clamp-3", isExpanded ? "line-clamp-none" : "")}>{bulletPoints[0]}</p>

              {isExpanded &&
                bulletPoints.slice(1).map((point, i) => (
                  <p key={i} className="mt-4">
                    {point}
                  </p>
                ))}
            </motion.div>
          </AnimatePresence>

          {bulletPoints.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 text-sm w-full flex items-center justify-center gap-2 h-10"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show Less" : "Show More"}
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </Button>
          )}
        </div>

        {/* Tags */}
        {experience.tags && experience.tags.length > 0 && (
          <div className="pt-4 border-t border-border/30">
            <div className="flex flex-wrap gap-2.5 mt-3">
              {experience.tags.slice(0, isExpanded ? experience.tags.length : 8).map((tag) => (
                <div key={tag} className="text-sm px-3 py-1.5 rounded-full bg-muted/50 text-muted-foreground">
                  {tag}
                </div>
              ))}

              {!isExpanded && experience.tags.length > 8 && (
                <div className="text-sm px-3 py-1.5 rounded-full bg-muted/50 text-muted-foreground">
                  +{experience.tags.length - 8} more
                </div>
              )}
            </div>

            {/* External link button if available */}
            {experience.link && (
              <Button
                variant="outline"
                size="default"
                className="w-full text-sm mt-4 flex items-center justify-center gap-2"
                asChild
              >
                <a href={experience.link} target="_blank" rel="noopener noreferrer">
                  View Project <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
