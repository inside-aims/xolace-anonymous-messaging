import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Download, Eye, Share2, X} from "lucide-react";
import {useState} from "react";
import {toast} from "sonner";
import type { Settings } from "@/types/global"
import {UserProfileCard} from "@/app/(open)/x/[slug]/components/user-profile-card";
import {ProfileCard} from "@/components/cards/profile-card-template";

interface ShareProfileProps {
  open: boolean;
  onClose: () => void;
  settings: Settings
}

const templateVariants = {
  1: "classic",
  2: "modern",
  3: "artistic",
} as const;

type TemplateKey = keyof typeof templateVariants;

const ShareProfileCardModal = ({open, onClose, settings}: ShareProfileProps) => {
  const [isSharing, setIsSharing] = useState(false);
  const [downloading, setDownloading] = useState<boolean>(false)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>(1);
  const userLinks = `${window.location.origin}/x/${settings?.shareable_slug}`

  const shareMessage = async () => {
    setIsSharing(true);

    try {
      // Dynamically import html2canvas
      const html2canvas = (await import("html2canvas-pro")).default;
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


        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        canvas.toBlob(async (blob: any) => {
          if (blob) {
            const file = new File([blob], "anonymous-message.png", {
              type: "image/png",
            });

            // Try native sharing first
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              try {
                await navigator.share({
                  title: "Xolace Message",
                  text: userLinks,
                  files: [file],
                });
                toast.success("Shared successfully!");
              } catch (_) {
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
    a.download = `anonymous-message-${settings?.user_id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(imageUrl);

    toast("Card downloaded!");
  };

  const downloadCardAsImage = async () => {
    setDownloading(true)
    try {
      const html2canvas = (await import("html2canvas-pro")).default;
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

        canvas.toBlob((blob) => {
          if (blob) {
            downloadImage(blob);
          }
        }, "image/png");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to generate card image. Please try again.");
    } finally {
      setDownloading(false)
    }
  };
  

  return(
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Share Profile Card
            <Badge variant="secondary" className="text-xs">
              {new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-lavender-50 to-ocean-50 p-4 rounded-lg border">
            <UserProfileCard settings={settings}/>
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
                  onClick={() => setSelectedTemplate(templateNum as TemplateKey)}
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
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"/>
                  Generating...
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 mr-2"/>
                  Share Profile Card
                </>
              )}
            </Button>
            <Button
              className={"h-10 border border-lavender-500 flex justify-center"}
              variant="outline"
              onClick={downloadCardAsImage}
              disabled={downloading}
            >
              {downloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"/>
                  <span className="hidden sm:inline">Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onClose} className={"h-10"}>
              <X className="h-4 w-4"/>
              <span className="hidden sm:inline">Close</span>
            </Button>
          </div>

          <div className="flex items-center justify-center text-xs text-gray-500">
            <Eye className="h-4 w-4 mr-1 text-amber-500" />
            <span>Psst... <span className="font-bold text-amber-400">Snapchat users:</span> download, copy link and then share for best results</span>
          </div>
        </div>
      </DialogContent>
      {/* Hidden card templates for sharing */}
      <div className="fixed -top-full -left-full pointer-events-none">
        <div className="fixed -top-full -left-full pointer-events-none">
          <ProfileCard
            avatarUrl={settings.avatar_url}
            message={settings.custom_prompt}
            link={userLinks}
            date={new Date().toLocaleString("en-US", {
              year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: true,})}
            templateId={`shareCardTemplate${selectedTemplate}`}
            variant={templateVariants[selectedTemplate]}
          />
        </div>

      </div>
    </Dialog>
  );
}
export default ShareProfileCardModal;