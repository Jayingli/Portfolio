"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { CardData } from "@/data/portfolio-data"
import { useMobile } from "@/hooks/use-mobile"

interface DetailedCardViewProps {
  card: CardData | null
  onClose: () => void
  className?: string
}

export function DetailedCardView({ card, onClose, className }: DetailedCardViewProps) {
  const { isMobile } = useMobile()
  const contentRef = useRef<HTMLDivElement>(null)

  // Scroll to top when card changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [card])

  if (!card) return null

  // Get icon based on card type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "experience":
        return "💼"
      case "skills":
        return "🛠️"
      case "projects":
        return "📁"
      case "certifications":
        return "🏆"
      default:
        return "📄"
    }
  }

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  const mobileDrawerVariants = {
    hidden: { y: "100%" },
    visible: { y: 0, transition: { type: "spring", damping: 25, stiffness: 300 } },
    exit: { y: "100%", transition: { duration: 0.2 } },
  }

  const desktopPanelVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "spring", damping: 25, stiffness: 300 } },
    exit: { x: "100%", transition: { duration: 0.2 } },
  }

  return (
    <AnimatePresence>
      {/* Background overlay */}
      <motion.div
        key="overlay"
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      />

      {/* Mobile drawer or desktop side panel */}
      <motion.div
        key="panel"
        className={cn(
          "fixed z-50 bg-card border shadow-lg",
          isMobile
            ? "inset-x-0 bottom-0 rounded-t-3xl max-h-[85vh]"
            : "top-0 right-0 bottom-0 w-full max-w-md rounded-l-3xl",
          className,
        )}
        variants={isMobile ? mobileDrawerVariants : desktopPanelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-card/95 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">
              {getTypeIcon(card.type)}
            </span>
            <h2 className="text-xl font-bold">{card.title}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5" />
            <span className="sr-only">Close and return to conversation</span>
          </Button>
        </div>

        {/* Scrollable content */}
        <div ref={contentRef} className="overflow-y-auto p-5 space-y-6 max-h-[calc(85vh-64px)]">
          {/* Subtitle and dates */}
          <div className="space-y-2">
            <p className="text-lg font-medium">{card.subtitle}</p>
            {card.dates && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1.5" />
                <span>{card.dates}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Overview</h3>
            <div className="text-base leading-relaxed space-y-4">
              {card.description.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Tags */}
          {card.tags && card.tags.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center text-sm font-semibold">
                <Tag className="h-4 w-4 mr-1.5" />
                <span>Technologies & Skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-2.5 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Link */}
          {card.link && (
            <div className="pt-2">
              <Button asChild className="w-full">
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  View Project <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
