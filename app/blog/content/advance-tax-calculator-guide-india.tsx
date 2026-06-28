import Link from "next/link";

const faqs = [
  {
    question: "Who needs to pay advance tax in India?",
    answer:
      "Anyone whose estimated net tax liability for the year exceeds ₹10,000 after accounting for TDS must pay advance tax. This applies to salaried employees with additional income (rental, capital gains, interest), self-employed individuals, freelancers, and business owners. Senior citizens (60+) with no business income are exempt from advance tax.",
  },
  {
    question: "What are the advance tax due dates for FY 2026-27?",
    answer:
      "Advance tax for FY 2026-27 must be paid in four instalments: 15% by June 15, 2026; 45% by September 15, 2026; 75% by December 15, 2026; and 100% by March 15, 2027. Each instalment percentage is of the total estimated tax for the year.",
  },
  {
    question: "What is the penalty for not paying advance tax?",
    answer:
      "Missing advance tax payments attracts interest under Section 234B (1% per month on unpaid tax from April 1 of the assessment year until payment) and Section 234C (1% per month per quarter for each quarterly shortfall). These are automatically calculated in your ITR.",
  },
  {
    question: "Do freelancers under Section 44ADA need to pay quarterly advance tax?",
    answer:
      "No — taxpayers opting for presumptive taxation under Section 44ADA need to pay their entire advance tax in a single instalment by March 15 of the financial year. There are no quarterly instalment requirements under 44ADA.",
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

export default function AdvanceTaxCalculatorGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        Advance tax lets you pay income tax during the year instead of a lump sum at
        filing. Use our free{" "}
        <Link href="/tools/advance-tax-calculator">Advance Tax Calculator</Link>{" "}
        for FY 2026-27 instalment amounts and due dates. Part of our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary & Tax Guide for India
        </Link>
        .
      </p>

      <hr />

      <h2>What Is Advance Tax?</h2>
      <p>
        Advance tax is income tax paid in instalments during the financial year based
        on your estimated annual income. It prevents a large tax bill at ITR filing
        and ensures the government receives revenue throughout the year.
      </p>

      <hr />

      <h2>Who Must Pay Advance Tax?</h2>
      <p>
        Anyone with net tax liability exceeding ₹10,000 after TDS must pay advance
        tax. Senior citizens (60+) with no business income are exempt. Salaried
        employees with only salary income and sufficient TDS typically do not need
        advance tax unless they have additional income sources.
      </p>

      <hr />

      <h2>FY 2026-27 Due Dates and Percentages</h2>
      <table>
        <thead>
          <tr>
            <th>Installment</th>
            <th>Due Date</th>
            <th>Cumulative %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st</td>
            <td>15 June 2026</td>
            <td>15%</td>
          </tr>
          <tr>
            <td>2nd</td>
            <td>15 September 2026</td>
            <td>45%</td>
          </tr>
          <tr>
            <td>3rd</td>
            <td>15 December 2026</td>
            <td>75%</td>
          </tr>
          <tr>
            <td>4th</td>
            <td>15 March 2027</td>
            <td>100%</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2>How to Calculate Your Advance Tax</h2>
      <p>
        Estimate annual income, calculate tax under your regime, subtract TDS already
        deducted, and pay the balance in instalments. Use our{" "}
        <Link href="/tools/income-tax-calculator">Income Tax Calculator</Link> for
        the base tax computation.
      </p>

      <hr />

      <h2>Section 44ADA Special Rule</h2>
      <p>
        Freelancers under presumptive taxation (Section 44ADA) pay 100% of advance
        tax in a single payment by March 15 — no quarterly instalments. Calculate
        with our{" "}
        <Link href="/tools/freelancer-tax-calculator">
          Freelancer Tax Calculator
        </Link>
        . Guide:{" "}
        <Link href="/blog/section-44ada-freelancer-tax-guide">
          Section 44ADA freelancer tax guide
        </Link>
        .
      </p>

      <hr />

      <h2>Interest Penalty for Missing Instalments</h2>
      <p>
        Section 234B: 1% per month on unpaid tax from April 1 until payment. Section
        234C: 1% per month per quarter on each shortfall. Both are auto-calculated in
        your ITR.
      </p>

      <hr />

      <h2>What If Income Changes Mid-Year?</h2>
      <p>
        You can revise your advance tax estimate at the next instalment. No penalty
        applies if you pay correctly at each due date based on your revised estimate.
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
    </article>
  );
}
