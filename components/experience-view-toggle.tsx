"use client"
import { Button } from "@/components/ui/button"
import { Calendar, LayoutGrid } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ExperienceViewToggleProps {
  onViewChange: (view: "carousel" | "timeline") => void
  currentView: "carousel" | "timeline"
  className?: string
}

export function ExperienceViewToggle({ onViewChange, currentView, className }: ExperienceViewToggleProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <div className="bg-muted/30 p-1 rounded-full flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange("carousel")}
          className={cn(
            "relative h-8 rounded-full px-3",
            currentView === "carousel" ? "text-primary" : "text-muted-foreground",
          )}
        >
          {currentView === "carousel" && (
            <motion.div
              className="absolute inset-0 bg-white dark:bg-[#1e1e1e] rounded-full"
              layoutId="viewToggle"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <span className="flex items-center gap-1.5 z-10 relative">
            <LayoutGrid className="h-3.5 w-3.5" />
            <span className="text-xs">Cards</span>
          </span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange("timeline")}
          className={cn(
            "relative h-8 rounded-full px-3",
            currentView === "timeline" ? "text-primary" : "text-muted-foreground",
          )}
        >
          {currentView === "timeline" && (
            <motion.div
              className="absolute inset-0 bg-white dark:bg-[#1e1e1e] rounded-full"
              layoutId="viewToggle"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <span className="flex items-center gap-1.5 z-10 relative">
            <Calendar className="h-3.5 w-3.5" />
            <span className="text-xs">Timeline</span>
          </span>
        </Button>
      </div>
    </div>
  )
}
