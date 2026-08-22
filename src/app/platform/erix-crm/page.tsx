import type { Metadata } from "next";
import { ProductHero } from "@/components/platform/ProductHero";
import { CrmSvg } from "@/components/platform/product-svgs";
import { getModuleBySlug } from "@/lib/platform-modules";
import { CRM_PAGES } from "@/lib/product-pages";

const m = getModuleBySlug("erix-crm")!;

export const metadata: Metadata = {
  title: `${m.name} (${m.brand}) | ECODrIx`,
  description: m.description,
};

export default function ErixCrmPage() {
  return (
    <ProductHero
      brand={m.brand}
      name={m.name}
      tagline={m.tagline}
      description={m.longDescription}
      features={m.features}
      apiBase={m.apiBase}
      svg={<CrmSvg />}
      links={CRM_PAGES.map((p) => ({ label: p.title, href: `/platform/erix-crm/${p.slug}` }))}
    />
  );
}
