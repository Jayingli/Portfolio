"use client"

import type React from "react"
import { useState } from "react"
import { ChevronRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { TagBadge } from "@/components/tag-badge"
import type { CardData } from "@/data/portfolio-data"
import { Briefcase, Wrench, FolderOpen, Award, GraduationCap, Heart } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface CardPreviewProps {
  card: CardData
  onClick: () => void
  className?: string
  index?: number
  style?: React.CSSProperties
}

export default function CardPreview({ card, onClick, className, style }: CardPreviewProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Safety check to ensure card exists and has a type
  if (!card || !card.type) {
    return (
      <div className="p-4 border rounded-2xl bg-card shadow-sm text-center text-muted-foreground">
        Card data unavailable
      </div>
    )
  }

  // Get icon based on card type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "experience":
        return <Briefcase size={18} />
      case "skills":
        return <Wrench size={18} />
      case "projects":
        return <FolderOpen size={18} />
      case "certifications":
        return <Award size={18} />
      case "education":
        return <GraduationCap size={18} />
      case "volunteering":
        return <Heart size={18} />
      default:
        return <FolderOpen size={18} />
    }
  }

  // Check if this is the XLMedia logo
  const isXLMedia = card.imageUrl?.includes("xlmedia-logo.png")

  // Check if this is the IBM logo (which has a different aspect ratio)
  const isIBM = card.imageUrl?.includes("ibm-safe-logo.png")

  return (
    <motion.div
      className={cn(
        "relative flex-shrink-0 max-w-full cursor-pointer",
        "p-3 sm:p-4 md:p-5 rounded-2xl h-full", // Reduced padding
        "bg-white dark:bg-[#1e1e1e]",
        "border dark:border-white/5",
        "flex flex-col", // Added flex column to better control spacing
        isHovered ? "shadow-lg" : "shadow-sm",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation()

        // If the card has a link, navigate directly to it instead of opening a modal
        if (card.link) {
          window.open(card.link, "_blank", "noopener,noreferrer")
        }
        // Otherwise do nothing (don't call the onClick prop which would open the modal)
      }}
      style={{
        ...style,
        maxHeight: "80vh", // Reduced max-height constraint to ensure card fits in viewport with navigation
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      // Removed initial and animate properties to disable fade in/out animations
    >
      <div
        className={cn(
          "flex flex-col", // Added flex column to better control spacing
          isHovered ? "shadow-lg" : "shadow-sm",
        )}
      >
        <div className="flex items-center gap-2 mb-2">
          {(card.type === "experience" || card.type === "certifications" || card.type === "education") &&
          card.imageUrl ? (
            <motion.div
              className={cn("w-8 h-8 flex items-center justify-center rounded-sm", isXLMedia ? "bg-white p-0.5" : "")}
              whileHover={{ scale: 1.1 }}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={card.imageUrl || "/placeholder.svg"}
                alt={`${card.title} logo`}
                width={32}
                height={32}
                className={cn("object-contain", isXLMedia ? "max-h-7 max-w-7" : "max-h-8 max-w-8")}
              />
            </motion.div>
          ) : (
            <motion.span
              className="text-muted-foreground"
              aria-hidden="true"
              animate={{
                rotate: isHovered ? [0, -10, 10, -5, 5, 0] : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              {getTypeIcon(card.type)}
            </motion.span>
          )}
          <h3 className="font-bold text-base sm:text-lg line-clamp-1">{card.title}</h3>
          <motion.div
            className="ml-auto"
            animate={{
              x: isHovered ? 0 : -3,
              opacity: isHovered ? 1 : 0.5,
            }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </motion.div>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground mb-1">{card.subtitle}</p>

        {card.dates && <p className="text-xs text-muted-foreground mb-2 italic">{card.dates}</p>}

        {/* Scrollable description area */}
        <div className="flex-grow overflow-y-auto mb-2 pr-1 text-xs sm:text-sm text-foreground/80 leading-relaxed">
          <div className="space-y-4">
            {card.description.split("\n\n").map((paragraph, i) => {
              // Check if this is a section header with emoji (🧩, 🔧, 🎯)
              if (/^[🧩🔧🎯]/u.test(paragraph)) {
                const [header, ...content] = paragraph.split("\n")
                return (
                  <div key={i} className="mt-3 first:mt-0">
                    <p className="font-bold text-foreground text-xs sm:text-sm tracking-wide mb-1">{header}</p>
                    <div className="whitespace-pre-line">{content.join("\n")}</div>
                  </div>
                )
              }
              // Regular paragraph or list
              return (
                <p key={i} className="whitespace-pre-line">
                  {paragraph}
                </p>
              )
            })}
          </div>
        </div>

        <div className="mt-auto pt-2 border-t border-border/30">
          {card.tags && card.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {/* Show all tags */}
              {card.tags.map((tag) => (
                <TagBadge
                  key={tag}
                  label={tag}
                  className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full border border-border/40 shadow-sm hover:shadow-md transition-shadow duration-200 bg-background/50"
                />
              ))}
            </div>
          )}

          {/* Link */}
          {card.link && (
            <div className="mt-1">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full text-xs h-7 flex items-center justify-center gap-1"
              >
                <a href={card.link} target="_blank" rel="noopener noreferrer">
                  View Project <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
