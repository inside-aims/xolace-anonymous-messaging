// /hooks/useAnonymousMessages.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSupabaseBrowserClient } from '@/utils/supabase/client';
import type { Message, Settings } from '@/types/global';
import { toast } from 'sonner';

// Hook to get user-specific settings (share link, etc.)
export function useMessageSettings(userId?: string) {
  const supabase = getSupabaseBrowserClient();
  return useQuery({
    queryKey: ['message-settings', userId],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_or_create_message_settings').single();
      console.log(error)
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!userId,
  });
}

// Hook to fetch the list of anonymous messages for a user
export function useAnonymousMessages(userId?: string) {
    const supabase = getSupabaseBrowserClient();
    return useQuery({
        queryKey: ['anonymous-messages', userId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('anonymous_messages')
                .select('*')
                .eq('recipient_id', userId!)
                .order('created_at', { ascending: false });
            if (error) throw new Error(error.message);
            return data as Message[];
        },
        enabled: !!userId,
    });
}

// Hook to create a mutation for marking a message as read
export function useMarkMessageAsRead(userId?: string) {
    const queryClient = useQueryClient();
    const supabase = getSupabaseBrowserClient();
    return useMutation({
        mutationFn: async (messageId: string) => {
            const { error } = await supabase
                .from('anonymous_messages')
                .update({ is_read: true })
                .eq('id', messageId)
                .eq('recipient_id', userId!); // Ensure users can only update their own messages
            if (error) throw new Error(error.message);
        },
        onSuccess: () => {
            // Invalidate the queries to refetch the message list and update the UI
            queryClient.invalidateQueries({ queryKey: ['anonymous-messages', userId] });
        }
    });
}

export function useUpdateMessageSettings(userId?: string) {
    const queryClient = useQueryClient();
    const supabase = getSupabaseBrowserClient();

    return useMutation({
        mutationFn: async (updatedSettings: Partial<Settings>) => {
            if (!userId) throw new Error("User not authenticated.");

            // Remove user_id from the update payload as it cannot be changed.
            const { user_id, ...settingsToUpdate } = updatedSettings;

            console.log("settingsToUpdate ", settingsToUpdate)
            const { data, error } = await supabase
                .from('anonymous_messaging_settings')
                .update({ ...settingsToUpdate, updated_at: new Date().toISOString() })
                .eq('user_id', userId)
                .select()
                .single();
            
            if (error) throw new Error(error.message);
            return data;
        },
        onSuccess: (data) => {
            // Invalidate the query to ensure the cache is fresh for the next visit.
            queryClient.invalidateQueries({ queryKey: ['message-settings', userId] });
            toast.success("Your settings have been saved!");
        },
        onError: (error) => {
            console.log(error)
            toast.error("Failed to save settings", { description: error.message });
        }
    });
}