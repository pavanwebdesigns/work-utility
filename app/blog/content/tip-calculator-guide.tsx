import Link from "next/link";

const faqs = [
  {
    question: "Should I tip on the amount before or after tax?",
    answer:
      "Both conventions are common — tipping on the pre-tax subtotal is technically more standard, but many people simply tip on the total bill for simplicity. Either is acceptable; consistency matters more than which one you pick.",
  },
  {
    question: "What's a standard tip percentage?",
    answer:
      "In the US, 15-20% is common for standard table service, though this varies by region, service quality, and context. Tipping customs differ significantly outside the US — check local norms when traveling.",
  },
  {
    question: "How do I split a bill fairly if people ordered different amounts?",
    answer:
      "An even split (total ÷ number of people) is simplest, but if there's a big difference in what people ordered, splitting based on each person's actual order is generally considered fairer.",
  },
  {
    question: "Does this calculator account for sales tax separately?",
    answer:
      "Check how the total you enter is calculated — if you enter the post-tax total, the tip will be calculated on that combined amount.",
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

export default function TipCalculatorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Splitting a bill unevenly between people in your head — especially after a
        few drinks, or with an odd number of people — is exactly where mental math
        mistakes happen. Group dinners often need quick, confident numbers
        without passing a calculator around or arguing over who owes what. Our
        free{" "}
        <Link href="/tools/tip-calculator">Tip Calculator</Link> handles the
        math instantly.
      </p>

      <hr />

      <h2>Why a Tip Calculator Helps Beyond Basic Math</h2>
      <p>
        Even simple percentages get tricky when you are adding a tip and dividing
        among several people at once. A dedicated calculator shows the tip amount,
        grand total, and per-person share in one step — so everyone can pay
        confidently without second-guessing the numbers.
      </p>

      <hr />

      <h2>Standard Tipping Conventions</h2>
      <p>
        US restaurant tipping norms typically range 15–20% for standard service,
        sometimes 18–25% in certain contexts — though this varies regionally and
        by service type, and should be treated as general practice rather than a
        fixed rule. Many other countries handle tipping very differently: service
        charge may already be included, tipping may be optional, or it may not be
        customary at all. Local custom matters more than any single global rule.
      </p>

      <hr />

      <h2>Splitting Evenly vs Splitting by Order</h2>
      <p>
        The{" "}
        <Link href="/tools/tip-calculator">Tip Calculator</Link> handles the
        simple &quot;split total evenly among N people&quot; case well. If people
        ordered very different amounts, splitting by each person&apos;s actual
        order — rather than dividing the full total equally — is generally the
        fairer approach in that scenario, though it requires tracking individual
        orders separately.
      </p>

      <hr />

      <h2>Tip Before or After Tax</h2>
      <p>
        Some people calculate tip on the pre-tax subtotal; others tip on the
        post-tax total. Both are common practice. Our calculator applies the tip
        percentage to whatever bill amount you enter — so if you want to tip on
        the pre-tax subtotal, enter that subtotal; if you prefer tipping on the
        full total including tax, enter the post-tax amount. Neither approach is
        inherently wrong; picking one convention and sticking with it is what
        matters.
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
          <Link href="/tools/discount-calculator">Discount Calculator</Link> —
          calculate sale prices and savings during shopping
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/tip-calculator">
          Calculate Your Tip and Split the Bill Now →
        </Link>
      </p>
    </article>
  );
}
