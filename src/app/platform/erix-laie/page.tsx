import type { Metadata } from "next";
import { ProductHero } from "@/components/platform/ProductHero";
import { LaieSvg } from "@/components/platform/product-svgs";
import { getModuleBySlug } from "@/lib/platform-modules";
import { LAIE_PAGES } from "@/lib/product-pages";

const m = getModuleBySlug("erix-laie")!;

export const metadata: Metadata = {
  title: `${m.name} (${m.brand}) | ECODrIx`,
  description: m.description,
};

export default function ErixLaiePage() {
  return (
    <ProductHero
      brand={m.brand}
      name={m.name}
      tagline={m.tagline}
      description={m.longDescription}
      features={m.features}
      apiBase={m.apiBase}
      svg={<LaieSvg />}
      links={LAIE_PAGES.map((p) => ({ label: p.title, href: `/platform/erix-laie/${p.slug}` }))}
    />
  );
}
