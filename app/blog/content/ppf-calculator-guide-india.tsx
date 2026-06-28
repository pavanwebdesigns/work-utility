import Link from "next/link";

const faqs = [
  {
    question: "What is the current PPF interest rate in 2026?",
    answer:
      "The PPF interest rate for Q2 FY 2026-27 (July–September 2026) is 7.1% per annum, compounded annually. The rate is set by the government each quarter and has remained unchanged since April 2020.",
  },
  {
    question: "Can I invest more than ₹1.5 lakh in PPF per year?",
    answer:
      "No — the maximum annual investment in PPF is ₹1,50,000. Any amount above this is returned without interest. The minimum annual investment to keep the account active is ₹500.",
  },
  {
    question: "When can I withdraw money from PPF before maturity?",
    answer:
      "Partial withdrawals are allowed from the 7th financial year onwards (i.e. from the year after completing 6 full years). You can withdraw up to 50% of the balance at the end of the 4th year (or the year immediately preceding the withdrawal, whichever is lower). Only one partial withdrawal is permitted per financial year.",
  },
  {
    question: "Is PPF better than FD for tax saving?",
    answer:
      "PPF offers Exempt-Exempt-Exempt (EEE) tax status — principal invested is 80C deductible, interest is tax-free, and maturity amount is tax-free. FD interest is fully taxable at your income slab rate. For long-term tax-efficient savings, PPF generally outperforms FD especially for higher tax bracket investors, though PPF has a 15-year lock-in.",
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

export default function PpfCalculatorGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        Public Provident Fund (PPF) is one of India&apos;s most trusted
        long-term savings instruments — government-backed, tax-free returns, and
        a 15-year lock-in that builds serious wealth through compounding. Use
        our free{" "}
        <Link href="/tools/ppf-calculator">PPF Calculator</Link> to project
        maturity value, year-by-year balance, and withdrawal eligibility. Part
        of our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary &amp; Tax Guide for Indian Employees
        </Link>
        .
      </p>

      <hr />

      <h2>What Is PPF?</h2>
      <p>
        PPF is a government savings scheme with a <strong>15-year lock-in</strong>,
        currently earning <strong>7.1% per annum</strong> (Q2 FY 2026-27). You
        can open an account at any post office or authorised bank. Maximum
        investment: ₹1,50,000/year. Minimum: ₹500/year to keep the account active.
      </p>

      <hr />

      <h2>PPF EEE Status Explained</h2>
      <p>
        PPF enjoys <strong>Exempt-Exempt-Exempt (EEE)</strong> status: investment
        is deductible under 80C (old regime), interest earned is tax-free, and
        maturity amount is tax-free. This triple exemption makes PPF one of the
        best tax-efficient investments in India. Compare regime impact with the{" "}
        <Link href="/tools/tax-regime-comparison">
          Old vs New Tax Regime Comparison
        </Link>
        .
      </p>

      <hr />

      <h2>How PPF Interest Is Calculated</h2>
      <p>
        Interest is calculated monthly on the minimum balance between the 5th
        and last day of each month, but credited annually.{" "}
        <strong>Tip: deposit before the 5th of the month</strong> to earn interest
        on that deposit for the full month. Our calculator uses annual
        compounding — the standard approach used by most PPF calculators.
      </p>

      <hr />

      <h2>Investment Limits</h2>
      <p>
        Minimum ₹500/year (penalty if you skip a year), maximum ₹1,50,000/year.
        Amounts above ₹1.5L are returned without interest. Lump sum or up to 12
        instalments per year are allowed.
      </p>

      <hr />

      <h2>Partial Withdrawal Rules</h2>
      <p>
        From the <strong>7th financial year</strong>, you can withdraw up to{" "}
        <strong>50% of the balance</strong> at the end of year 4 (or year 6,
        whichever is lower). One partial withdrawal per financial year. The{" "}
        <Link href="/tools/ppf-calculator">PPF Calculator</Link> shows when you
        become eligible.
      </p>

      <hr />

      <h2>Loan Against PPF</h2>
      <p>
        Between the <strong>3rd and 6th year</strong>, you can take a loan of up
        to <strong>25% of the balance at end of year 2</strong>. Useful for
        short-term needs without breaking the account. Loan must be repaid within
        36 months.
      </p>

      <hr />

      <h2>5-Year Extensions</h2>
      <p>
        After the initial 15-year period, extend in <strong>5-year blocks</strong>{" "}
        indefinitely — with or without further contributions. Each extension
        continues earning the prevailing interest rate.
      </p>

      <hr />

      <h2>PPF vs FD vs ELSS</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>PPF</th>
            <th>FD</th>
            <th>ELSS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Returns</td>
            <td>~7.1% (govt set)</td>
            <td>~6.5–7.5%</td>
            <td>Market-linked (~12–15% historical)</td>
          </tr>
          <tr>
            <td>Risk</td>
            <td>Zero (govt backed)</td>
            <td>Low (DICGC ₹5L)</td>
            <td>High (equity)</td>
          </tr>
          <tr>
            <td>Lock-in</td>
            <td>15 years</td>
            <td>1–5 years typical</td>
            <td>3 years</td>
          </tr>
          <tr>
            <td>Tax</td>
            <td>EEE</td>
            <td>Interest taxable</td>
            <td>LTCG on gains</td>
          </tr>
        </tbody>
      </table>
      <p>
        Compare FD returns with the{" "}
        <Link href="/tools/fd-calculator">FD Calculator</Link> and market-linked
        returns with the{" "}
        <Link href="/tools/sip-calculator">SIP Calculator</Link>. Read{" "}
        <Link href="/blog/fd-vs-sip-india-comparison">
          FD vs SIP comparison for India
        </Link>{" "}
        and{" "}
        <Link href="/blog/epf-calculator-guide-india">
          EPF calculator guide
        </Link>{" "}
        for another EEE investment option.
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
          <Link href="/blog/complete-salary-tax-guide-india">
            Complete Salary &amp; Tax Guide for Indian Employees
          </Link>
        </li>
        <li>
          <Link href="/blog/fd-vs-sip-india-comparison">
            FD vs SIP — Where Should You Invest in India?
          </Link>
        </li>
        <li>
          <Link href="/blog/old-vs-new-tax-regime-comparison-2026">
            Old vs New Tax Regime Comparison 2026
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/ppf-calculator">
          Calculate PPF Maturity Free →
        </Link>
      </p>
    </article>
  );
}
