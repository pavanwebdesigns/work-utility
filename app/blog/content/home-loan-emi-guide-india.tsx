import Link from "next/link";

const faqs = [
  {
    question: "What is a good home loan interest rate in India in 2026?",
    answer:
      "Home loan rates in India in 2026 range from approximately 8.40% to 10.60% depending on the bank, your CIBIL score, and the loan amount. Rates starting from 8.40-8.75% are available for applicants with CIBIL scores of 750+ — verify with your bank for the current applicable rate.",
  },
  {
    question: "Should I choose a 20-year or 30-year home loan tenure?",
    answer:
      "A shorter tenure means higher monthly EMI but significantly less total interest paid. For example, on a ₹50 lakh loan at 8.75%, choosing 20 years over 30 years saves approximately ₹36 lakhs in total interest — while increasing your monthly EMI by only around ₹5,000. If your income allows it, a 15-20 year tenure is usually the better financial choice.",
  },
  {
    question: "How much home loan can I get on a ₹1 lakh salary?",
    answer:
      "Most banks follow the FOIR rule — total EMIs should not exceed 40-50% of take-home salary. On ₹1 lakh take-home, you can comfortably afford ₹40,000-₹50,000 EMI per month. At 8.75% for 20 years, that translates to approximately ₹45-57 lakhs loan eligibility (subject to your CIBIL score and existing EMIs).",
  },
  {
    question: "Does prepaying a home loan make sense?",
    answer:
      "Yes, especially in the early years when most of your EMI goes toward interest. Even a single extra EMI per year can reduce your loan tenure by 2-3 years and save lakhs in total interest. Check your loan agreement for any prepayment charges (most banks have removed prepayment penalties on floating rate home loans as per RBI guidelines).",
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

export default function HomeLoanEmiGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <p>
        Anjali and her husband Rajan had been saving for 6 years for a house in
        Chennai. They had ₹8 lakhs saved. The flat they loved cost ₹45 lakhs.
        &quot;Loan lena padega,&quot; Rajan said. &quot;How much EMI can we
        pay?&quot; Anjali asked. Neither of them knew how to calculate it. They
        visited 3 banks before someone told them the simple formula.
      </p>

      <p>
        A home loan is the biggest financial decision most Indians make. Get the
        EMI wrong and you&apos;re stuck for 20 years. Here&apos;s how to figure
        out what you can actually afford — with{" "}
        <Link href="/tools/emi-calculator">our free EMI calculator</Link> to run
        the numbers instantly.
      </p>

      <hr />

      <h2>How Is Home Loan EMI Calculated?</h2>

      <p>
        EMI uses the reducing balance formula. Every month you pay interest on
        the remaining principal plus a portion of principal itself:
      </p>

      <p>
        <strong>EMI = P × r × (1+r)^n / ((1+r)^n − 1)</strong>
      </p>

      <p>
        Where P = loan amount, r = monthly interest rate, n = tenure in months.
      </p>

      <h3>Example</h3>
      <p>
        ₹30 lakh loan, 8.5% rate, 20 years ={" "}
        <strong>₹26,035/month EMI</strong>. Total interest over 20 years: roughly
        ₹32.5 lakhs. You pay back more in interest than the loan amount itself.
      </p>

      <p>
        <Link href="/tools/emi-calculator">Calculate your exact EMI →</Link>
      </p>

      <hr />

      <h2>Current Home Loan Interest Rates 2026</h2>

      <p>
        <em>
          Rates as of June 2026 — check with your bank for current rates before
          applying.
        </em>
      </p>

      <table>
        <thead>
          <tr>
            <th>Bank</th>
            <th>Home Loan Rate (p.a.)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SBI</td>
            <td>8.50% – 9.85%</td>
          </tr>
          <tr>
            <td>HDFC Bank</td>
            <td>8.70% – 9.95%</td>
          </tr>
          <tr>
            <td>ICICI Bank</td>
            <td>8.75% – 9.90%</td>
          </tr>
          <tr>
            <td>Bank of Baroda</td>
            <td>8.40% – 10.60%</td>
          </tr>
          <tr>
            <td>Axis Bank</td>
            <td>8.75% – 13.30%</td>
          </tr>
        </tbody>
      </table>

      <p>
        Rates vary based on CIBIL score, loan amount, and employment type. Rates
        shown are indicative — verify with your bank before applying.
      </p>

      <h3>Floating vs Fixed</h3>
      <p>
        Floating rates change with RBI repo rate — lower now but can rise. Fixed
        rates lock your EMI but start 0.5–1% higher. Most Indians choose floating
        for lower initial EMI.
      </p>

      <hr />

      <h2>How Much EMI Can I Afford?</h2>

      <p>
        Banks use the <strong>FOIR rule</strong> (Fixed Obligation to Income
        Ratio) — total EMIs should not exceed 40–50% of monthly take-home
        salary. Use our{" "}
        <Link href="/tools/loan-eligibility">
          Loan Eligibility Calculator
        </Link>{" "}
        for a personalised estimate.
      </p>

      <p>
        <strong>Example:</strong> If take-home is ₹80,000/month, max comfortable
        EMI = ₹32,000–₹40,000/month.
      </p>

      <ul>
        <li>
          At 8.75% for 20 years, ₹32,000/month EMI ≈ <strong>₹36 lakh</strong>{" "}
          loan
        </li>
        <li>
          At 8.75% for 20 years, ₹40,000/month EMI ≈ <strong>₹45 lakh</strong>{" "}
          loan
        </li>
      </ul>

      <p>
        Know your in-hand salary first — see{" "}
        <Link href="/blog/how-to-calculate-in-hand-salary-from-ctc">
          how to calculate in-hand salary from CTC
        </Link>
        .
      </p>

      <p>
        <Link href="/tools/loan-eligibility">
          Check your loan eligibility →
        </Link>
      </p>

      <hr />

      <h2>Shorter vs Longer Tenure — Real Numbers</h2>

      <p>
        For a <strong>₹50 lakh loan at 8.75%</strong> (calculated using the
        standard EMI formula):
      </p>

      <table>
        <thead>
          <tr>
            <th>Tenure</th>
            <th>Monthly EMI</th>
            <th>Total Interest</th>
            <th>Total Payment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10 years</td>
            <td>₹62,663</td>
            <td>₹25.2 lakhs</td>
            <td>₹75.2 lakhs</td>
          </tr>
          <tr>
            <td>15 years</td>
            <td>₹49,972</td>
            <td>₹40.0 lakhs</td>
            <td>₹90.0 lakhs</td>
          </tr>
          <tr>
            <td>20 years</td>
            <td>₹44,186</td>
            <td>₹56.0 lakhs</td>
            <td>₹1.06 crore</td>
          </tr>
          <tr>
            <td>30 years</td>
            <td>₹39,335</td>
            <td>₹91.6 lakhs</td>
            <td>₹1.42 crore</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Key insight:</strong> Choosing 20 years over 30 years saves
        approximately <strong>₹36 lakhs</strong> in total interest — while adding
        only <strong>₹4,851</strong> to your monthly EMI.
      </p>

      <hr />

      <h2>Prepayment Impact</h2>

      <p>
        Partial prepayment saves significant interest, especially in the early
        years when most of your EMI goes toward interest — not principal.
      </p>

      <p>
        On a <strong>₹50 lakh / 8.75% / 20-year</strong> loan, making a{" "}
        <strong>₹2 lakh prepayment in year 3</strong> typically:
      </p>

      <ul>
        <li>Reduces tenure by approximately 18 months</li>
        <li>Saves approximately ₹3–4 lakhs in total interest</li>
      </ul>

      <p>
        Even <strong>one extra EMI per year</strong> can cut your loan tenure by
        2–3 years. Most banks have removed prepayment penalties on floating-rate
        home loans per RBI guidelines — confirm in your loan agreement.
      </p>

      <hr />

      <h2>Tips to Reduce Home Loan EMI</h2>

      <ul>
        <li>
          <strong>Higher down payment</strong> — 20% minimum, 30% if possible.
          Lower loan = lower EMI.
        </li>
        <li>
          <strong>Shorter tenure</strong> — if income allows, 15–20 years saves
          lakhs in interest vs 30 years.
        </li>
        <li>
          <strong>Balance transfer</strong> — if another bank offers 0.5% lower,
          transfer saves lakhs over the loan term.
        </li>
        <li>
          <strong>Prepay early</strong> — lump sums in years 1–5 have the highest
          interest-saving impact.
        </li>
      </ul>

      <hr />

      <h2>Documents Needed for Home Loan</h2>

      <ul>
        <li>Last 3 months salary slips + Form 16</li>
        <li>6 months bank statements</li>
        <li>ITR for last 2 years</li>
        <li>Property documents (sale agreement, approved plan)</li>
        <li>KYC — Aadhaar, PAN, address proof</li>
      </ul>

      <hr />

      <h2>Frequently Asked Questions</h2>

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
          <Link href="/blog/how-to-calculate-in-hand-salary-from-ctc">
            How to Calculate In-Hand Salary from CTC
          </Link>
        </li>
        <li>
          <Link href="/blog/loan-eligibility-calculator-guide">
            Loan Eligibility Calculator — FOIR Explained
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/emi-calculator">
          Calculate your exact EMI →
        </Link>
      </p>
    </article>
  );
}
