import Link from "next/link";

export default function HomeLoanEmiGuideIndiaContent() {
  return (
    <article className="prose-custom">
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
        out what you can actually afford.
      </p>

      <hr />

      <h2>How Is Home Loan EMI Calculated?</h2>

      <p>
        EMI uses the reducing balance formula. Every month you pay interest on
        the remaining principal plus a portion of principal itself.
      </p>

      <h3>Example</h3>
      <p>
        ₹30 lakh loan, 8.5% rate, 20 years ={" "}
        <strong>₹26,035/month EMI</strong>. Total interest over 20 years: roughly
        ₹32.5 lakhs. You pay back more in interest than the loan amount itself.
      </p>

      <p>
        Calculate exact EMI with our{" "}
        <Link href="/tools/emi-calculator">Home Loan EMI Calculator</Link>.
      </p>

      <hr />

      <h2>How Much EMI Can You Afford?</h2>

      <h3>The 40% Rule</h3>
      <p>
        Banks typically approve loans where EMI is up to 40–50% of in-hand
        salary. But <strong>you</strong> should target 40% max — leave room for
        emergencies, SIP, and life.
      </p>

      <p>
        Example: ₹50,000 in-hand → max EMI <strong>₹20,000</strong>. Know your{" "}
        <Link href="/tools/ctc-calculator">in-hand salary</Link> before deciding
        EMI budget.
      </p>

      <hr />

      <h2>Current Home Loan Rates in India (2025)</h2>

      <ul>
        <li>
          <strong>SBI:</strong> 8.50% onwards (floating)
        </li>
        <li>
          <strong>HDFC:</strong> 8.75% onwards
        </li>
        <li>
          <strong>ICICI, Axis:</strong> similar range, negotiate with CIBIL score
        </li>
      </ul>

      <h3>Floating vs Fixed</h3>
      <p>
        Floating rates change with RBI repo rate — lower now but can rise. Fixed
        rates lock your EMI but start 0.5–1% higher. Most Indians choose floating
        for lower initial EMI.
      </p>

      <hr />

      <h2>Tips to Reduce Home Loan EMI</h2>

      <ul>
        <li>
          <strong>Higher down payment</strong> — 20% minimum, 30% if possible.
          Lower loan = lower EMI.
        </li>
        <li>
          <strong>Longer tenure</strong> — 25 years instead of 20 lowers EMI but
          increases total interest. Use wisely.
        </li>
        <li>
          <strong>Balance transfer</strong> — if another bank offers 0.5% lower,
          transfer saves lakhs over the loan term.
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

      <p>
        Calculate{" "}
        <Link href="/tools/emi-calculator">total interest payable</Link> on your
        loan amount before signing.
      </p>

      <hr />

      <p>
        <Link href="/tools/emi-calculator">
          Calculate Your Home Loan EMI →
        </Link>
      </p>
    </article>
  );
}
