import Link from "next/link";

const faqs = [
  {
    question: "What JSON structure works best for CSV conversion?",
    answer:
      "A flat array of objects where every object has the same keys — for example, an array of user records each with name, email, and age fields. This maps cleanly to CSV rows and columns.",
  },
  {
    question: "What happens to nested objects in the JSON?",
    answer:
      "Nested objects (objects inside objects) don't have a natural flat-CSV equivalent — the converter flattens one level with dot notation (e.g. address.city) or stringifies deeper nesting. Check the output preview to confirm the result matches your expectation.",
  },
  {
    question: "Can I open the downloaded CSV directly in Excel?",
    answer:
      "Yes — the downloaded .csv file can be opened directly in Excel, Google Sheets, or any spreadsheet application.",
  },
  {
    question: "What if I need to go the other direction — CSV to JSON?",
    answer:
      "Use the CSV to JSON tool, also available on this site.",
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

export default function HowToConvertJsonToCsvOnlineFreeContent() {
  return (
    <article className="prose-custom">
      <p>
        API responses arrive as JSON, but analysts and stakeholders often need CSV for Excel, Google Sheets, or reporting pipelines. Our free{" "}
        <Link href="/tools/json-to-csv">JSON to CSV Converter</Link> turns a JSON array of objects into spreadsheet-ready CSV in your browser — preview, copy, or download instantly.
      </p>
      <hr />
      <h2>Why Convert JSON to CSV?</h2>
      <p>
        Product managers reviewing user exports, data analysts building pivot tables, and non-developers sharing API data all prefer flat spreadsheets. CSV is the lingua franca between code and Excel — no JSON parsing required on the receiving end.
      </p>
      <hr />
      <h2>Required JSON Structure</h2>
      <p>
        Conversion works cleanly when JSON is an <strong>array of flat objects</strong> with consistent keys. Each object becomes one row; each key becomes a column header. Example:
      </p>
      <pre><code>{`[
  {"name": "Alice", "email": "alice@example.com", "age": 28},
  {"name": "Bob", "email": "bob@example.com", "age": 34}
]`}</code></pre>
      <hr />
      <h2>Nested Objects</h2>
      <p>
        Nested data does not map neatly to flat CSV columns. Our tool flattens one level using dot notation (<code>address.city</code>) and stringifies arrays or deeper nesting with a visible warning in the preview — so you never get silently broken output.
      </p>
      <hr />
      <h2>CSV to JSON — The Reverse Direction</h2>
      <p>
        Need to go the other way? Use our{" "}
        <Link href="/tools/csv-to-json">CSV to JSON converter</Link> to parse spreadsheet data back into JSON arrays.
      </p>
      <hr />
      <h2>Related Reading</h2>
      <ul>
        <li>
          <Link href="/blog/complete-developer-tools-guide">Complete Developer Tools Guide 2026</Link>
        </li>
        <li>
          <Link href="/blog/how-to-format-json-online-free">How to Format JSON Online Free</Link>
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
        <Link href="/tools/json-to-csv">Convert JSON to CSV Now →</Link>
      </p>
    </article>
  );
}
