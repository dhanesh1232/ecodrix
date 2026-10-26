import type { Metadata } from "next";
import { LEGAL } from "@/lib/legal/config";
import { getLegalDoc, legalHref } from "@/lib/legal/documents";

/**
 * Meta descriptions for documents whose own summary falls outside the
 * 120–160 character range search engines show. Metadata only: the document
 * wording in lib/legal/docs is unchanged.
 */
const SEO_DESCRIPTION: Record<string, string> = {
  "cookie-policy":
    "How ECODrIx uses cookies and similar technologies on its website and platform, what each kind does, and how to accept, reject or change your choices.",
};

/** Build consistent SEO metadata for a legal document page. */
export function legalMetadata(slug: string): Metadata {
  const doc = getLegalDoc(slug);
  if (!doc) return { title: "Legal" };
  const url = `${LEGAL.domain}${legalHref(slug)}`;
  const description = SEO_DESCRIPTION[slug] ?? doc.description;
  return {
    title: doc.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${doc.title} | ${LEGAL.brand}`,
      description,
      url,
      type: "website",
      // A page's own openGraph replaces the root one, so name the image too.
      images: ["/opengraph-image"],
    },
    robots: { index: true, follow: true },
  };
}
