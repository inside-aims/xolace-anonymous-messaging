// /hooks/useSendMessage.ts

import { useQuery, useMutation } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import type { Settings } from '@/types/global';

// Hook to fetch a user's public settings by their shareable slug
export function useMessagePageSettings(slug: string) {
  const supabase = getSupabaseBrowserClient();

  return useQuery({
    queryKey: ['message-page-settings', slug],
    queryFn: async () => {
        console.log("Fetching settings for slug:", slug);
      const { data, error } = await supabase
        .from('anonymous_messaging_settings')
        .select('*')
        .eq('shareable_slug', slug)
        .single(); // Expect only one result

      // If no data is returned, the link is invalid
      if (!data) {
        console.error("No data returned for slug:", error);
        throw new Error("This message link doesn't seem to exist.");
      }
      if (error) {
        throw error;
      }
      return data as Settings;
    },
    enabled: !!slug, // Only run if a slug is present in the URL
    staleTime: 1000 * 60 * 15, // Cache settings for 15 minutes, as they don't change often
    retry: 1, // Only retry once if the fetch fails
  });
}

// Hook for the mutation to send an anonymous message
export function useSendMessage() {
    const supabase = getSupabaseBrowserClient();
    return useMutation({
        mutationFn: async ({ content, recipientId }: { content: string, recipientId: string }) => {
            const { error } = await supabase
                .from('anonymous_messages')
                .insert({
                    content: content,
                    recipient_id: recipientId,
                });
            
            if (error) throw new Error(error.message);
        },
        onError: (error) => {
            toast.error("Message failed to send.", {
                description: error.message
            });
        }
    });
}