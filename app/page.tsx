"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Copy, Share2, Eye, Settings, Palette } from "lucide-react";
import { MessageModal } from "../components/modals/message-modal";
import { toast } from "sonner";
import Link from "next/link";

// Dummy data for demonstration
const dummyMessages = [
  {
    id: "1",
    content:
      "Thank you for being such an amazing friend! Your kindness always brightens my day. 🌟",
    timestamp: "2024-01-15T10:30:00Z",
    isRead: false,
  },
  {
    id: "2",
    content:
      "I really admire your dedication and hard work. You inspire me to be better every day!",
    timestamp: "2024-01-14T15:45:00Z",
    isRead: true,
  },
  {
    id: "3",
    content:
      "Your presentation yesterday was incredible! The way you explained complex topics was so clear.",
    timestamp: "2024-01-13T09:20:00Z",
    isRead: false,
  },
  {
    id: "4",
    content:
      "Just wanted to say that your positive energy is contagious. Keep being awesome! ✨",
    timestamp: "2024-01-12T14:10:00Z",
    isRead: true,
  },
  {
    id: "5",
    content:
      "I love how you always make time to help others. Your generosity doesn't go unnoticed.",
    timestamp: "2024-01-11T11:55:00Z",
    isRead: false,
  },
];

export default function Dashboard() {
  const [messages, setMessages] = useState(dummyMessages);
  const [selectedMessage, setSelectedMessage] = useState<
    (typeof dummyMessages)[0] | null
  >(null);
  const [userLink] = useState("https://anonymous-msg.app/u/john-doe-123");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(userLink);
      toast.success("Link copied!");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const openMessage = (message: (typeof dummyMessages)[0]) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, isRead: true } : m))
      );
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Anonymous Messages
          </h1>
          <p className="text-gray-600">
            Share your link and receive anonymous messages from friends
          </p>
        </div>

        {/* Link Sharing Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Your Anonymous Message Link
            </CardTitle>
            <CardDescription>
              Share this link with friends so they can send you anonymous
              messages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input value={userLink} readOnly className="font-mono text-sm" />
              <Button onClick={copyLink} variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <div className="flex gap-2">
              <Link href="/send/john-doe-123">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </Link>
              <Link href="/customize">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Customize Page
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Messages Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Your Messages
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {messages.length} total
              </span>
            </CardTitle>
            <CardDescription>
              Click on any message icon to read the anonymous message
            </CardDescription>
          </CardHeader>
          <CardContent>
            {messages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>
                  No messages yet. Share your link to start receiving anonymous
                  messages!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {messages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => openMessage(message)}
                    className="relative p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                  >
                    <Mail
                      className={`h-8 w-8 mx-auto ${
                        message.isRead
                          ? "text-gray-400"
                          : "text-purple-600 animate-pulse"
                      }`}
                    />
                    {!message.isRead && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(message.timestamp).toLocaleDateString()}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Message Modal */}
        {selectedMessage && (
          <MessageModal
            message={selectedMessage}
            isOpen={!!selectedMessage}
            onClose={() => setSelectedMessage(null)}
          />
        )}
      </div>
    </div>
  );
}
