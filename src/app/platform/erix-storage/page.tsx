import type { Metadata } from "next";
import { ProductHero } from "@/components/platform/ProductHero";
import { StorageSvg } from "@/components/platform/product-svgs";
import { getModuleBySlug } from "@/lib/platform-modules";
import { STORAGE_PAGES } from "@/lib/product-pages";

const m = getModuleBySlug("erix-storage")!;

export const metadata: Metadata = {
  title: `${m.name} (${m.brand}) | ECODrIx`,
  description: m.description,
};

export default function ErixStoragePage() {
  return (
    <ProductHero
      brand={m.brand}
      name={m.name}
      tagline={m.tagline}
      description={m.longDescription}
      features={m.features}
      apiBase={m.apiBase}
      svg={<StorageSvg />}
      links={STORAGE_PAGES.map((p) => ({ label: p.title, href: `/platform/erix-storage/${p.slug}` }))}
    />
  );
}
