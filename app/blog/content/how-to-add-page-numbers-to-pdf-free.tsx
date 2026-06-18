import Link from "next/link";

const faqs = [
  {
    question: "Can I start page numbering from a number other than 1?",
    answer:
      "Yes — set a custom starting number, useful when this document is an appendix or continuation of a larger numbered document.",
  },
  {
    question: "Will page numbers be added to every page including the cover page?",
    answer:
      "Check the tool's options — many page-numbering tools let you skip a cover or title page. Our tool includes a 'skip first page' option if you need the cover unnumbered.",
  },
  {
    question: "What's the difference between 'Page X' and 'Page X of Y' format?",
    answer:
      "\"Page X\" just shows the current page number, while \"Page X of Y\" also shows the total page count — useful for readers to gauge document length at a glance.",
  },
  {
    question: "Can I remove page numbers after adding them?",
    answer:
      "Typically you'd need to re-process the original (unnumbered) file rather than removing numbers from an already-numbered PDF.",
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

export default function HowToAddPageNumbersToPdfFreeContent() {
  return (
    <article className="prose-custom">
      <p>
        Page numbers turn a loose collection of pages into a navigable document — especially when someone needs to cite &quot;see page 14&quot; in a meeting or review. Use our free{" "}
        <Link href="/tools/pdf-page-numbers">Add Page Numbers to PDF</Link> tool, then read on for when numbering matters and how to set it up correctly.
      </p>

      <hr />

      <h2>Why Add Page Numbers to a PDF?</h2>
      <p>
        Reports, theses, legal filings, and contracts all benefit from consistent page numbering. When multiple people review a document — or when a printed copy gets separated from its cover — page numbers are the fastest way to stay oriented.
      </p>
      <p>
        Numbered pages also matter when a document is part of a larger set. An appendix continuing from a main report, or a supplementary filing attached to a primary submission, often needs to pick up numbering where the previous document left off.
      </p>

      <hr />

      <h2>Starting From Page 1 vs. a Custom Number</h2>
      <p>
        Most documents start at 1. But if you&apos;re numbering an appendix that continues from a 40-page main document, you might start at 41. Our tool lets you set any starting number — useful when this PDF is one piece of a larger numbered set.
      </p>
      <p>
        You can also skip the first page if it&apos;s a cover or title page that shouldn&apos;t be numbered, while numbering the body starting from your chosen number.
      </p>

      <hr />

      <h2>Common Position Conventions</h2>
      <p>
        Bottom-center is the most traditional placement for printed documents — readers expect to find page numbers in the footer. Top-right is common in business documents and slide-deck exports. Choose the position that matches your document&apos;s style and won&apos;t overlap existing headers or footers.
      </p>

      <hr />

      <h2>Related PDF Tools</h2>
      <p>
        See our <Link href="/blog/complete-pdf-tools-guide-india">Complete PDF Tools Guide</Link> for compress, merge, split, and more.
      </p>
      <p>
        Need to fix sideways pages before numbering? Read{" "}
        <Link href="/blog/how-to-rotate-pdf-pages-online-free">how to rotate PDF pages online free</Link>.
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
      <p><Link href="/tools/pdf-page-numbers">Add Page Numbers to PDF Now →</Link></p>
    </article>
  );
}
