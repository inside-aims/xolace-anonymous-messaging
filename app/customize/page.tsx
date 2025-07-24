"use client"
import { CustomizationHeader } from "./components/customization-header"
import { CustomizationTabs } from "./components/customization-tabs"
import { LivePreview } from "./components/live-preview"
import { useCustomizationSettings } from "./hooks/use-customization-settings"

export default function CustomizePage() {
  const { settings, updateSettings, saveSettings } = useCustomizationSettings()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <CustomizationHeader onSave={saveSettings} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <CustomizationTabs settings={settings} onUpdate={updateSettings} />
          </div>

          <div className="xl:col-span-1">
            <LivePreview settings={settings} />
          </div>
        </div>
      </div>
    </div>
  )
}
