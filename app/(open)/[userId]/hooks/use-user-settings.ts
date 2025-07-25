"use client"

import { useState, useEffect } from "react"
import type { UserSettings } from "../types"

const defaultSettings: UserSettings = {
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

export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load settings from localStorage (in a real app, this would come from an API)
    const savedSettings = localStorage.getItem("messagePageSettings")
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings({ ...defaultSettings, ...parsed })
      } catch (error) {
        console.error("Error loading settings:", error)
      }
    }
    setIsLoading(false)
  }, [])

  return { settings, isLoading }
}
