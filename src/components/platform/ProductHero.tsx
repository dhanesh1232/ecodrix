import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProductHeroProps {
  brand: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  apiBase?: string;
  /** SVG content to render on the right side */
  svg: React.ReactNode;
  /** Sub-pages for this product */
  links?: { label: string; href: string }[];
}

export function ProductHero({ brand, name, tagline, description, features, apiBase, svg, links }: ProductHeroProps) {
  return (
    <section className="wrapper py-16 lg:py-20">
      {/* Hero: left text + right SVG */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
        {/* Left */}
        <div>
          <div className="pill mb-4">{brand}</div>
          <h1 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold text-foreground tracking-tight leading-tight mb-3">
            {name}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">{tagline}</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-lg">{description}</p>
          {apiBase && (
            <p className="text-[11px] text-muted-foreground mb-6">
              API: <code className="text-accent">{apiBase}</code>
            </p>
          )}
          <Link href="/#contact" className="btn-primary inline-flex items-center gap-2">
            Join Waitlist <ArrowRight size={14} />
          </Link>
        </div>

        {/* Right: SVG animation */}
        <div className="hidden lg:flex items-center justify-center h-[360px] border border-border bg-surface overflow-hidden relative">
          {svg}
        </div>
      </div>

      {/* Sub-page navigation */}
      {links && links.length > 0 && (
        <div className="border-t border-border pt-6 mb-12">
          <div className="flex flex-wrap gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1.5"
              >
                {l.label}
                <ArrowRight size={11} />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Features grid */}
      <div>
        <div className="section-tag mb-6">Capabilities</div>
        <h2 className="font-display text-xl font-bold text-foreground mb-8">
          What ships in {brand}.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
          {features.map((f) => (
            <div key={f} className="p-5 bg-background flex items-start gap-3">
              <span className="text-accent mt-0.5 shrink-0">—</span>
              <span className="text-sm text-muted-foreground">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
