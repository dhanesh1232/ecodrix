import type { MetadataRoute } from "next";

/**
 * Generates /robots.txt via Next.js App Router convention.
 *
 * - Allow all standard crawlers across the marketing surface.
 * - Block /api only. Never block /_next/: Google must fetch the JS, CSS and
 *   optimised images to render a page (blocking it showed up in Search Console
 *   as "Blocked by robots.txt" and pages left unindexed, Oct 2026).
 * - Explicitly invite known AI crawlers and answer engines so they can
 *   index llms.txt / llms-full.txt / ai.txt for AEO + GEO.
 */
export default function robots(): MetadataRoute.Robots {
  const aiAgents = [
    "GPTBot",
    "ClaudeBot",
    "anthropic-ai",
    "Claude-Web",
    "PerplexityBot",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
    "Bytespider",
    "FacebookBot",
    "Amazonbot",
    "DuckAssistBot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Generous explicit allow for known AI crawlers — they often respect
      // dedicated rules over the wildcard fallback.
      ...aiAgents.map((agent) => ({
        userAgent: agent,
        allow: [
          "/",
          "/llms.txt",
          "/llms-full.txt",
          "/llms-small.txt",
          "/ai.txt",
        ],
        disallow: ["/api/"],
      })),
    ],
    sitemap: "https://ecodrix.com/sitemap.xml",
    host: "https://ecodrix.com",
  };
}
