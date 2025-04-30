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
        "p-2 sm:p-3 md:p-4 rounded-2xl", // Reduced padding
        "bg-white dark:bg-[#1e1e1e]",
        "border dark:border-white/5",
        "flex flex-col",
        isHovered ? "shadow-lg" : "shadow-sm",
        card.type === "experience" ? "experience-card" : "",
        card.type === "skills" ? "skills-card" : "",
        card.type === "projects" ? "projects-card" : "",
        card.type === "certifications" ? "certifications-card" : "",
        card.type === "education" ? "education-card" : "",
        card.type === "volunteering" ? "volunteering-card" : "",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        if (card.link) {
          window.open(card.link, "_blank", "noopener,noreferrer")
        }
      }}
      style={{
        ...style,
        height: "100%",
        overflow: "hidden",
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      <div className="flex flex-col">
        {/* Header with title and icon */}
        <div className="flex items-center gap-2 mb-1">
          {(card.type === "experience" || card.type === "certifications" || card.type === "education") &&
          card.imageUrl ? (
            <div
              className={cn("w-7 h-7 flex items-center justify-center rounded-sm", isXLMedia ? "bg-white p-0.5" : "")}
            >
              <Image
                src={card.imageUrl || "/placeholder.svg"}
                alt={`${card.title} logo`}
                width={28}
                height={28}
                className={cn(
                  "object-contain",
                  isXLMedia ? "max-h-6 max-w-6" : "max-h-7 max-w-7",
                  isIBM ? "scale-75" : "",
                )}
              />
            </div>
          ) : (
            <span className="text-muted-foreground" aria-hidden="true">
              {getTypeIcon(card.type)}
            </span>
          )}
          <h3 className="font-bold text-sm sm:text-base line-clamp-1">{card.title}</h3>
          <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
        </div>

        {/* Subtitle and dates - more compact */}
        <p className="text-xs text-muted-foreground mb-1 line-clamp-1">{card.subtitle}</p>
        {card.dates && <p className="text-xs text-muted-foreground mb-1 italic line-clamp-1">{card.dates}</p>}

        {/* Description - more limited */}
        <div className="flex-grow mb-2 pr-1 text-xs text-foreground/80 leading-relaxed">
          <p className="line-clamp-2 hover:line-clamp-3 transition-all duration-300">
            {card.description.split("\n\n")[0]}
          </p>
        </div>

        {/* Tags - reduced */}
        <div className="mt-auto pt-1 border-t border-border/30">
          {card.tags && card.tags.length > 0 && (
            <div className="flex flex-wrap gap-0.5 mb-1">
              {card.tags.slice(0, 2).map((tag) => (
                <TagBadge
                  key={tag}
                  label={tag}
                  className="text-[8px] sm:text-[9px] px-1 py-0 rounded-full border border-border/40 bg-background/50"
                />
              ))}
              {card.tags.length > 2 && (
                <span className="text-[8px] sm:text-[9px] px-1 py-0 rounded-full border border-border/40 bg-background/50 text-muted-foreground">
                  +{card.tags.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Link - simplified */}
          {card.link && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full text-xs h-6 flex items-center justify-center gap-1 mt-1"
            >
              <a href={card.link} target="_blank" rel="noopener noreferrer">
                View <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Remove or comment out this entire block
// const cardStyles = `
//   /* Base styles for all cards */
//   .experience-card, .skills-card, .projects-card,
//   .certifications-card, .education-card, .volunteering-card {
//     height: 100%;
//   }

//   /* Ensure cards in the same carousel have consistent heights */
//   .card-carousel .certifications-card {
//     height: 520px !important; /* Taller to match the Product Manager cert */
//     min-height: 520px !important;
//     max-height: 520px !important;
//     width: 100% !important;
//   }

//   /* Responsive adjustments */
//   @media (max-width: 640px) {
//     .card-carousel .certifications-card {
//       height: 480px !important;
//       min-height: 480px !important;
//       max-height: 480px !important;
//     }
//   }
// `

// // Add the styles to the document
// if (typeof document !== "undefined") {
//   const styleElement = document.createElement("style")
//   styleElement.innerHTML = cardStyles
//   document.head.appendChild(styleElement)
// }
