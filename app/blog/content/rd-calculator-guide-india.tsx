import Link from "next/link";

const faqs = [
  {
    question: "How is RD interest calculated in India?",
    answer:
      "RD interest in India is calculated using quarterly compounding. The bank applies interest at one-quarter of the annual rate every three months on the running balance. The standard formula used is M = R × [(1+i)^n − 1] / [1 − (1+i)^(-1/3)], where R is monthly deposit, i is quarterly interest rate, and n is number of quarters.",
  },
  {
    question: "Is RD interest taxable in India?",
    answer:
      'Yes — RD interest is fully taxable as "Income from Other Sources" at your applicable slab rate. Banks deduct 10% TDS if your total interest (across all deposits at that bank) exceeds ₹40,000 per year (₹50,000 for senior citizens). Submit Form 15G or 15H to avoid TDS if your total income is below the taxable limit.',
  },
  {
    question: "Which is better — RD or FD?",
    answer:
      "If you have a lump sum available, FD typically gives slightly higher returns since the full amount earns interest from day one. If you want to save regularly from monthly income, RD is ideal — it enforces discipline and earns better returns than a regular savings account. For long-term wealth creation with market-linked returns, SIP in equity mutual funds historically outperforms both.",
  },
  {
    question: "What is the minimum deposit in an RD?",
    answer:
      "Most Indian banks allow RD deposits starting from ₹100-₹500 per month, with no maximum limit. The minimum tenure is typically 6 months, and some banks offer RD tenures up to 10 years.",
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

export default function RdCalculatorGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        A Recurring Deposit (RD) is a monthly savings scheme offered by Indian
        banks with a fixed interest rate and guaranteed returns. Use our free{" "}
        <Link href="/tools/rd-calculator">RD Calculator India</Link> to project
        maturity value, interest earned, and compare RD vs FD returns. Part of our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary & Tax Guide for India
        </Link>
        .
      </p>

      <hr />

      <h2>What Is a Recurring Deposit?</h2>
      <p>
        RD lets you deposit a fixed amount every month for a chosen tenure. The
        bank pays a fixed interest rate — typically 6.5–7.5% depending on bank and
        tenure — and returns your deposits plus interest at maturity. It is ideal
        for disciplined monthly saving without market risk.
      </p>

      <hr />

      <h2>How RD Interest Is Calculated</h2>
      <p>
        Most Indian banks use <strong>quarterly compounding</strong>. Each quarter,
        interest is calculated on the running balance (including prior interest).
        The standard formula:
      </p>
      <p>
        <strong>M = R × [(1 + i)^n − 1] / [1 − (1 + i)^(−1/3)]</strong>
      </p>
      <p>
        Where R = monthly deposit, i = quarterly rate (annual rate ÷ 4 ÷ 100), n =
        number of quarters. Example: ₹5,000/month at 7% for 2 years → maturity
        approximately ₹1,29,099.
      </p>

      <hr />

      <h2>RD vs FD — Which Is Better?</h2>
      <p>
        If you have a lump sum,{" "}
        <Link href="/tools/fd-calculator">FD</Link> typically earns slightly more
        because the full amount compounds from day one. RD is better when you save
        from monthly income — it enforces discipline and beats a savings account.
        Compare both with our{" "}
        <Link href="/blog/fd-vs-sip-india-comparison">FD vs SIP comparison</Link>.
      </p>

      <hr />

      <h2>RD vs SIP — Risk vs Return</h2>
      <p>
        RD offers guaranteed, fixed returns but interest is fully taxable.{" "}
        <Link href="/tools/sip-calculator">SIP</Link> in equity mutual funds is
        market-linked with potentially higher long-term returns and more tax-efficient
        LTCG treatment on equity — but with volatility and no guarantee.
      </p>

      <hr />

      <h2>TDS on RD Interest</h2>
      <p>
        Banks deduct 10% TDS when total interest across all deposits at that bank
        exceeds ₹40,000/year (₹50,000 for senior citizens). Submit Form 15G or 15H
        if your total income is below the taxable limit to avoid upfront TDS
        deduction.
      </p>

      <hr />

      <h2>Current RD Rates (June 2026)</h2>
      <p>
        Rates change frequently — verify on the bank website before opening. Rough
        ranges: SBI 6.5–7.0%, HDFC 7.0–7.4%, ICICI 6.9–7.25%. Small finance banks
        may offer higher rates for select tenures.
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

      <h2>Related Tools & Guides</h2>
      <ul>
        <li>
          <Link href="/tools/fd-calculator">FD Calculator</Link>
        </li>
        <li>
          <Link href="/tools/sip-calculator">SIP Calculator</Link>
        </li>
        <li>
          <Link href="/blog/fd-vs-sip-india-comparison">
            FD vs SIP India Comparison
          </Link>
        </li>
        <li>
          <Link href="/blog/complete-salary-tax-guide-india">
            Complete Salary & Tax Guide India
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/rd-calculator">Calculate RD Maturity Free →</Link>
      </p>
    </article>
  );
}
