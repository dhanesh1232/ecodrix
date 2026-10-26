import { pageMetadata } from "@/lib/seo";
import { blogs } from "@/lib/api";
import { BlogPage } from "@/components/blog/blogPage";

// Render on demand — don't block build waiting for API
export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "ERIX blog: WhatsApp, CRM and automation tips",
  description:
    "Practical notes on selling over WhatsApp, running a pipeline, GST invoicing and automation for Indian SMBs, from the team building ERIX at ECODrIx.",
  path: "/blog",
});

export default async function BlogListPage() {
  const posts = await blogs.fetchPublishedPosts();

  return <BlogPage posts={posts} />;
}
