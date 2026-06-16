import Link from "next/link";

const faqs = [
  {
    question: "Can I claim LTA without actually traveling?",
    answer:
      "No. LTA exemption requires that travel actually took place during the leave period, with supporting tickets/proof. Claiming LTA without travel is treated as a false tax exemption claim.",
  },
  {
    question: "Does LTA cover international travel?",
    answer:
      "No. LTA exemption only applies to travel within India.",
  },
  {
    question: "What documents do I need to claim LTA?",
    answer:
      "Travel tickets, boarding passes, or other proof of journey, along with a declaration form your employer typically provides during the LTA claim window.",
  },
  {
    question: "What happens to unused LTA in my salary?",
    answer:
      "If you don't travel or don't have eligible travel expenses to claim, the LTA component in your salary becomes fully taxable, just like any other salary component.",
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

export default function LtaExemptionRulesIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        LTA is one of the most underused tax exemptions in Indian salary
        structures — mainly because the rules around what qualifies are stricter
        than most employees realize, and the paperwork requirements catch people
        off guard at tax-filing time. For the full picture on salary components
        and tax, see our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary &amp; Tax Guide for Indian Employees
        </Link>
        .
      </p>

      <hr />

      <h2>What LTA Actually Covers</h2>

      <p>
        LTA exemption covers only the actual travel cost (airfare, train, or bus
        fare) for you and your family during a vacation — it does not cover
        hotel stays, food, sightseeing, or local transport at the destination.
        The exemption is capped at the lower of: your actual LTA component in
        your salary structure, or the actual eligible travel fare incurred.
      </p>

      <hr />

      <h2>The &quot;Shortest Route&quot; and Mode-of-Transport Rules</h2>

      <p>
        The exemption is calculated based on the shortest route to your
        destination, using a defined hierarchy: economy class airfare by the
        national carrier (if traveling by air), first-class AC rail fare (if
        traveling by train on a route with rail connectivity), or the cheapest
        mode for routes without air/rail connectivity. If you actually spent
        more (business class flight, for example), only the eligible
        economy-equivalent amount is exempt — the rest is taxable.
      </p>

      <hr />

      <h2>The Block-of-4-Years Rule</h2>

      <p>
        LTA exemption can be claimed twice within a block of 4 calendar years,
        not financial years — these blocks are fixed by the government (the
        current block runs 2022–2025). If you don&apos;t use both claims within
        a block, one unused claim can be carried over to the first year of the
        next block, but only one.
      </p>

      <hr />

      <h2>Worked Example</h2>

      <p>
        If your salary structure includes an LTA component of ₹40,000/year, and
        your family&apos;s actual eligible travel fare for a trip is ₹28,000,
        only ₹28,000 is exempt — the remaining ₹12,000 of your LTA component is
        added back to your taxable salary. The{" "}
        <Link href="/tools/lta-calculator">LTA Calculator</Link> splits this for
        you instantly, showing the exempt and taxable portions side by side.
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
          <Link href="/blog/epf-calculator-guide-india">
            EPF Calculator Guide for India
          </Link>
        </li>
        <li>
          <Link href="/blog/gratuity-calculation-formula-india">
            Gratuity Calculation Formula in India
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/lta-calculator">
          Calculate Your LTA Exemption →
        </Link>
      </p>
    </article>
  );
}
