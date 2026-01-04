"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import type { Project } from "@/lib/types"

interface ProjectDetailsPanelProps {
  project: Project
}

export function ProjectDetailsPanel({ project }: ProjectDetailsPanelProps) {
  const [activeAccordion, setActiveAccordion] = useState<string>("what-i-brought")

  const toggleAccordion = (accordionId: string) => {
    setActiveAccordion(activeAccordion === accordionId ? "" : accordionId)
  }

  // Project-specific content based on the project
  const getProjectContent = (projectName: string) => {
    if (projectName === "Your New Website Here") {
      return {
        whatIBrought: [
          "I led the project from brand strategy through design and development.",
          "• Strategic discovery session to understand your unique business goals",
          "• Custom brand-aligned design system tailored to your industry",
          "• Mobile-first responsive development with modern web standards",
          "• Performance optimization for fast loading and smooth user experience",
          "• SEO foundation and Google Analytics setup for growth tracking",
        ],
        keyFeatures: [
          "The site reflects your brand personality while making it easy for customers to connect.",
          "• Custom design that reflects your brand personality and values",
          "• Mobile-responsive layout optimized for all devices and screen sizes",
          "• Fast loading times with 90+ Core Web Vitals performance scores",
          "• Search engine optimization for better visibility and organic traffic",
          "• Easy-to-use content management system for updates and maintenance",
        ],
      }
    }

    if (projectName === "Dr. Cat Wellness") {
      return {
        whatIBrought: [
          "I led the project from brand strategy through design and development.",
          "• Defined a calming, professional brand identity with wellness-focused aesthetics",
          "• Designed and built a responsive experience across desktop and mobile",
          "• Integrated Acuity Scheduling for seamless appointment booking",
          "• Optimized for performance with 90+ Core Web Vitals score",
          "• Ensured accessibility compliance and screen reader optimization",
        ],
        keyFeatures: [
          "The site reflects Dr. Cat's wellness expertise while making it easy for clients to book treatments.",
          "• Online appointment booking with service selection and pricing",
          "• Professional therapist bio showcasing credentials and approach",
          "• Service descriptions with detailed treatment information",
          "• Mobile-first responsive design for on-the-go booking",
          "• Fast loading times and smooth, trustworthy user experience",
        ],
      }
    }

    if (projectName === "Elixir1 Skincare Clinic") {
      return {
        whatIBrought: [
          "I led the project from brand strategy through design and development.",
          "• Defined a luxury brand identity with a gold and dark palette",
          "• Designed and built a responsive experience across desktop and mobile",
          "• Integrated booking and VISIA skin analysis systems seamlessly",
        ],
        keyFeatures: [
          "The site reflects Elixir1's premium medical aesthetics offering while making it easy for clients to book.",
          "• Online scheduling for treatments and VISIA analysis",
          "• Service pages with detailed treatment descriptions and brand partners",
          "• Mobile-first responsive design for a luxury, trustworthy experience",
        ],
      }
    }

    if (projectName === "M&A CAFE") {
      return {
        whatIBrought: [
          "I led the project from brand strategy through design and development.",
          "• Defined a warm, artisanal brand identity with sophisticated gold accents",
          "• Designed and built a responsive experience across desktop and mobile",
          "• Integrated online ordering system with Uber Eats connectivity",
          "• Created compelling coffee culture storytelling through visuals and copy",
        ],
        keyFeatures: [
          "The site reflects M&A's artisanal coffee culture while making it easy for customers to order.",
          "• Online menu browsing with detailed item descriptions",
          "• Integrated Uber Eats ordering system for seamless delivery",
          "• Gallery showcase highlighting coffee craftsmanship and food photography",
          "• Mobile-optimized design for on-the-go ordering and discovery",
          "• Brand storytelling that connects customers to the coffee experience",
        ],
      }
    }

    if (projectName === "BrowFix") {
      return {
        whatIBrought: [
          "I led the project from brand strategy through design and development.",
          "• Defined a clean, modern brand identity with soft pink accent palette",
          "• Designed and built a responsive experience across desktop and mobile",
          "• Integrated booking system for brow and lash appointments seamlessly",
          "• Optimized for fast mobile loading and local beauty service searches",
        ],
        keyFeatures: [
          "The site reflects BrowFix's premium beauty services while making it easy for clients to book.",
          "• Online booking system for brow and lash services with treatment details",
          "• Professional gallery showcasing before/after results and expertise",
          "• Service descriptions with pricing and treatment information",
          "• Mobile-first responsive design for effortless appointment scheduling",
          "• Fast loading times and smooth, professional user experience",
        ],
      }
    }

    // Default content for other projects
    return {
      whatIBrought: [
        "I led the project from brand strategy through design and development.",
        "• Custom design system tailored to brand identity",
        "• Mobile-first responsive development",
        "• SEO optimization and performance tuning",
        "• Content management system setup",
      ],
      keyFeatures: [
        "The site reflects your brand while making it easy for customers to connect.",
        "• Modern, clean design aesthetic",
        "• Fast loading and optimized performance",
        "• Mobile-responsive across all devices",
        "• Search engine optimized",
      ],
    }
  }

  const content = getProjectContent(project.name)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full space-y-3 min-h-[500px]"
    >
      {/* What I Brought to This Project */}
      <div className="w-full">
        <button
          onClick={() => toggleAccordion("what-i-brought")}
          className="relative w-full rounded-full bg-card text-card-foreground hover:bg-muted transition-colors duration-300 p-4 text-left overflow-hidden group data-[active=true]:bg-muted"
          data-active={activeAccordion === "what-i-brought"}
        >
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg lg:text-xl font-serif font-bold uppercase tracking-wide text-foreground group-hover:text-foreground/80 transition-colors">
                My Contributions
              </h3>
            </div>

            <motion.div
              animate={{ rotate: activeAccordion === "what-i-brought" ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </div>
        </button>

        <AnimatePresence>
          {activeAccordion === "what-i-brought" && (
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
                  {content.whatIBrought.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <p className="text-foreground text-sm lg:text-base leading-relaxed font-sans">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Key Features */}
      <div className="w-full">
        <button
          onClick={() => toggleAccordion("key-features")}
          className="relative w-full rounded-full bg-card text-card-foreground hover:bg-muted transition-colors duration-300 p-4 text-left overflow-hidden group data-[active=true]:bg-muted"
          data-active={activeAccordion === "key-features"}
        >
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg lg:text-xl font-serif font-bold uppercase tracking-wide text-foreground group-hover:text-foreground/80 transition-colors">
                Key Features
              </h3>
            </div>

            <motion.div
              animate={{ rotate: activeAccordion === "key-features" ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </div>
        </button>

        <AnimatePresence>
          {activeAccordion === "key-features" && (
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
                  {content.keyFeatures.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <p className="text-foreground text-sm lg:text-base leading-relaxed font-sans">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Want something like this? */}
      <div className="w-full">
        <button
          onClick={() => toggleAccordion("want-something-like-this")}
          className="relative w-full rounded-full bg-card text-card-foreground hover:bg-muted transition-colors duration-300 p-4 text-left overflow-hidden group data-[active=true]:bg-muted"
          data-active={activeAccordion === "want-something-like-this"}
        >
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg lg:text-xl font-serif font-bold uppercase tracking-wide text-foreground group-hover:text-foreground/80 transition-colors">
                Launch Your Vision
              </h3>
            </div>

            <motion.div
              animate={{ rotate: activeAccordion === "want-something-like-this" ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </div>
        </button>

        <AnimatePresence>
          {activeAccordion === "want-something-like-this" && (
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
                <div className="space-y-4">
                  <p className="text-foreground text-base lg:text-lg leading-relaxed font-sans">
                    Your business deserves a digital presence that matches its quality. From booking systems to brand
                    identity, I'll help you build a website that elevates your services and makes it easy for clients to
                    connect.
                  </p>

                  <p className="text-muted-foreground text-sm lg:text-base font-sans leading-relaxed">
                    Whether you need a complete website redesign, booking system integration, or performance
                    optimization, I'll work with you to create a solution that fits your brand and serves your
                    customers.
                  </p>

                  {/* Updated CTA Button */}
                  <div className="pt-4">
                    <button className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors">
                      Let's Discuss Your Project →
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
