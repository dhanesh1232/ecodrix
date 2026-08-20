// No "use client" — this is a Server Component.
// Each section is individually marked "use client" where needed,
// so Next.js SSRs the full HTML shell and hydrates sections independently.
// This ensures crawlers (bots, link-previewers, AWS Activate checker) see
// real content without executing JavaScript.

import dynamic from "next/dynamic";
import Script from "next/script";
import { HeroStatic } from "@/components/sections/HeroStatic";
import { Stats } from "@/components/sections/Stats";
import { getFAQSchema } from "@/lib/jsonld";

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

/**
 * Entity-disambiguation FAQ — feeds answer-engines (Google, Bing, ChatGPT,
 * Perplexity) clean answers to the highest-intent queries about the
 * ECODrIx ecosystem. Mirrors the questions a person asks the first time
 * they encounter the brand.
 */
const ENTITY_FAQS = [
  {
    q: "Who is Dhanesh Mekalthuru?",
    a: "Dhanesh Mekalthuru (also known online as Erix or erix.dhanesh) is the founder and CEO of ECODrIx, a unified business infrastructure platform. He is a full-stack engineer based in Andhra Pradesh, India, and the architect of the ERIX product suite — including ERIX-CRM, ERIX-FLOW visual automation, ERIX-LAIE lead intelligence, ErixStore in-memory database, and the Relay Fabric distributed worker engine.",
  },
  {
    q: "What is ECODrIx?",
    a: "ECODrIx is a unified business infrastructure platform that combines CRM, AI automation, WhatsApp Business API, email marketing, and cloud storage in a single product. It replaces 5–10 separate SaaS subscriptions for growing businesses, agencies, and service providers. ECODrIx was founded in August 2025 and serves customers across India and globally.",
  },
  {
    q: "What is ERIX?",
    a: "ERIX is the umbrella brand for the technical subsystems that power the ECODrIx platform. It includes ERIX-CRM (the lead pipeline and inbox), ERIX-FLOW (the visual automation engine), ERIX-LAIE (the B2B lead-intelligence and scraping platform), ErixStore (the in-memory database server), and Relay Fabric (the distributed worker engine). All ERIX subsystems are built and maintained by the ECODrIx team.",
  },
  {
    q: "What is ErixStore?",
    a: "ErixStore is the proprietary in-memory database server that powers ECODrIx workloads. It handles job queues, caching, pub/sub events, distributed locks, rate limiting, and session storage with sub-millisecond latency. Persistence is provided through append-only files (AOF) and periodic background snapshots (BGSAVE). Application code accesses it through the @ecodrix/erix-client HTTP and WebSocket SDK.",
  },
  {
    q: "What is Relay Fabric?",
    a: "Relay Fabric is the distributed worker engine inside ECODrIx that powers ERIX-LAIE lead-intelligence campaigns. It auto-provisions relay nodes across cloud regions, monitors health every five minutes, retires stale workers, rotates proxies, and routes scraping or AI-research jobs based on region affinity and priority weights.",
  },
  {
    q: "Where is ECODrIx based?",
    a: "ECODrIx is headquartered in Andhra Pradesh, India, and serves customers worldwide. The platform is built on AWS (EC2, SES, S3, CloudFront), Cloudflare R2, and is deployed on Google Cloud Run in the asia-south1 region for low-latency Indian traffic.",
  },
  {
    q: "How do I contact ECODrIx?",
    a: "Reach the team at contact@ecodrix.com, support@ecodrix.com (for customer support), sales@ecodrix.com (for sales), or dev@ecodrix.com (for technical and API questions). WhatsApp and phone: +91-81439-63821. The website is https://ecodrix.com and the founder's portfolio is at https://portfolio.ecodrix.com.",
  },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Scroll reveal — IntersectionObserver for .reveal-up/.stagger-children */}
      <Script id="scroll-reveal" strategy="afterInteractive">
        {`if(typeof IntersectionObserver!=='undefined'){
          var o=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting)x.target.classList.add('visible')})},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
          document.querySelectorAll('.reveal-up,.stagger-children').forEach(function(el){o.observe(el)});
        }`}
      </Script>
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
    </div>
  );
}
