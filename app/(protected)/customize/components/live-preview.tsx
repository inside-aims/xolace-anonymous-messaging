"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, Lock } from "lucide-react";
import type { Settings } from "@/types/global";
import * as LucideIcons from "lucide-react";
import { backgroundThemes } from "./tabs/appearance-tab";

interface LivePreviewProps {
  settings: Settings;
}

export function LivePreview({ settings }: LivePreviewProps) {
  const IconComponent = settings.selected_icon
      ? LucideIcons[settings.selected_icon as keyof typeof LucideIcons] as React.ElementType
      : LucideIcons.HelpCircle

  return (
    <Card className="sticky top-4 bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Live Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-2xl overflow-hidden">
          <div
            className={`bg-gradient-to-br ${
              backgroundThemes.find(
                (theme) => theme.id === settings.background_theme
              )?.preview
            } p-6 min-h-[400px] flex flex-col justify-center`}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              {/* Profile section */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12 ring-2 ring-white/50">
                  <AvatarImage
                    src={settings.avatar_url || "/placeholder.svg"}
                    alt={settings.username}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-lavender-400 to-ocean-400 text-white text-sm font-bold">
                    {settings.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <h3 className="font-bold text-gray-900 text-sm">
                      @{settings.username}
                    </h3>
                    {IconComponent && (
                      <IconComponent className="w-4 h-4 text-purple-600" />
                    )}
                  </div>
                  <p className="text-gray-600 text-xs">{settings.page_title}</p>
                </div>
                <Avatar className="w-6 h-6 opacity-60">
                  <AvatarImage
                    src={'/assets/images/x-logo-full.webp'}
                    alt={settings.username}
                  />
                  <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                    ❤️
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Prompt */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-3 mb-3">
                <p className="text-gray-800 text-sm font-medium">
                  {settings.custom_prompt}
                </p>
              </div>

              {/* Anonymous indicator */}
              <div className="flex items-center justify-center gap-1 mb-3 text-gray-500">
                <Lock className="w-3 h-3" />
                <span className="text-xs">Xolace q&a</span>
              </div>

              {/* Message area preview */}
              <div className="bg-gray-100 rounded-xl p-3 mb-2">
                <div className="text-xs text-gray-500">Message area...</div>
              </div>

              {settings.show_character_count && (
                <div className="text-xs text-gray-400 text-right mb-2">
                  0/500 characters
                </div>
              )}

              <div className="bg-lavender-500 text-white rounded-xl p-2 text-center">
                <div className="text-xs font-medium">
                  Send Anonymous Message
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Username:</span>
            <Badge variant="secondary">@{settings.username}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Icon:</span>
            <Badge variant="secondary">{settings.selected_icon}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Min Length:</span>
            <span>
              {settings.min_length ? `${settings.min_length} chars` : "None"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}