"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function BottomSection() {
  const friendCount = Math.floor(Math.random() * 500) + 100

  return (
    <div className="text-center space-y-6 pb-8">
      <p className="text-white/90 font-medium">👆 {friendCount} friends just sent a message 👆</p>

      <Link href="/">
        <Button className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-2xl text-lg shadow-xl transform transition-all hover:scale-105">
          Get your own messages!
        </Button>
      </Link>

      <div className="flex justify-center gap-6 text-white/60 text-sm">
        <button className="hover:text-white/80 transition-colors">Terms</button>
        <button className="hover:text-white/80 transition-colors">Privacy</button>
      </div>
    </div>
  )
}
