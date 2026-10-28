/**
 * Legal document registry — single source of truth for all policy pages.
 * Drives each /[policy] route, the /legal index, the footer, and the sitemap.
 */
import type { LegalDoc } from "@/lib/legal/config";
import { acceptableUseDoc } from "@/lib/legal/docs/acceptable-use";
import { contactDoc } from "@/lib/legal/docs/contact";
import { cookieDoc } from "@/lib/legal/docs/cookie";
import { dpaDoc } from "@/lib/legal/docs/dpa";
import { pricingPolicyDoc } from "@/lib/legal/docs/pricing-policy";
import { privacyDoc } from "@/lib/legal/docs/privacy";
import { refundDoc } from "@/lib/legal/docs/refund";
import { securityDoc } from "@/lib/legal/docs/security";
import { shippingDoc } from "@/lib/legal/docs/shipping";
import { subprocessorsDoc } from "@/lib/legal/docs/subprocessors";
import { termsDoc } from "@/lib/legal/docs/terms";
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
  shippingDoc,
  dpaDoc,
  subprocessorsDoc,
  securityDoc,
  contactDoc,
];

const BY_SLUG: Record<string, LegalDoc> = Object.fromEntries(LEGAL_DOCS.map((d) => [d.slug, d]));

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return BY_SLUG[slug];
}

/** Route path for a document slug (privacy/terms keep their existing URLs). */
export function legalHref(slug: string): string {
  return `/legal/${slug}`;
}
