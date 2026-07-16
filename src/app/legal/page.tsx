import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import { LEGAL } from "@/lib/legal/config";
import { LEGAL_DOCS, legalHref } from "@/lib/legal/documents";

export const metadata: Metadata = {
  title: "Legal & Policies",
  description:
    "All ECODrIx legal documents in one place — Terms of Service, Privacy Policy, Cookie Policy, Acceptable Use, WhatsApp Messaging Policy, Refund, Pricing, SLA, DPA, Sub-processors, and Security.",
  alternates: { canonical: `${LEGAL.domain}/legal` },
  openGraph: {
    title: "Legal & Policies | ECODrIx",
    description:
      "Terms, Privacy, Cookies, Acceptable Use, WhatsApp Policy, Refund, Pricing, SLA, DPA, Sub-processors, and Security.",
    url: `${LEGAL.domain}/legal`,
    type: "website",
  },
};

export default function LegalIndexPage() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <section className="pt-40 pb-16 px-6 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-[700px] h-[400px] blur-[14px] bg-[conic-gradient(from_270deg_at_50%_0%,transparent_55deg,color-mix(in_srgb,var(--color-brand-purple)_20%,transparent)_85deg,color-mix(in_srgb,var(--color-accent)_7%,transparent)_115deg,transparent_155deg)]"
          aria-hidden
        />
        <div className="wrapper relative z-10">
          <div className="pill mb-6 bg-brand-purple/10 text-brand-purple border-brand-purple/20">
            <Scale size={12} />
            Legal & Policies
          </div>
          <h1 className="font-display font-black text-foreground mb-6 max-w-4xl text-[clamp(2.4rem,6.5vw,4.2rem)] tracking-[-0.04em] leading-[1.05]">
            Legal & compliance.
          </h1>
          <p className="max-w-3xl leading-relaxed text-[clamp(1rem,2vw,1.2rem)] text-muted-foreground">
            Everything governing your use of {LEGAL.brand} — the terms you agree
            to, how we handle data, and the policies that keep the platform safe
            and compliant. Operated by {LEGAL.entity}.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 sep-top bg-background">
        <div className="wrapper">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LEGAL_DOCS.map((doc) => (
              <Link
                key={doc.slug}
                href={legalHref(doc.slug)}
                className="group flex items-start justify-between gap-4 p-6 border border-foreground/8 hover:border-foreground/20 transition-colors bg-foreground/2 rounded-2xl"
              >
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest mb-2 text-brand-purple">
                    {doc.pill}
                  </div>
                  <h2 className="text-foreground font-bold text-lg mb-1.5">
                    {doc.title}
                  </h2>
                  <p className="text-subtle text-sm leading-relaxed">
                    {doc.description}
                  </p>
                </div>
                <ArrowRight
                  size={18}
                  className="shrink-0 mt-1 text-subtle group-hover:text-foreground group-hover:translate-x-1 transition-all"
                />
              </Link>
            ))}
          </div>

          <p className="text-subtle text-xs mt-10 max-w-3xl">
            For legal notices, contact {LEGAL.emails.legal}. Grievances may be
            addressed to our Grievance Officer at {LEGAL.emails.grievance}.
          </p>
        </div>
      </section>
    </div>
  );
}
