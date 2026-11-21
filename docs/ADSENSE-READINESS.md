# AdSense Readiness Plan

**Architect:** Claude · **Date:** 30 Sep 2026

**Rejection (16 Jul 2026): "Low value content".** Google's three criteria, with where we stand:

| Google's criterion | What it means for us | Status |
|---|---|---|
| **1. Authentic, high-quality information, tools, or services** | Tools must work well and explain themselves. No thin or duplicate pages, no false claims. | Partly fixed (A3/A5/A6/U1 live). A9/A10 + R3 pending |
| **2. Ongoing curation and structural maintenance** | Visible evidence the site is maintained: real update dates, a changelog, pruning, fixes, a regular publishing rhythm. | A8 (real dates) pending; R4 changelog pending |
| **3. Genuine user interest** + "consistent presence on the web" | Real visitors that keep growing, a brand that exists beyond the site (profiles, mentions, links). | ~30 clicks in 3 months → needs time + the distribution work below |

Google publishes **no minimum** traffic, age or page count. Reapplying before criteria 2 and 3 visibly improve will very likely get the same answer.

---

## Code tasks for Cursor (after Phase 1 A8–A10)

### R1. Real About page — `app/about/page.tsx`
Sections:
- Who builds WorkUtilities (Pavan Kumar, Hyderabad, background)
- Why the site exists (one site for everyday India/USA work tasks)
- How tools are built and tested (browser processing, what is server-processed and why, how accuracy is checked)
- Contact

Add an `Organization` + `Person` JSON-LD with `sameAs` links to the social profiles from the Pavan tasks below.

**Cursor:** build the structure with `TODO(Pavan)` placeholders for the bio, photo and profile links. Do not invent personal details.

### R2. Editorial & Accuracy Policy — `/editorial-policy`
Cover:
- How tool formulas and official specs are sourced (official sites only)
- How often they are reviewed ("Verified <month year>" labels)
- How to report an error (contact link)
- How AI assistance is used, if at all (honest statement)
- Corrections policy

Link it in the footer and from every "Sources" block.

### R3. Methodology + Sources block on calculators
New server component `components/tool-shell/Methodology.tsx`, rendered by ToolShell when the tool has `methodology` data in `lib/tool-seo-content.ts`:
- **How it's calculated:** formula in plain words (+ the formula)
- **Worked example:** real numbers → result (must match what the tool outputs; add a unit test that runs the example through `lib/<tool>.ts`)
- **Assumptions & limits**
- **Sources:** official links only (incometax.gov.in, epfindia.gov.in, IRS.gov, UIDAI…), plus a "Verified <month year>" line

**Roll out first to the top 20:** EMI, CTC, Income Tax, Tax Regime, HRA, GST, SIP, FD, PPF, EPF, Gratuity, CGPA→%, Percentage, Paycheck, Mortgage, 401k, W-2 vs 1099, Self-employment tax, Capital Gains, Salary Hike.

**Cursor:** write formulas and examples from the existing `lib/<tool>.ts` code (the maths is already there). Mark source links `TODO(verify)` unless they're the obvious official domain. Pavan reviews before merge.

### R4. "What's new" changelog — `/changelog`
- Driven by a data file `lib/changelog.ts` (date, title, one line, link).
- Seed it with real entries: Word Compress launch; Phase 1 fixes (faster pages, clearer privacy labels, FAQ, new tool layout).
- Link it from the footer and the homepage ("Latest: …").
- Add an entry for every future release. This is visible proof of "ongoing maintenance".

### R5. Contact & legal check
- The contact form works end to end (Web3Forms key in Vercel). Also show a plain email address.
- Privacy policy covers:
  - Google AdSense / third-party vendors using cookies
  - Personalised ads and the opt-out link (Google Ads Settings)
  - Analytics (GA4, Vercel)
  - The server-processed tools and their deletion policy
- Terms page is current.

### R6. Consent (for later)
We get UK/EU visitors (UK was ~7% of impressions), so after approval, turn on AdSense **Privacy & messaging → European regulations message** (Google's certified consent banner). No code needed now; noted so it isn't missed.

**Done when:** R1–R5 are live, `npm run seo:audit` passes, footer links (About, Editorial policy, Changelog, Contact, Privacy, Terms) work on every page.

---

## Pavan's tasks (not code) — criterion 3: presence and interest

1. **Brand profiles** with the same name/logo: YouTube, Instagram, X, and a LinkedIn page. Put the links in R1 `sameAs` and the footer.
2. **Weekly rhythm for the next 4–6 weeks:**
   - 2–3 YouTube Shorts/Reels (screen recordings of one tool solving one real problem)
   - Answer 3–5 real questions on Reddit/Quora/Telegram exam groups with the tool link
   - 1 genuinely useful blog post or tool update, logged in the changelog
3. **Listings:** AlternativeTo, SaaSHub; Product Hunt launch for Word Compress (and PPT/Excel compress when ready).
4. **Track weekly** in Search Console: clicks, impressions, top queries. Share the export every 2 weeks and we adjust.

---

## Reapply gate (all must be true)

- [ ] Phase 1 A8, A9, A10, C live
- [ ] R1–R5 live
- [ ] ≥ 4 weeks since those went live, with at least weekly visible updates (changelog/posts)
- [ ] GSC clicks trending up for 3+ consecutive weeks (Google gives no number; this is our own bar)
- [ ] No broken pages, placeholders or "coming soon" anywhere (`seo:audit` clean)

Then: AdSense → Sites → workutilities.com → **Request review**. If it's rejected again, record the exact reason here and audit again. Never resubmit the same week.
