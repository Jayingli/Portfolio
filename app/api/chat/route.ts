import { type NextRequest, NextResponse } from "next/server"
import { OpenAI } from "openai"
import { portfolioData } from "@/data/portfolio-data"
import { customResponses } from "@/data/custom-responses"

// Initialize the OpenAI client with better error handling
function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey || apiKey === "your_openai_api_key_here") {
    console.error("OpenAI API key is missing or using the default placeholder value")
    throw new Error("OpenAI API key not properly configured")
  }

  return new OpenAI({
    apiKey,
  })
}

// Convert portfolio data to a string format that can be used in the system prompt
function getPortfolioContext() {
  let context = ""

  // Experience
  context += "## EXPERIENCE\n"
  portfolioData.experience.forEach((exp) => {
    context += `- ${exp.title} at ${exp.subtitle} (${exp.dates || "No dates provided"})\n`
    context += `  ${exp.description}\n`
    if (exp.tags) context += `  Skills: ${exp.tags.join(", ")}\n`
    context += "\n"
  })

  // Skills
  context += "## SKILLS\n"
  portfolioData.skills.forEach((skill) => {
    context += `- ${skill.title} (${skill.subtitle})\n`
    context += `  ${skill.description}\n`
    if (skill.tags) context += `  Related: ${skill.tags.join(", ")}\n`
    context += "\n"
  })

  // Projects
  context += "## PROJECTS\n"
  portfolioData.projects.forEach((project) => {
    context += `- ${project.title} (${project.subtitle})\n`
    context += `  ${project.description}\n`
    if (project.tags) context += `  Technologies: ${project.tags.join(", ")}\n`
    if (project.link) context += `  Link: ${project.link}\n`
    context += "\n"
  })

  // Certifications
  context += "## CERTIFICATIONS\n"
  portfolioData.certifications.forEach((cert) => {
    context += `- ${cert.title} from ${cert.subtitle} (${cert.dates || "No dates provided"})\n`
    context += `  ${cert.description}\n`
    if (cert.tags) context += `  Related: ${cert.tags.join(", ")}\n`
    context += "\n"
  })

  // Education
  context += "## EDUCATION\n"
  portfolioData.education.forEach((edu) => {
    context += `- ${edu.title} from ${edu.subtitle} (${edu.dates || "No dates provided"})\n`
    context += `  ${edu.description}\n`
    if (edu.tags) context += `  Focus: ${edu.tags.join(", ")}\n`
    context += "\n"
  })

  // Volunteering
  context += "## VOLUNTEERING\n"
  portfolioData.volunteering.forEach((vol) => {
    context += `- ${vol.title} at ${vol.subtitle} (${vol.dates || "No dates provided"})\n`
    context += `  ${vol.description}\n`
    if (vol.tags) context += `  Areas: ${vol.tags.join(", ")}\n`
    context += "\n"
  })

  // Custom responses for specific questions
  context += "## COMMON QUESTIONS AND ANSWERS\n"
  customResponses.forEach((item) => {
    context += `- Questions about: ${item.keywords.join(", ")}\n`
    context += `  Answer: ${item.response}\n\n`
  })

  return context
}

// Enhance the system prompt to better handle technology-related questions
// Update the createSystemPrompt function to include specific instructions about technologies
function createSystemPrompt() {
  const portfolioContext = getPortfolioContext()

  return `You are an AI assistant for Jay Li's portfolio website. Your purpose is to answer questions ONLY about Jay's background, experience, skills, projects, education, certifications, and volunteering work.

IMPORTANT INSTRUCTIONS:
1. ONLY answer questions based on the information provided below.
2. If asked about topics not covered in Jay's portfolio, politely explain that you can only provide information about Jay's professional background and portfolio.
3. Maintain a professional, friendly tone.
4. Keep responses concise and focused.
5. If you're unsure about specific details, acknowledge the limitations of your knowledge rather than making up information.
6. Do not mention that you are an AI model or that you're using specific data - just respond naturally as a representative of Jay's portfolio.
7. When asked about technologies, tools, or tech stack used in projects, provide specific details from the project descriptions and tags.
8. For questions about skills or technologies, reference both the Skills section and the relevant technologies mentioned in Projects.

SPECIAL FORMATTING RULES:
- When asked about PROJECTS, respond with ONLY a brief intro sentence (1-2 sentences max) followed by "[SHOW_PROJECTS]" on a new line.
- When asked about EXPERIENCE, respond with ONLY a brief intro sentence followed by "[SHOW_EXPERIENCE]" on a new line.
- When asked about SKILLS, respond with ONLY a brief intro sentence followed by "[SHOW_SKILLS]" on a new line.
- When asked about CERTIFICATIONS, respond with ONLY a brief intro sentence followed by "[SHOW_CERTIFICATIONS]" on a new line.
- When asked about EDUCATION, respond with ONLY a brief intro sentence followed by "[SHOW_EDUCATION]" on a new line.
- When asked about VOLUNTEERING, respond with ONLY a brief intro sentence followed by "[SHOW_VOLUNTEERING]" on a new line.
- Example for skills: "Here are my key skills and expertise areas:\n[SHOW_SKILLS]"
- Example for certifications: "I've earned several certifications to validate my expertise:\n[SHOW_CERTIFICATIONS]"
- Example for education: "Here's my educational background:\n[SHOW_EDUCATION]"
- Example for volunteering: "I'm passionate about giving back to the community:\n[SHOW_VOLUNTEERING]"
- For all other questions, provide detailed conversational responses using the information below.

HERE IS JAY'S PORTFOLIO INFORMATION:
${portfolioContext}

Remember to only use the information provided above when answering questions.`
}

export async function POST(request: NextRequest) {
  try {
    // Get the message from the request body
    const body = await request.json().catch(() => {
      throw new Error("Failed to parse request body")
    })

    const { message } = body

    if (!message) {
      return NextResponse.json({ success: false, message: "Message is required" }, { status: 400 })
    }

    // Verify OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_openai_api_key_here") {
      console.error("OpenAI API key is not properly configured")
      return NextResponse.json(
        {
          success: false,
          message: "The chatbot is not properly configured. Please set up your OpenAI API key.",
        },
        { status: 500 },
      )
    }

    // Get the system prompt
    const systemPrompt = createSystemPrompt()

    // Add better error handling for the OpenAI API call
    try {
      // Create the OpenAI client
      const openai = getOpenAIClient()

      console.log("Sending request to OpenAI API with message:", message.substring(0, 50) + "...")

      // Make the API call
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      })

      console.log("Received response from OpenAI API")

      return NextResponse.json({
        success: true,
        message: response.choices[0].message.content || "I don't have an answer for that.",
      })
    } catch (openaiError: any) {
      console.error("OpenAI API error:", openaiError)

      // Handle specific OpenAI errors
      if (openaiError.status === 401) {
        return NextResponse.json(
          {
            success: false,
            message: "Authentication error with AI provider. Please check your API key.",
          },
          { status: 500 },
        )
      } else if (openaiError.status === 429) {
        return NextResponse.json(
          {
            success: false,
            message: "Rate limit exceeded with AI provider. Please try again later.",
          },
          { status: 500 },
        )
      } else if (openaiError.code === "context_length_exceeded") {
        return NextResponse.json(
          {
            success: false,
            message: "The request exceeded the maximum context length. Please shorten your query.",
          },
          { status: 400 },
        )
      }

      // Generic error
      return NextResponse.json(
        {
          success: false,
          message: "Error communicating with AI provider. Please try again later.",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("General error in chat API:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 },
    )
  }
}
