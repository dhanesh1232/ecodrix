import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { COMPARISONS } from "@/lib/comparisons";
import {
  getBreadcrumbSchema,
  getItemListSchema,
  getFAQSchema,
  SEO_CONSTANTS,
} from "@/lib/jsonld";

const { BASE_URL } = SEO_CONSTANTS;

/* ──────────────────────────────────────────────────────────────────────
   /compare — comparison hub, targets "best WhatsApp CRM in India" and
   funnels into each "ECODrIx vs X" decision page.
─────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Best WhatsApp CRM in India: ECODrIx vs Wati, AiSensy & Interakt",
  description:
    "Compare ECODrIx (ERIX) with Wati, AiSensy, and Interakt. Same official Meta WhatsApp API — but ERIX adds a full CRM, automation, and lead-gen on flat INR pricing.",
  keywords: [
    "best whatsapp crm india",
    "whatsapp crm comparison",
    "wati alternative",
    "aisensy alternative",
    "interakt alternative",
    "ECODrIx",
    "ERIX",
  ],
  alternates: { canonical: `${BASE_URL}/compare` },
  openGraph: {
    title: "Best WhatsApp CRM in India: ECODrIx vs Wati, AiSensy & Interakt",
    description:
      "Compare ECODrIx (ERIX) with Wati, AiSensy, and Interakt on features, WhatsApp API, and INR pricing.",
    url: `${BASE_URL}/compare`,
    type: "website",
  },
};

const HUB_FAQS = [
  {
    q: "What is the best WhatsApp CRM for small business in India?",
    a: "ECODrIx ERIX is a WhatsApp-native CRM built for Indian SMBs. It runs on the official Meta WhatsApp Cloud API and adds a full CRM (pipelines, deals, invoices, projects), no-code automation, and lead generation — priced in INR from ₹2,999/month with a 14-day free trial. Wati, AiSensy, and Interakt are strong messaging-first alternatives.",
  },
  {
    q: "How is ERIX different from Wati, AiSensy, and Interakt?",
    a: "All four use the official Meta WhatsApp Cloud API, so messaging is comparable. The difference is scope: Wati is messaging/support-led, AiSensy is broadcast-marketing-led, and Interakt leans toward commerce. ERIX bundles a full CRM, automation (FLOW), and lead generation (LAIE) into one INR-priced platform.",
  },
  {
    q: "Which WhatsApp CRM is cheapest in India?",
    a: "Messaging-only tools can have a lower platform fee, but once you add CRM, automation, and lead-gen separately, costs stack up. ERIX includes all of these from ₹2,999/month, so compare total tooling cost rather than the WhatsApp fee alone. All providers pass through Meta's per-message charges.",
  },
];

export default function CompareHubPage() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Compare", url: "/compare" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getItemListSchema(
              COMPARISONS.map((c) => ({
                name: `ECODrIx vs ${c.competitor}`,
                url: `/compare/${c.slug}`,
                description: c.description,
              })),
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(HUB_FAQS)),
        }}
      />

      {/* ── Hero ── */}
      <section className="pt-40 pb-16 px-6 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-[700px] h-[400px] blur-[14px] bg-[conic-gradient(from_270deg_at_50%_0%,transparent_55deg,rgba(43,77,203,0.2)_85deg,rgba(43,77,203,0.067)_115deg,transparent_155deg)]"
          aria-hidden
        />
        <div className="wrapper relative z-10">
          <div className="pill mb-6">Compare</div>
          <h1 className="font-display font-black text-foreground mb-6 max-w-4xl text-[clamp(2.4rem,6.5vw,4.2rem)] tracking-[-0.04em] leading-[1.05]">
            The best WhatsApp CRM in India.
          </h1>
          <p className="max-w-3xl leading-relaxed text-muted-foreground text-[clamp(1rem,2vw,1.2rem)]">
            Wati, AiSensy, and Interakt all run on the official Meta WhatsApp
            Cloud API — and so does ECODrIx. The difference is what you get
            around the messaging: ERIX bundles a full CRM, no-code automation,
            and lead generation into one platform priced in INR from
            ₹2,999/month.
          </p>
        </div>
      </section>

      {/* ── Comparison cards ── */}
      <section className="py-16 px-6 sep-top bg-background">
        <div className="wrapper">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COMPARISONS.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="group flex flex-col justify-between p-7 border border-foreground/8 hover:border-foreground/20 transition-colors rounded-2xl bg-foreground/[0.02]"
                style={{ "--c": c.color } as React.CSSProperties}
              >
                <div>
                  <div className="pill mb-4 text-[var(--c)] border-[var(--c)]/25 bg-[var(--c)]/6">
                    vs {c.competitor}
                  </div>
                  <h2 className="text-foreground font-bold text-lg mb-2">
                    ECODrIx vs {c.competitor}
                  </h2>
                  <p className="text-subtle text-sm leading-relaxed mb-6">
                    {c.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {c.rows
                      .filter((r) => r.ecodrixWins)
                      .slice(0, 3)
                      .map((r) => (
                        <li
                          key={r.dimension}
                          className="flex items-start gap-2 text-muted-foreground text-xs"
                        >
                          <Check
                            size={13}
                            className="shrink-0 mt-0.5 text-[var(--c)]"
                          />
                          {r.dimension}
                        </li>
                      ))}
                  </ul>
                </div>
                <span className="inline-flex items-center gap-2 text-sm text-subtle group-hover:text-foreground transition-colors">
                  Read comparison
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6">
        <div className="wrapper">
          <div className="pill mb-6">Common questions</div>
          <h2 className="font-display font-black text-foreground mb-12 text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.04em]">
            Choosing a WhatsApp CRM in India.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5">
            {HUB_FAQS.map(({ q, a }) => (
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
