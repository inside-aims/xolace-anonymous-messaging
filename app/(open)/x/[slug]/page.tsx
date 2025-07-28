// /app/c/[slug]/page.tsx  (Example of a better route structure)
import type { Metadata } from "next";
import MessagePage from "./components/MessagePage";

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export const metadata: Metadata = {
  title: "Send anonymous messages",
  description: "Send anonymous messages to your friends and family",
}

export default async function SendMessagePage(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const isPreview = searchParams.preview === "true"
 

  return (
    <MessagePage slug={slug} isPreview={isPreview} />
  );
}