import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function BlogPage({ posts }: { posts: BlogPost[] }) {

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 h-full flex-1 flex flex-col">
      <div className="mb-8 text-center">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Blog
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
          Automation insights, CRM strategies, and product updates from the
          ECODrIx team.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-center text-muted-foreground">
            No posts published yet. Check back soon.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group relative flex flex-col overflow-hidden border border-border bg-card transition-all"
            >
              {/* Shiny sweep layer on hover */}
              <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.04)_45%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.04)_55%,transparent_60%)] -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </div>
              {post.featuredImage?.url && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post?.featuredImage.url}
                    alt={post?.featuredImage.altText || post?.title || ""}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                {post.category && (
                  <span className="mb-2 inline-block w-fit bg-accent/10 px-2.5 py-0.5 text-xs font-semibold tracking-wider text-accent">
                    {post.category}
                  </span>
                )}
                <h2 className="mb-2 font-display text-lg font-bold leading-snug text-foreground line-clamp-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="after:absolute after:inset-0 after:z-20"
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

      {/* CTA */}
      <div className="mt-20 border-t border-border pt-14 text-center">
        <h2 className="text-foreground font-display font-bold text-2xl mb-3">
          Ready to automate your business?
        </h2>
        <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
          CRM, WhatsApp, email, AI lead gen — one platform, no per-seat pricing.
        </p>
        <Link
          href="/#contact"
          className="btn-primary text-foreground group inline-flex items-center gap-2"
        >
          Join
          <ArrowRight
            size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}