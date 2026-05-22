// No "use client" — this is a Server Component.
// Each section is individually marked "use client" where needed,
// so Next.js SSRs the full HTML shell and hydrates sections independently.
// This ensures crawlers (bots, link-previewers, AWS Activate checker) see
// real content without executing JavaScript.

import dynamic from "next/dynamic";
import { HeroStatic } from "@/components/sections/HeroStatic";
import { Stats } from "@/components/sections/Stats";

// Dynamically load below-the-fold sections to reduce initial JS bundle
const PoweredBy = dynamic(() =>
  import("@/components/sections/PoweredBy").then((mod) => mod.PoweredBy),
);
const Services = dynamic(() =>
  import("@/components/sections/Services").then((mod) => mod.Services),
);
const ProductSpotlight = dynamic(() =>
  import("@/components/sections/ProductSpotlight").then(
    (mod) => mod.ProductSpotlight,
  ),
);
const LaieShowcase = dynamic(
  () => import("@/components/sections/LaieShowcase"),
);
const Numbers = dynamic(() =>
  import("@/components/sections/Numbers").then((mod) => mod.Numbers),
);
const Work = dynamic(() =>
  import("@/components/sections/Work").then((mod) => mod.Work),
);
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((mod) => mod.Testimonials),
);
const About = dynamic(() =>
  import("@/components/sections/About").then((mod) => mod.About),
);
const Pricing = dynamic(() =>
  import("@/components/sections/Pricing").then((mod) => mod.Pricing),
);
const Contact = dynamic(() =>
  import("@/components/sections/Contact").then((mod) => mod.Contact),
);

export default function Home() {
  return (
    <main className="w-full">
      <div className="bg-background flex flex-col">
        {/* Render static hero immediately for fast FCP/LCP */}
        <HeroStatic />
        <Stats />
      </div>
      <PoweredBy />
      <Services />
      <ProductSpotlight />
      <LaieShowcase />
      <Numbers />
      <Work />
      <Testimonials />
      <About />
      {/* Pricing hidden pre-launch — waitlist replaces it */}
      {/* <Pricing /> */}
      <Contact />
    </main>
  );
}
