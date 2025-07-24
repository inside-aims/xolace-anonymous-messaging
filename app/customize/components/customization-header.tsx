"use client"

import { Button } from "@/components/ui/button"
import { Save, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface CustomizationHeaderProps {
  onSave: () => void
}

export function CustomizationHeader({ onSave }: CustomizationHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customize Your Page</h1>
          <p className="text-gray-600 mt-1">Personalize how others see your anonymous message page</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Link href="/send/johndoe">
          <Button variant="outline" className="rounded-xl bg-transparent">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </Link>
        <Button
          onClick={onSave}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
