import type { Metadata } from "next";
import { ProductHero } from "@/components/platform/ProductHero";
import { FlowSvg } from "@/components/platform/product-svgs";
import { getModuleBySlug } from "@/lib/platform-modules";
import { FLOW_PAGES } from "@/lib/product-pages";

const m = getModuleBySlug("erix-flow")!;

export const metadata: Metadata = {
  title: `${m.name} (${m.brand}) | ECODrIx`,
  description: m.description,
};

export default function ErixFlowPage() {
  return (
    <ProductHero
      brand={m.brand}
      name={m.name}
      tagline={m.tagline}
      description={m.longDescription}
      features={m.features}
      apiBase={m.apiBase}
      svg={<FlowSvg />}
      links={FLOW_PAGES.map((p) => ({ label: p.title, href: `/platform/erix-flow/${p.slug}` }))}
    />
  );
}
