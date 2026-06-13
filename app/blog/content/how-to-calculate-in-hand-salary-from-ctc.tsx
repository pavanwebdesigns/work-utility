import Link from "next/link";

export default function HowToCalculateInHandSalaryFromCtcContent() {
  return (
    <article className="prose-custom">
      <p>
        Rohit got his first offer letter from an IT company in Bangalore. CTC:
        ₹6,00,000 per annum. He called his father excitedly — &quot;Papa, 50,000
        per month!&quot; His first salary credit was ₹38,400. He sat staring at
        his phone for five minutes.
      </p>

      <p>
        If that sounds familiar, you&apos;re not alone. Most freshers — and
        honestly, many experienced employees at Infosys, TCS, and startups —
        confuse CTC with in-hand salary. They&apos;re not the same thing. Not
        even close.
      </p>

      <hr />

      <h2>What Is CTC? (Cost to Company Explained Simply)</h2>

      <p>
        CTC is everything your employer spends on you in a year — not what lands
        in your bank account. It includes your basic salary, allowances, and
        benefits like employer PF contribution and gratuity provision.
      </p>

      <p>
        Think of CTC as the company&apos;s total bill for hiring you. Your
        in-hand salary is what remains after deductions hit your payslip every
        month.
      </p>

      <hr />

      <h2>What Gets Deducted from CTC?</h2>

      <h3>PF Employee Contribution (12% of Basic)</h3>
      <p>
        Every month, 12% of your basic salary goes to EPF. If your basic is
        ₹25,000, that&apos;s ₹3,000 gone before you even see it.
      </p>

      <h3>PF Employer Contribution (Part of CTC, Not Your Take-Home)</h3>
      <p>
        Your company also contributes 12% to PF — but this is counted in CTC, not
        added to your bank balance. This is why CTC looks bigger than what you
        actually earn.
      </p>

      <h3>Professional Tax (State-Wise)</h3>
      <p>
        Karnataka: up to ₹200/month. Telangana: up to ₹200/month. Maharashtra
        varies by income slab. Delhi has no professional tax. Check your state
        rules.
      </p>

      <h3>Income Tax (TDS)</h3>
      <p>
        Your employer deducts tax at source based on your declared regime and
        investments. Old regime with 80C proofs? Lower TDS. New regime with no
        deductions? Higher TDS on the same CTC.
      </p>

      <hr />

      <h2>Real Example: ₹6 LPA CTC Breakdown</h2>

      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Annual Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Basic Salary (50%)</td>
            <td>₹3,00,000</td>
          </tr>
          <tr>
            <td>HRA (20%)</td>
            <td>₹1,20,000</td>
          </tr>
          <tr>
            <td>Special Allowance</td>
            <td>₹1,08,000</td>
          </tr>
          <tr>
            <td>PF Employer</td>
            <td>₹36,000</td>
          </tr>
          <tr>
            <td>Gratuity</td>
            <td>₹14,423</td>
          </tr>
          <tr>
            <td>
              <strong>Total CTC</strong>
            </td>
            <td>
              <strong>₹6,00,000</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        After PF employee contribution, professional tax, and TDS, Rohit&apos;s
        in-hand came to roughly <strong>₹38,000–40,000/month</strong> — not
        ₹50,000.
      </p>

      <p>
        Use our{" "}
        <Link href="/tools/ctc-calculator">
          CTC to In-Hand Calculator
        </Link>{" "}
        to calculate your exact take-home. Check your{" "}
        <Link href="/tools/income-tax-calculator">
          Income Tax liability
        </Link>{" "}
        for the year. And calculate your{" "}
        <Link href="/tools/emi-calculator">
          EMI affordability
        </Link>{" "}
        based on in-hand salary — not CTC.
      </p>

      <hr />

      <h2>Tips to Maximize In-Hand Salary</h2>

      <ul>
        <li>
          <strong>Opt out of NPS if not needed</strong> — some companies auto-enrol
          you. Check if it makes sense for your goals.
        </li>
        <li>
          <strong>Claim HRA exemption</strong> — submit rent receipts to your HR
          before the deadline. Missing this costs real money.
        </li>
        <li>
          <strong>Submit 80C proof on time</strong> — ELSS, PPF, life insurance.
          Late submission means higher TDS all year.
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/ctc-calculator">
          Calculate Your In-Hand Salary Now →
        </Link>
      </p>
    </article>
  );
}
