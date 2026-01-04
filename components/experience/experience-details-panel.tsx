"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import type { CardData } from "@/data/portfolio-data"

interface ExperienceDetailsPanelProps {
  experience: CardData
}

export function ExperienceDetailsPanel({ experience }: ExperienceDetailsPanelProps) {
  const [activeAccordion, setActiveAccordion] = useState<string>("responsibilities")

  const toggleAccordion = (accordionId: string) => {
    setActiveAccordion(activeAccordion === accordionId ? "" : accordionId)
  }

  // Parse description into bullet points
  const responsibilities = experience.description.split("\n\n").filter((point) => point.trim().length > 0)

  // Group tags by category
  const roleSkills =
    experience.tags?.filter(
      (tag) =>
        tag.includes("Manager") ||
        tag.includes("Scrum") ||
        tag.includes("Agile") ||
        tag.includes("Lead") ||
        tag.includes("Owner"),
    ) || []

  const technicalSkills =
    experience.tags?.filter(
      (tag) =>
        tag.includes("Tech") ||
        tag.includes("SQL") ||
        tag.includes("API") ||
        tag.includes("SaaS") ||
        tag.includes("Infrastructure") ||
        tag.includes("Data"),
    ) || []

  const tools =
    experience.tags?.filter(
      (tag) =>
        tag.includes("Jira") ||
        tag.includes("Asana") ||
        tag.includes("Monday") ||
        tag.includes("GTM") ||
        tag.includes("GA4") ||
        tag.includes("Confluence"),
    ) || []

  const hasSkills = roleSkills.length > 0 || technicalSkills.length > 0 || tools.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full space-y-3 min-h-[400px]"
    >
      {/* Key Responsibilities */}
      <div className="w-full">
        <button
          onClick={() => toggleAccordion("responsibilities")}
          className="relative w-full rounded-full bg-card text-card-foreground hover:bg-muted transition-colors duration-300 p-4 text-left overflow-hidden group data-[active=true]:bg-muted"
          data-active={activeAccordion === "responsibilities"}
        >
          <div className="relative z-10 flex items-center justify-between">
            <h3 className="text-lg lg:text-xl font-serif font-bold uppercase tracking-wide text-foreground group-hover:text-foreground/80 transition-colors">
              Key Responsibilities
            </h3>
            <motion.div
              animate={{ rotate: activeAccordion === "responsibilities" ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </div>
        </button>

        <AnimatePresence>
          {activeAccordion === "responsibilities" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.4, ease: "easeInOut" },
                opacity: { duration: 0.3, ease: "easeInOut" },
              }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="pt-4 pb-6 px-4 min-h-[160px]"
              >
                <div className="space-y-3">
                  {responsibilities.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-primary mt-1">•</span>
                      <p className="text-foreground text-sm lg:text-base leading-relaxed font-sans">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skills & Technologies */}
      {hasSkills && (
        <div className="w-full">
          <button
            onClick={() => toggleAccordion("skills")}
            className="relative w-full rounded-full bg-card text-card-foreground hover:bg-muted transition-colors duration-300 p-4 text-left overflow-hidden group data-[active=true]:bg-muted"
            data-active={activeAccordion === "skills"}
          >
            <div className="relative z-10 flex items-center justify-between">
              <h3 className="text-lg lg:text-xl font-serif font-bold uppercase tracking-wide text-foreground group-hover:text-foreground/80 transition-colors">
                Skills & Technologies
              </h3>
              <motion.div
                animate={{ rotate: activeAccordion === "skills" ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </div>
          </button>

          <AnimatePresence>
            {activeAccordion === "skills" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.4, ease: "easeInOut" },
                  opacity: { duration: 0.3, ease: "easeInOut" },
                }}
                className="overflow-hidden"
              >
                <motion.div
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  exit={{ y: -20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="pt-4 pb-6 px-4 min-h-[160px] space-y-4"
                >
                  {roleSkills.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                        Role & Methodology
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {roleSkills.map((skill) => (
                          <span key={skill} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {technicalSkills.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                        Technical
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {technicalSkills.map((skill) => (
                          <span key={skill} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {tools.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {tools.map((tool) => (
                          <span key={tool} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}
