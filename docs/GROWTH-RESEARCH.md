# WorkUtilities — Growth Research: New Tools, Next-Level Plan, AdSense

**Architect:** Claude · **Date:** 30 Sep 2026 · **Status:** proposal for Pavan's review

> **How demand was judged.** We have no paid keyword tool. "Demand" below is based on:
> - what people search (recurring queries and competitor pages in search results)
> - who ranks today: big brands = hard; small, old or ugly sites = gap
> - fit with our strengths (browser processing, India + USA, existing engines)
>
> **Validate before building anything big.** Check real monthly volumes in **Google Keyword Planner** (free inside a Google Ads account, no need to run ads). After launch, watch GSC impressions for 2–4 weeks.

---

## 1. New tools — ranked list

**Score:** Demand (1–5) × Gap (1–5) × Fit (1–5). Effort: S = 1–2 days with Cursor, M = 3–6 days, L = 1–2 weeks.

### P0 — build next (highest demand × gap × fit)

| # | Tool | Market | Why it's a gap | How we build it | Effort |
|---|---|---|---|---|---|
| 1 | **Exam Photo & Signature Kit**: per-exam presets (SSC, IBPS, RRB, UPSC, NEET/JEE, **TSPSC, APPSC, TS/AP Police, DSC**), signature 10–20 KB, name + date on photo, **min–max KB**, A4 print sheet | IN | Top Indian form pain point. Competitors are small, ad-heavy sites with outdated presets. Telugu-state exams are barely covered. | Extend the photo resizer engine (fix the Part D bug first). Presets come from a data file with a "verified <date> + source link" per exam. One landing page per exam that has real, unique specs. | M |
| 2 | **Compress to exact size**: image to 20/50/100/200 KB; PDF to 100/200/500 KB/1 MB | IN + US | Huge long-tail ("compress pdf to 200kb"). Winners have one page per size. We have only generic pages. | Reuse image-compress with a "target size" binary search on quality/scale. PDF uses the existing server with target mode. 8–10 real landing pages, each with its own use-case copy. | S–M |
| 3 | **Aadhaar / ID card print tool**: e-Aadhaar PDF (with password) → front + back cropped → A4 sheet or PVC card size. Generic "ID card both sides on one page" for US driver's licences | IN + US | People search this constantly and today use photocopy shops or manual cropping. Almost no clean browser tool. | pdf.js opens password PDFs in the browser. Auto-crop presets for the e-Aadhaar layout + manual crop. Output PDF via pdf-lib. **Never upload** (Aadhaar privacy). | M |
| 4 | **Land Area Converter**: acre ↔ gunta ↔ cent ↔ ankanam ↔ sq yards ↔ bigha/biswa/kanal/marla, state-wise | IN | Every land deal needs it. Current tools are bank/realty sites with basic UI. State units differ (TG/AP gunta/cent/ankanam; Punjab kanal/marla; Bihar/UP bigha variants). | Pure calculator + a verified state unit table. Telugu/Hindi labels. One page per state (unique unit tables = real value). | S |
| 5 | **8th Pay Commission / DA / Fitment Calculator** | IN | Hot 2026 topic: 1+ crore central employees and pensioners. Mostly news articles and small tools. | Pay-matrix data (7th CPC levels) × fitment scenarios. Clearly label assumptions as **projections**, cite the official sources, and update when notified. | S |
| 6 | **Compress PowerPoint + Compress Excel** | Global | Weak competition, strong need (heavy decks for email/upload). | Same `office-compress` engine as Word (`ppt/media`, `xl/media`). | S |
| 7 | **US Visa / Passport / OCI photo presets**: US 2×2 (600×600), **DS-160**, **OCI photo + signature**, UK, Schengen, Canada | IN + US | DS-160 and OCI are big India↔USA crossover searches. Leaders charge money (passport-photo.online). | Add presets and landing pages to the photo resizer. Free, browser-only. | S |
| 8 | **Sign PDF / Fill PDF** (draw/type/upload signature, place it, add date and text) | Global | Adobe/Smallpdf dominate, but they push signups. We can win on "free, no upload, no signup". | pdf.js render + pdf-lib stamping in the browser. Reuse `signature-maker`. | M |
| 9 | **Time Card / Hours Calculator** (breaks, overtime, weekly totals, printable) | US | High volume. Ranking pages are SaaS lead-gen (Clockify, Hubstaff) with signup pushes. | Pure calculator + print/PDF export. Overtime rules by state as content. | S |

### P1 — next wave

| # | Tool | Market | Note | Effort |
|---|---|---|---|---|
| 10 | **Image to Text (OCR)** including Hindi/Telugu/Tamil | Global | Very high volume and heavy competition. Our angle is Indian languages + private. tesseract.js in a worker. | M |
| 11 | **UPI QR Code Generator** (UPI ID + amount + note, printable shop standee) | IN | Existing QR tool → dedicated page using the UPI `upi://pay` format. | S |
| 12 | **Unicode ↔ Kruti Dev converter** (+ Telugu Anu ↔ Unicode later) | IN | Constant need in government offices. Current sites are old and clunky. Mapping tables, browser-only. | S |
| 13 | **Invoice / Quotation Generator**: GST invoice for India, simple invoice for USA | IN + US | High competition but evergreen. PDF in the browser; data stays local. | M |
| 14 | **Marriage Biodata Maker** (Telugu/Hindi/English templates → PDF) | IN | Strong regional demand, mostly apps and small sites. | M |
| 15 | **Home loan prepayment / part-payment calculator** | IN | Everyone with a loan asks "prepay or invest?". Extends the EMI engine. | S |
| 16 | **Electricity bill calculator** (TGSPDCL/APSPDCL first, then more states) | IN | Regional, weak competition. Tariff data needs yearly upkeep; show a "tariff as of" date. | S |
| 17 | **Govt-exam typing test** (SSC CHSL/CGL DEST, English + Hindi) | IN | Big demand, moderate competition. | M |

### P2 — only after validation

- **US state paycheck / sales-tax pages (50 states).** Big demand, but SmartAsset/ADP dominate and the data needs yearly upkeep. Do it only if P0 US tools gain traction.
- **Resume builder.** Very crowded. Skip.

### Don't build / reconsider

- Anything that produces **fake-looking official records** (fake receipts, IDs, bank statements).
- Our existing **Pay Stub Generator**: **decided 30 Sep 2026 — no watermark** (owner decision). Keep an honest purpose line on the page ("for employers and your own records"), and when AdSense is live, consider not placing ads on this one page.
- **Rent Receipt Generator** is legitimate for HRA, but add a note: "use only for rent actually paid".

---

## 2. Taking the site to the next level — ideas and how to implement them

### A. Product (what makes users come back)

1. **Task hubs instead of a tool list.** `/exam-forms` (photo, signature, compress to KB, PDF merge, age as on date), `/salary-tax-india`, `/paycheck-tax-usa`, `/pdf`. Each hub is a real guide page with the tools embedded as steps. Implementation: a hub template + a data file listing its steps.
2. **"Kits" = chained workflows.** One upload does everything, e.g. "SSC form kit": photo → exam size + date stamp, signature → 10–20 KB, certificates → one PDF under 300 KB. Implementation: a small pipeline runner reusing the existing engines; outputs downloaded as a ZIP (jszip).
3. **Android Share Target.** In the PWA manifest, add `share_target` so users can share a photo or PDF from WhatsApp or Gallery directly to WorkUtilities → the right tool opens with the file loaded. A strong differentiator for Indian mobile users. Implementation: `share_target` in `site.webmanifest` + a service-worker route that hands the file to the tool page.
4. **Telugu + Hindi UI for the top 10 India tools** (`/te/...`, `/hi/...` with hreflang). Implementation: `next-intl` or a simple dictionary. Translate the UI + the key FAQ by hand; don't machine-dump whole articles.
5. **Result sharing.** "Share on WhatsApp" for calculator results (the page link carries the inputs in the URL so the receiver sees the same result). Implementation: encode inputs in query params and read them on the client (like the photo-resizer preset).
6. **Local history / favourites** (already partly there): "Recently used tools" on the homepage from localStorage. No files are stored.

### B. Trust & quality (Google + AdSense + users)

7. **Real author and company identity.** The About page tells the real story (who builds it, where, why), with a photo and LinkedIn. Add an "Editorial & accuracy policy" page. Each finance/exam page shows "Sources: <official link> · Verified <month year>".
8. **Methodology blocks on calculators.** Formula, worked example, limitations. This is exactly what AdSense reviewers and Google look for on tool sites.
9. **Fewer, better posts.** After the A9 merges, rewrite the top 20 guides with first-hand examples, screenshots from our own tool and official links. Then publish **2–3 genuinely useful posts per week**, not batches of 30.

### C. Performance

10. Make `ToolSeoContent` a server component (≈ −80–100 KB JS per tool page; already in the U8 spec). Lazy-load heavy libraries. Target Lighthouse mobile ≥ 85 on the top 10 pages.

### D. Distribution (traffic that doesn't depend on Google)

11. **YouTube Shorts / Instagram Reels:** 30-second "how to resize SSC photo to 20 KB" screen recordings, one per exam and one per tool. Link in bio/description to the exact tool.
12. **Telegram / WhatsApp exam groups and Reddit** (r/india, r/IndiaInvestments, r/personalfinance, r/USPS…). Answer real questions with the tool link; don't spam.
13. **Embeddable widgets.** An "EMI calculator for your website" embed code (iframe + a "Powered by WorkUtilities" link). Bloggers and small finance sites embed it, and **every embed is a backlink**. It's the classic calculator-site link strategy.
14. **Launches:** Product Hunt / Hacker News "Show HN" for the privacy-first browser tools (Word/PPT compress, Sign PDF). Listings on AlternativeTo and SaaSHub.
15. **Sister site cross-links:** workprompts.in ↔ workutilities.com in relevant places only.

### E. Measure

16. GA4 events per tool: `tool_start`, `tool_success`, `download`, `error`. A weekly review of the top tools by usage + GSC queries decides what to build next.

### F. Money (after traffic)

17. **AdSense** (see section 3).
18. **Affiliates:** India loans/credit cards (BankBazaar/Paisabazaar-type programs) on the EMI/CTC/tax pages; US: tax software/banking offers on the paycheck/401k pages. Clearly labelled.
19. **Later:** "Pro" (no ads, batch processing, bigger files) at ₹99/month or $3/month, plus a small API for the compress/convert engines.
20. When US traffic grows: premium ad networks (Ezoic now, Mediavine/Raptive once traffic qualifies).

---

## 3. AdSense rejection — likely causes and fix plan

**Rejection email (16 Jul 2026)** only says "You need to fix some issues before your site is ready for AdSense" — the specific reason is shown only in the dashboard. **Get the exact reason:** open the AdSense dashboard → Sites → workutilities.com → the status message ("Low value content", "Site down or unavailable", "Policy violations", "Valuable inventory: no content"…). The fix depends on it.

**Most likely reason for this site: "Low value content".** The site had the patterns reviewers penalise:

| Pattern | Our site (before Phase 1) | Status |
|---|---|---|
| Many similar, templated pages published at once | 143 posts in ~3 weeks, several on the same topic | A9 merges + C rewrites (pending) |
| Thin tool pages / screens without content | Photo resizer showed "Loading…"; FAQ answers hidden; 27 thin dev tools | ✅ A3/A5 fixed; A10 noindex pending |
| Claims not matching reality | "Never uploaded" on server tools | ✅ A6 fixed |
| Placeholder/unfinished UI | "Ad space" placeholder in an old layout | ✅ removed with U1 |
| Weak publisher identity | Generic About page | To do (idea 7) |
| Risky generators | Pay stub generator | Decided: no watermark; honest purpose line |
| Young site, little traffic | Site ~4 months old, ~30 clicks/3 months | Time + distribution |

Google publishes no minimum traffic or site age, but reapplying immediately after small edits usually fails again.

**Plan:**
1. Finish Phase 1: A8 (dates), A9 (merges), A10 (noindex + market), C (quick wins).
2. Rewrite the About page, add an Editorial policy, add a methodology + sources block to the top 20 calculators, and decide on the Pay Stub Generator.
3. Check the privacy policy mentions AdSense/cookies correctly and that `ads.txt` is live (it is).
4. Wait ~3–4 weeks after these changes are live, while traffic grows from the new tools and distribution.
5. **Reapply** via AdSense → Sites → "Request review". If rejected again, note the exact reason and audit again. Don't resubmit the same day.

---

## 4. Suggested order (next 6–8 weeks)

1. **Now:** Phase 1 A8 → A9 → A10 → C (SEO cleanup) + AdSense prep items 2–3.
2. **Tools wave 1 (P0 quick):** PPT + Excel compress, Land Area Converter, 8th CPC calculator, Time Card calculator, US/DS-160/OCI photo presets.
3. **UX:** U2 theme, U3 photo resizer redesign (the base for the Exam Kit), U4 calculators, U8 performance.
4. **Tools wave 2 (P0 big):** Exam Photo & Signature Kit, compress-to-exact-size pages, Aadhaar/ID print tool, Sign PDF.
5. **Growth:** Share Target, WhatsApp result sharing, embeddable EMI widget, Shorts channel, Telugu/Hindi UI for the top tools.
6. **AdSense reapply** after 1–2 are live for ~3–4 weeks.

Each tool gets its own `docs/TOOL-SPEC-<name>.md` before Cursor starts (like Word Compress).
