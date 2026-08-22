import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LAIE_PAGES } from "@/lib/product-pages";
import { SubPageLayout } from "@/components/platform/SubPageLayout";

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return LAIE_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = LAIE_PAGES.find((p) => p.slug === slug);
  if (!page) return { title: "Not found" };
  return { title: `${page.title} | ECODrIx`, description: page.description };
}

export default async function LaieSubPage({ params }: Props) {
  const { slug } = await params;
  const page = LAIE_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();
  return <SubPageLayout page={page} parentBrand="ERIX-LAIE" parentHref="/platform/erix-laie" />;
}
