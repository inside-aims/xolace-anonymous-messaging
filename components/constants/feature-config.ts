import {
  User,
  FileText,
  Palette,
  Settings,
  UserPen,
  Eye,
  Save, Download, Mail, Share2, Copy, PlusCircle, MessageCircle, Send, Type,
} from "lucide-react";
import { FeatureModalConfig } from "@/utils/helpers/FeatureModalHelper";

export const featureModalConfigs: Record<string, FeatureModalConfig> = {
  "/customize": {
    route: "/customize",
    storageKey: "customize",
    title: "Customize Your Page",
    description:
      "Make your anonymous page truly yours. Update your profile, tweak your card, and share it the way you like.",
    features: [
      {
        icon: User,
        title: "Profile",
        description:
          "Set your avatar, username, and page icon so people instantly know it’s you.",
      },
      {
        icon: FileText,
        title: "Content",
        description:
          "Write the message that appears on your card—set the tone and invite responses.",
      },
      {
        icon: Palette,
        title: "Appearance",
        description:
          "Pick colors and styles that match your vibe. Make your card stand out anywhere.",
      },
      {
        icon: Settings,
        title: "Advanced",
        description:
          "Fine-tune the details like, minimum response length to keep your page in control.",
      },
      {
        icon: Eye,
        title: "Preview",
        description:
          "See exactly how your card will look before you share it with the world.",
      },
      {
        icon: Save,
        title: "Save Changes",
        description:
          "Lock in your changes with one click. Your updated card is ready to go live.",
      },
    ],
    hasStepByStep: true,
  },
  "/dashboard": {
    route: "/dashboard",
    storageKey: "dashboard",
    title: "Your Dashboard",
    description:
      "This is your home base share your link, check your messages, and manage your card all in one place.",
    features: [
      {
        icon: Copy,
        title: "Your Shareable Link",
        description:
          "Grab your personal link with one click. Copy it, share it anywhere, and start getting anonymous messages.",
      },
      {
        icon: Eye,
        title: "Preview",
        description:
          "See exactly what people will experience when they click your link your card, your message, your vibe.",
      },
      {
        icon: Share2,
        title: "Quick Share",
        description:
          "Post your link directly to social platforms in seconds. More visibility, more responses.",
      },
      {
        icon: UserPen,
        title: "Customize",
        description:
          "Jump to the customize page to tweak your card’s content, appearance, and advanced settings.",
      },
      {
        icon: Mail,
        title: "Your Messages",
        description:
          "All your anonymous messages in one spot. Open, read, and interact with them anytime.",
      },
      {
        icon: Download,
        title: "Save & Share Responses",
        description:
          "Download your favorite responses as images or share them with your friends in one click.",
      },
    ],
    hasStepByStep: true,
  },
  "/x/[id]": {
    route: "/x/[id]",
    storageKey: "send-message",
    title: "Send an Anonymous Message",
    description:
      "You’ve landed on someone’s card 👋. Here’s your chance to drop a thought, a compliment, or even a secret. It’s quick, fun, and totally anonymous.",
    features: [
      {
        icon: User,
        title: "Their Card",
        description:
          "At the top, you’ll see their card with their avatar and the question they want you to answer.",
      },
      {
        icon: Type,
        title: "Your Response",
        description:
          "Write your message in the text box below. Be real, be kind, be funny, your identity stays hidden.",
      },
      {
        icon: Send,
        title: "Submit",
        description:
          "Click 'Send anonymous message' when you’re ready. Your response goes straight to them, instantly and anonymously.",
      },
      {
        icon: Share2,
        title: "Share on Xolace",
        description:
          "Want your message to reach more people? Toggle the switch to also share it on the Xolace feed.",
      },
      {
        icon: MessageCircle,
        title: "Stay Anonymous",
        description:
          "No profiles, no names-just honest words between you and them.",
      },
      {
        icon: PlusCircle,
        title: "Create Your Own",
        description:
          "Done sending? Why not start your own card? Create one in seconds, share it with friends, and see what they’ll say about you.",
      },
    ],
    hasStepByStep: false,
  },
};

export const getFeatureModalConfig = (route: string): FeatureModalConfig | null => {
  return featureModalConfigs[route] || null;
};
