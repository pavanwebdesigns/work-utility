import Link from "next/link";

const faqs = [
  {
    question: "Why is my JSON invalid even though it looks correct?",
    answer:
      "The most common invisible cause is a trailing comma after the last item in an object or array — valid in JavaScript object literals, but not valid JSON. Other frequent causes are single quotes instead of double quotes, and unquoted property names.",
  },
  {
    question: "What's the difference between JSON and a JavaScript object?",
    answer:
      "JSON is a strict text-based data format with rules (double-quoted keys/strings only, no trailing commas, no functions or comments). JavaScript objects are more flexible — they allow all of these, which is why a valid JS object literal can still be invalid JSON.",
  },
  {
    question: "Is it safe to format JSON containing sensitive data online?",
    answer:
      "Use a tool that processes everything client-side in your browser (like this one) rather than uploading to a server, especially for JSON containing API keys, tokens, or internal data.",
  },
  {
    question: 'What does "minify JSON" mean?',
    answer:
      "Minifying removes all unnecessary whitespace and line breaks, producing the smallest possible file size — useful for production API responses or config files where payload size matters.",
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

export default function HowToFormatJsonOnlineFreeContent() {
  return (
    <article className="prose-custom">
      <p>
        Minified or poorly formatted JSON is unreadable, and a single misplaced
        comma or missing bracket breaks an entire API response or config file —
        manually scanning for the error wastes time that a formatter/validator
        tool eliminates instantly. See the full toolkit in our{" "}
        <Link href="/blog/complete-developer-tools-guide">
          Complete Developer Tools Guide
        </Link>
        .
      </p>

      <hr />

      <h2>What a JSON Formatter Actually Does</h2>
      <p>
        A JSON formatter takes compact or messy JSON and re-indents it with
        consistent spacing, while also validating the syntax and pointing out
        exactly where it&apos;s broken (line and character position), instead of
        just failing silently like many basic parsers do.
      </p>

      <hr />

      <h2>Common JSON Errors This Catches</h2>
      <ul>
        <li>
          <strong>Trailing commas</strong> —{" "}
          <code>{`{"name": "Alice",}`}</code> is valid in JS objects, invalid in
          JSON.
        </li>
        <li>
          <strong>Unquoted keys</strong> —{" "}
          <code>{`{name: "Alice"}`}</code> must use double-quoted keys in JSON.
        </li>
        <li>
          <strong>Single quotes</strong> — JSON requires double quotes:{" "}
          <code>&quot;Alice&quot;</code>, not <code>&apos;Alice&apos;</code>.
        </li>
        <li>
          <strong>Missing commas</strong> — between properties or array items.
        </li>
        <li>
          <strong>Mismatched brackets/braces</strong> — an unclosed{" "}
          <code>[</code> or <code>{"{"}</code> breaks the entire document.
        </li>
      </ul>

      <hr />

      <h2>Pretty-Print vs Minify</h2>
      <p>
        <strong>Pretty-print</strong> adds indentation and line breaks — ideal
        for reading and debugging during development. <strong>Minify</strong>{" "}
        strips all whitespace for the smallest payload size before sending JSON
        over the network in production. The{" "}
        <Link href="/tools/json-formatter">JSON Formatter</Link> supports both
        modes.
      </p>

      <hr />

      <h2>Privacy: Why Client-Side Processing Matters</h2>
      <p>
        The tool processes JSON entirely in your browser — useful for developers
        working with JSON containing API keys, tokens, or internal data they
        don&apos;t want to paste into a third-party server-side tool.
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
          <Link href="/blog/complete-developer-tools-guide">
            Complete Developer Tools Guide 2026
          </Link>
        </li>
        <li>
          <Link href="/blog/how-to-decode-jwt-token-online">
            How to Decode a JWT Token Online
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/json-formatter">Format &amp; Validate JSON Now →</Link>
      </p>
    </article>
  );
}
