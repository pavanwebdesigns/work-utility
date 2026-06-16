import Link from "next/link";

const faqs = [
  {
    question: "Why does my regex match the first occurrence but not all of them?",
    answer:
      "You likely need the global flag (g), which tells the regex engine to find all matches in the string instead of stopping after the first one.",
  },
  {
    question:
      "Is there one regex pattern that validates all email addresses correctly?",
    answer:
      "Not perfectly — fully RFC-compliant email validation is extremely complex. Most practical applications use a simpler pattern that covers 99% of real-world emails, combined with an actual verification email as the real validation step.",
  },
  {
    question: "What's the difference between * and + in regex?",
    answer:
      "* matches zero or more occurrences of the preceding character (so it also matches none at all), while + requires at least one occurrence.",
  },
  {
    question: "Why is my regex slow on long strings?",
    answer:
      'Certain patterns (especially nested quantifiers like "(a+)+") can cause "catastrophic backtracking," where the regex engine\'s processing time grows exponentially with input length. Testing against realistic-length input before deploying helps catch this.',
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

export default function HowToTestRegexOnlineContent() {
  return (
    <article className="prose-custom">
      <p>
        Writing a regular expression that works on your first test string but
        silently fails on edge cases is one of the most common (and hardest to
        spot) bugs in form validation, data parsing, and search/replace logic —
        testing against multiple real examples before shipping a regex catches
        this early. See our{" "}
        <Link href="/blog/complete-developer-tools-guide">
          Complete Developer Tools Guide
        </Link>
        .
      </p>

      <hr />

      <h2>Why Test Before Deploying a Regex</h2>
      <p>
        Regex is unforgiving — a pattern that looks correct can still fail on
        unicode characters, optional/missing groups, or multiline input unless
        explicitly tested against varied real-world examples.
      </p>

      <hr />

      <h2>Quick-Reference Cheat Sheet</h2>
      <ul>
        <li><code>^</code> — start of string</li>
        <li><code>$</code> — end of string</li>
        <li><code>.</code> — any character</li>
        <li><code>*</code> — zero or more</li>
        <li><code>+</code> — one or more</li>
        <li><code>?</code> — optional (zero or one)</li>
        <li><code>\d</code> — digit</li>
        <li><code>\w</code> — word character</li>
        <li><code>\s</code> — whitespace</li>
        <li><code>[]</code> — character set</li>
        <li><code>()</code> — capture group</li>
        <li><code>{"{n,m}"}</code> — repetition range</li>
        <li><code>|</code> — OR</li>
      </ul>

      <hr />

      <h2>Common Patterns Developers Search For</h2>
      <p>
        <strong>Email (practical):</strong>{" "}
        <code>^[\w.-]+@[\w.-]+\.\w+{"{2,}"}$</code> — covers most real emails;
        verify with a confirmation email, not regex alone.
      </p>
      <p>
        <strong>URL:</strong>{" "}
        <code>^https?:\/\/[\w.-]+(?:\/[\w./?%&amp;=-]*)?$</code>
      </p>
      <p>
        <strong>Phone:</strong> patterns vary heavily by country — a
        &quot;universal&quot; phone regex is notoriously unreliable. Test against
        your target region&apos;s formats.
      </p>
      <p>
        <strong>Password strength:</strong>{" "}
        <code>^(?=.*[A-Za-z])(?=.*\d).{"{8,}"}$</code> — at least 8 chars, one
        letter, one digit.
      </p>

      <hr />

      <h2>Global vs Case-Insensitive Flags</h2>
      <p>
        The <code>g</code> flag matches all occurrences, not just the first. The{" "}
        <code>i</code> flag enables case-insensitive matching. Flag confusion is
        a frequent source of regex bugs — test both in the{" "}
        <Link href="/tools/regex-tester">Regex Tester</Link>.
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
      </ul>

      <hr />

      <p>
        <Link href="/tools/regex-tester">Test Your Regex Pattern Now →</Link>
      </p>
    </article>
  );
}
