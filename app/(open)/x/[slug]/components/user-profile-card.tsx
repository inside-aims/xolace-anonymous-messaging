"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Lock } from "lucide-react"
import type { Settings } from "@/types/global"
import dynamic from "next/dynamic"
import * as LucideIcons from "lucide-react"

interface UserProfileCardProps {
  settings: Settings
}

export function UserProfileCard({ settings }: UserProfileCardProps) {
  // Dynamically import the selected icon component
  const IconComponent = settings.selected_icon
    ? dynamic(() => Promise.resolve(LucideIcons[settings.selected_icon as keyof typeof LucideIcons]), {
        ssr: false,
        loading: () => <div className="w-5 h-5" />, // Placeholder while loading
      })
    : null

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20">
      {/* Header with avatar and username */}
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="w-16 h-16 ring-4 ring-white/50">
          <AvatarImage src={settings.avatar_url || "/placeholder.svg"} alt={settings.username} />
          <AvatarFallback className="bg-gradient-to-br from-lavender-400 to-ocean-400 text-white text-xl font-bold">
            {settings.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">@{settings.username}</h1>
            {IconComponent && <IconComponent className="w-5 h-5 text-purple-600" />}
          </div>
          <p className="text-gray-600 text-sm">{settings.page_title}</p>
        </div>
        <Avatar className="w-8 h-8 opacity-60">
          <AvatarImage src={settings.avatar_url || "/placeholder.svg"} alt={settings.username} />
          <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
            {settings.username.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Custom prompt */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 border border-pink-100">
        <p className="text-gray-800 font-medium text-lg leading-relaxed">{settings.custom_prompt}</p>
      </div>

      {/* Anonymous indicator */}
      <div className="flex items-center justify-center gap-2 mt-4 text-gray-500">
        <Lock className="w-4 h-4" />
        <span className="text-sm font-medium">anonymous q&a</span>
      </div>
    </div>
  )
}
