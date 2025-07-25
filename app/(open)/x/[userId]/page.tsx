"use client"
import { useState } from "react"
import {toast} from "sonner"
import { MessageSendingContainer } from "./components/message-sending-container"
import { SuccessScreen } from "./components/success-screen"
import { useUserSettings } from "./hooks/use-user-settings"

// Define the structure for page settings
interface PageSettings {
  username: string
  pageTitle: string
  customPrompt: string
  avatarUrl: string
  backgroundGradient: string
  showCharacterCount: boolean
  requireMinLength: boolean
  minLength: number
  welcomeMessage: string
  selectedIcon: string // Added for the new icon feature
}

// Default settings (will be overridden by localStorage)
const defaultSettings: PageSettings = {
  username: "johndoe",
  pageTitle: "ask me anything, anonymously",
  customPrompt: "What's something you've always wanted to tell me?",
  avatarUrl: "/placeholder.svg?height=64&width=64",
  backgroundGradient: "from-pink-400 via-purple-500 to-orange-400",
  showCharacterCount: true,
  requireMinLength: false,
  minLength: 10,
  welcomeMessage: "Your thoughts matter to me. Share them anonymously!",
  selectedIcon: "Heart", // Default icon
}

// Background themes mapping
const backgroundThemes: Record<string, string> = {
  "from-pink-400 via-purple-500 to-orange-400": "from-pink-400 via-purple-500 to-orange-400",
  "from-blue-400 via-teal-400 to-green-400": "from-blue-400 via-teal-400 to-green-400",
  "from-purple-400 via-pink-400 to-red-400": "from-purple-400 via-pink-400 to-red-400",
  "from-green-400 via-blue-500 to-purple-600": "from-green-400 via-blue-500 to-purple-600",
  "from-orange-400 via-pink-500 to-purple-600": "from-orange-400 via-pink-500 to-purple-600",
  "from-gray-900 via-purple-900 to-violet-600": "from-gray-900 via-purple-900 to-violet-600",
}

export default function SendMessage({ params }: { params: { userId: string } }) {
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { settings, isLoading } = useUserSettings()

  const handleSubmit = async (messageText: string) => {
    if (!messageText.trim()) return

    if (settings.requireMinLength && messageText.length < settings.minLength) {
      toast.error(`Please write at least ${settings.minLength} characters.`)
      return
    }

    setIsSubmitting(true)
    setMessage(messageText)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitted(true)
    setIsSubmitting(false)

    toast.success("Message sent!")
  }

  const handleSendAnother = () => {
    setIsSubmitted(false)
    setMessage("")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-orange-400 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  if (isSubmitted) {
    return <SuccessScreen onSendAnother={handleSendAnother} />
  }

  return (
    <MessageSendingContainer
      settings={settings}
      userId={params.userId}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  )
}
