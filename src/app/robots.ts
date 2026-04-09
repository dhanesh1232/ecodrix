import type { MetadataRoute } from "next";

/**
 * Generates /robots.txt via Next.js App Router convention.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Disallow API routes and internal Next.js paths from being indexed
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://ecodrix.com/sitemap.xml",
    host: "https://ecodrix.com",
  };
}
