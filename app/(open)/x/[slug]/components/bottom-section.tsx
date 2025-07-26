"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function BottomSection() {
  return (
    <div className="flex w-full">
      <Link href="/" className="block w-full">
        <Button
          className="relative w-full flex block h-12 overflow-hidden rounded-3xl text-lg font-semibold shadow-lg transition-all hover:scale-102">
          <span
            className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
              bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
          />
          <span
            className="inline-flex h-full w-full items-center justify-center
              whitespace-nowrap rounded-3xl px-8 py-2 text-lg font-medium text-white backdrop-blur-2xl"
          >
            Get your own messages!
          </span>
        </Button>
      </Link>
    </div>
  )
}
