import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type GlyphName } from "@/components/icons";
import { StoryRail, StoryVisual } from "@/components/motion/story-motion";
import { cn } from "@/lib/utils";

export type Chapter = {
  id: string;
  /** An id other pages link to (e.g. "agents" for /platform#agents). */
  anchor?: string;
  /** When it happens ("9:42 pm") or which step it is. */
  marker: string;
  markerIcon?: GlyphName;
  /** The ERIX part doing the work; purple when `ai`. */
  module: string;
  icon?: GlyphName;
  ai?: boolean;
  title: string;
  body: ReactNode;
  points?: string[];
  link?: { href: string; label: string };
  visual: ReactNode;
};

/**
 * A story told down a rail: each chapter is plain server HTML (copy on one
 * side, the redrawn product screen on the other) and works without JS. The
 * client parts only add the scroll-linked rail and visuals (StoryRail,
 * StoryVisual). Headings and copy never animate.
 */
export function Story({
  id,
  kicker,
  title,
  lead,
  chapters,
  outro,
  tone = "plain",
}: {
  id: string;
  kicker?: ReactNode;
  title: string;
  lead?: ReactNode;
  chapters: Chapter[];
  outro?: ReactNode;
  tone?: "plain" | "subtle";
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-tone={tone === "subtle" ? "subtle" : undefined}
      className={cn("py-section scroll-mt-20", tone === "subtle" && "bg-background")}
    >
      <div className="mx-auto w-full max-w-wrap px-gutter">
        <div className="mb-4">
          {kicker && <div className="mb-3">{kicker}</div>}
          <h2 id={`${id}-title`} className="max-w-[22ch] font-display text-mk-h2 text-foreground text-balance">
            {title}
          </h2>
          {lead && <p className="mt-4 max-w-[60ch] font-sans text-mk-lead text-muted-foreground text-pretty">{lead}</p>}
        </div>
        <StoryRail>
          <ol className="list-none">
            {chapters.map((c) => (
              <li
                key={c.id}
                id={c.anchor ?? `${id}-${c.id}`}
                data-chapter=""
                data-ai={c.ai || undefined}
                className="group/chapter relative grid scroll-mt-20 grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] items-center gap-[clamp(28px,5vw,72px)] py-[clamp(28px,4vw,48px)] not-first:border-t not-first:border-t-border-soft max-[900px]:grid-cols-[minmax(0,1fr)] max-[900px]:gap-6"
              >
                <div className="relative">
                  {/* The chapter's dot on the rail: blue, purple for AI steps, the logo's red
                      dot for the chapter being read (StoryRail sets data-seen / data-current). */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-[3px] -left-11 grid size-6 place-items-center rounded-[9999px] bg-surface shadow-[inset_0_0_0_2px_var(--border-mid)] [transition:box-shadow_var(--dur-base)_var(--ease-out),background-color_var(--dur-base)_var(--ease-out)] group-data-[current]/chapter:shadow-[inset_0_0_0_2px_var(--accent)] group-data-[seen]/chapter:shadow-[inset_0_0_0_2px_var(--accent)] group-data-[ai]/chapter:group-data-[seen]/chapter:shadow-[inset_0_0_0_2px_var(--ai)] after:size-2 after:rounded-[9999px] after:bg-border-strong after:content-[''] after:[transition:background-color_var(--dur-base)_var(--ease-out),scale_360ms_var(--ease-soft-spring)] group-data-[seen]/chapter:after:bg-accent group-[[data-current]:not([data-ai])]/chapter:after:bg-hero-dot group-data-[ai]/chapter:group-data-[seen]/chapter:after:bg-ai group-data-[current]/chapter:after:[scale:1.25] max-[900px]:-left-8 max-[900px]:size-4 max-[900px]:after:size-1.5"
                  />
                  <p className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-sans text-[13.5px]/[18px] font-[650] text-subtle">
                    {c.markerIcon && <Icon name={c.markerIcon} size={15} variant="line" />}
                    <span className="text-foreground tabular-nums">{c.marker}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-[5px] text-accent group-data-[ai]/chapter:text-ai">
                      <Icon name={c.icon ?? (c.ai ? "sparkles" : "square-kanban")} size={13} variant="solid" />
                      {c.module}
                    </span>
                  </p>
                  <h3 className="mt-3 font-display text-mk-h3 text-foreground text-balance">{c.title}</h3>
                  <p className="mt-3 max-w-[56ch] font-sans text-mk-body text-muted-foreground text-pretty">{c.body}</p>
                  {c.points && (
                    <ul className="mt-5 grid list-none gap-2.5 [&_.erix-icon]:mt-[3px] [&_.erix-icon]:text-accent">
                      {c.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 font-sans text-[15px]/[22px] font-medium text-foreground">
                          <Icon name="check" size={16} strokeWidth={2.2} variant="line" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                  {c.link && (
                    <Link
                      href={c.link.href}
                      className="group mt-5 inline-flex items-center gap-1.5 font-sans text-[15px]/5 font-[650] text-accent hover:underline hover:underline-offset-3 motion-safe:focus-visible:animate-focus"
                    >
                      {c.link.label}
                      <Icon name="arrow-right" size={14} variant="line" />
                    </Link>
                  )}
                </div>
                <StoryVisual>{c.visual}</StoryVisual>
              </li>
            ))}
          </ol>
        </StoryRail>
        {outro}
      </div>
    </section>
  );
}
