"use client"
import { CustomizationHeader } from "./components/customization-header"
import { CustomizationTabs } from "./components/customization-tabs"
import { LivePreview } from "./components/live-preview"
import { useMessageSettings, useUpdateMessageSettings } from "@/hooks/useAnonymousMessages"
import { useEffect, useState } from "react"
import { useUserState } from "@/lib/store/user"
import type {Settings} from "@/types/global"

export default function CustomizePage() {
  const { user } = useUserState()

  // 1. Fetch the source-of-truth settings from the database
  const { data: serverSettings, isLoading } = useMessageSettings(user?.id);
  
  // 2. Get the mutation function for saving changes
  const { mutate: saveSettings, isPending: isSaving } = useUpdateMessageSettings(user?.id);

  // 3. Create a local "draft" state to manage edits. This allows for instant UI updates.
  const [draftSettings, setDraftSettings] = useState<Settings | null>(null);

  // 4. Synchronize the draft state when the server data loads
  useEffect(() => {
    if (serverSettings) {
      setDraftSettings(serverSettings);
    }
  }, [serverSettings]);

  const handleUpdate = (updates: Partial<Settings>) => {
    // All edits update the local draft state immediately for a responsive feel
    if (draftSettings) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setDraftSettings((prev: any) => ({ ...prev, ...updates }));
    }
  };

  const handleSave = () => {
    // The save button triggers the mutation, sending the entire draft state to the backend
    if (draftSettings) {
      console.log(draftSettings)
      saveSettings(draftSettings);
    }
  };

  if (isLoading || !draftSettings) {
    return <div className="text-center p-10">Loading your customization settings...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-ocean-50 to-moss-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
      <CustomizationHeader onSave={handleSave} isSaving={isSaving} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
          <CustomizationTabs settings={draftSettings} onUpdate={handleUpdate} />
          </div>

          <div className="xl:col-span-1">
            <LivePreview settings={draftSettings} />
          </div>
        </div>
      </div>
    </div>
  )
}
