'use client'
import React, { useState, useMemo } from 'react'

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
import { Mail, Copy, Share2, Eye, UserPen } from "lucide-react";
import { MessageModal } from "@/components/modals/message-modal";
import Link from "next/link";
import { toast } from "sonner";
import { useUserState } from '@/lib/store/user';
import { useAnonymousMessages, useMessageSettings, useMarkMessageAsRead } from '@/hooks/useAnonymousMessages';
import { Message } from '@/types/global';
import DashboardSkeletonLoader  from '@/components/loaders/dashboard-loader';
import { MessagesSkeleton } from '@/components/loaders/message-skeleton';
import ShareProfileCardModal from "@/components/modals/share-profile-card-modal";

const DashboardClient = () =>{
    const { user } = useUserState();

     // 1. Fetch live data using our custom hooks
     const { data: settings, isPending: isLoadingSettings, isError: isErrorSettings } = useMessageSettings(user?.id);
     const { data: messages, isPending: isLoadingMessages, isFetching: isFetchingMessages, isError: isErrorMessages } = useAnonymousMessages(user?.id);
     const { mutate: markAsRead } = useMarkMessageAsRead(user?.id);
 
     const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

     const [isShareProfileCard, setIsShareProfileCard] = useState(false);
   
     // 2. Dynamically construct the user's shareable link
     const userLink = useMemo(() => {
         if (settings?.shareable_slug) {
             // Use window.location.origin to be environment-agnostic
             return `${window.location.origin}/x/${settings.shareable_slug}`;
         }
         return "Generating your link...";
     }, [settings]);
  
    const copyLink = async () => {
      try {
        await navigator.clipboard.writeText(userLink);
        toast.success("Link copied!");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast.error("Failed to copy");
      }
    };
  
    const openMessage = (message: Message) => {
        setSelectedMessage(message);
        if (!message.is_read) {
          markAsRead(message.id);
        }
    };
  
    const unreadCount = useMemo(() => {
        return messages?.filter((m) => !m.is_read).length ?? 0;
    }, [messages]);

    // Loading state for settings
    if (isLoadingSettings) {
        return (
            <DashboardSkeletonLoader/>
        );
    }

    if (isErrorMessages) {
        toast.error("Error loading messages")
    }

    const handleShareProfileCard = () => {
      setIsShareProfileCard(true);
    }

  return (
    <>
         {/* Link Sharing Card */}
         <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
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
            <div className={"w-full flex items-center justify-between"}>
              <div className="flex gap-4">
                <Link href={`${userLink}?preview=true`}>
                  <Button variant="outline" size="sm" className="h-9">
                    <Eye className="h-4 w-4 mr-2"/>
                    Preview
                  </Button>
                </Link>
                <Button
                  onClick={handleShareProfileCard}
                  className="relative inline-flex h-9 overflow-hidden rounded-md focus:outline-none shadow-lg transform transition-all hover:scale-105 ">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]">
                    </span>
                  <span className="inline-flex h-full w-full items-center justify-center whitespace-nowrap rounded-md text-white backdrop-blur-sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </span>
                </Button>
              </div>
              <div>
                <Link href={"/customize"}>
                  <Button
                    size="sm"
                    className=" h-9 rounded-full border border-neutral-400"
                  >
                    <span className='hidden md:inline'>Customize</span>
                    <UserPen/>
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5"/>
                Your Messages
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount} unread
                  </Badge>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {messages?.length ?? "..."} total
              </span>
            </CardTitle>
            <CardDescription>
              Click on any message icon to read the anonymous message
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Show skeleton loader while loading messages */}
            {(isFetchingMessages || isLoadingMessages) && !messages && (
                <MessagesSkeleton />
            )}
            
            {/* Show error state */}
            {isErrorMessages && (
                <div className="text-center py-8 text-rose-500">Error loading messages</div>
            )}
            
            {/* Show empty state */}
            {messages?.length === 0 && !isLoadingMessages && !isFetchingMessages && (
              <div className="text-center py-8 text-gray-500">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>
                  No messages yet. Share your link to start receiving anonymous
                  messages!
                </p>
              </div>
            )}
            
            {/* Show messages */}
            {messages && messages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {messages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => openMessage(message)}
                    className="relative p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                  >
                    <Mail
                      className={`h-8 w-8 mx-auto ${
                        message.is_read
                          ? "text-gray-400"
                          : "text-lavender-500 animate-pulse"
                      }`}
                    />
                    {!message.is_read && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(message.created_at).toLocaleDateString()}
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
      {isShareProfileCard && settings && (
        <ShareProfileCardModal
          open={isShareProfileCard}
          onClose={() => setIsShareProfileCard(false)}
          settings={settings}
          />
      )}
    </>
  )
}

export default DashboardClient