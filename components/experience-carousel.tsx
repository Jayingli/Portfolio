"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExperienceCard } from "./experience-card"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import type { CardData } from "@/data/portfolio-data"

interface ExperienceCarouselProps {
  experiences: CardData[]
  className?: string
}

export function ExperienceCarousel({ experiences, className }: ExperienceCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useMobile()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)

  // Handle scroll navigation
  const handleScroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return

    const scrollAmount = 360 + 16 // card width + gap
    const currentScroll = carouselRef.current.scrollLeft
    const maxScrollValue = carouselRef.current.scrollWidth - carouselRef.current.clientWidth

    setMaxScroll(maxScrollValue)

    if (direction === "left") {
      carouselRef.current.scrollTo({
        left: Math.max(0, currentScroll - scrollAmount),
        behavior: "smooth",
      })
    } else {
      carouselRef.current.scrollTo({
        left: Math.min(maxScrollValue, currentScroll + scrollAmount),
        behavior: "smooth",
      })
    }
  }

  // Update scroll position for button visibility
  const handleScrollUpdate = () => {
    if (!carouselRef.current) return
    setScrollPosition(carouselRef.current.scrollLeft)
    setMaxScroll(carouselRef.current.scrollWidth - carouselRef.current.clientWidth)
  }

  return (
    <div className={cn("relative w-full", className)}>
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
              className="h-8 w-8 rounded-full shadow-md"
              onClick={() => handleScroll("left")}
              disabled={scrollPosition <= 10}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Scroll left</span>
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
              className="h-8 w-8 rounded-full shadow-md"
              onClick={() => handleScroll("right")}
              disabled={maxScroll - scrollPosition <= 10}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </motion.div>
        </>
      )}

      {/* Carousel container */}
      <div
        className={cn(
          "w-full overflow-x-auto scrollbar-hide",
          isMobile ? "flex flex-col gap-4" : "flex flex-row gap-4 pb-4 px-1",
        )}
        ref={carouselRef}
        onScroll={handleScrollUpdate}
      >
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>

      {/* Scroll indicator dots - only show on mobile */}
      {!isMobile && experiences.length > 1 && (
        <div className="flex justify-center mt-4 gap-1.5">
          {Array.from({ length: Math.ceil(experiences.length) }).map((_, index) => {
            // Calculate which dot should be active based on scroll position
            const cardWidth = 360 + 16 // card width + gap
            const activeIndex = Math.round(scrollPosition / cardWidth)

            return (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === activeIndex
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
                )}
                onClick={() => {
                  if (carouselRef.current) {
                    carouselRef.current.scrollTo({
                      left: index * cardWidth,
                      behavior: "smooth",
                    })
                  }
                }}
                aria-label={`Go to card ${index + 1}`}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
