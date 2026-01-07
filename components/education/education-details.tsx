"use client"

import type { CardData } from "@/data/portfolio-data"
import { X } from "lucide-react"

interface EducationDetailsProps {
  education: CardData
  onClose: () => void
}

export function EducationDetails({ education, onClose }: EducationDetailsProps) {
  return (
    <div className="space-y-6 rounded-lg bg-card p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{education.title}</h2>
          <p className="text-lg text-muted-foreground">{education.subtitle}</p>
          {education.dates && <p className="text-sm text-muted-foreground">{education.dates}</p>}
          {education.location && <p className="text-sm text-muted-foreground">{education.location}</p>}
        </div>
        <button onClick={onClose} className="rounded-full p-2 hover:bg-muted transition-colors" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>

      {education.tags && education.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {education.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="prose prose-sm dark:prose-invert max-w-none">
        <div className="whitespace-pre-wrap text-foreground">{education.description}</div>
      </div>

      {education.link && (
        <a
          href={education.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Learn More
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      )}
    </div>
  )
}
