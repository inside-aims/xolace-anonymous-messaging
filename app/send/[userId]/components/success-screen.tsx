"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Heart } from "lucide-react"
import Link from "next/link"

interface SuccessScreenProps {
  onSendAnother: () => void
}

export function SuccessScreen({ onSendAnother }: SuccessScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl">
        <CardContent className="pt-8 pb-6 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Message Delivered!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your anonymous message has been sent successfully. Thank you for spreading positivity!
          </p>

          <div className="space-y-3">
            <Button
              onClick={onSendAnother}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-2xl"
            >
              <Heart className="w-4 h-4 mr-2" />
              Send Another Message
            </Button>

            <Link href="/">
              <Button variant="outline" className="w-full rounded-2xl py-3 bg-transparent">
                Create Your Own Page
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
