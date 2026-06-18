import Link from "next/link";

const faqs = [
  {
    question: "What does PITI mean in a mortgage payment?",
    answer:
      "PITI stands for Principal, Interest, Taxes, and Insurance — the four components that typically make up a full monthly mortgage payment, beyond just the loan repayment itself.",
  },
  {
    question: "Why do I have to pay PMI?",
    answer:
      "Private Mortgage Insurance is generally required when your down payment is under 20% of the home price. It protects the lender if you default, not you directly, and can usually be removed once you've built enough equity.",
  },
  {
    question: "Why is most of my early mortgage payment interest instead of principal?",
    answer:
      "Interest is calculated on your remaining loan balance, which is highest early in the loan — so a larger share of each payment goes to interest at first, gradually shifting toward principal as the balance shrinks.",
  },
  {
    question: "How much can extra payments actually save?",
    answer:
      "Even a modest extra amount paid early in a 30-year loan can meaningfully shorten the payoff timeline and reduce total interest, since it directly reduces the balance that future interest is calculated on — the calculator's extra-payment simulator shows the exact effect for your numbers.",
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

export default function MortgageCalculatorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Buying a home? Use our free{" "}
        <Link href="/tools/mortgage-calculator">Mortgage Calculator</Link> to see your
        full monthly payment, PMI, taxes, insurance, amortization schedule, and how
        extra payments save interest.
      </p>
      <hr />
      <h2>What&apos;s in a Monthly Mortgage Payment (PITI)</h2>
      <p>
        Many basic calculators only show principal and interest — then buyers are
        surprised by the real monthly cost. A full US mortgage payment typically
        includes <strong>PITI</strong>:
      </p>
      <ul>
        <li>
          <strong>Principal</strong> — the portion that pays down your loan balance
        </li>
        <li>
          <strong>Interest</strong> — the cost of borrowing, calculated on your
          remaining balance
        </li>
        <li>
          <strong>Taxes</strong> — property taxes, often collected monthly via escrow
        </li>
        <li>
          <strong>Insurance</strong> — homeowners insurance, also often escrowed
        </li>
      </ul>
      <p>
        Our calculator also adds <strong>PMI</strong> (when down payment is under
        20%) and optional <strong>HOA fees</strong> so you see the true monthly total,
        not just P&amp;I.
      </p>
      <hr />
      <h2>Understanding PMI</h2>
      <p>
        <strong>Private Mortgage Insurance (PMI)</strong> is generally required when
        your down payment is less than 20% of the home price. It protects the{" "}
        <em>lender</em>, not you, if you default on the loan.
      </p>
      <p>
        PMI is one of the most misunderstood costs for first-time buyers — it can add
        $100–$300+ per month depending on loan size and rate. It can usually be removed
        once you&apos;ve built enough equity (typically when your loan balance reaches
        80% of the home&apos;s value), though exact requirements vary by lender.
      </p>
      <p>
        Our calculator estimates PMI at a default annual rate of the loan amount and
        shows when equity conceptually reaches 20% — informational, not a guarantee
        of removal timing.
      </p>
      <hr />
      <h2>Why the Amortization Schedule Matters</h2>
      <p>
        In a fixed-rate mortgage, your monthly P&amp;I payment stays the same — but
        how it&apos;s split changes dramatically over time:
      </p>
      <ul>
        <li>
          <strong>Early months:</strong> most of each payment goes to interest (because
          the balance is highest)
        </li>
        <li>
          <strong>Later months:</strong> most goes to principal as the balance shrinks
        </li>
      </ul>
      <p>
        Many people expect a 50/50 split throughout the loan. On a $400,000 loan at
        6.5%, month one might be roughly $2,167 interest and $361 principal — not even
        close to half and half. The amortization schedule makes this visible month by
        month.
      </p>
      <hr />
      <h2>Extra Payments — Small Amounts, Big Impact</h2>
      <p>
        Paying even a modest extra amount each month — especially early in a 30-year
        loan — directly reduces the principal balance that future interest is calculated
        on. That compounds over time: you can cut years off the payoff and save
        substantial total interest.
      </p>
      <p>
        Use the extra-payment simulator in our{" "}
        <Link href="/tools/mortgage-calculator">Mortgage Calculator</Link> to see the
        exact months saved and interest avoided for your numbers.
      </p>
      <hr />
      <h2>Related Reading</h2>
      <p>
        Mortgages are a form of amortized compounding in reverse — similar math to
        compound growth. Read our{" "}
        <Link href="/blog/compound-interest-calculator-guide">
          compound interest calculator guide
        </Link>{" "}
        for the growth side of the same concept.
      </p>
      <p>
        Before sizing a mortgage, know your take-home pay — see our{" "}
        <Link href="/blog/us-paycheck-calculator-guide">
          paycheck calculator guide
        </Link>{" "}
        and{" "}
        <Link href="/tools/paycheck-calculator">Paycheck Calculator</Link>.
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
