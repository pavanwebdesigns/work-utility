import Link from "next/link";

const faqs = [
  {
    question: "What is the HSA contribution limit for 2026?",
    answer:
      "For 2026, you can contribute up to $4,300 for self-only HDHP coverage or $8,550 for family coverage. If you are age 55 or older, you can add an extra $1,000 catch-up contribution on top of the base limit.",
  },
  {
    question: "Do I need an HDHP to open an HSA?",
    answer:
      "Yes — you must be enrolled in a qualifying High Deductible Health Plan (HDHP) with no other disqualifying health coverage. For 2026, the minimum deductible is $1,650 for individual coverage and $3,300 for family coverage.",
  },
  {
    question: "What is the HSA triple tax advantage?",
    answer:
      "HSAs offer tax-deductible contributions, tax-free investment growth, and tax-free withdrawals for qualified medical expenses. After age 65, non-medical withdrawals are taxed like a traditional IRA — but without the 20% penalty that applies before 65.",
  },
  {
    question: "What happens if I no longer have an HDHP?",
    answer:
      "Your existing HSA balance remains yours and continues to grow tax-free. You can still use it for qualified medical expenses. However, you cannot make new contributions until you re-enroll in a qualifying HDHP.",
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

export default function HsaCalculatorGuideUsaContent() {
  return (
    <article className="prose-custom">
      <p>
        A Health Savings Account (HSA) is one of the most tax-efficient accounts
        available to US workers enrolled in a High Deductible Health Plan. Use
        our free{" "}
        <Link href="/tools/hsa-calculator">HSA Calculator 2026</Link> to check
        contribution limits, estimate tax savings, and project your balance at
        retirement. Related:{" "}
        <Link href="/blog/401k-vs-roth-ira-guide-usa">
          401k vs Roth IRA guide
        </Link>{" "}
        and{" "}
        <Link href="/blog/w2-vs-1099-tax-comparison-guide">
          W-2 vs 1099 tax comparison
        </Link>
        .
      </p>

      <hr />

      <h2>2026 HSA Contribution Limits</h2>
      <p>
        The IRS sets annual HSA limits that adjust for inflation. For 2026:{" "}
        <strong>$4,300</strong> for self-only HDHP coverage,{" "}
        <strong>$8,550</strong> for family coverage. Workers age 55+ can add a{" "}
        <strong>$1,000 catch-up</strong>. Our calculator shows remaining
        contribution room based on what you&apos;ve already contributed this
        year.
      </p>

      <hr />

      <h2>HDHP Requirements</h2>
      <p>
        To contribute to an HSA, you must be covered by a qualifying HDHP and
        have no other disqualifying health coverage (like a general-purpose
        FSA). For 2026, minimum deductibles are $1,650 (individual) and $3,300
        (family). Maximum out-of-pocket limits are $8,300 and $16,600
        respectively.
      </p>

      <hr />

      <h2>The Triple Tax Advantage</h2>
      <p>
        HSAs are unique among tax-advantaged accounts. Contributions reduce
        taxable income (federal and most states), investments grow tax-free, and
        withdrawals for qualified medical expenses are tax-free. Unlike FSAs,
        HSA funds roll over indefinitely — there is no use-it-or-lose-it rule.
      </p>

      <hr />

      <h2>HSA as a Retirement Healthcare Fund</h2>
      <p>
        Many workers max out their HSA and invest the balance for retirement
        healthcare costs. Fidelity estimates a 65-year-old couple may need
        $300,000+ for healthcare in retirement. Pair HSA planning with our{" "}
        <Link href="/tools/401k-calculator">401k Calculator</Link> for a
        complete retirement picture.
      </p>

      <hr />

      <h2>HSA for Self-Employed Workers</h2>
      <p>
        Self-employed individuals with an HDHP can contribute to an HSA and
        deduct contributions on their tax return. If you receive 1099 income,
        also review our{" "}
        <Link href="/tools/self-employment-tax">
          Self-Employment Tax Calculator
        </Link>{" "}
        to understand the full tax picture alongside HSA deductions.
      </p>

      <hr />

      <h2>What Happens When You Leave an HDHP</h2>
      <p>
        Switching to a non-HDHP plan (like a PPO) stops new contributions but
        does not forfeit your balance. You can still pay qualified medical
        expenses from the account. Re-enrolling in an HDHP restores your
        contribution eligibility for that year.
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
        <Link href="/tools/hsa-calculator">Calculate HSA Savings Free →</Link>
      </p>
    </article>
  );
}
