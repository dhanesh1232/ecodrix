import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPublishedBlogs } from "@/lib/api";
import { SEO_CONSTANTS } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Blog — ECODrIx",
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
  const posts = await getPublishedBlogs();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <header className="mb-12 text-center">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Blog
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Automation insights, CRM strategies, and product updates from the
          ECODrIx team.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No posts published yet. Check back soon.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {post.featuredImage?.url && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.altText || post.title || ""}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                {post.category && (
                  <span className="mb-2 inline-block w-fit rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent">
                    {post.category}
                  </span>
                )}
                <h2 className="mb-2 font-display text-lg font-bold leading-snug text-foreground line-clamp-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="after:absolute after:inset-0"
                  >
                    {post.title}
                  </Link>
                </h2>
                {post.metaDescription && (
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                    {post.metaDescription}
                  </p>
                )}
                <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
                  {post.author?.name && <span>{post.author.name}</span>}
                  {post.publishDate && (
                    <time dateTime={post.publishDate}>
                      {new Date(post.publishDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                  )}
                  {post.readTime && <span>· {post.readTime} min read</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
