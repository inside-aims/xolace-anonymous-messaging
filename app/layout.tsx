import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";

export const viewport: Viewport = {
  maximumScale: 1,
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: "%s | Xolace",
    default: "Xolace", // a default is required when creating a template
  },
  applicationName: "Xolace",
  description:
    "Xolace is a social platform designed for users to share their thoughts, stories, and experiences freely, fostering peer to peer engagement, self-expression and professional mental healthcare support in a unique, user-centered, community-like space",
  keywords: [
    "Xolace",
    "Social",
    "Platform",
    "Thoughts",
    "Stories",
    "Experiences",
    "Fostering",
    "Engagement",
    "Self-Expression",
    "Unique",
    "User-Centered",
    "Space",
    "Communities",
    "Healthcare",
    "Mental healthcare",
    "Professional Support",
    "Anonymous",
    "Messaging",
  ],
  creator: "Xolace Inc.",
  publisher: "Xolace Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title:
      "Xolace | Social experiencing platform with a touch of mental health support",
    description:
      "Xolace is a social platform designed for users to share their thoughts, stories, and experiences freely, fostering peer to peer engagement, self-expression and professional mental healthcare support in a unique, user-centered, community-like space",
    url: "https://xolace.app",
    siteName: "Xolace",
    images: [
      {
        url: "/assets/images/x-logo-full.webp",
        width: 1200,
        height: 630,
        alt: "Xolace OG Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <main>
            {children}
            <Toaster richColors />
          </main>
        </Providers>
      </body>
    </html>
  );
}
