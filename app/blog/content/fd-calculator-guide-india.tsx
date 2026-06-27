import Link from "next/link";

const faqs = [
  {
    question: "Is FD interest taxable in India?",
    answer:
      "Yes — FD interest is fully taxable as \"Income from Other Sources\" at your applicable income tax slab rate. Banks also deduct 10% TDS when annual interest exceeds ₹40,000 (₹50,000 for senior citizens). Submit Form 15G (or 15H for seniors) if your total income is below the taxable limit to avoid TDS deduction.",
  },
  {
    question: "What is the difference between cumulative and non-cumulative FD?",
    answer:
      "Cumulative FD compounds interest and pays the full amount at maturity — better for building wealth. Non-cumulative FD pays out interest monthly, quarterly, or annually — better for those needing regular income, like retirees.",
  },
  {
    question: "Which bank gives the highest FD interest rate in India in 2026?",
    answer:
      "Small finance banks (like AU Small Finance Bank, Ujjivan, Suryoday) typically offer the highest rates — often 8–9%+ for certain tenures. However, they carry higher risk than nationalized or large private banks. DICGC insurance covers deposits up to ₹5 lakhs per depositor per bank, regardless of bank type.",
  },
  {
    question: "Is it better to choose monthly or cumulative FD?",
    answer:
      "Cumulative (compound interest) FD gives a higher effective yield because interest earned also earns interest. Monthly payout FD has a slightly lower effective return but provides regular cash flow. Choose monthly/quarterly payout only if you need regular income; otherwise, cumulative gives better total returns.",
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

export default function FdCalculatorGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        A Fixed Deposit (FD) is one of the most trusted savings instruments in
        India — offered by banks and NBFCs with a guaranteed return locked in at
        the time you deposit. Unlike market-linked investments such as mutual
        funds, your principal is safe and the interest rate is fixed for the
        chosen tenure. Use our free{" "}
        <Link href="/tools/fd-calculator">FD Calculator</Link> to project maturity
        amount and interest before you book a deposit, and compare long-term
        options in our{" "}
        <Link href="/blog/fd-vs-sip-india-comparison">
          FD vs SIP comparison
        </Link>
        .
      </p>

      <hr />

      <h2>Cumulative vs Non-Cumulative FD</h2>

      <p>
        Indian banks offer two main interest payout structures.{" "}
        <strong>Cumulative FD</strong> compounds interest and pays everything at
        maturity — ideal when you are building wealth and do not need interim
        cash flow. <strong>Non-cumulative FD</strong> pays interest monthly,
        quarterly, or annually — better for retirees or anyone who needs regular
        income from savings.
      </p>

      <hr />

      <h2>How FD Interest Is Calculated</h2>

      <p>
        Most Indian bank FDs use quarterly compounding. The standard formula is:
      </p>

      <p>
        <strong>A = P × (1 + r/n)^(n×t)</strong>
      </p>

      <p>
        Where <strong>P</strong> is principal, <strong>r</strong> is the annual
        interest rate (as a decimal), <strong>n</strong> is compounding frequency
        per year (usually 4 for quarterly), and <strong>t</strong> is tenure in
        years. The{" "}
        <Link href="/tools/fd-calculator">FD Calculator</Link> applies this
        automatically — enter amount, rate, and tenure to see maturity value
        and total interest. For a deeper look at compounding mechanics, see our{" "}
        <Link href="/blog/compound-interest-calculator-guide">
          compound interest calculator guide
        </Link>
        .
      </p>

      <hr />

      <h2>TDS and Tax on FD Interest in India</h2>

      <p>
        Banks deduct <strong>10% TDS</strong> if FD interest exceeds ₹40,000 per
        year (₹50,000 for senior citizens). If PAN is not submitted, TDS rises
        to 20%. FD interest is fully taxable as &quot;Income from Other
        Sources&quot; at your income tax slab rate — TDS is only an advance
        deduction, not the final tax. Submit Form 15G or 15H if your total
        income is below the taxable threshold to avoid TDS being deducted upfront.
      </p>

      <hr />

      <h2>Approximate FD Rates (June 2026)</h2>

      <p>
        Rates change frequently — always verify on the bank&apos;s website before
        booking. As a rough reference for June 2026: SBI typically offers around
        6.5–7.1%, HDFC Bank around 7.0–7.4%, ICICI Bank around 6.9–7.25%.
        Small finance banks often advertise 8–9%+ for select tenures; check RBI
        registration and remember DICGC covers up to ₹5 lakh per depositor per
        bank.
      </p>

      <hr />

      <h2>FD vs SIP — Which Suits You?</h2>

      <p>
        <strong>FD</strong> suits risk-averse investors who want guaranteed
        returns, capital preservation, and short-to-medium tenures (1–5 years).
        <strong>SIP / mutual funds</strong> suit long-term wealth creation with
        historically higher returns (equity funds have often delivered roughly
        10–15% CAGR over long periods) but carry market-linked risk. Many
        Indians use FDs for emergency funds and near-term goals, and SIPs for
        retirement and goals 7+ years away. Read our full{" "}
        <Link href="/blog/fd-vs-sip-india-comparison">
          FD vs SIP guide for India
        </Link>{" "}
        before deciding.
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
          <Link href="/blog/fd-vs-sip-india-comparison">
            FD vs SIP — Where Should You Invest in India?
          </Link>
        </li>
        <li>
          <Link href="/blog/compound-interest-calculator-guide">
            Compound Interest Calculator — How Compounding Grows Your Money
          </Link>
        </li>
        <li>
          <Link href="/blog/how-to-start-sip-india-beginners-guide">
            How to Start a SIP in India — Beginner&apos;s Guide
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/fd-calculator">
          Calculate FD Maturity Amount Free →
        </Link>
      </p>
    </article>
  );
}
