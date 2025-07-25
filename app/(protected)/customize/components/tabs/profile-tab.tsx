"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Upload } from "lucide-react";
import type { Settings } from "@/types/global";
import * as LucideIcons from "lucide-react";

interface ProfileTabProps {
  settings: Settings;
  onUpdate: (updates: Partial<Settings>) => void;
}

const availableIcons = [
  "Heart",
  "Star",
  "Sparkles",
  "MessageCircle",
  "Smile",
  "Feather",
  "Zap",
  "Sun",
  "Moon",
  "Flower",
  "Gift",
  "Crown",
  "Coffee",
  "Book",
  "Music",
  "Camera",
  "Globe",
  "Diamond",
  "Cloud",
  "Leaf",
];

export function ProfileTab({ settings, onUpdate }: ProfileTabProps) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Information
        </CardTitle>
        <CardDescription>
          Set up your profile details that visitors will see
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="w-20 h-20 ring-4 ring-lavender-200">
            <AvatarImage
              src={settings.avatar_url || "/placeholder.svg"}
              alt={settings.username}
            />
            <AvatarFallback className="bg-gradient-to-br from-lavender-400 to-ocean-400 text-white text-2xl font-bold">
              {settings.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {/* <div className="flex-1">
            <Button
              onClick={handleAvatarUpload}
              variant="outline"
              className="rounded-xl bg-transparent"
            >
              <Upload className="h-4 w-4 mr-2" />
              Change Avatar
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Upload a profile picture or use the generated avatar
            </p>
          </div> */}
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={settings.username}
            onChange={(e) => onUpdate({ username: e.target.value })}
            placeholder="Enter your username"
            className="rounded-xl border-2"
          />
          <p className="text-sm text-gray-500">
            This will appear as @{settings.username} on your page
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pageTitle">Page Subtitle</Label>
          <Input
            id="pageTitle"
            value={settings.page_title}
            onChange={(e) => onUpdate({ page_title: e.target.value })}
            placeholder="e.g., ask me anything, anonymously"
            className="rounded-xl border-2"
          />
          <p className="text-sm text-gray-500">
            A short description that appears under your username
          </p>
        </div>

        <div className="space-y-2">
          <Label>Page Icon</Label>
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-2">
            {availableIcons.map((iconName) => {
              const IconComponent =
                LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType;
              if (!IconComponent) return null;
              return (
                <Button
                  key={iconName}
                  variant={
                    settings.selected_icon === iconName ? "default" : "outline"
                  }
                  size="icon"
                  onClick={() => onUpdate({ selected_icon: iconName })}
                  className={`rounded-xl ${
                    settings.selected_icon === iconName
                      ? "bg-purple-500 hover:bg-purple-600 text-white"
                      : "bg-transparent hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                </Button>
              );
            })}
          </div>
          <p className="text-sm text-gray-500">
            Choose an icon to display next to your username
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
