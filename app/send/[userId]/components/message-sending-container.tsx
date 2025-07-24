"use client"

import { UserProfileCard } from "./user-profile-card"
import { MessageForm } from "./message-form"
import { BottomSection } from "./bottom-section"
import type { UserSettings } from "../types"

interface MessageSendingContainerProps {
  settings: UserSettings
  userId: string
  onSubmit: (message: string) => Promise<void>
  isSubmitting: boolean
}

export function MessageSendingContainer({ settings, userId, onSubmit, isSubmitting }: MessageSendingContainerProps) {
  const backgroundClass = `bg-gradient-to-br ${settings.backgroundGradient}`

  return (
    <div className={`min-h-screen ${backgroundClass} relative overflow-hidden`}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/3 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-md space-y-8">
            <UserProfileCard settings={settings} userId={userId} />
            <MessageForm settings={settings} onSubmit={onSubmit} isSubmitting={isSubmitting} />
          </div>
        </div>
        <BottomSection />
      </div>
    </div>
  )
}
