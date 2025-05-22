"use client"

import type React from "react"
import { useState } from "react"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { TagBadge } from "@/components/tag-badge"
import type { CardData } from "@/data/portfolio-data"
import { Briefcase, Wrench, FolderOpen, Award, GraduationCap, Heart, ChevronDown } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
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
  const [isExpanded, setIsExpanded] = useState(false)

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
        return <Briefcase size={24} />
      case "skills":
        return <Wrench size={24} />
      case "projects":
        return <FolderOpen size={24} />
      case "certifications":
        return <Award size={24} />
      case "education":
        return <GraduationCap size={24} />
      case "volunteering":
        return <Heart size={24} />
      default:
        return <FolderOpen size={24} />
    }
  }

  // Function to remove puzzle emojis and other section emojis
  const removeEmojis = (text: string) => {
    // Remove puzzle emoji (🧩), wrench emoji (🔧), target emoji (🎯) and any other emojis at the start of lines
    return text.replace(/^[🧩🔧🎯]+ */gmu, "")
  }

  // Format description into bullet points if it's an experience card
  const formatDescription = (description: string, type: string) => {
    if (type !== "experience") {
      return [removeEmojis(description.split("\n\n")[0])]
    }

    // For experience cards, split by double newlines and format as bullet points
    return description
      .split("\n\n")
      .filter((point) => point.trim().length > 0)
      .map((point) => removeEmojis(point.trim()))
  }

  const bulletPoints = formatDescription(card.description, card.type)

  // Check if this is the XLMedia logo
  const isXLMedia = card.imageUrl?.includes("xlmedia-logo.png")

  // Check if this is the IBM logo (which has a different aspect ratio)
  const isIBM = card.imageUrl?.includes("ibm-safe-logo.png")

  return (
    <motion.div
      className={cn(
        "relative flex-shrink-0 cursor-pointer",
        "w-full min-w-[320px] sm:min-w-[400px] md:min-w-[480px]", // Width constraints
        "p-4 sm:p-6 md:p-8 rounded-2xl", // Padding
        "bg-white dark:bg-[#1e1e1e]",
        "border dark:border-white/5",
        "flex flex-col",
        isHovered ? "shadow-lg" : "shadow-md",
        card.type === "experience" ? "experience-card min-h-[500px]" : "", // Added min-height for experience cards
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
      <div className="flex flex-col h-full">
        {/* Header with title and icon - removed chevron */}
        <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
          {(card.type === "experience" || card.type === "certifications" || card.type === "education") &&
          card.imageUrl ? (
            <div
              className={cn("w-10 h-10 flex items-center justify-center rounded-sm", isXLMedia ? "bg-white p-0.5" : "")}
            >
              <Image
                src={card.imageUrl || "/placeholder.svg"}
                alt={`${card.title} logo`}
                width={40}
                height={40}
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
          <h3 className="font-bold text-base sm:text-lg md:text-xl line-clamp-1">{card.title}</h3>
        </div>

        {/* Subtitle and dates - more compact */}
        <p className="text-sm md:text-base text-muted-foreground mb-2 md:mb-3 line-clamp-1">{card.subtitle}</p>
        {card.dates && (
          <p className="text-sm md:text-base text-muted-foreground mb-2 md:mb-3 italic line-clamp-1">{card.dates}</p>
        )}

        {/* Description - enhanced for experience cards with bullet points */}
        <div className="flex-grow mb-4 md:mb-5 pr-1 text-sm md:text-base text-foreground/80 leading-relaxed overflow-y-auto scrollbar-thin">
          {card.type === "experience" ? (
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                <motion.div
                  className="space-y-3"
                  initial={false}
                  animate={{
                    height: isExpanded ? "auto" : "200px",
                    overflow: isExpanded ? "visible" : "hidden",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {bulletPoints.map((point, i) => (
                    <div key={i} className="flex items-start">
                      <span className="text-primary mr-2 flex-shrink-0 leading-relaxed mt-0.5">•</span>
                      {point}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Show more/less button for experience cards */}
              {bulletPoints.length > 2 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-sm flex items-center justify-center gap-1 h-8 mt-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsExpanded(!isExpanded)
                  }}
                >
                  {isExpanded ? "Show Less" : "Show More"}
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </Button>
              )}
            </div>
          ) : (
            <p className="line-clamp-3 hover:line-clamp-4 transition-all duration-300">{bulletPoints[0]}</p>
          )}
        </div>

        {/* Tags - show all */}
        <div className="mt-auto pt-1 border-t border-border/30">
          {card.tags && card.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-5">
              {card.tags.map((tag) => (
                <TagBadge
                  key={tag}
                  label={tag}
                  className="text-xs sm:text-sm px-2 py-0.5 rounded-full border border-border/40 bg-background/50"
                />
              ))}
            </div>
          )}

          {/* Link - with increased spacing above */}
          {card.link && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full text-sm md:text-base h-8 md:h-10 flex items-center justify-center gap-1 mt-3"
            >
              <a href={card.link} target="_blank" rel="noopener noreferrer">
                View <ExternalLink className="h-4 w-4 ml-1" />
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
