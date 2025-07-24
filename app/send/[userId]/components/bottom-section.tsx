"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function BottomSection() {
  const friendCount = Math.floor(Math.random() * 500) + 100

  return (
    <div className="text-center space-y-6 pb-8">
      <p className="text-white/90 font-medium">👆 {friendCount} friends just sent a message 👆</p>

      <Link href="/">
        {/*<Button*/}
        {/*  className="bg-transparent hover:bg-lavender-700 font-semibold px-12 py-4 rounded-3xl h-10 text-lg shadow-xl transform transition-all hover:scale-105 border border-black"*/}
        {/*  variant={"outline"}>*/}
        {/*  Get your own messages!*/}
        {/*</Button>*/}
        <Button
          className="relative inline-flex h-10 overflow-hidden rounded-md focus:outline-none rounded-3xl text-lg font-semibold shadow-lg transform transition-all hover:scale-105 px-8 ">
          <span className="m-2  absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
          bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]">
          </span>
          <span className="inline-flex h-full w-full items-center justify-center
          whitespace-nowrap rounded-md  px-8 py-2 text-lg font-medium text-white backdrop-blur-2xl">
            Get your own messages!
          </span>
        </Button>
      </Link>

      <div className="flex justify-center gap-6 text-white/60 text-sm">
        <button className="hover:text-white/80 transition-colors">Terms</button>
        <button className="hover:text-white/80 transition-colors">Privacy</button>
      </div>
    </div>
  )
}
