import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ECODrIx | Build Smarter. Grow Faster.",
  description:
    "ECODrIx is a full-stack digital studio and SaaS product company from India. We design, develop, and automate digital systems for businesses worldwide.",
  keywords: [
    "web development",
    "SEO",
    "WhatsApp automation",
    "SaaS",
    "India",
    "digital studio",
  ],
  authors: [{ name: "ECODrIx", url: "https://ecodrix.com" }],
  openGraph: {
    title: "ECODrIx | Build Smarter. Grow Faster.",
    description:
      "Full-stack digital studio and SaaS product company from India.",
    url: "https://ecodrix.com",
    siteName: "ECODrIx",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
