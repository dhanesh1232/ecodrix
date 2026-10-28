/**
 * Server-side API client for fetching data from the ECODrIx backend.
 * Used by Server Components and generateStaticParams/generateMetadata.
 */

const API_BASE = process.env.API_URL || "https://api.ecodrix.com";

/**
 * GET a public endpoint's `data`, or null when it fails. ISR with 60s
 * revalidation (Next dedupes the same URL within a render); the 5s timeout
 * keeps builds and dev from hanging when the API is unreachable.
 */
async function getData<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return ((await res.json()) as { data?: T }).data ?? null;
  } catch {
    return null;
  }
}

/**
 * The blog is read-only here: posts are written in admin and the server decides
 * what's live (published and past its date, so scheduled posts appear on their own).
 */
export const blogs = {
  /** Live posts, newest first, without bodies. */
  async fetchPublishedPosts(): Promise<BlogSummary[]> {
    return (await getData<BlogSummary[]>("/v1/api/platform/public/blogs")) ?? [];
  },

  /** One live post with its body; null when it's not live or doesn't exist. */
  async fetchPostBySlug(slug: string): Promise<BlogPost | null> {
    const post = await getData<BlogPost>(`/v1/api/platform/public/blogs/${encodeURIComponent(slug)}`);
    if (post) return post;
    // ponytail: an API without the detail route (before the 28 Oct server deploy) lists full
    // posts; a newer API lists no bodies, so this finds nothing there — drop once it's deployed.
    const listed = (await this.fetchPublishedPosts()).find((p) => p.slug === slug);
    return listed && "body" in listed ? (listed as BlogPost) : null;
  },
};
