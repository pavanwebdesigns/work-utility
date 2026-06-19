import Link from "next/link";

const faqs = [
  {
    question: "What is FOIR and why does it affect loan eligibility?",
    answer:
      "FOIR is the percentage of your monthly income committed to EMI payments. Most Indian banks require this to stay within 40-50%, so existing EMIs directly reduce how much additional loan you qualify for.",
  },
  {
    question: "Will this give me the exact amount a bank will approve?",
    answer:
      "No — this is an estimate based on income-to-EMI ratio guidelines. Actual bank approval also considers your CIBIL score, employment type, age, and specific bank policies. Use this as a starting reference.",
  },
  {
    question: "Does CIBIL score affect eligibility?",
    answer:
      "Yes significantly — a score above 750 typically gets best rates and easier approvals, while lower scores may result in higher rates or rejection regardless of income. This calculator doesn't model CIBIL.",
  },
  {
    question: "What's the difference between home loan and personal loan eligibility?",
    answer:
      "Home loans allow higher amounts (property acts as collateral) at lower rates with longer tenures. Personal loans are unsecured, have higher rates, shorter tenures, and lower maximum amounts relative to income.",
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

export default function LoanEligibilityCalculatorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Before you apply, estimate how much a bank is likely to approve using our free{" "}
        <Link href="/tools/loan-eligibility">Loan Eligibility Calculator India</Link>.
        It uses FOIR (Fixed Obligation to Income Ratio) guidelines that most Indian lenders follow — showing both a conservative 40% cap and an optimistic 50% figure, plus EMI for your desired loan amount.
      </p>
      <hr />
      <h2>What Is FOIR?</h2>
      <p>
        FOIR stands for Fixed Obligation to Income Ratio — the percentage of your monthly take-home income that goes toward total EMI payments (existing loans plus the new loan). Most Indian banks cap FOIR at 40% to 50%. If you earn ₹80,000/month and already pay ₹15,000 in EMIs, only ₹17,000–₹25,000/month remains for a new EMI depending on the lender&apos;s threshold.
      </p>
      <hr />
      <h2>Why Existing EMIs Reduce Eligibility</h2>
      <p>
        Banks look at total monthly obligations, not just the new loan. A car loan, personal loan, or credit card EMI already counted against your income leaves less room for a home loan. That is why the calculator asks for existing EMIs separately from your desired loan amount.
      </p>
      <hr />
      <h2>Other Factors Banks Consider</h2>
      <ul>
        <li><strong>CIBIL score</strong> — 750+ typically unlocks best rates; lower scores can mean rejection even with strong income.</li>
        <li><strong>Employment stability</strong> — salaried employees with steady tenure are viewed more favourably than frequent job changers or self-employed applicants without documented income.</li>
        <li><strong>Age at loan maturity</strong> — most banks require the loan to close before age 60–65.</li>
        <li><strong>Property LTV (home loans)</strong> — lenders finance up to 75–90% of property value; you must fund the rest as down payment.</li>
      </ul>
      <hr />
      <h2>Worked Example: ₹80,000 Income, ₹15,000 Existing EMI</h2>
      <p>Suppose your monthly take-home is ₹80,000 and existing EMIs total ₹15,000:</p>
      <ol>
        <li>At 40% FOIR, max total EMI = ₹80,000 × 0.40 = ₹32,000.</li>
        <li>Available for new loan EMI = ₹32,000 − ₹15,000 = ₹17,000/month.</li>
        <li>At 8.5% p.a. over 20 years, ₹17,000/month EMI supports roughly ₹18–19 lakh principal (use the calculator for exact figures).</li>
        <li>At 50% FOIR, max total EMI = ₹40,000; available new EMI = ₹25,000/month — a higher eligible amount.</li>
      </ol>
      <p>
        Pair this with our{" "}
        <Link href="/tools/emi-calculator">EMI Calculator</Link> to see repayment breakdowns, and read the{" "}
        <Link href="/blog/complete-salary-tax-guide-india">Complete Salary &amp; Tax Guide India</Link> for take-home pay context.
      </p>
      <hr />
      <h2>Related Reading</h2>
      <ul>
        <li>
          <Link href="/blog/compound-interest-calculator-guide">Compound Interest Calculator Guide</Link>
        </li>
        <li>
          <Link href="/blog/complete-salary-tax-guide-india">Complete Salary &amp; Tax Guide India</Link>
        </li>
      </ul>
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
      <p>
        <Link href="/tools/loan-eligibility">Check Your Loan Eligibility Now →</Link>
      </p>
    </article>
  );
}
