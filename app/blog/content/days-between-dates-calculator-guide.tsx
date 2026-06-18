import Link from "next/link";

const faqs = [
  {
    question: "Does the calculator count the start date as day 1?",
    answer:
      "No — the day count is end date minus start date, so the start date itself is not counted as a full elapsed day. For example, Jan 1 to Jan 3 equals 2 days, not 3.",
  },
  {
    question: "Can I calculate days between a past date and today?",
    answer:
      "Yes — set one date to today and the other to any past or future date to see days elapsed or days remaining.",
  },
  {
    question: "Does this account for leap years automatically?",
    answer:
      "Yes — the calculation uses actual calendar dates, so leap years are automatically factored into the day count correctly.",
  },
  {
    question: "Can I use this to calculate exact contract or lease duration?",
    answer:
      "Yes — entering the start and end dates of an agreement gives you the precise day count, useful for contracts, leases, or any duration-based agreement.",
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

export default function DaysBetweenDatesCalculatorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Need to know exactly how many days between two dates? Use our free{" "}
        <Link href="/tools/days-between-dates">Days Between Dates Calculator</Link> to count days until an event, days since a past date, or the duration of a contract.
      </p>
      <hr />
      <h2>Common Use Cases</h2>
      <ul>
        <li><strong>Countdowns:</strong> Days until a deadline, trip, wedding, or exam date.</li>
        <li><strong>Contract durations:</strong> Exact day count for leases, employment agreements, or project timelines.</li>
        <li><strong>Elapsed time:</strong> How many days since a past event or milestone.</li>
        <li><strong>Planning:</strong> Figure out how long between two dates for scheduling and logistics.</li>
      </ul>
      <hr />
      <h2>Start Date Counting Convention</h2>
      <p>
        A common point of confusion is whether the start date counts as day 1. This tool uses the standard <strong>end date minus start date</strong> convention — the start date is <em>not</em> counted as a full elapsed day.
      </p>
      <p>
        Example: from Monday (Jan 1) to Wednesday (Jan 3) = <strong>2 days</strong>, not 3. If someone says &quot;3 days from Monday,&quot; they might mean Thursday depending on context — this tool always shows the precise calendar difference so you can verify against your specific convention.
      </p>
      <hr />
      <h2>Related Tools</h2>
      <p>
        For age-based eligibility checks, try our{" "}
        <Link href="/tools/age-calculator">Age Calculator</Link> — see the guide on{" "}
        <Link href="/blog/age-calculator-for-government-forms-india">age calculator for government forms</Link>.
        For focused work sessions, read our{" "}
        <Link href="/blog/pomodoro-technique-timer-guide">Pomodoro technique timer guide</Link>.
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
      <p><Link href="/tools/days-between-dates">Calculate Days Between Dates Now →</Link></p>
    </article>
  );
}
