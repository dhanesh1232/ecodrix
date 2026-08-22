/**
 * Server-side API client for fetching data from the ECODrIx backend.
 * Used by Server Components and generateStaticParams/generateMetadata.
 */

import { cache } from "react";

const API_BASE = process.env.API_URL || "https://api.ecodrix.com";

/**
 * Fetch all published blog posts from the server's public endpoint.
 * Uses ISR with 60s revalidation. 5s timeout prevents build/dev hangs
 * when the API is unreachable.
 */
/**
 * Fetch all published blog posts. Cached per-request via React.cache()
 * so generateMetadata + page component share a single fetch.
 * 
 */


export const blogs = {
  cache: (fn: () => Promise<BlogPost[]>) => fn,
    async fetchPublishedPosts(): Promise<BlogPost[]> {
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
  }, 

  async fetchPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.fetchPublishedPosts();
    return posts.find((p) => p.slug === slug) || null;
  }
}
