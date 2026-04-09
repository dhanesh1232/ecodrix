"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fires a GA4 page_view event on every client-side navigation.
 *
 * This solves the SPA double-counting problem: the gtag script in layout.tsx
 * sets `send_page_view: false` on the initial config call. This component then
 * takes over responsibility for firing page_view on every route change.
 *
 * Must be mounted inside the root layout body.
 */
export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
