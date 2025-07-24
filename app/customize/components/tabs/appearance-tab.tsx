"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette } from "lucide-react"
import type { UserSettings } from "../../../send/[userId]/types"

interface AppearanceTabProps {
  settings: UserSettings
  onUpdate: (updates: Partial<UserSettings>) => void
}

const backgroundThemes = [
  {
    id: "from-pink-400 via-purple-500 to-orange-400",
    name: "Sunset Vibes",
    preview: "bg-gradient-to-br from-pink-400 via-purple-500 to-orange-400",
  },
  {
    id: "from-blue-400 via-teal-400 to-green-400",
    name: "Ocean Breeze",
    preview: "bg-gradient-to-br from-blue-400 via-teal-400 to-green-400",
  },
  {
    id: "from-purple-400 via-pink-400 to-red-400",
    name: "Purple Dreams",
    preview: "bg-gradient-to-br from-purple-400 via-pink-400 to-red-400",
  },
  {
    id: "from-green-400 via-blue-500 to-purple-600",
    name: "Forest Mist",
    preview: "bg-gradient-to-br from-green-400 via-blue-500 to-purple-600",
  },
  {
    id: "from-orange-400 via-pink-500 to-purple-600",
    name: "Cosmic Fire",
    preview: "bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600",
  },
  {
    id: "from-gray-900 via-purple-900 to-violet-600",
    name: "Dark Mode",
    preview: "bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600",
  },
]

export function AppearanceTab({ settings, onUpdate }: AppearanceTabProps) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Visual Appearance
        </CardTitle>
        <CardDescription>Choose colors and themes for your message page</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-3">Background Theme</h4>
            <div className="grid grid-cols-2 gap-4">
              {backgroundThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => onUpdate({ backgroundGradient: theme.id })}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    settings.backgroundGradient === theme.id
                      ? "border-purple-500 ring-2 ring-purple-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className={`w-full h-16 rounded-lg ${theme.preview} mb-2`}></div>
                  <p className="text-sm font-medium text-center">{theme.name}</p>
                  {settings.backgroundGradient === theme.id && (
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-purple-500 text-white">Selected</Badge>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
