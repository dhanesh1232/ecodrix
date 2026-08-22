import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { SubPage } from "@/lib/product-pages";

interface SubPageLayoutProps {
  page: SubPage;
  parentBrand: string;
  parentHref: string;
}

export function SubPageLayout({ page, parentBrand, parentHref }: SubPageLayoutProps) {
  return (
    <div className="wrapper py-16">
      {/* Back nav */}
      <Link href={parentHref} className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-accent mb-8 transition-colors">
        <ArrowLeft size={12} /> Back to {parentBrand}
      </Link>

      {/* Type badge */}
      <div className="pill mb-4 capitalize">{page.type.replace("-", " ")}</div>

      {/* Title */}
      <h1 className="font-display text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-foreground tracking-tight leading-tight mb-3">
        {page.title}
      </h1>
      <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mb-12">{page.description}</p>

      {/* Sections */}
      <div className="flex flex-col divide-y divide-border border-y border-border mb-14">
        {page.sections.map((s) => (
          <div key={s.heading} className="py-8">
            <h2 className="font-display text-lg font-bold text-foreground mb-3">{s.heading}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">{s.body}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="border border-border p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-surface">
        <div>
          <p className="text-lg font-display font-bold text-foreground">Ready to get started?</p>
          <p className="mt-1 text-sm text-muted-foreground">14-day free trial. No credit card required.</p>
        </div>
        <Link href="/#contact" className="btn-primary shrink-0 inline-flex items-center gap-2">
          Join Waitlist <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
