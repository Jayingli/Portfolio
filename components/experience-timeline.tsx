"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown, ExternalLink, Calendar, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"
import type { CardData } from "@/data/portfolio-data"
import { getTagPrefix, tagPrefixes } from "@/lib/tag-utils"

interface ExperienceTimelineProps {
  experiences: CardData[]
  className?: string
}

export function ExperienceTimeline({ experiences, className }: ExperienceTimelineProps) {
  // Sort experiences by date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const getEndYear = (dateStr?: string) => {
      if (!dateStr) return 0
      const match = dateStr.match(/(\d{4})(?!.*\d{4})/)
      return match ? Number.parseInt(match[1]) : 0
    }
    return getEndYear(b.dates) - getEndYear(a.dates)
  })

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative">
        {/* Main timeline line - positioned on the left */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20 dark:bg-primary/10" />

        {/* Timeline items */}
        <div className="space-y-6">
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

  // Format date range in a clean, consistent way
  const formatDateRange = (dateStr?: string) => {
    if (!dateStr) return ""

    // Parse the date string (format like "Aug 2023 – Feb 2024")
    const parts = dateStr.split("–").map((part) => part.trim())

    // Extract years from each part
    const getYear = (part: string) => {
      const match = part.match(/\d{4}/)
      return match ? match[0] : ""
    }

    const startYear = parts[0] ? getYear(parts[0]) : ""
    const endYear = parts.length > 1 ? (parts[1].includes("Present") ? "Now" : getYear(parts[1])) : ""

    if (!startYear) return ""
    if (!endYear || startYear === endYear) return startYear
    return `${startYear}–${endYear}`
  }

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

  // Split description into bullet points
  const bulletPoints = experience.description
    .split("\n\n")
    .filter((point) => point.trim().length > 0)
    .map((point) => point.trim())

  // Check if this is the XLMedia logo
  const isXLMedia = experience.imageUrl?.includes("xlmedia-logo.png")

  return (
    <motion.div
      ref={ref}
      className="relative pl-12"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute left-3 top-6 w-3 h-3 rounded-full bg-primary z-10 border-2 border-background dark:border-[#121212]"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
      />

      {/* Content card */}
      <div className="bg-card border dark:border-white/10 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
        {/* Header with logo and title */}
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
            <h3 className="font-bold text-base">{experience.title}</h3>
            <p className="text-sm text-muted-foreground">{experience.subtitle}</p>

            {/* Date information inside the card */}
            {experience.dates && (
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{formatDateRange(experience.dates)}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{getDuration(experience.dates)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Location (extracted from subtitle) */}
        {experience.subtitle.includes(",") && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
            <MapPin className="h-3 w-3" />
            <span>{experience.subtitle.split(",")[1].trim()}</span>
          </div>
        )}

        {/* Preview of responsibilities */}
        <div className="mb-2">
          <AnimatePresence initial={false}>
            <motion.div
              className="text-sm space-y-2"
              initial={false}
              animate={{
                height: isExpanded ? "auto" : "2.5rem",
                overflow: isExpanded ? "visible" : "hidden",
              }}
              transition={{ duration: 0.3 }}
            >
              <p className={cn("line-clamp-2", isExpanded ? "line-clamp-none" : "")}>{bulletPoints[0]}</p>

              {isExpanded &&
                bulletPoints.slice(1).map((point, i) => (
                  <p key={i} className="mt-2">
                    {point}
                  </p>
                ))}
            </motion.div>
          </AnimatePresence>

          {bulletPoints.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-1 text-xs w-full flex items-center justify-center gap-1 h-7"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show Less" : "Show More"}
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="h-3 w-3" />
              </motion.div>
            </Button>
          )}
        </div>

        {/* Tags */}
        {experience.tags && experience.tags.length > 0 && (
          <div className="pt-2 border-t border-border/30">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {experience.tags.slice(0, isExpanded ? experience.tags.length : 3).map((tag) => {
                const prefix = getTagPrefix(tag)
                return (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={cn("text-xs px-2 py-0.5 rounded-full", tagPrefixes[prefix])}
                  >
                    {tag}
                  </Badge>
                )
              })}

              {!isExpanded && experience.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5 rounded-full">
                  +{experience.tags.length - 3} more
                </Badge>
              )}
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
