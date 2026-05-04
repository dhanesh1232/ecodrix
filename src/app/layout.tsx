import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Script from "next/script";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getSoftwareApplicationSchema,
} from "@/lib/jsonld";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { WebVitals } from "@/components/analytics/WebVitals";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/layout/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

// Code-only font — no preload, only used in pills/code snippets
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

const BASE_URL = "https://ecodrix.com";

export const metadata: Metadata = {
  // Required for OG/Twitter absolute URLs to resolve correctly
  metadataBase: new URL(BASE_URL),

  title: {
    default: "ECODrIx | Unified Business Infrastructure Platform",
    // Page-level overrides use this template
    template: "%s | ECODrIx",
  },
  description:
    "Unified business infrastructure platform combining CRM, AI automation, WhatsApp messaging, email marketing, and cloud storage. Trusted by 50+ businesses. 99.9% uptime. SOC 2 compliant.",
  keywords: [
    "CRM software",
    "business automation",
    "WhatsApp Business API",
    "email marketing platform",
    "lead management system",
    "sales pipeline software",
    "workflow automation",
    "cloud storage",
    "SaaS platform India",
    "ECODrIx",
  ],
  authors: [{ name: "ECODrIx", url: BASE_URL }],
  creator: "ECODrIx",
  publisher: "ECODrIx",
  category: "technology",

  // Canonical URL — prevents duplicate content penalties
  alternates: {
    canonical: BASE_URL,
  },

  // Explicit crawler directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // Open Graph
  openGraph: {
    title: "ECODrIx | Unified Business Infrastructure Platform",
    description:
      "Unified business infrastructure platform combining CRM, AI automation, WhatsApp messaging, email marketing, and cloud storage. Trusted by 50+ businesses across India.",
    url: BASE_URL,
    siteName: "ECODrIx",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png", // TODO: Create optimized 1200x630px OG image
        width: 1200,
        height: 630,
        alt: "ECODrIx — Unified Business Infrastructure Platform",
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: "summary_large_image",
    title: "ECODrIx | Unified Business Infrastructure Platform",
    description:
      "CRM, automation, WhatsApp, email marketing, and cloud storage in one platform. Trusted by 50+ businesses. 99.9% uptime.",
    site: "@ecodrix",
    creator: "@ecodrix",
    images: ["/og-image.png"], // TODO: Create optimized 1200x630px OG image
  },

  // Icons — wired to existing /public assets
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon-16x16.png",
  },

  // Google Search Console verification - add your token when available
  verification: {
    google: "1G7-mS5pi6DXI5YRIvJABKDEKG1B80YgMaIUw8h2dNQ", // TODO: Replace with actual GSC verification token
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans")}>
      <head>
        {/* Resource hints for performance optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* JSON-LD structured data — must be in <head> for crawler visibility */}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteSchema()),
          }}
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSoftwareApplicationSchema()),
          }}
        />
        <meta
          name="google-site-verification"
          content="1G7-mS5pi6DXI5YRIvJABKDEKG1B80YgMaIUw8h2dNQ"
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {/* Skip to main content link for keyboard navigation */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* GA4 — deferred to avoid blocking initial render */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DK8Q4TLZPM"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DK8Q4TLZPM', {
              send_page_view: false,
              anonymize_ip: true
            });
          `}
        </Script>

        {/* SPA page view tracking — fires on every client-side navigation */}
        <GoogleAnalytics />

        {/* Core Web Vitals reporting to GA4 */}
        <WebVitals />

        <div className="bg-background text-text-primary overflow-clip min-h-screen flex flex-col">
          <LenisProvider />
          <Navbar />
          <main id="main-content" className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
