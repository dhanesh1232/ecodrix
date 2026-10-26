import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { ClosingCta, Crumbs } from "@/components/platform/ModulePage";
import { blogs } from "@/lib/api";
import { SEO_CONSTANTS } from "@/lib/jsonld";
import { BlogContent } from "@/components/blog/BlogContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [];
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await blogs.fetchPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const url = `${SEO_CONSTANTS.BASE_URL}/blog/${post.slug}`;
  // Posts live only on ecodrix.com now (services.ecodrix.com was shut down), so a
  // CMS canonical is honoured only when it points back to this site.
  const sameSite = (u: string) => {
    try {
      return new URL(u, url).host === new URL(url).host;
    } catch {
      return false; // a malformed CMS value falls back to this page's URL
    }
  };
  const canonical =
    post.canonicalUrl && sameSite(post.canonicalUrl) ? post.canonicalUrl : url;
  return {
    // The root template adds " | ECODrIx".
    title: post.metaTitle || post.title,
    description: post.metaDescription || undefined,
    keywords: post.metaKeywords?.length ? post.metaKeywords : undefined,
    alternates: { canonical },
    openGraph: {
      title: post.metaTitle || post.title || undefined,
      description: post.metaDescription || undefined,
      url,
      type: "article",
      publishedTime: post.publishDate || undefined,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: post.featuredImage?.url
        ? [{ url: post.featuredImage.url, alt: post.featuredImage.altText || post.title || "" }]
        : ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title || undefined,
      description: post.metaDescription || undefined,
      images: post.featuredImage?.url ? [post.featuredImage.url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await blogs.fetchPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: post.featuredImage?.url,
    datePublished: post.publishDate,
    dateModified: post.updatedAt || post.publishDate,
    author: { "@type": "Person", name: post.author?.name || "ECODrIx Team" },
    publisher: { "@type": "Organization", name: "ECODrIx", url: SEO_CONSTANTS.BASE_URL },
    mainEntityOfPage: `${SEO_CONSTANTS.BASE_URL}/blog/${post.slug}`,
    wordCount: post.wordCount,
    keywords: post.metaKeywords?.join(", "),
  };

  const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article className="w-full">
        <header className="erix-mk-section erix-mk-section--subtle pt-10! pb-12! md:pt-14!">
          <div className="wrapper max-w-[880px]">
            <Crumbs items={[{ name: "Blog", href: "/blog" }, { name: post.title ?? "Post" }]} />
            {post.category && <p className="mt-6 text-[14px] font-semibold text-accent">{post.category}</p>}
            <h1 className="mt-3 text-[clamp(32px,4.4vw,50px)] leading-[1.08] tracking-[-0.03em]">{post.title}</h1>
            <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-muted-foreground">
              {post.author?.name && (
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="grid size-7 place-items-center rounded-full bg-accent-muted text-[12px] font-bold text-accent"
                  >
                    {post.author.name.charAt(0)}
                  </span>
                  <span className="font-semibold text-foreground">{post.author.name}</span>
                </span>
              )}
              {post.publishDate && (
                <span className="flex items-center gap-1.5">
                  <Icon name="calendar" size={14} variant="line" />
                  <time dateTime={post.publishDate}>{fmt(post.publishDate)}</time>
                </span>
              )}
              {post.readTime && (
                <span className="flex items-center gap-1.5">
                  <Icon name="clock" size={14} variant="line" />
                  {post.readTime} min read
                </span>
              )}
              {post.views > 0 && (
                <span className="flex items-center gap-1.5">
                  <Icon name="eye" size={14} variant="line" />
                  {post.views.toLocaleString("en-IN")} views
                </span>
              )}
            </p>
            {post.tags?.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-[6px] bg-surface px-2 py-0.5 text-[12px] text-muted-foreground shadow-[var(--shadow-card)]">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>

        <div className="erix-mk-section pt-10! md:pt-14!">
          <div className="wrapper max-w-[880px]">
            {post.featuredImage?.url && (
              <div className="relative mb-12 aspect-[16/8] overflow-hidden rounded-[16px] shadow-[var(--shadow-card)]">
                <Image
                  src={post.featuredImage.url}
                  alt={post.featuredImage.altText || post.title || ""}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 900px) 100vw, 880px"
                />
              </div>
            )}
            <div className="mx-auto max-w-[68ch]">
              <BlogContent html={post.body || ""} />
              <p className="mt-16">
                <Link href="/blog" className="erix-mk-link group">
                  <Icon name="arrow-left" size={14} variant="line" />
                  All posts
                </Link>
              </p>
            </div>
          </div>
        </div>
      </article>

      <ClosingCta
        title="Put what you just read to work"
        body="ERIX brings WhatsApp, your pipeline, GST invoices and automation into one workspace. Join the waitlist."
      />
    </>
  );
}
