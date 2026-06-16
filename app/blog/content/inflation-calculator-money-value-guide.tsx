import Link from "next/link";

const faqs = [
  {
    question: 'What is a "safe" inflation rate to assume for India?',
    answer:
      "There's no single universally \"correct\" number — India's historical average inflation has fluctuated across different periods. Many financial planners use a long-term assumption in the mid-single digits, but you should adjust based on current RBI inflation targets and your own risk approach, not a fixed industry rule.",
  },
  {
    question: "Why does inflation matter even if I keep money in a savings account?",
    answer:
      "If your savings account's interest rate is lower than inflation, your money is technically losing real value every year, even though the rupee/dollar amount in the account is growing.",
  },
  {
    question: "Is inflation the same for everyone?",
    answer:
      "No — your personal inflation rate depends on your spending pattern. Someone spending heavily on items inflating faster than the general index (education, healthcare, in many cases) experiences a personal inflation rate higher than the headline number.",
  },
  {
    question: "How is this different from a regular compound interest calculator?",
    answer:
      "A compound interest calculator shows your money growing. An inflation calculator shows the cost of living growing — they work in opposite directions, and comparing the two together gives you your real (inflation-adjusted) rate of return.",
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

export default function InflationCalculatorMoneyValueGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        ₹1 lakh today will not buy the same things in 20 years — and most people
        underestimate by how much, because inflation&apos;s effect compounds
        quietly in the background of every financial decision, from retirement
        planning to deciding whether a fixed deposit actually grows your wealth.
        Compare nominal vs real returns in our{" "}
        <Link href="/blog/fd-vs-sip-india-comparison">
          FD vs SIP comparison
        </Link>{" "}
        and factor inflation into long-term borrowing with our{" "}
        <Link href="/blog/home-loan-emi-guide-india">
          Home loan EMI guide
        </Link>
        . Full finance overview:{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary &amp; Tax Guide for Indian Employees
        </Link>
        .
      </p>

      <hr />

      <h2>Why Inflation Erodes Value Faster Than It Seems</h2>

      <p>
        Inflation works like compounding interest, but in reverse — it shrinks
        purchasing power year over year. At a steady annual inflation rate, money
        loses a meaningful chunk of its real value every decade. The mistake
        people make is judging today&apos;s savings goal in today&apos;s
        rupees/dollars, instead of adjusting that goal for what the same
        lifestyle will actually cost by the time they need the money.
      </p>

      <hr />

      <h2>Future Value vs. Past Value</h2>

      <p>
        The{" "}
        <Link href="/tools/inflation-calculator">Inflation Calculator</Link>{" "}
        works in two directions: future value tells you what a sum of money
        today will be &quot;worth&quot; (in equivalent purchasing power) at a
        future date, given an assumed inflation rate — useful for retirement and
        goal planning. Past value tells you what an old amount of money would be
        worth in today&apos;s terms — useful for understanding things like
        &quot;what would my grandfather&apos;s ₹10,000 salary in 1990 be worth
        today.&quot;
      </p>

      <hr />

      <h2>Worked Example</h2>

      <p>
        At a steady inflation assumption, ₹10 lakh today loses a substantial
        share of its real purchasing power over 20 years — meaning a retirement
        corpus that sounds comfortable today may not stretch as far decades from
        now unless your investments are growing faster than inflation. This is
        exactly why financial planners stress &quot;real returns&quot;
        (investment return minus inflation) rather than just the nominal return
        number on an investment.
      </p>

      <hr />

      <h2>Why This Matters for Retirement and Goal Planning</h2>

      <p>
        If you&apos;re saving for a goal 15–20 years away (retirement, a
        child&apos;s education, a home), the target number you should aim for
        needs to be inflation-adjusted, not based on today&apos;s prices. The{" "}
        <Link href="/tools/inflation-calculator">Inflation Calculator</Link> lets
        you plug in your own assumed inflation rate (India and US default rates
        provided as starting points) and a time horizon, to see the real future
        cost of a goal you&apos;re planning for today.
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
          <Link href="/blog/fd-vs-sip-india-comparison">
            FD vs SIP — Where Should You Invest in India?
          </Link>
        </li>
        <li>
          <Link href="/blog/home-loan-emi-guide-india">
            Home Loan EMI Guide for India
          </Link>
        </li>
        <li>
          <Link href="/blog/complete-salary-tax-guide-india">
            Complete Salary &amp; Tax Guide for Indian Employees
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/inflation-calculator">
          Calculate Inflation Impact on Your Money →
        </Link>
      </p>
    </article>
  );
}
