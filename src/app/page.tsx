// Server Component: every section renders to HTML, so crawlers and link
// previews see the real content without running JavaScript.

import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Platform } from "@/components/home/Platform";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { UseCases } from "@/components/home/UseCases";
import { Waitlist } from "@/components/home/Waitlist";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Stats />
      <Platform />
      <HowItWorks />
      <UseCases />
      <Testimonials />
      {/* Pricing stays off the homepage until launch — the waitlist leads. */}
      <Waitlist />
    </div>
  );
}
