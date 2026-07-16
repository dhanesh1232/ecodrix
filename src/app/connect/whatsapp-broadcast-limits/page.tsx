import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, TrendingUp } from "lucide-react";
import { getFAQSchema, getBreadcrumbSchema, SEO_CONSTANTS } from "@/lib/jsonld";

const { BASE_URL } = SEO_CONSTANTS;

/* ──────────────────────────────────────────────────────────────────────
   /connect/whatsapp-broadcast-limits — explainer for WhatsApp messaging
   limits and broadcast rules. Targets "whatsapp broadcast limit",
   "how many whatsapp messages can i send". FAQ + Breadcrumb JSON-LD.
─────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "WhatsApp Broadcast & Messaging Limits Explained (India, 2026)",
  description:
    "How WhatsApp Business API messaging limits and broadcast tiers work — 1K to unlimited, quality ratings, and how to raise your limit. For Indian businesses using ECODrIx.",
  keywords: [
    "whatsapp broadcast limit",
    "whatsapp business api messaging limit",
    "how many whatsapp messages can i send",
    "whatsapp messaging tiers",
    "increase whatsapp business limit",
    "ECODrIx Connect",
  ],
  alternates: { canonical: `${BASE_URL}/connect/whatsapp-broadcast-limits` },
  openGraph: {
    title:
      "WhatsApp Broadcast & Messaging Limits Explained (India, 2026) | ECODrIx",
    description:
      "Messaging tiers, quality ratings, and how to raise your WhatsApp Business API limit.",
    url: `${BASE_URL}/connect/whatsapp-broadcast-limits`,
    type: "article",
  },
};

const TIERS = [
  {
    tier: "Unverified",
    limit: "Up to 250 business-initiated conversations / 24h",
    note: "Before Meta Business verification.",
  },
  {
    tier: "Tier 1",
    limit: "1,000 unique customers / 24h",
    note: "Default after verification.",
  },
  {
    tier: "Tier 2",
    limit: "10,000 unique customers / 24h",
    note: "Auto-upgraded on volume + quality.",
  },
  {
    tier: "Tier 3",
    limit: "100,000 unique customers / 24h",
    note: "Auto-upgraded on volume + quality.",
  },
  {
    tier: "Tier 4",
    limit: "Unlimited unique customers / 24h",
    note: "Highest tier.",
  },
];

const FAQS = [
  {
    q: "How many WhatsApp messages can I send per day?",
    a: "Your limit depends on your messaging tier, which applies to business-initiated conversations with unique customers in a rolling 24 hours: 250 (unverified), then 1K, 10K, 100K, and unlimited. Meta raises your tier automatically as you send quality messages to more users. Service replies within the customer window are not capped the same way.",
  },
  {
    q: "What is a 'business-initiated conversation'?",
    a: "It's a conversation you start using a template message (e.g., a broadcast or reminder). These count toward your daily unique-customer limit. Replies from customers open a service window during which you can respond more freely.",
  },
  {
    q: "How do I increase my WhatsApp broadcast limit?",
    a: "Complete Meta Business verification, then consistently send relevant, consented messages that keep a high quality rating. Meta auto-upgrades your tier when you approach your limit with good quality. Avoid spam and high block/report rates, which can lower your tier.",
  },
  {
    q: "What is the quality rating?",
    a: "Meta assigns each number a quality rating (green/yellow/red) based on recipient feedback like blocks and reports. Poor quality can pause upgrades or reduce your limit. Sending consented, well-formatted, relevant messages keeps it healthy.",
  },
  {
    q: "Does ECODrIx increase my limit?",
    a: "Limits are set by Meta, not ECODrIx. Connect helps you onboard to the official API, complete verification, and send well-structured template broadcasts — the practices that help Meta raise your tier — but the tier decision is Meta's.",
  },
];

export default function BroadcastLimitsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Connect", url: "/platform/whatsapp" },
              {
                name: "WhatsApp Broadcast Limits",
                url: "/connect/whatsapp-broadcast-limits",
              },
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
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-[700px] h-[400px] blur-[14px] bg-[conic-gradient(from_270deg_at_50%_0%,transparent_55deg,#25D36633_85deg,#25D36611_115deg,transparent_155deg)]"
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
              href="/platform/whatsapp"
              className="hover:text-foreground transition-colors"
            >
              Connect
            </Link>
            <span>/</span>
            <span className="text-foreground">Broadcast Limits</span>
          </nav>

          <div className="pill mb-6 text-[#25D366] border-[#25D366]/25 bg-[#25D366]/6">
            <TrendingUp size={12} /> Explainer · 2026
          </div>
          <h1 className="font-display font-black text-foreground mb-6 max-w-4xl text-[clamp(2.2rem,6vw,4rem)] tracking-[-0.04em] leading-[1.05]">
            WhatsApp broadcast &amp; messaging limits, explained.
          </h1>
          <p className="max-w-3xl leading-relaxed text-[clamp(1rem,2vw,1.2rem)] text-muted-foreground">
            The WhatsApp Business API limits how many people you can start
            conversations with each day, based on your messaging tier and
            quality rating. Here's how the tiers work and how to move up.
          </p>
        </div>
      </section>

      {/* Tiers table */}
      <section className="py-20 px-6 sep-top bg-background">
        <div className="wrapper">
          <div className="pill mb-6">Messaging tiers</div>
          <h2 className="font-display font-black text-foreground mb-10 text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.04em]">
            How many you can reach per 24 hours.
          </h2>
          <div className="overflow-hidden border border-foreground/8">
            <div className="grid grid-cols-[1fr_1.5fr_1.5fr] text-xs uppercase tracking-widest font-mono bg-foreground/3">
              <div className="p-4 text-subtle">Tier</div>
              <div className="p-4 text-foreground">Limit</div>
              <div className="p-4 text-muted-foreground">Notes</div>
            </div>
            {TIERS.map((t, i) => (
              <div
                key={t.tier}
                className={`grid grid-cols-[1fr_1.5fr_1.5fr] text-sm border-t border-foreground/5 ${
                  i % 2 ? "" : "bg-foreground/1"
                }`}
              >
                <div className="p-4 text-foreground font-semibold">
                  {t.tier}
                </div>
                <div className="p-4 text-muted-foreground">{t.limit}</div>
                <div className="p-4 text-subtle">{t.note}</div>
              </div>
            ))}
          </div>
          <p className="text-subtle text-xs mt-4">
            Limits apply to business-initiated conversations with unique
            customers in a rolling 24-hour window. Meta may change these tiers;
            verify current values in Meta's documentation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/connect/whatsapp-api-guide"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-accent-foreground text-sm bg-[#25D366] rounded-lg"
            >
              Read the API setup guide <ArrowRight size={16} />
            </Link>
            <Link
              href="/connect/green-tick"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-foreground text-sm border border-foreground/15 hover:border-foreground/30 transition-colors"
            >
              Get the green tick
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="wrapper">
          <div className="pill mb-6">Common questions</div>
          <h2 className="font-display font-black text-foreground mb-12 text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.04em]">
            WhatsApp limits, answered.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="p-8 bg-surface">
                <h3 className="text-foreground font-bold mb-3 text-base flex items-start gap-2">
                  <Check size={16} className="shrink-0 mt-1 text-[#25D366]" />
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
