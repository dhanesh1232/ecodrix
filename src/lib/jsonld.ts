/**
 * JSON-LD schema utilities for ECODrIx.
 *
 * These structured data payloads help search engines understand the site's
 * identity and enable rich results like sitelinks search boxes.
 *
 * Spec: https://schema.org/Organization | https://schema.org/WebSite
 */

const BASE_URL = "https://ecodrix.com";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ECODrIx",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
    },
    description:
      "ECODrIx is a full-stack digital studio and SaaS product company from India. We design, develop, and automate digital systems for businesses worldwide.",
    foundingDate: "2022",
    areaServed: "Worldwide",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${BASE_URL}/#contact`,
    },
    sameAs: [
      "https://www.linkedin.com/company/ecodrix",
      "https://twitter.com/ecodrix",
      "https://github.com/ecodrix",
    ],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ECODrIx",
    url: BASE_URL,
    description:
      "Build Smarter. Grow Faster. Full-stack digital studio and SaaS product company from India.",
    // Enables the Google Sitelinks Search Box feature in SERPs
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
