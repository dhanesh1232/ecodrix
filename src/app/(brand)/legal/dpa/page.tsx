import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { getLegalDoc } from "@/lib/legal/documents";
import { legalMetadata } from "@/lib/legal/metadata";

export const metadata: Metadata = legalMetadata("dpa");

export default function DpaPage() {
  return <LegalLayout doc={getLegalDoc("dpa")!} />;
}
