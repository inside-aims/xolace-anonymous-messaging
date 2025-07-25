"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Heart } from "lucide-react"
import Link from "next/link"

interface SuccessScreenProps {
  onSendAnother: () => void
}

export function SuccessScreen({ onSendAnother }: SuccessScreenProps) {
  const mainDomain = process.env.NEXT_PUBLIC_APP_URL || "https://xolace.app"
  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-400 via-lavender-500 to-lavender-600 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] bg-[conic-gradient(from_0deg,_#ffffff33,_#a855f7aa,_#3b82f6aa,_#ffffff33)] animate-spin-slow rounded-full blur-3xl opacity-60" />
      </div>

      <Card className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl">
        <CardContent className="pt-8 pb-6 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Message Delivered!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Join Xolace today and share your positivity with the community✨
          </p>

          <div className="space-y-3">
          <Link href={`${mainDomain}/signup`}>
            <Button    
              className="w-full relative inline-flex h-10 overflow-hidden rounded-3xl text-lg font-semibold shadow-lg transform transition-all hover:scale-102 px-8 border border-neutral-500"
            >
              <span className="m-2 absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"></span>
              <span className="inline-flex h-full w-full items-center justify-center whitespace-nowrap rounded-md px-8 py-2 text-lg font-medium text-white backdrop-blur-2xl">
                <Heart className="w-4 h-4 mr-2" />                
                Create Your Own Page
              </span>
            </Button>
          </Link>

              <Button variant="outline" className="w-full h-10 rounded-3xl py-3 bg-transparent border border-neutral-400" onClick={onSendAnother}>
              Send Another Message
              </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
