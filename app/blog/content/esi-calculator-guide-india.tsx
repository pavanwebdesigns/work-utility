import Link from "next/link";

const faqs = [
  {
    question: "What is the ESI contribution rate in India for 2026?",
    answer:
      "The ESI contribution rates for FY 2026-27 are 0.75% of gross wages by the employee and 3.25% by the employer, totaling 4%. These rates were reduced from 1.75% (employee) and 4.75% (employer) in 2019 and have remained unchanged since.",
  },
  {
    question: "What is the ESI wage ceiling for FY 2026-27?",
    answer:
      "Employees earning gross wages up to ₹21,000 per month (₹25,000 for employees with disability) are covered under ESI. Employers of establishments with 10 or more employees in most sectors must register for ESI.",
  },
  {
    question: "Is ESI deducted from Basic or Gross salary?",
    answer:
      "ESI is calculated on gross wages — which includes basic salary, dearness allowance (DA), HRA, and most monthly allowances. One-time payments like bonuses and overtime wages above a threshold may or may not be included depending on the ESIC guidelines applicable.",
  },
  {
    question: "What happens to my ESI if my salary exceeds ₹21,000 mid-year?",
    answer:
      "If your salary crosses the ₹21,000 ceiling mid-contribution period (April-September or October-March), ESI contributions continue until the end of that contribution period. From the next contribution period onwards, you are no longer covered if your salary remains above the ceiling.",
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

export default function EsiCalculatorGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <p>
        Employee State Insurance (ESI) provides health and social security for
        Indian workers. Use our free{" "}
        <Link href="/tools/esi-calculator">ESI Calculator India</Link> to
        compute contributions and check eligibility. Part of our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary & Tax Guide for India
        </Link>
        .
      </p>

      <hr />

      <h2>What Is ESI?</h2>
      <p>
        The Employees&apos; State Insurance Corporation (ESIC) runs a social
        security scheme funded by employee and employer contributions. It covers
        medical care, sickness, maternity, disability, and dependent benefits.
      </p>

      <hr />

      <h2>ESI Eligibility</h2>
      <p>
        Gross wages ≤ ₹21,000/month (₹25,000 for disabled employees).
        Establishments with 10+ employees in manufacturing (20+ in other sectors)
        must register.
      </p>

      <hr />

      <h2>Contribution Rates</h2>
      <p>
        Employee: 0.75% of gross wages. Employer: 3.25%. Total: 4% of gross
        wages per month.
      </p>

      <hr />

      <h2>What Counts as Gross Wages?</h2>
      <p>
        Basic + DA + HRA + special allowances. Overtime and one-time bonuses may
        be excluded in some interpretations — state and employer practice varies.
      </p>

      <hr />

      <h2>ESI Benefits</h2>
      <p>
        Medical treatment (ESIC and empanelled hospitals), sickness benefit
        (70% wages, up to 91 days), maternity (100% wages, 26 weeks), disability
        benefit, dependent benefit, and funeral expenses.
      </p>

      <hr />

      <h2>ESI vs EPF</h2>
      <p>
        Both are mandatory deductions but serve different purposes. EPF is
        retirement savings (12% employee + 12% employer on basic up to ₹15,000).
        ESI is health and social security (0.75% + 3.25% on gross up to
        ₹21,000).
      </p>

      <hr />

      <h2>Salary Crosses ₹21,000 Mid-Year</h2>
      <p>
        ESI continues until the contribution period ends (April–Sep or Oct–Mar).
        From the next period, coverage stops if salary remains above the ceiling.
      </p>

      <p>
        Related:{" "}
        <Link href="/tools/epf-calculator">EPF Calculator</Link>,{" "}
        <Link href="/tools/professional-tax-calculator">
          Professional Tax Calculator
        </Link>,{" "}
        <Link href="/tools/ctc-calculator">CTC Calculator</Link>,{" "}
        <Link href="/blog/ctc-to-in-hand-salary-india">
          CTC to in-hand salary guide
        </Link>
        .
      </p>

      <hr />

      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq) => (
        <div key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}

      <p>
        <Link href="/tools/esi-calculator">Calculate ESI Free →</Link>
      </p>
    </article>
  );
}
