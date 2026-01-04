"use client"

import { motion } from "framer-motion"
import { ExternalLink, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { CardData } from "@/data/portfolio-data"

interface ExperienceExpandedCardProps {
  experience: CardData
  onCollapse: () => void
}

export function ExperienceExpandedCard({ experience, onCollapse }: ExperienceExpandedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="rounded-xl bg-card border border-border p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              {experience.logo && (
                <img
                  src={experience.logo || "/placeholder.svg"}
                  alt={experience.company}
                  className="w-12 h-12 object-contain rounded-lg bg-background p-2"
                />
              )}
              <div>
                <h3 className="text-2xl font-bold text-foreground">{experience.company}</h3>
                <p className="text-lg text-muted-foreground">{experience.title}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{experience.dates}</span>
              {experience.location && (
                <>
                  <span>•</span>
                  <span>{experience.location}</span>
                </>
              )}
              {experience.type && (
                <>
                  <span>•</span>
                  <Badge variant="secondary">{experience.type}</Badge>
                </>
              )}
            </div>

            {experience.tags && experience.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {experience.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Button variant="ghost" size="icon" onClick={onCollapse}>
            <ChevronUp className="h-5 w-5" />
          </Button>
        </div>

        {/* Description */}
        {experience.description && <p className="text-muted-foreground leading-relaxed">{experience.description}</p>}

        {/* Accordions */}
        <Accordion type="multiple" className="space-y-2">
          {experience.responsibilities && experience.responsibilities.length > 0 && (
            <AccordionItem value="responsibilities" className="border border-border rounded-lg px-4 bg-card/50">
              <AccordionTrigger className="hover:no-underline text-foreground font-semibold">
                Key Responsibilities
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-muted-foreground">
                  {experience.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="flex-1">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}

          {experience.skills && experience.skills.length > 0 && (
            <AccordionItem value="skills" className="border border-border rounded-lg px-4 bg-card/50">
              <AccordionTrigger className="hover:no-underline text-foreground font-semibold">
                Skills & Technologies
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>

        {/* CTA */}
        {experience.link && (
          <div className="pt-4 border-t border-border">
            <Button asChild className="w-full sm:w-auto">
              <a href={experience.link} target="_blank" rel="noopener noreferrer">
                Learn More
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
