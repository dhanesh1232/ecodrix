/**
 * Legal document registry — single source of truth for all policy pages.
 * Drives each /[policy] route, the /legal index, the footer, and the sitemap.
 */
import type { LegalDoc } from "@/lib/legal/config";
import { privacyDoc } from "@/lib/legal/docs/privacy";
import { termsDoc } from "@/lib/legal/docs/terms";
import { refundDoc } from "@/lib/legal/docs/refund";
import { pricingPolicyDoc } from "@/lib/legal/docs/pricing-policy";
import { acceptableUseDoc } from "@/lib/legal/docs/acceptable-use";
import { cookieDoc } from "@/lib/legal/docs/cookie";
import { dpaDoc } from "@/lib/legal/docs/dpa";
import { subprocessorsDoc } from "@/lib/legal/docs/subprocessors";
import { securityDoc } from "@/lib/legal/docs/security";
import { slaDoc } from "@/lib/legal/docs/sla";
import { whatsappPolicyDoc } from "@/lib/legal/docs/whatsapp-policy";

/** All documents, in the order shown on the /legal index. */
export const LEGAL_DOCS: LegalDoc[] = [
  termsDoc,
  privacyDoc,
  cookieDoc,
  acceptableUseDoc,
  whatsappPolicyDoc,
  refundDoc,
  pricingPolicyDoc,
  slaDoc,
  dpaDoc,
  subprocessorsDoc,
  securityDoc,
];

const BY_SLUG: Record<string, LegalDoc> = Object.fromEntries(
  LEGAL_DOCS.map((d) => [d.slug, d]),
);

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return BY_SLUG[slug];
}

/** Route path for a document slug (privacy/terms keep their existing URLs). */
export function legalHref(slug: string): string {
  return `/legal/${slug}`;
}
