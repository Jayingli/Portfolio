"use client"

import type { CardData } from "@/data/portfolio-data"
import { X } from "lucide-react"

interface SkillDetailsProps {
  skill: CardData
  onClose: () => void
}

export function SkillDetails({ skill, onClose }: SkillDetailsProps) {
  return (
    <div className="space-y-6 rounded-lg bg-card p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{skill.title}</h2>
          <p className="text-lg text-muted-foreground">{skill.subtitle}</p>
        </div>
        <button onClick={onClose} className="rounded-full p-2 hover:bg-muted transition-colors" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>

      {skill.tags && skill.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skill.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="prose prose-sm dark:prose-invert max-w-none">
        <div className="whitespace-pre-wrap text-foreground">{skill.description}</div>
      </div>
    </div>
  )
}
