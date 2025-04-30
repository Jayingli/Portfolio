"use server"

import { OpenAI } from "openai"
import { portfolioData } from "@/data/portfolio-data"
import { customResponses } from "@/data/custom-responses"

// Initialize the OpenAI client - ensure this only runs on the server
// We'll use a function to create the client when needed instead of initializing it at the module level
function getOpenAIClient() {
  // This will only be called on the server
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
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

// Create the system prompt with instructions
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

HERE IS JAY'S PORTFOLIO INFORMATION:
${portfolioContext}

Remember to only use the information provided above when answering questions.`
}

export async function generateChatResponse(message: string) {
  try {
    // Get the system prompt
    const systemPrompt = createSystemPrompt()

    // Create the OpenAI client only when needed (server-side)
    const openai = getOpenAIClient()

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

    return { success: true, message: response.choices[0].message.content || "I don't have an answer for that." }
  } catch (error) {
    console.error("Error generating chat response:", error)
    return {
      success: false,
      message: "I'm sorry, I couldn't process your request. Please try again later.",
    }
  }
}
