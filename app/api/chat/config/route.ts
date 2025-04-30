import { NextResponse } from "next/server"

export async function GET() {
  // Check if OpenAI API key is configured
  const apiKey = process.env.OPENAI_API_KEY
  const isConfigured = !!apiKey && apiKey !== "your_openai_api_key_here"

  return NextResponse.json({
    configured: isConfigured,
  })
}
