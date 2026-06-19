import Link from "next/link";

const faqs = [
  {
    question: "What is a Unix timestamp?",
    answer:
      "A Unix timestamp is the number of seconds (or milliseconds) elapsed since January 1, 1970 00:00:00 UTC — a universal, timezone-agnostic way to represent a specific moment in time.",
  },
  {
    question: "Why do some timestamps have 10 digits and others 13?",
    answer:
      "A 10-digit timestamp counts seconds since the Unix epoch; a 13-digit timestamp counts milliseconds. JavaScript's Date.now() returns milliseconds while many server-side APIs use seconds.",
  },
  {
    question: "Is a Unix timestamp always UTC?",
    answer:
      "The timestamp itself is timezone-agnostic — it refers to a specific moment globally. The timezone only matters when converting to a human-readable date for display.",
  },
  {
    question: "What is the Unix epoch?",
    answer:
      "January 1, 1970 at 00:00:00 UTC — the reference point from which all Unix timestamps are counted.",
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

export default function UnixTimestampConverterGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Developers encounter Unix timestamps constantly in APIs, databases, and logs. Our free{" "}
        <Link href="/tools/timestamp-converter">Unix Timestamp Converter</Link> shows the current epoch time live (seconds and milliseconds), converts timestamps to readable dates in UTC and your local timezone, and converts date-time inputs back to epoch values.
      </p>
      <hr />
      <h2>What Is a Unix Timestamp?</h2>
      <p>
        A Unix timestamp counts the seconds (or milliseconds) elapsed since January 1, 1970 00:00:00 UTC — known as the Unix epoch. Because it is a single integer, it is easy to sort, compare, and store without timezone ambiguity at the storage layer.
      </p>
      <hr />
      <h2>Why Developers Use Timestamps</h2>
      <p>
        APIs and databases store dates as timestamps for simpler sorting and comparison. A log entry at <code>1717881600</code> is unambiguous globally. When you display it to users, you convert to a locale-aware string — but the stored value stays timezone-neutral.
      </p>
      <hr />
      <h2>Seconds vs Milliseconds</h2>
      <p>
        JavaScript&apos;s <code>Date.now()</code> returns milliseconds (13 digits). Many server APIs return seconds (10 digits). To convert milliseconds to seconds, divide by 1000. Our tool auto-detects based on digit count so you do not have to guess.
      </p>
      <hr />
      <h2>UTC vs Local Timezone</h2>
      <p>
        The timestamp itself always refers to the same instant worldwide. When converting to human-readable form, UTC is the canonical reference — but users typically want local time. The converter shows both, with your browser timezone clearly labeled.
      </p>
      <hr />
      <h2>Related Reading</h2>
      <ul>
        <li>
          <Link href="/blog/complete-developer-tools-guide">Complete Developer Tools Guide 2026</Link>
        </li>
        <li>
          <Link href="/blog/days-between-dates-calculator-guide">Days Between Dates Calculator Guide</Link>
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
        <Link href="/tools/timestamp-converter">Convert Unix Timestamps Now →</Link>
      </p>
    </article>
  );
}
