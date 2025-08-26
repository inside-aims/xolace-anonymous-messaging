// /app/c/[slug]/page.tsx  (Example of a better route structure)

"use client"
import { useState } from "react"
import { toast } from "sonner"
import { MessageSendingContainer } from "./message-sending-container"
import { SuccessScreen } from "./success-screen"
import { useMessagePageSettings, useSendMessage } from "@/hooks/useSendMessage";

export default function MessagePage({ slug , isPreview }: { slug: string, isPreview: boolean }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 1. Fetch the page settings using the slug from the URL
  const { data: settings, isLoading, isError, error } = useMessagePageSettings(slug);

  // 2. Get the mutation function for sending a message
  const { mutate: sendMessage, isPending: isSubmitting } = useSendMessage();

  const handleSubmit = (messageText: string, canReshare: boolean) => {
    if (!settings) return; // Should not happen if data is loaded

    if (settings.min_length && messageText.length < settings.min_length) {
      toast.error(`Please write at least ${settings.min_length} characters.`);
      return;
    }
    
    // 3. Call the mutation with the message content and recipient's ID
    sendMessage(
      { content: messageText, recipientId: settings.user_id, canReshare },
      {
        onSuccess: () => {
          setIsSubmitted(true);
          toast.success("Your anonymous message has been sent!");
        }
      }
    );
  };

  const handleSendAnother = () => {
    setIsSubmitted(false);
  };

  // 4. Handle loading and error states for a production-grade experience
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (isError || !settings) {
    console.error(error)
    return (
       <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-gray-800">Link Not Found</h1>
        <p className="text-gray-600 mt-2">{error?.message}</p>
      </div>
    );
  }

  if (isSubmitted) {
    return <SuccessScreen onSendAnother={handleSendAnother} />;
  }

  return (
    <MessageSendingContainer
      settings={settings}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      isPreview={isPreview}
    />
  );
}