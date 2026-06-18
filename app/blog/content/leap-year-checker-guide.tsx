import Link from "next/link";

const faqs = [
  {
    question: "What is the leap year rule?",
    answer:
      "A year is a leap year if divisible by 4, EXCEPT century years (divisible by 100), which are only leap years if also divisible by 400.",
  },
  {
    question: "Why was 1900 not a leap year but 2000 was?",
    answer:
      "Both are divisible by 100, but 2000 is also divisible by 400 (making it a leap year), while 1900 is not divisible by 400 (so the century exception applies, making it not a leap year).",
  },
  {
    question: "Why do we need leap years at all?",
    answer:
      "Earth's orbit takes approximately 365.25 days, not exactly 365 — without leap years, the calendar would gradually drift out of sync with the seasons over centuries.",
  },
  {
    question: "How often do leap years occur?",
    answer:
      "Roughly every 4 years, with the exception of century years not divisible by 400 — making leap years occur 97 times every 400 years rather than exactly 100 times.",
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

export default function LeapYearCheckerGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Is 2026 a leap year? What about 1900 or 2000? Use our free{" "}
        <Link href="/tools/leap-year-checker">Leap Year Checker</Link> to find out instantly, with the exact rule explained.
      </p>
      <hr />
      <h2>The Leap Year Rule</h2>
      <p>A year is a leap year if:</p>
      <ol>
        <li>It is divisible by 4 → <strong>leap year</strong></li>
        <li>EXCEPT if divisible by 100 → <strong>not a leap year</strong></li>
        <li>EXCEPT if also divisible by 400 → <strong>leap year after all</strong></li>
      </ol>
      <p>
        This three-part rule exists because Earth&apos;s orbital period is approximately 365.25 days — not an exact 365. Adding an extra day every ~4 years keeps the calendar aligned with the seasons.
      </p>
      <hr />
      <h2>Examples</h2>
      <ul>
        <li><strong>2024:</strong> Divisible by 4, not by 100 → leap year ✓</li>
        <li><strong>1900:</strong> Divisible by 100 but not by 400 → NOT a leap year ✗</li>
        <li><strong>2000:</strong> Divisible by 400 → leap year ✓</li>
      </ul>
      <p>
        The 1900 exception is the most commonly misunderstood case — many people assume every 4th year is a leap year, but century years break that pattern unless they pass the 400 test.
      </p>
      <hr />
      <h2>February 29</h2>
      <p>
        The practical effect of a leap year is an extra day — February 29 — added to the calendar. Without it, seasons would slowly drift: after a few centuries, summer would eventually fall in what we now call spring.
      </p>
      <hr />
      <h2>Related Tools</h2>
      <p>
        For counting days between dates (which automatically handles leap years), see our{" "}
        <Link href="/blog/days-between-dates-calculator-guide">days between dates calculator guide</Link> and{" "}
        <Link href="/tools/days-between-dates">Days Between Dates Calculator</Link>.
        For age eligibility, try our{" "}
        <Link href="/blog/age-calculator-for-government-forms-india">age calculator for government forms</Link>.
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
      <p><Link href="/tools/leap-year-checker">Check a Leap Year Now →</Link></p>
    </article>
  );
}
