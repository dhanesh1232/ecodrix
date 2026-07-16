# Content Gap Analysis

> Topics Indian SMBs search (and ask AI) that ECODrIx does not yet answer with a dedicated page. Every gap maps to ERIX/LAIE/FLOW/Connect. Prioritized by intent × India volume × conversion proximity.

---

## Build status (live in the Next.js app)

- ✅ **Comparison pages** — `/compare` hub + `/compare/ecodrix-vs-wati`, `-aisensy`, `-interakt` (SSG, FAQ + Breadcrumb + ItemList JSON-LD). Linked from Navbar + Footer.
- ✅ **WhatsApp Business API guide** — `/connect/whatsapp-api-guide` (HowTo + FAQ + Breadcrumb JSON-LD).
- ✅ **Free GBP/website audit lead magnet** — `/laie/audit` (WebApplication + FAQ JSON-LD).
- ℹ️ **Product hubs** — LAIE/FLOW/Connect/ERIX are already served by the existing `/platform/[slug]` routes (crm, whatsapp, automation, lead-intelligence, …). The `/erix` `/laie` `/flow` `/connect` URLs in this doc are conceptual lanes; do NOT build duplicate hubs (canonical conflict). The guide/audit pages are nested under `/connect/*` and `/laie/*` as content, which is fine.
- ✅ **WhatsApp green tick guide** — `/connect/green-tick` (HowTo + FAQ + Breadcrumb JSON-LD).
- ✅ **ERIX use-case pages** — `/erix/real-estate`, `/erix/healthcare` (data-driven via `src/lib/use-cases.ts`; SoftwareApplication + FAQ + Breadcrumb). Add more industries by extending that file.
- ✅ **Cookie consent** — Google Consent Mode v2 banner (`CookieConsent.tsx`) enforcing the Cookie Policy; reopenable from the footer.
- ✅ **Agency white-label** — `/erix/agencies` (use-case entry). Targets "white label crm india", "whatsapp crm reseller india".
- ✅ **WhatsApp broadcast-limits explainer** — `/connect/whatsapp-broadcast-limits` (messaging tiers + quality rating; FAQ schema).
- ✅ **Zapier-vs-FLOW** — `/flow/zapier-alternative` (honest comparison; FAQ schema).
- 🔲 Remaining P2 (optional): Hinglish/vernacular content variants (needs i18n decision), cold-email deliverability (SES) explainer.

---

## P0 — Money pages that don't exist yet

| Gap                           | Product | Target query                           | Why it matters                           | Page to build |
| ----------------------------- | ------- | -------------------------------------- | ---------------------------------------- | ------------- |
| No LAIE hub                   | LAIE    | b2b lead generation tool india         | Whole product invisible in search/AI     | `/laie`       |
| No FLOW hub                   | FLOW    | whatsapp automation for small business | Whole product invisible                  | `/flow`       |
| No Connect hub                | Connect | whatsapp business api provider india   | High-intent onboarding traffic lost      | `/connect`    |
| No comparison pages           | ERIX    | ecodrix vs wati / aisensy              | Competitors own the decision-stage query | `/compare/*`  |
| No INR pricing page (citable) | Brand   | ecodrix pricing                        | AI can't quote our prices                | `/pricing`    |

## P1 — High-intent informational (feeds product pages + AI citations)

| Gap                                      | Product | Target query                                     | Format                        | Page                            |
| ---------------------------------------- | ------- | ------------------------------------------------ | ----------------------------- | ------------------------------- |
| WhatsApp Business API India guide        | Connect | how to get whatsapp business api india           | Long-form guide + FAQ schema  | `/connect/whatsapp-api-guide`   |
| Is WhatsApp API free / pricing explained | Connect | is whatsapp api free, whatsapp api pricing india | Explainer correcting the myth | `/connect/whatsapp-api-pricing` |
| WhatsApp green tick verification         | Connect | how to get whatsapp green tick                   | How-to                        | `/connect/green-tick`           |
| Free Google Business Profile audit       | LAIE    | gbp audit tool, check my google business profile | Interactive lead magnet       | `/laie/audit`                   |
| Real estate CRM use case                 | ERIX    | crm for real estate india                        | Use-case landing              | `/erix/real-estate`             |
| Clinic/healthcare CRM use case           | ERIX    | crm for clinics, appointment reminder whatsapp   | Use-case landing              | `/erix/healthcare`              |

## P2 — Top-of-funnel + Hinglish/vernacular considerations

| Gap                                                | Product      | Note                                                                           |
| -------------------------------------------------- | ------------ | ------------------------------------------------------------------------------ |
| "WhatsApp par business kaise badhaye" style intent | ERIX/FLOW    | Indian SMBs search in Hinglish; consider Hindi/Hinglish variants of key guides |
| Agency white-label playbook                        | ERIX         | "whatsapp crm reseller india" — recurring-revenue angle                        |
| WhatsApp broadcast limits / policy explainer       | Connect      | Recurrent SMB confusion; strong AI-answer target                               |
| Cold email deliverability for India (SES)          | Connect/LAIE | Ties LAIE outreach + Connect email                                             |
| Zapier vs FLOW (WhatsApp-native)                   | FLOW         | "zapier alternative india whatsapp"                                            |

## Prioritization logic

1. **Existence beats optimization** — LAIE/FLOW/Connect have no hub; building them unlocks entire query clusters.
2. **Decision-stage first** — comparison + pricing pages convert fastest and are AI-cited.
3. **Lead magnets** — `/laie/audit` (free GBP/SEO audit) captures top-funnel and routes into ERIX.
4. **Informational guides** — win awareness queries and become AI citation sources for "how to" prompts.

## Not now (avoid dilution)

- Generic "what is a CRM" content (no differentiation, high competition).
- Non-India / USD-focused content.
- Topics unmappable to ERIX/LAIE/FLOW/Connect.
