import type { Metadata } from "next";
import { ProductHero } from "@/components/platform/ProductHero";
import { ConnectSvg } from "@/components/platform/product-svgs";
import { getModuleBySlug } from "@/lib/platform-modules";
import { CONNECT_PAGES } from "@/lib/product-pages";

const m = getModuleBySlug("erix-connect")!;

export const metadata: Metadata = {
  title: `${m.name} (${m.brand}) | ECODrIx`,
  description: m.description,
};

export default function ErixConnectPage() {
  return (
    <ProductHero
      brand={m.brand}
      name={m.name}
      tagline={m.tagline}
      description={m.longDescription}
      features={m.features}
      apiBase={m.apiBase}
      svg={<ConnectSvg />}
      links={CONNECT_PAGES.map((p) => ({ label: p.title, href: `/platform/erix-connect/${p.slug}` }))}
    />
  );
}
