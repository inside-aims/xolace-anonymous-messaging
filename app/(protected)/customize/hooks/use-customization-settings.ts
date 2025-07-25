"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { UserSettings } from "../../../(open)/x/[slug]/types";

const defaultSettings: UserSettings = {
  username: "johndoe",
  pageTitle: "ask me anything, anonymously",
  customPrompt: "What's something you've always wanted to tell me?",
  avatarUrl: "/placeholder.svg?height=64&width=64",
  backgroundGradient: "sunset-vibes",
  showCharacterCount: true,
  requireMinLength: false,
  minLength: 10,
  welcomeMessage: "Your thoughts matter to me. Share them anonymously!",
  selectedIcon: "Heart", // Default icon
};

export function useCustomizationSettings() {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem("messagePageSettings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    }
  }, []);

  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const saveSettings = () => {
    localStorage.setItem("messagePageSettings", JSON.stringify(settings));
    toast.success("Settings saved!");
  };

  return { settings, updateSettings, saveSettings };
}
