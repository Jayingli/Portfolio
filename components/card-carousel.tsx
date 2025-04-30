"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { CardData } from "@/data/portfolio-data"
import CardPreview from "@/components/card-preview"
import { useMobile } from "@/hooks/use-mobile"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface CardCarouselProps {
  cards: CardData[]
  onCardClick: (card: CardData) => void
  className?: string
}

export function CardCarousel({ cards, onCardClick, className }: CardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { isMobile, isTablet, isDesktop } = useMobile()
  const [isVisible, setIsVisible] = useState(false)

  // Touch handling for swipe gestures
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  // Use IntersectionObserver to detect when carousel is in view
  useEffect(() => {
    if (!carouselRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(carouselRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

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

    if (isLeftSwipe && currentIndex < cards.length - 1) {
      handleNext()
    }

    if (isRightSwipe && currentIndex > 0) {
      handlePrevious()
    }

    // Reset values
    setTouchStart(null)
    setTouchEnd(null)
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  // Update the handleCardClick function to ensure it works properly
  const handleCardClick = (index: number) => {
    // Always navigate when clicking on a side card
    if (index !== currentIndex) {
      setCurrentIndex(index)
    } else {
      // If clicking the active card
      if (cards[index]) {
        // If it's a project with a link, navigate directly
        if (cards[index].type === "projects" && cards[index].link) {
          window.open(cards[index].link, "_blank", "noopener,noreferrer")
        } else {
          // For other card types, trigger the onCardClick callback
          onCardClick(cards[index])
        }
      }
    }
  }

  // Card dimensions - main card is larger, side cards are smaller and equal size
  const mainCardWidth = isMobile ? 280 : isTablet ? 380 : 420
  const mainCardHeight = isMobile ? 360 : isTablet ? 460 : 500

  const sideCardWidth = isMobile ? 220 : isTablet ? 300 : 320
  const sideCardHeight = isMobile ? 300 : isTablet ? 380 : 400

  // Increased distance from center card
  const sideCardOffset = mainCardWidth / 2 + 60

  // Safety check to ensure we have cards and a valid current index
  if (!cards || cards.length === 0) {
    return <div className="p-4 text-center text-muted-foreground">No cards available</div>
  }

  // Also add this to ensure currentIndex is valid:
  const safeCurrentIndex = Math.min(Math.max(0, currentIndex), cards.length - 1)

  // Adjust the container padding and spacing
  return (
    <div className={cn("relative w-full px-1", className)}>
      {/* Main carousel */}
      <div
        ref={carouselRef}
        className="relative overflow-hidden py-2 perspective-1000"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={cn("flex justify-center items-center", "transition-opacity duration-500")}
          style={{
            minHeight: `${mainCardHeight}px`,
            opacity: isVisible ? 1 : 0,
          }}
        >
          {/* Show previous card if available */}
          {safeCurrentIndex > 0 && !isMobile && cards[safeCurrentIndex - 1] && (
            <div
              className="absolute cursor-pointer z-10"
              style={{
                transform: `translateX(${-sideCardOffset}px) scale(0.8) translateZ(-100px)`,
                opacity: 0.7,
                filter: "blur(1px)",
              }}
              onClick={() => handlePrevious()}
              role="button"
              tabIndex={0}
              aria-label="Previous card"
            >
              <CardPreview
                card={cards[safeCurrentIndex - 1]}
                onClick={() => handlePrevious()}
                className="shadow-md pointer-events-none"
                style={{ width: `${sideCardWidth}px`, height: `${sideCardHeight}px`, maxWidth: "100%" }}
              />
            </div>
          )}

          {/* Current card */}
          <div
            className="transition-all duration-300 z-20"
            style={{
              transform: "scale(1) translateZ(0)",
            }}
          >
            <CardPreview
              card={cards[safeCurrentIndex]}
              onClick={() => onCardClick(cards[safeCurrentIndex])}
              className="shadow-xl"
              style={{
                width: `${mainCardWidth}px`,
                height: `${mainCardHeight}px`,
                maxWidth: "100%",
              }}
            />
          </div>

          {/* Show next card if available */}
          {safeCurrentIndex < cards.length - 1 && !isMobile && cards[safeCurrentIndex + 1] && (
            <div
              className="absolute cursor-pointer z-10"
              style={{
                transform: `translateX(${sideCardOffset}px) scale(0.8) translateZ(-100px)`,
                opacity: 0.7,
                filter: "blur(1px)",
              }}
              onClick={() => handleNext()}
              role="button"
              tabIndex={0}
              aria-label="Next card"
            >
              <CardPreview
                card={cards[safeCurrentIndex + 1]}
                onClick={() => handleNext()}
                className="shadow-md pointer-events-none"
                style={{ width: `${sideCardWidth}px`, height: `${sideCardHeight}px`, maxWidth: "100%" }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation controls - make more visible with increased spacing */}
      <div className="flex justify-center items-center gap-2 mt-4 mb-4">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.15 }}>
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={safeCurrentIndex === 0}
            className="h-8 w-8 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
        </motion.div>

        {/* Visual indicators - make more visible */}
        <div className="flex justify-center items-center gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === safeCurrentIndex
                  ? "bg-primary scale-125"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
              )}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.15 }}>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={safeCurrentIndex === cards.length - 1}
            className="h-8 w-8 rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
