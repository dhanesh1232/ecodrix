import type { Metadata } from "next";
import { SEO_CONSTANTS } from "@/lib/jsonld";
import { blogs } from "@/lib/api";
import { BlogPage } from "@/components/blog/blogPage";

// Render on demand — don't block build waiting for API
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Insights on business automation, WhatsApp CRM, lead generation, and growth strategies for Indian SMEs.",
  alternates: { canonical: `${SEO_CONSTANTS.BASE_URL}/blog` },
  openGraph: {
    title: "ECODrIx Blog",
    description:
      "Automation insights, WhatsApp CRM tips, and growth strategies.",
    url: `${SEO_CONSTANTS.BASE_URL}/blog`,
    type: "website",
  },
};

export default async function BlogListPage() {
  // Fetch server-side where ECODRIX_CORE_API_KEY is available
  const posts = await blogs.fetchPublishedPosts();

  return <BlogPage posts={posts} />;
}
