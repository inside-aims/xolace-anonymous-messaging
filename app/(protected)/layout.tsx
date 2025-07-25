import React from 'react';
import { createClient } from '@/utils/supabase/server';
import InitUser from '@/lib/store/initUser';


export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const supabase_user_id: string | null =
    (await await supabase.auth.getClaims()).data?.claims?.sub ?? null;
  if (!supabase_user_id) {
    return <></>;
  }

  const { data: profileUser } = await supabase
    .from('profiles')
    .select('*')
    .eq('supabase_user', supabase_user_id)
    .single();

  return (
<>
{children}
<InitUser user={profileUser} />
</>
  );
}
