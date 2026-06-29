import Link from "next/link";

const faqs = [
  {
    question: "How does SWP work in mutual funds?",
    answer:
      "In a Systematic Withdrawal Plan (SWP), you withdraw a fixed amount from your mutual fund corpus every month. The remaining corpus continues to be invested and earns returns. If the returns are higher than your withdrawals, the corpus can grow indefinitely. If withdrawals exceed returns, the corpus gradually depletes.",
  },
  {
    question: "How much corpus do I need for SWP of ₹25,000 per month?",
    answer:
      "At an 8% annual return expectation over 20 years, you would need approximately ₹30 lakhs in corpus to sustain ₹25,000/month withdrawals. If you want the corpus to last indefinitely (self-sustaining), you need corpus × 8%/12 ≥ ₹25,000, meaning a corpus of at least ₹37.5 lakhs.",
  },
  {
    question: "Is SWP from mutual funds taxable?",
    answer:
      "Yes — each SWP withdrawal that results in gains is subject to capital gains tax. For equity mutual funds held over 12 months: 12.5% LTCG on gains above ₹1.25 lakh annually. For equity held under 12 months: 20% STCG. For debt mutual funds: gains taxed at your income slab rate regardless of holding period.",
  },
  {
    question: "SWP or FD interest — which is better for retirement income?",
    answer:
      "FD interest preserves the principal (never depletes) but returns are fixed at 7-7.5% and fully taxable. SWP from equity mutual funds can potentially generate higher returns (8-12% historically) but the corpus depletes over time unless returns exceed withdrawals. SWP from balanced or hybrid funds offers a middle ground of growth potential with lower volatility.",
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

export default function SwpCalculatorGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <p>
        A Systematic Withdrawal Plan (SWP) lets you draw regular income from
        mutual fund investments. Use our free{" "}
        <Link href="/tools/swp-calculator">SWP Calculator India</Link> to see
        how long your corpus lasts or how much you need for target income. Part
        of our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary & Tax Guide for India
        </Link>
        .
      </p>

      <hr />

      <h2>What Is SWP?</h2>
      <p>
        SWP is the opposite of SIP — instead of investing regularly, you
        withdraw a fixed amount monthly from your mutual fund corpus. The
        remaining balance continues earning returns.
      </p>

      <hr />

      <h2>How SWP Works — Corpus Depletion Math</h2>
      <p>
        Each month, returns are added to the corpus, then your withdrawal is
        deducted. If monthly returns exceed withdrawals, the corpus grows. If
        withdrawals exceed returns, the corpus shrinks over time.
      </p>

      <hr />

      <h2>SWP vs FD Interest</h2>
      <p>
        FD interest is fixed and never touches principal. SWP withdraws from
        corpus but can earn higher returns in equity funds. A ₹50 lakh FD at 7%
        yields ~₹29,167/month interest indefinitely; SWP at 8% on the same
        corpus may sustain ₹25,000/month for 20+ years while potentially
        earning more overall.
      </p>

      <hr />

      <h2>When Does Corpus Never Deplete?</h2>
      <p>
        When monthly return ≥ monthly withdrawal at the start: corpus × annual
        return / 12 ≥ monthly withdrawal. At 8% return, ₹37.5 lakh sustains
        ₹25,000/month indefinitely.
      </p>

      <hr />

      <h2>SWP Tax Implications</h2>
      <p>
        Equity funds: LTCG 12.5% on gains above ₹1.25 lakh/year (held &gt; 12
        months), STCG 20% (held ≤ 12 months). Debt funds: taxed at slab rate
        regardless of holding period.
      </p>

      <hr />

      <h2>Best Use Cases for SWP</h2>
      <p>
        Early retirement income, supplementing pension, post-retirement cash
        flow, and bridging the gap before SCSS or annuity kicks in.
      </p>

      <hr />

      <h2>SWP vs SCSS vs RD for Retirees</h2>
      <p>
        SCSS offers guaranteed 8.2% for seniors (₹30 lakh limit). RD builds
        corpus via deposits. SWP offers flexibility and potentially higher
        equity returns but with market risk and corpus depletion.
      </p>

      <p>
        Related:{" "}
        <Link href="/tools/sip-calculator">SIP Calculator</Link> (reverse of
        SWP), <Link href="/tools/fd-calculator">FD Calculator</Link>,{" "}
        <Link href="/tools/nps-calculator">NPS Calculator</Link>,{" "}
        <Link href="/blog/fd-vs-sip-india-comparison">FD vs SIP comparison</Link>
        .
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
        <Link href="/tools/swp-calculator">Calculate SWP Free →</Link>
      </p>
    </article>
  );
}
