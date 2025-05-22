"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExperienceCarousel } from "@/components/experience-carousel"
import { CareerTimeline } from "@/components/career-timeline"
import { portfolioData } from "@/data/portfolio-data"
import { Calendar, LayoutGrid } from "lucide-react"

export default function CareerProgressionPage() {
  const [activeTab, setActiveTab] = useState("carousel")

  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Work Experience</h1>

      <Tabs defaultValue="carousel" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="carousel" className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            <span>Card View</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Timeline</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="carousel" className="mt-0">
          <ExperienceCarousel experiences={portfolioData.experience} />
        </TabsContent>

        <TabsContent value="timeline" className="mt-0">
          <CareerTimeline experiences={portfolioData.experience} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
