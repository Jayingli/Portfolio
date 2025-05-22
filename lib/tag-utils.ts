// Tag prefix types and their colors
export const tagPrefixes = {
  "Role:": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "Tool:": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "Focus:": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "Skill:": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "Tech:": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
} as const

export type TagPrefix = keyof typeof tagPrefixes

// Function to determine tag prefix based on tag content
export function getTagPrefix(tag: string): TagPrefix {
  if (
    tag.includes("Manager") ||
    tag.includes("Owner") ||
    tag.includes("Lead") ||
    tag.includes("Agile") ||
    tag.includes("Scrum")
  ) {
    return "Role:"
  }
  if (
    tag.includes("Jira") ||
    tag.includes("Asana") ||
    tag.includes("Monday") ||
    tag.includes("GTM") ||
    tag.includes("GA4")
  ) {
    return "Tool:"
  }
  if (tag.includes("Stakeholder") || tag.includes("Documentation") || tag.includes("Planning") || tag.includes("SOW")) {
    return "Focus:"
  }
  if (tag.includes("SQL") || tag.includes("API") || tag.includes("REST") || tag.includes("NoSQL")) {
    return "Tech:"
  }
  return "Skill:"
}
