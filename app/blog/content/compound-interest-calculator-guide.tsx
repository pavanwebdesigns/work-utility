import Link from "next/link";

const faqs = [
  {
    question: "What's the difference between compound interest and simple interest?",
    answer:
      "Simple interest is calculated only on the original principal every period. Compound interest is calculated on the principal plus all interest already earned, so the growth accelerates over time instead of staying linear.",
  },
  {
    question: "Does compounding frequency (monthly vs annually) make a big difference?",
    answer:
      "It makes a real but usually modest difference — more frequent compounding means interest starts earning interest sooner. The difference becomes more noticeable over longer time horizons.",
  },
  {
    question: "What is the Rule of 72?",
    answer:
      "A quick mental shortcut: dividing 72 by the annual interest rate gives an approximate number of years for an investment to double. It's an estimate, not an exact calculation.",
  },
  {
    question: "Why does starting to invest early matter so much?",
    answer:
      "Because compound interest's growth curve gets steeper the longer money stays invested — extra years of compounding can outweigh contributing more money later, since each year of growth builds on all prior growth, not just the original amount.",
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

export default function CompoundInterestCalculatorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Compound interest is the reason long-term investing rewards patience
        more than most people expect — but the math behind it is straightforward
        once you see it broken down. Use our free{" "}
        <Link href="/tools/compound-interest">Compound Interest Calculator</Link>{" "}
        to model your own numbers, or read on to understand how compounding
        actually works.
      </p>

      <hr />

      <h2>The Formula: A = P(1 + r/n)^(nt)</h2>
      <ul>
        <li><strong>P</strong> — principal (starting amount)</li>
        <li><strong>r</strong> — annual interest rate as a decimal (e.g. 8% = 0.08)</li>
        <li><strong>n</strong> — number of times interest compounds per year</li>
        <li><strong>t</strong> — time in years</li>
        <li><strong>A</strong> — final amount after compounding</li>
      </ul>

      <hr />

      <h2>Compound vs Simple Interest</h2>
      <p>
        Simple interest only ever earns on the original principal — the growth
        stays a straight line. Compound interest earns on the principal plus all
        previously accumulated interest, so the growth curve gets steeper over
        time rather than staying linear. This is the single most important
        concept behind long-term wealth building.
      </p>

      <hr />

      <h2>Why Compounding Frequency Matters</h2>
      <p>
        Interest compounded monthly grows slightly faster than the same rate
        compounded annually, because interest starts earning interest sooner. The
        difference is small in early years but becomes more noticeable the
        longer the money compounds. Our calculator lets you compare annual,
        quarterly, monthly, and daily compounding side by side.
      </p>

      <hr />

      <h2>The Rule of 72</h2>
      <p>
        Dividing 72 by the annual interest rate gives a rough estimate of how
        many years it takes an investment to double. At 8% annual return, money
        roughly doubles in 9 years (72 ÷ 8). At 6%, about 12 years. It&apos;s a
        useful mental shortcut — an approximation, not an exact calculation.
      </p>

      <hr />

      <h2>Why Time Matters More Than People Expect</h2>
      <p>
        The same monthly contribution started 10 years earlier ends up
        meaningfully larger at retirement than the same total amount contributed
        starting later — purely because of the extra compounding years, not
        because more money went in. Each year of growth builds on all prior
        growth, not just the original principal. That&apos;s why starting early
        often matters more than contributing larger amounts later.
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
            FD vs SIP Comparison — Compounding in Practice
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/compound-interest">
          Calculate Compound Interest Now →
        </Link>
      </p>
    </article>
  );
}
