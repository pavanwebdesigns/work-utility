# WorkUtilities — Phase 1B Spec: Tool UX & Look-and-Feel

**Architect:** Claude · **Developer:** Cursor · **Date:** 30 Sep 2026
**Prerequisite:** Phase 1 SEO spec, Part A tasks A1–A6 merged. **U1 replaces the breadcrumb part of A7**, so do A7's other items (header link, blog links) and U1 together.

---

## 0. Findings (measured on live site, 30 Sep 2026)

| # | Finding | Evidence |
|---|---|---|
| F1 | **Main action is below the fold on mobile.** Users must scroll before they can use the tool. | Photo Resizer on 375×812: upload box starts at **1198px** (1.5 screens down), behind the page icon, H1, favourite button, a 7-row preset table and 3 inputs. Desktop 1440×900: upload at 998px, also below the fold. EMI: result starts at 831px, below the fold. |
| F2 | **No shared tool template.** All 130 tool pages copy Header/Footer/RelatedTools/ToolFeedback/ToolSeoContent/DinoGame by hand. `components/ToolLayout.tsx` exists but has 0 users (and still contains an "Ad space" placeholder). | `grep`: 131 files import Header directly; 130 render `<DinoGame />`. |
| F3 | **iPhone auto-zoom on input focus.** Calculator inputs use a 14px font, and iOS Safari zooms into any input under 16px. | EMI inputs: `font-size: 14px`, height 46px. |
| F4 | **Numbers aren't Indian-friendly.** Loan amount shows `2500000` with no grouping, and there are no lakh/crore words or sliders. | EMI calculator |
| F5 | **Desktop wastes space.** A single ~670px column sits in the middle of 1440px, leaving the sides empty. The header content doesn't align with the page content. | Screenshots at 1440×900 |
| F6 | **Dark-only theme** (`#0A0F1E`). Mass-market Indian users mostly open these pages on phones, often outdoors, to fill government or exam forms. Every major competitor in this space (iLovePDF, Smallpdf, PDF24, the exam-photo tools) defaults to light. | `tailwind.config.ts` has only dark tokens, and there's no `prefers-color-scheme` handling. |
| F7 | **Every tool page ships a 313-line Dino game** at the bottom. | `components/DinoGame.tsx` |
| F8 | **Presets are shown as a data table**, not as tappable choices. | Photo Resizer |

---

## 1. Design principles (acceptance rules for every tool page)

1. **Tool first.** On a 375×812 phone, the primary input (upload box or first field) starts within **≤ 420px** of the top. Explanatory content goes *below* the tool.
2. **Answer visible without scrolling.** For calculators on mobile, a **sticky result bar** shows the key output (e.g. "EMI ₹21,696/month") while the user edits inputs.
3. **One thumb.** Tap targets ≥ 44px. Primary buttons are full-width on mobile. Inputs use a 16px font with correct `inputMode`.
4. **India-native.** ₹ with Indian digit grouping (`25,00,000`), plus a lakh/crore helper line ("₹25 lakh"). Dates are shown as DD/MM/YYYY. Presets are named after real forms (Aadhaar, PAN, SSC…).
5. **Show the proof.** File tools show before → after (size, dimensions) and a clear ✓ when a limit is met ("48 KB — under 50 KB ✓"), or a clear warning when it isn't.
6. **Honest privacy chip.** "Runs in your browser" or "Processed on our server, deleted after", driven by the `processing` flag from A6.
7. **Fast.** Tool pages: LCP < 2.0s on a mid-range Android over 4G. No heavy library loads before the user needs it.

---

## 2. Tasks

### U1. Shared `ToolShell` component (foundation)

**Create:** `components/tool-shell/ToolShell.tsx` (server component) and small client islands where needed.

**Layout (top → bottom):**
1. Header (unchanged, see U7 for alignment).
2. Breadcrumb `Home › Tools › <Category>` with BreadcrumbList JSON-LD. This covers A7.1.
3. **Compact title row:** 40px icon + H1 on one line, a one-line subtitle, then a row of chips (privacy chip, "Free · No signup", optional "Updated <month year>"). The favourite button becomes a small icon button in this row. Max height on mobile: ~170px.
4. **Tool area** (`children`): the actual tool.
5. **Result / next steps area** (optional slot).
6. Related tools (horizontal scroll cards on mobile).
7. `ToolSeoContent`, then `ToolFeedback`.
8. Footer.

**Props:** `slug` (reads name, category, icon, processing from `lib/tools-data.ts`), `subtitle`, `children`, `aside?` (desktop right column, see U7), `result?`.

**Migration:** move all 130 tool pages to `ToolShell`. This is mechanical, so do it in batches of ~20 with a commit per batch. Each page keeps only its own tool UI. Delete the unused `components/ToolLayout.tsx`.

**DinoGame (F7):** remove it from tool pages. If you want to keep it as an easter egg, use it only on `app/not-found.tsx`, loaded with `next/dynamic` (`ssr:false`).

**Done when:**
- `grep -rl "import { Header }" app/tools | wc -l` → 0 (Header only comes via ToolShell).
- `grep -rl "<DinoGame" app/tools | wc -l` → 0.
- `npm run seo:audit` passes.
- Visual check on 5 random tools at 375px and 1440px.

---

### U2. Theme: light by default, dark optional

**Files:** `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`, Header (toggle).

**Change:**
- Convert the colour tokens (`surface-*`, `content-*`, `brand-*`) to CSS variables with a **light** set and a **dark** set. Default = follow `prefers-color-scheme`. A header toggle (sun/moon) saves the choice in `localStorage`, applied via a `data-theme` attribute on `<html>` with an inline script in `<head>` so there's no flash.
- Light palette direction: page `#F7F8FB`, cards `#FFFFFF`, border `#E3E8F0`, text `#0F172A` / `#475569`, brand blue `#2563EB`. Keep the current dark palette as the dark theme.
- All text meets WCAG AA contrast (4.5:1) in both themes. Add a quick check to `seo:audit`, or verify with Lighthouse accessibility ≥ 95.

**Done when:** at 375px with the system in light mode, every page renders light with no dark flash on reload; the toggle works and persists; Lighthouse Accessibility ≥ 95 on home, photo-resizer and emi-calculator in both themes.

---

### U3. Photo Resizer redesign (flagship India tool)

**File:** `app/tools/photo-resizer/*`, `lib/photo-resize.ts`

**New flow (mobile first):**
1. **Step 1: Choose document.** Horizontal, scrollable **preset chips** (Aadhaar · PAN · Passport · Visa · DL · Exam · Custom). Each chip shows its size underneath ("413×531 · ≤50 KB"). `?preset=` preselects a chip.
2. **Step 2: Add photo.** A big upload card with 3 options: *Choose file*, *Take photo* (mobile: `<input accept="image/*" capture="user">`), and *Paste (Ctrl+V)* on desktop. It must be visible above the fold (principle 1).
3. **Step 3: Adjust.** Crop editor (already exists: `ImageCropEditor`) with a **face-guide overlay** (oval + head/chin lines for passport-type presets) and a background colour picker (white/light blue/custom).
4. **Step 4: Result card.**
   - Preview.
   - "413 × 531 px · 47.8 KB ✓ Under 50 KB", or a warning in red if the limit wasn't met (see Part D.1 of the SEO spec).
   - Full-width **Download JPG** button.
   - Secondary actions: *Resize another*, *Compress more*.
5. The preset **reference table** moves below the tool as content ("All photo sizes at a glance"). Keep it; it's useful text for SEO.

**Desktop:** two columns. Tool on the left (~60%). On the right, a sticky "Requirements for <preset>" card: dimensions, KB, background, face coverage, and a link to the full guide page.

**Done when:**
- At 375×812, the upload card top is ≤ 420px on a fresh load.
- The whole flow works with a phone camera photo (large HEIC/JPEG).
- The result shows final KB and the ✓ state.
- Deep links `?preset=` still work.

---

### U4. Calculator pattern (apply to all India finance/student calculators)

**Create:** extend `components/calculator/CalculatorUi.tsx` with these pieces:
- `MoneyInput`: 16px font, `inputMode="numeric"`, live Indian grouping (`25,00,000`), helper text in words ("₹25 lakh"), optional **slider** underneath with sensible min/max/step per field.
- `PercentInput` and `TenureInput` (years/months toggle), same rules.
- `StickyResultBar` (mobile only): fixed to the bottom, shows the 1–2 headline outputs and updates live. It hides when the full result card is in view (IntersectionObserver).
- `ResultCard`: headline number large, breakdown below, **Copy result** and **Share on WhatsApp** buttons (`https://wa.me/?text=` with a short summary plus the page URL).
- Charts (recharts) load with `next/dynamic` only when the chart section is visible.

**Roll out first to:** EMI, CTC, GST, SIP, FD, Income Tax, Tax Regime Comparison, Salary Hike, CGPA→%, Percentage. Then do the rest.

**Done when:**
- On 375px, changing any input updates the sticky bar.
- No iOS zoom on focus (all inputs ≥16px).
- Numbers show Indian grouping.
- The EMI page's JS for first load is smaller than today (recharts not in the initial bundle). Check with `next build` output.

---

### U5. File-tool pattern (PDF, image, document tools)

**Create:** `components/file-tool/` containing `FileDropzone`, `FileQueue`, `ProcessingState` and `ResultPanel`.

- **Dropzone:** click, drag-drop and paste; shows accepted types and max size; tells users what happens to the file (privacy chip from `processing`).
- **Processing:** a progress bar with a real percentage where possible, a Cancel button, and friendly errors ("This PDF is password-protected — try Unlock PDF first" with a link).
- **Result:**
  - Before → after size ("2.4 MB → 612 KB, 75% smaller").
  - Download button.
  - "Process another".
  - **Next step suggestions** from a small map (compress → merge, pdf-to-jpg → image-compress, unlock → compress…).
- Multi-file tools (merge, image-to-pdf): drag to reorder, with thumbnails.

**Roll out first to:** image-compress, pdf-compress, pdf-to-word, word-to-pdf, pdf-merge, image-to-pdf, pdf-to-jpg, jpg/heic/webp converters, signature-maker.

**Done when:** each migrated tool shows before/after size and next-step suggestions, and errors never show raw exception text.

---

### U6. Homepage refresh

**File:** `app/page.tsx`, `components/HomePageTools.tsx`

1. **Hero = search.** A big search box, "What do you need to do? e.g. *compress PDF to 100KB*, *Aadhaar photo*", with instant results (reuse `lib/tool-categories.ts` `searchTools`). Popular chips go under it. Remove the "Try all tools free" button as the main CTA; keep it as a text link.
2. **Task-based sections** instead of one "Popular Tools" grid:
   - 📄 Govt & Exam Forms (photo resizer, signature, compress image to KB, PDF compress)
   - 💰 Salary & Tax (CTC, income tax, regime comparison, HRA, EMI)
   - 🎓 Students (CGPA→%, percentage, word counter, GPA)
   - 📑 PDF tools
   - 🖼️ Image tools

   Each section shows 4–6 cards and a "See all" link.
3. Move the "Why WorkUtilities" block below the tools and make it one compact row of 3 trust items.
4. **Recently used** row: favourites/recent tools from localStorage (FavoritesDrawer already exists). Show it only when not empty.

**Done when:** at 375×812, the search box and at least 4 tool cards are visible without scrolling.

---

### U7. Desktop layout & header alignment

- Tool pages at ≥1024px: container `max-w-6xl`, **two columns** (tool 7/12, aside 5/12). The aside is sticky and holds requirements/tips/related guide. Pages with no aside stay centred at `max-w-3xl`.
- The header inner container uses the same `max-w-6xl` + padding as the page, so the logo and nav line up with the content edges.

**Done when:** at 1440×900 the photo resizer, EMI and PDF compress show the tool **and** its output/aside above the fold.

---

### U8. Performance & polish checklist (every migrated page)

- **Big win, do first:** `components/ToolSeoContent.tsx` is a client component that imports the whole `lib/tool-seo-content.ts` map (~340 KB of text for all 130 tools). The build puts it in a shared chunk (`static/chunks/4999-*.js`, ~334 KB raw) that **every tool page downloads**, even though each page needs only its own entry.
  - Fix: make `ToolSeoContent` a **server component** that receives only its slug's content. With A5's `<details>` FAQ it no longer needs client state.
  - Verify: that chunk disappears from the tool pages' `app-build-manifest.json` entries, and First Load JS drops by roughly 80–100 KB gzipped.

- `next/dynamic` for heavy libs: recharts, pdfjs, pdf-lib, onnxruntime / background-removal, xlsx, docx, qr-code-styling, html2canvas. Load them on user action, not on page load.
- Images: `next/image`, and no layout shift (reserve space for previews).
- Focus rings visible, all controls keyboard-reachable, `aria-live="polite"` on result areas.
- Toast for copy/download success.
- Lighthouse mobile on photo-resizer, emi-calculator, pdf-compress, homepage: **Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100**. Record the scores before and after in the PR description.

---

## 3. Order of work

1. **U1 ToolShell**, together with A7 (breadcrumb, header link, blog links). Migrate in batches.
2. **U2 Theme.**
3. **U3 Photo Resizer.**
4. **U4 Calculators** (top 10 first).
5. **U5 File tools** (top 10 first).
6. **U6 Homepage.**
7. **U7 Desktop layout** (can be done inside U1 if simpler).
8. **U8** runs as a checklist on every page touched.

One task per commit, pushed to `phase-1-seo` (or a new `phase-1b-ux` branch after checkpoint 1 is merged). Stop after each task for review, and attach 375px and 1440px screenshots of 2–3 affected pages.
