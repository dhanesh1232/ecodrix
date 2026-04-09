import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Script from "next/script";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/jsonld";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { WebVitals } from "@/components/analytics/WebVitals";

// Primary display font — preloaded for LCP improvement
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Code-only font — no preload, only used in pills/code snippets
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const BASE_URL = "https://ecodrix.com";

export const metadata: Metadata = {
  // Required for OG/Twitter absolute URLs to resolve correctly
  metadataBase: new URL(BASE_URL),

  title: {
    default: "ECODrIx | Build Smarter. Grow Faster.",
    // Page-level overrides use this template
    template: "%s | ECODrIx",
  },
  description:
    "ECODrIx is a full-stack digital studio and SaaS product company from India. We design, develop, and automate digital systems for businesses worldwide.",
  keywords: [
    "web development India",
    "SaaS product company",
    "WhatsApp automation",
    "digital studio",
    "SEO agency India",
    "full-stack development",
    "Next.js development",
    "React development",
    "automation software",
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
    title: "ECODrIx | Build Smarter. Grow Faster.",
    description:
      "Full-stack digital studio and SaaS product company from India. We design, develop, and automate digital systems for businesses worldwide.",
    url: BASE_URL,
    siteName: "ECODrIx",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ECODrIx — Build Smarter. Grow Faster.",
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: "summary_large_image",
    title: "ECODrIx | Build Smarter. Grow Faster.",
    description:
      "Full-stack digital studio and SaaS from India. We design, develop, and automate digital systems for businesses worldwide.",
    site: "@ecodrix",
    creator: "@ecodrix",
    images: ["/logo.png"],
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

  // Placeholder slot — add GSC verification token here when available
  // verification: {
  //   google: "YOUR_GOOGLE_SITE_VERIFICATION_TOKEN",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <head>
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
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {/* GA4 — loads after page is interactive to avoid blocking render */}
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

        {/* SPA page view tracking — fires on every client-side navigation */}
        <GoogleAnalytics />

        {/* Core Web Vitals reporting to GA4 */}
        <WebVitals />

        {children}
      </body>
    </html>
  );
}
