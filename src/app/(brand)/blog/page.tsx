// blog/page.tsx

import { BlogPage, type SubscribeResult } from "@/components/blog/blogPage";
import { blogs } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

// Render on demand — don't block build waiting for API
export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "ERIX blog: WhatsApp, CRM and automation tips",
  description:
    "Practical notes on selling over WhatsApp, running a pipeline, GST invoicing and automation for Indian SMBs, from the team building ERIX at ECODrIx.",
  path: "/blog",
});

export default async function BlogListPage({ searchParams }: { searchParams: Promise<{ subscribed?: string }> }) {
  const [posts, { subscribed }] = await Promise.all([blogs.fetchPublishedPosts(), searchParams]);
  // The confirmation link lands here with ?subscribed=1 (or =expired).
  const result: SubscribeResult = subscribed === "1" || subscribed === "expired" ? subscribed : undefined;

  return <BlogPage posts={posts} subscribed={result} />;
}
