import Link from "next/link";

const faqs = [
  {
    question: "What is the maximum Professional Tax in India?",
    answer:
      "The maximum professional tax any state can levy is ₹2,500 per year, as capped by Article 276 of the Indian Constitution. Most states with a simple slab structure have a maximum of ₹2,400-₹2,500 annually.",
  },
  {
    question: "Which states in India don't have Professional Tax?",
    answer:
      "Professional Tax is not levied in several major states including Delhi, Uttar Pradesh, Rajasthan, Haryana, Punjab, Uttarakhand, Himachal Pradesh, and Goa. Professional Tax is a state subject and these states have chosen not to implement it.",
  },
  {
    question: "Why is Maharashtra PT ₹300 in February?",
    answer:
      "Maharashtra's standard PT is ₹200/month. However, if you deduct ₹200 × 12 = ₹2,400 annually, it falls ₹100 short of the ₹2,500 constitutional limit. To maximize collection within the limit, Maharashtra charges ₹300 in February (₹200 + ₹100 extra), bringing the annual total to exactly ₹2,500.",
  },
  {
    question: "Are women exempt from Professional Tax in Maharashtra?",
    answer:
      "Yes — women earning ₹25,000 or less per month are exempt from Professional Tax in Maharashtra. For women earning above ₹25,000/month, standard PT rates apply.",
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

export default function ProfessionalTaxCalculatorGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        Professional Tax (PT) is a state-level deduction from salaried income in
        India. Use our free{" "}
        <Link href="/tools/professional-tax-calculator">
          Professional Tax Calculator
        </Link>{" "}
        for all 18 PT-levying states. Part of our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary & Tax Guide for India
        </Link>
        .
      </p>

      <hr />

      <h2>What Is Professional Tax?</h2>
      <p>
        Professional Tax is levied by state governments on salaried individuals
        and professionals. The constitutional maximum is ₹2,500 per year under
        Article 276. Your employer deducts it monthly and deposits it with the
        state.
      </p>

      <hr />

      <h2>Which States Levy PT?</h2>
      <p>
        18 states levy PT including Maharashtra, Karnataka, Telangana, West Bengal,
        Gujarat, and Tamil Nadu. Major states without PT include Delhi, Uttar
        Pradesh, Haryana, Rajasthan, and Punjab.
      </p>

      <hr />

      <h2>State-wise Slabs (Major States)</h2>
      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>Max Monthly PT</th>
            <th>Annual Max</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Maharashtra</td>
            <td>₹200 (₹300 in Feb)</td>
            <td>₹2,500</td>
          </tr>
          <tr>
            <td>Karnataka</td>
            <td>₹200</td>
            <td>₹2,400</td>
          </tr>
          <tr>
            <td>Telangana</td>
            <td>₹200</td>
            <td>₹2,400</td>
          </tr>
          <tr>
            <td>West Bengal</td>
            <td>₹200</td>
            <td>₹2,400</td>
          </tr>
          <tr>
            <td>Gujarat</td>
            <td>₹200</td>
            <td>₹2,400</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2>Maharashtra&apos;s February Quirk</h2>
      <p>
        Standard PT is ₹200/month, but February is ₹300 to reach the ₹2,500 annual
        cap (11 × ₹200 + ₹300 = ₹2,500).
      </p>

      <hr />

      <h2>Maharashtra Women&apos;s Exemption</h2>
      <p>
        Women earning ₹25,000 or less per month pay ₹0 PT in Maharashtra. Above
        ₹25,000, standard slabs apply.
      </p>

      <hr />

      <h2>Section 16(iii) Deduction</h2>
      <p>
        Professional Tax paid is deductible from salary income under Section
        16(iii), reducing your income tax liability. Related:{" "}
        <Link href="/tools/ctc-calculator">CTC Calculator</Link>,{" "}
        <Link href="/tools/income-tax-calculator">Income Tax Calculator</Link>.
      </p>

      <hr />

      <h2>Remote Work and PT</h2>
      <p>
        PT is based on your employer&apos;s registered office state, not where you
        physically work from.
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
    </article>
  );
}
