# WorkUtilities — Phase 1 Spec: Fix, Focus, Prune

**Owner:** Pavan · **Architect:** Claude · **Developer:** Cursor
**Date:** 30 Sep 2026 · **Repo:** `tool-website` (Next.js 14.2 App Router, Vercel + Railway `pdf-service`)

---

## 0. How to use this spec (read first, Cursor)

- Do the tasks **in order, one task per branch/commit**. Each task has **Files**, **Change**, and **Done when** (acceptance checks).
- Do **not** redesign UI or change tool logic unless the task says so.
- After each task: `npm run build && npm start`, then run that task's `curl` checks against `http://localhost:3000`.
- Tasks marked **⚠ Decision** need Pavan's OK before merging.

### Why (evidence, 3 months of Google Search Console)

| Signal | Value |
|---|---|
| Clicks / impressions | 31 / 24,250 (CTR 0.13%), avg position ~66 |
| Tool pages (94 with impressions) | median position **70** |
| India landing pages (Aadhaar/PAN) | median position **14** |
| "Crawled – currently not indexed" | 1 → **14** pages during Sep 5–19 (Google removed already-indexed pages) |
| Daily impressions after Sep 23 | ~15/day (was 150–500). No deploy, no manual action, indexing count stable |
| Audience | Clicks: 21/31 from India. Mobile position 39 vs desktop 75 |

**Diagnosis:** not a technical outage. Google is re-rating the site as low-value: templated, overlapping pages across 130 tools + 143 posts, plus rendering/metadata bugs that hide real content from crawlers.
**Phase 1 goal:** fix every crawler-visible bug, stop pages competing with each other, focus the site on India, and rewrite the few pages already near page 1.

---

## PART A — Critical technical fixes (P0)

### A1. Root layout leaks homepage canonical + og:url to every page

**Root cause:** `app/layout.tsx` sets `alternates.canonical: "/"` and `openGraph.url: "https://workutilities.com"`. Any route that doesn't override them inherits them.
- `/tools` → canonical = homepage (it is telling Google "I'm a duplicate of the homepage").
- `/blog`, every `/blog/[slug]`, `/about`, `/contact` → og:url = homepage (wrong WhatsApp/social previews).

**Files:** `app/layout.tsx`, `app/page.tsx`, `app/tools/page.tsx`, `app/blog/layout.tsx` (or `app/blog/page.tsx`), `app/about/page.tsx`, `app/contact/page.tsx`, `app/blog/[slug]/page.tsx`

**Change:**
1. Remove `alternates` and `openGraph.url` from the root layout. Keep `metadataBase` and `openGraph.siteName`.
2. Add an explicit `alternates.canonical` + `openGraph` (`title`, `description`, `url`, `type`) to: home (`/`), `/tools`, `/blog`, `/about`, `/contact`, `/privacy`, `/terms`.
3. In `app/blog/[slug]/page.tsx` → `generateMetadata`: add `openGraph: { type: "article", url, title, description, publishedTime, modifiedTime, authors: ["Pavan Kumar"] }`.
4. Delete the `keywords` meta from the root layout and all layouts (Google ignores it; it's copy-pasted site-wide).
5. Add a default OG image, `public/og-default.png` (1200×630, logo + "Free tools for Indian students, jobs & documents"). Put it in root `openGraph.images` and `twitter.card: "summary_large_image"`.

**Done when:**
```
curl -s localhost:3000/tools | grep -o '<link rel="canonical"[^>]*>'   # → .../tools
curl -s localhost:3000/blog/aadhaar-card-photo-size | grep -o 'og:url" content="[^"]*"'  # → .../blog/aadhaar-card-photo-size
curl -s localhost:3000/ | grep -c 'name="keywords"'   # → 0
```
There must be no page where canonical ≠ its own URL (a script in A8 checks this).

---

### A2. `/tools` renders an empty list for crawlers

**Root cause:** `components/ToolsCategorySection.tsx` calls `useSearchParams()`. `app/tools/ToolsPageClient.tsx` wraps it in `<Suspense fallback={null}>`, so during static build Next.js bails out to client rendering. The HTML has **zero tool links**, which makes this the most important internal-linking page on the site.

**Files:** `app/tools/page.tsx`, `app/tools/ToolsPageClient.tsx`, `components/ToolsCategorySection.tsx`

**Change:**
- Make `app/tools/page.tsx` a server component that renders every category heading and every tool link (`<a href="/tools/...">`, name, short description) from `lib/tools-data.ts` into the HTML.
- Keep the search box and category tabs as a small client island for filtering. It may read `?category=` **after** hydration, but must not block server rendering of the list. Alternative: pass `searchParams` from the page props instead of `useSearchParams`.
- Only list **indexable** tools from A10 in the main grid. Non-indexable tools may appear under a small "More utilities" section.

**Done when:** `curl -s localhost:3000/tools | grep -o 'href="/tools/[a-z0-9-]*"' | sort -u | wc -l` ≥ number of indexable tools.

---

### A3. Photo Resizer shows only "Loading photo resizer..." to crawlers

**Root cause:** `app/tools/photo-resizer/page.tsx` wraps the whole `PhotoResizerClient` in `<Suspense>` because the client uses `useSearchParams()` to read `?preset=`. Server HTML = the fallback text only. This is our most important India tool.

**Files:** `app/tools/photo-resizer/page.tsx`, `app/tools/photo-resizer/PhotoResizerClient.tsx`

**Change:**
- Read `searchParams.preset` in the server `page.tsx` (page props) and pass `initialPreset` as a prop. Remove `useSearchParams` from the client.
- Render the H1, intro, preset list (as visible text), How-it-works, `ToolSeoContent` and related links in the server HTML. Only the interactive editor should hydrate.

**Done when:** `curl -s localhost:3000/tools/photo-resizer | grep -c "Loading photo resizer"` → 0, and the H1 plus the FAQ text are present in the HTML.

**Also check:** that no other `/tools/*` page has less than ~300 words of visible text in `curl` output. Use the audit script in A8.

---

### A4. Currency: every calculator is server-rendered in USD ($)

**Root cause:** `lib/currency-context.tsx` → `useState<Currency>("USD")`. The cookie is read only in `useEffect`, so static HTML (what Google indexes) shows `$`, and Indian users see `$` flash to `₹`. Affects: emi, sip, fd, salary-hike, inflation, compound-interest, tip, discount, number-to-words, hourly-to-salary. The EMI page says "SBI, HDFC, Mumbai" next to "$21,696".

**Files:** `lib/currency-context.tsx`, `middleware.ts`

**Change:**
1. The SSR default is **INR**. Switch to USD client-side only if localStorage or the cookie says USD.
2. US-only tools (if kept, see A10) pass a fixed `USD` and never switch.
3. `middleware.ts` currently runs on **every HTML request** and sets a cookie. That likely stops Vercel's CDN from caching static pages. Narrow the `matcher` to the currency-aware tool routes only. Verify with `curl -sI https://workutilities.com/tools/pdf-merge | grep -i x-vercel-cache` after deploy: expect `HIT` on the second request.

**Done when:** `curl -s localhost:3000/tools/emi-calculator | grep -c '₹'` > 0 and `grep -c '\$[0-9]'` → 0.

---

### A5. FAQ answers are not in the HTML

**Root cause:** `components/ToolSeoContent.tsx` renders an answer only when `isOpen`. The FAQPage JSON-LD contains answers that the visible HTML doesn't. That's wasted content, and a schema/visible-content mismatch.

**Files:** `components/ToolSeoContent.tsx` (used by all tool pages)

**Change:** Use native `<details><summary>` (or always render the answer and hide it with CSS). All answers must be in the server HTML. Keep the same styling.

**Done when:** `curl -s localhost:3000/tools/gst-calculator | grep -c "CGST"` includes the answer text.

---

### A6. Privacy claims contradict reality on server-processed tools (trust + AdSense risk)

**Root cause:** 5 tools upload to `pdf-service` on Railway: `pdf-compress`, `pdf-to-word`, `pdf-to-jpg`, `pdf-unlock`, `word-to-pdf`. `ServerPdfProcessingNotice` says so correctly, but the SEO copy, meta descriptions and blog CTAs say "never uploaded / runs entirely in your browser".

**Files:**
- `lib/tool-seo-content.ts`: slugs `pdf-compress`, `pdf-to-word`, `pdf-unlock`, `pdf-to-jpg` (about paragraph + "Is it safe" FAQ)
- `app/tools/{pdf-compress,pdf-to-word,pdf-to-jpg,pdf-unlock,word-to-pdf}/layout.tsx`: `description` / `openGraph.description`
- `app/blog/[slug]/page.tsx`: CTA box hard-codes "No signup. No upload to server. Runs in your browser." for every post
- `app/blog/content/*` for the matching guides (grep: `never uploaded|entirely in your browser|never leaves|client-side only`)

**Change:**
1. Add `processing: "browser" | "server"` to each tool in `lib/tools-data.ts`. That flag is the single source of truth.
2. Blog CTA and any "private" badge read the flag. Server wording: *"Processed on our secure server over HTTPS and deleted immediately after conversion. No signup."*
3. Rewrite the copy for the 5 server tools to match. Keep "most tools run in your browser" on the homepage.

Blog files that currently contain browser-only claims about PDF tools (verified with grep): `how-to-compress-pdf-under-1mb`, `convert-pdf-to-word-free`, `how-to-unlock-password-protected-pdf`, `how-to-convert-pdf-to-jpg-online-free`, plus 3 that A9 deletes anyway. `how-to-merge-pdf-files-free` is correct (merge runs in the browser).

**Done when:** a server-tool claim search returns nothing:
`grep -rniE "never uploaded|entirely in your browser|never leaves|client-side only" app/tools/{pdf-compress,pdf-to-word,pdf-to-jpg,pdf-unlock,word-to-pdf} app/blog/content/{how-to-compress-pdf-under-1mb,convert-pdf-to-word-free,how-to-unlock-password-protected-pdf,how-to-convert-pdf-to-jpg-online-free}.tsx`, and the four slugs' blocks in `lib/tool-seo-content.ts` no longer say it.

---

### A7. Internal linking & crawlable navigation

**Files:** all 130 `app/tools/*/page.tsx` ("← All Tools" has `href="/"`), `components/Header.tsx`, `components/BlogCategorySection.tsx`

**Change:**
1. Create a shared `components/ToolBreadcrumb.tsx`: `Home › Tools › <Category> › <Tool>` with real `<a>` links and `BreadcrumbList` JSON-LD. Replace the "← All Tools" block in all tool pages (a mechanical find/replace).
2. Header "Tools" is a `<button>` (mega menu). The only `href="/tools"` in `Header.tsx` (~line 325) sits inside `{isMobileMenuOpen && …}`, so it isn't in the HTML until the menu is opened. Add an always-rendered `<a href="/tools">` (e.g. make the "Tools" label itself a link and open the mega menu from a chevron/hover). Keep the mega menu behaviour.
3. Blog listing: "Load More" hides posts from crawlers (only 12 links in the HTML). Server-render **all** post links grouped by category, and make "Load more" a CSS/visual collapse only. Or use real paginated URLs `/blog/page/2`.
4. Each tool page's `RelatedTools` should also link its 1 best blog guide, and each guide should link back to its tool. Most already do; verify.

**Done when:** `curl -s localhost:3000/blog | grep -o 'href="/blog/[a-z0-9-]*"' | sort -u | wc -l` ≈ total indexable posts, and every tool page contains `href="/tools"`.

---

### A8. Sitemap truthfulness + an SEO audit script

**Root cause:** `app/sitemap.ts` gives every tool/static page `BUILD_DATE` (all `2026-07-17`) and every post "June 2026". Google ignores lastmod that never varies.

**Change:**
1. `scripts/generate-content-dates.mjs`: for each tool folder, content file and landing page, read `git log -1 --format=%cI -- <path>` and write `lib/content-dates.json`. Run it locally and **commit the JSON**, because Vercel's shallow clone may lack history. `sitemap.ts` uses it for `lastModified`.
2. Posts: add `publishedAt` and `updatedAt` (ISO dates) to `app/blog/posts.ts`. Show "Updated <date>" on the page, use the fields in Article JSON-LD and the sitemap. Only bump `updatedAt` when content really changes.
3. The sitemap **excludes** every `indexable: false` page (A10) and every redirected URL (A9).
4. Add `scripts/seo-audit.mjs`. It runs against `localhost:3000` for every URL in the sitemap and fails if:
   - canonical ≠ own URL
   - og:url ≠ own URL
   - no `<h1>`, or more than one
   - visible text < 300 words
   - title > 60 chars or description > 160 chars
   - duplicate title across pages
   - sitemap contains a noindexed or redirecting URL

   Add the script to `package.json` as `npm run seo:audit`.

**Done when:** `npm run seo:audit` passes with zero errors.

---

## PART B — Focus: merge duplicates and prune (P0)

### A9. Merge cannibalizing pages (301 redirects)

Google flagged overlap directly: 5 of the 14 "not indexed" pages are duplicate-topic posts. For each row: move any **unique** section of the source into the target, delete the source post (`posts.ts` entry, `contentBySlug`, content file), add a permanent redirect in `next.config.mjs`, and update every internal link that pointed to the source.

| Source (remove) | → Target (keep) |
|---|---|
| `/blog/aadhaar-photo-size-guide` | `/aadhaar-photo-size` |
| `/blog/passport-size-photo-dimensions-india` | `/passport-photo-size-india` |
| `/blog/passport-photo-size-requirements-india-guide` | `/passport-photo-size-india` |
| `/blog/how-to-compress-pdf-online-free` *(not indexed)* | `/blog/how-to-compress-pdf-under-1mb` |
| `/blog/how-to-split-pdf-pages-online-free-2026` *(not indexed)* | `/blog/how-to-split-pdf-extract-pages-india` |
| `/blog/reduce-image-size-without-losing-quality` *(not indexed)* | `/blog/compress-image-under-100kb-india` |
| `/blog/old-vs-new-tax-regime-india-2025` | `/blog/old-vs-new-tax-regime-comparison-2026` |
| `/blog/resize-photo-for-government-forms-india` | `/blog/how-to-resize-photo-for-government-exams` |
| `/blog/gst-for-freelancers-india` | `/blog/freelancer-gst-registration-guide-india` |
| `/blog/best-free-pdf-tools-online-2026` | `/blog/complete-pdf-tools-guide-india` |
| `/blog/best-free-tools-for-indian-students` | `/blog/complete-student-tools-guide-india` |

Keep `/blog/aadhaar-card-photo-size`. It is the site's best page (position 9.4, 5 clicks), so don't touch its URL.

**Done when:** each source returns `308/301` to its target, `npm run seo:audit` passes, and `grep -rn "<source-slug>" app components lib` returns nothing.

---

### A10. Prune low-value pages (noindex, keep live) — ⚠ Decision

Add `indexable: boolean` (default `true`) to tools in `lib/tools-data.ts` and to posts in `app/blog/posts.ts`. When `false`:
- The page emits `robots: { index: false, follow: true }`.
- It is excluded from the sitemap, the `/tools` main grid, the homepage and the mega-menu "popular" slots.
- The tool **still works** and stays reachable, so nothing breaks for users.

This is reversible: flip the flag later if a page earns it.

**Rule used:** not a core India/US tool AND fewer than ~30 impressions in 3 months (most have 0).

**Tools (27 noindex + 8 US kept)**
- **US finance (8): DECIDED, keep indexed.** Pavan confirmed the site targets **both India and the US**. `401k-calculator`, `401k-vs-roth-ira`, `hsa-calculator`, `w2-vs-1099-calculator`, `self-employment-tax`, `paycheck-calculator`, `mortgage-calculator`, `pay-stub-generator` stay `indexable: true` and get the same quality work as the India tools. Their US guides stay indexed too.
- **Market field (new):** add `market: "IN" | "US" | "global"` to every tool in `lib/tools-data.ts`.
  - `IN` tools render ₹ (with the switch).
  - `US` tools render $ only.
  - `global` tools (compound-interest, tip, discount, inflation, percentage, unit/currency converters…) render the visitor's currency after hydration. Server HTML stays neutral or INR as today.
  - `/tools` and the homepage get two finance groups: **"Salary & Tax — India"** and **"Paycheck & Tax — USA"**. Each page's copy talks to one market only.
- **Dev/misc (27):** `glassmorphism-generator`, `box-shadow-generator`, `htaccess-generator`, `robots-txt-generator`, `http-status-codes`, `html-entity`, `morse-code`, `lorem-ipsum`, `binary-converter`, `subnet-calculator`, `ip-lookup`, `dns-lookup`, `crypto-tracker`, `svg-previewer`, `markdown-table`, `json-schema-validator`, `keyword-density`, `roman-numeral-converter`, `random-number`, `stopwatch`, `box-breathing`, `audio-recorder`, `calorie-deficit-calculator`, `bmi-calculator`, `color-palette-generator`, `color-contrast`, `aspect-ratio`

**Posts → `indexable: false`** (their tool is pruned):
`glassmorphism-css-generator-guide`, `box-shadow-css-generator-guide`, `htaccess-generator-guide`, `robots-txt-generator-guide`, `http-status-codes-guide`, `markdown-table-generator-guide`, `json-schema-validator-guide`, `dns-lookup-tool-guide`, `ip-address-lookup-guide`, `crypto-price-tracker-guide`, `svg-code-previewer-guide`, `roman-numeral-converter-guide`, `random-number-generator-guide`, `online-stopwatch-guide`, `box-breathing-technique-guide`, `free-online-audio-recorder-guide`, `calorie-deficit-calculator-guide`, `bmi-calculator-guide`, `color-palette-generator-guide`, `subnet-calculator-guide`

**Keep indexed even though they're dev tools** (they have real impressions): `password-generator`, `uuid-generator`, `timestamp-converter`, `cron-generator`, `css-gradient`, `favicon-generator`, `json-formatter`, `text-to-speech`, `character-counter`, `number-to-words`, `word-to-jpg`, `leap-year-checker` (its guide is at position 16.8).

**Homepage:** split "Popular" into an India row (Photo Resizer, CTC, CGPA→%, EMI) and a USA row (Paycheck, Mortgage, 401k, W-2 vs 1099). Optionally show the visitor's market row first after hydration, using the currency cookie.

**Done when:** `curl -s localhost:3000/tools/glassmorphism-generator | grep -o 'noindex, follow'` matches, the sitemap no longer contains it, and the tool still works.

**Housekeeping:** `lib/tools-data.ts` uses 13 inconsistent category names ("Utility", "Utility Tools", "Images", "Image Tools", "Text", "Text & Writing Tools"…). Normalize them to ~7 categories: PDF, Images & Photos, Govt & Exam Documents, Salary & Tax (India), Money & Loans, Students, Developer & Text. The breadcrumb (A7) and `/tools` (A2) depend on this.

---

## PART C — Quick wins on pages already near page 1 (P1)

These pages rank 8–17 but get ~0 clicks. Titles must be ≤ 60 chars and answer the query in the title itself. **Fact-check every number against the official source before publishing**, and add a "Source: <official site>, verified <month year>" line on the page.

| Page | Pos | Impr | Query evidence | New title (draft) |
|---|---|---|---|---|
| `/tools/word-counter` | 8.4 | 63 | "word count online free", "count words online" | `Word Counter Online Free — Words, Characters & Pages` |
| `/blog/word-count-for-upsc-essay-writing` | 9.6 | 369 | UPSC word count | `UPSC Essay & Answer Word Limits + Free Word Counter` |
| `/blog/how-to-calculate-percentage-of-marks-india` | 12.3 | 952 | percentage of marks | `Percentage of Marks: Formula, Examples & Calculator` |
| `/pan-card-photo-size` | 14.5 | 428 | "pan card me kitne kb ka photo lagta hai" | `PAN Card Photo Size in KB & Pixels (NSDL/UTI) — Resize Free` |
| `/blog/leap-year-checker-guide` | 16.8 | 423 | leap year rule | `Leap Year Rule Explained with Examples + Free Checker` |

**C1. PAN spec conflict (must fix).** `lib/photo-resize.ts` has PAN `maxKb: 300`, while the landing page says "4.5 × 3.5 cm landscape". Verify the current Protean (NSDL) and UTIITSL photo/signature specs, then make the preset, the landing page and the FAQ agree. Put the KB answer in the first 2 lines of the page.

**C2. New page `/aadhaar-card-size` (intent gap).** Queries hitting our Aadhaar pages are about the **card itself**, not the photo: "aadhar card size in pixels" (pos 11.9), "aadhar card standard size", "aadhar card measurements", "aadhar card length", "full aadhar card size in height and width", "aadhar card size in inches". Our pages answer a different question. Build a short page covering:
- The card size in mm, cm and inches. The PVC Aadhaar is the standard ID-1 card size, 85.6 × 54 mm (**verify on uidai.gov.in**).
- Pixels at 300 DPI (≈ 1011 × 638).
- How to print e-Aadhaar front/back at card size on A4.
- A link to the photo page.

Phase 2 can add an "Aadhaar print-size cropper" tool here.

**C3. Hindi/Telugu FAQs.** Add 2–3 FAQ entries in Hindi (and Telugu where relevant) on the Aadhaar, PAN and passport pages. Real queries arrive in Hindi.

**Done when:** titles/descriptions are updated, `seo:audit` passes, and C1 values match an official source that is cited on the page.

---

## PART D — Smaller bugs found in code (P2)

1. `lib/photo-resize.ts → resizePhoto`: the quality loop stops at 0.35 and **silently returns a file larger than `maxKb`**. It should then step down dimensions or show a clear error ("Could not get under 50 KB — try a tighter crop"). Also support a **minimum** KB (SSC-type 20–50 KB ranges), and display the final KB to the user.
2. `government-exam` preset is 350×350 "35mm × 35mm", which doesn't match SSC's 3.5 × 4.5 cm. Replace it with per-exam presets in Phase 2 after checking official notifications.
3. `pdf-service/main.py` `/unlock`: temp files leak if `pikepdf.open` raises anything other than `PasswordError`. Wrap it in `try/finally` or use `TemporaryDirectory` like the other endpoints.
4. Repo hygiene: `bg-remove-test-failure.png` is tracked in git. Remove it and add `*.tsbuildinfo` to `.gitignore`.

---

## PART E — After deploy (Pavan, in Search Console)

1. Sitemaps → resubmit `sitemap.xml`.
2. URL Inspection → "Request indexing" for `/tools`, `/tools/photo-resizer`, `/tools/emi-calculator`, `/tools/gst-calculator`, `/tools/ctc-calculator`, `/aadhaar-photo-size`, `/pan-card-photo-size`, and the new `/aadhaar-card-size`.
3. Page indexing → "Duplicate without user-selected canonical" and "Crawled – currently not indexed" → **Validate fix**.
4. Track weekly (Performance, last 7 days vs previous 7): impressions, clicks, and the position of the 6 pages in Part C. Expect 3–6 weeks before re-evaluation shows up.

---

## Next phases (outline — separate specs later)

- **Phase 2 — Exam Photo & Signature Hub (growth engine):**
  - Per-exam presets for SSC, IBPS, RRB, UPSC, NEET/JEE, **TSPSC, APPSC, TS/AP Police, DSC**.
  - Signature mode (10–20 KB), name + date-on-photo, A4 print sheet.
  - Target-KB landing pages: `/compress-image-to-20kb`, `/50kb`, `/100kb`, `/compress-pdf-to-100kb`, `/200kb`.
  - Deepen core India tools (GST, CTC with state professional tax, Income Tax FY 2026-27) so each has something the big players lack.
  - A passphrase mode as its own page: "generate password from words" drove 3,500+ impressions.
- **Phase 3 — Distribution & money:**
  - WhatsApp share buttons on results, PWA install prompts on the exam hub.
  - Telegram exam-group outreach, YouTube Shorts.
  - AdSense (`ads.txt` already present) once traffic grows. Affiliate links on loan/investment calculators.
