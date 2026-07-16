import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, BadgeCheck } from "lucide-react";
import {
  getHowToSchema,
  getFAQSchema,
  getBreadcrumbSchema,
  SEO_CONSTANTS,
} from "@/lib/jsonld";

const { BASE_URL } = SEO_CONSTANTS;

/* ──────────────────────────────────────────────────────────────────────
   /connect/green-tick — "How to get the WhatsApp green tick in India".
   Targets: how to get whatsapp green tick, whatsapp blue tick verification.
   HowTo + FAQ + Breadcrumb JSON-LD, server-rendered.
─────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "How to Get the WhatsApp Green Tick in India (2026)",
  description:
    "Step-by-step guide to getting the WhatsApp green tick (Official Business Account) in India — eligibility, Meta Business verification, and how to apply via ECODrIx Connect.",
  keywords: [
    "how to get whatsapp green tick",
    "whatsapp green tick verification",
    "whatsapp blue tick business",
    "official business account whatsapp",
    "meta business verification india",
    "ECODrIx Connect",
  ],
  alternates: { canonical: `${BASE_URL}/connect/green-tick` },
  openGraph: {
    title: "How to Get the WhatsApp Green Tick in India (2026) | ECODrIx",
    description:
      "Eligibility, Meta Business verification, and how to apply for the WhatsApp Official Business Account (green tick).",
    url: `${BASE_URL}/connect/green-tick`,
    type: "article",
  },
};

const STEPS = [
  {
    name: "Get on the official WhatsApp Business API",
    text: "The green tick (Official Business Account) is only available to businesses on the official WhatsApp Business Cloud API, not the free WhatsApp Business app. Onboard your number through ECODrIx Connect first.",
  },
  {
    name: "Complete Meta Business verification",
    text: "Verify your business in Meta Business Manager with valid documents (business registration, GST, website, and contact details). Verification is a prerequisite for the green tick.",
  },
  {
    name: "Build brand notability signals",
    text: "Meta grants the green tick based on brand notability — coverage in reputable news outlets and third-party sources, not paid ads or press releases. Strengthen your public presence before applying.",
  },
  {
    name: "Submit the Official Business Account request",
    text: "From your WhatsApp Business Account, submit the green-tick (OBA) request. A provider can submit it on your behalf, but the decision is entirely Meta's.",
  },
  {
    name: "Maintain a high quality rating",
    text: "Send consented, relevant, well-formatted messages so your number keeps a high quality rating. Low quality or spam complaints hurt both your limits and your green-tick chances.",
  },
];

const FAQS = [
  {
    q: "What is the WhatsApp green tick?",
    a: "The green tick is Meta's Official Business Account (OBA) badge shown next to a business name in WhatsApp. It signals that Meta has confirmed the account belongs to a notable, authentic brand.",
  },
  {
    q: "Is the green tick the same as the blue tick?",
    a: "WhatsApp historically used a green badge for Official Business Accounts; Meta has been aligning verification badges across its apps (blue). Either way, it's the 'Official Business Account' status granted by Meta based on notability.",
  },
  {
    q: "How do I qualify for the WhatsApp green tick?",
    a: "You must be on the official WhatsApp Business API, complete Meta Business verification, and demonstrate brand notability (independent, reputable third-party coverage). Meta makes the final decision.",
  },
  {
    q: "Can ECODrIx guarantee the green tick?",
    a: "No provider can guarantee it. ECODrIx Connect helps you onboard to the official API and submit the request, but approval is solely Meta's decision based on their notability criteria.",
  },
  {
    q: "Do I need the green tick to send WhatsApp messages?",
    a: "No. You can send templates, broadcasts, and run a shared inbox on the official API without the green tick. The badge adds trust but is not required to operate.",
  },
];

export default function GreenTickPage() {
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
              { name: "WhatsApp Green Tick", url: "/connect/green-tick" },
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
              name: "How to Get the WhatsApp Green Tick in India",
              description:
                "Steps to obtain the WhatsApp Official Business Account (green tick) in India, including eligibility, Meta Business verification, and application.",
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
            <span className="text-foreground">Green Tick</span>
          </nav>

          <div className="pill mb-6 text-[#25D366] border-[#25D366]/25 bg-[#25D366]/6">
            <BadgeCheck size={12} /> Guide · 2026
          </div>
          <h1 className="font-display font-black text-foreground mb-6 max-w-4xl text-[clamp(2.2rem,6vw,4rem)] tracking-[-0.04em] leading-[1.05]">
            How to get the WhatsApp green tick in India.
          </h1>
          <p className="max-w-3xl leading-relaxed text-[clamp(1rem,2vw,1.2rem)] text-muted-foreground">
            The green tick — Meta's Official Business Account badge — builds
            trust with customers on WhatsApp. Here's who qualifies, how
            verification works, and how to apply through ECODrIx Connect.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-6 sep-top bg-background">
        <div className="wrapper">
          <div className="pill mb-6">Step by step</div>
          <h2 className="font-display font-black text-foreground mb-12 text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.04em]">
            Five steps to the badge.
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

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/connect/whatsapp-api-guide"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-accent-foreground text-sm bg-[#25D366] rounded-lg"
            >
              Start with the API guide <ArrowRight size={16} />
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

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="wrapper">
          <div className="pill mb-6">Common questions</div>
          <h2 className="font-display font-black text-foreground mb-12 text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.04em]">
            WhatsApp green tick, answered.
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
