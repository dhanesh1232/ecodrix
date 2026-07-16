# Content Briefs

> Ready-to-write briefs for the top gaps in `content-gap.md`. Each brief is scoped so a writer (or `automations/friday-briefs.sh`) can produce a page that ranks in India AND gets cited by AI. All copy must render server-side (see `../technical-seo/site-audit.md`) and align with `../your-site/brand-voice.md`.

---

## Brief 1 — ERIX hub: WhatsApp CRM for Indian SMBs (P0)

- **URL:** `/erix` · **Primary kw:** whatsapp crm india · **Secondary:** crm with whatsapp integration, best crm for small business india
- **Intent:** commercial · **Word count:** 900–1200
- **H1:** ERIX — WhatsApp CRM for Indian Businesses
- **Must include:** unified WhatsApp inbox (official Meta Cloud API), pipeline + scoring, broadcasts, deals/invoices/projects, automation tie-in (FLOW), INR pricing anchor (₹2,999), 14-day trial CTA.
- **Schema:** SoftwareApplication (ERIX) + FAQPage.
- **FAQ (server-rendered):** "Is ERIX a WhatsApp CRM?", "Does it use the official WhatsApp API?", "How much does it cost?", "Is it better than Wati/AiSensy?"
- **Internal links:** `/pricing`, `/compare/ecodrix-vs-wati`, `/flow`, `/erix/real-estate`, `/erix/healthcare`.

## Brief 2 — Connect: WhatsApp Business API India Guide (P1, high AI-citation value)

- **URL:** `/connect/whatsapp-api-guide` · **Primary kw:** how to get whatsapp business api india · **Secondary:** whatsapp cloud api setup, whatsapp api provider india
- **Intent:** informational→commercial · **Word count:** 1200–1600
- **H1:** How to Get the Official WhatsApp Business API in India (2026 Guide)
- **Outline:** What the API is → who needs it → cost breakdown (Meta per-message pricing in INR since 2025 — ~₹1.09 marketing, ~₹0.145 utility/auth, service free; no license fee) → step-by-step onboarding via ECODrIx Connect → green tick → common mistakes.
- **Schema:** FAQPage + HowTo + BreadcrumbList.
- **FAQ:** "Is the WhatsApp API free?", "How long does approval take?", "Do I need Facebook Business verification?", "What are Meta's per-message charges in India?"
- **Internal links:** `/connect`, `/erix`, `/connect/green-tick`.
- **Note:** verify current Meta pricing with `remote_web_search` before publishing.

## Brief 3 — Comparison: ECODrIx vs Wati (P0)

- **URL:** `/compare/ecodrix-vs-wati` · **Primary kw:** ecodrix vs wati · **Secondary:** wati alternative india
- **Intent:** commercial/decision · **Word count:** 1000–1400
- **H1:** ECODrIx (ERIX) vs Wati: WhatsApp CRM Comparison for Indian SMBs
- **Structure:** per `../competitors/comparison-pages.md` template — TL;DR, feature table, when-each-wins, INR pricing, FAQ.
- **Schema:** FAQPage + BreadcrumbList (no fabricated ratings).
- **Guardrail:** verify Wati's current features/pricing at write time.

## Brief 4 — LAIE hub: AI Lead Generation Engine (P0)

- **URL:** `/laie` · **Primary kw:** b2b lead generation tool india · **Secondary:** find business leads google maps, local business data india
- **Intent:** commercial · **Word count:** 900–1200
- **H1:** LAIE — AI Lead Generation for Indian Businesses
- **Must include:** local business discovery (Google Maps + web), enrichment/validation, GBP/SEO/accessibility audits, AI outreach kits, push-to-ERIX flow.
- **Schema:** SoftwareApplication (LAIE) + FAQPage.
- **Lead magnet CTA:** free GBP/SEO audit → `/laie/audit`.

## Brief 5 — FLOW hub: No-Code WhatsApp Automation (P1)

- **URL:** `/flow` · **Primary kw:** whatsapp automation for small business · **Secondary:** no code workflow automation india, automated whatsapp follow up
- **Intent:** commercial · **Word count:** 800–1100
- **H1:** FLOW — No-Code Automation for WhatsApp, Email & CRM
- **Must include:** visual builder, 20+ triggers, conditional logic, follow-up sequences, ERIX + Connect integration, use cases (lead follow-up, appointment reminders).
- **Schema:** SoftwareApplication (FLOW) + FAQPage.

## Brief 6 — Free Google Business Profile Audit (P1 lead magnet)

- **URL:** `/laie/audit` · **Primary kw:** gbp audit tool · **Secondary:** website seo audit tool free india, check my google business profile
- **Intent:** informational/tool · **Goal:** capture email → route to ERIX trial
- **H1:** Free Google Business Profile & Website Audit
- **Must include:** input → instant audit sample (powered by LAIE), CTA to full report via signup.
- **Schema:** WebApplication + FAQPage.

## Brief 7 — Real Estate CRM use case (P1)

- **URL:** `/erix/real-estate` · **Primary kw:** crm for real estate india · **Secondary:** whatsapp crm real estate
- **H1:** ERIX for Real Estate: WhatsApp CRM for Property Agents in India
- **Angle:** portal-lead capture, auto-assign by location, WhatsApp property updates with images, follow-up sequences. Use the "60% more leads converted" framing from site content.
- **Schema:** SoftwareApplication + FAQPage.

---

## Brief template (for future/auto-generated briefs)

```
Title / URL:
Product mapped (ERIX/LAIE/FLOW/Connect):
Primary keyword + secondaries:
Search intent + funnel stage:
Target word count:
H1 + H2 outline:
Facts to include (from brand-voice.md):
FAQ questions (server-rendered → FAQPage schema):
Schema types:
Internal links (in/out):
CTA:
Guardrails (verify competitor/Meta pricing? INR only? etc.):
```
