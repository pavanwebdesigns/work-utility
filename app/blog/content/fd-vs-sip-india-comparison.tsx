import Link from "next/link";

export default function FdVsSipIndiaComparisonContent() {
  return (
    <article className="prose-custom">
      <p>
        Rahul&apos;s mother told him: &quot;Put money in FD. Safe hai.&quot; His
        friend from college said: &quot;Bhai, SIP kar. FD mein kuch nahi
        milta.&quot; Rahul had ₹5,000 extra every month and two completely
        opposite pieces of advice. He needed numbers, not opinions.
      </p>

      <p>
        Both are right — for different goals. FD and SIP serve different purposes.
        Here&apos;s an honest comparison with real numbers for Indian investors in
        2025.
      </p>

      <hr />

      <h2>What Is FD? (Fixed Deposit Basics)</h2>

      <ul>
        <li>
          Current rates: SBI ~6.8%, HDFC ~7.1%, small finance banks 8–9%
        </li>
        <li>Guaranteed returns — no market risk</li>
        <li>TDS on interest above ₹40,000/year (₹50,000 for senior citizens)</li>
        <li>Lock-in period — penalty for early withdrawal</li>
      </ul>

      <hr />

      <h2>What Is SIP? (Systematic Investment Plan Basics)</h2>

      <ul>
        <li>Market-linked returns — historical equity SIP: 12–15% over 10+ years</li>
        <li>No guaranteed returns — can be negative in bad years</li>
        <li>Power of compounding over long term</li>
        <li>ELSS SIP qualifies for 80C tax saving</li>
      </ul>

      <hr />

      <h2>Real Comparison: ₹5,000/Month for 10 Years</h2>

      <table>
        <thead>
          <tr>
            <th>Investment</th>
            <th>Total Invested</th>
            <th>Maturity Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>FD at 7%</td>
            <td>₹6,00,000</td>
            <td>~₹8.6 lakhs</td>
          </tr>
          <tr>
            <td>SIP at 12%</td>
            <td>₹6,00,000</td>
            <td>~₹11.6 lakhs</td>
          </tr>
          <tr>
            <td>SIP at 15%</td>
            <td>₹6,00,000</td>
            <td>~₹13.9 lakhs</td>
          </tr>
        </tbody>
      </table>

      <p>
        SIP wins on returns — but FD wins on certainty. The gap is real but comes
        with volatility risk.
      </p>

      <p>
        Calculate{" "}
        <Link href="/tools/fd-calculator">FD maturity amount</Link> for your
        investment. Calculate{" "}
        <Link href="/tools/sip-calculator">SIP returns</Link> over 10–20 years.
        Know your{" "}
        <Link href="/tools/ctc-calculator">monthly surplus</Link> for investment
        planning.
      </p>

      <hr />

      <h2>When to Choose FD</h2>

      <ul>
        <li>Short term goals — 1 to 3 years (vacation, gadget, wedding fund)</li>
        <li>Emergency fund — 3–6 months expenses in liquid FD</li>
        <li>Risk-averse investors or senior citizens needing stable income</li>
        <li>When you cannot afford to see your portfolio drop 20% in a bad year</li>
      </ul>

      <hr />

      <h2>When to Choose SIP</h2>

      <ul>
        <li>Long term goals — 5+ years (retirement, child education, house down payment)</li>
        <li>Wealth creation beyond inflation</li>
        <li>Tax saving via ELSS under 80C</li>
        <li>When you have emergency fund already in place</li>
      </ul>

      <hr />

      <h2>The Smart Answer: Both</h2>

      <p>
        Keep 6 months expenses in FD. Invest the rest in SIP for long-term goals.
        Rahul&apos;s mother and his friend were both right — just talking about
        different timelines.
      </p>

      <hr />

      <p>
        <Link href="/tools/sip-calculator">Compare FD vs SIP Returns →</Link>
      </p>
    </article>
  );
}
