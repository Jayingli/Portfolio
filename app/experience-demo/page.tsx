"use client"

import { ExperienceViewer } from "@/components/experience-viewer"
import { portfolioData } from "@/data/portfolio-data"

export default function ExperienceDemoPage() {
  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Professional Experience</h1>
      <ExperienceViewer experiences={portfolioData.experience} />
    </main>
  )
}
