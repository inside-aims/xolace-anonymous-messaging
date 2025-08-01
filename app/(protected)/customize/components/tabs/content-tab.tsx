"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import type { Settings } from "@/types/global";

interface ContentTabProps {
  settings: Settings;
  onUpdate: (updates: Partial<Settings>) => void;
}

const promptTemplates = [
  "What's something you've always wanted to tell me?",
  "Ask me anything, I'll answer honestly!",
  "What's your honest opinion about me?",
  "Send me your best advice or encouragement!",
  "What's a question you're too shy to ask in person?",
  "Share a compliment or kind words with me!",
];

export function ContentTab({ settings, onUpdate }: ContentTabProps) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Content & Messaging
        </CardTitle>
        <CardDescription>
          Customize the prompts and messages visitors will see
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="customPrompt">Custom Prompt</Label>
          <Textarea
            id="customPrompt"
            value={settings.custom_prompt}
            onChange={(e) => onUpdate({ custom_prompt: e.target.value })}
            placeholder="What would you like people to write about?"
            className="min-h-[100px] rounded-xl border-2"
          />
          <p className="text-sm text-gray-500">
            This question will be prominently displayed to encourage responses
          </p>
        </div>

        <div className="space-y-3">
          <Label>Quick Templates</Label>
          <div className="grid grid-cols-1 gap-2">
            {promptTemplates.map((template, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onUpdate({ custom_prompt: template })}
                className="text-left break-words  whitespace-normal justify-start h-auto p-3 rounded-xl text-sm"
              >
                {template}
              </Button>
            ))}
          </div>
        </div>

        {/* <div className="space-y-2">
          <Label htmlFor="welcomeMessage">Welcome Message</Label>
          <Textarea
            id="welcomeMessage"
            value={settings.welcome_message}
            onChange={(e) => onUpdate({ welcome_message: e.target.value })}
            placeholder="A welcoming message for your visitors"
            className="min-h-[80px] rounded-xl border-2"
          />
        </div> */}
      </CardContent>
    </Card>
  );
}
