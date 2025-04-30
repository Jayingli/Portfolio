"use client"

import type { ReactNode } from "react"

interface MotionWrapperProps {
  children: ReactNode
  className?: string
  delay?: number
  index?: number
  id?: string
}

// Simplified version without Framer Motion
export function MotionWrapper({ children, className, id }: MotionWrapperProps) {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  )
}
