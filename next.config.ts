import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Brotli/Gzip compression at the Node server level
  compress: true,

  // Remove the X-Powered-By: Next.js fingerprinting header
  poweredByHeader: false,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "cdn.ecodrix.com" },
      { protocol: "https", hostname: "ecodrix.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
    // Modern formats improve LCP — Next.js serves WebP/AVIF automatically
    formats: ["image/avif", "image/webp"],
  },

  // Security & performance response headers applied to every route
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Enables DNS prefetching for third-party origins (GA4, fonts)
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Prevents MIME-type sniffing attacks
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Only send origin in the Referer header for cross-origin requests
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Disable browser features that aren't needed
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Long-lived cache for static assets (JS, CSS, images, fonts)
        // Next.js content-hashes these filenames so this is safe
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
