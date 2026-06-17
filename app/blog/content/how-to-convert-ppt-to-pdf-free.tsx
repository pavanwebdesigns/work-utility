import Link from "next/link";

const faqs = [
  {
    question: "Will my slide animations and transitions show up in the PDF?",
    answer:
      "No — PDF is a static document format, so animations, transitions, and any embedded video/audio won't carry over. Each slide becomes a static page showing its final visual state.",
  },
  {
    question: "Are speaker notes included in the PDF?",
    answer:
      "By default, most converters export only the slide content visible to an audience, not the presenter's private speaker notes, unless a specific \"include notes\" option is selected.",
  },
  {
    question:
      "Why does my presentation look different after converting compared to viewing it in PowerPoint?",
    answer:
      "This is usually a font issue — if a font used in the slides isn't available during conversion, a substitute font may be used. PDF conversion otherwise preserves the layout exactly as designed.",
  },
  {
    question: "Can I convert just specific slides instead of the whole presentation?",
    answer:
      "This depends on the tool's options — some converters process the full presentation, while others may let you select a slide range before converting.",
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

export default function HowToConvertPptToPdfFreeContent() {
  return (
    <article className="prose-custom">
      <p>
        Sending slides as PDF means anyone can open them — no PowerPoint
        required, no editable access, and fonts and layout stay exactly as
        designed. Our free{" "}
        <Link href="/tools/ppt-to-pdf">PPT to PDF Converter</Link> runs in your
        browser with nothing uploaded to a server.
      </p>

      <hr />

      <h2>Why Convert PowerPoint to PDF</h2>
      <ul>
        <li>
          Sharing with people who don&apos;t have PowerPoint installed
        </li>
        <li>
          Sending slides for review without giving editable access
        </li>
        <li>
          Submitting a presentation as a fixed deliverable (academic, business,
          conference)
        </li>
        <li>
          Preserving exact fonts and layout — PowerPoint files can render
          differently depending on installed fonts and software version, while PDF
          locks the visual layout
        </li>
      </ul>

      <hr />

      <h2>Animations and Transitions</h2>
      <p>
        PDF is a static format — animations, slide transitions, and embedded
        video/audio will not carry over. Each slide becomes a static page showing
        its final visual state. Plan accordingly if motion was part of your
        presentation design.
      </p>

      <hr />

      <h2>Speaker Notes</h2>
      <p>
        Whether speaker notes are included depends on export settings. By
        default, most converters export only the slide content visible to an
        audience, not the presenter&apos;s private notes — unless an
        &quot;include notes&quot; option is explicitly selected.
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
          <Link href="/blog/how-to-convert-excel-to-pdf-free">
            How to Convert Excel to PDF Free
          </Link>
        </li>
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
        <Link href="/tools/ppt-to-pdf">Convert PowerPoint to PDF Now →</Link>
      </p>
    </article>
  );
}
