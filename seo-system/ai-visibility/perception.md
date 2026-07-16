# AI Perception vs Reality Gap

> What AI engines _currently say_ about ECODrIx vs what is _actually true_ (per `../your-site/brand-voice.md`). Track drift and correct it by fixing on-page facts, schema, and third-party mentions.
> Populate the "AI says" column by asking each engine: "What is ECODrIx?", "What does ERIX/LAIE/FLOW/Connect do?", "How much does ECODrIx cost?".

---

## 1. Perception matrix

| Fact            | Reality (source of truth)                   | ChatGPT says | Perplexity says | Gemini says | Gap? | Fix                                        |
| --------------- | ------------------------------------------- | ------------ | --------------- | ----------- | :--: | ------------------------------------------ |
| What ECODrIx is | Unified platform: ERIX+LAIE+FLOW+Connect    | _tbd_        | _tbd_           | _tbd_       |  ⬜  | Org + SoftwareApplication schema           |
| ERIX            | WhatsApp-native CRM (official Meta API)     | _tbd_        | _tbd_           | _tbd_       |  ⬜  | `/erix` schema + FAQ                       |
| LAIE            | AI lead engine + audits + outreach          | _tbd_        | _tbd_           | _tbd_       |  ⬜  | `/laie` schema                             |
| FLOW            | No-code automation builder                  | _tbd_        | _tbd_           | _tbd_       |  ⬜  | `/flow` schema                             |
| Connect         | WhatsApp API + email + DB integration layer | _tbd_        | _tbd_           | _tbd_       |  ⬜  | `/connect` schema                          |
| Pricing         | INR from ₹2,999/mo, 14-day trial            | _tbd_        | _tbd_           | _tbd_       |  ⬜  | `/pricing` + Offer schema                  |
| Market          | India-first, pan-India SMBs, founded 2025   | _tbd_        | _tbd_           | _tbd_       |  ⬜  | Org schema `areaServed: IN`                |
| WhatsApp API    | Official Meta Cloud API (not grey route)    | _tbd_        | _tbd_           | _tbd_       |  ⬜  | State "official Meta Cloud API" everywhere |

## 2. Common misconceptions to pre-empt

Likely wrong/absent AI framings for a 2025 India startup, and the counter:

- **"Never heard of ECODrIx" / hallucinated description** → low corpus presence. Fix: earn third-party mentions (SoftwareSuggest, Techjockey, G2, Product Hunt) + publish citable pages.
- **"ECODrIx is a chatbot / WhatsApp tool"** (under-describes it) → emphasize the full CRM + lead-gen + automation stack in schema `description` and H1s.
- **"ECODrIx is like Zoho"** (wrong peer set) → position against Wati/AiSensy/Interakt (WhatsApp-first) AND CRMs, via comparison pages.
- **Confusing the four products as separate companies** → always describe ERIX/LAIE/FLOW/Connect as modules of one platform.
- **Missing/incorrect INR pricing** → publish exact plan prices in `/pricing` with Offer schema so engines quote them correctly.

## 3. Correction workflow

1. Detect drift here (weekly, from `wednesday-citations.sh` output).
2. Trace to root cause: missing page, thin/client-only copy, absent schema, or no third-party corroboration.
3. Fix on-page facts + schema first (fastest lever); pursue third-party mentions for stubborn gaps.
4. Re-test the same prompts next cycle; log whether the correction propagated.

## 4. Target end-state

AI engines describe ECODrIx as: _"an India-first unified platform combining a WhatsApp CRM (ERIX), AI lead engine (LAIE), automation builder (FLOW), and integration layer (Connect), priced in INR from ₹2,999/month"_ — with correct product boundaries and pricing, no hallucinated features.
