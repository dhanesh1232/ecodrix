/**
 * Server-side API client for fetching data from the ECODrIx backend.
 * Used by Server Components and generateStaticParams/generateMetadata.
 */

import { cache } from "react";

const API_BASE = process.env.API_URL || "https://api.ecodrix.com";

export interface BlogPost {
  id: string;
  _id: string;
  title: string | null;
  slug: string | null;
  body: string | null;
  category: string | null;
  featuredImage: { url?: string | null; altText?: string | null } | null;
  author: {
    id?: string | null;
    name?: string | null;
    avatar?: string | null;
  } | null;
  isPublished: boolean;
  publishDate: string | null;
  featured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  metaKeywords: string[];
  status: string;
  tags: string[];
  readTime: number | null;
  wordCount: number | null;
  views: number;
  likes: number;
  createdAt: string | null;
  updatedAt: string | null;
}

interface BlogListResponse {
  success: boolean;
  data: BlogPost[];
  count: number;
}

/**
 * Fetch all published blog posts from the server's public endpoint.
 * Uses ISR with 60s revalidation. 5s timeout prevents build/dev hangs
 * when the API is unreachable.
 */
/**
 * Fetch all published blog posts. Cached per-request via React.cache()
 * so generateMetadata + page component share a single fetch.
 */
export const getPublishedBlogs = cache(async (): Promise<BlogPost[]> => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`${API_BASE}/v1/api/platform/admin/blogs`, {
      next: { revalidate: 60 },
      signal: controller.signal,
      headers: {
        "x-core-api-key": process.env.ECODRIX_CORE_API_KEY || "",
      },
    });

    clearTimeout(timeout);

    if (!res.ok) return [];
    const json: BlogListResponse = await res.json();
    return (json.data || []).filter(
      (post) => post.isPublished && post.status === "published",
    );
  } catch {
    return [];
  }
});

/**
 * Fetch a single blog post by slug.
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getPublishedBlogs();
  return posts.find((p) => p.slug === slug) || null;
}
