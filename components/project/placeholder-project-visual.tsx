"use client"

import { motion } from "framer-motion"

interface PlaceholderProjectVisualProps {
  isHovered: boolean
}

export function PlaceholderProjectVisual({ isHovered }: PlaceholderProjectVisualProps) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-stone-200 to-stone-300 dark:from-stone-800 dark:via-stone-700 dark:to-stone-600 flex items-center justify-center overflow-hidden">
      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{ backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%" }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Center text */}
      <div className="relative z-10 text-center p-6">
        <motion.div animate={{ scale: isHovered ? 1.05 : 1 }} transition={{ duration: 0.3 }} className="space-y-2">
          <p className="text-4xl font-bold text-stone-700 dark:text-stone-300 font-serif">?</p>
          <p className="text-sm text-stone-600 dark:text-stone-400 font-sans">Your Project Here</p>
        </motion.div>
      </div>
    </div>
  )
}
