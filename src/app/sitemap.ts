import type { MetadataRoute } from "next";

/**
 * Generates /sitemap.xml via Next.js App Router convention.
 * Add new routes here as the site grows.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ecodrix.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://ecodrix.com/#services",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://ecodrix.com/#work",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://ecodrix.com/#contact",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
