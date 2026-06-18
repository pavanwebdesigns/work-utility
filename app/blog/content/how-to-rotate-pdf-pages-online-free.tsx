import Link from "next/link";

const faqs = [
  {
    question: "Does rotating a PDF page change its content or just the display orientation?",
    answer:
      "It changes the actual page orientation in the saved file — the rotation is permanent in the downloaded PDF, not just how it displays in your current viewer.",
  },
  {
    question: "Can I rotate just one page in a multi-page PDF?",
    answer:
      "Yes — each page can be rotated independently, or you can rotate all pages at once if the whole document is misoriented.",
  },
  {
    question: "Will rotating a PDF reduce its quality?",
    answer:
      "No — rotation just changes orientation metadata and page transform. It doesn't re-compress or alter the actual content.",
  },
  {
    question: "Why do scanned documents often come out sideways?",
    answer:
      "This usually happens when a physical page was fed into a scanner in landscape orientation, or a phone camera photo was taken sideways before being converted to PDF.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function HowToRotatePdfPagesOnlineFreeContent() {
  return (
    <article className="prose-custom">
      <p>
        A sideways scan is one of those small frustrations that wastes real time — you open a PDF, tilt your head, and wonder why the page wasn&apos;t saved the right way up. Use our free{" "}
        <Link href="/tools/pdf-rotate">PDF Rotate</Link> tool to fix orientation permanently, then read on for when and how to rotate pages correctly.
      </p>

      <hr />

      <h2>Why PDF Pages End Up Rotated Wrong</h2>
      <p>
        Scanned documents often arrive sideways because the physical page was fed into a flatbed or document scanner in landscape orientation, even though the content reads in portrait. Phone camera scans have the same problem — a quick photo taken at an angle before conversion to PDF.
      </p>
      <p>
        Merged documents are another common source. When you combine PDFs from different scanners, cameras, or software exports, each source may use a different default orientation. One chapter lands upright while the next is rotated 90 degrees.
      </p>

      <hr />

      <h2>Rotate Individual Pages vs. the Whole Document</h2>
      <p>
        If every page in the file is misoriented the same way, rotating all pages at once is fastest. If only a few pages are wrong — say, one landscape chart inserted into a portrait report — rotate those specific pages independently and leave the rest unchanged.
      </p>
      <p>
        Our <Link href="/tools/pdf-rotate">PDF Rotate tool</Link> shows a thumbnail preview for each page so you can see exactly what will change before downloading.
      </p>

      <hr />

      <h2>The Fix Is Permanent in the Downloaded File</h2>
      <p>
        Some PDF viewers let you rotate a page temporarily for reading. That viewer-side rotation resets when you close the file or open it on another device. A proper rotate tool writes the new orientation into the PDF itself — so the corrected file opens correctly everywhere, including when you email it, print it, or upload it to a portal.
      </p>

      <hr />

      <h2>Related PDF Tools</h2>
      <p>
        For a full overview of free PDF tools — compress, merge, split, convert, and more — see our{" "}
        <Link href="/blog/complete-pdf-tools-guide-india">Complete PDF Tools Guide</Link>.
      </p>
      <p>
        If your PDF is password-protected and won&apos;t open, you may need to unlock it first:{" "}
        <Link href="/blog/how-to-unlock-password-protected-pdf">How to open a password protected PDF</Link>.
      </p>

      <hr />

      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {faqs.map((faq) => (
        <div key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}

      <hr />
      <p><Link href="/tools/pdf-rotate">Rotate PDF Pages Now →</Link></p>
    </article>
  );
}
