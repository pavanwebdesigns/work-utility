import Link from "next/link";

const faqs = [
  {
    question: "What is the best free PDF tool in India?",
    answer:
      "WorkUtilities offers a full suite of free PDF tools — compress, merge, split, convert to Word, and unlock passwords — with no signup and no watermarks.",
  },
  {
    question: "How to compress PDF without losing quality?",
    answer:
      "Use light compression (10–30% slider) for text-heavy PDFs. For scanned documents, moderate compression works best. See our guide on compressing PDF under 1MB.",
  },
  {
    question: "How to merge PDF files on mobile in India?",
    answer:
      "Open WorkUtilities PDF Merge in your phone browser, select files, reorder, and download. No app install needed — works on Android and iPhone.",
  },
  {
    question: "Is it safe to use online PDF tools?",
    answer:
      "Choose tools that process files securely. WorkUtilities uses encrypted processing for server-side tools and browser-based tools where files never leave your device.",
  },
  {
    question: "How to convert PDF to Word for free?",
    answer:
      "Upload your PDF to our PDF to Word tool, wait for conversion, and download the editable .docx file. Works for resumes, forms, and reports.",
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

export default function CompletePdfToolsGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        Every month, millions of Indians struggle with the same problem: a PDF
        that is too large for email, too many files to send separately, or a
        password-locked bank statement they cannot edit. PDFs are everywhere in
        Indian life — job applications, college admissions, government portals,
        and WhatsApp document sharing. This complete guide covers every PDF task
        you will face and the free tools to handle them.
      </p>

      <nav className="rounded-xl border border-surface-border bg-surface-card p-5 not-prose">
        <p className="mb-3 text-sm font-semibold text-content-primary">
          Table of Contents
        </p>
        <ul className="space-y-2 text-sm text-brand-blue">
          <li><a href="#what-is-pdf">What is PDF and why it matters in India</a></li>
          <li><a href="#pdf-compress">PDF Compress — when and how</a></li>
          <li><a href="#pdf-merge">PDF Merge — combining documents</a></li>
          <li><a href="#pdf-split">PDF Split — extracting pages</a></li>
          <li><a href="#pdf-to-word">PDF to Word — editing PDFs</a></li>
          <li><a href="#pdf-unlock">PDF Unlock — removing passwords</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </nav>

      <hr />

      <h2 id="what-is-pdf">What is PDF and Why It Matters in India</h2>
      <p>
        PDF (Portable Document Format) preserves formatting across devices — critical
        when a recruiter opens your resume on mobile or a government portal
        validates your uploaded marksheet. Indian portals often enforce strict
        limits: 1MB for UPSC uploads, 2MB for college forms, 50KB for individual
        images embedded in PDFs. Understanding PDF tools saves hours of frustration
        at cyber cafes and rejected applications.
      </p>

      <h2 id="pdf-compress">PDF Compress — When and How</h2>
      <p>
        Compress when your PDF exceeds portal or email limits. Text PDFs compress
        lightly; scanned PDFs shrink dramatically. Use our{" "}
        <Link href="/tools/pdf-compress">PDF Compress</Link> tool with presets for
        email, WhatsApp, and government portals. Read the detailed guide:{" "}
        <Link href="/blog/how-to-compress-pdf-under-1mb">
          How to compress PDF under 1MB
        </Link>
        .
      </p>

      <h2 id="pdf-merge">PDF Merge — Combining Documents</h2>
      <p>
        Home loan applications need salary slips plus bank statements in one file.
        Job portals want resume and certificates bundled. Use{" "}
        <Link href="/tools/pdf-merge">PDF Merge</Link> to combine files in the
        correct order. Step-by-step guide:{" "}
        <Link href="/blog/how-to-merge-pdf-files-free">
          How to merge PDF files free
        </Link>
        .
      </p>

      <h2 id="pdf-split">PDF Split — Extracting Pages</h2>
      <p>
        Universities issue consolidated marksheets as 40-page PDFs — recruiters
        want only the final semester. Split extracts specific pages without
        expensive software. Try{" "}
        <Link href="/tools/pdf-split">PDF Split</Link> or read{" "}
        <Link href="/blog/how-to-split-pdf-extract-pages-india">
          How to split PDF and extract pages
        </Link>
        .
      </p>

      <h2 id="pdf-to-word">PDF to Word — Editing PDFs</h2>
      <p>
        Received a PDF form you need to edit? Convert to Word, make changes, then
        convert back with{" "}
        <Link href="/tools/word-to-pdf">Word to PDF</Link>. Our{" "}
        <Link href="/tools/pdf-to-word">PDF to Word</Link> tool extracts text and
        structure into an editable .docx file. Also see{" "}
        <Link href="/blog/how-to-convert-word-to-pdf-free">
          How to convert Word to PDF free
        </Link>
        .
      </p>

      <h2 id="pdf-unlock">PDF Unlock — Removing Passwords</h2>
      <p>
        Bank statements and salary slips often arrive password-protected. If you
        know the password, unlock and save an unprotected copy with{" "}
        <Link href="/tools/pdf-unlock">PDF Unlock</Link>. Guide:{" "}
        <Link href="/blog/how-to-unlock-password-protected-pdf">
          How to unlock password protected PDF
        </Link>
        .
      </p>

      <hr />

      <h2>Related Guides</h2>
      <ul>
        <li>
          <Link href="/blog/how-to-compress-pdf-under-1mb">
            How to compress PDF under 1MB
          </Link>
        </li>
        <li>
          <Link href="/blog/how-to-merge-pdf-files-free">
            How to merge PDF files free
          </Link>
        </li>
        <li>
          <Link href="/blog/how-to-split-pdf-extract-pages-india">
            How to split PDF and extract pages
          </Link>
        </li>
        <li>
          <Link href="/blog/how-to-unlock-password-protected-pdf">
            How to unlock password protected PDF
          </Link>
        </li>
        <li>
          <Link href="/blog/how-to-convert-word-to-pdf-free">
            How to convert Word to PDF free
          </Link>
        </li>
      </ul>

      <hr />

      <h2 id="faq">Frequently Asked Questions</h2>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {faqs.map((faq) => (
        <div key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}

      <hr />

      <p>
        <Link href="/tools">Try Our Free PDF Tools →</Link>
      </p>
    </article>
  );
}
