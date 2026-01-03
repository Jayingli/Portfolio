"use client"

import { Input } from "@/components/ui/input"

import { useState, useRef, useEffect, useCallback } from "react"
import type { Message } from "ai"
import { ChatSuggestions } from "@/components/chat-suggestions"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, Map, Send } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback } from "@/components/avatar-fallback"
import { TypingIndicator } from "@/components/typing-indicator"
import { ChatExperienceSection } from "@/components/chat-experience-section"
import { CardCarousel } from "@/components/card-carousel"
import CardExpanded from "@/components/card-expanded"
import type { PortfolioData, CardType, CardData } from "@/data/portfolio-data"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { customResponses } from "@/data/custom-responses"

// Removed redundant 'interface Message' definition here as it's likely shadowed by the import from 'ai'
// If the imported 'Message' from 'ai' is insufficient, a different name should be used, e.g., 'ChatMessage'

interface ChatInterfaceProps {
  portfolioData: PortfolioData
}

const journeySteps: { topic: CardType; question: string; intro: string }[] = [
  {
    topic: "experience",
    question: "Tell me about your work experience",
    intro: "Let's start with my professional journey. Here's where I've worked and what I've accomplished:",
  },
  {
    topic: "skills",
    question: "What are your key skills?",
    intro: "Throughout my career, I've developed a diverse set of skills. Here's what I bring to the table:",
  },
  {
    topic: "projects",
    question: "Show me your projects",
    intro: "I love building things. Here are some projects I'm proud of:",
  },
  {
    topic: "certifications",
    question: "What certifications do you have?",
    intro: "Continuous learning is important to me. Here are my certifications:",
  },
  {
    topic: "education",
    question: "Tell me about your education",
    intro: "Here's my educational background:",
  },
  {
    topic: "volunteering",
    question: "What community involvement do you have?",
    intro: "Giving back to the community matters to me. Here's how I've contributed:",
  },
]

export function ChatInterface({ portfolioData }: ChatInterfaceProps) {
  const [chatMode, setChatMode] = useState<"selecting" | "explore" | "journey" | null>(null)
  const [journeyStep, setJourneyStep] = useState(0)
  const [isJourneyComplete, setIsJourneyComplete] = useState(false)

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [activeSection, setActiveSection] = useState<CardType | null>(null)
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const activeCardRef = useRef<HTMLDivElement>(null)
  const inputAreaRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useMobile()
  const [exploredTopics, setExploredTopics] = useState<Set<CardType>>(new Set())
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentQuery, setCurrentQuery] = useState<string>("")
  const [isTyping, setIsTyping] = useState(false)
  const [showFollowUp, setShowFollowUp] = useState(false)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const [inputAreaHeight, setInputAreaHeight] = useState(0)
  const [useAI, setUseAI] = useState(true)
  const { toast } = useToast()
  const [isSpeaking, setIsSpeaking] = useState(false)
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    setChatMode("selecting")
  }, [])

  const handleModeSelect = (mode: "explore" | "journey") => {
    setChatMode(mode)

    if (mode === "explore") {
      // Free exploration mode - show welcome message
      setMessages([
        {
          id: "1",
          content:
            "Hi there! I'm Jay—welcome to my interactive portfolio.\nYou can ask about my experience, skills, projects, certifications, education, or community involvement—or just click a quick prompt below to get started.\n\nCurious about what I've built, where I've studied, or how I've made an impact? Just ask.",
          sender: "bot",
        },
      ])

      // Show follow-up after delay
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: "follow-up",
            content: "",
            sender: "bot",
            isFollowUp: true,
          },
        ])
        setShowFollowUp(true)
      }, 3000)
    } else {
      // Guided journey mode - start the tour
      startJourney()
    }
  }

  const startJourney = () => {
    const firstStep = journeySteps[0]
    setMessages([
      {
        id: "journey-intro",
        content:
          "Welcome! Let me take you through my professional journey. I'll walk you through my experience, skills, projects, and more. Let's begin!",
        sender: "bot",
      },
    ])

    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setActiveSection(firstStep.topic)
        setExploredTopics(new Set([firstStep.topic]))
        setMessages((prev) => [
          ...prev,
          {
            id: `journey-${firstStep.topic}`,
            content: firstStep.intro,
            sender: "bot",
            cardType: firstStep.topic,
          },
        ])
      }, 1200)
    }, 1500)
  }

  const continueJourney = () => {
    const nextStepIndex = journeyStep + 1

    if (nextStepIndex >= journeySteps.length) {
      // Journey complete
      setIsJourneyComplete(true)
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            id: "journey-complete",
            content:
              "That's my story! Thanks for taking the time to learn about me. Feel free to ask any questions or explore more on your own.",
            sender: "bot",
          },
        ])
      }, 1200)
      return
    }

    setJourneyStep(nextStepIndex)
    const nextStep = journeySteps[nextStepIndex]

    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setActiveSection(nextStep.topic)
      setExploredTopics((prev) => new Set([...prev, nextStep.topic]))
      setMessages((prev) => [
        ...prev,
        {
          id: `journey-${nextStep.topic}`,
          content: nextStep.intro,
          sender: "bot",
          cardType: nextStep.topic,
        },
      ])
    }, 1200)
  }

  // Calculate the height of the fixed bottom section (suggestions + input)
  const bottomSectionHeight = isMobile ? 120 : 160

  // Modify the scrollToBottom function to prevent auto-scrolling on initial load
  const scrollToBottom = () => {
    // Only auto-scroll if not on initial load and if we're not at the very beginning
    if (initialLoadComplete && messagesEndRef.current && messages.length > 2) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Measure the input area height for proper padding
  useEffect(() => {
    if (inputAreaRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (inputAreaRef.current) {
          const height = inputAreaRef.current.offsetHeight
          setInputAreaHeight(height)
        }
      })

      resizeObserver.observe(inputAreaRef.current)
      return () => resizeObserver.disconnect()
    }
  }, [])

  // Check if OpenAI API is configured on initial load
  useEffect(() => {
    const checkApiConfig = async () => {
      try {
        const response = await fetch("/api/chat/config", {
          method: "GET",
        }).catch(() => null)

        if (response && response.ok) {
          const data = await response.json()
          setUseAI(data.configured)
        } else {
          // If we can't check or the endpoint doesn't exist, default to basic responses
          setUseAI(false)
        }
      } catch (error) {
        console.error("Failed to check API configuration:", error)
        setUseAI(false)
      }
    }

    // Check if OpenAI API is configured
    checkApiConfig()
  }, [])

  // Mark initial load as complete after component mounts, but prevent auto-scrolling
  useEffect(() => {
    // Set a small delay to ensure the DOM is fully rendered
    const timer = setTimeout(() => {
      setInitialLoadComplete(true)

      // Reset any scroll position
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0)

        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = 0
        }
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Show follow-up message after 3 seconds (only in explore mode)
  useEffect(() => {
    if (chatMode === "explore") {
      const timer = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: "follow-up",
            content: "", // Content will be rendered directly in the component
            sender: "bot",
            isFollowUp: true,
          },
        ])
        setShowFollowUp(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [chatMode])

  // Scroll to the active card when it changes, but only after initial load and with a delay
  useEffect(() => {
    if (!initialLoadComplete) return

    // Add a longer delay to ensure the UI is stable before scrolling
    const timer = setTimeout(() => {
      if (activeCardRef.current) {
        activeCardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      } else if (messages.length > 2) {
        // Only scroll to bottom if we have more than initial messages
        scrollToBottom()
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [messages, activeSection, initialLoadComplete])

  // Handle scroll events to show/hide the top overlay
  useEffect(() => {
    const messagesContainer = messagesContainerRef.current
    if (!messagesContainer) return

    const handleScroll = () => {
      setIsScrolled(messagesContainer.scrollTop > 10)
    }

    messagesContainer.addEventListener("scroll", handleScroll)
    return () => {
      messagesContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Force scroll to top on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0)

      // Also reset any scroll position in the messages container
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = 0
      }
    }
  }, [])

  // Add this inside the ChatInterface component, with the other useEffect hooks
  useEffect(() => {
    const handleCardClick = (e: Event) => {
      const customEvent = e as CustomEvent<CardData>
      if (customEvent.detail) {
        handleCardClick(customEvent.detail)
      }
    }

    window.addEventListener("cardClick", handleCardClick as EventListener)

    return () => {
      window.removeEventListener("cardClick", handleCardClick as EventListener)
    }
  }, [])

  // Text-to-speech setup
  useEffect(() => {
    if ("speechSynthesis" in window) {
      speechSynthesisRef.current = window.speechSynthesis
    } else {
      toast({
        title: "Speech Synthesis Not Supported",
        description: "Your browser does not support text-to-speech. Please use a different browser.",
        variant: "destructive",
      })
    }
  }, [toast])

  const speak = useCallback(
    (text: string) => {
      if (!speechSynthesisRef.current) return

      // Stop any ongoing speech
      speechSynthesisRef.current.cancel()

      utteranceRef.current = new SpeechSynthesisUtterance(text)
      utteranceRef.current.rate = 0.9 // Adjust speech rate
      utteranceRef.current.pitch = 1 // Adjust speech pitch
      utteranceRef.current.volume = 1 // Adjust speech volume

      utteranceRef.current.onstart = () => {
        setIsSpeaking(true)
      }
      utteranceRef.current.onend = () => {
        setIsSpeaking(false)
        utteranceRef.current = null
      }
      utteranceRef.current.onerror = (event) => {
        console.error("SpeechSynthesisUtterance Error:", event)
        setIsSpeaking(false)
        utteranceRef.current = null
      }

      speechSynthesisRef.current.speak(utteranceRef.current)
    },
    [setIsSpeaking, speechSynthesisRef, utteranceRef],
  )

  const stopSpeaking = () => {
    if (speechSynthesisRef.current && utteranceRef.current) {
      speechSynthesisRef.current.cancel()
      setIsSpeaking(false)
      utteranceRef.current = null
    }
  }

  // Determine which card type to show based on the query
  const getCardTypeFromQuery = (query: string): CardType | null => {
    const lowercaseQuery = query.toLowerCase()

    if (
      lowercaseQuery.includes("experience") ||
      lowercaseQuery.includes("work") ||
      lowercaseQuery.includes("job") ||
      lowercaseQuery.includes("career")
    ) {
      return "experience"
    }

    if (
      lowercaseQuery.includes("skill") ||
      lowercaseQuery.includes("abilities") ||
      lowercaseQuery.includes("capable") ||
      lowercaseQuery.includes("can do") ||
      lowercaseQuery.includes("technologies") ||
      lowercaseQuery.includes("tech stack") ||
      lowercaseQuery.includes("programming") ||
      lowercaseQuery.includes("tools")
    ) {
      return "skills"
    }

    if (
      lowercaseQuery.includes("project") ||
      lowercaseQuery.includes("portfolio") ||
      lowercaseQuery.includes("built") ||
      lowercaseQuery.includes("created") ||
      lowercaseQuery.includes("technologies") ||
      lowercaseQuery.includes("tech stack") ||
      lowercaseQuery.includes("tech used") ||
      lowercaseQuery.includes("tools used")
    ) {
      return "projects"
    }

    if (
      lowercaseQuery.includes("certification") ||
      lowercaseQuery.includes("certificate") ||
      lowercaseQuery.includes("credential") ||
      lowercaseQuery.includes("qualified")
    ) {
      return "certifications"
    }

    if (
      lowercaseQuery.includes("education") ||
      lowercaseQuery.includes("study") ||
      lowercaseQuery.includes("degree") ||
      lowercaseQuery.includes("school") ||
      lowercaseQuery.includes("university") ||
      lowercaseQuery.includes("college")
    ) {
      return "education"
    }

    // Make volunteering detection more specific and prioritized
    if (
      lowercaseQuery.includes("volunteer") ||
      lowercaseQuery.includes("volunteering") ||
      lowercaseQuery.includes("community service") ||
      lowercaseQuery.includes("charity work") ||
      lowercaseQuery.includes("food bank") ||
      lowercaseQuery.includes("vaccine ambassador") ||
      lowercaseQuery.includes("community involvement")
    ) {
      return "volunteering"
    }

    return null
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
    }

    setMessages((prev) => [...prev, newUserMessage])
    setCurrentQuery(input)
    setInput("")
    setIsTyping(true)

    if (useAI) {
      // Use AI-powered response via API route
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        })

        // Check if the response is ok before trying to parse JSON
        if (!response.ok) {
          const errorText = await response.text().catch(() => "Unknown error")
          throw new Error(`API responded with status: ${response.status}. ${errorText}`)
        }

        // Try to parse the JSON response
        let data
        try {
          data = await response.json()
        } catch (jsonError) {
          console.error("Failed to parse JSON response:", jsonError)
          throw new Error("Invalid response format from server")
        }

        setTimeout(() => {
          setIsTyping(false)

          // Determine if we should show a card based on the query
          const cardType = getCardTypeFromQuery(input)
          if (cardType) {
            setActiveSection(cardType)
            setExploredTopics((prev) => new Set([...prev, cardType]))
          }

          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              content: data.message || "I received your message but couldn't generate a proper response.",
              sender: "bot",
              cardType: cardType || undefined,
              isAiResponse: true,
            },
          ])
        }, 1200)
      } catch (error) {
        console.error("Error getting AI response:", error)

        // Fall back to non-AI response
        setTimeout(() => {
          setIsTyping(false)

          // Show error message
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              content: "I'm having trouble with my AI capabilities right now. Let me use my basic responses instead.",
              sender: "bot",
              isAiResponse: false,
            },
          ])

          // Switch to basic responses and process the input again
          setUseAI(false)

          // Process with basic responses after a short delay
          setTimeout(() => {
            processBasicResponse(input)
          }, 1000)
        }, 1200)
      }
    } else {
      // Use predefined responses (original behavior)
      setTimeout(() => {
        processBasicResponse(input)
      }, 500)
    }
  }

  // Extracted the basic response logic to a separate function for reuse
  const processBasicResponse = (userInput: string) => {
    const lowercaseInput = userInput.toLowerCase()
    let responseMessage: Message

    // Direct check for volunteering to prioritize it
    if (
      lowercaseInput.includes("volunteer") ||
      lowercaseInput.includes("volunteering") ||
      lowercaseInput.includes("community involvement")
    ) {
      responseMessage = {
        id: Date.now().toString(),
        content: "Here's my community involvement and volunteering experience:",
        sender: "bot",
        cardType: "volunteering",
      }
      setActiveSection("volunteering")
      setExploredTopics((prev) => new Set([...prev, "volunteering"]))
    }
    // Check for custom responses
    else {
      // Find a matching custom response by checking if any of the keywords match
      const matchedResponse = customResponses.find((item) =>
        item.keywords.some((keyword) => lowercaseInput.includes(keyword.toLowerCase())),
      )

      if (matchedResponse) {
        // Determine if this custom response should show a specific card type
        const cardType = getCardTypeFromQuery(userInput)

        responseMessage = {
          id: Date.now().toString(),
          content: matchedResponse.response,
          sender: "bot",
          cardType: cardType || undefined, // Use the detected card type or undefined
        }

        if (cardType) {
          setActiveSection(cardType)
          setExploredTopics((prev) => new Set([...prev, cardType]))
        }
      } else if (
        lowercaseInput.includes("technologies") ||
        lowercaseInput.includes("tech stack") ||
        lowercaseInput.includes("tools used") ||
        (lowercaseInput.includes("use") && lowercaseInput.includes("project"))
      ) {
        responseMessage = {
          id: Date.now().toString(),
          content: "Here are the technologies I've used in my projects:",
          sender: "bot",
          cardType: "projects",
        }
        setActiveSection("projects")
        setExploredTopics((prev) => new Set([...prev, "projects"]))
      } else if (lowercaseInput.includes("experience") || lowercaseInput.includes("work")) {
        responseMessage = {
          id: Date.now().toString(),
          content: "Here's my professional experience:",
          sender: "bot",
          cardType: "experience",
        }
        setActiveSection("experience")
        setExploredTopics((prev) => new Set([...prev, "experience"]))
      } else if (
        lowercaseInput.includes("skills") ||
        lowercaseInput.includes("abilities") ||
        lowercaseInput.includes("top skills")
      ) {
        responseMessage = {
          id: Date.now().toString(),
          content: "Here are my skills:",
          sender: "bot",
          cardType: "skills",
        }
        setActiveSection("skills")
        setExploredTopics((prev) => new Set([...prev, "skills"]))
      } else if (
        lowercaseInput.includes("projects") ||
        lowercaseInput.includes("portfolio") ||
        lowercaseInput.includes("latest project")
      ) {
        responseMessage = {
          id: Date.now().toString(),
          content: "Here are some projects I've worked on:",
          sender: "bot",
          cardType: "projects",
        }
        setActiveSection("projects")
        setExploredTopics((prev) => new Set([...prev, "projects"]))
      } else if (lowercaseInput.includes("certifications") || lowercaseInput.includes("certificates")) {
        responseMessage = {
          id: Date.now().toString(),
          content: "Here are my certifications:",
          sender: "bot",
          cardType: "certifications",
        }
        setActiveSection("certifications")
        setExploredTopics((prev) => new Set([...prev, "certifications"]))
      } else if (
        lowercaseInput.includes("education") ||
        lowercaseInput.includes("study") ||
        lowercaseInput.includes("degree") ||
        lowercaseInput.includes("school") ||
        lowercaseInput.includes("university") ||
        lowercaseInput.includes("studied")
      ) {
        responseMessage = {
          id: Date.now().toString(),
          content: "Here's my educational background:",
          sender: "bot",
          cardType: "education",
        }
        setActiveSection("education")
        setExploredTopics((prev) => new Set([...prev, "education"]))
      } else if (
        lowercaseInput.includes("community") ||
        lowercaseInput.includes("charity") ||
        lowercaseInput.includes("impact")
      ) {
        responseMessage = {
          id: Date.now().toString(),
          content: "Here's my community involvement and volunteering experience:",
          sender: "bot",
          cardType: "volunteering",
        }
        setActiveSection("volunteering")
        setExploredTopics((prev) => new Set([...prev, "volunteering"]))
      } else {
        responseMessage = {
          id: Date.now().toString(),
          content:
            "I can tell you about my experience, skills, projects, certifications, education, or community involvement. What would you like to know?",
          sender: "bot",
        }
      }
    }

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [...prev, responseMessage])
    }, 1200)
  }

  const handleSuggestionClick = (suggestion: string, topic: CardType) => {
    // If this topic has already been explored, just return to it
    if (exploredTopics.has(topic)) {
      handleReturnToConversation(topic)
      return
    }

    // Otherwise, generate a new conversation about it
    setInput(suggestion)
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }

  const handleCardClick = (card: CardData) => {
    // If it's a project card with a link, open the link in a new tab
    if (card.type === "projects" && card.link) {
      window.open(card.link, "_blank", "noopener,noreferrer")
      return
    }

    // Otherwise, show the modal for other card types
    setSelectedCard(card)
  }

  const handleReturnToConversation = (topic: CardType) => {
    setActiveSection(topic)

    // Find the last message with this topic
    const lastMessageWithTopic = [...messages].reverse().find((m) => m.cardType === topic)

    if (lastMessageWithTopic) {
      // Scroll to that message
      const messageElement = document.getElementById(`message-${lastMessageWithTopic.id}`)
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: "smooth", block: "center" })
        return
      }
    }

    // If we can't find the message, add a new one
    const returnMessage: Message = {
      id: Date.now().toString(),
      content: `Returning to our conversation about my ${topic}:`,
      sender: "bot",
      cardType: topic,
    }

    setMessages((prev) => [...prev, returnMessage])
  }

  // Text streaming animation component
  const StreamingText = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState("")
    const [isComplete, setIsComplete] = useState(false)
    const hasAnimated = useRef(false)

    useEffect(() => {
      // Only animate once
      if (hasAnimated.current) {
        setDisplayedText(text)
        setIsComplete(true)
        return
      }

      hasAnimated.current = true
      let index = 0
      setDisplayedText("")
      setIsComplete(false)

      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text.charAt(index))
          index++
        } else {
          clearInterval(interval)
          setIsComplete(true)
        }
      }, 15) // Speed of character reveal

      return () => clearInterval(interval)
    }, [text])

    return (
      <span>
        {displayedText}
        {!isComplete && <span className="animate-pulse">|</span>}
      </span>
    )
  }

  // Function to render cards (used by both CardCarousel and ChatExperienceSection)
  const renderCards = (message: Message, index: number, onFirstCardClick: () => void, hidePagination: boolean) => {
    const cardsToShow = message.cardType ? portfolioData[message.cardType] : []

    if (!cardsToShow || cardsToShow.length === 0) {
      return null
    }

    return (
      <div ref={message.id === messages[messages.length - 1]?.id ? activeCardRef : null}>
        {message.cardType === "experience" ? (
          <ChatExperienceSection
            experiences={cardsToShow}
            onCardClick={handleCardClick}
            hidePagination={hidePagination}
          />
        ) : (
          <CardCarousel cards={cardsToShow} onCardClick={handleCardClick} hidePagination={false} />
        )}
      </div>
    )
  }

  if (chatMode === "selecting") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-background px-6">
        <div className="flex flex-col items-center w-full max-w-[320px]">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Avatar className="w-20 h-20 ring-2 ring-border/50">
              <AvatarFallback />
            </Avatar>
          </motion.div>

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-center mb-10"
          >
            <h1 className="text-2xl font-semibold text-foreground mb-2">Hi, I'm Jay</h1>
            <p className="text-muted-foreground text-sm max-w-[280px]">
              Welcome to my interactive portfolio. How would you like to explore?
            </p>
          </motion.div>

          {/* Options - Clean list style */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full space-y-3"
          >
            <button
              onClick={() => handleModeSelect("explore")}
              className="group w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-border/60 bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-medium text-foreground">Ask Anything</span>
                  <span className="block text-xs text-muted-foreground">Explore freely on your own</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Option 2: Jay's Journey */}
            <button
              onClick={() => handleModeSelect("journey")}
              className="group w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-border/60 bg-card/50 hover:bg-card hover:border-emerald-500/30 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Map className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-medium text-foreground">Jay's Journey</span>
                  <span className="block text-xs text-muted-foreground">Guided tour</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
            </button>
          </motion.div>

          {/* Subtle hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 text-xs text-muted-foreground/60"
          >
            Pick one to get started
          </motion.p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex flex-col w-full max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto h-[calc(100vh-40px)] mb-0 relative"
      style={{
        paddingTop: "env(safe-area-inset-top, 1rem)",
      }}
    >
      <div
        className={cn("bg-card rounded-2xl shadow-sm overflow-hidden relative flex-1", "transition-all duration-300")}
        style={{
          marginTop: isMobile ? "env(safe-area-inset-top, 1rem)" : "0",
        }}
      >
        <div className="relative h-full flex flex-col">
          {isScrolled && (
            <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none transition-opacity duration-300">
              <div
                className="w-full h-20 bg-gradient-to-b from-background/90 via-background/60 to-transparent rounded-t-2xl overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                }}
              />
            </div>
          )}

          <div
            ref={messagesContainerRef}
            className="overflow-y-auto w-full relative z-10 flex-1"
            style={{
              paddingBottom: `${inputAreaHeight + 16}px`, // Dynamic padding based on input area height
              paddingTop: isMobile ? "env(safe-area-inset-top, 1rem)" : "0.5rem",
              scrollBehavior: "auto", // Ensure smooth scrolling doesn't interfere with initial position
            }}
          >
            <div className="p-4 pt-6 sm:pt-4 space-y-6">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    className="space-y-4"
                    // Remove animation from this wrapper to prevent re-animation on scroll
                  >
                    <div
                      id={`message-${message.id}`}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-2`}
                    >
                      {message.sender === "bot" && (
                        <motion.div
                          className="w-12 h-12 sm:w-14 sm:h-14 mr-4 rounded-full overflow-hidden flex items-center justify-center bg-transparent"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <AvatarFallback />
                        </motion.div>
                      )}

                      <motion.div
                        className={cn(
                          "max-w-[85%] p-4 rounded-3xl",
                          message.sender === "user"
                            ? "bg-[#0066ff] text-white rounded-br-lg"
                            : "bg-[#f0f2f5] dark:bg-[#2a2a2a] text-foreground rounded-bl-lg",
                          message.isFollowUp ? "text-muted-foreground italic" : "",
                        )}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                        }}
                      >
                        <div className="flex flex-col gap-2">
                          {message.isAiResponse ? (
                            <p className="text-sm sm:text-base whitespace-pre-line leading-relaxed m-0 p-0">
                              <StreamingText text={message.content} />
                            </p>
                          ) : message.isFollowUp ? (
                            <p className="text-sm sm:text-base leading-relaxed m-0 p-0">
                              Not sure where to begin? Try asking:{" "}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleSuggestionClick("Tell me about your work experience", "experience")
                                }
                                className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted inline-flex mx-1 my-1 px-2 py-1 h-auto"
                              >
                                "Tell me about your work experience"
                              </Button>{" "}
                              or{" "}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSuggestionClick("Show me your projects", "projects")}
                                className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted inline-flex mx-1 my-1 px-2 py-1 h-auto"
                              >
                                "Show me your projects"
                              </Button>
                            </p>
                          ) : (
                            <p className="text-sm sm:text-base whitespace-pre-line leading-relaxed m-0 p-0">
                              {message.content}
                            </p>
                          )}

                          {/* Journey progress indicator now inline with Continue button, separate from carousel pagination */}
                          {chatMode === "journey" && message.cardType && !isJourneyComplete && (
                            <div className="flex items-center justify-between mt-3 gap-3">
                              <div className="flex items-center gap-1.5">
                                {journeySteps.map((step, index) => (
                                  <div
                                    key={step.topic}
                                    className={cn(
                                      "w-1.5 h-1.5 rounded-full transition-all duration-300",
                                      index <= journeyStep ? "bg-[#10b981]" : "bg-muted-foreground/30",
                                    )}
                                  />
                                ))}
                                <span className="text-xs text-muted-foreground ml-1">
                                  {journeyStep + 1}/{journeySteps.length}
                                </span>
                              </div>
                              <Button
                                onClick={continueJourney}
                                className="rounded-full bg-[#10b981] hover:bg-[#059669] text-white text-sm px-4"
                              >
                                {journeyStep < journeySteps.length - 1 ? "Continue Journey" : "Finish Journey"}
                              </Button>
                            </div>
                          )}

                          {/* Quick suggestion pills - only show for regular bot messages (not follow-ups) and in explore mode */}
                          {chatMode === "explore" && message.sender === "bot" && !isTyping && !message.isFollowUp && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {message.cardType === "experience" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSuggestionClick("Skills at Noise Digital?", "skills")}
                                    className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted"
                                  >
                                    Skills at Noise Digital?
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSuggestionClick("Show me your projects", "projects")}
                                    className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted"
                                  >
                                    See projects
                                  </Button>
                                </>
                              )}

                              {message.cardType === "skills" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleSuggestionClick("Where did you use these skills?", "experience")
                                    }
                                    className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted"
                                  >
                                    Where did you use these?
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSuggestionClick("Show me your projects", "projects")}
                                    className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted"
                                  >
                                    Related projects
                                  </Button>
                                </>
                              )}

                              {message.cardType === "projects" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSuggestionClick("What technologies did you use?", "skills")}
                                    className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted"
                                  >
                                    Technologies used?
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSuggestionClick("Tell me about your experience", "experience")}
                                    className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted"
                                  >
                                    Work experience
                                  </Button>
                                </>
                              )}

                              {message.cardType === "certifications" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleSuggestionClick("How do these certifications help your work?", "experience")
                                    }
                                    className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted"
                                  >
                                    How do these help?
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSuggestionClick("Tell me about your education", "education")}
                                    className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted"
                                  >
                                    Education background
                                  </Button>
                                </>
                              )}

                              {message.cardType === "education" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleSuggestionClick("What certifications do you have?", "certifications")
                                    }
                                    className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted"
                                  >
                                    Certifications?
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleSuggestionClick("Tell me about your work experience", "experience")
                                    }
                                    className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted"
                                  >
                                    Work experience
                                  </Button>
                                </>
                              )}

                              {message.cardType === "volunteering" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSuggestionClick("What are your skills?", "skills")}
                                    className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted"
                                  >
                                    Your skills?
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSuggestionClick("Show me your projects", "projects")}
                                    className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted"
                                  >
                                    See projects
                                  </Button>
                                </>
                              )}

                              {/* Default suggestions for messages without a specific card type */}
                              {!message.cardType && <></>}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Card carousel for this message */}
                    {renderCards(
                      message,
                      index,
                      () => {
                        const firstCard = message.cards?.[0] || message.compactCards?.[0]
                        if (firstCard) {
                          setSelectedCard(firstCard)
                        }
                      },
                      false, // Always show pagination so users know there are more cards
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mb-2"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mr-4 rounded-full overflow-hidden flex items-center justify-center bg-transparent">
                    <AvatarFallback />
                  </div>
                  <div className="bg-[#f0f2f5] dark:bg-[#2a2a2a] p-4 rounded-3xl rounded-bl-lg">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Fixed input area at the bottom */}
          <div
            ref={inputAreaRef}
            className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-background via-background to-transparent pt-4"
          >
            {/* Suggestions - only show in explore mode */}
            {chatMode === "explore" && (
              <div className="px-4 mb-3">
                <ChatSuggestions
                  onSuggestionClick={handleSuggestionClick}
                  exploredTopics={exploredTopics}
                  onReturnToTopic={handleReturnToConversation}
                />
              </div>
            )}

            <div className="px-4 pb-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex items-center gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    chatMode === "journey" && !isJourneyComplete ? "Ask a follow-up question..." : "Ask me anything..."
                  }
                  className="flex-1 rounded-full bg-[#f0f2f5] dark:bg-[#2a2a2a] border-0 px-4 py-6 text-base"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full bg-[#0066ff] hover:bg-[#0052cc] w-12 h-12 shrink-0"
                  disabled={!input.trim()}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Card expanded modal */}
      <AnimatePresence>
        {selectedCard && <CardExpanded card={selectedCard} onClose={() => setSelectedCard(null)} />}
      </AnimatePresence>
    </div>
  )
}
