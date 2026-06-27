import Link from "next/link";

const faqs = [
  {
    question: "How is HRA exemption calculated?",
    answer:
      "HRA exemption equals the minimum of three values: actual HRA received, actual rent paid minus 10% of basic salary, and 50% of basic salary for metro cities or 40% for non-metro cities. Only the minimum of these three is exempt.",
  },
  {
    question: "Which cities are considered metro for HRA purposes?",
    answer:
      "Only four cities are classified as metro for HRA tax purposes: Delhi, Mumbai, Chennai, and Kolkata. All other cities — including Bengaluru, Hyderabad, Pune, Ahmedabad, and others — are treated as non-metro, where the cap is 40% of basic salary instead of 50%.",
  },
  {
    question: "Can I claim HRA exemption under the new tax regime?",
    answer:
      "No — HRA exemption is only available under the old tax regime. Under the new tax regime (which is the default from FY2024-25), HRA and most other deductions cannot be claimed. You must explicitly opt for the old regime with your employer to claim HRA.",
  },
  {
    question: "Do I need rent receipts to claim HRA?",
    answer:
      "Yes — rent receipts are required as proof. If your annual rent exceeds ₹1 lakh (₹8,333/month), you must also provide your landlord's PAN to your employer. Without PAN, the employer must deduct TDS on the full HRA, eliminating most of the tax benefit.",
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

export default function HraExemptionCalculatorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        House Rent Allowance (HRA) is a common salary component in India that
        helps employees cover rental costs — and a portion can be exempt from
        income tax under Section 10(13A) of the Income Tax Act. The exemption is
        not automatic; it depends on your basic salary, actual rent paid, city of
        residence, and tax regime. Use our free{" "}
        <Link href="/tools/hra-calculator">HRA Calculator</Link> to see exempt
        vs taxable HRA, and read our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary &amp; Tax Guide for Indian Employees
        </Link>{" "}
        for the full picture.
      </p>

      <hr />

      <h2>The HRA Exemption Formula</h2>

      <p>
        HRA exemption is the <strong>minimum</strong> of these three amounts:
      </p>

      <ol>
        <li>Actual HRA received from your employer</li>
        <li>Actual rent paid minus 10% of basic salary</li>
        <li>
          50% of basic salary if you live in a metro city (Delhi, Mumbai, Chennai,
          Kolkata) <strong>or</strong> 40% of basic salary if you live in a
          non-metro city
        </li>
      </ol>

      <p>
        Only the lowest of the three figures qualifies as exempt. The rest of your
        HRA is taxable. The{" "}
        <Link href="/tools/hra-calculator">HRA Calculator</Link> runs all three
        conditions side by side so you can see which rule limits your exemption.
      </p>

      <hr />

      <h2>Worked Example — Bengaluru (Non-Metro)</h2>

      <p>
        Suppose your basic salary is ₹50,000/month, HRA received is ₹20,000/month,
        and rent paid is ₹18,000/month in Bengaluru (non-metro):
      </p>

      <ul>
        <li>(1) Actual HRA received = ₹20,000</li>
        <li>(2) Rent paid − 10% of basic = ₹18,000 − ₹5,000 = ₹13,000</li>
        <li>(3) 40% of basic (non-metro) = ₹20,000</li>
      </ul>

      <p>
        Minimum = <strong>₹13,000/month exempt</strong>. The remaining ₹7,000 of
        HRA is taxable each month.
      </p>

      <hr />

      <h2>Old Tax Regime Only</h2>

      <p>
        HRA exemption is available only under the <strong>old tax regime</strong>.
        From FY2024-25, the new tax regime is the default for salaried employees —
        you cannot claim HRA there. You must explicitly opt into the old regime
        with your employer (typically via Form 12BB at the start of the financial
        year) to claim HRA. Compare regimes in our{" "}
        <Link href="/blog/old-vs-new-tax-regime-india-2025">
          old vs new tax regime guide
        </Link>
        .
      </p>

      <hr />

      <h2>Documents You Need</h2>

      <p>
        Keep monthly rent receipts for the full year. If annual rent exceeds ₹1
        lakh, your landlord&apos;s PAN is mandatory. A rent agreement strengthens
        your claim during employer verification or IT scrutiny. For generating
        compliant receipts, see our{" "}
        <Link href="/blog/rent-receipt-for-hra-exemption-india">
          rent receipt for HRA exemption guide
        </Link>
        . Submit declarations through your employer&apos;s Form 12BB process.
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
          <Link href="/blog/rent-receipt-for-hra-exemption-india">
            How to Generate Rent Receipt for HRA Exemption
          </Link>
        </li>
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
      </ul>

      <hr />

      <p>
        <Link href="/tools/hra-calculator">
          Calculate Your HRA Exemption Free →
        </Link>
      </p>
    </article>
  );
}
