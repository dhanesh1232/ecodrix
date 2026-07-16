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
 * ⚠️ Accuracy guardrail: competitor pricing/features change often. Claims here
 * are qualitative and dated (see `lastVerified`). ECODrIx keeps its own known
 * INR pricing; competitor pricing is described by model, not fixed rupee figures.
 * Re-verify with `remote_web_search` before major edits. Never fabricate ratings.
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
  color: string;
}

/* Shared truths about ECODrIx / ERIX reused across comparisons. */
const ERIX_API = "Official Meta WhatsApp Cloud API (verified Tech Provider).";
const ERIX_PRICING =
  "Flat INR plans from ₹2,999/month (Starter), ₹7,999 (Growth), ₹19,999 (Business), plus Meta's per-message charges. 14-day free trial, no credit card.";
const META_NOTE =
  "Since 2025 Meta bills per message by category — in India roughly ₹1.09 for marketing and ₹0.145 for utility/authentication, with service replies free. Every provider passes these Meta charges through; the difference is the platform fee and what you get on top of it.";

export const COMPARISONS: Comparison[] = [
  {
    slug: "ecodrix-vs-wati",
    competitor: "Wati",
    description:
      "ECODrIx (ERIX) vs Wati: a WhatsApp CRM comparison for Indian SMBs. Same official Meta API, but ERIX adds a full CRM, automation, and lead-gen on flat INR pricing.",
    tldr: "Wati is a well-established WhatsApp Business API tool with strong template and broadcast management, popular with support and marketing teams. ERIX matches Wati's official-API messaging but bundles a full CRM (pipelines, deals, invoices, projects), no-code automation (FLOW), and lead generation (LAIE) into one INR-priced platform — so you don't bolt a separate CRM onto your WhatsApp tool.",
    competitorBestFor:
      "Teams that only need WhatsApp messaging, shared inbox, and broadcasts, and already run a separate CRM they're happy with.",
    ecodrixBestFor:
      "Indian SMBs and agencies that want WhatsApp AND the system of record — pipeline, deals, invoices, automation, and lead-gen — in one login, priced in INR.",
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
          "Built in — kanban pipeline, lead scoring, invoices, project workspaces.",
        competitor:
          "Primarily a messaging/support tool; CRM features are lighter.",
        ecodrixWins: true,
      },
      {
        dimension: "No-code automation",
        ecodrix: "ERIX-FLOW visual builder included.",
        competitor: "Rule-based automations and chatbot flows.",
        ecodrixWins: true,
      },
      {
        dimension: "Lead generation / enrichment",
        ecodrix: "ERIX-LAIE discovery, enrichment, and outreach kits included.",
        competitor: "Not offered.",
        ecodrixWins: true,
      },
      {
        dimension: "Pricing model",
        ecodrix: ERIX_PRICING,
        competitor:
          "Monthly platform fee with per-agent charges and add-ons, plus Meta message charges.",
        ecodrixWins: true,
      },
      {
        dimension: "White-label for agencies",
        ecodrix: "Supported.",
        competitor: "Limited.",
        ecodrixWins: true,
      },
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
        a: `Yes. ERIX uses the same official Meta WhatsApp Cloud API as Wati, and adds a full CRM, no-code automation, and lead generation in one INR-priced platform. ${ERIX_PRICING}`,
      },
      {
        q: "Do ECODrIx and Wati use the same WhatsApp API?",
        a: "Both use the official Meta WhatsApp Cloud API, so messaging capabilities and Meta's charges are equivalent. The difference is the platform built around it — ERIX includes a full CRM and automation.",
      },
      { q: "How does WhatsApp pricing work with either tool?", a: META_NOTE },
      {
        q: "Can I move from Wati to ECODrIx?",
        a: "Yes. You can import contacts and reconnect your WhatsApp Business number through ECODrIx Connect. The 14-day free trial lets you evaluate ERIX before switching.",
      },
    ],
    searchQueries: [
      "ecodrix vs wati",
      "wati alternative india",
      "wati alternative for small business",
      "best wati alternative whatsapp crm",
    ],
    lastVerified: "2026-07-07",
    color: "#25D366",
  },
  {
    slug: "ecodrix-vs-aisensy",
    competitor: "AiSensy",
    description:
      "ECODrIx (ERIX) vs AiSensy: WhatsApp CRM comparison for Indian SMBs. AiSensy leads on broadcast marketing; ERIX adds full CRM, automation, and lead-gen in one platform.",
    tldr: "AiSensy is a popular, affordable WhatsApp marketing platform in India, strong on broadcast campaigns and chatbot flows. ERIX is for teams that outgrow 'broadcast + basic inbox' and need real pipeline, deal, invoice, and project tracking with built-in automation — without moving to a separate CRM.",
    competitorBestFor:
      "Businesses focused on high-volume WhatsApp broadcast marketing and simple chatbot flows at a low platform fee.",
    ecodrixBestFor:
      "SMBs whose WhatsApp marketing has turned into a real sales pipeline that needs CRM, automation, and lead-gen alongside messaging.",
    rows: [
      {
        dimension: "WhatsApp API",
        ecodrix: ERIX_API,
        competitor: "Official Meta WhatsApp Cloud API.",
        ecodrixWins: false,
      },
      {
        dimension: "Broadcast marketing",
        ecodrix: "Segmented broadcasts included.",
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
        ecodrix: "ERIX-FLOW visual builder across WhatsApp, email, CRM.",
        competitor: "Chatbot flows and campaign automations.",
        ecodrixWins: true,
      },
      {
        dimension: "Lead generation / enrichment",
        ecodrix: "ERIX-LAIE included.",
        competitor: "Not offered.",
        ecodrixWins: true,
      },
      {
        dimension: "Pricing model",
        ecodrix: ERIX_PRICING,
        competitor:
          "Low monthly platform fee tiers plus Meta message charges; higher tiers for more features.",
        ecodrixWins: false,
      },
      {
        dimension: "Best-fit user",
        ecodrix: "Sales-led SMBs wanting one platform.",
        competitor: "Marketing-led teams doing broadcast at low cost.",
        ecodrixWins: false,
      },
    ],
    faqs: [
      {
        q: "Is ECODrIx an AiSensy alternative?",
        a: `Yes. Both run on the official Meta WhatsApp Cloud API. AiSensy is marketing/broadcast-led, while ERIX adds a full CRM, automation (FLOW), and lead generation (LAIE). ${ERIX_PRICING}`,
      },
      {
        q: "Is AiSensy cheaper than ECODrIx?",
        a: "AiSensy's entry platform fee can be lower if you only need broadcasts. ERIX's plans cost more because they include a full CRM, automation, and lead-gen — so the right comparison is total tooling cost, not messaging fee alone.",
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
    color: "#2b4dcb",
  },
  {
    slug: "ecodrix-vs-interakt",
    competitor: "Interakt",
    description:
      "ECODrIx (ERIX) vs Interakt: WhatsApp CRM comparison for Indian SMBs. Interakt leans commerce/Shopify; ERIX is a broader CRM + automation + lead-gen platform.",
    tldr: "Interakt (from Jio Haptik) is a WhatsApp engagement tool that leans toward commerce and Shopify/catalog selling. ERIX is broader: a full CRM plus automation and lead generation for service SMBs, agencies, real estate, and clinics — not just product catalogs.",
    competitorBestFor:
      "Online sellers and D2C brands centered on WhatsApp catalog selling and Shopify/commerce integrations.",
    ecodrixBestFor:
      "Service businesses and agencies (real estate, clinics, consultants) that need CRM depth, automation, and lead-gen beyond catalog commerce.",
    rows: [
      {
        dimension: "WhatsApp API",
        ecodrix: ERIX_API,
        competitor: "Official Meta WhatsApp Cloud API.",
        ecodrixWins: false,
      },
      {
        dimension: "Commerce / catalog selling",
        ecodrix: "Supported via CRM + invoices; not catalog-first.",
        competitor: "Strength — WhatsApp catalog and Shopify integration.",
        ecodrixWins: false,
      },
      {
        dimension: "Full CRM (pipeline, deals, invoices, projects)",
        ecodrix: "Built in — service-business ready.",
        competitor: "Commerce-skewed; lighter sales pipeline.",
        ecodrixWins: true,
      },
      {
        dimension: "No-code automation",
        ecodrix: "ERIX-FLOW visual builder included.",
        competitor: "Notifications and campaign automations.",
        ecodrixWins: true,
      },
      {
        dimension: "Lead generation / enrichment",
        ecodrix: "ERIX-LAIE included.",
        competitor: "Not offered.",
        ecodrixWins: true,
      },
      {
        dimension: "Use-case breadth",
        ecodrix: "Real estate, clinics, agencies, consultants, more.",
        competitor: "Strongest for online/D2C commerce.",
        ecodrixWins: true,
      },
      {
        dimension: "Pricing model",
        ecodrix: ERIX_PRICING,
        competitor: "Monthly platform tiers plus Meta message charges.",
        ecodrixWins: false,
      },
    ],
    faqs: [
      {
        q: "Is ECODrIx an Interakt alternative?",
        a: `Yes. Both use the official Meta WhatsApp Cloud API. Interakt leans toward commerce/catalog selling, while ERIX is a broader CRM + automation + lead-gen platform for service SMBs and agencies. ${ERIX_PRICING}`,
      },
      {
        q: "Which is better for real estate or clinics?",
        a: "ERIX. It's built for service businesses — lead pipelines, appointment follow-ups, invoices, and projects — whereas Interakt is strongest for online catalog commerce.",
      },
      { q: "How does WhatsApp pricing compare?", a: META_NOTE },
      {
        q: "Does ERIX support online selling too?",
        a: "Yes, through CRM deals and invoices, but it isn't catalog-first. If your business is purely WhatsApp catalog commerce, evaluate both against your workflow during the free trial.",
      },
    ],
    searchQueries: [
      "ecodrix vs interakt",
      "interakt alternative",
      "interakt alternative india",
      "whatsapp crm for real estate vs interakt",
    ],
    lastVerified: "2026-07-07",
    color: "#F59E0B",
  },
];

/* Helpers ─────────────────────────────────────────────────────────── */

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}

export function getComparisonSlugs(): string[] {
  return COMPARISONS.map((c) => c.slug);
}
