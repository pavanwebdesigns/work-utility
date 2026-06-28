import Link from "next/link";

const faqs = [
  {
    question: "Will my take-home salary reduce under the New Labour Code?",
    answer:
      "For most employees whose basic salary is currently below 50% of CTC, take-home pay will decrease slightly while PF and gratuity savings increase. Total CTC remains unchanged — only the distribution between monthly cash and long-term benefits shifts.",
  },
  {
    question: "Does the 50% basic rule apply to everyone?",
    answer:
      "Yes, for all employees covered under the Code on Wages once it is implemented. However, employees whose current basic is already at or above 50% of CTC will see minimal or no change.",
  },
  {
    question: "When does the New Labour Code come into effect?",
    answer:
      "The Code on Wages was officially notified on 21 November 2025, with enforcement rolling out from April 2026. Implementation timelines vary by state as labour is a concurrent subject under the Constitution.",
  },
  {
    question: "How does the New Labour Code affect PF contributions?",
    answer:
      "PF is calculated as 12% of basic wages. Since the new code mandates a higher basic (at least 50% of CTC), PF contributions — from both employee and employer — increase, building a larger retirement corpus.",
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

export default function NewLabourCode2026SalaryGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        India&apos;s New Labour Code is reshaping how salaries are structured — and
        for most IT and corporate employees, the biggest change is the{" "}
        <strong>50% basic salary rule</strong>. Your total CTC stays the same,
        but more money flows into PF and gratuity while monthly take-home may
        drop slightly. Use our free{" "}
        <Link href="/tools/labour-code-calculator">
          New Labour Code 2026 Salary Calculator
        </Link>{" "}
        to see your exact numbers, and read our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary &amp; Tax Guide for Indian Employees
        </Link>{" "}
        for the full picture.
      </p>

      <hr />

      <h2>What Is the New Labour Code 2026?</h2>
      <p>
        India consolidated 29 central labour laws into four codes: Code on Wages,
        Industrial Relations, Social Security, and Occupational Safety. The{" "}
        <strong>Code on Wages 2019</strong> was officially notified on{" "}
        <strong>21 November 2025</strong>, with enforcement expected from{" "}
        <strong>April 2026</strong>. The most talked-about provision for salaried
        employees is the mandate that wages (primarily basic salary) must be at
        least <strong>50% of total remuneration (CTC)</strong>.
      </p>

      <hr />

      <h2>The 50% Basic Salary Rule — Plain English</h2>
      <p>
        Today, many companies keep basic at 20–35% of CTC and allocate the rest
        to HRA, special allowance, and other components. Under the new code,
        basic must rise to at least half of CTC. Allowances that currently make
        up the gap will shrink — and because PF and gratuity are calculated on
        basic, both go up automatically.
      </p>

      <hr />

      <h2>Who Is Affected?</h2>
      <p>
        Employees whose current basic is <strong>below 50% of CTC</strong> —
        which includes most IT professionals with 30–40% basic structures. If
        your basic is already 50% or higher, you may see little change. Compare
        your structure with the{" "}
        <Link href="/tools/ctc-calculator">CTC Calculator</Link> and{" "}
        <Link href="/tools/epf-calculator">EPF Calculator</Link> for related
        projections.
      </p>

      <hr />

      <h2>Real Example: ₹10 LPA Employee</h2>
      <p>
        For a ₹10,00,000 CTC employee with 30% basic today (₹3,00,000/year
        basic), the new code raises basic to ₹5,00,000 (50%). With standard PF
        (12% capped at ₹1,800/month), employee PF may stay capped — but with
        uncapped PF, employee contribution rises from ₹36,000 to ₹60,000/year.
        Take-home can drop by up to ₹48,000/year while PF corpus grows by the
        same amount. Run your own numbers in the{" "}
        <Link href="/tools/labour-code-calculator">
          Labour Code Salary Calculator
        </Link>
        .
      </p>

      <hr />

      <h2>PF Impact: Higher Basic = More Retirement Savings</h2>
      <p>
        EPF is 12% of basic wages from both employee and employer. A higher basic
        directly increases your retirement corpus — often by lakhs over a career.
        See year-by-year growth with our{" "}
        <Link href="/tools/epf-calculator">EPF Calculator</Link> and read{" "}
        <Link href="/blog/epf-calculator-guide-india">
          EPF calculator guide for India
        </Link>
        .
      </p>

      <hr />

      <h2>Gratuity Impact</h2>
      <p>
        Gratuity accrues as (Basic ÷ 26) × 15 per month of service. Higher basic
        means a larger gratuity payout when you leave after 5+ years. Calculate
        yours with the{" "}
        <Link href="/tools/gratuity-calculator">Gratuity Calculator</Link>.
      </p>

      <hr />

      <h2>Will My Take-Home Reduce?</h2>
      <p>
        For most employees — yes, slightly. The trade-off is deliberate: less
        cash today, more retirement wealth tomorrow. Your employer&apos;s total
        cost (CTC) does not change. Restructured salary also affects your tax
        liability — compare regimes with the{" "}
        <Link href="/tools/tax-regime-comparison">
          Old vs New Tax Regime Comparison
        </Link>{" "}
        and{" "}
        <Link href="/blog/how-to-calculate-in-hand-salary-from-ctc">
          how to calculate in-hand salary from CTC
        </Link>
        .
      </p>

      <hr />

      <h2>What Should You Do?</h2>
      <p>
        Check with your HR or payroll team for your company&apos;s exact
        restructuring plan. Request a revised salary slip once implemented. Use
        our calculator to prepare informed questions before that conversation.
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
          <Link href="/blog/how-to-calculate-in-hand-salary-from-ctc">
            How to Calculate In-Hand Salary from CTC
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
        <Link href="/tools/labour-code-calculator">
          Calculate Your Labour Code Salary Impact Free →
        </Link>
      </p>
    </article>
  );
}
