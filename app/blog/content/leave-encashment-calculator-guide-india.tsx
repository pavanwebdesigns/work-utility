import Link from "next/link";

const faqs = [
  {
    question: "Is leave encashment taxable in India?",
    answer:
      "Leave encashment during service is fully taxable as income. Leave encashment at retirement or resignation is partially exempt — the exemption is the minimum of the actual amount received, 10 months' salary, cash equivalent of leave, or ₹25 lakhs (the limit was raised from ₹3 lakhs to ₹25 lakhs in Budget 2023).",
  },
  {
    question: "How is leave encashment calculated for private sector employees?",
    answer:
      "For private sector employees, leave encashment is typically calculated as: (Monthly Basic Salary ÷ 26 working days) × Number of leave days to be encashed. Some companies use 30 days per month; check your employment agreement or company HR policy.",
  },
  {
    question: "What is the ₹25 lakh leave encashment exemption?",
    answer:
      "Budget 2023 raised the tax exemption limit for leave encashment at retirement or resignation from ₹3 lakhs to ₹25 lakhs for non-government employees. This exemption applies to the minimum of actual encashment received, 10 months' average salary, or ₹25 lakhs — whichever is lowest.",
  },
  {
    question: "Are casual leaves and sick leaves encashable?",
    answer:
      "Generally, only Earned Leave (EL) or Privilege Leave (PL) is eligible for encashment. Casual Leave (CL) and Sick Leave (SL) typically lapse unused and cannot be encashed, though specific rules depend on your employer's leave policy and applicable state labour laws.",
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

export default function LeaveEncashmentCalculatorGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        Leave encashment converts unused earned leave days into cash — common when
        resigning or retiring. Use our free{" "}
        <Link href="/tools/leave-encashment-calculator">
          Leave Encashment Calculator India
        </Link>{" "}
        to calculate amount and tax impact. Part of our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary & Tax Guide for India
        </Link>
        .
      </p>

      <hr />

      <h2>What Is Leave Encashment?</h2>
      <p>
        When you have unused earned leave (EL) or privilege leave (PL) at resignation
        or retirement, your employer may pay you cash equivalent instead of carrying
        forward the days. IT sector employees often have 30-45 days of EL to encash.
      </p>

      <hr />

      <h2>Types of Leave</h2>
      <p>
        <strong>Earned Leave / Privilege Leave:</strong> Usually encashable.
        <strong> Casual Leave:</strong> Typically lapses. <strong>Sick Leave:</strong>{" "}
        Usually not encashable. Check your company policy.
      </p>

      <hr />

      <h2>Tax Treatment</h2>
      <p>
        <strong>During service:</strong> Fully taxable at your income slab rate.{" "}
        <strong>At retirement/resignation:</strong> Partially exempt — minimum of
        actual amount, 10 months&apos; salary, cash equivalent, or ₹25 lakhs.
      </p>

      <hr />

      <h2>The ₹25 Lakh Exemption — Budget 2023</h2>
      <p>
        Budget 2023 raised the exemption from ₹3 lakhs to <strong>₹25 lakhs</strong> —
        an 8× increase benefiting both government and private sector employees. Most
        mid-level IT resignations now fall fully within the exempt limit.
      </p>

      <hr />

      <h2>How Leave Encashment Is Calculated</h2>
      <p>
        Private sector: <strong>(Monthly Basic ÷ 26) × Leave Days</strong>. Government:
        <strong> (Monthly Basic × 12 ÷ 300) × Leave Days</strong>. Example: ₹50,000
        basic, 30 days = ₹1,92,308 (private formula).
      </p>

      <hr />

      <h2>Can I Encash CL or SL?</h2>
      <p>
        Usually only EL/PL is encashable. CL and SL typically lapse. Some companies
        allow encashment of a portion of EL only at exit — verify with HR.
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

      <h2>Related Tools</h2>
      <ul>
        <li><Link href="/tools/gratuity-calculator">Gratuity Calculator</Link></li>
        <li><Link href="/tools/notice-period-calculator">Notice Period Calculator</Link></li>
        <li>
          <Link href="/blog/how-to-calculate-in-hand-salary-from-ctc">
            CTC to in-hand salary guide
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/leave-encashment-calculator">
          Calculate Leave Encashment Free →
        </Link>
      </p>
    </article>
  );
}
