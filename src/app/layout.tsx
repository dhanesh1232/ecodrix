import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import Script from "next/script";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getSoftwareApplicationSchema,
  getPersonSchema,
} from "@/lib/jsonld";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { WebVitals } from "@/components/analytics/WebVitals";
import { VisitorTracker } from "@/components/analytics/VisitorTracker";
import { AutoEventTracker } from "@/components/analytics/AutoEventTracker";
import { CookieConsent } from "@/components/legal/CookieConsent";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionRoot } from "@/components/motion/motion";

// ERIX design system type, self-hosted (SIL OFL — licences in ./fonts):
// Bricolage Grotesque for headings, Manrope for text, JetBrains Mono for code.
const bricolage = localFont({
  src: "./fonts/bricolage-grotesque.woff2",
  weight: "200 800",
  variable: "--font-bricolage",
  display: "swap",
});

const manrope = localFont({
  src: "./fonts/manrope.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});

const jetbrains = localFont({
  src: "./fonts/jetbrains-mono.woff2",
  weight: "100 800",
  variable: "--font-jetbrains",
  display: "swap",
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
    "Unified business infrastructure platform combining CRM, AI automation, WhatsApp messaging, email marketing, and cloud storage. Trusted by 50+ businesses. 99.9% uptime.",
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
    "Dhanesh Mekalthuru",
    "ERIX CRM",
    "ERIX-FLOW",
    "ERIX-LAIE",
    "ErixStore",
    "Relay Fabric",
    "lead scraping",
    "lead enrichment",
    "Socket.io chat",
    "custom node marketplace",
    "payment link generation",
  ],
  authors: [{ name: "ECODrIx", url: BASE_URL }],
  creator: "ECODrIx",
  publisher: "ECODrIx",
  category: "technology",

  // No canonical here: a layout's `alternates` is inherited by every page,
  // which told Google all pages were copies of the home page (Search Console
  // "Crawled - currently not indexed", Oct 2026). Each page sets its own.

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
    siteName: "ECODrIx",
    type: "website",
    locale: "en_IN",
    alternateLocale: ["en_US", "en_GB"],
  },

  // Twitter / X card
  twitter: {
    card: "summary_large_image",
    title: "ECODrIx | Unified Business Infrastructure Platform",
    description:
      "CRM, automation, WhatsApp, email marketing, and cloud storage in one platform. Trusted by 50+ businesses. 99.9% uptime.",
    site: "@ecodrix",
    creator: "@ecodrix",
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
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(
        "font-sans",
        bricolage.variable,
        manrope.variable,
        jetbrains.variable,
      )}
    >
      <head>
        {/* Google Consent Mode v2 — synchronous, must run before any GTM/GA */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`,
          }}
        />

        {/* Google Tag Manager — loaded with beforeInteractive so the
            container is available before page-view events fire, but Next's
            Script primitive still keeps it off the critical render path. */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-MN6R938B');`}
        </Script>

        {/* Resource hints for performance optimization */}
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
        {/* Person schema — anchors "who is Dhanesh Mekalthuru" knowledge-panel
            queries on Google, Bing, and AI answer engines. */}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonSchema()),
          }}
        />

        {/* GA4 — loaded after interactive so it never blocks first paint.
            GTM (above) typically routes its own GA4 tag, but we ship the
            direct snippet too as a safety net for Google Search Console
            verification. Both stay non-blocking. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DK8Q4TLZPM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
      </head>
      <body
        className="antialiased"
      >
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MN6R938B"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {/* SPA page view tracking — fires on every client-side navigation */}
        <GoogleAnalytics />
        <VisitorTracker />
        <AutoEventTracker />
        {/* Core Web Vitals reporting to GA4 */}
        <WebVitals />
        <MotionRoot />
        <div className="bg-surface text-foreground overflow-clip min-h-screen flex flex-col">
          <Navbar />
          <main id="main-content" className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}
