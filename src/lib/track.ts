/**
 * First-party event tracking — sends action beacons to the ECODrIx server.
 * Complements pageview tracking (VisitorTracker) with explicit user actions:
 * CTA clicks, form submits, outbound links, scroll depth, etc.
 *
 * Fail-open, non-blocking (sendBeacon). Safe to call anywhere client-side.
 */

const API_URL =
  process.env.NEXT_PUBLIC_ERIX_SOCKET_URL || "https://api.ecodrix.com";

function getVisitorId(): string {
  try {
    let id = sessionStorage.getItem("ecdx_vid");
    if (!id) {
      id = `v_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem("ecdx_vid", id);
    }
    return id;
  } catch {
    return "v_anon";
  }
}

export type EventType = "click" | "form_submit" | "scroll" | "outbound" | "cta" | "custom";

/**
 * Track a custom action event.
 * @param eventName  e.g. "join_waitlist_click", "pricing_view_all"
 * @param eventType  category — defaults to "click"
 * @param data       arbitrary structured payload
 */
export function trackEvent(
  eventName: string,
  eventType: EventType = "click",
  data?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  try {
    const payload = JSON.stringify({
      visitorId: getVisitorId(),
      eventType,
      eventName,
      eventData: data ?? null,
      path: window.location.pathname,
      title: document.title,
      ts: Date.now(),
    });

    const url = `${API_URL}/v1/api/platform/public/track`;
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([payload], { type: "application/json" }));
    } else {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }

    // Mirror to GA4 if present
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, { event_category: eventType, ...data });
    }
  } catch {
    // fail-open
  }
}
