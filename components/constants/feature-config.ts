import {
  User,
  FileText,
  Palette,
  Settings,
  Eye,
  Save,
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
          "Fine-tune the details—like minimum response length—to keep your page in control.",
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
};

export const getFeatureModalConfig = (route: string): FeatureModalConfig | null => {
  return featureModalConfigs[route] || null;
};
