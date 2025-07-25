"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import type { Settings as UserSettings } from "@/types/global";

interface AdvancedTabProps {
  settings: UserSettings;
  onUpdate: (updates: Partial<UserSettings>) => void;
}

export function AdvancedTab({ settings, onUpdate }: AdvancedTabProps) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Advanced Settings
        </CardTitle>
        <CardDescription>
          Fine-tune your message page behavior and requirements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Show Character Count</Label>
            <p className="text-sm text-gray-500">
              Display character counter to users
            </p>
          </div>
          <Switch
            checked={settings.show_character_count}
            onCheckedChange={(checked) =>
              onUpdate({ show_character_count: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Require Minimum Length</Label>
            <p className="text-sm text-gray-500">
              Set a minimum message length
            </p>
          </div>
          <Switch
            checked={settings.min_length}
            onCheckedChange={(checked) =>
              onUpdate({ min_length: checked })
            }
          />
        </div>

        {settings.min_length && (
          <div className="space-y-2">
            <Label htmlFor="minLength">Minimum Characters</Label>
            <Input
              id="minLength"
              type="number"
              value={settings.min_length}
              onChange={(e) =>
                onUpdate({ min_length: Number.parseInt(e.target.value) || 10 })
              }
              min="1"
              max="100"
              className="rounded-xl border-2"
            />
            <p className="text-sm text-gray-500">
              Messages must be at least this many characters long
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
