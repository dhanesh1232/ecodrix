import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/api";
import { SEO_CONSTANTS } from "@/lib/jsonld";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPublishedBlogs();
  return posts.map((post) => ({ slug: post.slug! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const url = `${SEO_CONSTANTS.BASE_URL}/blog/${post.slug}`;
  return {
    title: post.metaTitle || `${post.title} — ECODrIx`,
    description: post.metaDescription || undefined,
    keywords: post.metaKeywords?.length ? post.metaKeywords : undefined,
    alternates: { canonical: post.canonicalUrl || url },
    openGraph: {
      title: post.metaTitle || post.title || undefined,
      description: post.metaDescription || undefined,
      url,
      type: "article",
      publishedTime: post.publishDate || undefined,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: post.featuredImage?.url
        ? [
            {
              url: post.featuredImage.url,
              alt: post.featuredImage.altText || post.title || "",
            },
          ]
        : undefined,
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
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: post.featuredImage?.url,
    datePublished: post.publishDate,
    dateModified: post.updatedAt || post.publishDate,
    author: {
      "@type": "Person",
      name: post.author?.name || "ECODrIx Team",
    },
    publisher: {
      "@type": "Organization",
      name: "ECODrIx",
      url: SEO_CONSTANTS.BASE_URL,
    },
    mainEntityOfPage: `${SEO_CONSTANTS.BASE_URL}/blog/${post.slug}`,
    wordCount: post.wordCount,
    keywords: post.metaKeywords?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-sm text-muted-foreground"
        >
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="hover:text-accent">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="truncate text-foreground font-medium">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-10">
          {post.category && (
            <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              {post.category}
            </span>
          )}
          <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {post.author?.name && (
              <span className="font-medium text-foreground">
                {post.author.name}
              </span>
            )}
            {post.publishDate && (
              <time dateTime={post.publishDate}>
                {new Date(post.publishDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            )}
            {post.readTime && <span>{post.readTime} min read</span>}
            {post.views > 0 && <span>{post.views} views</span>}
          </div>
          {post.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Featured image */}
        {post.featuredImage?.url && (
          <div className="relative mb-10 aspect-[2/1] overflow-hidden rounded-2xl">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.altText || post.title || ""}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        {/* Body */}
        <div
          className="prose prose-lg prose-neutral dark:prose-invert max-w-none
            prose-headings:font-display prose-headings:tracking-tight
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-pre:bg-muted"
          dangerouslySetInnerHTML={{ __html: post.body || "" }}
        />

        {/* Footer CTA */}
        <footer className="mt-16 rounded-2xl border border-border bg-muted/50 p-8 text-center">
          <p className="text-lg font-semibold text-foreground">
            Ready to automate your business?
          </p>
          <p className="mt-2 text-muted-foreground">
            ECODrIx handles CRM, WhatsApp, email, and scheduling — all via one
            API.
          </p>
          <Link
            href="/pricing"
            className="mt-4 inline-block rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent/90"
          >
            Get Started →
          </Link>
        </footer>
      </article>
    </>
  );
}
