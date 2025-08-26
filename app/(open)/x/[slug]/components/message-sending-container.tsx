"use client"

import { UserProfileCard } from "./user-profile-card"
import { MessageForm } from "./message-form"
import { BottomSection } from "./bottom-section"
import type { Settings } from "@/types/global"
import { backgroundThemes } from "@/app/(protected)/customize/components/tabs/appearance-tab"
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import {useRouter} from "next/navigation";

interface MessageSendingContainerProps {
  settings: Settings
  onSubmit: (messageText: string, canReshare: boolean) => void
  isSubmitting: boolean
  isPreview: boolean
}

export function MessageSendingContainer({ settings, onSubmit, isSubmitting, isPreview }: MessageSendingContainerProps) {
  const backgroundClass = `bg-gradient-to-br ${backgroundThemes.find(theme => theme.id === settings?.background_theme)?.preview}`
  const router = useRouter();

  return (
    <div className={`min-h-screen ${backgroundClass}  relative overflow-hidden`}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/3 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {isPreview && (
          <div className={"items-start w-full max-w-5xl justify-start px-4 flex mt-4 mb-8 md:mb-0 md:mt-8"}>
            <Button
              variant={"outline"}
              className={"border flex items-center justify-center rounded-full border-white w-8 h-8 bg-transparent hover:bg-transparent hover:shadow-lg transition-all duration-150 ease-in-out  hover:scale-105"}
              onClick={() => router.back()}
            >
              <ArrowLeft className="text-white transition-all duration-150 ease-in-out  hover:scale-105" size={18}/>
            </Button>
          </div>
        )}
        <div className="flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-md space-y-8">
            <UserProfileCard settings={settings}/>
            <MessageForm
              settings={settings}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              isPreview={isPreview}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
