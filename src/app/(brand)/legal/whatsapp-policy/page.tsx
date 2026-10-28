import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { getLegalDoc } from "@/lib/legal/documents";
import { legalMetadata } from "@/lib/legal/metadata";

export const metadata: Metadata = legalMetadata("whatsapp-policy");

export default function WhatsAppPolicyPage() {
  return <LegalLayout doc={getLegalDoc("whatsapp-policy")!} />;
}
