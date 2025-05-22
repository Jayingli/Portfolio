"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ChevronDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"
import type { CardData } from "@/data/portfolio-data"
import { useMobile } from "@/hooks/use-mobile"
import { getTagPrefix, tagPrefixes } from "@/lib/tag-utils"

interface ExperienceCardsProps {
  experiences: CardData[]
  className?: string
}

export function ExperienceCards({ experiences, className }: ExperienceCardsProps) {
  const { isMobile, isTablet } = useMobile()
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())
  const carouselRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

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

  // Calculate card width and gap for scrolling
  const cardWidth = isMobile ? 360 : isTablet ? 500 : 640
  const cardGap = 32
  const scrollAmount = cardWidth + cardGap

  // Handle scroll navigation
  const handleScroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return

    const currentScroll = carouselRef.current.scrollLeft
    const maxScrollValue = carouselRef.current.scrollWidth - carouselRef.current.clientWidth

    setMaxScroll(maxScrollValue)

    if (direction === "left") {
      carouselRef.current.scrollTo({
        left: Math.max(0, currentScroll - scrollAmount),
        behavior: "smooth",
      })
      setActiveIndex(Math.max(0, activeIndex - 1))
    } else {
      carouselRef.current.scrollTo({
        left: Math.min(maxScrollValue, currentScroll + scrollAmount),
        behavior: "smooth",
      })
      setActiveIndex(Math.min(sortedExperiences.length - 1, activeIndex + 1))
    }
  }

  // Update scroll position for button visibility
  const handleScrollUpdate = () => {
    if (!carouselRef.current) return
    setScrollPosition(carouselRef.current.scrollLeft)
    setMaxScroll(carouselRef.current.scrollWidth - carouselRef.current.clientWidth)

    // Update active index based on scroll position
    if (carouselRef.current && scrollAmount > 0) {
      const newIndex = Math.round(carouselRef.current.scrollLeft / scrollAmount)
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    }
  }

  // Touch handling for swipe gestures
  const minSwipeDistance = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleScroll("right")
    }

    if (isRightSwipe) {
      handleScroll("left")
    }

    // Reset values
    setTouchStart(null)
    setTouchEnd(null)
  }

  // Toggle card expansion
  const toggleCardExpansion = (cardId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(cardId)) {
        newSet.delete(cardId)
      } else {
        newSet.add(cardId)
      }
      return newSet
    })
  }

  // Update maxScroll on window resize
  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        setMaxScroll(carouselRef.current.scrollWidth - carouselRef.current.clientWidth)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [sortedExperiences])

  return (
    <div className={cn("w-full", className)}>
      {/* Navigation buttons - only show on desktop and if there's enough content to scroll */}
      {!isMobile && maxScroll > 10 && (
        <>
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollPosition > 10 ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="secondary"
              size="icon"
              className="h-12 w-12 rounded-full shadow-md"
              onClick={() => handleScroll("left")}
              disabled={scrollPosition <= 10}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </Button>
          </motion.div>

          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: maxScroll - scrollPosition > 10 ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="secondary"
              size="icon"
              className="h-12 w-12 rounded-full shadow-md"
              onClick={() => handleScroll("right")}
              disabled={maxScroll - scrollPosition <= 10}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </Button>
          </motion.div>
        </>
      )}

      {/* Carousel container */}
      <div
        ref={carouselRef}
        className="w-full overflow-x-auto scrollbar-hide"
        onScroll={handleScrollUpdate}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={cn("flex gap-8 pb-8 px-4", isMobile ? "flex-col items-center" : "flex-row items-stretch")}>
          {sortedExperiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              isExpanded={expandedCards.has(experience.id)}
              onToggleExpand={() => toggleCardExpansion(experience.id)}
              style={{
                width: `${cardWidth}px`,
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      {!isMobile && sortedExperiences.length > 1 && (
        <div className="flex justify-center mt-8 gap-3">
          {sortedExperiences.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-4 h-4 rounded-full transition-all",
                index === activeIndex ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
              )}
              onClick={() => {
                if (carouselRef.current) {
                  carouselRef.current.scrollTo({
                    left: index * scrollAmount,
                    behavior: "smooth",
                  })
                  setActiveIndex(index)
                }
              }}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface ExperienceCardProps {
  experience: CardData
  index: number
  isExpanded: boolean
  onToggleExpand: () => void
  style?: React.CSSProperties
}

function ExperienceCard({ experience, index, isExpanded, onToggleExpand, style }: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Split description into bullet points
  const bulletPoints = experience.description
    .split("\n\n")
    .filter((point) => point.trim().length > 0)
    .map((point) => point.trim())

  // Check if this is the XLMedia logo (which has a different aspect ratio)
  const isXLMedia = experience.imageUrl?.includes("xlmedia-logo.png")

  return (
    <motion.div
      ref={cardRef}
      className="bg-card border dark:border-white/10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.03 }}
      style={style}
    >
      <div className="p-10">
        {/* Header with logo and title */}
        <div className="flex items-start gap-6 mb-6">
          {experience.imageUrl ? (
            <div
              className={cn(
                "w-20 h-20 flex items-center justify-center rounded-lg overflow-hidden",
                isXLMedia ? "bg-white p-1" : "",
              )}
            >
              <Image
                src={experience.imageUrl || "/placeholder.svg"}
                alt={`${experience.title} logo`}
                width={80}
                height={80}
                className="object-contain max-h-20 max-w-20"
              />
            </div>
          ) : (
            <div className="w-20 h-20 flex items-center justify-center bg-primary/10 rounded-lg">
              <span className="text-primary font-bold text-3xl">{experience.title.charAt(0)}</span>
            </div>
          )}

          <div className="flex-1">
            <h3 className="font-bold text-2xl mb-2 line-clamp-2">{experience.title}</h3>
            <p className="text-lg text-muted-foreground line-clamp-1">{experience.subtitle}</p>
            {experience.dates && <p className="text-base text-muted-foreground italic mt-2">{experience.dates}</p>}
          </div>
        </div>

        {/* Preview bullets */}
        <div className="mb-6">
          <ul className="space-y-5 text-lg">
            {bulletPoints.slice(0, 2).map((bullet, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-primary mr-3 text-xl">•</span>
                <span className="line-clamp-3">{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Expandable content */}
          <AnimatePresence initial={false}>
            {isExpanded && bulletPoints.length > 2 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-5"
              >
                <ul className="space-y-5 text-lg">
                  {bulletPoints.slice(2).map((bullet, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary mr-3 text-xl">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle button */}
          {bulletPoints.length > 2 && (
            <Button
              variant="ghost"
              size="lg"
              className="mt-5 text-base w-full flex items-center justify-center gap-2 h-12"
              onClick={onToggleExpand}
            >
              {isExpanded ? "Show Less" : "Show Full Experience"}
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </Button>
          )}
        </div>

        {/* Tags */}
        {experience.tags && experience.tags.length > 0 && (
          <div className="pt-5 border-t border-border/30">
            <div className="flex flex-wrap gap-3 mb-5 mt-4">
              {experience.tags.slice(0, isExpanded ? experience.tags.length : 8).map((tag) => {
                const prefix = getTagPrefix(tag)
                return (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={cn("text-base px-4 py-2 rounded-full", tagPrefixes[prefix])}
                  >
                    <span className="font-medium mr-1">{prefix}</span> {tag}
                  </Badge>
                )
              })}

              {!isExpanded && experience.tags.length > 8 && (
                <Badge variant="outline" className="text-base px-4 py-2 rounded-full">
                  +{experience.tags.length - 8} more
                </Badge>
              )}
            </div>

            {/* External link button if available */}
            {experience.link && (
              <Button
                variant="outline"
                size="lg"
                className="w-full text-base flex items-center justify-center gap-2"
                asChild
              >
                <a href={experience.link} target="_blank" rel="noopener noreferrer">
                  View Project <ExternalLink className="h-5 w-5 ml-1" />
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
