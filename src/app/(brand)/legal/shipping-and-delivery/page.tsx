import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { getLegalDoc } from "@/lib/legal/documents";
import { legalMetadata } from "@/lib/legal/metadata";

export const metadata: Metadata = legalMetadata("shipping-and-delivery");

export default function ShippingAndDeliveryPage() {
  return <LegalLayout doc={getLegalDoc("shipping-and-delivery")!} />;
}
