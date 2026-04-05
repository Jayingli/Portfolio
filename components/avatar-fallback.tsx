"use client"

import Image from "next/image"

export function AvatarFallback() {
  return (
    <Image
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/835613eff45e42db-sticker.PNG-cEMNrTsBIs8PFC4Pv6MoiI9v1RaM13.png"
      alt="AI Avatar"
      width={100}
      height={100}
      className="w-full h-full object-contain scale-110 transform"
      priority
    />
  )
}
