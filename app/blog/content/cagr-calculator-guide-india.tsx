import Link from "next/link";

const faqs = [
  {
    question: "What is a good CAGR in India?",
    answer:
      "For equity mutual funds and stocks, a CAGR of 12-15% or above over 5+ years is generally considered good, as it matches or beats the Nifty 50's historical long-term average. For fixed income instruments, 7-8% CAGR (PPF/FD range) is typical. Always compare against the relevant benchmark — a 10% CAGR large-cap fund underperforms if the benchmark delivered 14%.",
  },
  {
    question: "What is the difference between CAGR and absolute return?",
    answer:
      "Absolute return tells you total gain percentage ignoring time — if you invest ₹1 lakh and get ₹2 lakhs back, that's 100% absolute return whether it took 2 years or 10 years. CAGR tells you the annualised rate — 100% in 2 years = 41.4% CAGR (excellent), while 100% in 10 years = 7.2% CAGR (similar to a bank FD). Always use CAGR when comparing investments of different durations.",
  },
  {
    question: "Can I use CAGR for SIP investments?",
    answer:
      "No — CAGR is designed for single lump-sum investments with a fixed start and end value. For SIPs (systematic investments with multiple cash flows), use XIRR (Extended Internal Rate of Return) which accounts for different investment dates and amounts. Most mutual fund platforms show XIRR for SIP portfolios.",
  },
  {
    question: "What is the Rule of 72?",
    answer:
      "The Rule of 72 is a shortcut to estimate how many years it takes for an investment to double: divide 72 by the annual growth rate. At 12% CAGR, money doubles in 6 years. At 8% CAGR, it takes 9 years. At 6% (inflation rate), prices double in 12 years — which is why investments should earn more than inflation.",
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

export default function CagrCalculatorGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        CAGR (Compound Annual Growth Rate) is the standard way to compare investment
        returns across different time periods. Use our free{" "}
        <Link href="/tools/cagr-calculator">CAGR Calculator India</Link> to find
        annualised growth, project future value, or calculate required CAGR. Part of
        our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary & Tax Guide for India
        </Link>
        .
      </p>

      <hr />

      <h2>What Is CAGR?</h2>
      <p>
        CAGR is the annualised growth rate of an investment assuming compounding. It
        smooths out year-to-year volatility — a fund that gained 50% in year 1 and
        lost 10% in year 2 has a different story when expressed as CAGR vs absolute
        return.
      </p>
      <p>
        Formula: CAGR = (Final Value ÷ Initial Value)^(1 ÷ Years) − 1
      </p>

      <hr />

      <h2>CAGR vs Absolute Return</h2>
      <p>
        Absolute return ignores time. An 80% gain in 3 years equals 21.6% CAGR
        (excellent). The same 80% gain in 10 years equals only 6% CAGR — worse than
        most bank FDs. Always use CAGR when comparing investments held for different
        durations.
      </p>

      <hr />

      <h2>The Rule of 72</h2>
      <p>
        Divide 72 by your CAGR to estimate doubling time. At 12% CAGR, money doubles
        in 6 years. At 8%, it takes 9 years. This quick mental math helps evaluate
        whether an investment meets your timeline goals.
      </p>

      <hr />

      <h2>Real CAGR vs Nominal CAGR</h2>
      <p>
        Nominal CAGR is the headline return. Real CAGR subtracts inflation. At 6%
        inflation, a 12% CAGR fund actually delivers ~5.7% real growth in purchasing
        power. Our calculator shows both values.
      </p>

      <hr />

      <h2>CAGR Benchmarks for India</h2>
      <ul>
        <li>Savings account: 3–4%</li>
        <li>FD (1–3 year): 6.5–7.5%</li>
        <li>PPF: 7.1%</li>
        <li>Nifty 50 (10-year avg): 12–15%</li>
        <li>Mid Cap MF (10-year): 14–17%</li>
      </ul>

      <hr />

      <h2>When NOT to Use CAGR</h2>
      <p>
        CAGR assumes a single lump-sum investment. For SIPs with multiple cash flows
        at different dates, use{" "}
        <Link href="/tools/sip-calculator">SIP Calculator</Link> and XIRR instead.
        Related:{" "}
        <Link href="/tools/compound-interest">Compound Interest Calculator</Link>,{" "}
        <Link href="/blog/fd-vs-sip-india-comparison">FD vs SIP comparison</Link>.
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
