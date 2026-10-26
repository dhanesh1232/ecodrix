import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { MkSection, PrimaryCta } from "@/components/marketing/kit";

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export function BlogPage({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="w-full">
      <section className="erix-mk-section erix-mk-section--subtle pt-12! md:pt-16!">
        <div className="wrapper">
          <h1 className="text-[clamp(38px,5.4vw,60px)] leading-[1.04] tracking-[-0.035em]">The ERIX blog</h1>
          <p className="mt-5 max-w-[58ch] text-[clamp(16px,1.5vw,19px)] leading-relaxed text-muted-foreground">
            Practical notes on selling over WhatsApp, running a pipeline, GST invoicing and automation, from the team
            building ERIX at ECODrIx.
          </p>
        </div>
      </section>

      <MkSection id="posts">
        {posts.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-[16px] bg-background p-8 text-center">
            <Icon name="file-text" size={24} variant="duo" className="mx-auto text-accent" />
            <h2 className="mt-4 font-sans text-[19px] font-semibold tracking-normal">No posts yet</h2>
            <p className="mt-2 text-muted-foreground">The first articles are on their way. Join the waitlist to hear when ERIX opens.</p>
            <div className="mt-6 flex justify-center">
              <PrimaryCta />
            </div>
          </div>
        ) : (
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.id}>
                <article className="group relative flex h-full flex-col">
                  {post.featuredImage?.url && (
                    <div className="relative aspect-video overflow-hidden rounded-[16px] shadow-[var(--shadow-card)]">
                      <Image
                        src={post.featuredImage.url}
                        alt={post.featuredImage.altText || post.title || ""}
                        fill
                        className="object-cover transition-[scale] duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col pt-5">
                    {post.category && <p className="text-[13px] font-semibold text-accent">{post.category}</p>}
                    <h2 className="mt-2 text-[21px] leading-snug tracking-[-0.015em]">
                      <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-accent">
                        {post.title}
                      </Link>
                    </h2>
                    {post.metaDescription && (
                      <p className="mt-2 line-clamp-3 text-[15px] text-muted-foreground">{post.metaDescription}</p>
                    )}
                    <p className="mt-auto flex flex-wrap items-center gap-x-3 pt-4 text-[13px] text-subtle">
                      {post.author?.name && <span>{post.author.name}</span>}
                      {post.publishDate && <time dateTime={post.publishDate}>{fmt(post.publishDate)}</time>}
                      {post.readTime && <span>{post.readTime} min read</span>}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </MkSection>
    </div>
  );
}
