"use client"

import Image from "next/image"

export function AvatarFallback() {
  return (
    <Image
      src="/images/ai-avatar.png"
      alt="AI Avatar"
      width={100}
      height={100}
      className="w-full h-full object-contain scale-110 translate-y-[2px]"
      priority
    />
  )
}
