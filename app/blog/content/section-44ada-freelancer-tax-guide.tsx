import Link from "next/link";

const faqs = [
  {
    question: "What is the Section 44ADA limit for FY 2026-27?",
    answer:
      "₹75 lakhs if 95% or more of your gross receipts are through digital/banking channels. ₹50 lakhs if cash receipts exceed 5% of total receipts. If your gross receipts exceed the applicable limit, 44ADA is not available and regular taxation with books and audit applies.",
  },
  {
    question: "Can I claim 80C deductions under Section 44ADA?",
    answer:
      "Yes — deductions under Chapter VI-A (80C, 80D, 80G, etc.) are available under the old tax regime even when opting for 44ADA. Under the new tax regime, most deductions are not claimable. Choose your regime based on which gives you lower tax.",
  },
  {
    question: "Do I need to maintain books of accounts under Section 44ADA?",
    answer:
      "No — if you declare 50% or more of gross receipts as taxable income and stay within the ₹75L limit, you are exempt from maintaining books and getting a tax audit under Section 44ADA.",
  },
  {
    question: "What professions are eligible for Section 44ADA?",
    answer:
      "Specified professions under Section 44AA(1): legal practice, medical practitioners, engineers, architects, accountants (CA, CMA, CS), technical consultants, interior decorators, film artists (actors, directors, producers), and IT professionals. General consultancy and trading are not eligible.",
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

export default function Section44AdaFreelancerTaxGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        If you&apos;re a freelancer, consultant, or independent professional in
        India, <strong>Section 44ADA</strong> offers a simplified way to pay
        tax — declare 50% of gross receipts as income, skip maintaining books,
        and file ITR-4. Use our free{" "}
        <Link href="/tools/freelancer-tax-calculator">
          Section 44ADA Freelancer Tax Calculator
        </Link>{" "}
        to check eligibility and estimate tax, and see our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary &amp; Tax Guide for Indian Employees
        </Link>{" "}
        for broader tax context.
      </p>

      <hr />

      <h2>What Is Section 44ADA?</h2>
      <p>
        Section 44ADA is a presumptive taxation scheme for specified
        professionals. Instead of tracking every expense, you declare{" "}
        <strong>50% of gross receipts as taxable income</strong> and pay tax on
        that amount. No books of accounts required if you stay within the
        turnover limit.
      </p>

      <hr />

      <h2>Who Is Eligible?</h2>
      <p>
        Specified professions: IT/software developers, doctors, architects,
        engineers, lawyers, chartered accountants, interior designers, and film
        professionals (actors, directors, producers). General consultancy,
        trading, and non-specified professions are not eligible.
      </p>

      <hr />

      <h2>₹50L vs ₹75L Limit — The Digital Receipts Rule</h2>
      <p>
        If <strong>95% or more</strong> of your receipts come through
        digital/banking channels, the limit is <strong>₹75 lakh</strong>. If
        cash exceeds 5%, the limit drops to <strong>₹50 lakh</strong>. Above
        either limit, you must maintain books and file ITR-3 with potential tax
        audit.
      </p>

      <hr />

      <h2>How Tax Is Calculated — ₹30L Example (New Regime)</h2>
      <p>
        Gross receipts ₹30,00,000 → presumptive income ₹15,00,000 (50%). Under
        new regime FY 2026-27 slabs: tax computed on ₹15L with Section 87A
        rebate if applicable. Use the{" "}
        <Link href="/tools/freelancer-tax-calculator">
          44ADA Calculator
        </Link>{" "}
        for your exact figure, or compare with the{" "}
        <Link href="/tools/income-tax-calculator">
          Income Tax Calculator
        </Link>{" "}
        for employed income.
      </p>

      <hr />

      <h2>44ADA vs Regular Books</h2>
      <p>
        <strong>44ADA wins</strong> when your actual expenses are less than 50%
        of receipts — you pay tax on 50% even if you spent only 20%.{" "}
        <strong>Regular books win</strong> when actual expenses exceed 50% of
        receipts. Enter your actual expenses in the calculator to see which
        method saves more.
      </p>

      <hr />

      <h2>Advance Tax Under 44ADA</h2>
      <p>
        Unlike regular taxpayers who pay quarterly instalments, 44ADA filers pay{" "}
        <strong>100% of estimated tax by 15 March</strong> — a single payment.
        Missing this attracts interest under Section 234B/234C.
      </p>

      <hr />

      <h2>Can I Claim 80C and 80D?</h2>
      <p>
        Yes — under the <strong>old tax regime</strong>, Chapter VI-A deductions
        (80C up to ₹1.5L, 80D up to ₹25K, etc.) remain available even with
        44ADA. This is a common misconception. Under the new regime, most
        deductions are not claimable. Compare both with the{" "}
        <Link href="/tools/tax-regime-comparison">
          Old vs New Tax Regime Comparison
        </Link>{" "}
        and read{" "}
        <Link href="/blog/old-vs-new-tax-regime-india-2025">
          Old vs New tax regime India 2025
        </Link>
        .
      </p>

      <hr />

      <h2>ITR-4 (Sugam)</h2>
      <p>
        44ADA filers use <strong>ITR-4 (Sugam)</strong> — a simplified form
        designed for presumptive income schemes. No detailed profit-and-loss
        statement required.
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
          <Link href="/blog/old-vs-new-tax-regime-comparison-2026">
            Old vs New Tax Regime Comparison 2026
          </Link>
        </li>
        <li>
          <Link href="/blog/gst-for-freelancers-india">
            GST for Freelancers in India
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/freelancer-tax-calculator">
          Calculate Your 44ADA Tax Free →
        </Link>
      </p>
    </article>
  );
}
