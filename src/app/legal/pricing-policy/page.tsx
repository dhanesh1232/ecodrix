import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { getLegalDoc } from "@/lib/legal/documents";
import { legalMetadata } from "@/lib/legal/metadata";

export const metadata: Metadata = legalMetadata("pricing-policy");

export default function PricingPolicyPage() {
  return <LegalLayout doc={getLegalDoc("pricing-policy")!} />;
}
