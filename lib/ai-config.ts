// This file contains configuration for the AI integration
// You can modify these settings to adjust the AI behavior

export const aiConfig = {
  // Default model to use
  model: "gpt-4o",

  // Temperature controls randomness (0.0 to 1.0)
  // Lower values make responses more deterministic
  temperature: 0.7,

  // Maximum tokens to generate in the response
  maxTokens: 500,

  // Whether to use streaming for responses
  useStreaming: false,

  // Fallback message if AI fails
  fallbackMessage: "I'm sorry, I couldn't process your request. Please try again later.",

  // Instructions for handling out-of-scope questions
  outOfScopeResponse:
    "I can only provide information about Jay's professional background and portfolio. Is there something specific about Jay's experience, skills, or projects you'd like to know?",
}
