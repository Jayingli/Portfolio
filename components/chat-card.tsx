"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { CardData } from "@/data/portfolio-data"
import { Briefcase, Wrench, FolderOpen, Award, GraduationCap, Heart } from "lucide-react"
import Image from "next/image"

interface ChatCardProps {
  card: CardData
  onClick: () => void
  className?: string
  index?: number
}

export function ChatCard({ card, onClick, className, index = 0 }: ChatCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Check if this is the XLMedia logo
  const isXLMedia = card.imageUrl?.includes("xlmedia-logo.png")

  // Get icon based on card type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "experience":
        return <Briefcase className="h-5 w-5" />
      case "skills":
        return <Wrench className="h-5 w-5" />
      case "projects":
        return <FolderOpen className="h-5 w-5" />
      case "certifications":
        return <Award className="h-5 w-5" />
      case "education":
        return <GraduationCap className="h-5 w-5" />
      case "volunteering":
        return <Heart className="h-5 w-5" />
      default:
        return <FolderOpen className="h-5 w-5" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: index * 0.1,
          duration: 0.3,
          ease: "easeOut",
        },
      }}
      whileHover={{ y: -4 }}
      className={cn("relative flex-shrink-0 w-[280px] max-w-full", "cursor-pointer overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={cn("p-4 rounded-2xl bg-card border", "transition-all duration-300", "shadow-sm hover:shadow-md")}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {(card.type === "experience" || card.type === "education") && card.imageUrl ? (
              <div
                className={cn("w-8 h-8 flex items-center justify-center", isXLMedia ? "bg-white rounded-sm p-0.5" : "")}
              >
                <Image
                  src={card.imageUrl || "/placeholder.svg"}
                  alt={`${card.title} logo`}
                  width={32}
                  height={32}
                  className={cn("object-contain", isXLMedia ? "max-h-7 max-w-7" : "max-h-8 max-w-8")}
                />
              </div>
            ) : (
              <span className="text-lg" aria-hidden="true">
                {getTypeIcon(card.type)}
              </span>
            )}
            <h3 className="font-bold text-base line-clamp-1">{card.title}</h3>
          </div>
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0.5,
              x: isHovered ? 0 : -3,
            }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </motion.div>
        </div>

        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{card.subtitle}</p>

        <p className="text-sm mb-3 line-clamp-2">{card.description}</p>

        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {card.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-normal px-2 py-0.5">
                {tag}
              </Badge>
            ))}
            {card.tags.length > 3 && (
              <Badge variant="outline" className="text-xs font-normal">
                +{card.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Subtle glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered ? "0 0 20px 2px rgba(var(--primary), 0.15)" : "0 0 0px 0px rgba(var(--primary), 0)",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}
