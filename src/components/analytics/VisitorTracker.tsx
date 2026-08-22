"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_ERIX_SOCKET_URL || "https://api.ecodrix.com";

/**
 * Sends a lightweight pageview beacon to the ECODrIx server on every
 * navigation. The server records it for the admin live-visitor dashboard.
 *
 * - Uses navigator.sendBeacon (non-blocking, survives page unload)
 * - Generates a per-session visitor ID stored in sessionStorage
 * - Captures referrer, path, and UTM params (first hit only)
 * - Fail-open: any error is swallowed; tracking never breaks the page
 */
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

export function VisitorTracker() {
  const pathname = usePathname();
  const firstHit = useRef(true);

  useEffect(() => {
    try {
      const url = `${API_URL}/v1/api/platform/public/track`;
      const params = new URLSearchParams(window.location.search);
      const payload = JSON.stringify({
        visitorId: getVisitorId(),
        path: pathname,
        title: document.title,
        referrer: firstHit.current ? document.referrer || null : null,
        utm: firstHit.current
          ? {
            source: params.get("utm_source"),
            medium: params.get("utm_medium"),
            campaign: params.get("utm_campaign"),
          }
          : null,
        screen: firstHit.current
          ? { w: window.screen.width, h: window.screen.height }
          : null,
        ts: Date.now(),
      });

      firstHit.current = false;

      // sendBeacon is fire-and-forget and survives navigation
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon(url, blob);
      } else {
        // Fallback: keepalive fetch
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => { });
      }
    } catch {
      // fail-open — tracking must never break the page
    }
  }, [pathname]);

  return null;
}
