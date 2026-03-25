"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { PoweredBy } from "@/components/sections/PoweredBy";
import { Services } from "@/components/sections/Services";
import { ProductSpotlight } from "@/components/sections/ProductSpotlight";
import { Numbers } from "@/components/sections/Numbers";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";
import { useLenis } from "@/hooks/useLenis";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  useLenis();

  return (
    <main className="bg-background text-text-primary overflow-clip">
      <Navbar />
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
      <Contact />
      <Footer />
    </main>
  );
}
