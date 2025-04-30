"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { suggestionTopics, type CardType, type IconType } from "@/data/suggestion-topics"
import { Briefcase, Wrench, FolderOpen, Award, GraduationCap, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string, topic: CardType) => void
  exploredTopics?: Set<CardType>
  onReturnToTopic?: (topic: CardType) => void
  className?: string
}

// Map icon types to Lucide components
const getIconByType = (iconType: IconType) => {
  switch (iconType) {
    case "briefcase":
      return <Briefcase size={16} />
    case "wrench":
      return <Wrench size={16} />
    case "folder":
      return <FolderOpen size={16} />
    case "award":
      return <Award size={16} />
    case "graduation":
      return <GraduationCap size={16} />
    case "heart":
      return <Heart size={16} />
    default:
      return <FolderOpen size={16} />
  }
}

export function ChatSuggestions({
  onSuggestionClick,
  exploredTopics = new Set(),
  onReturnToTopic,
  className,
}: ChatSuggestionsProps) {
  const { isMobile } = useMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [animationDuration, setAnimationDuration] = useState(30)
  const [isPaused, setIsPaused] = useState(false)

  // Measure content and set up animation
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return

    const checkOverflow = () => {
      const containerWidth = containerRef.current?.offsetWidth || 0
      const contentWidth = contentRef.current?.offsetWidth || 0

      // Only animate if content is wider than container
      setShouldAnimate(contentWidth > containerWidth)

      // Set animation duration based on content width (longer content = slower animation)
      const baseDuration = 20 // seconds
      const calculatedDuration = Math.max(baseDuration, contentWidth / 50)
      setAnimationDuration(calculatedDuration)
    }

    // Check on mount and on resize
    checkOverflow()
    window.addEventListener("resize", checkOverflow)

    return () => {
      window.removeEventListener("resize", checkOverflow)
    }
  }, [])

  return (
    <div className="relative py-1">
      {/* Fade-out gradients - REDUCED WIDTH */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-background to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-background to-transparent z-10"></div>

      {/* Marquee container */}
      <div
        ref={containerRef}
        className={cn(
          "py-1 px-2 overflow-hidden relative",
          "whitespace-nowrap mask-fade-sides-narrow", // Updated class name
          "w-full max-w-full",
          className,
        )}
        aria-label="Suggested questions and navigation"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Marquee content */}
        <motion.div
          ref={contentRef}
          className={cn(
            "inline-flex items-center gap-3", // Increased gap from 1 to 3
            shouldAnimate && "animate-marquee",
            isPaused && "animate-pause",
          )}
          style={
            shouldAnimate
              ? {
                  animationDuration: `${animationDuration}s`,
                  paddingRight: "2rem", // Add spacing between the end and beginning for seamless loop
                }
              : undefined
          }
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          <AnimatePresence>
            {suggestionTopics.map((suggestion, index) => {
              const isExplored = exploredTopics.has(suggestion.topic)
              const isReturnMode = isExplored && onReturnToTopic

              return (
                <motion.div
                  key={suggestion.text}
                  className="transition-all duration-200"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}>
                    <Button
                      variant="outline"
                      size={isExplored && isMobile ? "icon" : isMobile ? "sm" : "default"}
                      className={cn(
                        "whitespace-nowrap bg-white dark:bg-[#121212] hover:bg-muted rounded-full",
                        "flex items-center gap-1 border dark:border-white/10",
                        "suggestion-button", // Add custom class for hover effects
                        isExplored && isMobile ? "h-7 w-7" : isMobile ? "text-xs h-7 px-2 py-1" : "text-sm px-4",
                      )}
                      onClick={() =>
                        isReturnMode
                          ? onReturnToTopic(suggestion.topic)
                          : onSuggestionClick(suggestion.text, suggestion.topic)
                      }
                      title={isReturnMode ? `Return to ${suggestion.topic}` : suggestion.text}
                      aria-pressed={isReturnMode ? true : undefined}
                      aria-current={isExplored ? "topic" : undefined}
                    >
                      <motion.span
                        aria-hidden="true"
                        className="flex items-center justify-center icon-container"
                        whileHover={{
                          rotate: [0, -10, 10, -5, 5, 0],
                          transition: { duration: 0.5 },
                        }}
                      >
                        {getIconByType(suggestion.iconType)}
                      </motion.span>
                      {(!isExplored || !isMobile) && (
                        <span>
                          {isMobile
                            ? suggestion.shortText ||
                              suggestion.text
                                .replace("Tell me about your ", "")
                                .replace("What ", "")
                                .replace("Show me your ", "")
                                .replace(" do you have?", "")
                                .replace("Any ", "")
                                .replace(" experience?", "")
                            : suggestion.text}
                        </span>
                      )}
                      {isExplored && isMobile && <span className="sr-only">Return to {suggestion.topic}</span>}
                    </Button>
                  </motion.div>
                </motion.div>
              )
            })}

            {/* Duplicate content for seamless looping */}
            {shouldAnimate &&
              suggestionTopics.map((suggestion, index) => {
                const isExplored = exploredTopics.has(suggestion.topic)
                const isReturnMode = isExplored && onReturnToTopic

                return (
                  <motion.div
                    key={`${suggestion.text}-duplicate`}
                    className="transition-all duration-200"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: (index + suggestionTopics.length) * 0.05,
                      ease: "easeOut",
                    }}
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}>
                      <Button
                        variant="outline"
                        size={isExplored && isMobile ? "icon" : isMobile ? "sm" : "default"}
                        className={cn(
                          "whitespace-nowrap bg-white dark:bg-[#121212] hover:bg-muted rounded-full",
                          "flex items-center gap-1 border dark:border-white/10",
                          "suggestion-button", // Add custom class for hover effects
                          isExplored && isMobile ? "h-7 w-7" : isMobile ? "text-xs h-7 px-2 py-1" : "text-sm px-4",
                        )}
                        onClick={() =>
                          isReturnMode
                            ? onReturnToTopic(suggestion.topic)
                            : onSuggestionClick(suggestion.text, suggestion.topic)
                        }
                        title={isReturnMode ? `Return to ${suggestion.topic}` : suggestion.text}
                        aria-pressed={isReturnMode ? true : undefined}
                        aria-current={isExplored ? "topic" : undefined}
                      >
                        <motion.span
                          aria-hidden="true"
                          className="flex items-center justify-center icon-container"
                          whileHover={{
                            rotate: [0, -10, 10, -5, 5, 0],
                            transition: { duration: 0.5 },
                          }}
                        >
                          {getIconByType(suggestion.iconType)}
                        </motion.span>
                        {(!isExplored || !isMobile) && (
                          <span>
                            {isMobile
                              ? suggestion.shortText ||
                                suggestion.text
                                  .replace("Tell me about your ", "")
                                  .replace("What ", "")
                                  .replace("Show me your ", "")
                                  .replace(" do you have?", "")
                                  .replace("Any ", "")
                                  .replace(" experience?", "")
                              : suggestion.text}
                          </span>
                        )}
                        {isExplored && isMobile && <span className="sr-only">Return to {suggestion.topic}</span>}
                      </Button>
                    </motion.div>
                  </motion.div>
                )
              })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
