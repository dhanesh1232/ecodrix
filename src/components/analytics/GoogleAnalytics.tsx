"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { analyticsConsented, CONSENT_CHANGED_EVENT } from "@/lib/legal/consent";

/**
 * Fires a GA4 page_view event on every client-side navigation.
 *
 * This solves the SPA double-counting problem: the gtag script in layout.tsx
 * sets `send_page_view: false` on the initial config call. This component then
 * takes over responsibility for firing page_view on every route change.
 *
 * Only with analytics consent (gtag.js itself loads only then, GA_LOADER_SCRIPT): no page view
 * is queued before the visitor chooses, and the page they're on is counted once they allow it.
 *
 * Must be mounted inside the root layout body.
 */
export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const send = () => {
      if (typeof window.gtag !== "function" || !analyticsConsented()) return;
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    };
    send();
    // A later "allow" counts the current page; a "reject" sends nothing.
    window.addEventListener(CONSENT_CHANGED_EVENT, send);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, send);
  }, [pathname]);

  return null;
}
