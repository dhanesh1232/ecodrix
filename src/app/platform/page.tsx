import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PLATFORM_MODULES, getProductModules, getInfraModules } from "@/lib/platform-modules";
import {
  getBreadcrumbSchema,
  getItemListSchema,
  getFAQSchema,
  SEO_CONSTANTS,
} from "@/lib/jsonld";

const { BASE_URL, API_URL } = SEO_CONSTANTS;

/* ──────────────────────────────────────────────────────────────────────
   /platform — index page covering every module served by api.ecodrix.com.
   Designed so any organic search about a feature surfaces this page
   (and the per-module landing page beneath it).
─────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Platform Modules | ECODrIx",
  description:
    "Every product inside ECODrIx — CRM, WhatsApp, automation, lead intelligence, email marketing, cloud storage, client portal, ErixStore, and Relay Fabric. One platform, one login, one API.",
  keywords: [
    "ECODrIx platform",
    "ECODrIx products",
    "ECODrIx API",
    "ECODrIx modules",
    "ECODrIx features",
    "unified business platform",
    "CRM WhatsApp automation",
  ],
  alternates: { canonical: `${BASE_URL}/platform` },
  openGraph: {
    title: "Platform Modules | ECODrIx",
    description:
      "Every product inside ECODrIx — CRM, WhatsApp, automation, lead intelligence, email, storage, and more.",
    url: `${BASE_URL}/platform`,
    type: "website",
  },
};

const PLATFORM_FAQS = [
  {
    q: "What does the ECODrIx platform include?",
    a: "ECODrIx includes a CRM with kanban pipeline (ERIX-CRM), WhatsApp Business API and unified inbox, a visual workflow automation engine (ERIX-FLOW), B2B lead intelligence (ERIX-LAIE), email marketing on AWS SES, cloud storage on Cloudflare R2, a meeting scheduler, a branded client portal, the ErixStore in-memory database, and the Relay Fabric distributed worker engine.",
  },
  {
    q: "Is there a public ECODrIx API?",
    a: "Yes. The ECODrIx API is served at https://api.ecodrix.com. It exposes REST endpoints for CRM, conversations, automation flows, lead intelligence, channel connections, storage, and the client portal. Authentication is handled via per-tenant API keys (x-api-key + x-client-code), scoped LAIE keys, or platform session tokens depending on the surface.",
  },
  {
    q: "Can I use just one module of ECODrIx?",
    a: "Yes. While the modules are tightly integrated (a lead in ERIX-CRM can trigger an ERIX-FLOW workflow that sends a WhatsApp template), you can adopt them one at a time. The Free plan includes every module at starter quotas, so you can start with just the CRM or just WhatsApp and expand as you grow.",
  },
  {
    q: "Does ECODrIx offer real-time updates?",
    a: "Yes. ECODrIx exposes a Socket.IO endpoint at wss://api.ecodrix.com that emits real-time events — new conversation messages, message status updates (sent/delivered/read), workflow run progress, LAIE job logs and enrichment completions, relay-fabric health snapshots, and platform notifications.",
  },
];

export default function PlatformIndexPage() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      {/* JSON-LD: ItemList + FAQ + Breadcrumb */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getItemListSchema(
              PLATFORM_MODULES.map((m) => ({
                name: m.name,
                url: `/platform/${m.slug}`,
                description: m.description,
              })),
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(PLATFORM_FAQS)),
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
            ]),
          ),
        }}
      />

      {/* ── Hero ── */}
      <section className="py-8 px-6 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-175 h-100 blur-[14px] bg-[conic-gradient(from_270deg_at_50%_0%,transparent_55deg,rgba(43,77,203,0.18)_85deg,rgba(141,31,174,0.07)_115deg,transparent_155deg)]"
          aria-hidden
        />
        <div className="wrapper relative z-10">
          <div className="pill mb-8">Platform</div>
          <h1 className="font-display font-black text-foreground mb-8 max-w-4xl text-4xl sm:text-5xl tracking-[-0.04em] leading-[1.05]">
            Every module in <span className="grad-text">ECODrIx.</span>
          </h1>
          <p className="text-subtle max-w-2xl leading-relaxed mb-6 text-base">
            ECODrIx is one platform with many surfaces. Each module is a
            self-contained product, exposed through a clean public API at{" "}
            <a
              href={API_URL}
              className="text-accent underline underline-offset-4"
            >
              api.ecodrix.com
            </a>
            . Pick the ones you need today, scale into the rest tomorrow.
          </p>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="py-16 px-6">
        <div className="wrapper">
          <div className="mb-8">
            <span className="section-tag">Products</span>
          </div>
          <div className="flex flex-col divide-y divide-border border-y border-border">
            {getProductModules().map((m) => (
              <div key={m.slug} className="py-10 group" id={m.slug}>
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  {/* Left: title + desc */}
                  <div className="lg:w-1/2">
                    <Link href={`/platform/${m.slug}`} className="inline-block mb-2">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-accent">{m.brand}</span>
                    </Link>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-3 tracking-tight">
                      <Link href={`/platform/${m.slug}`} className="hover:text-accent transition-colors">
                        {m.name}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{m.description}</p>
                    <Link
                      href={`/platform/${m.slug}`}
                      className="inline-flex items-center group gap-2 btn-primary text-sm text-foreground font-medium transition-all"
                    >
                      Learn more <ArrowRight size={13} className="group-hover:translate-x-1 duration-300 ease-in-out" />
                    </Link>
                  </div>
                  {/* Right: features */}
                  <div className="lg:w-1/2">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      {m.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-accent mt-1 shrink-0">—</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    {m.apiBase && (
                      <p className="mt-4 text-[11px] text-muted-foreground">
                        API: <code className="text-accent">{m.apiBase}</code>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Infrastructure ── */}
      <section className="py-16 px-6">
        <div className="wrapper">
          <div className="mb-8">
            <span className="section-tag">Infrastructure</span>
          </div>
          <div className="flex flex-col divide-y divide-border border-y border-border">
            {getInfraModules().map((m) => (
              <div key={m.slug} className="py-10 group" id={m.slug}>
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  <div className="lg:w-1/2">
                    <Link href={`/platform/${m.slug}`} className="inline-block mb-2">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-muted-foreground group-hover:text-accent transition-colors">{m.brand}</span>
                    </Link>
                    <h2 className="font-display text-xl font-bold text-foreground mb-3 tracking-tight">
                      <Link href={`/platform/${m.slug}`} className="hover:text-accent transition-colors">
                        {m.name}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{m.description}</p>
                    <Link
                      href={`/platform/${m.slug}`}
                      className="inline-flex btn-primary items-center gap-2 text-sm text-foreground font-medium group transition-all"
                    >
                      Learn more <ArrowRight size={13} className="group-hover:translate-x-1 ease-in-out duration-300" />
                    </Link>
                  </div>
                  <div className="lg:w-1/2">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      {m.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-accent mt-1 shrink-0">—</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    {m.apiBase && (
                      <p className="mt-4 text-[11px] text-muted-foreground">
                        API: <code className="text-accent">{m.apiBase}</code>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 sep-top bg-background">
        <div className="wrapper">
          <div className="pill mb-6">Platform questions</div>
          <h2 className="font-display font-black text-foreground mb-12 text-2xl md:text-3xl tracking-[-0.04em]">
            How the platform works.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5">
            {PLATFORM_FAQS.map(({ q, a }) => (
              <div key={q} className="p-8 bg-surface">
                <h3 className="text-foreground font-bold mb-3 text-base">
                  {q}
                </h3>
                <p className="text-subtle text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
