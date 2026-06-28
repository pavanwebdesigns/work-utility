import Link from "next/link";

const faqs = [
  {
    question: "What is the LTCG tax rate on equity shares in India for 2026?",
    answer:
      "Long-term capital gains on listed equity shares and equity mutual funds held for more than 12 months are taxed at 12.5% on gains exceeding ₹1.25 lakh per financial year under Section 112A. This rate was set in Budget 2024 and remains unchanged for FY 2026-27.",
  },
  {
    question: "What changed in capital gains tax after Budget 2024?",
    answer:
      "Budget 2024 made significant changes: STCG on equity rose from 15% to 20%, LTCG on equity rose from 10% to 12.5%, the annual exemption increased from ₹1 lakh to ₹1.25 lakh, and the indexation benefit was removed for most assets. These rates are unchanged for FY 2026-27.",
  },
  {
    question: "How are short-term capital gains on property taxed in India?",
    answer:
      "STCG on property sold within 24 months is added to your total income and taxed at your applicable income tax slab rate (up to 30% plus cess). There is no special flat rate for property STCG, unlike equity shares.",
  },
  {
    question: "Can I still use indexation for property sold in 2026?",
    answer:
      "Yes, but only for immovable property acquired before July 23, 2024. For such property, you can choose between paying 20% with indexation or 12.5% without — whichever results in lower tax. Property acquired on or after July 23, 2024 can only be taxed at 12.5% without indexation.",
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

export default function CapitalGainsTaxCalculatorIndiaGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Capital gains tax applies when you sell a capital asset — shares, mutual
        funds, property, gold, or other investments — for a profit. Use our free{" "}
        <Link href="/tools/capital-gains-calculator">
          Capital Gains Tax Calculator India
        </Link>{" "}
        to auto-classify STCG vs LTCG and estimate tax under Budget 2024 rates.
        Part of our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary & Tax Guide for India
        </Link>
        .
      </p>

      <hr />

      <h2>What Is Capital Gains Tax?</h2>
      <p>
        When you sell a capital asset for more than you paid, the profit is a
        capital gain. India taxes these gains differently depending on the asset
        type and how long you held it. Shares, equity mutual funds, property, gold,
        debt funds, and unlisted shares each have their own rules.
      </p>

      <hr />

      <h2>STCG vs LTCG — Holding Period Table</h2>
      <table>
        <thead>
          <tr>
            <th>Asset Class</th>
            <th>Short-Term Threshold</th>
            <th>Long-Term Threshold</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Listed equity / equity MFs</td>
            <td>&lt; 12 months</td>
            <td>≥ 12 months</td>
          </tr>
          <tr>
            <td>Property / gold / unlisted</td>
            <td>&lt; 24 months</td>
            <td>≥ 24 months</td>
          </tr>
          <tr>
            <td>Debt MFs (post April 2023)</td>
            <td>Always STCG</td>
            <td>N/A — slab rate always</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2>Budget 2024 Changes (Unchanged in Budget 2026)</h2>
      <p>
        Budget 2024 raised STCG on equity from 15% to <strong>20%</strong> (Section
        111A), LTCG on equity from 10% to <strong>12.5%</strong> (Section 112A),
        and the annual LTCG exemption from ₹1 lakh to <strong>₹1.25 lakh</strong>.
        Indexation was removed for most assets. Budget 2026 made no changes to these
        rates — they apply for FY 2025-26 and FY 2026-27.
      </p>

      <hr />

      <h2>Equity Shares & Equity Mutual Funds</h2>
      <p>
        <strong>STCG (&lt; 12 months):</strong> Flat 20% under Section 111A plus 4%
        cess — regardless of your income tax slab. Example: buy ₹1,00,000, sell
        ₹1,40,000 after 8 months → gain ₹40,000 → tax ₹8,000 + cess ₹320 = ₹8,320.
      </p>
      <p>
        <strong>LTCG (≥ 12 months):</strong> 12.5% on gains exceeding ₹1.25 lakh
        per year. Example: buy ₹5,00,000, sell ₹8,00,000 after 18 months → gain
        ₹3,00,000 → taxable ₹1,75,000 → tax ₹21,875 + cess ₹875 = ₹22,750.
      </p>

      <hr />

      <h2>Property — The July 23, 2024 Watershed</h2>
      <p>
        Property acquired <strong>before July 23, 2024</strong> can choose between
        12.5% without indexation or 20% with indexation (CII-based) — whichever is
        lower. Property acquired on or after that date is taxed at 12.5% without
        indexation only. STCG on property (&lt; 24 months) is taxed at your income
        slab rate.
      </p>

      <hr />

      <h2>Debt Mutual Funds (Post April 2023)</h2>
      <p>
        Debt MFs purchased after April 1, 2023 are always taxed at your income tax
        slab rate regardless of holding period — no LTCG benefit with indexation.
      </p>

      <hr />

      <h2>The ₹1.25 Lakh Annual Exemption</h2>
      <p>
        Only equity LTCG gets the ₹1.25 lakh annual exemption under Section 112A.
        Use tax-loss harvesting — sell loss-making stocks before year-end to offset
        gains and stay under the threshold.
      </p>

      <hr />

      <h2>Key Exemptions — Sections 54, 54EC, 54F</h2>
      <p>
        <strong>Section 54:</strong> Reinvest LTCG from property sale into another
        residential property within specified timelines. <strong>Section 54EC:</strong>{" "}
        Invest in specified bonds (NHAI, REC) within 6 months.{" "}
        <strong>Section 54F:</strong> Exemption on sale of any asset (not just
        property) if proceeds are invested in a residential house. Consult a CA for
        complex transactions.
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

      <h2>Related Tools & Guides</h2>
      <ul>
        <li>
          <Link href="/tools/income-tax-calculator">Income Tax Calculator</Link>
        </li>
        <li>
          <Link href="/tools/tax-regime-comparison">Tax Regime Comparison</Link>
        </li>
        <li>
          <Link href="/blog/old-vs-new-tax-regime-india-2025">
            Old vs New Tax Regime India 2025
          </Link>
        </li>
        <li>
          <Link href="/blog/complete-salary-tax-guide-india">
            Complete Salary & Tax Guide India
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/capital-gains-calculator">
          Calculate Capital Gains Tax Free →
        </Link>
      </p>
    </article>
  );
}
