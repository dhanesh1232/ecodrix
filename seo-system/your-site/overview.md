# ECODrIx — SEO Health Snapshot

> Domain: https://ecodrix.com · Market: pan-India SMBs · Currency: INR
> Products tracked: **ERIX** (WhatsApp CRM) · **LAIE** (AI lead engine) · **FLOW** (automation builder) · **Connect** (channel/integration layer)
> Last reviewed: _set by automations/monday-rankings.sh_

---

## 1. What we are optimizing for

ECODrIx does not compete on "CRM" as a generic term. We compete on the intersection Indian SMBs actually search:

- **WhatsApp + CRM** (ERIX) — "whatsapp crm india", "crm with whatsapp integration"
- **Lead generation + local business data** (LAIE) — "google maps lead scraper india", "b2b lead generation tool india"
- **No-code automation** (FLOW) — "whatsapp automation for small business", "workflow automation india"
- **WhatsApp Business API onboarding** (Connect) — "whatsapp business api provider india", "official whatsapp api pricing"

Everything in this system maps to one of these four product lanes. A keyword that does not map to ERIX/LAIE/FLOW/Connect does not belong here.

## 2. Priority order (why)

| Rank | Product | Reason                                                                                                    | Primary query cluster                          |
| ---- | ------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| P0   | ERIX    | Highest commercial intent, largest India search volume, direct competitor overlap (Wati/AiSensy/Interakt) | `whatsapp crm`, `crm for small business india` |
| P1   | Connect | High intent, low-competition long tail, feeds ERIX signups                                                | `whatsapp business api pricing india`          |
| P2   | LAIE    | Differentiator; few Indian competitors rank for "lead engine" + audit                                     | `find business leads from google maps`         |
| P3   | FLOW    | Supports the others; captures "automation" intent that converts into ERIX                                 | `whatsapp automation tool`                     |

## 3. Health snapshot (fill from GSC + crawl)

| Signal                     | Status | Target                                                             | Notes                                            |
| -------------------------- | :----: | ------------------------------------------------------------------ | ------------------------------------------------ |
| Indexed pages              |   ⬜   | All money pages indexed                                            | Check `technical-seo/site-audit.md`              |
| Core Web Vitals (mobile)   |   ⬜   | LCP < 2.5s, INP < 200ms, CLS < 0.1                                 | Next.js 16, framer-motion/gsap are risk areas    |
| Product landing pages live |   🟡   | 1 per product + comparison pages                                   | ERIX page exists; LAIE/FLOW/Connect pages needed |
| Schema coverage            |   ⬜   | SoftwareApplication + FAQ + Org on every money page                | See `technical-seo/schema.md`                    |
| Branded query CTR          |   ⬜   | > 30%                                                              | "ecodrix" SERP                                   |
| Non-branded impressions    |   ⬜   | Trend up MoM                                                       | `gsc-data/queries.csv`                           |
| AI citation presence       |   ⬜   | Appear in ≥1 of ChatGPT/Perplexity/Gemini for WhatsApp CRM prompts | `ai-visibility/citations.md`                     |

## 4. Structural gaps (as of setup)

- No dedicated `/erix`, `/laie`, `/flow`, `/connect` product hubs with per-product schema.
- No comparison pages ("ECODrIx vs Wati", "ECODrIx vs AiSensy", "ECODrIx vs Interakt") — these are the highest-converting India queries and currently owned by competitors.
- No pricing-in-INR structured content that AI engines can cite.
- No FAQ schema answering the exact questions SMBs type ("is whatsapp api free", "cheapest whatsapp crm india").
- `docs.ecodrix.com` referenced in site content but not confirmed indexed.

## 5. Immediate actions

1. Ship the four product hubs with `SoftwareApplication` + `FAQPage` schema (see `technical-seo/schema.md`).
2. Publish 3 comparison pages (Wati, AiSensy, Interakt) — see `competitors/comparison-pages.md`.
3. Wire GSC export into `gsc-data/` and run `automations/monday-rankings.sh`.
4. Seed `ai-visibility/buyer-queries.csv` and baseline citations with `automations/wednesday-citations.sh`.

## 6. KPI north stars

- Non-branded organic clicks to product hubs (ERIX first).
- Free-trial signups attributed to organic.
- AI-answer inclusion rate for the 20 buyer queries in `ai-visibility/buyer-queries.csv`.
- Share of voice vs Wati/AiSensy/Interakt in `competitors/share-of-voice.csv`.
