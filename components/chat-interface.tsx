"use client"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardCarousel } from "@/components/card-carousel"
import CardExpanded from "@/components/card-expanded"
import type { PortfolioData, CardType, CardData } from "@/data/portfolio-data"
import { ChatSuggestions } from "@/components/chat-suggestions"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { customResponses } from "@/data/custom-responses"
import { motion, AnimatePresence } from "framer-motion"
import { TypingIndicator } from "@/components/typing-indicator"
import { AvatarFallback } from "@/components/avatar-fallback"
import { ChatExperienceSection } from "@/components/chat-experience-section"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  cardType?: CardType
  isFollowUp?: boolean
  isAiResponse?: boolean
}

interface ChatInterfaceProps {
  portfolioData: PortfolioData
}

export function ChatInterface({ portfolioData }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm Jay—welcome to my interactive portfolio.\nYou can ask about my experience, skills, projects, certifications, education, or community involvement—or just click a quick prompt below to get started.\n\nCurious about what I've built, where I've studied, or how I've made an impact? Just ask.",
      sender: "bot",
    },
  ])
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
  const [useAI, setUseAI] = useState(true) // Enable AI responses by default

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

  // Show follow-up message after 3 seconds
  useEffect(() => {
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
  }, [])

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
                        layoutId={`message-bubble-${message.id}`}
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

                          {/* Quick suggestion pills - only show for regular bot messages (not follow-ups) */}
                          {message.sender === "bot" && !isTyping && !message.isFollowUp && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {message.cardType === "experience" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleSuggestionClick("What skills did you use at Noise Digital?", "skills")
                                    }
                                    className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted"
                                  >
                                    Skills at Noise Digital?
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSuggestionClick("Tell me about your projects", "projects")}
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
                                    onClick={() => handleSuggestionClick("Tell me about your education", "education")}
                                    className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted"
                                  >
                                    Education background
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleSuggestionClick("How do you apply these certifications?", "experience")
                                    }
                                    className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted"
                                  >
                                    How do you apply these?
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
                                    Certifications
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSuggestionClick("Tell me about your skills", "skills")}
                                    className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted"
                                  >
                                    Skills gained
                                  </Button>
                                </>
                              )}

                              {message.cardType === "volunteering" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSuggestionClick("Tell me about your experience", "experience")}
                                    className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted"
                                  >
                                    Professional experience
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleSuggestionClick("What skills did you gain from volunteering?", "skills")
                                    }
                                    className="rounded-full text-xs bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-muted"
                                  >
                                    Skills gained
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

                    {message.cardType === "experience" && portfolioData[message.cardType] && (
                      <motion.div
                        ref={index === messages.length - 1 ? activeCardRef : undefined}
                        className="pl-2 pr-2 mt-2 pb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay: 0.3,
                        }}
                      >
                        <ChatExperienceSection experiences={portfolioData[message.cardType]} />
                      </motion.div>
                    )}

                    {message.cardType &&
                      message.cardType !== "experience" &&
                      message.cardType !== "custom" &&
                      portfolioData[message.cardType] && (
                        <motion.div
                          ref={index === messages.length - 1 ? activeCardRef : undefined}
                          className="pl-2 pr-2 mt-2 pb-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            delay: 0.3,
                          }}
                        >
                          <CardCarousel cards={portfolioData[message.cardType]} onCardClick={handleCardClick} />
                        </motion.div>
                      )}

                    {message.cardType === "custom" && (
                      <motion.div
                        ref={index === messages.length - 1 ? activeCardRef : undefined}
                        className="pl-2 pr-2 mt-2 pb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay: 0.3,
                        }}
                      >
                        <CardCarousel
                          cards={[
                            {
                              id: `custom-${message.id}`,
                              type: "custom" as CardType,
                              title: "About Me",
                              subtitle: "Jay Li",
                              description: message.content,
                              tags: ["Profile", "Background", "Summary"],
                            },
                          ]}
                          onCardClick={handleCardClick}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-start items-center mb-1"
                  >
                    <motion.div
                      className="w-12 h-12 sm:w-14 sm:h-14 mr-4 rounded-full overflow-hidden flex items-center justify-center bg-transparent"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <AvatarFallback />
                    </motion.div>
                    <div className="bg-[#f0f2f5] dark:bg-[#2a2a2a] rounded-3xl rounded-bl-lg p-4 flex items-center justify-center">
                      <TypingIndicator />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Fixed input area at the bottom */}
          <div
            ref={inputAreaRef}
            className="fixed bottom-0 left-0 right-0 z-30 bg-background/80 backdrop-blur-md border-t border-border/10 shadow-lg"
            style={{
              paddingBottom: "env(safe-area-inset-bottom, 0.5rem)",
              paddingLeft: "env(safe-area-inset-left, 0.75rem)",
              paddingRight: "env(safe-area-inset-right, 0.75rem)",
              maxWidth: "inherit",
              width: "100%",
              margin: "0 auto",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto"
            >
              <ChatSuggestions
                onSuggestionClick={(suggestion, topic) => handleSuggestionClick(suggestion, topic)}
                exploredTopics={exploredTopics}
                onReturnToTopic={handleReturnToConversation}
              />
            </motion.div>

            <div className="p-3 pb-2 w-full max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto">
              <div className="flex gap-2 sm:gap-3 items-center">
                <Input
                  placeholder="Ask about me..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage()
                    }
                  }}
                  className="flex-1 text-sm h-9 sm:h-10"
                  aria-label="Chat input"
                  autoFocus={false}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}>
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CardExpanded card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  )
}
