import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Brotli/Gzip compression at the Node server level
  compress: true,

  // Remove the X-Powered-By: Next.js fingerprinting header
  poweredByHeader: false,

  // Modern browser targeting and optimizations
  experimental: {
    // Enable CSS optimization and tree-shaking
    optimizeCss: true,
    // Optimize package imports for heavy dependencies
    optimizePackageImports: [
      "framer-motion",
      "gsap",
      "lenis",
      "lucide-react",
      "react-icons",
    ],
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "cdn.ecodrix.com" },
      { protocol: "https", hostname: "ecodrix.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
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

  // Turbopack configuration (Next.js 16+ default)
  // Empty config to acknowledge Turbopack usage and silence webpack warning
  turbopack: {},

  // Webpack configuration for advanced bundle optimization
  // Only used when explicitly running with --webpack flag
  webpack: (config, { isServer }) => {
    // Configure code splitting and chunk optimization
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          // Framework chunk (React, React-DOM) - shared across all pages
          framework: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            name: "framework",
            priority: 40,
            reuseExistingChunk: true,
          },
          // Heavy libraries chunk - lazy-loaded only when needed
          heavyLibs: {
            test: /[\\/]node_modules[\\/](framer-motion|gsap|lenis)[\\/]/,
            name: "heavy-libs",
            priority: 30,
            reuseExistingChunk: true,
          },
          // Common utilities and components
          commons: {
            name: "commons",
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
          },
          // Other vendor dependencies
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      };
      // Single runtime chunk for better caching
      config.optimization.runtimeChunk = "single";
    }

    return config;
  },
};

// Cast to the analyzer's expected config type. `@next/bundle-analyzer` can
// resolve a different hoisted Next.js version's `NextConfig` in the pnpm
// monorepo, so we align the argument type to whatever version it expects.
export default bundleAnalyzer(
  nextConfig as Parameters<typeof bundleAnalyzer>[0],
);
