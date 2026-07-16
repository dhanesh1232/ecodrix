import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { getLegalDoc } from "@/lib/legal/documents";
import { legalMetadata } from "@/lib/legal/metadata";

export const metadata: Metadata = legalMetadata("cookie-policy");

export default function CookiePolicyPage() {
  return <LegalLayout doc={getLegalDoc("cookie-policy")!} />;
}
