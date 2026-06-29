import Link from "next/link";

const faqs = [
  {
    question: "Who is eligible for statutory bonus in India?",
    answer:
      "Employees drawing a monthly salary of ₹21,000 or less who have worked for at least 30 working days in the financial year are eligible for statutory bonus under the Payment of Bonus Act, 1965. This applies to establishments with 20 or more employees.",
  },
  {
    question: "How is bonus calculated under the Payment of Bonus Act?",
    answer:
      "Bonus is calculated on the lower of your actual salary or ₹7,000 per month (the wage ceiling). Minimum bonus is 8.33% of this amount for the year (approximately ₹7,000 annually at ₹7,000/month ceiling). Maximum bonus is 20% (₹16,800 annually at ₹7,000/month). The actual percentage depends on your company's allocable surplus.",
  },
  {
    question: "Why is the bonus calculated on ₹7,000 even if my salary is higher?",
    answer:
      "The Payment of Bonus Act sets a wage ceiling of ₹7,000/month for bonus calculation purposes. This ceiling was set in the 2015 amendment and has not been revised since. It means employees earning more than ₹7,000 have their bonus calculated as if their salary were ₹7,000, regardless of their actual pay.",
  },
  {
    question: "Is bonus taxable in India?",
    answer:
      "Yes — bonus received from your employer is fully taxable as salary income under the Income Tax Act. It is added to your total income for the year and taxed at your applicable slab rate. TDS may be deducted by your employer on the bonus amount.",
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

export default function BonusCalculatorGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <p>
        Statutory bonus in India is governed by the Payment of Bonus Act, 1965.
        Use our free{" "}
        <Link href="/tools/bonus-calculator">Bonus Calculator India</Link> to
        check eligibility, wage ceiling, and minimum/maximum bonus. Part of our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary & Tax Guide for India
        </Link>
        .
      </p>

      <hr />

      <h2>What Is the Payment of Bonus Act, 1965?</h2>
      <p>
        The Act makes bonus mandatory for eligible employees in establishments
        with 20 or more workers. Bonus is linked to the company&apos;s allocable
        surplus — the percentage paid ranges from 8.33% (minimum) to 20%
        (maximum).
      </p>

      <hr />

      <h2>Eligibility</h2>
      <p>
        Monthly salary ≤ ₹21,000 and at least 30 working days in the financial
        year. Applies to factories and establishments covered under the Act.
      </p>

      <hr />

      <h2>The Wage Ceiling — ₹7,000/Month</h2>
      <p>
        Even if your salary is ₹15,000 or ₹21,000, bonus is calculated on a
        maximum of ₹7,000/month. This ceiling was set in the 2015 amendment and
        has not been updated since.
      </p>

      <hr />

      <h2>Minimum Bonus — 8.33%</h2>
      <p>
        At the ₹7,000 ceiling: ₹7,000 × 12 × 8.33% ≈ ₹6,997 (statutory minimum
        is ₹7,000 OR 8.33%, whichever is higher).
      </p>

      <hr />

      <h2>Maximum Bonus — 20%</h2>
      <p>
        Only if the company has sufficient allocable surplus/profit. At ₹7,000
        ceiling: ₹7,000 × 12 × 20% = ₹16,800 annually.
      </p>

      <hr />

      <h2>Ex-Gratia Bonus</h2>
      <p>
        Employees above ₹21,000/month are not eligible for statutory bonus. Any
        bonus paid is ex-gratia (goodwill) at the employer&apos;s discretion —
        no legal obligation.
      </p>

      <hr />

      <h2>When Is Bonus Paid?</h2>
      <p>
        Within 8 months of the financial year end. For April–March FY, bonus is
        typically paid by October or November.
      </p>

      <p>
        Related:{" "}
        <Link href="/tools/salary-hike-calculator">Salary Hike Calculator</Link>,{" "}
        <Link href="/tools/ctc-calculator">CTC Calculator</Link>.
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
        <Link href="/tools/bonus-calculator">Calculate Bonus Free →</Link>
      </p>
    </article>
  );
}
