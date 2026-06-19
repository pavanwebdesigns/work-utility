import Link from "next/link";

const faqs = [
  {
    question: "Why would I convert a Word doc to a JPG?",
    answer:
      "Common reasons include sharing without allowing edits, embedding in a presentation or email where images are needed, or creating a visual preview without the recipient needing Word installed.",
  },
  {
    question: "What happens to complex formatting in conversion?",
    answer:
      "Simple formatting (text, basic tables, headings) generally converts well. Complex elements like custom fonts, advanced table styles, or embedded objects may not render perfectly in a browser-based converter.",
  },
  {
    question: "What's a better option for complex documents?",
    answer:
      "Save from Word as PDF first, then use the PDF to JPG tool on this site — PDF-to-image conversion typically gives cleaner results for complex layouts.",
  },
  {
    question: "Can I convert multiple pages?",
    answer:
      "The tool outputs your document as a single continuous JPG image covering the full rendered document height. Multi-page documents become one tall image, not separate JPG files per page.",
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

export default function HowToConvertWordToJpgOnlineFreeContent() {
  return (
    <article className="prose-custom">
      <p>
        Need to share a Word document as a non-editable image? Our free{" "}
        <Link href="/tools/word-to-jpg">Word to JPG Converter</Link> uploads a .docx file and downloads it as a JPG in your browser — no Microsoft Word required on the recipient&apos;s side.
      </p>
      <hr />
      <h2>Why Convert Word to JPG?</h2>
      <ul>
        <li><strong>Share without edit access</strong> — a JPG cannot be modified like a DOCX.</li>
        <li><strong>Embed where images are accepted</strong> — social posts, email signatures, chat apps.</li>
        <li><strong>Visual previews</strong> — thumbnails or quick previews without sending the source file.</li>
        <li><strong>Certificates and letters</strong> — share formal documents as fixed images.</li>
      </ul>
      <hr />
      <h2>Limitations of Browser-Based Conversion</h2>
      <p>
        Simple layouts (headings, paragraphs, basic tables) convert well. Complex formatting — custom fonts, advanced table styles, embedded objects with special positioning — may not render perfectly. For those cases, save from Word as PDF first, then use our{" "}
        <Link href="/tools/pdf-to-jpg">PDF to JPG converter</Link> for cleaner results.
      </p>
      <hr />
      <h2>Single Continuous JPG Output</h2>
      <p>
        The converter renders your full document and captures it as one JPG image. Multi-page documents produce a single tall image rather than separate files per page — ideal for quick sharing, but not for page-by-page extraction.
      </p>
      <hr />
      <h2>Related Reading</h2>
      <ul>
        <li>
          <Link href="/blog/how-to-convert-pdf-to-jpg-online-free">How to Convert PDF to JPG Online Free</Link>
        </li>
        <li>
          <Link href="/blog/complete-pdf-tools-guide-india">Complete PDF Tools Guide India</Link>
        </li>
      </ul>
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
      <p>
        <Link href="/tools/word-to-jpg">Convert Word to JPG Now →</Link>
      </p>
    </article>
  );
}
