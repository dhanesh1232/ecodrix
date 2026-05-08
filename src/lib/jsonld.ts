/**
 * JSON-LD schema utilities for ECODrix.
 *
 * These structured data payloads help search engines understand the site's
 * identity and enable rich results like sitelinks search boxes.
 *
 * Spec: https://schema.org/Organization | https://schema.org/WebSite | https://schema.org/SoftwareApplication | https://schema.org/FAQPage
 */

const BASE_URL = "https://ecodrix.com";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ECODrix",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
    },
    description:
      "ECODrix is a unified business infrastructure platform combining CRM, AI automation, WhatsApp messaging, email marketing, and cloud storage. Trusted by 50+ businesses across India.",
    foundingDate: "2025",
    areaServed: "Worldwide",
    email: "contact@ecodrix.com",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@ecodrix.com",
      url: `${BASE_URL}/#contact`,
    },
    sameAs: [
      "https://www.linkedin.com/in/dhanesh-mekalthuru-5baa9323b",
      "https://github.com/dhanesh1232",
      "https://www.instagram.com/erix.dhanesh/",
    ],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ECODrix",
    url: BASE_URL,
    description:
      "Build Smarter. Grow Faster. Unified business infrastructure platform combining CRM, AI automation, WhatsApp, email marketing, and cloud storage.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ECODrix Platform",
    url: BASE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Unified business infrastructure platform combining CRM, AI automation, WhatsApp Business API, email marketing, and cloud storage. Helps businesses automate operations and scale growth.",
    offers: {
      "@type": "Offer",
      price: "2999",
      priceCurrency: "INR",
      priceValidUntil: "2027-12-31",
      description: "Starter plan — up to 1,000 contacts",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "50",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "CRM & Lead Pipeline",
      "WhatsApp Business API",
      "Email Marketing",
      "Automation Engine",
      "Cloud Storage",
      "Meeting Scheduler",
      "Analytics & Reporting",
    ],
    screenshot: `${BASE_URL}/logo.png`,
    author: {
      "@type": "Organization",
      name: "ECODrix",
      url: BASE_URL,
    },
  };
}

export function getFAQSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}
