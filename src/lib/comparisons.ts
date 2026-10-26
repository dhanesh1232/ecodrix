/**
 * Competitor comparison catalog — single source of truth.
 *
 * Drives:
 *  - /compare              → index page ("best WhatsApp CRM in India" hub)
 *  - /compare/[slug]       → individual "ECODrIx vs X" pages
 *  - /sitemap.xml          → discovery for search engines
 *  - JSON-LD FAQ + Breadcrumb → structured data for AI citations
 *
 * These pages target the highest-converting India queries ("ecodrix vs wati",
 * "wati alternative", "best whatsapp crm india") and are prime AI-citation
 * surfaces (ChatGPT / Perplexity / Gemini "alternatives to X" prompts).
 *
 * ⚠️ Accuracy guardrail: ERIX claims follow the design system's product page
 * (live v1.0 only). Competitor rows cover features and approach, never their
 * prices: prices in the design system's market notes come from third-party
 * pages and stay off public pages until checked on the vendor's own site.
 * Claims are qualitative and dated (see `lastVerified`). Never fabricate ratings.
 */

export interface ComparisonRow {
  /** Feature/dimension being compared. */
  dimension: string;
  /** ECODrIx (ERIX) position — kept factual to our own product. */
  ecodrix: string;
  /** Competitor position — qualitative, hedged. */
  competitor: string;
  /** Does ERIX have the clear edge on this row? Drives the ✓ highlight. */
  ecodrixWins: boolean;
}

export interface Comparison {
  slug: string; // e.g. "ecodrix-vs-wati"
  competitor: string; // "Wati"
  /** SERP description, ~150–170 chars. */
  description: string;
  /** One-paragraph, AI-liftable TL;DR rendered server-side. */
  tldr: string;
  /** Honest "when the competitor is the better pick" framing (builds trust). */
  competitorBestFor: string;
  /** "When ERIX is the better pick." */
  ecodrixBestFor: string;
  /** Comparison table rows. */
  rows: ComparisonRow[];
  /** FAQ pairs → FAQPage schema + on-page accordion. */
  faqs: Array<{ q: string; a: string }>;
  /** Queries this page targets. */
  searchQueries: string[];
  /** ISO date this competitor info was last checked. */
  lastVerified: string;
}

/* Shared truths about ECODrIx / ERIX reused across comparisons. */
const ERIX_API = "Official Meta WhatsApp Business Platform (Cloud API).";
// Pilot (founder decision): no public plans or prices; terms are agreed per client.
const ERIX_PRICING =
  "During the pilot, our team sets up each workspace and agrees pricing with you. Meta bills WhatsApp messages to you directly, with no ERIX markup.";
const META_NOTE =
  "Meta charges for WhatsApp template messages by category (marketing, utility and authentication), and its rates for India change, so check Meta's current rate card. With ERIX you connect your own WhatsApp Business account, so Meta bills you directly and ERIX adds no markup. With any provider, ask how Meta's charges reach your bill.";
const META_ROW = (competitor: string): ComparisonRow => ({
  dimension: "Meta's WhatsApp charges",
  ecodrix: "Your own WhatsApp account: Meta bills you directly, and ERIX adds no markup.",
  competitor: `Check how ${competitor} passes Meta's charges on before you compare totals.`,
  ecodrixWins: false,
});
const FLOW_ROW = "ERIX Flow: starts on leads, stages, forms, messages, payments and bookings, with Wait for a reply, approvals and AI replies.";

export const COMPARISONS: Comparison[] = [
  {
    slug: "ecodrix-vs-wati",
    competitor: "Wati",
    description:
      "ECODrIx (ERIX) vs Wati for Indian SMBs: the same official WhatsApp API, but ERIX adds a CRM, GST invoices, automation and an AI agent, priced in rupees.",
    tldr: "Wati is a well-established WhatsApp Business API tool with strong template and broadcast management, popular with support and marketing teams. ERIX matches Wati's official-API messaging and adds the system around it: a pipeline, GST invoices with payment links, projects, automations and an AI agent that answers from your own information, in one platform priced in rupees. You don't bolt a separate CRM onto your WhatsApp tool.",
    competitorBestFor:
      "Teams that only need WhatsApp messaging, shared inbox, and broadcasts, and already run a separate CRM they're happy with.",
    ecodrixBestFor:
      "Indian SMBs that want WhatsApp and the system of record (pipeline, invoices, bookings and automation) in one login, priced in rupees.",
    rows: [
      {
        dimension: "WhatsApp API",
        ecodrix: ERIX_API,
        competitor: "Official Meta WhatsApp Cloud API.",
        ecodrixWins: false,
      },
      {
        dimension: "Full CRM (pipeline, deals, invoices, projects)",
        ecodrix:
          "Built in: pipeline board, GST invoices with payment links, projects with e-sign and a client portal.",
        competitor:
          "Primarily a messaging/support tool; CRM features are lighter.",
        ecodrixWins: true,
      },
      {
        dimension: "No-code automation",
        ecodrix: FLOW_ROW,
        competitor: "Rule-based automations and chatbot flows.",
        ecodrixWins: true,
      },
      {
        dimension: "AI agent on your chats",
        ecodrix: "Answers from your own price list and hours, drafts what it isn't sure of, and hands refunds and complaints to a person.",
        competitor: "Offers AI features; compare their current plans.",
        ecodrixWins: false,
      },
      META_ROW("Wati"),
      {
        dimension: "Best-fit user",
        ecodrix: "Pan-India SMBs and agencies wanting one platform.",
        competitor: "Support/marketing teams needing messaging-first tooling.",
        ecodrixWins: false,
      },
    ],
    faqs: [
      {
        q: "Is ECODrIx a good Wati alternative in India?",
        a: `ERIX uses the same official Meta WhatsApp platform as Wati, and adds a pipeline, GST invoices with payment links, automations and an AI agent that answers from your own information. ${ERIX_PRICING}`,
      },
      {
        q: "Do ECODrIx and Wati use the same WhatsApp API?",
        a: "Both use Meta's official WhatsApp platform, so the messaging itself and Meta's charges are comparable. The difference is what's built around it: ERIX includes the CRM, invoices and automation.",
      },
      { q: "How does WhatsApp pricing work with either tool?", a: META_NOTE },
      {
        q: "Can I move from Wati to ECODrIx?",
        a: "Yes. Import your contacts into ERIX CRM, and connect your own WhatsApp Business account in ERIX Connect through Meta's signup. A number works with one provider at a time, so plan the move with your current provider. ERIX is letting businesses in from its waitlist.",
      },
    ],
    searchQueries: [
      "ecodrix vs wati",
      "wati alternative india",
      "wati alternative for small business",
      "best wati alternative whatsapp crm",
    ],
    lastVerified: "2026-07-07",
  },
  {
    slug: "ecodrix-vs-aisensy",
    competitor: "AiSensy",
    description:
      "ECODrIx (ERIX) vs AiSensy for Indian SMBs: AiSensy leads on broadcast marketing; ERIX adds a CRM, GST invoices, automation and an AI agent in one platform.",
    tldr: "AiSensy is a popular WhatsApp marketing platform in India, strong on broadcast campaigns and chatbot flows. ERIX is for teams that outgrow 'broadcast + basic inbox' and need real pipeline, deal, invoice, and project tracking with built-in automation — without moving to a separate CRM.",
    competitorBestFor:
      "Businesses focused on high-volume WhatsApp broadcast marketing and simple chatbot flows.",
    ecodrixBestFor:
      "SMBs whose WhatsApp marketing has turned into a real sales pipeline that needs a CRM, invoices and automation alongside messaging.",
    rows: [
      {
        dimension: "WhatsApp API",
        ecodrix: ERIX_API,
        competitor: "Official Meta WhatsApp Cloud API.",
        ecodrixWins: false,
      },
      {
        dimension: "Broadcast marketing",
        ecodrix: "Broadcasts with templates WhatsApp has approved, to the contacts you pick, such as a tag.",
        competitor: "Core strength — broadcast campaigns and templates.",
        ecodrixWins: false,
      },
      {
        dimension: "Full CRM (pipeline, deals, invoices, projects)",
        ecodrix: "Built in.",
        competitor: "Marketing-led; pipeline/deal management is limited.",
        ecodrixWins: true,
      },
      {
        dimension: "No-code automation",
        ecodrix: FLOW_ROW,
        competitor: "Chatbot flows and campaign automations.",
        ecodrixWins: true,
      },
      {
        dimension: "AI agent on your chats",
        ecodrix: "Answers from your own price list and hours, drafts what it isn't sure of, and hands refunds and complaints to a person.",
        competitor: "Offers AI features; compare their current plans.",
        ecodrixWins: false,
      },
      META_ROW("AiSensy"),
      {
        dimension: "Best-fit user",
        ecodrix: "Sales-led SMBs wanting one platform.",
        competitor: "Marketing-led teams focused on broadcasts.",
        ecodrixWins: false,
      },
    ],
    faqs: [
      {
        q: "Is ECODrIx an AiSensy alternative?",
        a: `Both run on Meta's official WhatsApp platform. AiSensy is marketing and broadcast-led, while ERIX adds a pipeline, GST invoices, automations and an AI agent on your chats. ${ERIX_PRICING}`,
      },
      {
        q: "What does ERIX cost?",
        a: `${ERIX_PRICING} For AiSensy, check its own pricing page, since plans change often.`,
      },
      { q: "How does WhatsApp message pricing work?", a: META_NOTE },
      {
        q: "When should I choose ERIX over AiSensy?",
        a: "Choose ERIX when WhatsApp is no longer just marketing — when you need to track deals, invoices, projects, and automate follow-ups from the same place you message customers.",
      },
    ],
    searchQueries: [
      "ecodrix vs aisensy",
      "aisensy alternative",
      "aisensy alternative india",
      "whatsapp crm better than aisensy",
    ],
    lastVerified: "2026-07-07",
  },
  {
    slug: "ecodrix-vs-interakt",
    competitor: "Interakt",
    description:
      "ECODrIx (ERIX) vs Interakt for Indian SMBs: Interakt leans towards commerce and catalogues; ERIX is a CRM, inbox and automation platform for service businesses.",
    tldr: "Interakt is a WhatsApp engagement tool that leans toward commerce and catalogue selling. ERIX is broader for service businesses: a CRM, bookings, GST invoices and automation for real estate, clinics, coaching institutes and agencies, not just product catalogues.",
    competitorBestFor:
      "Online sellers and D2C brands centred on selling from a WhatsApp catalogue.",
    ecodrixBestFor:
      "Service businesses (real estate, clinics, consultants) that need CRM depth, bookings, invoices and automation beyond catalogue commerce.",
    rows: [
      {
        dimension: "WhatsApp API",
        ecodrix: ERIX_API,
        competitor: "Official Meta WhatsApp Cloud API.",
        ecodrixWins: false,
      },
      {
        dimension: "Commerce / catalog selling",
        ecodrix: "Orders come in as chats and are invoiced with payment links. No catalogue or Shopify sync; storefront checkout is planned for later.",
        competitor: "Strength: WhatsApp catalogue and commerce features.",
        ecodrixWins: false,
      },
      {
        dimension: "Full CRM (pipeline, deals, invoices, projects)",
        ecodrix: "Built in: pipeline, bookings, GST invoices and projects for service businesses.",
        competitor: "Commerce-skewed; lighter sales pipeline.",
        ecodrixWins: true,
      },
      {
        dimension: "No-code automation",
        ecodrix: FLOW_ROW,
        competitor: "Notifications and campaign automations.",
        ecodrixWins: true,
      },
      {
        dimension: "AI agent on your chats",
        ecodrix: "Answers from your own price list and hours, drafts what it isn't sure of, and hands refunds and complaints to a person.",
        competitor: "Offers AI features; compare their current plans.",
        ecodrixWins: false,
      },
      {
        dimension: "Use-case breadth",
        ecodrix: "Real estate, clinics, agencies, consultants, more.",
        competitor: "Strongest for online/D2C commerce.",
        ecodrixWins: true,
      },
      META_ROW("Interakt"),
    ],
    faqs: [
      {
        q: "Is ECODrIx an Interakt alternative?",
        a: `Both use Meta's official WhatsApp platform. Interakt leans toward commerce and catalogue selling, while ERIX is a CRM, inbox and automation platform for service businesses. ${ERIX_PRICING}`,
      },
      {
        q: "Which is better for real estate or clinics?",
        a: "ERIX is built for service businesses: pipelines with stages for your trade, bookings in IST, appointment reminders, invoices and projects. Interakt is strongest for online catalogue commerce.",
      },
      { q: "How does WhatsApp pricing compare?", a: META_NOTE },
      {
        q: "Does ERIX support online selling too?",
        a: "Partly: orders arrive as chats, and you invoice them with a payment link. ERIX has no catalogue or Shopify sync today, and storefront checkout is planned for later, so if you sell mainly from a WhatsApp catalogue, compare both against your workflow.",
      },
    ],
    searchQueries: [
      "ecodrix vs interakt",
      "interakt alternative",
      "interakt alternative india",
      "whatsapp crm for real estate vs interakt",
    ],
    lastVerified: "2026-07-07",
  },
];

/* Helpers ─────────────────────────────────────────────────────────── */

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}

export function getComparisonSlugs(): string[] {
  return COMPARISONS.map((c) => c.slug);
}
