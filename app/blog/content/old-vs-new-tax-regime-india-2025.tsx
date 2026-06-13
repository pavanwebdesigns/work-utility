import Link from "next/link";

export default function OldVsNewTaxRegimeIndia2025Content() {
  return (
    <article className="prose-custom">
      <p>
        Every March, Deepika&apos;s WhatsApp fills up with messages from her HR:
        &quot;Submit your tax declaration by Friday.&quot; She always picks old
        regime because her father told her to. But her colleague Arjun always
        picks new regime. Last year, Arjun paid ₹18,000 less tax than Deepika.
        Same salary. Different regime choice.
      </p>

      <p>
        FY 2025-26 changed the game again. Budget 2025 updated slabs and rebate
        limits. If you&apos;re still picking a regime out of habit, you might be
        leaving money on the table.
      </p>

      <hr />

      <h2>New Regime 2025-26 Slabs (Updated Budget 2025)</h2>

      <ul>
        <li>₹0 – ₹4 lakh: 0%</li>
        <li>₹4 – ₹8 lakh: 5%</li>
        <li>₹8 – ₹12 lakh: 10%</li>
        <li>₹12 – ₹16 lakh: 15%</li>
        <li>₹16 – ₹20 lakh: 20%</li>
        <li>₹20 – ₹24 lakh: 25%</li>
        <li>Above ₹24 lakh: 30%</li>
      </ul>

      <p>
        Plus standard deduction of <strong>₹75,000</strong>. Rebate u/s 87A:
        income up to ₹12 lakh can effectively pay <strong>zero tax</strong> under
        new regime after rebate.
      </p>

      <hr />

      <h2>Old Regime Slabs + Deductions</h2>

      <p>
        Old regime has lower standard deduction (₹50,000) but allows 80C
        (₹1.5L), 80D (₹25K health insurance), HRA exemption, home loan interest
        u/s 24(b) up to ₹2 lakh, and NPS 80CCD(1B) additional ₹50,000.
      </p>

      <p>
        If you&apos;re maximising these deductions, old regime often wins for
        higher earners with home loans.
      </p>

      <hr />

      <h2>When Is Old Regime Better?</h2>

      <ul>
        <li>You have a home loan (₹2L interest deduction saves serious tax)</li>
        <li>You maximise 80C investments — ELSS, PPF, PF, insurance</li>
        <li>Your HRA exemption is high (living in Bangalore or Mumbai on rent)</li>
        <li>Combined deductions exceed ₹3–4 lakh annually</li>
      </ul>

      <hr />

      <h2>When Is New Regime Better?</h2>

      <ul>
        <li>Income below ₹12 lakh — zero tax after rebate!</li>
        <li>No major deductions or investments to claim</li>
        <li>You want simpler filing without collecting proofs</li>
        <li>Living in own house (no HRA or rent receipts)</li>
      </ul>

      <hr />

      <h2>Real Comparison: Which Regime Saves More?</h2>

      <table>
        <thead>
          <tr>
            <th>Annual Salary</th>
            <th>Old Regime Tax</th>
            <th>New Regime Tax</th>
            <th>Better Choice</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>₹8 lakh (no deductions)</td>
            <td>~₹33,800</td>
            <td>~₹0</td>
            <td>New</td>
          </tr>
          <tr>
            <td>₹12 lakh (₹2L 80C + HRA)</td>
            <td>~₹45,000</td>
            <td>~₹0</td>
            <td>New (unless heavy HRA)</td>
          </tr>
          <tr>
            <td>₹15 lakh (home loan + 80C)</td>
            <td>~₹1,10,000</td>
            <td>~₹1,45,000</td>
            <td>Old</td>
          </tr>
          <tr>
            <td>₹20 lakh (full deductions)</td>
            <td>~₹2,20,000</td>
            <td>~₹2,85,000</td>
            <td>Old</td>
          </tr>
        </tbody>
      </table>

      <p>
        Numbers vary by exact deductions. Use our{" "}
        <Link href="/tools/income-tax-calculator">
          Income Tax Calculator
        </Link>{" "}
        to compare both regimes instantly. Calculate your{" "}
        <Link href="/tools/ctc-calculator">in-hand salary</Link> after tax
        deductions. Plan your{" "}
        <Link href="/tools/sip-calculator">SIP investments</Link> to maximise
        80C savings if you choose old regime.
      </p>

      <hr />

      <p>
        <Link href="/tools/income-tax-calculator">
          Compare Old vs New Regime →
        </Link>
      </p>
    </article>
  );
}
