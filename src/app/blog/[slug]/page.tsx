import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Eye, Calendar } from "lucide-react";
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
        ? [{ url: post.featuredImage.url, alt: post.featuredImage.altText || post.title || "" }]
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="min-h-screen">
        {/* ── Hero band with featured image ── */}
        {post.featuredImage?.url && (
          <div className="relative w-full h-[40vh] min-h-[320px] max-h-[480px] overflow-hidden">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.altText || post.title || ""}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-[var(--canvas)] via-[var(--canvas)]/60 to-transparent" />
          </div>
        )}

        {/* ── Content container ── */}
        <div className="relative max-w-6xl mx-auto px-5 -mt-24 z-10">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={12} />
            All posts
          </Link>

          {/* Category + Title */}
          <header className="mb-10">
            {post.category && (
              <span className="inline-block mb-4 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent bg-accent/8 border border-accent/20">
                {post.category}
              </span>
            )}

            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] tracking-tight text-foreground">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="mt-6 flex flex-wrap items-center gap-5 text-[13px] text-muted-foreground border-b border-border pb-6">
              {post.author?.name && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-accent/10 flex items-center justify-center text-accent text-[10px] font-bold">
                    {post.author.name.charAt(0)}
                  </div>
                  <span className="font-medium text-foreground">{post.author.name}</span>
                </div>
              )}
              {post.publishDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} className="text-muted-foreground" />
                  {new Date(post.publishDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              )}
              {post.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock size={12} className="text-muted-foreground" />
                  {post.readTime} min read
                </span>
              )}
              {post.views > 0 && (
                <span className="flex items-center gap-1.5">
                  <Eye size={12} className="text-muted-foreground" />
                  {post.views.toLocaleString()} views
                </span>
              )}
            </div>

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[11px] text-muted-foreground border border-border hover:border-accent/40 hover:text-accent transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* ── Article body ── */}
          <BlogContent html={post.body || ""} />

          {/* ── Footer ── */}
          <div className="mt-20 mb-4 pt-10 border-t border-border">
            {/* Share / Back */}
            <div className="flex items-center justify-between mb-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                <ArrowLeft size={14} />
                Back to all posts
              </Link>
              <div className="text-[11px] text-muted-foreground uppercase tracking-widest">
                {post.publishDate && new Date(post.publishDate).getFullYear()}
              </div>
            </div>

            {/* CTA band */}
            <div className="border border-border p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-surface">
              <div>
                <p className="text-lg font-display font-bold text-foreground">
                  Automate what you just read about.
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  ECODrIx does CRM, WhatsApp, email, and AI — one platform.
                </p>
              </div>
              <Link
                href="/#contact"
                className="btn-primary shrink-0"
              >
                Join Waitlist →
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
