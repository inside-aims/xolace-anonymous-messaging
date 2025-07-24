"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, X } from "lucide-react";
import { toast } from "sonner";
import {
  CardTemplate1,
  CardTemplate2,
  CardTemplate3,
} from "../cards/card-templates";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface MessageModalProps {
  message: Message;
  isOpen: boolean;
  onClose: () => void;
}

export function MessageModal({ message, isOpen, onClose }: MessageModalProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  const shareMessage = async () => {
    setIsSharing(true);

    try {
      // Dynamically import html2canvas
      const html2canvas = (await import("html2canvas")).default;
      const templateId = `shareCardTemplate${selectedTemplate}`;
      const shareCardTemplate = document.getElementById(templateId);

      if (shareCardTemplate) {
        const canvas = await html2canvas(shareCardTemplate, {
          backgroundColor: null,
          scale: 2,
          width: 400,
          height: 500,
          useCORS: true,
        });

        canvas.toBlob(async (blob: any) => {
          if (blob) {
            const file = new File([blob], "anonymous-message.png", {
              type: "image/png",
            });

            // Try native sharing first
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              try {
                await navigator.share({
                  title: "Anonymous Message",
                  text: "Check out this beautiful message I received! 💜",
                  files: [file],
                });
                toast.success("Shared successfully!");
              } catch (shareError) {
                // User cancelled sharing, fallback to download
                downloadImage(blob);
              }
            } else {
              // Fallback to download
              downloadImage(blob);
            }
          }
        }, "image/png");
      }
    } catch (error) {
      console.error("Sharing error:", error);
      toast.error("Failed to generate shareable card. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  const downloadImage = (blob: Blob) => {
    const imageUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `anonymous-message-${message.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(imageUrl);

    toast("Card downloaded!");
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Anonymous Message
            <Badge variant="secondary" className="text-xs">
              {formatDate(message.timestamp)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-lavender-50 to-ocean-50 p-4 rounded-lg border">
            <p className="text-gray-800 leading-relaxed">{message.content}</p>
          </div>

          {/* Template Selection */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">
              Choose a card style:
            </p>
            <div className="flex gap-2">
              {[1, 2, 3].map((templateNum) => (
                <button
                  key={templateNum}
                  onClick={() => setSelectedTemplate(templateNum)}
                  className={`flex-1 p-2 rounded-lg border-2 transition-all ${
                    selectedTemplate === templateNum
                      ? "border-lavender-500 bg-lavender-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-xs font-medium">Style {templateNum}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {templateNum === 1 && "💜 Classic"}
                    {templateNum === 2 && "✨ Modern"}
                    {templateNum === 3 && "🌟 Artistic"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={shareMessage}
              disabled={isSharing}
              className="flex-1 bg-lavender-500 hover:bg-lavender-600 h-10 transition-all ease-in-out duration hover:scale-102"
            >
              {isSharing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share as Card
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onClose} className={"h-10"}>
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Share this beautiful message with others while keeping it anonymous
          </p>
        </div>
      </DialogContent>
      {/* Hidden card templates for sharing */}
      <div className="fixed -top-full -left-full pointer-events-none">
        <CardTemplate1
          message={message.content}
          date={formatDate(message.timestamp)}
          templateId="shareCardTemplate1"
        />
        <CardTemplate2
          message={message.content}
          date={formatDate(message.timestamp)}
          templateId="shareCardTemplate2"
        />
        <CardTemplate3
          message={message.content}
          date={formatDate(message.timestamp)}
          templateId="shareCardTemplate3"
        />
      </div>
    </Dialog>
  );
}
