# New Tool Spec: Compress Word (DOCX) — `/tools/word-compress`

**Architect:** Claude · **Developer:** Cursor · **Date:** 30 Sep 2026
**Status:** approved to build · **Branch:** `feature/word-compress` (created from `main`)

---

## 1. Why

- People search "compress word document", "reduce docx file size", "compress word file to 1MB/500KB". Typical reasons: email limits, job portals, college and government uploads. That's our exact audience (India and USA).
- Competition is weak. Most results are blog posts telling users to convert to PDF, or small AI-deck sites. The big PDF brands don't have a real Word compressor.
- It fits our stack: a `.docx` is a ZIP. Almost all of the size is embedded images in `word/media/`. We already ship `jszip`, `mammoth` and `comlink`, so it can run **100% in the browser** (`processing: "browser"`), and that makes a strong privacy claim true.
- The same engine then powers **Compress PowerPoint** (`ppt/media/`, usually a bigger demand) and **Compress Excel** (`xl/media/`) with little extra work.

Checked: no existing Word/DOCX compress tool in `lib/tools-data.ts`, `app/tools/` or `lib/`.

---

## 2. Scope

**In scope (v1):**
- `.docx` input (also accept `.docm` and `.dotx`, which have the same ZIP structure).
- Compress embedded raster images.
- Remove the thumbnail preview.
- Maximum ZIP compression.
- Before/after size report.
- One file at a time, up to 100 MB.

**Out of scope (v1):**
- Legacy binary `.doc`. Show the message: "Old .doc format. Open it in Word or Google Docs and save as .docx, or convert it with our Word to PDF tool". A later version could convert it server-side with LibreOffice.
- "Compress to exact KB" target mode (v2).
- Batch of many files (v2).

---

## 3. Engine — `lib/office-compress.ts` (pure logic, unit-tested)

```
compressOfficeFile(file: File | ArrayBuffer, options: {
  level: "light" | "recommended" | "strong",
  removeEmbeddedFonts?: boolean   // default false
}, onProgress?: (p: {done: number, total: number, stage: string}) => void)
→ Promise<{ blob: Blob, originalBytes: number, outputBytes: number,
            images: { name, before, after, action: "recompressed"|"resized"|"converted"|"skipped" }[],
            notes: string[], unchanged: boolean }>
```

Write it so the media folder is a parameter. It detects `word/`, `ppt/` or `xl/` from `[Content_Types].xml` or the folder names, so PPTX/XLSX reuse it later.

**Steps:**
1. **Validate.**
   - The first bytes must be ZIP (`PK\x03\x04`).
   - If the file is an OLE/CFB (`D0 CF 11 E0`), it is either a password-protected DOCX or a legacy `.doc`. Stop with a clear message: "This file is password-protected or in old .doc format".
   - Load with JSZip. `word/document.xml` must exist.
2. **Images in `<part>/media/`**, where `<part>` is `word`, `ppt` or `xl`:

   | Level | Max long edge | JPEG quality |
   |---|---|---|
   | light | 2400 px | 0.85 |
   | recommended *(default)* | 1600 px | 0.75 |
   | strong | 1200 px | 0.60 |

   - **JPEG/JPG:** decode (`createImageBitmap`), downscale if the long edge > max, re-encode JPEG at the level's quality.
   - **PNG:** if it has any transparency, keep it PNG and only downscale if oversized. If it's **fully opaque** and level ≥ recommended, **convert to JPEG** (screenshots and photos pasted as PNG are the biggest wins). Converting means:
     - rename `imageN.png` → `imageN.jpeg`
     - update every `Target="media/imageN.png"` in **all** `*.rels` files (`word/_rels/document.xml.rels`, `header*.xml.rels`, `footer*.xml.rels`, `footnotes.xml.rels`, etc.)
     - make sure `[Content_Types].xml` has `<Default Extension="jpeg" ContentType="image/jpeg"/>`
   - **Skip, and leave untouched:** GIF (may be animated), EMF/WMF, SVG, TIFF, BMP, and any image under 20 KB.
   - **Only replace an image if the new bytes are smaller.** Record the action per image.
3. **Remove the thumbnail.** Delete `docProps/thumbnail.*`, its relationship in `_rels/.rels`, and its content-type Override if present.
4. **Optional:** `removeEmbeddedFonts`. Delete `word/fonts/*`, their relationships in `word/_rels/fontTable.xml.rels`, and the `w:embed*` elements in `word/fontTable.xml`. The UI shows the note: "Text may look different on computers without these fonts".
5. **Re-zip.** `generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 }, mimeType: <original mime> })`. Keep `[Content_Types].xml` as the first entry.
6. **Integrity check.** Re-open the output with JSZip, confirm every relationship target exists, and run `mammoth.convertToHtml` on it. If anything fails, **return the original file** with the note "Couldn't compress this file safely — original returned".
7. If `outputBytes >= originalBytes * 0.98`, return the original with `unchanged: true` and the note "This document is already optimized".

**Performance:** run it in a Web Worker via `comlink` (the pattern already in the project) with `OffscreenCanvas`. Fall back to the main thread if OffscreenCanvas is missing (older Safari). Report progress per image.

---

## 4. Page — `app/tools/word-compress/`

Follow the existing tool page pattern **now**. When Phase 1B U1 (ToolShell) and U5 (file-tool pattern) land, this page migrates with the rest.

1. **H1:** "Compress Word Document". Subtitle: "Reduce DOCX file size by compressing images — free, private, in your browser."
2. **Privacy chip:** "Runs in your browser — your document is never uploaded" (true for this tool).
3. **Dropzone:** accepts `.docx,.docm,.dotx`, max 100 MB. Supports drag-drop, click and paste.
4. **Level selector** (3 cards): Light · **Recommended** · Strong, each with a one-line description. Advanced toggle: "Remove embedded fonts".
5. **Progress:** "Optimizing image 7 of 23…".
6. **Result panel:**
   - "4.8 MB → 1.1 MB (77% smaller)"
   - "23 images optimized, 2 skipped"
   - A collapsible per-image list
   - **Download** button (same filename with `-compressed` suffix)
   - *Compress another*
   - Next steps: **Word to PDF**, **Compress PDF**
7. **Errors:** friendly messages only. Never show raw exception text.

**Registry and SEO:**
- `lib/tools-data.ts`: add `word-compress` with category PDF & Documents, `market: "global"`, `processing: "browser"`, `indexable: true` (use the new fields if A6/A10 have landed; otherwise add them when they do).
- `layout.tsx` metadata via `buildOpenGraph`:
  - Title: **"Compress Word Document Online Free — Reduce DOCX Size"** (≤ 60 chars)
  - Description: "Reduce Word (.docx) file size by compressing images. Free, no signup, runs in your browser — your file is never uploaded."
- `lib/tool-seo-content.ts` entry:
  - About (why Word files get big, how it works)
  - Use cases: email limit, job portal, college/government upload, WhatsApp
  - 5 FAQs: Will it reduce quality? · Why is my Word file so large? · Is my document uploaded? · Can I compress .doc? · How do I get it under 1 MB?
- RelatedTools: word-to-pdf, pdf-compress, image-compress, word-to-jpg.
- Homepage/mega menu: add under PDF & Documents.

---

## 5. Tests — `lib/__tests__/office-compress.test.ts`

Create small fixtures in `lib/__tests__/fixtures/` (build them with the `docx` package already in dependencies, or commit tiny real files):

| # | Fixture | Expectation |
|---|---|---|
| 1 | DOCX with 3 large JPEGs (e.g. 3000×2000) | output smaller; images ≤ max edge; mammoth parses; same number of media files |
| 2 | DOCX with an opaque PNG screenshot | converted to JPEG; `.rels` targets updated; `[Content_Types]` has jpeg; no dangling rels |
| 3 | DOCX with a transparent PNG logo | stays PNG |
| 4 | DOCX with an image in a **header** | header rels updated correctly |
| 5 | DOCX with no images | `unchanged: true`, original returned |
| 6 | Random bytes / CFB header | throws a friendly error, no crash |
| 7 | Output never larger than input | holds for all fixtures |

Canvas in Jest: mock the image-encoding function (inject an `encodeImage` dependency) so the tests check the ZIP/rels logic. Real encoding is verified manually in the browser.

---

## 6. Done when

- `npm test` passes, including the new suite.
- `npm run build` passes, and `/tools/word-compress` is static (○).
- Manual test with 4 real files: a resume with a photo, a 10+ MB report with screenshots, a doc with header logos, and a phone photo with EXIF rotation (portrait taken on a phone) inserted in a DOCX.
  - Each output opens correctly in **MS Word or Google Docs** and in LibreOffice.
  - The report shrinks by **≥ 50%**.
  - Layout and images look right.
  - The phone photo must not appear rotated or stretched.
- `npm run seo:audit` passes (if A8 has landed).
- `docs/TOOLS-INVENTORY.md` and `docs/README.md` are updated.

## 7. Next (same engine)

1. **Compress PowerPoint** `/tools/ppt-compress`: same engine with `ppt/media`. Also handle video (`.mp4` in media); v1 skips video but reports "Video not compressed".
2. **Compress Excel** `/tools/excel-compress`: `xl/media`.
3. v2: **"Compress to under X MB/KB"** mode that steps through levels until the target is met.
