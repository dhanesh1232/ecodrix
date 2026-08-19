import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { getFAQSchema, getBreadcrumbSchema, SEO_CONSTANTS } from "@/lib/jsonld";

const { BASE_URL } = SEO_CONSTANTS;

/* ──────────────────────────────────────────────────────────────────────
   /flow/zapier-alternative — FLOW positioned as a WhatsApp-native, India-first
   automation alternative to Zapier. Targets "zapier alternative india",
   "whatsapp automation zapier". FAQ + Breadcrumb JSON-LD. Honest framing.
─────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "A WhatsApp-Native Zapier Alternative for India — ECODrIx FLOW",
  description:
    "FLOW is ECODrIx's no-code automation builder — a WhatsApp-native, India-first alternative to Zapier that connects CRM, WhatsApp, and email in one platform.",
  keywords: [
    "zapier alternative india",
    "whatsapp automation tool",
    "no code automation india",
    "zapier alternative whatsapp",
    "ERIX FLOW",
    "workflow automation india",
  ],
  alternates: { canonical: `${BASE_URL}/flow/zapier-alternative` },
  openGraph: {
    title: "A WhatsApp-Native Zapier Alternative for India — ECODrIx FLOW",
    description:
      "No-code automation across CRM, WhatsApp, and email — built for Indian SMBs.",
    url: `${BASE_URL}/flow/zapier-alternative`,
    type: "website",
  },
};

const ROWS = [
  {
    dimension: "WhatsApp automation",
    flow: "Native — triggers and actions on the official WhatsApp API.",
    zapier: "Via third-party connectors, not native.",
    flowWins: true,
  },
  {
    dimension: "Built-in CRM",
    flow: "Yes — FLOW runs on top of ERIX CRM.",
    zapier: "No — connects external CRMs only.",
    flowWins: true,
  },
  {
    dimension: "Pricing",
    flow: "Included in ECODrIx plans (INR).",
    zapier: "Separate subscription, task-based (USD).",
    flowWins: true,
  },
  {
    dimension: "General app connectors",
    flow: "Growing set, focused on the ECODrIx stack.",
    zapier: "Very large third-party app library.",
    flowWins: false,
  },
  {
    dimension: "India-first",
    flow: "Built for Indian SMBs and channels.",
    zapier: "Global, US-centric.",
    flowWins: true,
  },
  {
    dimension: "Visual builder",
    flow: "Yes — drag-and-drop with conditional logic.",
    zapier: "Yes.",
    flowWins: false,
  },
];

const FAQS = [
  {
    q: "Is FLOW a Zapier alternative?",
    a: "For WhatsApp, CRM, and email automation, yes. FLOW is ECODrIx's no-code automation builder that triggers workflows across your CRM, WhatsApp, and email natively — without paying for a separate automation subscription. Zapier connects a far larger library of third-party apps, so the right choice depends on your stack.",
  },
  {
    q: "When should I use FLOW instead of Zapier?",
    a: "Use FLOW when your automations centre on WhatsApp, leads, and follow-ups inside ECODrIx — it's native, INR-priced, and included in your plan. Use Zapier when you need to connect many external SaaS apps outside the ECODrIx stack.",
  },
  {
    q: "Do I need a separate subscription for FLOW?",
    a: "No. FLOW is part of the ECODrIx platform and included in plans (with quotas by tier), rather than a separate task-metered subscription.",
  },
  {
    q: "Can FLOW automate WhatsApp follow-ups?",
    a: "Yes. FLOW can trigger WhatsApp messages, email, and CRM actions on events like form submits, pipeline stage changes, and schedules — with conditional logic and sequences.",
  },
];

export default function ZapierAlternativePage() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "FLOW", url: "/platform/automation" },
              { name: "Zapier Alternative", url: "/flow/zapier-alternative" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(FAQS)) }}
      />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-[700px] h-[400px] blur-[14px] bg-[conic-gradient(from_270deg_at_50%_0%,transparent_55deg,color-mix(in_srgb,var(--color-brand-purple)_20%,transparent)_85deg,color-mix(in_srgb,var(--color-brand-purple)_7%,transparent)_115deg,transparent_155deg)]"
          aria-hidden
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
              href="/platform/automation"
              className="hover:text-foreground transition-colors"
            >
              FLOW
            </Link>
            <span>/</span>
            <span className="text-foreground">Zapier Alternative</span>
          </nav>

          <div className="pill mb-6 text-brand-purple border-brand-purple/25 bg-brand-purple/6">
            ERIX-FLOW
          </div>
          <h1 className="font-display font-black text-foreground mb-6 max-w-4xl text-[clamp(2.2rem,6vw,4rem)] tracking-[-0.04em] leading-[1.05]">
            A WhatsApp-native Zapier alternative for India.
          </h1>
          <p className="max-w-3xl leading-relaxed mb-8 text-[clamp(1rem,2vw,1.2rem)] text-muted-foreground">
            FLOW is ECODrIx's no-code automation builder. It connects your CRM,
            WhatsApp, and email natively — so instead of paying for a separate
            automation tool, your follow-ups and workflows run inside the same
            platform, priced in INR.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-accent-foreground text-sm bg-brand-purple rounded-none"
            >
              Start 14-day free trial <ArrowRight size={16} />
            </Link>
            <Link
              href="/platform/automation"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-foreground text-sm border border-foreground/15 hover:border-foreground/30 transition-colors"
            >
              Explore FLOW
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 px-6 sep-top bg-background">
        <div className="wrapper">
          <div className="pill mb-6">Side by side</div>
          <h2 className="font-display font-black text-foreground mb-10 text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.04em]">
            FLOW vs Zapier for Indian SMBs.
          </h2>
          <div className="overflow-hidden border border-foreground/8">
            <div className="grid grid-cols-3 text-xs uppercase tracking-widest font-sans bg-foreground/3">
              <div className="p-4 text-subtle">Dimension</div>
              <div className="p-4 font-bold text-brand-purple">
                ECODrIx FLOW
              </div>
              <div className="p-4 text-muted-foreground">Zapier</div>
            </div>
            {ROWS.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-3 text-sm border-t border-foreground/5 ${i % 2 ? "" : "bg-foreground/1"
                  }`}
              >
                <div className="p-4 text-muted-foreground font-medium">
                  {row.dimension}
                </div>
                <div className="p-4 text-muted-foreground flex gap-2">
                  {row.flowWins ? (
                    <Check
                      size={16}
                      className="shrink-0 mt-0.5 text-brand-purple"
                    />
                  ) : (
                    <Minus size={16} className="shrink-0 mt-0.5 text-subtle" />
                  )}
                  <span>{row.flow}</span>
                </div>
                <div className="p-4 text-subtle">{row.zapier}</div>
              </div>
            ))}
          </div>
          <p className="text-subtle text-xs mt-4">
            Zapier is a strong general-purpose automation tool with a large app
            library. FLOW focuses on WhatsApp, CRM, and email automation inside
            ECODrIx. Choose based on where your workflows live.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="wrapper">
          <div className="pill mb-6">Common questions</div>
          <h2 className="font-display font-black text-foreground mb-12 text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.04em]">
            FLOW vs Zapier, answered.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="p-8 bg-surface">
                <h3 className="text-foreground font-bold mb-3 text-base flex items-start gap-2">
                  <Check
                    size={16}
                    className="shrink-0 mt-1 text-brand-purple"
                  />
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
