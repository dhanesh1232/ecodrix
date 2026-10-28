/**
 * The ERIX status page's data: the API's live check (`GET /health`) and its
 * 90-day history (`GET /health/history`). Both are public JSON; the page lives
 * here, off the API, so it can still say "unreachable" when the API is down.
 */

import { API_URL } from "@/lib/track";

export type ComponentStatus = "operational" | "degraded" | "down";

export interface StatusDay {
  date: string;
  uptimePct: number | null;
  worst: ComponentStatus | null;
  samples: number;
}

export interface StatusComponent {
  id: string;
  name: string;
  description: string;
  group: string;
  status: ComponentStatus;
  uptimePct: number | null;
  latencyMs: { last: number | null; p50: number | null; p95: number | null } | null;
  days: StatusDay[];
}

export interface StatusIncident {
  component: string;
  status: ComponentStatus;
  startedAt: string;
  endedAt: string | null;
  durationMin: number;
}

export interface StatusHistory {
  generatedAt: string;
  windowDays: number;
  components: StatusComponent[];
  incidents: StatusIncident[];
}

export interface LiveHealth {
  status: "ok" | "degraded";
  version: string;
  /** Datastores the live check couldn't reach (`postgres`, `erix-store`). */
  degraded: string[];
  timestamp: string;
}

/** Live-check datastore → status component. */
export const DEPENDENCY_COMPONENT: Record<string, { id: string; name: string }> = {
  postgres: { id: "database", name: "Database" },
  "erix-store": { id: "jobs", name: "Background jobs" },
};

async function getJson<T>(path: string, init?: RequestInit, retry = true): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });
  } catch (err) {
    // A dropped connection ("fetch failed": reset, or a slow handshake abandoned
    // by Node's IPv4/IPv6 race) is retried once, like the API's own probes, so
    // one network blip doesn't read as "API not answering". Timeouts aren't.
    if (retry && err instanceof TypeError) return getJson(path, init, false);
    throw err;
  }
  if (!res.ok) throw new Error(`${path} answered ${res.status}`);
  const body = (await res.json()) as { data?: T };
  if (!body.data) throw new Error(`${path} sent no data`);
  return body.data;
}

/** Both feeds; each is null when it couldn't be read. Server and browser use the same calls. */
export async function readStatus(init?: RequestInit) {
  const [live, history] = await Promise.allSettled([
    getJson<LiveHealth>("/health", init),
    getJson<StatusHistory>("/health/history?days=90", init),
  ]);
  return {
    live: live.status === "fulfilled" ? live.value : null,
    history: history.status === "fulfilled" ? history.value : null,
    checkedAt: new Date().toISOString(),
  };
}

export type StatusSnapshot = Awaited<ReturnType<typeof readStatus>>;

const IST = "Asia/Kolkata";
const dayFmt = new Intl.DateTimeFormat("en-IN", { timeZone: IST, day: "numeric", month: "short", year: "numeric" });
const timeFmt = new Intl.DateTimeFormat("en-IN", { timeZone: IST, hour: "numeric", minute: "2-digit", hour12: true });

/** "28 Oct 2026" on the IST calendar. */
export const fmtDay = (d: Date) => dayFmt.format(d);
/** "10:30 am" IST. */
export const fmtTime = (d: Date) => timeFmt.format(d);
/** `2026-10-28` → "28 Oct 2026". */
export const fmtIsoDay = (iso: string) => fmtDay(new Date(`${iso}T12:00:00+05:30`));
export const fmtPct = (v: number | null) => (v == null ? null : `${Math.round(v * 100) / 100}%`);

/** "45 min", "2 h 5 min", "1 d 3 h". */
export function fmtDuration(min: number) {
  const m = Math.max(0, Math.round(min));
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} h${m % 60 ? ` ${m % 60} min` : ""}`;
  return `${Math.floor(h / 24)} d${h % 24 ? ` ${h % 24} h` : ""}`;
}
