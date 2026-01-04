"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import type { CardData } from "@/data/portfolio-data"

interface ExperiencePanelProps {
  experience: CardData
  onClose: () => void
}

export function ExperiencePanel({ experience, onClose }: ExperiencePanelProps) {
  const companyName = experience.subtitle.split(",")[0].trim()
  const location = experience.location || experience.subtitle.split(",").pop()?.trim()
  const isXLMedia = experience.imageUrl?.includes("xlmedia-logo.png")

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6 md:space-y-8"
    >
      {/* Experience Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-serif leading-none">
            {experience.title}
          </h1>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 overflow-hidden">
          {experience.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-muted text-muted-foreground text-sm font-sans rounded-full whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Company Info Card */}
      <div className="relative overflow-hidden rounded-lg bg-card p-6">
        <div className="flex items-center gap-4">
          {experience.imageUrl ? (
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-xl overflow-hidden border border-border ${
                isXLMedia ? "bg-white p-1.5" : "bg-muted/50"
              }`}
            >
              <img
                src={experience.imageUrl || "/placeholder.svg"}
                alt={`${companyName} logo`}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-xl border border-primary/20">
              <span className="text-2xl font-bold text-primary">{companyName.charAt(0)}</span>
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">{companyName}</h2>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
              {location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {location}
                </span>
              )}
              {experience.dates && <span className="px-2 py-0.5 rounded-md bg-muted/50">{experience.dates}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4">
        <p className="text-base sm:text-lg text-foreground leading-relaxed font-sans">
          {experience.description.split("\n\n")[0]}
        </p>
      </div>
    </motion.div>
  )
}
