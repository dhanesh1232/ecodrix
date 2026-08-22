import type { Metadata } from "next";
import { ProductHero } from "@/components/platform/ProductHero";
import { StoreSvg } from "@/components/platform/product-svgs";
import { getModuleBySlug } from "@/lib/platform-modules";
import { STORE_PAGES } from "@/lib/product-pages";

const m = getModuleBySlug("erix-store")!;

export const metadata: Metadata = {
  title: `${m.name} (${m.brand}) | ECODrIx`,
  description: m.description,
};

export default function ErixStorePage() {
  return (
    <ProductHero
      brand={m.brand}
      name={m.name}
      tagline={m.tagline}
      description={m.longDescription}
      features={m.features}
      apiBase={m.apiBase}
      svg={<StoreSvg />}
      links={STORE_PAGES.map((p) => ({ label: p.title, href: `/platform/erix-store/${p.slug}` }))}
    />
  );
}
