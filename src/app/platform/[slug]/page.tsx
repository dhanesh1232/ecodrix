import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import {
  PLATFORM_MODULES,
  getModuleBySlug,
  getModuleSlugs,
} from "@/lib/platform-modules";
import {
  getModuleSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  SEO_CONSTANTS,
} from "@/lib/jsonld";

const { BASE_URL, API_URL } = SEO_CONSTANTS;

/* ──────────────────────────────────────────────────────────────────────
   /platform/[slug] — per-module SEO landing page.
   Each backend domain in `ECOD/server` has a matching page here so any
   organic query about a module surfaces ecodrix.com first.
─────────────────────────────────────────────────────────────────────── */

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return getModuleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = getModuleBySlug(slug);
  if (!m) return { title: "Module not found" };

  return {
    title: `${m.name} (${m.brand})`,
    description: m.description,
    keywords: [...m.searchQueries, m.brand, m.name, "ECODrIx", "ERIX"],
    alternates: { canonical: `${BASE_URL}/platform/${m.slug}` },
    openGraph: {
      title: `${m.name} (${m.brand}) | ECODrIx`,
      description: m.description,
      url: `${BASE_URL}/platform/${m.slug}`,
      type: "website",
    },
  };
}

export default async function PlatformModulePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const m = getModuleBySlug(slug);
  if (!m) notFound();

  // Cross-link to two adjacent modules to drive internal-link equity.
  const idx = PLATFORM_MODULES.findIndex((x) => x.slug === slug);
  const prev =
    PLATFORM_MODULES[
      (idx - 1 + PLATFORM_MODULES.length) % PLATFORM_MODULES.length
    ];
  const next = PLATFORM_MODULES[(idx + 1) % PLATFORM_MODULES.length];

  // Per-module FAQ derived from the description + features.
  const moduleFaqs = [
    {
      q: `What is ${m.brand}?`,
      a: m.longDescription,
    },
    {
      q: `What can I do with ${m.brand}?`,
      a: `${m.brand} ships with: ${m.features.slice(0, 5).join("; ")}; and more. Every feature is exposed through the public ECODrIx API at api.ecodrix.com.`,
    },
    {
      q: `How does ${m.brand} integrate with the rest of ECODrIx?`,
      a: `${m.brand} is one of ${PLATFORM_MODULES.length} modules inside the ECODrIx platform. Data flows seamlessly between modules — leads in ERIX-CRM trigger ERIX-FLOW workflows, ERIX-LAIE feeds enriched leads back into the CRM, and every module emits real-time events over Socket.IO.`,
    },
    ...(m.apiBase
      ? [
          {
            q: `Does ${m.brand} have a public API?`,
            a: `Yes. ${m.brand} exposes its endpoints at ${API_URL}${m.apiBase}. Authentication uses tenant API keys (x-api-key + x-client-code) for SaaS-console traffic, or scoped tokens for LAIE and admin surfaces. Full reference is available in the API documentation.`,
          },
        ]
      : []),
  ];

  return (
    <main className="bg-background text-white min-h-screen overflow-x-hidden">
      {/* JSON-LD: SoftwareApplication + Breadcrumb + FAQ */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getModuleSchema({
              slug: m.slug,
              name: m.name,
              brand: m.brand,
              description: m.description,
              features: m.features,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Platform", url: "/platform" },
              { name: m.name, url: `/platform/${m.slug}` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(moduleFaqs)),
        }}
      />

      {/* ── Hero ── */}
      <section className="pt-40 pb-16 px-6 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          aria-hidden
          style={{
            width: "700px",
            height: "400px",
            background: `conic-gradient(from 270deg at 50% 0%, transparent 55deg, ${m.color}33 85deg, ${m.color}11 115deg, transparent 155deg)`,
            filter: "blur(14px)",
          }}
        />
        <div className="wrapper relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-text-lo mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/platform"
              className="hover:text-white transition-colors"
            >
              Platform
            </Link>
            <span>/</span>
            <span className="text-white">{m.name}</span>
          </nav>

          <div
            className="pill mb-6"
            style={{
              color: m.color,
              borderColor: `${m.color}40`,
              background: `${m.color}10`,
            }}
          >
            {m.brand}
          </div>
          <h1
            className="font-display font-black text-white mb-6 max-w-4xl"
            style={{
              fontSize: "clamp(2.6rem, 7vw, 4.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            {m.name}.
          </h1>
          <p
            className="max-w-2xl leading-relaxed mb-8"
            style={{
              fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)",
              color: "#A8A8B3",
            }}
          >
            {m.tagline}
          </p>
          <p
            className="text-text-lo max-w-3xl leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.05rem)" }}
          >
            {m.longDescription}
          </p>

          {m.apiBase && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-widest font-mono text-text-lo">
                API base
              </span>
              <code
                className="font-mono text-[12px] text-white"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  padding: "6px 12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  clipPath:
                    "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                }}
              >
                {API_URL}
                {m.apiBase}
              </code>
            </div>
          )}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-6 sep-top" style={{ background: "#060608" }}>
        <div className="wrapper">
          <div className="pill mb-6">Capabilities</div>
          <h2
            className="font-display font-black text-white mb-12"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.04em",
            }}
          >
            What ships in {m.brand}.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {m.features.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5"
                style={{
                  background: "#0D0D14",
                  border: "1px solid rgba(255,255,255,0.05)",
                  clipPath:
                    "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                }}
              >
                <div
                  className="shrink-0 w-6 h-6 flex items-center justify-center mt-0.5"
                  style={{
                    background: `${m.color}15`,
                    border: `1px solid ${m.color}40`,
                    clipPath:
                      "polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)",
                  }}
                >
                  <Check size={12} style={{ color: m.color }} />
                </div>
                <p className="text-text-mid text-sm leading-relaxed">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6">
        <div className="wrapper">
          <div className="pill mb-6">Common questions</div>
          <h2
            className="font-display font-black text-white mb-12"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.04em",
            }}
          >
            About {m.brand}.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {moduleFaqs.map(({ q, a }) => (
              <div key={q} className="p-8 bg-[#0A0A10]">
                <h3 className="text-white font-bold mb-3 text-base">{q}</h3>
                <p className="text-text-lo text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cross-links to other modules ── */}
      <section className="py-20 px-6 sep-top" style={{ background: "#060608" }}>
        <div className="wrapper">
          <div className="pill mb-6">Continue exploring</div>
          <h2
            className="font-display font-black text-white mb-10"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              letterSpacing: "-0.04em",
            }}
          >
            More modules in the ECODrIx platform.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[prev, next].map((other) => (
              <Link
                key={other.slug}
                href={`/platform/${other.slug}`}
                className="group flex items-center justify-between p-6 border border-white/8 hover:border-white/20 transition-colors"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  clipPath:
                    "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
                }}
              >
                <div>
                  <div
                    className="text-[10px] font-mono uppercase tracking-widest mb-2"
                    style={{ color: other.color }}
                  >
                    {other.brand}
                  </div>
                  <div className="text-white font-bold text-base mb-1">
                    {other.name}
                  </div>
                  <div className="text-text-lo text-xs">{other.tagline}</div>
                </div>
                <ArrowRight
                  size={18}
                  className="text-text-lo group-hover:text-white group-hover:translate-x-1 transition-all"
                />
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/platform"
              className="inline-flex items-center gap-2 text-text-lo hover:text-white text-sm transition-colors"
            >
              <ArrowRight size={14} className="rotate-180" />
              All platform modules
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
