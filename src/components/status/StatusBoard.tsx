"use client";

import { useCallback, useEffect, useState } from "react";
import type { GlyphName } from "@/components/icons";
import { Icon } from "@/components/icons";
import {
  type ComponentStatus,
  DEPENDENCY_COMPONENT,
  fmtDay,
  fmtDuration,
  fmtIsoDay,
  fmtMs,
  fmtPct,
  fmtTime,
  type StatusComponent,
  type StatusDay,
  type StatusIncident,
  type StatusSnapshot,
} from "@/lib/status";
import { cn } from "@/lib/utils";

const POLL_MS = 30_000;
const RANK: Record<ComponentStatus, number> = { operational: 0, degraded: 1, down: 2 };
const STATUS: Record<ComponentStatus, { label: string; icon: GlyphName; badge: string; bar: string; alert: string }> = {
  operational: {
    label: "Operational",
    icon: "circle-check",
    badge: "bg-success-subtle text-success",
    bar: "bg-success",
    alert: "bg-success-subtle text-success",
  },
  degraded: {
    label: "Degraded",
    icon: "triangle-alert",
    badge: "bg-warning-subtle text-warning",
    bar: "bg-warning",
    alert: "bg-warning-subtle text-warning",
  },
  down: {
    label: "Down",
    icon: "circle-x",
    badge: "bg-error-subtle text-error",
    bar: "bg-error",
    alert: "bg-error-subtle text-error",
  },
};

function Badge({ status }: { status: ComponentStatus }) {
  const s = STATUS[status];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-sm px-2 py-0.5 text-[12.5px] font-semibold",
        s.badge,
      )}
    >
      <Icon name={s.icon} size={13} variant="solid" />
      {s.label}
    </span>
  );
}

const dayState = (d: StatusDay) => (d.samples > 0 && d.worst ? d.worst : null);
const dayLabel = (d: StatusDay) => {
  const s = dayState(d);
  return s
    ? `${fmtIsoDay(d.date)}: ${fmtPct(d.uptimePct) ?? "unknown"} uptime, ${STATUS[s].label.toLowerCase()}`
    : `${fmtIsoDay(d.date)}: no data`;
};

/** One bar per day (the last 30 on phones), hover for the day; the uptime line carries it for screen readers. */
function UptimeBars({ who, days, uptimePct }: { who: string; days: StatusDay[]; uptimePct: number | null }) {
  const withData = days.filter(dayState).length;
  const pct = fmtPct(uptimePct);
  const summary = pct
    ? `${pct} uptime${withData < days.length ? ` (${withData} ${withData === 1 ? "day" : "days"} of data)` : ""}`
    : "No data yet";
  return (
    <div className="mt-3">
      <ol aria-hidden="true" className="flex h-8 gap-[2px]">
        {days.map((d, i) => (
          <li
            key={d.date}
            title={dayLabel(d)}
            className={cn(
              "flex-1 rounded-[2px] transition-opacity hover:opacity-70",
              dayState(d) ? STATUS[dayState(d) as ComponentStatus].bar : "bg-sunken",
              i < days.length - 30 && "hidden sm:block",
            )}
          />
        ))}
      </ol>
      <p className="mt-1.5 flex justify-between gap-3 text-[12px] text-subtle">
        <span aria-hidden="true">
          <span className="hidden sm:inline">{days.length} days ago</span>
          <span className="sm:hidden">{Math.min(30, days.length)} days ago</span>
        </span>
        <span className="tabular-nums text-muted-foreground">
          <span className="sr-only">{who}: </span>
          {summary}
          <span className="sr-only"> over the last {days.length} days</span>
        </span>
        <span aria-hidden="true">Today</span>
      </p>
    </div>
  );
}

/** Worst state per day across a group's components, for its folded view. */
function combine(components: StatusComponent[]): { days: StatusDay[]; uptimePct: number | null } {
  const days = components[0]?.days.map((d, i) => {
    const same = components.map((c) => c.days[i]).filter(Boolean);
    const worst = same
      .map(dayState)
      .filter((s): s is ComponentStatus => !!s)
      .sort((a, b) => RANK[b] - RANK[a])[0];
    const ups = same.map((x) => x.uptimePct).filter((u): u is number => u != null);
    return {
      date: d.date,
      worst: worst ?? null,
      samples: same.reduce((n, x) => n + x.samples, 0),
      uptimePct: ups.length ? Math.min(...ups) : null,
    };
  });
  const ups = components.map((c) => c.uptimePct).filter((u): u is number => u != null);
  return { days: days ?? [], uptimePct: ups.length ? Math.min(...ups) : null };
}

function ComponentRow({ c }: { c: StatusComponent }) {
  const l = c.latencyMs;
  const ms = (v: number | null) => (v == null ? "–" : `${Math.round(v)} ms`);
  return (
    <li className="border-t border-border-soft px-5 py-4 first:border-t-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-[15px] font-semibold">{c.name}</h4>
          {c.description && <p className="mt-0.5 text-[13.5px] text-muted-foreground">{c.description}</p>}
        </div>
        <Badge status={c.status} />
      </div>
      <UptimeBars who={c.name} days={c.days} uptimePct={c.uptimePct} />
      {l && [l.last, l.p50, l.p95].some((v) => v != null) && (
        <p className="mt-2 text-[12.5px] text-subtle tabular-nums">
          Response time: last {ms(l.last)} · p50 {ms(l.p50)} · p95 {ms(l.p95)}
        </p>
      )}
      {!!c.performance?.length && (
        <p className="mt-1 text-[12.5px] text-subtle tabular-nums">
          Last 24 hours:{" "}
          {c.performance.map((p, i) => (
            <span key={p.label}>
              {i > 0 && " · "}
              <span className="whitespace-nowrap">
                {p.unit === "%" ? fmtPct(p.value) : fmtMs(p.value)} {p.label}
              </span>
            </span>
          ))}
        </p>
      )}
    </li>
  );
}

/** A module's components. Folded to one combined strip while all is well; open when something isn't. */
function Group({ name, components }: { name: string; components: StatusComponent[] }) {
  const worst = components.map((c) => c.status).sort((a, b) => RANK[b] - RANK[a])[0] ?? "operational";
  const [open, setOpen] = useState(worst !== "operational");
  // A group that turns unhealthy between polls opens by itself.
  const [seen, setSeen] = useState(worst);
  if (worst !== seen) {
    setSeen(worst);
    if (worst !== "operational") setOpen(true);
  }
  const folded = combine(components);
  const bodyId = `status-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <section className="rounded-[16px] bg-surface shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-3 px-3 py-2.5">
        <h3 className="min-w-0">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={bodyId}
            onClick={() => setOpen(!open)}
            className="flex min-h-10 items-center gap-2 rounded-[8px] px-2 text-left text-[16px] font-semibold transition-colors hover:bg-sunken focus-visible:outline-2 focus-visible:outline-accent"
          >
            <Icon
              name="chevron-right"
              size={16}
              variant="line"
              className={cn("shrink-0 text-subtle transition-transform", open && "rotate-90")}
            />
            {name}
            <span className="text-[13px] font-normal text-subtle">
              {components.length} {components.length === 1 ? "component" : "components"}
            </span>
          </button>
        </h3>
        <Badge status={worst} />
      </div>
      {open ? (
        <ul id={bodyId} className="border-t border-border-soft">
          {components.map((c) => (
            <ComponentRow key={c.id} c={c} />
          ))}
        </ul>
      ) : (
        <div id={bodyId} className="px-5 pb-4">
          <UptimeBars who={name} days={folded.days} uptimePct={folded.uptimePct} />
        </div>
      )}
    </section>
  );
}

function Incidents({ incidents, names }: { incidents: StatusIncident[]; names: Map<string, string> }) {
  if (!incidents.length) {
    return (
      <p className="flex items-center gap-2 rounded-[16px] bg-surface px-5 py-6 text-[15px] shadow-[var(--shadow-card)]">
        <Icon name="circle-check" size={20} variant="duo" className="text-success" />
        No incidents in the last 90 days.
      </p>
    );
  }
  const byDay = new Map<string, StatusIncident[]>();
  for (const inc of [...incidents].sort((a, b) => Date.parse(b.startedAt) - Date.parse(a.startedAt))) {
    const day = fmtDay(new Date(inc.startedAt));
    byDay.set(day, [...(byDay.get(day) ?? []), inc]);
  }
  return (
    <ol className="flex flex-col gap-4">
      {[...byDay].map(([day, list]) => (
        <li key={day} className="rounded-[16px] bg-surface shadow-[var(--shadow-card)]">
          <h3 className="border-b border-border-soft px-5 py-3 text-[14px] font-semibold">{day}</h3>
          <ul>
            {list.map((inc) => {
              const start = new Date(inc.startedAt);
              const end = inc.endedAt ? new Date(inc.endedAt) : null;
              const sameDay = end && fmtDay(end) === day;
              return (
                <li
                  key={`${inc.component}-${inc.startedAt}`}
                  className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-t border-border-soft px-5 py-3 first:border-t-0"
                >
                  <span className="flex items-center gap-2.5 text-[14.5px] font-medium">
                    {names.get(inc.component) ?? inc.component}
                    <Badge status={inc.status} />
                  </span>
                  <span className="text-[13px] text-muted-foreground tabular-nums">
                    {end
                      ? `${fmtTime(start)} – ${sameDay ? "" : `${fmtDay(end)}, `}${fmtTime(end)} IST · ${fmtDuration(inc.durationMin)}`
                      : `Since ${fmtTime(start)} IST · ongoing`}
                  </span>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ol>
  );
}

/** The headline: everything up, or what isn't. A live datastore failure counts as down. */
function overall(snap: StatusSnapshot): { status: ComponentStatus; title: string; text: string } {
  if (!snap.live) {
    return {
      status: "down",
      title: "We can't reach the ERIX API",
      text: "It didn't answer this check. We check again every 30 seconds.",
    };
  }
  const worst = new Map<string, { name: string; rank: number }>();
  const add = (id: string, name: string, s: ComponentStatus) =>
    worst.set(id, { name, rank: Math.max(worst.get(id)?.rank ?? 0, RANK[s]) });
  for (const c of snap.history?.components ?? []) add(c.id, c.name, c.status);
  for (const dep of snap.live.degraded) {
    const m = DEPENDENCY_COMPONENT[dep] ?? { id: dep, name: dep };
    add(m.id, m.name, "down");
  }
  const hurt = [...worst.values()].filter((w) => w.rank > 0).sort((a, b) => b.rank - a.rank);
  if (!hurt.length) {
    return { status: "operational", title: "All systems operational", text: "Every part of ERIX is working normally." };
  }
  const list =
    hurt
      .slice(0, 3)
      .map((w) => `${w.name} is ${w.rank === 2 ? "down" : "degraded"}.`)
      .join(" ") + (hurt.length > 3 ? ` And ${hurt.length - 3} more.` : "");
  if (hurt.length === worst.size && hurt.every((w) => w.rank === 2))
    return { status: "down", title: "ERIX is down", text: list };
  return {
    status: "degraded",
    title: "Some features are affected",
    text: `${list} Everything else is working normally.`,
  };
}

/**
 * The live board: polls both feeds every 30 seconds while the tab is visible,
 * and on "Check now". Starts from the server-rendered snapshot.
 */
export function StatusBoard({ initial }: { initial: StatusSnapshot }) {
  const [snap, setSnap] = useState(initial);
  const [checking, setChecking] = useState(false);

  const [noConnection, setNoConnection] = useState(false);
  // Poll this site, not the API: /status/feed asks the API on the server (see its route).
  const check = useCallback(async () => {
    setChecking(true);
    try {
      const res = await fetch("/status/feed", { cache: "no-store" });
      if (!res.ok) throw new Error(`status feed answered ${res.status}`);
      setSnap((await res.json()) as StatusSnapshot);
      setNoConnection(false);
    } catch {
      // The visitor's own connection (or this site) failed: keep the last check on screen.
      setNoConnection(true);
    }
    setChecking(false);
  }, []);

  useEffect(() => {
    void check();
    const t = setInterval(() => {
      if (document.visibilityState === "visible") void check();
    }, POLL_MS);
    return () => clearInterval(t);
  }, [check]);

  const head = overall(snap);
  const history = snap.history;
  // Live datastore failures override the history's (slower) view of the same component.
  const liveDown = new Set((snap.live?.degraded ?? []).map((d) => DEPENDENCY_COMPONENT[d]?.id ?? d));
  const components = (history?.components ?? []).map((c) =>
    liveDown.has(c.id) ? { ...c, status: "down" as const } : c,
  );
  const groups = [...new Set(components.map((c) => c.group))].map((g) => ({
    name: g,
    components: components.filter((c) => c.group === g),
  }));
  const names = new Map(components.map((c) => [c.id, c.name]));

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[13.5px] text-muted-foreground" aria-live="off">
          <span
            aria-hidden="true"
            className={cn(
              "size-2 rounded-full",
              noConnection ? "bg-warning" : snap.live ? "bg-success motion-safe:animate-pulse" : "bg-error",
            )}
          />
          {noConnection ? "No connection, showing the last check" : snap.live ? "Live" : "API not answering"} · Updated{" "}
          <time dateTime={snap.checkedAt} className="tabular-nums">
            {fmtTime(new Date(snap.checkedAt))} IST
          </time>
        </p>
        <button
          type="button"
          onClick={() => void check()}
          disabled={checking}
          className="inline-flex h-9 items-center gap-1.5 rounded-[8px] bg-surface px-3 text-[13.5px] font-semibold shadow-[var(--shadow-card)] transition-colors hover:bg-sunken focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
        >
          <Icon name="refresh-cw" size={15} variant="line" className={cn(checking && "motion-safe:animate-spin")} />
          {checking ? "Checking…" : "Check now"}
        </button>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={cn("mt-4 flex items-start gap-4 rounded-[16px] p-5 sm:p-6", STATUS[head.status].alert)}
      >
        <Icon name={STATUS[head.status].icon} size={28} variant="solid" className="mt-0.5 shrink-0" />
        <div>
          <p className="text-[clamp(19px,2.2vw,22px)] font-semibold tracking-[-0.01em] text-foreground">{head.title}</p>
          <p className="mt-1 text-[15px] text-muted-foreground">{head.text}</p>
        </div>
      </div>

      <section aria-labelledby="components-title" className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="components-title" className="font-display text-[clamp(22px,2.6vw,28px)] tracking-[-0.02em]">
              Components
            </h2>
            <p className="mt-1 text-[14px] text-muted-foreground">
              Each bar is one day. Uptime covers the last 90 days.
            </p>
          </div>
          <ul aria-label="Legend" className="flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-muted-foreground">
            {(["operational", "degraded", "down"] as const).map((s) => (
              <li key={s} className="flex items-center gap-1.5">
                <span aria-hidden="true" className={cn("size-2.5 rounded-[2px]", STATUS[s].bar)} />
                {STATUS[s].label}
              </li>
            ))}
            <li className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="size-2.5 rounded-[2px] bg-sunken ring-1 ring-border-soft ring-inset"
              />
              No data
            </li>
          </ul>
        </div>
        <div className="mt-5 flex flex-col gap-4">
          {history ? (
            groups.map((g) => <Group key={g.name} name={g.name} components={g.components} />)
          ) : (
            <p
              role="alert"
              className="rounded-[16px] bg-surface px-5 py-6 text-[15px] text-muted-foreground shadow-[var(--shadow-card)]"
            >
              The uptime history didn't load. It comes from the API, so it's back when the API answers.
            </p>
          )}
        </div>
      </section>

      <section aria-labelledby="incidents-title" className="mt-12">
        <h2 id="incidents-title" className="font-display text-[clamp(22px,2.6vw,28px)] tracking-[-0.02em]">
          Past incidents
        </h2>
        <p className="mt-1 mb-5 text-[14px] text-muted-foreground">Detected automatically from health checks.</p>
        {history && <Incidents incidents={history.incidents} names={names} />}
      </section>

      <div className="mt-12 flex flex-col gap-2 text-[13.5px] text-muted-foreground">
        <p className="flex flex-wrap items-center gap-1.5">
          <Icon name="mail" size={15} variant="line" />
          Want alerts?{" "}
          <a
            className="font-semibold text-accent hover:underline"
            href="mailto:contact@ecodrix.com?subject=Status%20alerts"
          >
            contact@ecodrix.com
          </a>
        </p>
        <p className="flex flex-wrap items-center gap-1.5">
          <Icon name="terminal" size={15} variant="line" />
          For monitoring tools:{" "}
          <code className="rounded-sm bg-sunken px-1.5 py-0.5 font-mono text-[12.5px]">
            curl -H "Accept: application/json" https://api.ecodrix.com/health
          </code>{" "}
          and{" "}
          <code className="rounded-sm bg-sunken px-1.5 py-0.5 font-mono text-[12.5px]">/health/history?days=90</code>
        </p>
      </div>
    </>
  );
}
