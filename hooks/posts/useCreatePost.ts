import { getSupabaseBrowserClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreatePost() {
    const supabase = getSupabaseBrowserClient();
    return useMutation({
        mutationFn: async ({ content }: { content: string}) => {

            const selectedMood = 'neutral'
            const is24HourPost = false
            const expires_at = undefined
            const is_prompt_response = false
            const tags = ['anonymousMessaging']
            const type = 'single'
            const slidesWithoutTags = [] as string[]

            const { data: post_id, error: postError } = await supabase.rpc(
                'create_post_with_tags',
                {
                  content: content,
                  mood: selectedMood,
                  expires_in_24hr: is24HourPost,
                  duration: undefined,
                  expires_at,
                  is_sensitive: false,
                  is_prompt_response,
                  tag_names: tags,
                  type,
                  slide_contents: slidesWithoutTags,
                  campfire_id: undefined,
                  daily_prompt_id: undefined,
                  is_reshared_anon_meg: true,
                },
              );
            
            if (postError) throw new Error(postError.message);
        },
        onSuccess: () => {
            toast.success("Message re-shared to feed successfully!");
        },
        onError: (error) => {
            toast.error("Message failed to re-share.", {
                description: error.message
            });
        }
    });
}