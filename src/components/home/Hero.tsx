import { ArrowRight, BadgeIndianRupee, MessageCircle, Receipt } from "lucide-react";
import Link from "next/link";
import { ProductPreview } from "./ProductPreview";

/**
 * Homepage hero — server-rendered, no animation gate: the headline, the
 * waitlist action and the product preview are in the first HTML byte.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div
        aria-hidden="true"
        className="dot-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
      />
      <div className="wrapper relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div>
          <p className="pill">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[var(--hero-dot)]" />
            Early access is opening soon
          </p>
          <h1 className="mt-5 text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
            Every lead, every chat,{" "}
            <span className="grad-text">one workspace.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            ERIX brings your CRM, WhatsApp and email inbox, GST invoices and AI
            automation together. Built for Indian businesses that sell on
            WhatsApp.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/#contact" className="btn-primary">
              Join the waitlist
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link href="/platform" className="btn-ghost">
              See the platform
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MessageCircle aria-hidden="true" className="size-4 text-accent" />
              Official WhatsApp Business API
            </li>
            <li className="flex items-center gap-2">
              <Receipt aria-hidden="true" className="size-4 text-accent" />
              GST-ready invoices
            </li>
            <li className="flex items-center gap-2">
              <BadgeIndianRupee aria-hidden="true" className="size-4 text-accent" />
              Priced in rupees
            </li>
          </ul>
        </div>
        <ProductPreview />
      </div>
    </section>
  );
}
