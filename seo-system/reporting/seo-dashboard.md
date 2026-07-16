# SEO Dashboard — KPI Tracking

> Single-glance health of ECODrIx organic + AI visibility. Refreshed by `../automations/*.sh`. Every metric maps to ERIX/LAIE/FLOW/Connect.

---

## 1. North-star KPIs

| KPI                                       | Baseline | Current | Target (90d) | Trend | Source                       |
| ----------------------------------------- | :------: | :-----: | :----------: | :---: | ---------------------------- |
| Non-branded organic clicks                |  _tbd_   |  _tbd_  |    +100%     |   —   | `gsc-data/queries.csv`       |
| Organic free-trial signups                |  _tbd_   |  _tbd_  |   grow MoM   |   —   | analytics + CRM              |
| AI-answer inclusion (of 20 buyer prompts) |    0     |  _tbd_  |    10/20     |   —   | `ai-visibility/citations.md` |
| Money pages indexed                       |  _tbd_   |  _tbd_  |     100%     |   —   | `gsc-data/pages.csv`         |

## 2. Per-product organic performance

| Product | Money page | Indexed | Clicks (28d) | Impr. (28d) | Avg pos | Top query                           |
| ------- | ---------- | :-----: | :----------: | :---------: | :-----: | ----------------------------------- |
| ERIX    | `/erix`    |   ⬜    |    _tbd_     |    _tbd_    |  _tbd_  | whatsapp crm india                  |
| Connect | `/connect` |   ⬜    |    _tbd_     |    _tbd_    |  _tbd_  | whatsapp business api pricing india |
| LAIE    | `/laie`    |   ⬜    |    _tbd_     |    _tbd_    |  _tbd_  | b2b lead generation tool india      |
| FLOW    | `/flow`    |   ⬜    |    _tbd_     |    _tbd_    |  _tbd_  | whatsapp automation small business  |

## 3. AI visibility scoreboard

| Engine     | Prompts tested | ECODrIx cited | Inclusion rate | Accuracy (facts correct) |
| ---------- | :------------: | :-----------: | :------------: | :----------------------: |
| ChatGPT    |      0/20      |       0       |       0%       |            —             |
| Perplexity |      0/20      |       0       |       0%       |            —             |
| Gemini     |      0/20      |       0       |       0%       |            —             |

## 4. Competitor share of voice (WhatsApp CRM India)

| Competitor | AI answer wins | SERP top-3 wins | vs page live? |
| ---------- | :------------: | :-------------: | :-----------: |
| Wati       |     _tbd_      |      _tbd_      |      ⬜       |
| AiSensy    |     _tbd_      |      _tbd_      |      ⬜       |
| Interakt   |     _tbd_      |      _tbd_      |      ⬜       |

Full detail: `../competitors/share-of-voice.csv`.

## 5. Technical health

| Check                                  | Status | Detail                                          |
| -------------------------------------- | :----: | ----------------------------------------------- |
| Core Web Vitals (mobile)               |   ⬜   | LCP/INP/CLS — see `technical-seo/site-audit.md` |
| Schema coverage (money pages)          |   ⬜   | SoftwareApplication + FAQ + Org                 |
| Server-rendered copy (not client-only) |   ⬜   | Risk: framer-motion/gsap                        |
| Sitemap + robots live                  |   ⬜   | —                                               |

## 6. Content pipeline

| Brief                                  | Product | Status (backlog/writing/review/live)     |
| -------------------------------------- | ------- | ---------------------------------------- |
| Compare hub + vs Wati/AiSensy/Interakt | ERIX    | ✅ live (`/compare`, `/compare/*`)       |
| Connect WhatsApp API guide             | Connect | ✅ live (`/connect/whatsapp-api-guide`)  |
| LAIE free audit lead magnet            | LAIE    | ✅ live (`/laie/audit`)                  |
| ERIX/LAIE/FLOW/Connect hubs            | all     | ℹ️ served by existing `/platform/[slug]` |
| Real-estate / clinic use-case pages    | ERIX    | 🔲 backlog                               |

## 7. Thresholds (alerts — see `../settings.json`)

- Any money page drops out of index → alert.
- Core Web Vitals mobile fails → alert.
- AI inclusion rate falls below prior cycle → investigate `perception.md`.
