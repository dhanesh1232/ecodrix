import Link from "next/link";
import { ArrowLeft, ArrowRight, Scale } from "lucide-react";
import type { LegalBlock, LegalDoc } from "@/lib/legal/config";

/* ──────────────────────────────────────────────────────────────────────
   LegalLayout — server component that renders any structured legal document
   (privacy, terms, refund, DPA, etc.) with a sticky table of contents,
   polygon-card sections, and consistent ECODrIx styling.
─────────────────────────────────────────────────────────────────────── */

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") {
    return (
      <p className="text-muted-foreground leading-relaxed text-base">{block}</p>
    );
  }
  if ("p" in block) {
    return (
      <p className="text-muted-foreground leading-relaxed text-base">
        {block.p}
      </p>
    );
  }
  if ("subheading" in block) {
    return (
      <h3 className="text-foreground font-bold text-lg mt-2">
        {block.subheading}
      </h3>
    );
  }
  if ("note" in block) {
    return (
      <div className="p-4 text-muted-foreground text-sm leading-relaxed bg-accent/6 border border-accent/25 rounded-lg">
        {block.note}
      </div>
    );
  }
  if ("list" in block) {
    return (
      <ul className="space-y-3">
        {block.list.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-muted-foreground text-base"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-brand-purple mt-2 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if ("ol" in block) {
    return (
      <ol className="space-y-3 list-decimal pl-5">
        {block.ol.map((item, i) => (
          <li
            key={i}
            className="text-muted-foreground text-base leading-relaxed pl-1"
          >
            {item}
          </li>
        ))}
      </ol>
    );
  }
  if ("table" in block) {
    return (
      <div className="overflow-x-auto border border-foreground/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-foreground/3">
              {block.table.headers.map((h) => (
                <th
                  key={h}
                  className="text-left p-3 text-foreground font-bold text-xs uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map((row, ri) => (
              <tr key={ri} className="border-t border-foreground/5">
                {row.map((cell, ci) => (
                  <td key={ci} className="p-3 text-muted-foreground align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
}

export function LegalLayout({ doc }: { doc: LegalDoc }) {
  const updated =
    doc.effectiveDate ??
    new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="w-full min-h-screen relative">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[80px] bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-accent)_30%,transparent)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[70px] bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-brand-purple)_25%,transparent)_0%,transparent_70%)]" />
      </div>

      <div className="relative wrapper">
        <div className="pt-32 pb-24 lg:pt-40 lg:pb-32">
          <Link
            href="/legal"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            All legal documents
          </Link>

          <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-16">
            {/* Sticky ToC */}
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <div className="polygon-card p-6">
                <h2 className="font-mono text-[10px] font-bold text-foreground mb-4 uppercase tracking-widest">
                  Contents
                </h2>
                <nav className="space-y-2">
                  {doc.sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="flex items-center gap-3 text-[13px] text-muted-foreground hover:text-foreground transition-colors py-2 px-3 rounded-lg hover:bg-foreground/3 group"
                      >
                        <Icon
                          size={14}
                          className="text-brand-purple/60 group-hover:text-brand-purple transition-colors shrink-0"
                        />
                        <span>{section.title}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Main */}
            <div>
              <div className="mb-12">
                <div className="pill bg-brand-purple/10 text-brand-purple border-brand-purple/20">
                  <Scale size={12} />
                  {doc.pill}
                </div>
                <h1 className="text-4xl lg:text-6xl font-display font-black text-foreground tracking-tight mb-4">
                  {doc.title}
                </h1>
                <p className="text-muted-foreground text-base">
                  Last updated:{" "}
                  <span className="text-foreground font-medium">{updated}</span>
                </p>
                {doc.intro && (
                  <p className="text-muted-foreground leading-relaxed text-base mt-6 max-w-3xl">
                    {doc.intro}
                  </p>
                )}
              </div>

              <div className="sep-top mb-12" />

              <div className="space-y-8">
                {doc.sections.map((section, idx) => {
                  const Icon = section.icon;
                  return (
                    <section
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-32"
                    >
                      <div className="polygon-card noise p-8 lg:p-10 hover:border-brand-purple/30 transition-all duration-300">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="polygon-icon w-12 h-12 flex items-center justify-center bg-brand-purple/10 shrink-0">
                            <Icon size={20} className="text-brand-purple" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-2xl lg:text-3xl font-display font-black text-foreground mb-2 tracking-tight">
                              {idx + 1}. {section.title}
                            </h2>
                            <div className="h-0.5 w-12 rounded-full mt-3 bg-[linear-gradient(135deg,var(--color-brand-purple)_0%,var(--color-accent)_50%,var(--color-brand-purple)_100%)]" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          {section.body.map((block, i) => (
                            <Block key={i} block={block} />
                          ))}
                        </div>
                      </div>
                    </section>
                  );
                })}
              </div>

              {/* Footer CTA */}
              <div className="mt-16 polygon-card noise p-8 bg-linear-to-br from-brand-purple/5 to-accent/5">
                <h3 className="text-xl font-display font-black text-foreground mb-2">
                  Questions about this document?
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Reach our team and we'll help clarify anything you need.
                </p>
                <Link
                  href="/#contact"
                  className="btn-primary inline-flex items-center gap-2 bg-[linear-gradient(135deg,var(--color-brand-purple),var(--color-accent))]"
                >
                  Contact Us
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
