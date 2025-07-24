"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import type { UserSettings } from "../../../send/[userId]/types"

interface ContentTabProps {
  settings: UserSettings
  onUpdate: (updates: Partial<UserSettings>) => void
}

const promptTemplates = [
  "What's something you've always wanted to tell me?",
  "Ask me anything, I'll answer honestly!",
  "What's your honest opinion about me?",
  "Send me your best advice or encouragement!",
  "What's a question you're too shy to ask in person?",
  "Share a compliment or kind words with me!",
]

export function ContentTab({ settings, onUpdate }: ContentTabProps) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Content & Messaging
        </CardTitle>
        <CardDescription>Customize the prompts and messages visitors will see</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="customPrompt">Custom Prompt</Label>
          <Textarea
            id="customPrompt"
            value={settings.customPrompt}
            onChange={(e) => onUpdate({ customPrompt: e.target.value })}
            placeholder="What would you like people to write about?"
            className="min-h-[100px] rounded-xl border-2"
          />
          <p className="text-sm text-gray-500">This question will be prominently displayed to encourage responses</p>
        </div>

        <div className="space-y-3">
          <Label>Quick Templates</Label>
          <div className="grid grid-cols-1 gap-2">
            {promptTemplates.map((template, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onUpdate({ customPrompt: template })}
                className="text-left justify-start h-auto p-3 rounded-xl text-sm"
              >
                {template}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="welcomeMessage">Welcome Message</Label>
          <Textarea
            id="welcomeMessage"
            value={settings.welcomeMessage}
            onChange={(e) => onUpdate({ welcomeMessage: e.target.value })}
            placeholder="A welcoming message for your visitors"
            className="min-h-[80px] rounded-xl border-2"
          />
        </div>
      </CardContent>
    </Card>
  )
}
