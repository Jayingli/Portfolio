"use client"

import type { CardData } from "@/data/portfolio-data"

interface EducationCardProps {
  education: CardData
  onClick: () => void
}

export function EducationCard({ education, onClick }: EducationCardProps) {
  return (
    <button
      onClick={onClick}
      className="group flex items-start gap-4 rounded-lg bg-card p-4 text-left transition-all hover:bg-card/80 hover:ring-2 hover:ring-primary min-w-[280px] max-w-[320px]"
    >
      <div className="flex-1 space-y-1">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{education.title}</h3>
        <p className="text-sm text-muted-foreground">{education.subtitle}</p>
        {education.dates && <p className="text-xs text-muted-foreground">{education.dates}</p>}
      </div>
      <svg
        className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )
}
