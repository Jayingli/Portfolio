"use client"

import { motion } from "framer-motion"
import { CareerTimeline } from "./career-timeline"
import type { CardData } from "@/data/portfolio-data"

interface ChatCareerTimelineProps {
  experiences: CardData[]
  className?: string
}

export function ChatCareerTimeline({ experiences, className }: ChatCareerTimelineProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <CareerTimeline experiences={experiences} />
    </motion.div>
  )
}
