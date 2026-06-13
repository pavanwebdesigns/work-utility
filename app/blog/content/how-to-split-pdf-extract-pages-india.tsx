import Link from "next/link";

export default function HowToSplitPdfExtractPagesIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        Sunita received her consolidated marksheet as a single 42-page PDF from
        her university. Her job application needed only page 3 — the final
        semester. She didn&apos;t want to send 42 pages to every recruiter. She
        had never heard of PDF splitting. She thought you needed Acrobat Pro for
        that. You don&apos;t.
      </p>

      <p>
        Splitting a PDF is one of the most useful skills for Indian students and
        job seekers — yet most people don&apos;t know it&apos;s free and takes 30
        seconds.
      </p>

      <hr />

      <h2>What Is PDF Splitting?</h2>

      <p>
        PDF splitting separates one PDF file into smaller files — either individual
        pages or custom page ranges. You upload a multi-page PDF, select which
        pages to extract, and download only what you need.
      </p>

      <hr />

      <h2>When Do You Need to Split a PDF?</h2>

      <h3>Extract One Marksheet from Consolidated Transcript</h3>
      <p>
        Universities often issue one PDF with all semester marksheets. Recruiters
        want only the latest semester or degree certificate page.
      </p>

      <h3>Share One Page of Bank Statement</h3>
      <p>
        Loan applications need 3 months of statements — not your entire 12-month
        PDF. Extract pages 1–3 and share only those.
      </p>

      <h3>Extract a Specific Certificate</h3>
      <p>
        You scanned all certificates into one PDF for backup. Now a form asks for
        just the internship certificate — split out that page.
      </p>

      <h3>Remove Unwanted Pages</h3>
      <p>
        Sometimes you need to extract the pages you want and discard blank or
        irrelevant pages from a scanned document.
      </p>

      <hr />

      <h2>Step by Step: Split PDF Using WorkUtilities</h2>

      <ol>
        <li>
          Open the{" "}
          <Link href="/tools/pdf-split">PDF Split Tool</Link> in your browser
        </li>
        <li>Upload your PDF file — works on mobile too</li>
        <li>
          Select pages to extract — single page (page 3) or range (pages 1–6)
        </li>
        <li>Click Split and download the extracted PDF</li>
        <li>Upload the smaller file to the job portal or email it</li>
      </ol>

      <p>
        No software install. No Adobe subscription. Files stay in your browser.
      </p>

      <hr />

      <h2>Extract Single Page vs Page Range</h2>

      <p>
        <strong>Single page:</strong> Enter &quot;3&quot; to get only page 3 —
        perfect for one marksheet or certificate.
      </p>

      <p>
        <strong>Page range:</strong> Enter &quot;1–6&quot; for salary slips of 6
        months. Enter &quot;1, 3, 5&quot; for non-consecutive pages.
      </p>

      <hr />

      <h2>After Splitting: Compress If Needed</h2>

      <p>
        Extracted pages may still be large if the original was a high-resolution
        scan. If the portal has a size limit, compress the split PDF or use{" "}
        <Link href="/tools/image-compress">Image Compress</Link> on any embedded
        images first.
      </p>

      <p>
        Need to combine split pages back later? Use{" "}
        <Link href="/tools/pdf-merge">PDF Merge</Link> to recombine in any order.
      </p>

      <p>
        Sunita extracted page 3 from her 42-page marksheet, uploaded it to
        Naukri, and got a callback within a week. She still has the full PDF for
        records — but recruiters only see what they need.
      </p>

      <hr />

      <p>
        <Link href="/tools/pdf-split">Split Your PDF Now →</Link>
      </p>
    </article>
  );
}
