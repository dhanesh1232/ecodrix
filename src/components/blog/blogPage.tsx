import Image from "next/image";
import Link from "next/link";
import { SubscribeForm } from "@/components/blog/SubscribeForm";
import { Icon } from "@/components/icons";
import { MkSection, PrimaryCta } from "@/components/marketing/kit";
import { cn } from "@/lib/utils";

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const label = (c: string) => c.charAt(0).toUpperCase() + c.slice(1);

/** After the confirmation link: `?subscribed=1` (done) or `expired` (link too old). */
export type SubscribeResult = "1" | "expired" | undefined;

function Meta({ post }: { post: BlogSummary }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-subtle">
      {post.author?.name && (
        <span className="flex items-center gap-1.5 font-medium text-muted-foreground">
          <span
            aria-hidden="true"
            className="grid size-5 place-items-center rounded-full bg-accent-muted text-[10px] font-bold text-accent"
          >
            {post.author.name.charAt(0)}
          </span>
          {post.author.name}
        </span>
      )}
      {post.publishDate && <time dateTime={post.publishDate}>{fmt(post.publishDate)}</time>}
      {post.readTime && <span>{post.readTime} min read</span>}
    </p>
  );
}

/** One post. `lead` is the large first card: image beside the text on wide screens. */
export function PostCard({ post, lead }: { post: BlogSummary; lead?: boolean }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col",
        lead && "lg:grid lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-10",
      )}
    >
      {post.featuredImage?.url && (
        <div className="relative aspect-video overflow-hidden rounded-[16px] bg-background shadow-[var(--shadow-card)]">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.altText || post.title || ""}
            fill
            priority={lead}
            className="object-cover transition-[scale] duration-500 group-hover:scale-[1.02]"
            sizes={
              lead ? "(max-width: 1024px) 100vw, 640px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
          />
        </div>
      )}
      <div className={cn("flex flex-1 flex-col pt-5", lead && "lg:pt-0")}>
        {post.category && (
          <p className="w-fit rounded-sm bg-accent-muted px-2 py-0.5 text-[12px] font-semibold text-accent">
            {label(post.category)}
          </p>
        )}
        <h2
          className={cn(
            "mt-3 leading-snug tracking-[-0.015em]",
            lead ? "text-[clamp(24px,2.6vw,32px)]" : "text-[20px]",
          )}
        >
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-accent">
            {post.title}
          </Link>
        </h2>
        {post.metaDescription && (
          <p
            className={cn("mt-2 text-muted-foreground", lead ? "line-clamp-4 text-[16px]" : "line-clamp-3 text-[15px]")}
          >
            {post.metaDescription}
          </p>
        )}
        <div className={cn("pt-4", lead ? "mt-4" : "mt-auto")}>
          <Meta post={post} />
        </div>
        {lead && (
          <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-[650] text-accent">
            Read the post
            <Icon name="arrow-right" size={14} variant="line" />
          </span>
        )}
      </div>
    </article>
  );
}

export function BlogPage({ posts, subscribed }: { posts: BlogSummary[]; subscribed?: SubscribeResult }) {
  // The post pinned in admin leads; otherwise the newest.
  const latest = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== latest);
  return (
    <div className="w-full">
      <section data-tone="subtle" className="py-section bg-background pt-12! pb-14! md:pt-16!">
        <div className="mx-auto grid w-full max-w-wrap gap-10 px-gutter lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <h1 className="text-[clamp(38px,5.4vw,60px)] leading-[1.04] tracking-[-0.035em]">The ERIX blog</h1>
            <p className="mt-5 max-w-[56ch] text-[clamp(16px,1.5vw,19px)] leading-relaxed text-muted-foreground">
              Practical notes on selling over WhatsApp, running a pipeline, GST invoicing and automation, from the team
              building ERIX at ECODrIx.
            </p>
          </div>
          <div className="rounded-[16px] bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6">
            {subscribed === "1" ? (
              <p role="status" className="flex items-start gap-2.5 text-[15px] text-foreground">
                <Icon name="circle-check" size={20} variant="duo" className="mt-0.5 shrink-0 text-success" />
                <span>
                  <b className="font-semibold">You&apos;re subscribed.</b> New posts will reach your inbox. Every email
                  has a link to unsubscribe.
                </span>
              </p>
            ) : (
              <>
                <h2 className="font-sans text-[17px] font-semibold tracking-normal">Get new posts by email</h2>
                <p className="mt-1 text-[14px] text-muted-foreground">
                  {subscribed === "expired"
                    ? "That confirmation link has expired. Subscribe again and we'll send a fresh one."
                    : "About twice a month. Nothing else, and no sharing your email."}
                </p>
                <SubscribeForm source="blog" className="mt-4" />
              </>
            )}
          </div>
        </div>
      </section>

      <MkSection id="posts">
        {posts.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-[16px] bg-background p-8 text-center">
            <Icon name="file-text" size={24} variant="duo" className="mx-auto text-accent" />
            <h2 className="mt-4 font-sans text-[19px] font-semibold tracking-normal">No posts yet</h2>
            <p className="mt-2 text-muted-foreground">
              The first articles are on their way. Join the waitlist to hear when ERIX opens.
            </p>
            <div className="mt-6 flex justify-center">
              <PrimaryCta />
            </div>
          </div>
        ) : (
          <>
            <PostCard post={latest} lead />
            {rest.length > 0 && (
              <>
                <h2 className="mt-16 font-sans text-[15px] font-semibold tracking-normal text-muted-foreground">
                  More posts
                </h2>
                <ul className="mt-6 grid gap-x-8 gap-y-12 border-t border-border-soft pt-8 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <li key={post.id}>
                      <PostCard post={post} />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </MkSection>
    </div>
  );
}
