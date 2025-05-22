"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, LayoutGrid } from "lucide-react"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { ExperienceCards } from "@/components/experience-cards"
import type { CardData } from "@/data/portfolio-data"
import { cn } from "@/lib/utils"

interface ExperienceViewerProps {
  experiences: CardData[]
  className?: string
}

export function ExperienceViewer({ experiences, className }: ExperienceViewerProps) {
  const [activeView, setActiveView] = useState<"timeline" | "cards">("timeline")

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* View Toggle */}
      <div className="flex justify-center">
        <Tabs
          value={activeView}
          onValueChange={(value) => setActiveView(value as "timeline" | "cards")}
          className="w-full max-w-[300px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="cards" className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              <span>Cards</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* View Container */}
      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeView === "timeline" ? (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <ExperienceTimeline experiences={experiences} />
            </motion.div>
          ) : (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <ExperienceCards experiences={experiences} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
