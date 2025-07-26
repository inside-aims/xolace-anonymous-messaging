"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import type { Settings } from "@/types/global"
import {Separator} from "@/components/ui/separator";
import {BottomSection} from "@/app/(open)/x/[slug]/components/bottom-section";

interface MessageFormProps {
  settings: Settings
  onSubmit: (message: string) => void
  isSubmitting: boolean
}

export function MessageForm({ settings, onSubmit, isSubmitting }: MessageFormProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(message)
  }

  const isValid = message.trim() && (!settings.min_length || message.length >= settings.min_length)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Textarea
          placeholder="Type your anonymous message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="h-32 resize-none border-2 border-white/20 bg-white/90 backdrop-blur-sm rounded-2xl text-gray-800 placeholder:text-gray-500 focus:border-white/40 focus:ring-0 text-lg p-4"
          maxLength={500}
        />
        {settings.show_character_count && (
          <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded-full">
            {message.length}/500
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2 text-white/80">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Anonymous & Secure</span>
        </div>
        {settings.min_length && (
          <span
            className={`text-white/80 ${message.length >= settings.min_length ? "text-green-300" : "text-orange-300"}`}
          >
            Min: {settings.min_length} chars
          </span>
        )}
      </div>

      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full bg-lavender-600 hover:bg-lavender-700 text-white font-semibold rounded-3xl text-lg shadow-xl h-10 transform transition-all hover:scale-102 disabled:hover:scale-100"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"/>
            Sending anonymously...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-3"/>
            Send Anonymous Message
          </>
        )}
      </Button>
      <div className="flex items-center justify-center gap-3">
        <Separator className="flex-1 bg-white"/>
        <span className="text-sm text-white">OR</span>
        <Separator className="flex-1 bg-white"/>
      </div>
      <BottomSection/>
    </form>
  )
}
