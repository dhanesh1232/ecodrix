/**
 * Building blocks for coded product scenes (server components, no hooks).
 * A scene is wrapped in the client `<Scene>` driver (components/motion);
 * parts appear by step with `className="scene-in" style={at(n)}`.
 * Everything here is decorative: the Scene gives screen readers one label.
 */

import {
  BookOpen,
  CalendarCheck,
  Check,
  CheckCheck,
  Icon,
  Inbox,
  KanbanSquare,
  Receipt,
  Search,
  Sparkles,
  Workflow,
  type IconComponent,
} from "@/components/icons";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Show a part from step `n` (and hide it again from step `until`). */
export const at = (n: number, until?: number) =>
  ({ "--at": n, ...(until === undefined ? {} : { "--until": until }) }) as CSSProperties;

/** ✓ sent → ✓✓ delivered → ✓✓ read (blue, heavier), WhatsApp's meaning. */
export function Ticks({ from }: { from: number }) {
  return (
    <span className="stack text-subtle">
      <Check className="scene-in scene-pop size-3.5" style={at(from, from + 1)} />
      <CheckCheck className="scene-in scene-pop size-3.5" style={at(from + 1, from + 2)} />
      <CheckCheck className="scene-in scene-pop size-3.5 text-accent" strokeWidth={2.75} style={at(from + 2)} />
    </span>
  );
}

// No brand logos: our own glyph plus the channel's name.
const channels = {
  whatsapp: ["message-circle", "WhatsApp"],
  instagram: ["image", "Instagram"],
  email: ["mail", "Email"],
  web: ["globe", "Website chat"],
} as const;

/** Channel = icon plus the word (brand rule: no WhatsApp green). */
export function Channel({ name, className }: { name: keyof typeof channels; className?: string }) {
  const [glyph, label] = channels[name];
  return (
    <span className={cn("inline-flex items-center gap-1 text-[11px] text-muted-foreground", className)}>
      <Icon name={glyph} variant="line" size={12} />
      {label}
    </span>
  );
}

const tones = {
  primary: "bg-accent-muted text-accent",
  success: "bg-success-subtle text-success",
  warning: "bg-warning-subtle text-warning",
  error: "bg-error-subtle text-error",
  ai: "bg-ai-subtle text-ai",
  neutral: "bg-background text-muted-foreground border border-border",
} as const;

/** Status chip: always colour plus a word (and an icon when given). */
export function Pill({
  tone = "neutral",
  icon: Icon,
  className,
  style,
  children,
}: {
  tone?: keyof typeof tones;
  icon?: IconComponent;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <span
      style={style}
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-[6px] px-2 py-0.5 text-[11px] font-semibold",
        tones[tone],
        className,
      )}
    >
      {Icon && <Icon aria-hidden="true" className="size-3" />}
      {children}
    </span>
  );
}

/** A chat bubble: customer on the left, business (or its AI agent) on the right. */
export function Bubble({
  side = "in",
  ai,
  show,
  time,
  ticks,
  source,
  className,
  children,
}: {
  side?: "in" | "out";
  ai?: boolean;
  /** `at()` style for when it appears. */
  show?: CSSProperties;
  time?: string;
  /** First step of its ✓ → ✓✓ → read ticks. */
  ticks?: number;
  /** Knowledge the answer came from. */
  source?: string;
  className?: string;
  children: ReactNode;
}) {
  const out = side === "out";
  return (
    <div
      style={show}
      className={cn(
        "max-w-[85%] rounded-[10px] border px-3 py-2 text-[13px] leading-snug text-foreground",
        show && "scene-in",
        out ? "ml-auto border-accent-border bg-accent-muted" : "border-border bg-surface",
        className,
      )}
    >
      {ai && (
        <span className="mb-1 flex items-center gap-1 text-[11px] font-semibold text-ai">
          <Sparkles aria-hidden="true" className="size-3" /> AI agent
        </span>
      )}
      <p className="text-foreground">{children}</p>
      {(source || time) && (
        <span className="mt-1 flex items-center justify-end gap-1.5 text-[10px] text-subtle">
          {source && (
            <span className="mr-auto flex items-center gap-1">
              <BookOpen aria-hidden="true" className="size-3" /> From: {source}
            </span>
          )}
          {time}
          {ticks !== undefined && <Ticks from={ticks} />}
        </span>
      )}
    </div>
  );
}

/** "AI agent is typing" with bouncing dots. */
export function Typing({ show, className }: { show: CSSProperties; className?: string }) {
  return (
    <div
      style={show}
      className={cn(
        "scene-in ml-auto flex w-fit items-center gap-2 rounded-[10px] border border-accent-border bg-accent-muted px-3 py-2 text-[11px] font-semibold text-ai",
        className,
      )}
    >
      <Sparkles aria-hidden="true" className="size-3" /> AI agent is typing
      <span className="typing-dots text-ai">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

const navIcons = [Inbox, Sparkles, KanbanSquare, Receipt, Workflow, CalendarCheck];

/**
 * The ERIX app shell in miniature (light theme): the navy sidebar with the
 * current item marked, a top bar and the page. `nav` = index into
 * inbox, AI, pipeline, invoices, automations, bookings.
 */
export function AppFrame({
  title,
  nav,
  action,
  className,
  children,
}: {
  title: string;
  nav: number;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "app-frame surface-light flex overflow-hidden rounded-[12px] bg-background text-foreground shadow-[var(--shadow-lg)]",
        className,
      )}
    >
      <div className="hidden w-11 shrink-0 flex-col items-center gap-1.5 bg-[var(--blue-900)] py-3 sm:flex">
        <span className="mb-2 flex size-6 items-center justify-center rounded-[6px] bg-[var(--brand-blue)] font-display text-[11px] font-bold text-white">
          E
        </span>
        {navIcons.map((Icon, i) => (
          <span
            key={i}
            className={cn(
              "relative flex size-7 items-center justify-center rounded-[8px] text-[var(--blue-200)]",
              i === nav && "bg-[var(--blue-700)] text-white",
            )}
          >
            {i === nav && <span className="absolute -left-2 h-4 w-0.5 rounded-full bg-[var(--hero-dot)]" />}
            <Icon aria-hidden="true" className="size-3.5" />
          </span>
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-10 shrink-0 items-center justify-between gap-3 border-b border-border bg-surface px-3">
          <span className="truncate text-[13px] font-semibold text-foreground">{title}</span>
          {action ?? (
            <span className="hidden items-center gap-1.5 rounded-[6px] bg-sunken px-2 py-1 text-[11px] text-subtle md:flex">
              <Search aria-hidden="true" className="size-3" /> Search contacts, chats…
            </span>
          )}
        </div>
        <div className="relative min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

/** Initials avatar used in the mocks. */
export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-muted font-display text-[11px] font-bold text-accent",
        className,
      )}
    >
      {initials}
    </span>
  );
}
