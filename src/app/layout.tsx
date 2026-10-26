import type { Metadata } from "next";
import localFont from "next/font/local";
import { CONSENT_BOOT_SCRIPT } from "@/lib/legal/consent";
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
// The files are Latin + ₹ subsets of the design system's fonts (pyftsubset,
// Google Fonts "latin" range plus U+20B9, all axes and layout features kept),
// ~45 KB lighter. Re-subset if a font file is replaced.
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
  // Only a few invoice numbers use it: don't spend first-load bandwidth on it.
  preload: false,
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
      // The consent boot script sets data-consent before hydration.
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn(
        "font-sans",
        bricolage.variable,
        manrope.variable,
        jetbrains.variable,
      )}
    >
      <head>
        {/* Google Consent Mode v2 defaults + the stored choice, whether to
            show the cookie banner, and the GA4 config (queued, so it always
            precedes the page_view events GoogleAnalytics pushes). Synchronous,
            before any Google tag. */}
        {/* next/script, not a raw <script>: React never renders it on the
            client, so a client re-render can't warn about it. */}
        <Script
          id="consent-boot"
          strategy="beforeInteractive"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static boot script
          dangerouslySetInnerHTML={{
            __html: `${CONSENT_BOOT_SCRIPT}gtag('js',new Date());gtag('config','G-DK8Q4TLZPM',{send_page_view:false,anonymize_ip:true});`,
          }}
        />

        {/* Google Tag Manager and GA4 load on the visitor's first scroll,
            tap or key press, or 5 s after the page has loaded, whichever is
            first. Together they are ~300 KB and blocked a phone's main
            thread for ~0.6 s while the page was still becoming usable.
            Page views and events pushed before then wait in dataLayer and
            are sent when the tags arrive. GA4 is also loaded directly as a
            safety net for Search Console verification. */}
        <Script id="google-tags" strategy="afterInteractive">
          {`(function(w,d){var ev=['scroll','pointerdown','keydown','touchstart'],done=0;
    function go(){if(done)return;done=1;ev.forEach(function(e){w.removeEventListener(e,go);});
    w.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
    ['https://www.googletagmanager.com/gtm.js?id=GTM-MN6R938B','https://www.googletagmanager.com/gtag/js?id=G-DK8Q4TLZPM'].forEach(function(s){var j=d.createElement('script');j.async=true;j.src=s;d.head.appendChild(j);});}
    ev.forEach(function(e){w.addEventListener(e,go,{passive:true});});
    if(d.readyState==='complete')setTimeout(go,5000);else w.addEventListener('load',function(){setTimeout(go,5000);});
    })(window,document);`}
        </Script>

        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

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
        {/* First in the body (it's fixed, so order doesn't move it): its HTML
            then paints with the first frame instead of after the whole page. */}
        <CookieConsent />
        <div className="bg-surface text-foreground overflow-clip min-h-screen flex flex-col">
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
