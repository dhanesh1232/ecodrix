import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { getLegalDoc } from "@/lib/legal/documents";
import { legalMetadata } from "@/lib/legal/metadata";

export const metadata: Metadata = legalMetadata("subprocessors");

export default function SubprocessorsPage() {
  return <LegalLayout doc={getLegalDoc("subprocessors")!} />;
}
