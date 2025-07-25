"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "./tabs/profile-tab";
import { ContentTab } from "./tabs/content-tab";
import { AppearanceTab } from "./tabs/appearance-tab";
import { AdvancedTab } from "./tabs/advanced-tab";
import type { Settings } from "@/types/global";

interface CustomizationTabsProps {
  settings: Settings;
  onUpdate: (updates: Partial<Settings>) => void;
}

export function CustomizationTabs({
  settings,
  onUpdate,
}: CustomizationTabsProps) {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm rounded-2xl p-1">
        <TabsTrigger value="profile" className="rounded-xl">
          Profile
        </TabsTrigger>
        <TabsTrigger value="content" className="rounded-xl">
          Content
        </TabsTrigger>
        <TabsTrigger value="appearance" className="rounded-xl">
          Appearance
        </TabsTrigger>
        <TabsTrigger value="advanced" className="rounded-xl">
          Advanced
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="mt-6">
        <ProfileTab settings={settings} onUpdate={onUpdate} />
      </TabsContent>

      <TabsContent value="content" className="mt-6">
        <ContentTab settings={settings} onUpdate={onUpdate} />
      </TabsContent>

      <TabsContent value="appearance" className="mt-6">
        <AppearanceTab settings={settings} onUpdate={onUpdate} />
      </TabsContent>

      <TabsContent value="advanced" className="mt-6">
        <AdvancedTab settings={settings} onUpdate={onUpdate} />
      </TabsContent>
    </Tabs>
  );
}
