import { Database } from "./types_db";

type Message = Database['public']['Tables']['anonymous_messages']['Row'];

type Profile = Database['public']['Tables']['profiles']['Row'];
interface SearchParamsInterface{ SearchParams : Promise<{ [key: string]: string | string[] | undefined }>}

type Post = Database['public']['Tables']['posts']['Row'] & {
  posttags: {
    tags: {
      name: string;
    };
  }[];
  comments: {
    count: number;
  }[];
  views:{
    count:number
  }[];
  collections: {user_id: string}[];
  post_slides: {
    content: string;
    slide_index: number;
  }[];
};

type DetailPost = Database['public']['Tables']['posts']['Row'] & {
  posttags: {
    tags: {
      name: string;
    };
  }[];
  votes: Database['public']['Tables']['votes']['Row'][];
  views:[{
    count:number
  }]
  comments: Database['public']['Tables']['comments']['Row'][];
  collections: Database['public']['Tables']['collections']['Row'][];
  post_slides: {
    content: string;
    slide_index: number;
  }[];
};

type User = Database['public']['Tables']['profiles']['Row']

type Comment = Database['public']['Tables']['comments']['Row']

type NestedComment = Comment & { replies: NestedComment[] };

type UserPreferences = Database['public']['Tables']['user_preferences']['Row']

type Tag = Database['public']['Tables']['tags']['Row']

interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

declare interface DropdownListProps {
  options: string[];
  selectedOption: string;
  onOptionSelect: (option: string) => void;
  triggerElement: ReactNode;
}

type SupaVideoDetails = Database['public']['Tables']['videos']['Row'] & {
  video_collections: {user_id: string}[];
}

type Notification = Database['public']['Tables']['notifications']['Row']
