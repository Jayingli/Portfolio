export type CardType = "experience" | "skills" | "projects" | "certifications" | "education" | "volunteering"
export type IconType = "briefcase" | "wrench" | "folder" | "award" | "graduation" | "heart"

export interface SuggestionTopic {
  text: string
  shortText?: string
  iconType: IconType
  topic: CardType
}

export const suggestionTopics: SuggestionTopic[] = [
  {
    text: "Tell me about your experience",
    shortText: "Experience",
    iconType: "briefcase",
    topic: "experience",
  },
  {
    text: "What skills do you have?",
    shortText: "Skills",
    iconType: "wrench",
    topic: "skills",
  },
  {
    text: "Show me your projects",
    shortText: "Projects",
    iconType: "folder",
    topic: "projects",
  },
  {
    text: "What certifications do you have?",
    shortText: "Certifications",
    iconType: "award",
    topic: "certifications",
  },
  {
    text: "Tell me about your education",
    shortText: "Education",
    iconType: "graduation",
    topic: "education",
  },
  {
    text: "Any volunteering experience?",
    shortText: "Volunteering",
    iconType: "heart",
    topic: "volunteering",
  },
]
