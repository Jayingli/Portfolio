"use client"

import { useState } from "react"
import { Search, Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Sample methodology data
const methodologies = [
  {
    id: "agile",
    name: "Agile",
    description: "Iterative approach that delivers value through small, incremental changes.",
    strengths: ["Adaptability", "Customer collaboration", "Early delivery"],
    limitations: ["Less predictable", "Requires engaged stakeholders", "Documentation light"],
    bestFor: ["Software development", "Dynamic requirements", "Innovative projects"],
  },
  {
    id: "scrum",
    name: "Scrum",
    description: "Framework that helps teams work together with defined roles and ceremonies.",
    strengths: ["Clear roles", "Regular feedback", "Transparency"],
    limitations: ["Requires training", "Team size constraints", "Ceremony overhead"],
    bestFor: ["Cross-functional teams", "Product development", "Complex problem solving"],
  },
  {
    id: "waterfall",
    name: "Waterfall",
    description: "Linear sequential approach where progress flows downwards through phases.",
    strengths: ["Clear structure", "Detailed documentation", "Predictable timeline"],
    limitations: ["Inflexible to changes", "Late testing", "Delayed value delivery"],
    bestFor: ["Well-defined requirements", "Regulated industries", "Fixed scope projects"],
  },
  {
    id: "kanban",
    name: "Kanban",
    description: "Visual workflow management method that helps optimize the flow of value.",
    strengths: ["Visualizes workflow", "Limits work in progress", "Continuous delivery"],
    limitations: ["Less structured", "Requires discipline", "No timeboxing"],
    bestFor: ["Support teams", "Maintenance work", "Continuous flow processes"],
  },
]

// Filter options
const deliveryOptions = ["Iterative", "Incremental", "Sequential", "Continuous"]
const requirementsOptions = ["Fixed", "Evolving", "Minimal", "Detailed"]
const teamSizeOptions = ["Small (1-5)", "Medium (6-10)", "Large (11+)", "Distributed"]

export function MethodologyComparison() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDelivery, setSelectedDelivery] = useState<string[]>([])
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([])
  const [selectedTeamSize, setSelectedTeamSize] = useState<string[]>([])

  // Filter methodologies based on search term
  const filteredMethodologies = methodologies.filter((methodology) =>
    methodology.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="w-full">
      {/* Container with max-width and centered */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section with search and filters */}
        <div className="mb-8 space-y-4">
          <h1 className="text-2xl font-bold tracking-tight">Methodology Comparison</h1>

          {/* Search and filters container */}
          <div className="bg-card border rounded-lg p-4 sm:p-6">
            {/* Search bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search methodologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full"
              />
            </div>

            {/* Filters row - wraps on smaller screens */}
            <div className="flex flex-wrap gap-3">
              {/* Delivery Model Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Delivery Model
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {deliveryOptions.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option}
                      checked={selectedDelivery.includes(option)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedDelivery([...selectedDelivery, option])
                        } else {
                          setSelectedDelivery(selectedDelivery.filter((item) => item !== option))
                        }
                      }}
                    >
                      {option}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Requirements Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Requirements
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {requirementsOptions.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option}
                      checked={selectedRequirements.includes(option)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedRequirements([...selectedRequirements, option])
                        } else {
                          setSelectedRequirements(selectedRequirements.filter((item) => item !== option))
                        }
                      }}
                    >
                      {option}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Team Size Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Team Size
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {teamSizeOptions.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option}
                      checked={selectedTeamSize.includes(option)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTeamSize([...selectedTeamSize, option])
                        } else {
                          setSelectedTeamSize(selectedTeamSize.filter((item) => item !== option))
                        }
                      }}
                    >
                      {option}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Clear Filters Button */}
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedDelivery([])
                  setSelectedRequirements([])
                  setSelectedTeamSize([])
                  setSearchTerm("")
                }}
                className="ml-auto"
                disabled={
                  !searchTerm && !selectedDelivery.length && !selectedRequirements.length && !selectedTeamSize.length
                }
              >
                Clear filters
              </Button>
            </div>
          </div>
        </div>

        {/* Methodology cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredMethodologies.map((methodology) => (
            <Card key={methodology.id} className="h-full">
              <CardHeader>
                <CardTitle>{methodology.name}</CardTitle>
                <CardDescription>{methodology.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Strengths */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Strengths</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {methodology.strengths.map((strength) => (
                      <Badge key={strength} variant="secondary">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Limitations */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Limitations</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {methodology.limitations.map((limitation) => (
                      <Badge
                        key={limitation}
                        variant="outline"
                        className="border-red-200 text-red-600 dark:border-red-800 dark:text-red-400"
                      >
                        {limitation}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div>
                  <h4 className="text-sm font-medium mb-2">Best For</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    {methodology.bestFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
