import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import {
  getHowToSchema,
  getFAQSchema,
  getBreadcrumbSchema,
  SEO_CONSTANTS,
} from "@/lib/jsonld";

const { BASE_URL } = SEO_CONSTANTS;

/* ──────────────────────────────────────────────────────────────────────
   /connect/whatsapp-api-guide — informational→commercial guide.
   Targets "how to get whatsapp business api india" + "is whatsapp api free".
   Prime AI-citation surface (HowTo + FAQ schema, server-rendered).
─────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "How to Get the Official WhatsApp Business API in India (2026 Guide)",
  description:
    "Step-by-step guide to getting the official WhatsApp Business Cloud API in India — costs, per-message pricing, green tick, and onboarding via ECODrIx Connect.",
  keywords: [
    "how to get whatsapp business api india",
    "whatsapp cloud api setup",
    "whatsapp business api provider india",
    "is whatsapp api free",
    "whatsapp business api pricing india",
    "whatsapp green tick",
    "ECODrIx Connect",
  ],
  alternates: { canonical: `${BASE_URL}/connect/whatsapp-api-guide` },
  openGraph: {
    title:
      "How to Get the Official WhatsApp Business API in India (2026 Guide) | ECODrIx",
    description:
      "Costs, per-message pricing, green tick, and step-by-step onboarding via ECODrIx Connect.",
    url: `${BASE_URL}/connect/whatsapp-api-guide`,
    type: "article",
  },
};

const STEPS = [
  {
    name: "Confirm you need the API (not the app)",
    text: "The free WhatsApp Business app is for manual chats from one phone. The WhatsApp Business API is for automation, team inboxes, broadcasts, and CRM integration. If you want to send templates at scale or connect WhatsApp to a CRM, you need the API.",
  },
  {
    name: "Prepare a business phone number and Meta Business account",
    text: "Use a phone number not currently active on any WhatsApp app. You'll also need a Facebook/Meta Business account; business verification with Meta improves limits and is required for the green tick.",
  },
  {
    name: "Connect through a provider (ECODrIx Connect)",
    text: "The Cloud API is accessed through a provider. ECODrIx Connect onboards your number to the official Meta WhatsApp Cloud API, handles credentials and webhooks, and links messaging into ERIX CRM — no Twilio-style middleware needed.",
  },
  {
    name: "Verify your business and apply for the green tick",
    text: "Complete Meta Business verification, then submit the Official Business Account (green tick) request. Approval depends on brand notability and is decided by Meta — a provider can submit it but cannot guarantee it.",
  },
  {
    name: "Create and submit message templates",
    text: "Business-initiated messages use pre-approved templates in marketing, utility, and authentication categories. Submit templates for approval, then send broadcasts, reminders, and OTPs from ERIX.",
  },
  {
    name: "Go live and automate",
    text: "Once approved, connect ERIX-FLOW to automate follow-ups and ERIX CRM for a shared inbox. Start with a small send volume to build a healthy quality rating before scaling.",
  },
];

const FAQS = [
  {
    q: "Is the WhatsApp Business API free?",
    a: "The API has no license fee, but since 2025 Meta charges per message by category. In India that's roughly ₹1.09 per marketing message and ₹0.145 per utility/authentication message, with service replies free. You also pay your provider's platform fee. ECODrIx Connect passes Meta's per-message charges through at India rates.",
  },
  {
    q: "How much does the WhatsApp Business API cost in India?",
    a: "Your total is three layers: Meta's per-message charges (category-based), your provider/platform fee, and the tooling on top (CRM, automation, inbox). ECODrIx bundles the platform and tooling from ₹2,999/month, so you compare total cost rather than messaging alone.",
  },
  {
    q: "How long does WhatsApp API approval take?",
    a: "Connecting a number to the Cloud API is usually quick — often within a day once your Meta Business account is ready. Business verification and the green tick review by Meta can take longer and are decided by Meta, not the provider.",
  },
  {
    q: "Do I need Facebook Business verification?",
    a: "You can start sending with limited tiers before full verification, but Meta Business verification raises your messaging limits and is required to apply for the green tick (Official Business Account).",
  },
  {
    q: "Can I keep my existing WhatsApp number?",
    a: "You can use a number only if it isn't active on the WhatsApp consumer or Business app. If it is, you must first delete that WhatsApp account for the number, then onboard it to the API.",
  },
];

export default function WhatsAppApiGuidePage() {
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
                name: "WhatsApp API Guide",
                url: "/connect/whatsapp-api-guide",
              },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getHowToSchema({
              name: "How to Get the Official WhatsApp Business API in India",
              description:
                "Step-by-step guide to onboarding the official WhatsApp Business Cloud API in India, including costs, verification, green tick, and templates.",
              totalTime: "P2D",
              steps: STEPS,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(FAQS)) }}
      />

      {/* ── Hero ── */}
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
            <span className="text-foreground">WhatsApp API Guide</span>
          </nav>

          <div className="pill mb-6 text-[#25D366] border-[#25D366]/25 bg-[#25D366]/6">
            Guide · 2026
          </div>
          <h1 className="font-display font-black text-foreground mb-6 max-w-4xl text-[clamp(2.2rem,6vw,4rem)] tracking-[-0.04em] leading-[1.05]">
            How to get the official WhatsApp Business API in India.
          </h1>
          <p className="max-w-3xl leading-relaxed text-[clamp(1rem,2vw,1.2rem)] text-muted-foreground">
            The WhatsApp Business API lets you run broadcasts, automated
            follow-ups, OTPs, and a shared team inbox on the official Meta Cloud
            API. Here's what it costs, how pricing works in 2026, and how to get
            connected through ECODrIx Connect.
          </p>
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="py-20 px-6 sep-top bg-background">
        <div className="wrapper">
          <div className="pill mb-6">Step by step</div>
          <h2 className="font-display font-black text-foreground mb-12 text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.04em]">
            Six steps to go live.
          </h2>

          <ol className="space-y-4">
            {STEPS.map((s, i) => (
              <li
                key={s.name}
                className="flex items-start gap-5 p-6 bg-surface border border-foreground/5 rounded-xl"
              >
                <span className="shrink-0 w-9 h-9 flex items-center justify-center font-display font-black text-sm bg-[#25D366]/8 border border-[#25D366]/25 text-[#25D366]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-foreground font-bold mb-1.5 text-base">
                    {s.name}
                  </h3>
                  <p className="text-subtle text-sm leading-relaxed">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Pricing explainer ── */}
      <section className="py-20 px-6">
        <div className="wrapper">
          <div className="pill mb-6">What it costs</div>
          <h2 className="font-display font-black text-foreground mb-8 text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.04em]">
            WhatsApp API pricing in India, honestly.
          </h2>
          <p className="text-muted-foreground max-w-3xl leading-relaxed mb-6">
            Since 2025, Meta charges per message rather than per conversation.
            Your total cost has three layers:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                t: "1. Meta message charges",
                d: "Category-based per message. India: ~₹1.09 marketing, ~₹0.145 utility/auth, service replies free.",
              },
              {
                t: "2. Platform fee",
                d: "Your provider's monthly fee. ECODrIx plans start at ₹2,999/month.",
              },
              {
                t: "3. Tooling on top",
                d: "CRM, automation, shared inbox, and lead-gen — included in ECODrIx, often extra elsewhere.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="p-6 bg-foreground/2 border border-foreground/8 rounded-xl"
              >
                <h3 className="text-foreground font-bold text-sm mb-2">
                  {c.t}
                </h3>
                <p className="text-subtle text-sm leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-accent-foreground text-sm bg-[#25D366] rounded-lg"
            >
              See ECODrIx pricing <ArrowRight size={16} />
            </Link>
            <Link
              href="/platform/whatsapp"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-foreground text-sm border border-foreground/15 hover:border-foreground/30 transition-colors"
            >
              Explore WhatsApp on ECODrIx
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 sep-top bg-background">
        <div className="wrapper">
          <div className="pill mb-6">Common questions</div>
          <h2 className="font-display font-black text-foreground mb-12 text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.04em]">
            WhatsApp Business API, answered.
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
