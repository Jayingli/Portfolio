"use client"

import type React from "react"

import { useEffect, useRef, useCallback, useState } from "react"
import { ProjectCard } from "@/components/project/project-card"
import type { Project } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ProjectCarouselProps {
  projects: Project[]
  scrollSpeed?: number
  onProjectSelect?: (project: Project) => void
}

export function ProjectCarousel({ projects, scrollSpeed = 0.5, onProjectSelect }: ProjectCarouselProps) {
  const innerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const xRef = useRef(0)
  const [isPaused, setIsPaused] = useState(false)

  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const scroll = useCallback(() => {
    if (!innerRef.current || isPaused || isDragging.current) return

    xRef.current -= scrollSpeed

    // Calculate when to reset based on single set width
    const singleSetWidth = innerRef.current.scrollWidth / 3 // Since we have 3 copies
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

  const handleProjectClick = (project: Project) => {
    onProjectSelect?.(project)
  }

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
  const tripleProjects = [...projects, ...projects, ...projects]

  return (
    <section className="px-6 lg:px-12 bg-background pt-0 relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        ref={wrapperRef}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out cursor-grab select-none",
          isPaused ? "py-8 min-h-[200px]" : "py-2 min-h-[140px]",
        )}
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
          className="flex gap-8 px-4 will-change-transform h-full items-center"
          style={{ width: "max-content" }}
        >
          {tripleProjects.map((project, index) => (
            <div key={`${project.name}-${index}`}>
              <ProjectCard project={project} onHover={handleCardHover} onClick={handleProjectClick} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
