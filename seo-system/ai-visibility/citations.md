# AI Citations Tracker — Where ChatGPT / Perplexity / Gemini Cite ECODrIx

> Run `../automations/wednesday-citations.sh` weekly. For each prompt in `buyer-queries.csv`, record whether ECODrIx appears, in what position, and which source it cited (our page, a review site, or a competitor's page).
> The objective: get ECODrIx cited in AI answers for WhatsApp CRM / lead-gen / automation buyer prompts across India.

---

## 1. How AI engines pick citations (what we're optimizing for)

- **Perplexity & Google AI Overviews** cite crawlable pages with clear, structured, on-topic content — this is why `technical-seo/schema.md` (FAQPage + SoftwareApplication) and server-rendered copy matter.
- **ChatGPT (search)** favors authoritative, frequently-referenced sources and third-party mentions (directories, review sites, comparison articles).
- All three reward **consistent, unambiguous facts** — the reason `brand-voice.md` exists. If our INR pricing and product definitions differ across pages, engines get confused and skip us.

## 2. Citation log

| Date  | Prompt                      | Engine     | ECODrIx cited? | Position | Source cited | Competitors cited | Action |
| ----- | --------------------------- | ---------- | :------------: | :------: | ------------ | ----------------- | ------ |
| _tbd_ | Best WhatsApp CRM in India? | ChatGPT    |       ⬜       |    —     | —            | Wati, AiSensy     | —      |
| _tbd_ | Best WhatsApp CRM in India? | Perplexity |       ⬜       |    —     | —            | —                 | —      |
| _tbd_ | Best WhatsApp CRM in India? | Gemini     |       ⬜       |    —     | —            | —                 | —      |

_(Extend one row per prompt × engine each week.)_

## 3. Citation surfaces to build/earn (India-specific)

These are the pages/mentions AI engines pull from for our categories:

- **Our own citable pages:** `/erix`, `/pricing`, `/connect/whatsapp-api-guide`, comparison pages, `/laie/audit`. Must have FAQ schema and server-rendered answers.
- **Third-party review/directory presence:** G2, Capterra, SoftwareSuggest (India), Techjockey (India), Product Hunt. Indian buyers and AI engines both lean on SoftwareSuggest/Techjockey for "best CRM India" lists.
- **Comparison/listicle mentions:** get ECODrIx into "best WhatsApp CRM in India" and "Wati alternatives" articles.
- **Docs:** `docs.ecodrix.com` — well-structured docs are strong citation fodder for how-to prompts (WhatsApp API setup, automation).

## 4. Gap analysis (fill after first run)

| Prompt cluster          | Who gets cited today | Why them | Our move                                                  |
| ----------------------- | -------------------- | -------- | --------------------------------------------------------- |
| Best WhatsApp CRM India | _tbd_                | _tbd_    | Ship `/erix` + comparison pages + SoftwareSuggest listing |
| WhatsApp API pricing    | _tbd_                | _tbd_    | Publish `/connect/whatsapp-api-guide` with FAQ schema     |
| Lead-gen tools India    | _tbd_                | _tbd_    | Ship `/laie` + free audit magnet                          |

## 5. Success target

- Appear in ≥ 1 of 3 engines for **10 of the 20** buyer prompts within 90 days.
- Appear in Perplexity for all four "what is ECODrIx / vs" brand prompts (accuracy + presence).
