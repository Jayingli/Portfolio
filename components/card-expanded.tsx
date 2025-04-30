"use client"

import { useEffect, useRef } from "react"
import {
  X,
  ExternalLink,
  Calendar,
  Tag,
  Briefcase,
  Wrench,
  FolderOpen,
  Award,
  GraduationCap,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TagBadge } from "@/components/tag-badge"
import type { CardData } from "@/data/portfolio-data"
import { useMobile } from "@/hooks/use-mobile"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface CardExpandedProps {
  card: CardData | null
  onClose: () => void
  className?: string
}

export default function CardExpanded({ card, onClose, className }: CardExpandedProps) {
  const { isMobile } = useMobile()
  const contentRef = useRef<HTMLDivElement>(null)

  // Scroll to top when card changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }

    // Add ESC key listener
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [card, onClose])

  if (!card) return null

  // Check if this is the XLMedia logo
  const isXLMedia = card?.imageUrl?.includes("xlmedia-logo.png")

  // Check if this is the IBM logo (which has a different aspect ratio)
  const isIBM = card?.imageUrl?.includes("ibm-safe-logo.png")

  // Get icon based on card type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "experience":
        return <Briefcase />
      case "skills":
        return <Wrench />
      case "projects":
        return <FolderOpen />
      case "certifications":
        return <Award />
      case "education":
        return <GraduationCap />
      case "volunteering":
        return <Heart />
      default:
        return <FolderOpen />
    }
  }

  return (
    <AnimatePresence>
      {card && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Mobile drawer or desktop side panel */}
          <motion.div
            className={cn(
              "fixed z-50 border",
              "bg-white dark:bg-[#121212]",
              "dark:border-white/10",
              isMobile
                ? "inset-x-0 bottom-0 rounded-t-2xl max-h-[90vh]"
                : "top-0 right-0 bottom-0 w-full max-w-md rounded-l-3xl", // Increased width from max-w-md
              className,
            )}
            initial={isMobile ? { y: "100%" } : { x: "100%" }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: "100%" } : { x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-3 sm:p-5">
              <div className="flex items-center gap-3">
                {(card.type === "experience" || card.type === "certifications" || card.type === "education") &&
                card.imageUrl ? (
                  <div
                    className={cn(
                      "w-10 h-10 flex items-center justify-center",
                      isXLMedia ? "bg-white rounded-sm p-0.5" : "",
                      isIBM ? "rounded-sm" : "rounded-full",
                    )}
                  >
                    <Image
                      src={card.imageUrl || "/placeholder.svg"}
                      alt={`${card.title} logo`}
                      width={40}
                      height={40}
                      className={cn(
                        "object-contain",
                        isXLMedia ? "max-h-9 max-w-9" : "max-h-10 max-w-10",
                        card.type === "certifications" && !isIBM ? "rounded-full" : "",
                      )}
                    />
                  </div>
                ) : (
                  <span className="text-primary" aria-hidden="true">
                    {getTypeIcon(card.type)}
                  </span>
                )}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold">{card.title}</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">{card.subtitle}</p>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.15 }}>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-7 w-7 sm:h-8 sm:w-8">
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </motion.div>
            </div>

            {/* Scrollable content */}
            <div ref={contentRef} className="overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 max-h-[calc(80vh-60px)]">
              {/* Dates */}
              {card.dates && (
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span>{card.dates}</span>
                </div>
              )}

              {/* Description */}
              <div className="space-y-3 sm:space-y-4">
                <div className="text-sm sm:text-base leading-relaxed space-y-3 sm:space-y-4 text-foreground/80">
                  {card.description.split("\n\n").map((paragraph, i) => {
                    // Check if this is a section header with emoji (🧩, 🔧, 🎯)
                    if (/^[🧩🔧🎯]/u.test(paragraph)) {
                      const [header, ...content] = paragraph.split("\n")
                      return (
                        <div key={i}>
                          <p className="font-bold mb-2">{header}</p>
                          <div className="whitespace-pre-line">{content.join("\n")}</div>
                        </div>
                      )
                    }
                    // Regular paragraph
                    return <p key={i}>{paragraph}</p>
                  })}
                </div>
              </div>

              {/* Tags */}
              {card.tags && card.tags.length > 0 && (
                <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
                  <div className="flex items-center text-xs sm:text-sm font-medium">
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span>Technologies & Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {card.tags.map((tag) => (
                      <TagBadge key={tag} label={tag} className="text-xs" />
                    ))}
                  </div>
                </div>
              )}

              {/* Link */}
              {card.link && (
                <div className="pt-2 sm:pt-4">
                  <Button asChild variant="outline" className="w-full text-xs sm:text-sm h-8 sm:h-9">
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 sm:gap-2"
                    >
                      View Project <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
