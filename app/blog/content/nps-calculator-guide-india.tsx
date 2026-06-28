import Link from "next/link";

const faqs = [
  {
    question: "What is the minimum monthly contribution to NPS?",
    answer:
      "The minimum contribution to NPS Tier 1 is ₹500 per month, or ₹1,000 per year. There is no maximum limit on contributions, though tax deductions under Section 80CCD are capped at 10% of salary under 80CCD(1) and an additional ₹50,000 under 80CCD(1B).",
  },
  {
    question: "Can I withdraw the full NPS corpus at retirement?",
    answer:
      "No — at least 40% of the NPS corpus must be used to purchase an annuity from a PFRDA-approved Annuity Service Provider (ASP) to receive a regular monthly pension. You can withdraw the remaining 60% as a tax-free lump sum at retirement.",
  },
  {
    question: "Is NPS better than PPF?",
    answer:
      "Both serve different purposes. NPS is market-linked with potentially higher returns (10-12% historically) and offers additional ₹50,000 deduction under 80CCD(1B), but has a mandatory annuity component and limited liquidity. PPF offers guaranteed 7.1% returns, complete EEE tax status, and more flexibility for partial withdrawals. For retirement planning, combining both is often recommended.",
  },
  {
    question: "Is NPS available under the new tax regime?",
    answer:
      "Under the new tax regime, only your employer's NPS contribution under Section 80CCD(2) is deductible (up to 10% of salary for private employees). Self-contributions under 80CCD(1) and the extra ₹50,000 under 80CCD(1B) are not available under the new regime.",
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

export default function NpsCalculatorGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        The National Pension System (NPS) is a government-backed retirement scheme
        regulated by PFRDA, offering market-linked returns and significant tax
        benefits. Use our free{" "}
        <Link href="/tools/nps-calculator">NPS Calculator India</Link> to project
        corpus, monthly pension, and tax savings. Part of our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary & Tax Guide for India
        </Link>
        .
      </p>

      <hr />

      <h2>What Is NPS?</h2>
      <p>
        NPS is a voluntary, long-term retirement savings scheme where your
        contributions are invested in market-linked funds (equity, corporate bonds,
        government securities). At retirement, you withdraw a lump sum and purchase
        an annuity for regular pension income.
      </p>

      <hr />

      <h2>NPS Tier 1 vs Tier 2</h2>
      <p>
        <strong>Tier 1</strong> is the main retirement account with tax benefits
        and withdrawal restrictions until age 60. <strong>Tier 2</strong> is a
        voluntary savings account with no tax benefits but flexible withdrawals —
        like a mutual fund with easier access.
      </p>

      <hr />

      <h2>NPS Tax Benefits — Old vs New Regime</h2>
      <p>
        Under the <strong>old regime</strong>: Section 80CCD(1) allows deduction up
        to 10% of salary (within ₹1.5L 80C limit), plus Section 80CCD(1B) offers an
        additional ₹50,000 exclusively for NPS. Under the <strong>new regime</strong>,
        only employer contributions under 80CCD(2) are deductible.
      </p>

      <hr />

      <h2>The 40%/60% Rule at Retirement</h2>
      <p>
        At exit, minimum 40% of corpus must buy an annuity for monthly pension.
        Up to 60% can be withdrawn as a tax-free lump sum. Our calculator lets you
        adjust annuity percentage from 40% to 100%.
      </p>

      <hr />

      <h2>How to Choose Annuity Percentage</h2>
      <p>
        Higher annuity = more monthly pension but less lump sum flexibility. Lower
        annuity (minimum 40%) = larger tax-free lump sum at retirement. Choose based
        on whether you need regular income or a one-time corpus for other goals.
      </p>

      <hr />

      <h2>NPS vs PPF vs EPF</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>NPS</th>
            <th>PPF</th>
            <th>EPF</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Returns</td>
            <td>Market-linked (~10-12%)</td>
            <td>Guaranteed 7.1%</td>
            <td>EPFO declared rate</td>
          </tr>
          <tr>
            <td>Lock-in</td>
            <td>Until 60</td>
            <td>15 years</td>
            <td>Until retirement</td>
          </tr>
          <tr>
            <td>Tax</td>
            <td>80CCD deductions; 60% lump sum tax-free</td>
            <td>EEE status</td>
            <td>EEE status</td>
          </tr>
          <tr>
            <td>Liquidity</td>
            <td>Limited partial withdrawal</td>
            <td>Partial from year 7</td>
            <td>Partial withdrawal rules</td>
          </tr>
        </tbody>
      </table>
      <p>
        Compare with{" "}
        <Link href="/tools/ppf-calculator">PPF Calculator</Link> and{" "}
        <Link href="/tools/epf-calculator">EPF Calculator</Link>. Guide:{" "}
        <Link href="/blog/ppf-calculator-guide-india">PPF calculator guide</Link>.
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

      <p>
        <Link href="/tools/nps-calculator">Calculate NPS Corpus Free →</Link>
      </p>
    </article>
  );
}
