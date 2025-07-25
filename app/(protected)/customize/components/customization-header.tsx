"use client"

import { Button } from "@/components/ui/button"
import { Save, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface CustomizationHeaderProps {
  onSave: () => void
  isSaving: boolean
}

export function CustomizationHeader({ onSave, isSaving }: CustomizationHeaderProps) {
  return (
    <div className="w-full flex flex-col items-start items-center justify-between gap-4">
      <Link href="/">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>
      <div className="w-full flex flex-col md:flex-row items-center justify-between">
        <div className={""}>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Customize Your Page</h1>
          <p className="text-gray-600 mt-1">Personalize how others see your anonymous message page</p>
        </div>
        <div className="w-full flex items-end md:items-center justify-end gap-4">
          <Link href={"/send/johndoe"}>
            <Button variant="outline" className="rounded-lg bg-transparent border border-neutral-300 hover:border-neutral-400 transition-transform duration-150 ease-in-out duration-100 hover:scale-102">
              <Eye className="h-4 w-4 mr-2"/>
              Preview
            </Button>
          </Link>
          <Button
            onClick={onSave}
            className="bg-gradient-to-r from-lavender-500 to-ocean-500 hover:from-lavender-600 hover:to-ocean-600 rounded-lg transition-transform ease-in-out duration-150 hover:scale-102"
            disabled={isSaving}
          >
            <Save className="h-4 w-4 mr-2"/>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
