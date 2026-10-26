/**
 * The ERIX marketing kit (DS `components/src/marketing/marketing.jsx`),
 * ported as server components on the site's tokens. CSS: `erix-mk-*` in
 * globals.css. Interactive parts live in seg-tabs.tsx (client).
 *
 *   <MkHero>        navy band, swoosh + red dot, BlurText h1, product visual
 *   <MkSection>     tone plain | subtle | navy, h2 + lead, content
 *   <BrowserFrame>  <PhoneFrame>   real product UI, never a screenshot
 *   <PainGrid> <FeatureSplit> <Steps> <Faq> <CtaBand>
 *   <TrustBar>      "Works with" integrations, as a marquee
 *   <PrimaryCta> <WhatsAppCta>     the two calls to action
 *
 * Sections carry `erix-reveal` (design system v13): MotionRoot lets the ones
 * below the fold rise in once as they scroll into view.
 */

import Link from "next/link";
import type { ReactNode } from "react";
import { BrandIcon, type BrandName, Icon, type GlyphName } from "@/components/icons";
import { BlurText } from "@/components/motion/blur-text";
import { Spotlight } from "@/components/motion/spotlight";
import { Marquee } from "@/components/motion/surface";
import { PRIMARY_CTA, WHATSAPP_CTA } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ── Calls to action ─────────────────────────────────────────────────── */

export function PrimaryCta({ lg, className }: { lg?: boolean; className?: string }) {
  return (
    <Link href={PRIMARY_CTA.href} className={cn("btn-primary group", lg && "btn-lg", className)}>
      {PRIMARY_CTA.label}
      <Icon name="arrow-right" variant="line" size={16} />
    </Link>
  );
}

export function WhatsAppCta({ lg, className }: { lg?: boolean; className?: string }) {
  return (
    <a
      href={WHATSAPP_CTA.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("btn-ghost", lg && "btn-lg", className)}
    >
      {/* Mono mark: the palette is brand-only, so no green on a button. */}
      <BrandIcon name="whatsapp" size={16} variant="mono" label={null} />
      {WHATSAPP_CTA.label}
    </a>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────── */

/** The navy band's one brand flourish: the logo's swoosh and red dot. */
function HeroMotif() {
  return (
    <svg className="erix-mk-hero__motif" viewBox="0 0 1200 520" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
      <path className="erix-mk-hero__swoosh" d="M180 760 C 520 300 900 220 1320 250" />
      <circle className="erix-mk-hero__dot" cx="1010" cy="438" r="26" />
    </svg>
  );
}

/**
 * Hero: the promise (BlurText h1, sharpens in), the lead and CTAs fading in
 * after it, a few facts, and the product as the image. Text paints from the
 * HTML with no JS.
 */
export function MkHero({
  top,
  title,
  lead,
  actions,
  facts = [],
  visual,
  className,
}: {
  /** Above the h1: breadcrumbs, a status line. */
  top?: ReactNode;
  title: string;
  lead: ReactNode;
  actions?: ReactNode;
  facts?: { icon: GlyphName; label: string }[];
  visual?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("erix-mk-hero band-navy", className)}>
      <HeroMotif />
      <div className="wrapper erix-mk-hero__grid">
        <div className="erix-mk-hero__copy">
          {top}
          <BlurText as="h1" text={title} className="erix-mk-hero__title" />
          <p className="erix-mk-hero__lead fade-in">{lead}</p>
          {actions && (
            <div className="erix-mk-hero__ctas fade-in" style={{ "--d": "520ms" } as React.CSSProperties}>
              {actions}
            </div>
          )}
          {facts.length > 0 && (
            <ul className="erix-mk-hero__facts fade-in" style={{ "--d": "620ms" } as React.CSSProperties}>
              {facts.map((f) => (
                <li key={f.label}>
                  <Icon name={f.icon} variant="line" size={16} />
                  {f.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        {visual && <div className="erix-mk-hero__visual hero-in">{visual}</div>}
      </div>
    </section>
  );
}

/* ── Frames ──────────────────────────────────────────────────────────── */

export function BrowserFrame({
  url = "console.ecodrix.com",
  light,
  className,
  children,
}: {
  url?: string;
  /** On a light section: fully rounded with a soft shadow. */
  light?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("erix-mk-browser surface-light", light && "erix-mk-browser--light", className)}>
      <div className="erix-mk-browser__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="erix-mk-browser__url">
          <Icon name="lock" variant="line" size={11} />
          {url}
        </span>
      </div>
      <div className="erix-mk-browser__body">{children}</div>
    </div>
  );
}

export function PhoneFrame({ head, className, children }: { head?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <div className={cn("erix-mk-phone surface-light", className)}>
      <div className="erix-mk-phone__notch" aria-hidden="true" />
      {head && <div className="erix-mk-phone__head">{head}</div>}
      <div className="erix-mk-phone__body">{children}</div>
    </div>
  );
}

/* ── Sections ────────────────────────────────────────────────────────── */

export function MkSection({
  id,
  tone = "plain",
  kicker,
  title,
  lead,
  center,
  className,
  children,
}: {
  id?: string;
  tone?: "plain" | "subtle" | "navy";
  kicker?: ReactNode;
  title?: ReactNode;
  lead?: ReactNode;
  center?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn(
        "erix-mk-section scroll-mt-20",
        tone === "subtle" && "erix-mk-section--subtle",
        tone === "navy" && "band-navy",
        className,
      )}
    >
      <div className="wrapper erix-reveal">
        {(title || lead) && (
          <div className={cn("erix-mk-section__head", center && "text-center [&_.erix-mk-lead]:mx-auto")}>
            {kicker && <div className="mb-3">{kicker}</div>}
            {title && (
              <h2 id={headingId} className="erix-mk-h2">
                {title}
              </h2>
            )}
            {lead && <p className="erix-mk-lead">{lead}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/** Where leads go missing today. */
export function PainGrid({ items }: { items: { icon: GlyphName; title: string; text: string }[] }) {
  return (
    <ul className="erix-mk-pain">
      {items.map((it) => (
        <Spotlight as="li" key={it.title} className="erix-anim-host">
          <span className="erix-mk-pain__icon">
            <Icon name={it.icon} size={20} variant="duo" />
          </span>
          <h3>{it.title}</h3>
          <p>{it.text}</p>
        </Spotlight>
      ))}
    </ul>
  );
}

/** One feature: copy on one side, real product UI on the other. */
export function FeatureSplit({
  module,
  icon = "sparkles",
  ai,
  title,
  children,
  points = [],
  link,
  visual,
  flip,
  headingLevel = "h3",
}: {
  module?: string;
  icon?: GlyphName;
  ai?: boolean;
  title: string;
  children?: ReactNode;
  points?: string[];
  link?: { href: string; label: string };
  visual: ReactNode;
  flip?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  return (
    <div className={cn("erix-mk-split", flip && "erix-mk-split--flip")}>
      <div className="erix-mk-split__copy">
        {module && (
          <span className={cn("erix-mk-split__module", ai && "erix-mk-split__module--ai")}>
            <Icon name={icon} size={14} variant="solid" />
            {module}
          </span>
        )}
        <H className="erix-mk-h3">{title}</H>
        {children && <p className="erix-mk-body">{children}</p>}
        {points.length > 0 && (
          <ul className="erix-mk-ticks">
            {points.map((p) => (
              <li key={p}>
                <Icon name="check" size={16} strokeWidth={2.2} variant="line" />
                {p}
              </li>
            ))}
          </ul>
        )}
        {link && (
          <Link href={link.href} className="erix-mk-link group mt-6">
            {link.label}
            <Icon name="arrow-right" size={14} variant="line" />
          </Link>
        )}
      </div>
      <div className="erix-mk-split__visual">{visual}</div>
    </div>
  );
}

/** A real sequence, so the numbers are earned. */
export function Steps({ items }: { items: { title: string; text: string; time?: string }[] }) {
  return (
    <ol className="erix-mk-steps">
      {items.map((s, i) => (
        <li key={s.title}>
          <span className="erix-mk-steps__n">{i + 1}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          {s.time && (
            <span className="erix-mk-steps__time">
              <Icon name="clock" size={13} variant="line" />
              {s.time}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/** FAQ on native <details>: keyboard and find-in-page work for free. */
export function Faq({ items, className }: { items: { q: string; a: string }[]; className?: string }) {
  return (
    <div className={cn("erix-mk-faq", className)}>
      {items.map((q, i) => (
        <details key={q.q} className="erix-mk-faq__item" open={i === 0 ? true : undefined}>
          <summary>
            <span>{q.q}</span>
            <Icon name="plus" size={18} variant="line" />
          </summary>
          <div className="erix-mk-faq__a">{q.a}</div>
        </details>
      ))}
    </div>
  );
}

/** Closing navy band: one action plus WhatsApp, or a form beside the copy. */
export function CtaBand({
  id,
  title,
  lead,
  actions,
  aside,
}: {
  id?: string;
  title: string;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className="erix-mk-cta band-navy scroll-mt-20">
      <svg className="erix-mk-cta__motif" viewBox="0 0 600 300" aria-hidden="true">
        <path d="M-40 360 C 160 120 380 70 640 90" />
        <circle cx="566" cy="94" r="12" />
      </svg>
      <div className={cn("wrapper erix-reveal relative grid items-center gap-10", aside && "lg:grid-cols-[1fr_1.05fr] lg:gap-16")}>
        <div>
          <h2 id={id ? `${id}-title` : undefined} className="erix-mk-cta__title">
            {title}
          </h2>
          {lead && <div className="erix-mk-cta__lead">{lead}</div>}
          {actions && <div className="erix-mk-hero__ctas">{actions}</div>}
        </div>
        {aside}
      </div>
    </section>
  );
}

/**
 * "Works with": integrations as an endless row (design system v13 TrustBar
 * with marquee). Third-party marks via BrandIcon, our own channels as
 * glyphs. Only integrations that are live today; one per page at most.
 */
export function TrustBar({
  label = "Works with",
  items,
}: {
  label?: string;
  items: { label: string; brand?: BrandName; icon?: GlyphName }[];
}) {
  // Short lists repeat once inside the set so the row is wider than the
  // screen; the repeat is hidden from assistive tech and under reduced motion.
  const row = (dup: boolean) =>
    items.map((it) => (
      <li key={`${dup ? "d" : ""}${it.label}`} className={dup ? "erix-marquee__dup" : undefined} aria-hidden={dup || undefined}>
        {it.brand ? (
          <BrandIcon name={it.brand} size={18} label={null} />
        ) : (
          <Icon name={it.icon ?? "plug"} size={18} variant="duo" animate="none" className="text-accent" />
        )}
        {it.label}
      </li>
    ));
  return (
    <div className="erix-mk-trust">
      <span className="erix-mk-trust__label">{label}</span>
      <Marquee duration={36} label={label}>
        <ul>
          {row(false)}
          {row(true)}
        </ul>
      </Marquee>
    </div>
  );
}
