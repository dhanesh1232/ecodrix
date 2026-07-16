/**
 * Shared legal/compliance configuration for ECODrIx public policy pages.
 *
 * ⚠️ IMPORTANT: These documents are drafted as thorough, good-faith templates
 * for an India-based SaaS handling CRM data, WhatsApp Business messaging, and
 * payments. They are NOT a substitute for legal advice. Before publishing,
 * have a qualified lawyer review them and fill every [BRACKETED] placeholder
 * (registered address, CIN, GST, jurisdiction, grievance officer name, etc.).
 */

import type { LucideIcon } from "lucide-react";

export const LEGAL = {
  brand: "ECODrIx",
  entity: "ECODrIx Private Limited",
  domain: "https://ecodrix.com",
  appUrl: "https://app.ecodrix.com",
  // ── Fill these before going live ──────────────────────────────────────
  registeredAddress: "[Registered Office Address], India",
  cin: "[CIN – Corporate Identification Number]",
  gstin: "[GSTIN]",
  jurisdiction: "[City], [State], India",
  governingLaw: "the laws of India",
  grievanceOfficer: "[Grievance Officer Name]",
  // ── Contact emails ────────────────────────────────────────────────────
  emails: {
    support: "support@ecodrix.com",
    privacy: "privacy@ecodrix.com",
    dpo: "dpo@ecodrix.com",
    grievance: "grievance@ecodrix.com",
    legal: "legal@ecodrix.com",
    billing: "billing@ecodrix.com",
    security: "security@ecodrix.com",
    abuse: "abuse@ecodrix.com",
  },
  products: ["ERIX", "LAIE", "FLOW", "Connect", "ErixStore"],
} as const;

/** Content blocks a legal section can render. Strings are treated as paragraphs. */
export type LegalBlock =
  | string
  | { p: string }
  | { subheading: string }
  | { list: string[] }
  | { ol: string[] }
  | { note: string }
  | { table: { headers: string[]; rows: string[][] } };

export interface LegalSection {
  id: string;
  title: string;
  icon: LucideIcon;
  body: LegalBlock[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  pill: string;
  description: string;
  intro?: string;
  /** Optional fixed effective date; defaults to build date when omitted. */
  effectiveDate?: string;
  sections: LegalSection[];
}

/** Registry entry for the /legal index and cross-linking. */
export interface LegalDocMeta {
  slug: string;
  title: string;
  summary: string;
}
