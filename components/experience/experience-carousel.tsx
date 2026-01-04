"use client"

import type React from "react"

import { useEffect, useRef, useCallback, useState } from "react"
import type { CardData } from "@/data/portfolio-data"
import { ExperienceCard } from "./experience-card"
import { cn } from "@/lib/utils"

interface ExperienceCarouselProps {
  experiences: CardData[]
  scrollSpeed?: number
  onExperienceSelect?: (experience: CardData) => void
}

export function ExperienceCarousel({ experiences, scrollSpeed = 0.5, onExperienceSelect }: ExperienceCarouselProps) {
  const innerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const xRef = useRef(0)
  const [isPaused, setIsPaused] = useState(false)

  // Touch/drag support
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const scroll = useCallback(() => {
    if (!innerRef.current || isPaused || isDragging.current) return

    xRef.current -= scrollSpeed

    const singleSetWidth = innerRef.current.scrollWidth / 3
    if (Math.abs(xRef.current) >= singleSetWidth) {
      xRef.current = 0
    }

    innerRef.current.style.transform = `translateX(${xRef.current}px)`
    animationRef.current = requestAnimationFrame(scroll)
  }, [scrollSpeed, isPaused])

  useEffect(() => {
    animationRef.current = requestAnimationFrame(scroll)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [scroll])

  const handleCardHover = (isHovered: boolean) => {
    setIsPaused(isHovered)
  }

  const handleExperienceClick = (experience: CardData) => {
    onExperienceSelect?.(experience)
  }

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true
    startX.current = e.touches[0].pageX
    scrollLeft.current = xRef.current
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return
    const x = e.touches[0].pageX
    const walk = (x - startX.current) * 1.5
    xRef.current = scrollLeft.current + walk
    if (innerRef.current) {
      innerRef.current.style.transform = `translateX(${xRef.current}px)`
    }
  }

  const handleTouchEnd = () => {
    isDragging.current = false
  }

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX
    scrollLeft.current = xRef.current
    if (wrapperRef.current) {
      wrapperRef.current.style.cursor = "grabbing"
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX
    const walk = (x - startX.current) * 1.5
    xRef.current = scrollLeft.current + walk
    if (innerRef.current) {
      innerRef.current.style.transform = `translateX(${xRef.current}px)`
    }
  }

  const handleMouseUp = () => {
    isDragging.current = false
    if (wrapperRef.current) {
      wrapperRef.current.style.cursor = "grab"
    }
  }

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false
      if (wrapperRef.current) {
        wrapperRef.current.style.cursor = "grab"
      }
    }
  }

  // Create 3 copies for seamless infinite loop
  const tripleExperiences = [...experiences, ...experiences, ...experiences]

  return (
    <section className="px-4 lg:px-8 bg-background pt-0 relative overflow-visible">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        ref={wrapperRef}
        className={cn("overflow-hidden transition-all duration-300 ease-in-out cursor-grab select-none py-4")}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={innerRef}
          className="flex gap-4 px-2 will-change-transform h-full items-center"
          style={{ width: "max-content" }}
        >
          {tripleExperiences.map((experience, index) => (
            <div key={`${experience.id}-${index}`}>
              <ExperienceCard experience={experience} onHover={handleCardHover} onClick={handleExperienceClick} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
