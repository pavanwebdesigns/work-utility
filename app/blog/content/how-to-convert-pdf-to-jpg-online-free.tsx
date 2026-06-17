import Link from "next/link";

const faqs = [
  {
    question: "Does converting a multi-page PDF to JPG create one image or multiple?",
    answer:
      "Each page of the PDF converts into its own separate JPG image — a 5-page PDF produces 5 individual JPG files.",
  },
  {
    question: "Will the image quality be good enough to print?",
    answer:
      "Image quality depends on the resolution used during conversion — higher resolution settings produce sharper images suitable for printing, while lower resolution is fine for quick sharing or previews.",
  },
  {
    question: "Is my PDF uploaded to a server during conversion?",
    answer:
      "No — the conversion runs entirely in your browser using client-side JavaScript. Your file is never uploaded or sent anywhere.",
  },
  {
    question: "Can I convert a password-protected PDF to JPG?",
    answer:
      'You\'ll typically need to remove the password protection first (a separate "Remove PDF Password" step) before the page content can be converted to images.',
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

export default function HowToConvertPdfToJpgOnlineFreeContent() {
  return (
    <article className="prose-custom">
      <p>
        Sometimes you need a document page as an image, not a PDF — for sharing
        on platforms that reject PDFs, inserting into a presentation, or quick
        visual preview. Our free{" "}
        <Link href="/tools/pdf-to-jpg">PDF to JPG Converter</Link> runs entirely
        in your browser with nothing uploaded to a server.
      </p>

      <hr />

      <h2>Why Convert PDF to JPG</h2>
      <ul>
        <li>
          Sharing a single page on platforms that don&apos;t accept PDFs (social
          media, messaging apps, image-only forms)
        </li>
        <li>Inserting a document page into a presentation or image editor</li>
        <li>
          Creating a quick visual preview without opening a PDF viewer
        </li>
      </ul>

      <hr />

      <h2>What Happens to Multi-Page PDFs</h2>
      <p>
        Each page converts to its own separate JPG image — a 10-page PDF
        produces 10 individual files, not one combined image. This surprises
        some first-time users, but it&apos;s what makes per-page sharing and
        uploading practical.
      </p>

      <hr />

      <h2>Quality and Resolution</h2>
      <p>
        Image quality depends on the conversion resolution. Higher resolution
        produces sharper images suitable for printing or zooming; lower
        resolution is fine for quick sharing or previews. If the tool offers a
        quality setting, choose based on how you plan to use the output.
      </p>

      <hr />

      <h2>Privacy: Browser-Only Conversion</h2>
      <p>
        Conversion happens entirely in your browser — your PDF is never uploaded
        to a server. That matters for documents containing personal,
        financial, or confidential content.
      </p>

      <hr />

      <h2>Frequently Asked Questions</h2>
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

      <h2>Related Reading</h2>
      <ul>
        <li>
          <Link href="/blog/how-to-convert-word-to-pdf-free">
            How to Convert Word to PDF Free
          </Link>
        </li>
        <li>
          <Link href="/blog/convert-pdf-to-word-free">
            How to Convert PDF to Word Free
          </Link>
        </li>
        <li>
          <Link href="/blog/complete-pdf-tools-guide-india">
            Complete PDF Tools Guide
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/pdf-to-jpg">Convert PDF to JPG Now →</Link>
      </p>
    </article>
  );
}
