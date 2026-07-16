import type { Metadata } from "next";
import { LEGAL } from "@/lib/legal/config";
import { getLegalDoc } from "@/lib/legal/documents";

/** Build consistent SEO metadata for a legal document page. */
export function legalMetadata(slug: string): Metadata {
  const doc = getLegalDoc(slug);
  if (!doc) return { title: "Legal" };
  const url = `${LEGAL.domain}/${slug}`;
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${doc.title} | ${LEGAL.brand}`,
      description: doc.description,
      url,
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}
