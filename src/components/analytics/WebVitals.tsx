"use client";

import { useReportWebVitals } from "next/web-vitals";
import { analyticsConsented } from "@/lib/legal/consent";

/**
 * Forwards Core Web Vitals (CLS, LCP, FID, FCP, TTFB, INP) to GA4.
 *
 * Each metric is sent as a GA4 custom event named after the metric id (e.g. "CLS").
 * The `value` is rounded to avoid floating-point noise.
 * The `rating` field ("good" | "needs-improvement" | "poor") enables
 * easy segmentation in GA4 Explore reports.
 *
 * The only web-vitals sender (lib/performance-monitor.ts sent every metric a
 * second time and was removed). Sends only with analytics consent.
 *
 * Must be mounted inside the root layout body.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    if (typeof window.gtag !== "function" || !analyticsConsented()) return;

    window.gtag("event", metric.name, {
      event_category: "Web Vitals",
      // GA4 custom dimensions only accept integers for value
      value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value,
      ),
      event_label: metric.id,
      // "good" | "needs-improvement" | "poor"
      metric_rating: metric.rating,
      non_interaction: true,
    });
  });

  return null;
}
