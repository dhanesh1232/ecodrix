import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import {
  COMPARISONS,
  getComparisonBySlug,
  getComparisonSlugs,
} from "@/lib/comparisons";
import { getFAQSchema, getBreadcrumbSchema, SEO_CONSTANTS } from "@/lib/jsonld";

const { BASE_URL } = SEO_CONSTANTS;

/* ──────────────────────────────────────────────────────────────────────
   /compare/[slug] — "ECODrIx vs {Competitor}" comparison page.
   Targets high-intent India decision queries and AI "alternatives to X"
   prompts. Honest, factual framing; no fabricated ratings.
─────────────────────────────────────────────────────────────────────── */

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return getComparisonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparisonBySlug(slug);
  if (!c) return { title: "Comparison not found" };

  const title = `ECODrIx vs ${c.competitor}: WhatsApp CRM Comparison (2026)`;
  return {
    title,
    description: c.description,
    keywords: [
      ...c.searchQueries,
      "ECODrIx",
      "ERIX",
      c.competitor,
      "WhatsApp CRM India",
    ],
    alternates: { canonical: `${BASE_URL}/compare/${c.slug}` },
    openGraph: {
      title: `${title} | ECODrIx`,
      description: c.description,
      url: `${BASE_URL}/compare/${c.slug}`,
      type: "website",
    },
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const c = getComparisonBySlug(slug);
  if (!c) notFound();

  const others = COMPARISONS.filter((x) => x.slug !== slug);

  return (
    <div
      className="bg-background text-foreground min-h-screen overflow-x-hidden"
      style={{ "--c": c.color } as React.CSSProperties}
    >
      {/* JSON-LD: Breadcrumb + FAQ (no fabricated ratings) */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Compare", url: "/compare" },
              { name: `ECODrIx vs ${c.competitor}`, url: `/compare/${c.slug}` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(c.faqs)),
        }}
      />

      {/* ── Hero ── */}
      <section className="pt-40 pb-16 px-6 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-[700px] h-[400px] blur-[14px]"
          aria-hidden
          style={{
            background: `conic-gradient(from 270deg at 50% 0%, transparent 55deg, ${c.color}33 85deg, ${c.color}11 115deg, transparent 155deg)`,
          }}
        />
        <div className="wrapper relative z-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-subtle mb-6"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/compare"
              className="hover:text-foreground transition-colors"
            >
              Compare
            </Link>
            <span>/</span>
            <span className="text-foreground">ECODrIx vs {c.competitor}</span>
          </nav>

          <div className="pill mb-6 text-[var(--c)] border-[var(--c)]/25 bg-[var(--c)]/6">
            Comparison
          </div>
          <h1 className="font-display font-black text-foreground mb-6 max-w-4xl text-[clamp(2.4rem,6.5vw,4.2rem)] tracking-[-0.04em] leading-[1.05]">
            ECODrIx (ERIX) vs {c.competitor}.
          </h1>
          <p className="max-w-3xl leading-relaxed text-muted-foreground text-[clamp(1rem,2vw,1.2rem)]">
            {c.tldr}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-accent-foreground text-sm rounded-xl bg-[var(--c)]"
            >
              Start 14-day free trial <ArrowRight size={16} />
            </Link>
            <Link
              href="/platform/crm"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-foreground text-sm border border-foreground/15 hover:border-foreground/30 transition-colors"
            >
              Explore ERIX CRM
            </Link>
          </div>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="py-20 px-6 sep-top bg-background">
        <div className="wrapper">
          <div className="pill mb-6">Side by side</div>
          <h2 className="font-display font-black text-foreground mb-10 text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.04em]">
            ERIX vs {c.competitor}, feature by feature.
          </h2>

          <div className="overflow-hidden border border-foreground/8 rounded-sm">
            {/* header row */}
            <div className="grid grid-cols-3 text-xs uppercase tracking-widest font-sans bg-foreground/3">
              <div className="p-4 text-subtle">Feature</div>
              <div className="p-4 font-bold text-[var(--c)]">
                ECODrIx (ERIX)
              </div>
              <div className="p-4 text-muted-foreground">{c.competitor}</div>
            </div>
            {c.rows.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-3 text-sm border-t border-foreground/5 ${
                  i % 2 ? "" : "bg-foreground/[0.01]"
                }`}
              >
                <div className="p-4 text-muted-foreground font-medium">
                  {row.dimension}
                </div>
                <div className="p-4 text-muted-foreground flex gap-2">
                  {row.ecodrixWins ? (
                    <Check
                      size={16}
                      className="shrink-0 mt-0.5 text-[var(--c)]"
                    />
                  ) : (
                    <Minus size={16} className="shrink-0 mt-0.5 text-subtle" />
                  )}
                  <span>{row.ecodrix}</span>
                </div>
                <div className="p-4 text-subtle">{row.competitor}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── When each wins (trust-building honesty) ── */}
      <section className="py-20 px-6">
        <div className="wrapper grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-8 rounded-2xl bg-[var(--c)]/4 border border-[var(--c)]/20">
            <h3 className="text-foreground font-bold mb-3">
              When ERIX is the better pick
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {c.ecodrixBestFor}
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-foreground/[0.02] border border-foreground/8">
            <h3 className="text-foreground font-bold mb-3">
              When {c.competitor} is the better pick
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {c.competitorBestFor}
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 sep-top bg-background">
        <div className="wrapper">
          <div className="pill mb-6">Common questions</div>
          <h2 className="font-display font-black text-foreground mb-12 text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.04em]">
            ECODrIx vs {c.competitor}, answered.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5">
            {c.faqs.map(({ q, a }) => (
              <div key={q} className="p-8 bg-surface">
                <h3 className="text-foreground font-bold mb-3 text-base">
                  {q}
                </h3>
                <p className="text-subtle text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <p className="text-subtle text-xs mt-6">
            {c.competitor} details last verified {c.lastVerified}. Competitor
            pricing and features change frequently — verify current terms on
            their site before deciding.
          </p>
        </div>
      </section>

      {/* ── Other comparisons ── */}
      <section className="py-20 px-6">
        <div className="wrapper">
          <div className="pill mb-6">More comparisons</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/compare/${other.slug}`}
                className="group flex items-center justify-between p-6 border border-foreground/8 hover:border-foreground/20 transition-colors rounded-2xl bg-foreground/[0.02]"
              >
                <div>
                  <div className="text-foreground font-bold text-base mb-1">
                    ECODrIx vs {other.competitor}
                  </div>
                  <div className="text-subtle text-xs">
                    {other.searchQueries[0]}
                  </div>
                </div>
                <ArrowRight
                  size={18}
                  className="text-subtle group-hover:text-foreground group-hover:translate-x-1 transition-all"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
