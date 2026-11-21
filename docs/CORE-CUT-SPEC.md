# Spec: Core Cut — recover from site-level quality demotion

**Architect:** Claude · **Date:** 21 Nov 2026 · **Replaces:** Phase 1 A9 + A10 · **Includes:** merging A8 to main
**Why:** see `docs/REPORT-2026-11-21.md`. Indexed pages fell 271 → 46 after the Sep 2026 spam update and the Nov 2026 core update. The site was built at scale (143 posts + 130 tools in ~3 weeks), which matches the "scaled content" pattern. Recovery means **shrinking the indexed footprint to the strongest pages** and making those clearly useful.

**Rules for Cursor:**
- Do not delete any page and do not return 404/410 in this task.
- Non-core pages stay live for users but become `noindex, follow` and leave the sitemap and listings.
- One commit per step, on branch `core-cut` from latest `main`.

---

## Step 0 — Bring A8 in
Merge `phase-1-seo` (contains A8 `a0b8c02`: real dates + `seo:audit`) into the new branch. Resolve conflicts, run `npm test && npm run build`.

## Step 1 — Central index registry
Create `lib/index-policy.ts` exporting:
- `CORE_TOOLS: Set<string>`
- `CORE_POSTS: Set<string>`
- `CORE_PAGES: Set<string>`
- `isIndexable(path: string): boolean`

Everything else is non-core. All metadata, sitemap and listing code reads from this one file. Don't scatter flags.

### CORE_TOOLS (45)
- **PDF & docs:** pdf-compress, pdf-merge, pdf-split, pdf-unlock, pdf-to-jpg, pdf-to-word, word-to-pdf, image-to-pdf, word-compress
- **Images & photos:** image-compress, photo-resizer, bg-remove, heic-to-jpg, image-converter, webp-to-jpg, signature-maker
- **India money:** emi-calculator, gst-calculator, ctc-calculator, income-tax-calculator, tax-regime-comparison, hra-calculator, sip-calculator, fd-calculator, ppf-calculator, epf-calculator, gratuity-calculator, rent-receipt-generator
- **USA money:** paycheck-calculator, mortgage-calculator, 401k-calculator, w2-vs-1099-calculator
- **Students & text:** word-counter, character-counter, percentage-calculator, cgpa-to-percentage, age-calculator, text-to-speech
- **Everyday/dev with real demand:** password-generator, qr-code-generator, uuid-generator, timestamp-converter, json-formatter, unit-converter, pomodoro-timer

### CORE_POSTS (21 existing + 1 new)
- aadhaar-card-photo-size, how-to-convert-heic-to-jpg-on-windows, how-to-unlock-password-protected-pdf, how-to-create-digital-signature-india *(will be rewritten)*
- how-to-calculate-percentage-of-marks-india, word-count-for-upsc-essay-writing, leap-year-checker-guide, cgpa-to-percentage-for-job-applications
- how-to-compress-pdf-under-1mb, compress-image-under-100kb-india, how-to-resize-photo-for-government-exams, how-to-merge-pdf-on-mobile-india, how-to-split-pdf-extract-pages-india
- how-to-calculate-in-hand-salary-from-ctc, old-vs-new-tax-regime-comparison-2026, home-loan-emi-guide-india, rent-receipt-for-hra-exemption-india, how-to-start-sip-india-beginners-guide, qr-code-for-small-business-india
- 401k-vs-roth-ira-guide-usa, w2-vs-1099-tax-comparison-guide
- **NEW (added in a later step):** how-to-reduce-word-file-size

### CORE_PAGES
`/`, `/tools`, `/blog`, `/about`, `/contact`, `/privacy`, `/terms`, `/aadhaar-photo-size`, `/pan-card-photo-size`, `/passport-photo-size-india`, `/visa-photo-size`, `/driving-licence-photo-size`

## Step 2 — Apply noindex
- Tool layouts, `app/blog/[slug]/page.tsx`, and any other route: `robots: isIndexable(path) ? {index:true,follow:true} : {index:false,follow:true}`. Use one helper inside `buildOpenGraph`/metadata helpers so each layout doesn't hand-code it.
- **Done when:** a script over all built pages prints the counts of `index` vs `noindex`, and they equal the core sizes above (45 tools, 21 posts, 12 pages).

## Step 3 — Redirect true duplicates (301, `permanent: true` in `next.config.mjs`)

| From | To |
|---|---|
| /blog/aadhaar-photo-size-guide | /aadhaar-photo-size |
| /blog/passport-size-photo-dimensions-india | /passport-photo-size-india |
| /blog/passport-photo-size-requirements-india-guide | /passport-photo-size-india |
| /blog/how-to-compress-pdf-online-free | /blog/how-to-compress-pdf-under-1mb |
| /blog/how-to-split-pdf-pages-online-free-2026 | /blog/how-to-split-pdf-extract-pages-india |
| /blog/reduce-image-size-without-losing-quality | /blog/compress-image-under-100kb-india |
| /blog/old-vs-new-tax-regime-india-2025 | /blog/old-vs-new-tax-regime-comparison-2026 |
| /blog/resize-photo-for-government-forms-india | /blog/how-to-resize-photo-for-government-exams |

- Before redirecting, move any **unique, factual** section of the source into the target. Never copy privacy claims that say "never uploaded" for server tools.
- Remove the redirected posts from `posts.ts` / `contentBySlug`. Update internal links to point at the targets.

## Step 4 — Sitemap and listings show only core
- `app/sitemap.ts` includes only `isIndexable` URLs (≈ 78 + new post).
- The `/blog` index lists only CORE_POSTS. Non-core posts stay reachable at their URL but aren't listed.
- `/tools` main grid lists CORE_TOOLS by category. The other tools go into a collapsed "More utilities" section (plain links, still crawlable, but they're noindex).
- Homepage "Popular" uses only core tools: one India row and one USA row.
- Related-tools and blog CTAs prefer core targets.

## Step 5 — Thin-page guard
`npm run seo:audit` gets new rules for **indexable** pages only:
- visible words ≥ 400 for tools and ≥ 800 for posts
- unique title/description
- exactly one H1

List the failures. **Don't auto-generate filler text.** Report them so we decide per page (improve or move to non-core).

## Step 6 — Verify and ship
- `npm test`, `npm run build`, `npm run seo:audit`.
- Paste: sitemap URL count, index/noindex counts, the redirect checks (`curl -sI` shows 308/301 + location), and audit failures.
- Open a PR `core-cut → main`. **Do not merge**; the owner merges.

---

## After merge (Pavan)
1. Search Console → Sitemaps → resubmit `sitemap.xml`.
2. URL Inspection → Request indexing for the 10 most important core pages: home, /tools, photo-resizer, pdf-compress, word-compress, image-compress, emi, ctc, aadhaar-photo-size, word-counter.
3. Don't click "Validate fix" on "Crawled – currently not indexed" until ~2 weeks after the merge.
4. **Bing Webmaster Tools** (Bing sends more organic visits than Google right now): add the site, submit the sitemap, and confirm the existing IndexNow endpoint works.
5. Track weekly. Recovery from this kind of demotion is measured in **months**, not days.
