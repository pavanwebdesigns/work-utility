import Link from "next/link";

const faqs = [
  {
    question: "Will my Excel formulas still work in the PDF?",
    answer:
      "No — PDF is a static format, so formulas convert to their calculated displayed values at the time of conversion. The PDF won't recalculate or update.",
  },
  {
    question: "Why do my spreadsheet columns get cut off in the PDF?",
    answer:
      "This usually happens when a wide spreadsheet doesn't fit standard page width. Adjusting the print area, scaling, or switching to landscape orientation in Excel before converting usually fixes this.",
  },
  {
    question: "Does the PDF preserve my spreadsheet's formatting and colors?",
    answer:
      "Generally yes — cell formatting, colors, fonts, and borders carry over. Very complex layouts (frozen panes, certain conditional formatting) may need minor adjustment beforehand for best results.",
  },
  {
    question: "Can I convert just one sheet from a multi-sheet workbook?",
    answer:
      "This depends on what's selected/active when converting — check the tool's behavior, as some converters process the active sheet while others may convert the entire workbook.",
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

export default function HowToConvertExcelToPdfFreeContent() {
  return (
    <article className="prose-custom">
      <p>
        Sharing a spreadsheet as PDF locks in the layout so it looks identical
        on every device — no column shifts, no missing fonts, no Excel required
        on the recipient&apos;s end. Our free{" "}
        <Link href="/tools/excel-to-pdf">Excel to PDF Converter</Link> runs in
        your browser with nothing uploaded to a server.
      </p>

      <hr />

      <h2>Why Convert Excel to PDF</h2>
      <ul>
        <li>
          Sharing with someone who might not have Excel installed
        </li>
        <li>
          Locking formatting so columns and fonts display identically everywhere
          — Excel files can shift depending on the viewer&apos;s software and
          settings
        </li>
        <li>
          Submitting a report or invoice where an editable spreadsheet
          isn&apos;t appropriate
        </li>
        <li>
          Printing correctly without column-cutoff issues
        </li>
      </ul>

      <hr />

      <h2>The Columns Get Cut Off Problem</h2>
      <p>
        One of the most common Excel-to-PDF complaints: wide spreadsheets that
        don&apos;t fit one page width get cut off or split awkwardly when
        printed directly from Excel. Adjusting the print area, scaling to fit,
        or switching to landscape orientation before converting usually solves
        this.
      </p>

      <hr />

      <h2>What Gets Preserved vs What Might Not</h2>
      <p>
        Formulas convert to their calculated displayed values — the PDF
        won&apos;t recalculate. Formatting, colors, and borders are generally
        preserved. Very wide sheets, frozen panes, or certain advanced
        formatting may need print-area adjustment beforehand to look right in the
        final PDF.
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
          <Link href="/blog/complete-pdf-tools-guide-india">
            Complete PDF Tools Guide
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/excel-to-pdf">Convert Excel to PDF Now →</Link>
      </p>
    </article>
  );
}
