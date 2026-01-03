"use client"

import { ChatInterface } from "@/components/chat-interface"
import { portfolioData } from "@/data/portfolio-data"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" })
    }
  }, [])

  return (
    <main
      className="flex min-h-screen flex-col"
      style={{
        paddingTop: "env(safe-area-inset-top, 0)",
        paddingBottom: "env(safe-area-inset-bottom, 0)",
        paddingLeft: "env(safe-area-inset-left, 0)",
        paddingRight: "env(safe-area-inset-right, 0)",
      }}
    >
      <header className="sticky top-0 z-50 w-full" style={{ top: "env(safe-area-inset-top, 0)" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/60 backdrop-blur-[8px] transition-all duration-300"></div>
        <div className="absolute left-0 bottom-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border/20 to-transparent"></div>
      </header>

      <div className="container flex-1 pb-0 flex flex-col px-1 sm:px-4">
        <ChatInterface portfolioData={portfolioData} />
      </div>
    </main>
  )
}
