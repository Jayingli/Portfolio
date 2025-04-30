"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function TypingIndicator({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-1.5", className)}>
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="w-2 h-2 rounded-full bg-primary/70"
          initial={{ opacity: 0.5, y: 0 }}
          animate={{
            opacity: [0.5, 1, 0.5],
            y: ["0%", "-30%", "0%"],
          }}
          transition={{
            duration: 1.2,
            repeat: Number.POSITIVE_INFINITY,
            delay: dot * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
