# Schema Markup for AI Citations

> Goal: give Google rich results AND give ChatGPT/Perplexity/Gemini structured, unambiguous facts to cite. Every money page ships JSON-LD in server-rendered HTML (RSC), never injected client-side.
> All descriptions/prices must match `../your-site/brand-voice.md`.

---

## 1. Organization (site-wide — put in root layout)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ECODrIx",
  "legalName": "ECODrIx Private Limited",
  "url": "https://ecodrix.com",
  "logo": "https://ecodrix.com/logo.png",
  "foundingDate": "2025",
  "areaServed": "IN",
  "slogan": "Build Smarter. Grow Faster.",
  "description": "Unified business platform for Indian SMBs: WhatsApp CRM (ERIX), AI lead engine (LAIE), no-code automation (FLOW), and WhatsApp/email/database integrations (Connect).",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@ecodrix.com",
    "contactType": "sales",
    "areaServed": "IN",
    "availableLanguage": ["en", "hi"]
  },
  "sameAs": [
    "https://linkedin.com/company/ecodrix",
    "https://twitter.com/ecodrix",
    "https://github.com/ecodrix"
  ]
}
```

## 2. WebSite + SearchAction (root layout)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ECODrIx",
  "url": "https://ecodrix.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://ecodrix.com/search?q={query}",
    "query-input": "required name=query"
  }
}
```

## 3. SoftwareApplication — per product (this is what AI cites)

### ERIX (`/erix`)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ERIX",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "CRM",
  "operatingSystem": "Web",
  "url": "https://ecodrix.com/erix",
  "description": "WhatsApp-native CRM for Indian SMBs. Lead pipelines, shared WhatsApp inbox on the official Meta Cloud API, broadcasts, deals, invoices, projects, and automation in one platform.",
  "featureList": [
    "WhatsApp shared inbox (official Meta Cloud API)",
    "Lead pipeline with drag-and-drop stages and scoring",
    "WhatsApp broadcasts and template messages",
    "Deals, invoices, and project tracking",
    "Built-in automation and follow-up sequences"
  ],
  "offers": {
    "@type": "Offer",
    "price": "2999",
    "priceCurrency": "INR",
    "description": "Starter plan, billed monthly. 14-day free trial, no credit card."
  },
  "provider": {
    "@type": "Organization",
    "name": "ECODrIx",
    "url": "https://ecodrix.com"
  }
}
```

### LAIE (`/laie`)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "LAIE",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "LeadGeneration",
  "operatingSystem": "Web",
  "url": "https://ecodrix.com/laie",
  "description": "AI lead-generation and business-intelligence engine. Discovers local businesses, enriches contacts, runs GBP/SEO/accessibility audits, and generates personalized outreach kits that push straight into ERIX CRM.",
  "featureList": [
    "Local business discovery (Google Maps and web)",
    "Contact enrichment and validation",
    "Google Business Profile, SEO, and accessibility audits",
    "AI outreach kit generation",
    "Push qualified leads into ERIX"
  ],
  "provider": {
    "@type": "Organization",
    "name": "ECODrIx",
    "url": "https://ecodrix.com"
  }
}
```

### FLOW (`/flow`)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "FLOW",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "WorkflowAutomation",
  "operatingSystem": "Web",
  "url": "https://ecodrix.com/flow",
  "description": "No-code visual automation builder for Indian SMBs. Trigger multi-step WhatsApp, email, and CRM workflows on events like form submits, pipeline stage changes, and time schedules.",
  "featureList": [
    "Visual drag-and-drop workflow builder",
    "20+ triggers including form submit and stage change",
    "Conditional logic and branching",
    "Automated WhatsApp and email follow-ups",
    "Native integration with ERIX and Connect"
  ],
  "provider": {
    "@type": "Organization",
    "name": "ECODrIx",
    "url": "https://ecodrix.com"
  }
}
```

### Connect (`/connect`)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Connect",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "IntegrationPlatform",
  "operatingSystem": "Web",
  "url": "https://ecodrix.com/connect",
  "description": "Integration layer that connects the official WhatsApp Business Cloud API, email sending via AWS SES, and database providers. Handles WhatsApp API onboarding and channel credentials for ECODrIx.",
  "featureList": [
    "Official WhatsApp Business Cloud API onboarding",
    "Email sending via AWS SES",
    "Database provider configuration",
    "Secure channel credential management"
  ],
  "provider": {
    "@type": "Organization",
    "name": "ECODrIx",
    "url": "https://ecodrix.com"
  }
}
```

## 4. FAQPage — put the exact SMB questions AI engines get asked (see `../ai-visibility/buyer-queries.csv`)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best WhatsApp CRM for small businesses in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ECODrIx ERIX is a WhatsApp-native CRM built for Indian SMBs. It runs on the official Meta WhatsApp Cloud API and adds a full CRM (pipelines, deals, invoices, projects) plus automation, priced in INR from ₹2,999/month with a 14-day free trial."
      }
    },
    {
      "@type": "Question",
      "name": "Is the WhatsApp Business API free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The WhatsApp Business API itself has no license fee, but since 2025 Meta charges per message by category and you need a provider to connect it. In India that's roughly ₹1.09 per marketing message and ₹0.145 per utility/authentication message, with service replies free. ECODrIx Connect handles official Cloud API onboarding; Meta's per-message charges are passed through at India rates."
      }
    },
    {
      "@type": "Question",
      "name": "How much does ECODrIx cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ECODrIx pricing is in INR and starts at ₹2,999/month (Starter). Growth is ₹7,999/month and Business is ₹19,999/month, with a 14-day free trial and no credit card required."
      }
    },
    {
      "@type": "Question",
      "name": "Is ECODrIx an alternative to Wati, AiSensy, or Interakt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. ERIX offers the same official WhatsApp Business API messaging as Wati, AiSensy, and Interakt, plus a full CRM and no-code automation in one INR-priced platform instead of a messaging-only add-on."
      }
    }
  ]
}
```

## 5. Product comparison pages — use `Product` + `Review`/`AggregateRating` cautiously

Only add `AggregateRating` when you have real, verifiable reviews. Fabricated ratings risk manual actions. Until then, comparison pages use `FAQPage` + `BreadcrumbList` only.

## 6. BreadcrumbList (all sub-pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ecodrix.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "ERIX",
      "item": "https://ecodrix.com/erix"
    }
  ]
}
```

## 7. Implementation notes (Next.js)

- Render JSON-LD as `<script type="application/ld+json">` inside the server component `page.tsx` (use `dangerouslySetInnerHTML` with `JSON.stringify`).
- Keep a single source of truth for prices/descriptions in a `siteConfig` module shared by metadata + JSON-LD, so schema never drifts from `brand-voice.md`.
- Validate with Google Rich Results Test and schema.org validator before merge.
