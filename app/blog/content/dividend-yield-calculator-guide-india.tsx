import Link from "next/link";

const faqs = [
  {
    question: "How is dividend yield calculated?",
    answer:
      "Dividend Yield = (Annual Dividend Per Share ÷ Current Market Price) × 100. For example, if a stock pays ₹20 annual dividend and trades at ₹400, the yield is 5%. Yield on Cost uses your purchase price instead — if you bought at ₹200, your personal yield on cost is 10%.",
  },
  {
    question: "Is dividend income taxable in India?",
    answer:
      "Yes — dividend income is fully taxable as Income from Other Sources at your applicable income tax slab rate. Companies deduct 10% TDS if the total dividend paid to you from a single company exceeds ₹5,000 in a financial year. NRIs face 20% TDS.",
  },
  {
    question: "What is a good dividend yield for Indian stocks?",
    answer:
      "A yield of 2-4% is considered healthy for Indian blue-chip stocks. PSU companies often offer 5-8%. Above 8% may be a warning sign — a very high yield can mean the stock price has fallen due to business problems.",
  },
  {
    question:
      "What is the difference between dividend yield and dividend payout ratio?",
    answer:
      "Dividend yield compares the dividend to the stock price — useful for investors evaluating income return. Dividend payout ratio compares dividends to the company's earnings — useful for assessing sustainability.",
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

export default function DividendYieldCalculatorGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        Dividend investing is a popular way to earn regular income from Indian
        equities alongside long-term capital appreciation. Use our free{" "}
        <Link href="/tools/dividend-yield-calculator">
          Dividend Yield Calculator India
        </Link>{" "}
        to compute current yield, yield on cost, annual income, and TDS. Part
        of our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary &amp; Tax Guide for India
        </Link>
        .
      </p>

      <hr />

      <h2>What Is Dividend Yield?</h2>
      <p>
        Dividend yield measures how much a company pays in dividends relative to
        its current share price. It tells you what percentage return you earn
        from dividends alone — separate from price appreciation. A stock trading
        at ₹400 with ₹20 annual dividend per share has a 5% dividend yield.
      </p>

      <hr />

      <h2>Current Yield vs Yield on Cost</h2>
      <p>
        <strong>Current yield</strong> uses today&apos;s market price — useful
        when screening new stocks. <strong>Yield on cost</strong> uses your
        purchase price — more meaningful for long-term holders. If you bought a
        stock at ₹200 and it now pays ₹20/year, your yield on cost is 10% even
        if the current yield is only 5% at ₹400 CMP.
      </p>

      <hr />

      <h2>Dividend Income and TDS in India</h2>
      <p>
        Since FY 2020-21, dividend income is taxable in the hands of the
        investor at your applicable slab rate. Companies deduct{" "}
        <strong>10% TDS</strong> when annual dividend from a single company
        exceeds <strong>₹5,000</strong>. You can claim credit for TDS deducted
        when filing your ITR. NRIs are subject to 20% TDS under Section 195.
      </p>

      <hr />

      <h2>Dividend Income vs FD Returns</h2>
      <p>
        Many dividend investors compare stock income against fixed deposits. A
        7% FD on ₹10 lakh earns ₹70,000/year with guaranteed principal. Dividend
        stocks may offer higher yields but carry market risk and no principal
        guarantee. Our calculator benchmarks dividend income against a 7% FD
        rate. Compare with our{" "}
        <Link href="/tools/fd-calculator">FD Calculator</Link> and read the{" "}
        <Link href="/blog/fd-vs-sip-india-comparison">
          FD vs SIP comparison
        </Link>
        .
      </p>

      <hr />

      <h2>Portfolio Mode — Multiple Holdings</h2>
      <p>
        If you hold dividend stocks across multiple companies, portfolio mode
        calculates weighted average yield, total annual income, and combined TDS.
        This is especially useful for retirees building a dividend income stream
        from PSU banks, ITC, Coal India, and other consistent payers.
      </p>

      <hr />

      <h2>Dividend Yield vs SIP and SWP</h2>
      <p>
        Dividend stocks provide income without selling shares. For mutual fund
        investors, systematic plans offer alternatives:{" "}
        <Link href="/tools/sip-calculator">SIP Calculator</Link> for building
        corpus, and{" "}
        <Link href="/tools/swp-calculator">SWP Calculator</Link> for regular
        withdrawals from mutual funds. Each approach has different tax
        treatment and risk profiles.
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

      <p>
        <Link href="/tools/dividend-yield-calculator">
          Calculate Dividend Yield Free →
        </Link>
      </p>
    </article>
  );
}
