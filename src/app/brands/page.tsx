import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getBreadcrumbSchema,
  getFAQSchema,
  getItemListSchema,
  SEO_CONSTANTS,
} from "@/lib/jsonld";

const { BASE_URL } = SEO_CONSTANTS;

/* ──────────────────────────────────────────────────────────────────────
   /brands — disambiguates the ERIX / ECODrIx brand cluster.
   Optimized to win queries like "what is ERIX-CRM", "ERIX-FLOW vs n8n",
   "ErixStore Redis alternative", "Relay Fabric scraper".
─────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "ERIX Brands & ECODrIx Subsystems",
  description:
    "ERIX-CRM, ERIX-FLOW, ERIX-LAIE, ErixStore, and Relay Fabric — the brands that make up the ECODrIx platform. Learn what each subsystem does and how they fit together.",
  keywords: [
    "ERIX",
    "ERIX-CRM",
    "ERIX-FLOW",
    "ERIX-LAIE",
    "ErixStore",
    "Relay Fabric",
    "ECODrIx subsystems",
    "ECODrIx brands",
    "what is ERIX",
    "ERIX product suite",
  ],
  alternates: { canonical: `${BASE_URL}/brands` },
  openGraph: {
    title: "ERIX Brands & ECODrIx Subsystems",
    description:
      "The five ERIX subsystems that power the ECODrIx platform — CRM, automation, lead intelligence, in-memory database, and distributed worker engine.",
    url: `${BASE_URL}/brands`,
    type: "website",
  },
};

const BRANDS = [
  {
    name: "ERIX-CRM",
    tagline: "Sales pipeline + client portal",
    desc: "The lead pipeline, conversation inbox, project workspace, and client portal. Replaces scattered spreadsheets with a single source of truth for every customer relationship.",
    href: "/platform/crm",
    color: "var(--color-accent)",
    code: "/v1/api/product/erix/crm/leads",
  },
  {
    name: "ERIX-FLOW",
    tagline: "Visual automation engine",
    desc: "Drag-and-drop workflow canvas with conditional logic, custom-node marketplace, and real-time run logs. n8n-style power without the self-hosting headache.",
    href: "/platform/automation",
    color: "var(--color-brand-purple)",
    code: "/v1/api/product/flow",
  },
  {
    name: "ERIX-LAIE",
    tagline: "B2B lead intelligence",
    desc: "Distributed scraping, AI-driven enrichment, dossier research, and outreach-kit generation. Powered by Claude and Gemini, scaled by Relay Fabric.",
    href: "/platform/lead-intelligence",
    color: "var(--color-warning)",
    code: "/v1/api/product/laie",
  },
  {
    name: "ErixStore",
    tagline: "In-memory database server",
    desc: "Proprietary high-speed in-memory database — queue, cache, pub/sub, distributed locks, and rate limiting. Persistence via AOF + BGSAVE. Sub-millisecond latency.",
    href: "/platform/erixstore",
    color: "var(--color-brand-purple)",
    code: "@ecodrix/erix-client",
  },
  {
    name: "Relay Fabric",
    tagline: "Distributed worker engine",
    desc: "Auto-provisioning worker fleet across cloud regions. Self-healing health probes, region-aware routing, proxy rotation. Powers every LAIE scrape and AI research job.",
    href: "/platform/relay-fabric",
    color: "#FB923C",
    code: "/v1/api/product/laie/relays",
  },
];

const BRAND_FAQS = [
  {
    q: "What is the difference between ECODrIx and ERIX?",
    a: "ECODrIx is the unified business infrastructure platform — the product customers buy. ERIX is the umbrella brand for the technical subsystems that power it. Each ERIX subsystem (ERIX-CRM, ERIX-FLOW, ERIX-LAIE, ErixStore, Relay Fabric) has a clear responsibility and exposes its own API surface inside ECODrIx.",
  },
  {
    q: "What is ERIX-CRM?",
    a: "ERIX-CRM is the lead-management and customer-relationship subsystem inside ECODrIx. It includes a kanban pipeline, AI lead scoring, unified activity timeline, project workspaces, secure client portal, and invoice generation.",
  },
  {
    q: "What is ERIX-FLOW?",
    a: "ERIX-FLOW is the visual workflow automation engine inside ECODrIx. It is a drag-and-drop canvas with conditional logic, native CRM and channel actions, a custom-node marketplace, and real-time per-node execution logs streamed over Socket.IO.",
  },
  {
    q: "What is ERIX-LAIE?",
    a: "ERIX-LAIE is the B2B lead-intelligence subsystem. It discovers leads by niche or city, enriches them with verified contact data, generates AI dossiers using Claude and Gemini, and produces ready-to-send WhatsApp templates and cold emails — all flowing into ERIX-CRM.",
  },
  {
    q: "What is ErixStore?",
    a: "ErixStore is the proprietary in-memory database server that powers ECODrIx workloads. It handles job queues, caching, pub/sub events, distributed locks, rate limiting, and session storage with sub-millisecond latency, with append-only-file durability.",
  },
  {
    q: "What is Relay Fabric?",
    a: "Relay Fabric is the distributed worker engine that auto-provisions, health-checks, and rebalances scraping and AI workers across cloud regions. It is the execution layer underneath ERIX-LAIE — the reason LAIE campaigns scale to thousands of concurrent jobs.",
  },
];

export default function BrandsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      {/* JSON-LD: ItemList + FAQ + Breadcrumb */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getItemListSchema(
              BRANDS.map((b) => ({
                name: b.name,
                url: b.href,
                description: b.desc,
              })),
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(BRAND_FAQS)),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Brands", url: "/brands" },
            ]),
          ),
        }}
      />

      {/* ── Hero ── */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-[700px] h-[400px] blur-[14px] bg-[conic-gradient(from_270deg_at_50%_0%,transparent_55deg,rgba(43,77,203,0.18)_85deg,rgba(141,31,174,0.07)_115deg,transparent_155deg)]"
          aria-hidden
        />
        <div className="wrapper relative z-10">
          <div className="pill mb-8">Brand index</div>
          <h1 className="font-display font-black text-foreground mb-8 max-w-4xl text-[clamp(2.6rem,7vw,4.5rem)] tracking-[-0.04em] leading-[1.05]">
            One platform. <span className="grad-text">Five subsystems.</span>{" "}
            Zero glue code.
          </h1>
          <p className="text-subtle max-w-2xl leading-relaxed text-[clamp(1rem,2vw,1.15rem)]">
            ECODrIx is the platform. ERIX is the technical brand for the
            subsystems that power it. Each one is a self-contained product that
            ships with a clean API and clear responsibility.
          </p>
        </div>
      </section>

      {/* ── Brand grid ── */}
      <section className="py-16 px-6">
        <div className="wrapper">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BRANDS.map((b) => (
              <Link
                key={b.name}
                href={b.href}
                className="group relative p-px rounded-none transition-colors duration-300 bg-foreground/6"
                style={{ "--tile": b.color } as React.CSSProperties}
              >
                <div className="absolute inset-0 rounded-none opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300 pointer-events-none bg-[var(--tile)]" />
                <div className="relative h-full p-7 rounded-none bg-surface">
                  <div className="w-1 h-8 mb-5 bg-[var(--tile)]" />
                  <h3 className="text-foreground font-bold text-lg mb-1">
                    {b.name}
                  </h3>
                  <p className="text-xs font-sans uppercase tracking-widest mb-3 text-[var(--tile)]">
                    {b.tagline}
                  </p>
                  <p className="text-subtle text-sm leading-relaxed mb-5">
                    {b.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <code className="font-sans text-[10px] text-muted-foreground bg-foreground/4 px-2 py-[3px]">
                      {b.code}
                    </code>
                    <ArrowRight
                      size={16}
                      className="text-subtle group-hover:text-foreground group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 sep-top bg-background">
        <div className="wrapper">
          <div className="pill mb-6">Brand questions</div>
          <h2 className="font-display font-black text-foreground mb-12 text-[clamp(2rem,4vw,3rem)] tracking-[-0.04em]">
            What people ask about ERIX.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5">
            {BRAND_FAQS.map(({ q, a }) => (
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
