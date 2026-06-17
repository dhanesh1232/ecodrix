import type { MetadataRoute } from "next";
import { PLATFORM_MODULES } from "@/lib/platform-modules";
import { SEO_CONSTANTS } from "@/lib/jsonld";

/**
 * Generates /sitemap.xml via Next.js App Router convention.
 *
 * Single source of truth: static routes are listed below, and platform
 * module pages are auto-derived from `lib/platform-modules.ts` so adding
 * a new backend module instantly registers its SEO landing page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const { BASE_URL } = SEO_CONSTANTS;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/founder`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/brands`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/platform`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  const moduleRoutes: MetadataRoute.Sitemap = PLATFORM_MODULES.map((m) => ({
    url: `${BASE_URL}/platform/${m.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const anchorRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/#services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/#work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/#contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  return [...staticRoutes, ...moduleRoutes, ...anchorRoutes];
}
