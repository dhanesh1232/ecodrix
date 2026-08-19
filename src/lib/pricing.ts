/**
 * Pricing helpers for the public landing page.
 *
 * Fetches live plans + add-ons from the platform backend
 * (`GET /v1/api/platform/billing/plans/public`), with a static fallback for when the
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
    aiAgent?: boolean;
    esignsPerMonth?: Quota;
    /** Invoice PDF exports per month (rehomed from the retired editor). */
    pdfExport?: Quota;
    /** In-product AI assists per month (rehomed from the retired editor). */
    aiAssists?: Quota;
  };
  laie?: {
    auditsPerMonth?: Quota;
    accessibilityChecks?: boolean;
    seoChecks?: boolean;
    customReports?: boolean;
  };
  connect?: {
    channels?: Quota;
    whatsapp?: boolean;
    email?: boolean;
    instagram?: boolean;
    telegram?: boolean;
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
  /** `null` = custom / contact-sales pricing (Enterprise). */
  priceMonthlyUsd: number | null;
  /** `null` = custom / contact-sales pricing (Enterprise). */
  priceYearlyUsd: number | null;
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
    | "connect"
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
    const url = `${getApiUrl().replace(/\/$/, "")}/v1/api/platform/billing/plans/public`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, {
      next: { revalidate: 300 },
      signal: controller.signal,
    } as unknown as RequestInit);

    clearTimeout(timeout);

    if (!res.ok) return null;
    const data = (await res.json()) as PublicPlansResponse;
    if (!data || !Array.isArray(data.plans)) return null;
    return data;
  } catch {
    return null;
  }
}

// ─── Display helpers ───────────────────────────────────────────────────────

/**
 * Format an integer amount in the plan's currency (₹ for INR, $ for USD, …).
 * Whole numbers only — plans are billed in whole major units.
 */
export function formatMoney(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  }).format(amount);
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
export function yearlyDiscountPct(
  monthly: number | null,
  yearly: number | null,
): number {
  if (!monthly || !yearly || monthly <= 0 || yearly <= 0) return 0;
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
        `${fmtQuota(erix.pdfExport)} invoice PDF exports/month`,
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
        `${fmtQuota(erix.aiAssists)} AI assists/month`,
        fmtStorage(storage.storageGB),
        `${fmtQuota(laie.auditsPerMonth)} LAIE audits/month`,
        `${fmtQuota(workflows.activeWorkflows)} active workflows`,
        "Webhooks & broadcasts",
        "Email support",
      ];

    case "growth":
      return [
        `Up to ${fmtQuota(erix.contacts)} contacts`,
        `${fmtQuota(erix.agents)} agents`,
        `${fmtQuota(ai.callsPerMonth)} AI calls/month`,
        `${fmtQuota(erix.aiAssists)} AI assists/month`,
        fmtStorage(storage.storageGB),
        "AI agent auto-reply across channels",
        "Custom branding & domain",
        `${fmtQuota(laie.auditsPerMonth)} LAIE audits/month`,
        `${fmtQuota(workflows.activeWorkflows)} active workflows`,
        "99% uptime SLA",
      ];

    case "scale":
      return [
        `Up to ${fmtQuota(erix.contacts)} contacts`,
        `${fmtQuota(erix.agents)} agents`,
        `${fmtQuota(ai.callsPerMonth)} AI calls/month`,
        `${fmtQuota(erix.aiAssists)} AI assists/month`,
        fmtStorage(storage.storageGB),
        "Priority support & white-label",
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
        color: "#64748B",
        colorClass: "text-[#334155]",
        bgClass: "bg-[#0F172A]/5",
      };
    case "starter":
      return {
        color: "#2b4dcb",
        colorClass: "text-[#2b4dcb]",
        bgClass: "bg-[#2b4dcb]/10",
      };
    case "growth":
      return {
        color: "#8d1fae",
        colorClass: "text-[#8d1fae]",
        bgClass: "bg-[#8d1fae]/10",
      };
    case "scale":
      return {
        color: "#4ADE80",
        colorClass: "text-[#4ADE80]",
        bgClass: "bg-[#4ADE80]/10",
      };
    case "enterprise":
      return {
        color: "#b34fcf",
        colorClass: "text-[#b34fcf]",
        bgClass: "bg-[#b34fcf]/10",
      };
    default:
      return {
        color: "#2b4dcb",
        colorClass: "text-[#2b4dcb]",
        bgClass: "bg-[#2b4dcb]/10",
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

const APP_URL = "https://console.ecodrix.com";

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
  ai: "AI",
  platform: "Platform",
  erix: "ERIX",
  laie: "LAIE",
  connect: "Connect",
};

export function formatAddonPrice(addon: PublicAddon): string {
  const unit =
    addon.priceUnit === "per_call"
      ? "per call"
      : addon.priceUnit === "per_gb"
        ? "per GB"
        : (addon.priceUnit ?? "month");

  // Pay-as-you-go entries store 0/month — display the unit price only.
  if (addon.priceMonthlyUsd === 0 && addon.priceUnit !== "month") {
    return `Pay-as-you-go · $0.05 / ${unit}`;
  }
  return `${formatMoney(addon.priceMonthlyUsd, "USD")} / ${unit}`;
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
  // Stable order: cloud_storage, ai, platform, then anything else.
  const order = ["cloud_storage", "ai", "platform"];
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
    currency: "INR",
    isDefault: true,
    features: {
      erix: {
        contacts: 100,
        agents: 1,
        whatsappMessages: 200,
        pdfExport: 5,
        aiAssists: 0,
      },
      laie: { auditsPerMonth: 5 },
      cloud_storage: { storageGB: 1, bandwidthGB: 5 },
      workflows: { activeWorkflows: 1 },
      ai: { callsPerMonth: 50 },
      sla: "none",
    },
  },
  {
    slug: "starter",
    name: "Starter",
    tier: 10,
    priceMonthlyUsd: 2999,
    priceYearlyUsd: 29990,
    currency: "INR",
    isDefault: false,
    features: {
      erix: {
        contacts: 1000,
        agents: 3,
        whatsappMessages: 2000,
        pdfExport: 50,
        aiAssists: 50,
        broadcasts: true,
      },
      laie: { auditsPerMonth: 50 },
      cloud_storage: { storageGB: 10, bandwidthGB: 50 },
      workflows: { activeWorkflows: 5 },
      ai: { callsPerMonth: 500 },
      sla: "none",
    },
  },
  {
    slug: "growth",
    name: "Growth",
    tier: 20,
    priceMonthlyUsd: 8999,
    priceYearlyUsd: 89990,
    currency: "INR",
    isDefault: false,
    features: {
      erix: {
        contacts: 5000,
        agents: 10,
        whatsappMessages: 10000,
        pdfExport: 200,
        aiAssists: 300,
        aiAgent: true,
      },
      laie: { auditsPerMonth: 200 },
      cloud_storage: { storageGB: 50, bandwidthGB: 200, customDomain: true },
      workflows: { activeWorkflows: 20 },
      ai: { callsPerMonth: 2500 },
      customBranding: true,
      customDomain: true,
      sla: "99",
    },
  },
  {
    slug: "scale",
    name: "Scale",
    tier: 30,
    priceMonthlyUsd: 19999,
    priceYearlyUsd: 199990,
    currency: "INR",
    isDefault: false,
    features: {
      erix: {
        contacts: 25000,
        agents: 25,
        whatsappMessages: 50000,
        pdfExport: 1000,
        aiAssists: 1500,
        aiAgent: true,
      },
      laie: { auditsPerMonth: 1000 },
      cloud_storage: { storageGB: 200, bandwidthGB: 1000, customDomain: true },
      workflows: { activeWorkflows: 100 },
      ai: { callsPerMonth: 10000 },
      customBranding: true,
      customDomain: true,
      whiteLabel: true,
      prioritySupport: true,
      sla: "99.9",
    },
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    tier: 40,
    priceMonthlyUsd: null,
    priceYearlyUsd: null,
    currency: "INR",
    isDefault: false,
    features: {
      erix: {
        contacts: "unlimited",
        agents: "unlimited",
        whatsappMessages: "unlimited",
        pdfExport: "unlimited",
        aiAssists: "unlimited",
        aiAgent: true,
      },
      laie: { auditsPerMonth: "unlimited" },
      cloud_storage: {
        storageGB: "unlimited",
        bandwidthGB: "unlimited",
        customDomain: true,
      },
      workflows: { activeWorkflows: "unlimited" },
      ai: { callsPerMonth: "unlimited" },
      customBranding: true,
      customDomain: true,
      whiteLabel: true,
      prioritySupport: true,
      sla: "99.99",
    },
  },
];

/** Empty fallback addon list — UI hides the section if empty. */
export const FALLBACK_ADDONS: PublicAddon[] = [];
