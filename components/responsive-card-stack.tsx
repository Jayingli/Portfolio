"use client"

import { useState, useRef, useEffect } from "react"
import { useInView } from "framer-motion"
import type { CardData } from "@/data/portfolio-data"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { PortfolioCard } from "@/components/portfolio-card"
import { ChevronLeft, ChevronRight, ExternalLink, X, Maximize } from "lucide-react"

interface ResponsiveCardStackProps {
  title?: string
  cards: CardData[]
  className?: string
  forceCarousel?: boolean
}

export function ResponsiveCardStack({ title, cards, className, forceCarousel }: ResponsiveCardStackProps) {
  const isMobile = useMobile()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [isGridView, setIsGridView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -100px 0px", // Trigger animation before fully in view
  })

  // Determine if we should use grid view based on screen size and forceCarousel prop
  useEffect(() => {
    setIsGridView(!isMobile && !forceCarousel && cards.length > 1)
  }, [isMobile, forceCarousel, cards.length])

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleCardClick = (cardId: string) => {
    if (isGridView) {
      setExpandedCard(cardId === expandedCard ? null : cardId)
    }
  }

  const toggleView = () => {
    setIsGridView((prev) => !prev)
    setExpandedCard(null)
  }

  return (
    <div className={cn("w-full", className)} ref={containerRef}>
      {/* Header with title and controls */}
      <div className="flex justify-between items-center mb-4">
        {title && (
          <h2
            className="text-xl font-semibold mb-4 text-foreground transition-all duration-300"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(-10px)",
            }}
          >
            {title}
          </h2>
        )}

        <div className="flex items-center gap-2">
          {cards.length > 1 && (
            <Button variant="outline" size="sm" onClick={toggleView} className="hidden md:flex items-center gap-1.5">
              {isGridView ? (
                <>
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span>Carousel View</span>
                </>
              ) : (
                <>
                  <Maximize className="h-3.5 w-3.5" />
                  <span>Grid View</span>
                </>
              )}
            </Button>
          )}

          {!isGridView && cards.length > 1 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="h-8 w-8 rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>

              <span className="text-sm">
                {currentIndex + 1} / {cards.length}
              </span>

              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={currentIndex === cards.length - 1}
                className="h-8 w-8 rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Grid View */}
      {isGridView ? (
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div key={card.id} className="h-full transition-all duration-300">
              <PortfolioCard card={card} />
            </div>
          ))}
        </div>
      ) : (
        /* Carousel View */
        <div className="relative">
          <div className="w-full transition-all duration-300">
            <Card className="w-full border shadow-sm hover:shadow-md transition-shadow">
              <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{cards[currentIndex].title}</h3>
                    <p className="text-sm text-muted-foreground">{cards[currentIndex].subtitle}</p>
                  </div>
                  {cards[currentIndex].dates && (
                    <div className="text-sm font-medium text-muted-foreground shrink-0">
                      {cards[currentIndex].dates}
                    </div>
                  )}
                </div>

                <div className="mt-2 text-sm leading-relaxed">
                  <p>{cards[currentIndex].description}</p>
                </div>

                <div className="mt-6 space-y-4">
                  {cards[currentIndex].tags && cards[currentIndex].tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {cards[currentIndex].tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {cards[currentIndex].link && (
                    <Button variant="outline" size="sm" asChild className="mt-2">
                      <a
                        href={cards[currentIndex].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5"
                      >
                        View Project <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Mobile-friendly dot indicators */}
          {cards.length > 1 && (
            <div className="flex justify-center mt-4 gap-1.5">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === currentIndex
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
                  )}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Expanded Card Modal */}
      {expandedCard && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-200"
            onClick={() => setExpandedCard(null)}
          />

          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md max-h-[80vh] z-50 overflow-auto transition-all duration-300"
            style={{
              opacity: 1,
              transform: "translate(-50%, -50%) scale(1)",
            }}
          >
            {(() => {
              const card = cards.find((c) => c.id === expandedCard)
              if (!card) return null

              return (
                <Card className="shadow-xl border overflow-hidden">
                  <div className="p-5 sm:p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight">{card.title}</h3>
                        <p className="text-sm text-muted-foreground">{card.subtitle}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full -mr-2 -mt-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedCard(null)
                        }}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                      </Button>
                    </div>

                    {card.dates && <div className="text-sm font-medium text-muted-foreground mb-4">{card.dates}</div>}

                    <div className="mt-2 text-sm">
                      <p>{card.description}</p>
                    </div>

                    <div className="mt-6 space-y-4">
                      {card.tags && card.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {card.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="font-normal">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {card.link && (
                        <Button variant="outline" size="sm" asChild className="mt-2">
                          <a
                            href={card.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Project <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })()}
          </div>
        </>
      )}
    </div>
  )
}
