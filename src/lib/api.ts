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

        // Public endpoint: published posts only, no credentials needed.
        const res = await fetch(`${API_BASE}/v1/api/platform/public/blogs`, {
          next: { revalidate: 60 },
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!res.ok) return [];
        const json: BlogListResponse = await res.json();
        // The server sends live posts only (published and past their date), without bodies.
        return json.data || [];
      } catch {
        return [];
      }
  }, 

  /** One live post with its body; null when it's not live or doesn't exist. */
  async fetchPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const res = await fetch(
        `${API_BASE}/v1/api/platform/public/blogs/${encodeURIComponent(slug)}`,
        { next: { revalidate: 60 }, signal: AbortSignal.timeout(5000) },
      );
      if (!res.ok) return null;
      return ((await res.json()) as { data?: BlogPost }).data ?? null;
    } catch {
      return null;
    }
  }
}
