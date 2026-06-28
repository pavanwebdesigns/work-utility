import Link from "next/link";

const faqs = [
  {
    question: "Should I choose old or new tax regime in 2026?",
    answer:
      "It depends on your deductions. If you have significant 80C investments (PPF, ELSS, LIC), HRA in a metro city, or home loan interest, the old regime often saves more. If you have fewer deductions or income up to ₹12 lakh, the new regime's zero-tax rebate makes it advantageous.",
  },
  {
    question: "What is the standard deduction in new regime for FY 2026-27?",
    answer:
      "₹75,000 for salaried employees under the new tax regime for FY 2026-27, increased from ₹50,000. The old regime continues with ₹50,000 standard deduction.",
  },
  {
    question: "Is HRA tax exemption available in new regime?",
    answer:
      "No — HRA exemption under Section 10(13A) is only available under the old tax regime. Under the new regime, you cannot claim HRA exemption regardless of actual rent paid.",
  },
  {
    question: "What income level is better off with new regime?",
    answer:
      "For income up to ₹12 lakh, the new regime's Section 87A rebate makes tax liability zero — making it clearly better. Above ₹12 lakh, comparison depends on your specific deductions. Use the side-by-side calculator to find your exact breakeven point.",
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

export default function OldVsNewTaxRegimeComparison2026Content() {
  return (
    <article className="prose-custom">
      <p>
        Choosing between the old and new tax regime is one of the most important
        financial decisions for salaried Indians each year. Budget 2025-26 made
        the new regime far more attractive — but the old regime still wins for
        many with heavy deductions. Use our free{" "}
        <Link href="/tools/tax-regime-comparison">
          Old vs New Tax Regime Comparison
        </Link>{" "}
        to see both side by side, and explore our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary &amp; Tax Guide for Indian Employees
        </Link>
        .
      </p>

      <hr />

      <h2>What Changed in Budget 2025-26 for the New Regime?</h2>
      <p>
        Two major changes: <strong>standard deduction raised to ₹75,000</strong>{" "}
        (from ₹50,000), and a full <strong>Section 87A rebate</strong> making
        tax zero for taxable income up to ₹12 lakh. These changes make the new
        regime the default choice for many middle-income earners.
      </p>

      <hr />

      <h2>Old Regime: Who Benefits?</h2>
      <p>
        The old regime rewards deductions: <strong>80C</strong> (PPF, ELSS, LIC
        up to ₹1.5L), <strong>80D</strong> health insurance (up to ₹25K),{" "}
        <strong>HRA exemption</strong> in metro cities, and{" "}
        <strong>home loan interest</strong> (Section 24). If you claim most of
        these, old regime often saves more. Calculate HRA with the{" "}
        <Link href="/tools/hra-calculator">HRA Calculator</Link>.
      </p>

      <hr />

      <h2>New Regime: Who Benefits?</h2>
      <p>
        Simple filers with few investments, no rent/HRA claims, and income up to
        ₹12 lakh benefit most. No documentation burden — standard deduction of
        ₹75,000 and zero tax up to ₹12L taxable income. Compare with the{" "}
        <Link href="/tools/income-tax-calculator">
          Income Tax Calculator
        </Link>{" "}
        for single-regime detail.
      </p>

      <hr />

      <h2>Break-Even Analysis</h2>
      <p>
        Above ₹12 lakh taxable income under new regime, the comparison depends
        on your specific deductions. A ₹12L salaried employee with ₹1.5L 80C and
        ₹15K/month HRA in a metro may still prefer old regime. Enter your exact
        numbers in the{" "}
        <Link href="/tools/tax-regime-comparison">
          side-by-side comparison tool
        </Link>{" "}
        to find your break-even point.
      </p>

      <hr />

      <h2>Step-by-Step Example: ₹12L Employee</h2>
      <p>
        Gross salary ₹12,00,000 with ₹1,50,000 80C and ₹15,000/month HRA in a
        metro city. Old regime: standard deduction ₹50K + HRA exemption +
        80C reduces taxable income significantly. New regime: only ₹75K standard
        deduction, no HRA or 80C — but 87A rebate may still apply depending on
        final taxable income. Run both in the calculator for exact figures.
      </p>

      <hr />

      <h2>The ₹12L Zero-Tax Advantage</h2>
      <p>
        Under new regime FY 2026-27, if your taxable income is ₹12 lakh or less
        after the ₹75,000 standard deduction, Section 87A rebate eliminates your
        entire tax liability. For a ₹12.75L gross salary employee with no other
        income, that means <strong>zero tax</strong>. Freelancers with side
        income should use the{" "}
        <Link href="/tools/freelancer-tax-calculator">
          Section 44ADA Calculator
        </Link>{" "}
        instead.
      </p>

      <hr />

      <h2>PPF and Old Regime</h2>
      <p>
        PPF investments qualify for 80C deduction — but only under the old
        regime. If you max out ₹1.5L in PPF annually, model returns with the{" "}
        <Link href="/tools/ppf-calculator">PPF Calculator</Link> and factor the
        tax benefit into your regime choice.
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
          <Link href="/blog/old-vs-new-tax-regime-india-2025">
            Old vs New Tax Regime India 2025
          </Link>
        </li>
        <li>
          <Link href="/blog/how-to-save-income-tax-india-legally">
            How to Save Income Tax Legally in India
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/tax-regime-comparison">
          Compare Old vs New Regime Free →
        </Link>
      </p>
    </article>
  );
}
