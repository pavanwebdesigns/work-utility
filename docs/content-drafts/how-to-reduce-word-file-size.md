---
slug: how-to-reduce-word-file-size
title: "How to Reduce Word File Size (Windows, Mac & Online)"
seoTitle: "How to Reduce Word File Size — Windows, Mac & Online"
description: "Why .docx files get big and 5 ways to shrink them: compress pictures in Word on Windows or Mac, stop embedding fonts, save as .docx, or use a free browser tool that never uploads your file."
category: PDF & Documents
cta: { toolName: "Compress Word Document", toolHref: "/tools/word-compress" }
related: ["/tools/word-compress", "/tools/word-to-pdf", "/tools/pdf-compress", "/tools/image-compress"]
status: DRAFT — publish after the core-cut PR is live
---

<!-- Cursor: convert to app/blog/content/how-to-reduce-word-file-size.tsx using the same components as other posts.
     Keep headings, tables and the screenshots placeholders. Replace [SCREENSHOT: …] with real screenshots from our own tool/Word (Pavan to capture). -->

A Word document that is only a few pages long can still be 10 MB, 20 MB or more, which is too big to email, upload to a job portal, or attach to a college or government application. The text is almost never the problem. **Pictures are.** This guide explains why .docx files get large and shows five ways to make them smaller: three inside Microsoft Word, one in how you save the file, and one free online method that keeps your document on your own device.

## Why is my Word file so large?

A .docx file is a ZIP package. Inside it, Word keeps your text as small XML files and every picture as a separate image file in a `word/media` folder. When you paste a phone photo into a document, Word usually stores the **full original image**: often 3000–4000 pixels wide and 2–5 MB each. It does this even if the picture is shown at 5 cm on the page.

The most common causes of a large Word file:

| Cause | Typical size impact |
|---|---|
| Phone photos or scanned images pasted at full resolution | 2–5 MB per photo |
| Screenshots saved as PNG | 0.3–2 MB each |
| Cropped pictures (Word keeps the cropped-away part) | Same size as the uncropped original |
| Embedded fonts | 0.5–10 MB depending on the fonts |
| Old .doc format instead of .docx | Usually larger than the same content as .docx |

So the fix is almost always: **make the pictures smaller and remove data you can't see.**

## Method 1: Compress pictures in Word (Windows)

1. Open the document and click any picture.
2. Go to **Picture Format → Compress Pictures**.
3. **Untick** "Apply only to this picture" so every image in the file is compressed.
4. Tick **"Delete cropped areas of pictures"**.
5. Choose a resolution:
   - **Web (150 ppi)** for most documents that will be read on screen
   - **E-mail (96 ppi)** when the size limit is strict
   - **Print (220 ppi)** only if the document will be printed with photos
6. Click **OK**, then **save** the file.

To stop Word from keeping huge originals in future, open **File → Options → Advanced → Image Size and Quality**. Then:
- make sure **"Do not compress images in file"** is *not* ticked
- tick **"Discard editing data"**
- set the default resolution to 150 ppi

[SCREENSHOT: Compress Pictures dialog in Word for Windows]

## Method 2: Reduce file size in Word for Mac

Word for Mac has a dedicated menu for this:

1. Go to **File → Reduce File Size…**
2. Pick a picture quality. "Best for viewing on screen" or "Best for sending in email" give the smallest files.
3. Tick **"Delete cropped areas of pictures"**.
4. Choose **"All pictures in this file"**, click **OK**, and save.

You can also select a picture and use **Picture Format → Compress Pictures** for the same options.

## Method 3: Stop embedding fonts

If you (or whoever made the template) turned on font embedding, every font used in the document is stored inside the file.

- **Windows:** File → Options → **Save** → untick **"Embed fonts in the file"**, then save.
- **Mac:** Word → Preferences → **Save** → untick **"Embed TrueType fonts"**.

Only keep fonts embedded if the reader must see an unusual font exactly. Standard fonts like Calibri, Arial or Times New Roman don't need it.

## Method 4: Save as .docx (not .doc) and "Save As" a fresh copy

- If the file name ends in **.doc**, use **File → Save As → Word Document (.docx)**. The modern format is compressed and is usually smaller.
- After deleting a lot of content or pictures, use **File → Save As** with a new name. A fresh save writes a clean package without leftovers from earlier edits.

## Method 5: Compress the Word file online, without uploading it

If you don't have Word installed, are on a phone, or have many pictures to fix, use our free [Compress Word Document](/tools/word-compress) tool.

1. Open [Compress Word Document](/tools/word-compress) and drop your .docx file (also .docm and .dotx).
2. Pick a level:
   - **Light:** pictures up to 2400 px, highest quality
   - **Recommended:** pictures up to 1600 px, best balance for most files
   - **Strong:** pictures up to 1200 px, smallest file
3. Click **Compress Word file** and download the result.

**What it does:**
- Opens the .docx in your browser.
- Resizes and re-compresses large photos.
- Converts large screenshots without transparency to JPEG *only when that makes them smaller*.
- Removes the hidden thumbnail preview.
- Rebuilds the file.

Text, headings, tables and layout stay the same. Before giving you the file, it checks that the new document still opens correctly. If anything looks wrong it returns your original instead.

**Your file is never uploaded.** All processing runs in your browser on your device, so it works for resumes, ID scans and private reports.

### Our test result

We built a test document with one 3000 × 2000 photo (2.4 MB) and one 1800 × 1200 screenshot (209 KB), then compressed it at the Recommended level:

| | Size |
|---|---|
| Original .docx | 2.6 MB |
| After compression | 487 KB |
| Saving | **82% smaller** |

The photo went from 2.4 MB to 283 KB (resized to 1600 px wide). The screenshot was left as it was, because converting it would not have made it smaller. Your results depend on how many photos the document has. Text-only documents are already small and won't shrink much.

[SCREENSHOT: Compress Word Document result card showing before → after]

## Which method should I use?

| Situation | Best method |
|---|---|
| You have Word on Windows | Method 1 (Compress Pictures), then Method 3 if fonts are embedded |
| You have Word on Mac | Method 2 (Compress Pictures) |
| No Word, on a phone, or you want it done in one click | Method 5 ([Compress Word Document](/tools/word-compress)) |
| The portal needs a PDF, not Word | Convert with [Word to PDF](/tools/word-to-pdf), then [Compress PDF](/tools/pdf-compress) if it's still too big |
| Still too big after compressing | Use the Strong level, or remove pictures that aren't needed |

## Common questions

**Will compressing reduce the quality of my document?**
Text, fonts and layout are not changed. Pictures are resized to match how big they appear on the page, so on screen they look the same. When zoomed in or printed large they can look slightly softer, especially at Strong.

**Why didn't my file get smaller?**
Most likely it has few or no pictures. A text-only Word file is usually under 100 KB, and there is nothing large to remove. Check also whether fonts are embedded (Method 3).

**Can I compress an old .doc file?**
The online tool works with .docx, .docm and .dotx. Open the .doc in Word, Google Docs or LibreOffice, save it as .docx first, then compress it.

**How do I get a Word file under 1 MB?**
Use Compress Pictures at 96 ppi (Word) or the Strong level ([Compress Word Document](/tools/word-compress)), turn off embedded fonts, and remove any pictures you don't need. If the portal accepts PDF, converting to PDF and compressing is often the smallest option.

**Is it safe to compress confidential documents online?**
With our Compress Word Document tool the file is processed inside your browser and is never sent to a server. Many other online compressors upload your file to their servers, so check before using them for private documents.

---
*Published by WorkUtilities. Steps checked against Microsoft Word for Microsoft 365 (Windows and Mac) menu names. Menu names can differ slightly in older Word versions.*
