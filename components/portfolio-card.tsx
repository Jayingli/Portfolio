"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import type { CardData } from "@/data/portfolio-data"
import { useMobile } from "@/hooks/use-mobile"

interface PortfolioCardProps {
  card: CardData
  className?: string
}

export function PortfolioCard({ card, className }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { isMobile } = useMobile()

  return (
    <Card
      className={cn(
        "h-full border overflow-hidden transition-all duration-300",
        "group bg-card",
        !isMobile && "hover:shadow-md focus-within:shadow-md",
        className,
      )}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onFocus={() => !isMobile && setIsHovered(true)}
      onBlur={() => !isMobile && setIsHovered(false)}
    >
      <div className="p-5 h-full flex flex-col">
        <div className="mb-auto">
          <div className="flex flex-col gap-1 mb-3">
            <h3 className="text-lg font-semibold tracking-tight line-clamp-1">{card.title}</h3>
            {card.subtitle && <p className="text-sm text-muted-foreground line-clamp-1">{card.subtitle}</p>}
            {card.dates && <p className="text-xs text-muted-foreground mt-1">{card.dates}</p>}
          </div>

          <div className="mt-2">
            <p className="text-sm text-foreground/90 line-clamp-3">{card.description}</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border/50">
          {card.tags && card.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {card.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-normal">
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

          {card.link && (
            <motion.div
              initial={{ opacity: 0.9 }}
              animate={{
                opacity: isHovered ? 1 : 0.9,
                y: isHovered ? 0 : 2,
                transition: { duration: 0.2 },
              }}
            >
              <Button variant="outline" size="sm" asChild className="w-full">
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5"
                >
                  View Project <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  )
}
