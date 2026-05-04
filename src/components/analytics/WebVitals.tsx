"use client";

import { useReportWebVitals } from "next/web-vitals";
import { useEffect } from "react";
import { performanceMonitor } from "@/lib/performance-monitor";

/**
 * Forwards Core Web Vitals (CLS, LCP, FID, FCP, TTFB, INP) to GA4.
 *
 * Each metric is sent as a GA4 custom event named after the metric id (e.g. "CLS").
 * The `value` is rounded to avoid floating-point noise.
 * The `rating` field ("good" | "needs-improvement" | "poor") enables
 * easy segmentation in GA4 Explore reports.
 *
 * Must be mounted inside the root layout body.
 */
export function WebVitals() {
  // Initialize performance monitoring on mount
  useEffect(() => {
    performanceMonitor.init();
  }, []);

  useReportWebVitals((metric) => {
    if (typeof window.gtag !== "function") return;

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
