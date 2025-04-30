import { cn } from "@/lib/utils"

interface TagBadgeProps {
  label: string
  className?: string
}

export function TagBadge({ label, className }: TagBadgeProps) {
  // Make tag badges more compact for small screens but slightly larger than before
  return (
    <span
      className={cn(
        "inline-flex px-1.5 py-0.5 text-[10px] sm:text-xs font-medium rounded-full", // Reduced padding and font size
        "bg-muted text-muted-foreground",
        "dark:bg-white/10 dark:text-white/80",
        className,
      )}
    >
      {label}
    </span>
  )
}
