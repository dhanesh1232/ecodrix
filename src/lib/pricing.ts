/**
 * Pricing helpers for the public landing page.
 *
 * Fetches live plans + add-ons from the platform backend
 * (`GET /api/platform/plans/public`), with a static fallback for when the
 * API is unreachable. Includes a feature humaniser that turns the unified
 * `plan.features` jsonb into a curated bullet list for marketing display.
 *
 * The shape mirrors the server response:
 *   ECOD/server/src/routes/platform/plans.routes.ts
 */

// ─── Types ─────────────────────────────────────────────────────────────────

/** A `Quota` value as stored in the unified features object. */
export type Quota = number | "unlimited";

export interface PlanFeatures {
  erix?: {
    contacts?: Quota;
    agents?: Quota;
    whatsappMessages?: Quota;
    pipelines?: Quota;
    broadcasts?: boolean;
    customFields?: boolean;
  };
  laie?: {
    auditsPerMonth?: Quota;
    accessibilityChecks?: boolean;
    seoChecks?: boolean;
    customReports?: boolean;
  };
  editor?: {
    comments?: boolean;
    versions?: Quota;
    mentions?: boolean;
    pdfExport?: Quota;
    templates?: Quota;
    aiCalls?: Quota;
    collaboration?: Quota;
    customBranding?: boolean;
    whiteLabel?: boolean;
    webhooks?: boolean;
    embedsPerDoc?: Quota;
  };
  cloud_storage?: {
    storageGB?: Quota;
    bandwidthGB?: Quota;
    transformsPerMonth?: Quota;
    customDomain?: boolean;
    signedUrls?: boolean;
  };
  workflows?: {
    activeWorkflows?: Quota;
    runsPerMonth?: Quota;
    conditionalNodes?: boolean;
    customNodes?: boolean;
  };
  ai?: {
    callsPerMonth?: Quota;
    modelsAccessible?: string[];
    embeddings?: boolean;
  };
  erix_store?: {
    jobsPerMonth?: Quota;
    semanticCacheGB?: Quota;
    queueRetentionDays?: Quota;
  };
  customDomain?: boolean;
  customBranding?: boolean;
  whiteLabel?: boolean;
  webhooks?: boolean;
  prioritySupport?: boolean;
  sla?: "none" | "99" | "99.9" | "99.99";
}

export type PlanSlug = "free" | "starter" | "growth" | "scale" | "enterprise";

export interface PublicPlan {
  slug: PlanSlug | string;
  name: string;
  tier: number;
  priceMonthlyUsd: number;
  priceYearlyUsd: number;
  currency: string;
  features: PlanFeatures;
  isDefault: boolean;
}

export interface PublicAddon {
  slug: string;
  name: string;
  description: string | null;
  service:
    | "erix"
    | "laie"
    | "editor"
    | "cloud_storage"
    | "ai"
    | "platform"
    | string;
  feature: string;
  priceMonthlyUsd: number;
  priceUnit: "month" | "per_call" | "per_gb" | string | null;
}

export interface PublicPlansResponse {
  plans: PublicPlan[];
  addons: PublicAddon[];
}

// ─── Fetch ─────────────────────────────────────────────────────────────────

function getApiUrl(): string {
  // Same env convention used by Contact.tsx; fall back to production.
  // Read via `globalThis` so this file type-checks even when the IDE's
  // TS service hasn't picked up `@types/node`.
  const proc = (
    globalThis as { process?: { env?: Record<string, string | undefined> } }
  ).process;
  const env = proc?.env ?? {};
  return env.NEXT_PUBLIC_ERIX_SOCKET_URL || "https://api.ecodrix.com";
}

/**
 * Server-side fetch with ISR. Returns the response on success or `null`
 * on failure (network error, non-2xx, malformed body) so the caller can
 * fall back to the static snapshot.
 */
export async function fetchPublicPlans(): Promise<PublicPlansResponse | null> {
  try {
    const url = `${getApiUrl().replace(/\/$/, "")}/api/platform/plans/public`;
    // The `next.revalidate` field is a Next.js extension to RequestInit; cast
    // through `unknown` so this file type-checks even without next-env.d.ts
    // being in scope of this module's diagnostic context.
    const res = await fetch(url, {
      next: { revalidate: 300 },
    } as unknown as RequestInit);
    if (!res.ok) return null;
    const data = (await res.json()) as PublicPlansResponse;
    if (!data || !Array.isArray(data.plans)) return null;
    return data;
  } catch {
    return null;
  }
}

// ─── Display helpers ───────────────────────────────────────────────────────

/** Format a USD integer as `$X` or `$X,XXX`. */
export function formatUsd(usd: number): string {
  if (usd === 0) return "$0";
  return `$${usd.toLocaleString("en-US")}`;
}

/** Format a quota value: number, "unlimited", or "0" → "—". */
function fmtQuota(q: Quota | undefined): string {
  if (q === undefined) return "—";
  if (q === "unlimited") return "Unlimited";
  if (typeof q === "number") {
    if (q >= 1_000_000) return `${(q / 1_000_000).toLocaleString()}M`;
    if (q >= 1_000) return `${q.toLocaleString()}`;
    return q.toString();
  }
  return String(q);
}

/** Humanise storage GB: 2000 → "2 TB", 1 → "1 GB". */
function fmtStorage(gb: Quota | undefined): string {
  if (gb === "unlimited") return "Unlimited storage";
  if (typeof gb === "number") {
    if (gb >= 1000) return `${(gb / 1000).toLocaleString()} TB storage`;
    return `${gb} GB storage`;
  }
  return "—";
}

/**
 * Yearly discount % vs paying monthly for 12 months.
 * Returns 0 for free plans or when there's no discount.
 */
export function yearlyDiscountPct(monthly: number, yearly: number): number {
  if (monthly <= 0 || yearly <= 0) return 0;
  return Math.round(((monthly * 12 - yearly) / (monthly * 12)) * 100);
}

/**
 * Pick 8–10 marketing-grade bullet points per plan slug from the unified
 * features object. Per-tier bespoke selection makes copy land cleanly.
 */
export function humaniseFeatures(plan: PublicPlan): string[] {
  const f = plan.features ?? {};
  const erix = f.erix ?? {};
  const laie = f.laie ?? {};
  const editor = f.editor ?? {};
  const storage = f.cloud_storage ?? {};
  const workflows = f.workflows ?? {};
  const ai = f.ai ?? {};

  switch (plan.slug) {
    case "free":
      return [
        `Up to ${fmtQuota(erix.contacts)} contacts`,
        `${fmtQuota(erix.agents)} agent`,
        `${fmtQuota(laie.auditsPerMonth)} LAIE audits/month`,
        fmtStorage(storage.storageGB),
        `${fmtQuota(editor.pdfExport)} PDF exports/month`,
        `${fmtQuota(workflows.activeWorkflows)} active workflow`,
        `${fmtQuota(erix.whatsappMessages)} WhatsApp messages/month`,
        "Accessibility & SEO checks",
        "Community support",
      ];

    case "starter":
      return [
        `Up to ${fmtQuota(erix.contacts)} contacts`,
        `${fmtQuota(erix.agents)} agents`,
        `${fmtQuota(erix.whatsappMessages)} WhatsApp messages/month`,
        `${fmtQuota(ai.callsPerMonth)} AI calls/month`,
        fmtStorage(storage.storageGB),
        `${fmtQuota(laie.auditsPerMonth)} LAIE audits/month`,
        "Comments, mentions & versions",
        `${fmtQuota(workflows.activeWorkflows)} active workflows`,
        "Webhooks & broadcasts",
        "Email support",
      ];

    case "growth":
      return [
        `Up to ${fmtQuota(erix.contacts)} contacts`,
        `${fmtQuota(erix.agents)} agents`,
        `${fmtQuota(ai.callsPerMonth)} AI calls/month`,
        `${fmtQuota(editor.collaboration)} collaborators per doc`,
        fmtStorage(storage.storageGB),
        "Custom branding & domain",
        `${fmtQuota(laie.auditsPerMonth)} LAIE audits/month`,
        `${fmtQuota(workflows.activeWorkflows)} active workflows`,
        "AI embeddings & semantic search",
        "99% uptime SLA",
      ];

    case "scale":
      return [
        `Up to ${fmtQuota(erix.contacts)} contacts`,
        `${fmtQuota(erix.agents)} agents`,
        `${fmtQuota(ai.callsPerMonth)} AI calls/month`,
        `${fmtQuota(editor.collaboration)} collaborators per doc`,
        fmtStorage(storage.storageGB),
        "Priority support",
        `${fmtQuota(laie.auditsPerMonth)} LAIE audits/month`,
        `${fmtQuota(workflows.activeWorkflows)} active workflows`,
        "Custom branding & domain",
        "99.9% uptime SLA",
      ];

    case "enterprise":
      return [
        "Unlimited contacts & agents",
        "Unlimited AI calls",
        "Unlimited collaborators",
        "Unlimited storage & bandwidth",
        "White-label deployment",
        "Custom domain & branding",
        "Dedicated account manager",
        "On-premise / private cloud",
        "99.99% uptime SLA",
        "Custom contracts & invoicing",
      ];

    default:
      // Generic best-effort humaniser for any unknown slug.
      return [
        `Up to ${fmtQuota(erix.contacts)} contacts`,
        `${fmtQuota(erix.agents)} agents`,
        `${fmtQuota(ai.callsPerMonth)} AI calls/month`,
        fmtStorage(storage.storageGB),
        `${fmtQuota(workflows.activeWorkflows)} active workflows`,
        f.prioritySupport ? "Priority support" : "Email support",
      ];
  }
}

// ─── Visual style per plan ─────────────────────────────────────────────────

export interface PlanVisualStyle {
  color: string;
  colorClass: string;
  bgClass: string;
}

/**
 * Map plan slug to brand colours. Falls back to primary purple for unknown
 * slugs so the layout never breaks if a new tier is introduced.
 */
export function planVisualStyle(slug: string): PlanVisualStyle {
  switch (slug) {
    case "free":
      return {
        color: "#64647A",
        colorClass: "text-[#B0B0CC]",
        bgClass: "bg-white/5",
      };
    case "starter":
      return {
        color: "#7C6EFA",
        colorClass: "text-[#7C6EFA]",
        bgClass: "bg-[#7C6EFA]/10",
      };
    case "growth":
      return {
        color: "#22D3EE",
        colorClass: "text-[#22D3EE]",
        bgClass: "bg-[#22D3EE]/10",
      };
    case "scale":
      return {
        color: "#4ADE80",
        colorClass: "text-[#4ADE80]",
        bgClass: "bg-[#4ADE80]/10",
      };
    case "enterprise":
      return {
        color: "#A89EFD",
        colorClass: "text-[#A89EFD]",
        bgClass: "bg-[#A89EFD]/10",
      };
    default:
      return {
        color: "#7C6EFA",
        colorClass: "text-[#7C6EFA]",
        bgClass: "bg-[#7C6EFA]/10",
      };
  }
}

/** Per-plan tagline — short, marketing-friendly. */
export function planDescription(slug: string): string {
  switch (slug) {
    case "free":
      return "Try every product. No credit card. Forever free.";
    case "starter":
      return "For small teams getting started with automation.";
    case "growth":
      return "For growing businesses that need more power.";
    case "scale":
      return "For established teams with serious volume.";
    case "enterprise":
      return "Custom infrastructure, contracts, and SLAs.";
    default:
      return "";
  }
}

// ─── CTA helpers ───────────────────────────────────────────────────────────

const APP_URL = "https://app.ecodrix.com";

export function planCtaLabel(slug: string): string {
  if (slug === "free") return "Start Free";
  if (slug === "enterprise") return "Contact Sales";
  return "Start Free Trial";
}

export function planCtaHref(slug: string): string {
  if (slug === "enterprise") {
    return "mailto:contact@ecodrix.com?subject=Enterprise%20Plan%20Inquiry";
  }
  return `${APP_URL}/auth/signup?plan=${encodeURIComponent(slug)}`;
}

// ─── Add-on grouping ───────────────────────────────────────────────────────

export const ADDON_SERVICE_LABEL: Record<string, string> = {
  cloud_storage: "Cloud Storage",
  editor: "Editor",
  ai: "AI",
  platform: "Platform",
  erix: "ERIX",
  laie: "LAIE",
};

export function formatAddonPrice(addon: PublicAddon): string {
  const unit =
    addon.priceUnit === "per_call"
      ? "per call"
      : addon.priceUnit === "per_gb"
        ? "per GB"
        : (addon.priceUnit ?? "month");

  // Pay-as-you-go entries store $0/month — display the unit price only.
  if (addon.priceMonthlyUsd === 0 && addon.priceUnit !== "month") {
    return `Pay-as-you-go · $0.05 / ${unit}`;
  }
  return `${formatUsd(addon.priceMonthlyUsd)} / ${unit}`;
}

export function groupAddonsByService(
  addons: PublicAddon[],
): Array<{ service: string; label: string; items: PublicAddon[] }> {
  const groups = new Map<string, PublicAddon[]>();
  for (const a of addons) {
    const key = a.service ?? "platform";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(a);
  }
  // Stable order: cloud_storage, editor, ai, platform, then anything else.
  const order = ["cloud_storage", "editor", "ai", "platform"];
  const sortedKeys = [
    ...order.filter((k) => groups.has(k)),
    ...[...groups.keys()].filter((k) => !order.includes(k)),
  ];
  return sortedKeys.map((key) => ({
    service: key,
    label: ADDON_SERVICE_LABEL[key] ?? key,
    items: groups.get(key) ?? [],
  }));
}

// ─── Fallback snapshot ─────────────────────────────────────────────────────

/**
 * Static snapshot used when the API is unreachable. Mirrors the seed data so
 * the page still renders meaningfully without a live backend.
 */
export const FALLBACK_PLANS: PublicPlan[] = [
  {
    slug: "free",
    name: "Free",
    tier: 0,
    priceMonthlyUsd: 0,
    priceYearlyUsd: 0,
    currency: "USD",
    isDefault: true,
    features: {
      erix: { contacts: 100, agents: 1, whatsappMessages: 1000 },
      laie: { auditsPerMonth: 5 },
      editor: { pdfExport: 5 },
      cloud_storage: { storageGB: 1, bandwidthGB: 5 },
      workflows: { activeWorkflows: 1 },
      ai: { callsPerMonth: 0 },
      sla: "none",
    },
  },
  {
    slug: "starter",
    name: "Starter",
    tier: 10,
    priceMonthlyUsd: 29,
    priceYearlyUsd: 290,
    currency: "USD",
    isDefault: false,
    features: {
      erix: { contacts: 2000, agents: 3, whatsappMessages: 10000 },
      laie: { auditsPerMonth: 50 },
      editor: { pdfExport: 100, comments: true, mentions: true },
      cloud_storage: { storageGB: 25, bandwidthGB: 100 },
      workflows: { activeWorkflows: 10 },
      ai: { callsPerMonth: 100 },
      sla: "none",
    },
  },
  {
    slug: "growth",
    name: "Growth",
    tier: 20,
    priceMonthlyUsd: 79,
    priceYearlyUsd: 790,
    currency: "USD",
    isDefault: false,
    features: {
      erix: { contacts: 25000, agents: 10, whatsappMessages: 100000 },
      laie: { auditsPerMonth: 500 },
      editor: { pdfExport: 1000, comments: true, collaboration: 5 },
      cloud_storage: { storageGB: 250, bandwidthGB: 1000, customDomain: true },
      workflows: { activeWorkflows: 100 },
      ai: { callsPerMonth: 1000 },
      customBranding: true,
      customDomain: true,
      sla: "99",
    },
  },
];

/** Empty fallback addon list — UI hides the section if empty. */
export const FALLBACK_ADDONS: PublicAddon[] = [];
