// No "use client" — this is a Server Component.
// Each section is individually marked "use client" where needed,
// so Next.js SSRs the full HTML shell and hydrates sections independently.
// This ensures crawlers (bots, link-previewers, AWS Activate checker) see
// real content without executing JavaScript.

import { Hero } from "@/components/sections/Hero";
import { PoweredBy } from "@/components/sections/PoweredBy";
import { Services } from "@/components/sections/Services";
import { ProductSpotlight } from "@/components/sections/ProductSpotlight";
import { Numbers } from "@/components/sections/Numbers";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { Pricing } from "@/components/sections/Pricing";

export default function Home() {
  return (
    <main className="w-full">
      <div className="bg-background flex flex-col">
        <Hero />
        <Stats />
      </div>
      <PoweredBy />
      <Services />
      <ProductSpotlight />
      <Numbers />
      <Work />
      <Testimonials />
      <About />
      <Pricing />
      <Contact />
    </main>
  );
}
