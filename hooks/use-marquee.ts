"use client"

import { useRef, useCallback, useState } from "react"
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect"

interface UseMarqueeOptions {
  duration?: number
  pauseOnHover?: boolean
  gap?: number
}

export function useMarquee(options: UseMarqueeOptions = {}) {
  const { duration = 20000, pauseOnHover = true, gap = 16 } = options
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [duplicated, setDuplicated] = useState(false)
  const pausedRef = useRef(false)

  const pauseAnimation = useCallback(() => {
    if (pauseOnHover) {
      pausedRef.current = true
    }
  }, [pauseOnHover])

  const resumeAnimation = useCallback(() => {
    if (pauseOnHover) {
      pausedRef.current = false
    }
  }, [pauseOnHover])

  // Measure the content and container
  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current || !contentRef.current) return

    const measureSizes = () => {
      const containerWidth = containerRef.current?.offsetWidth || 0
      const contentWidth = contentRef.current?.offsetWidth || 0

      setContainerWidth(containerWidth)
      setContentWidth(contentWidth)

      // Only duplicate if content is wider than container
      setDuplicated(contentWidth > containerWidth)
    }

    measureSizes()

    // Re-measure on resize
    const resizeObserver = new ResizeObserver(measureSizes)
    if (containerRef.current) resizeObserver.observe(containerRef.current)
    if (contentRef.current) resizeObserver.observe(contentRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return {
    containerRef,
    contentRef,
    pauseAnimation,
    resumeAnimation,
    duplicated,
    contentWidth,
    containerWidth,
  }
}
