import Link from "next/link";

const faqs = [
  {
    question: "What is the self-employment tax rate for 2026?",
    answer:
      "The self-employment tax rate is 15.3% — composed of 12.4% for Social Security and 2.9% for Medicare. This is calculated on 92.35% of your net self-employment income. The Social Security portion only applies to the first $184,500 of combined wages and SE income in 2026.",
  },
  {
    question: "Can I deduct self-employment tax from my income?",
    answer:
      "Yes — you can deduct 50% of your self-employment tax as an above-the-line deduction on your Form 1040, reducing your adjusted gross income. This represents the employer-equivalent portion of FICA, mirroring the deduction employers receive.",
  },
  {
    question: "When are quarterly estimated tax payments due in 2026?",
    answer:
      "For 2026, quarterly estimated tax payments are due: April 15 (Q1), June 17 (Q2), September 16 (Q3), and January 15, 2027 (Q4). If you expect to owe more than $1,000 in federal taxes for the year, you are generally required to make these payments.",
  },
  {
    question: "What is the $400 threshold for self-employment tax?",
    answer:
      "If your net earnings from self-employment are less than $400 for the tax year, you do not owe self-employment tax (though you may still owe income tax on the earnings). Once net SE income reaches $400, SE tax applies to the full amount.",
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

export default function SelfEmploymentTaxCalculatorGuideUsaContent() {
  return (
    <article className="prose-custom">
      <p>
        If you&apos;re a freelancer, consultant, or gig worker in the US, self-employment
        tax is often the biggest surprise on your first tax return. Use our free{" "}
        <Link href="/tools/self-employment-tax">Self-Employment Tax Calculator</Link> to
        see SE tax, income tax, and quarterly payment amounts — and compare with the{" "}
        <Link href="/tools/w2-vs-1099-calculator">W-2 vs 1099 Calculator</Link> if
        you&apos;re weighing employment vs contracting.
      </p>

      <hr />

      <h2>What Is Self-Employment Tax?</h2>
      <p>
        Self-employment tax covers both halves of FICA — <strong>12.4% Social Security</strong>{" "}
        and <strong>2.9% Medicare</strong> — for a combined <strong>15.3%</strong> on{" "}
        <strong>92.35%</strong> of your net self-employment income. W-2 employees only pay
        half; as a 1099 worker, you pay the full amount.
      </p>

      <hr />

      <h2>The 92.35% Rule</h2>
      <p>
        You don&apos;t pay SE tax on 100% of net income because the IRS treats the
        employer-equivalent portion as already accounted for. Multiplying net SE income by
        92.35% gives your SE tax base before applying the 15.3% rate.
      </p>

      <hr />

      <h2>The SE Tax Deduction — Worked Example</h2>
      <p>
        On $60,000 net SE income (single, no W-2 wages): SE tax ≈ $8,478. You deduct 50%
        ($4,239) from AGI, reducing federal income tax by roughly $500–$800 depending on
        your bracket. The calculator shows this savings explicitly.
      </p>

      <hr />

      <h2>QBI Deduction (Section 199A)</h2>
      <p>
        Eligible self-employed individuals may deduct up to <strong>20% of qualified
        business income</strong> from taxable income. Phase-outs apply for specified
        service businesses at higher income levels. Toggle QBI in the calculator to see
        the impact.
      </p>

      <hr />

      <h2>Quarterly Estimated Taxes &amp; Safe Harbor</h2>
      <p>
        Pay estimated tax in four installments or face underpayment penalties. Safe harbor:
        pay <strong>100% of prior year tax</strong> or <strong>90% of current year tax</strong>.
        Our calculator divides total estimated tax by four for a simplified quarterly amount.
      </p>

      <hr />

      <h2>The $400 Threshold</h2>
      <p>
        Net SE earnings below $400/year are exempt from self-employment tax. Above $400, SE
        tax applies to the full net amount (not just the excess over $400).
      </p>

      <hr />

      <h2>Additional Medicare Tax</h2>
      <p>
        An extra <strong>0.9% Medicare tax</strong> applies to combined wages and SE income
        over $200,000 (single) or $250,000 (MFJ). The calculator includes this when applicable.
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

      <h2>Related Reading</h2>
      <ul>
        <li>
          <Link href="/blog/w2-vs-1099-tax-comparison-guide">W-2 vs 1099 Tax Comparison Guide</Link>
        </li>
        <li>
          <Link href="/blog/us-paycheck-calculator-guide">US Paycheck Calculator Guide</Link>
        </li>
        <li>
          <Link href="/blog/mortgage-calculator-guide">Mortgage Calculator Guide</Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/self-employment-tax">Calculate Self-Employment Tax Free →</Link>
      </p>
    </article>
  );
}
