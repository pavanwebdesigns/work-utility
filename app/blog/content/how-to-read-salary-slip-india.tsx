import Link from "next/link";

export default function HowToReadSalarySlipIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        Every month, Kiran downloads his salary slip from the company portal,
        glances at the net amount, and closes the PDF. He has never read a single
        line above it. One day his CA asked him &quot;What is your Basic
        salary?&quot; Kiran had no answer. He was earning ₹55,000 per month and
        didn&apos;t know his own salary structure.
      </p>

      <p>
        Your salary slip is not just a number at the bottom. It&apos;s the key to
        tax planning, loan applications, and understanding why your CTC and
        in-hand don&apos;t match. Let&apos;s decode it line by line.
      </p>

      <hr />

      <h2>What Is a Salary Slip?</h2>

      <p>
        A payslip is a monthly statement from your employer showing earnings,
        deductions, and net pay. HR systems at TCS, Infosys, Wipro, and startups
        all follow a similar format — earnings on the left, deductions on the
        right, net at the bottom.
      </p>

      <hr />

      <h2>Earnings Side Explained</h2>

      <h3>Basic Salary</h3>
      <p>
        Usually 40–50% of CTC. This is the foundation — PF, gratuity, and HRA
        calculations all depend on basic. Never ignore this number.
      </p>

      <h3>HRA (House Rent Allowance)</h3>
      <p>
        Allowance for rent. Tax exemption depends on basic, actual rent, and city.
        Submit rent receipts to claim exemption under old regime.
      </p>

      <h3>Special Allowance</h3>
      <p>
        Flexible component — fully taxable. Often the largest chunk after basic
        and HRA.
      </p>

      <h3>Transport & Medical Allowance</h3>
      <p>
        Fixed allowances. Some are partially tax-exempt up to limits set by
        company policy.
      </p>

      <h3>LTA (Leave Travel Allowance)</h3>
      <p>
        Tax-free travel allowance claimed twice in 4 years with valid tickets.
      </p>

      <hr />

      <h2>Deductions Side Explained</h2>

      <h3>PF Employee Contribution</h3>
      <p>12% of basic — goes to your EPF account. This counts under 80C too.</p>

      <h3>Professional Tax</h3>
      <p>State tax deducted monthly. Karnataka and Telangana: up to ₹200/month.</p>

      <h3>TDS (Tax Deducted at Source)</h3>
      <p>
        Income tax your employer deducts based on your regime and investment
        proofs.
      </p>

      <h3>ESI (If Applicable)</h3>
      <p>
        For employees earning below ₹21,000/month gross. 0.75% employee
        contribution.
      </p>

      <hr />

      <h2>Gross vs Net vs CTC</h2>

      <ul>
        <li>
          <strong>Gross salary</strong> — total earnings before deductions
        </li>
        <li>
          <strong>Net salary</strong> — what hits your bank account
        </li>
        <li>
          <strong>CTC</strong> — gross + employer benefits (employer PF,
          gratuity, insurance)
        </li>
      </ul>

      <hr />

      <h2>Why Basic Salary Matters</h2>

      <p>
        Higher basic = higher PF (good for retirement, bad for in-hand). Higher
        basic = higher HRA exemption potential. Lower basic = more take-home but
        less PF and gratuity. Companies often keep basic at 40% to balance this.
      </p>

      <hr />

      <h2>How to Use Your Salary Slip</h2>

      <ul>
        <li>
          <strong>Visa applications</strong> — embassies ask for 3–6 months payslips
        </li>
        <li>
          <strong>Loan applications</strong> — banks verify income from payslips
        </li>
        <li>
          <strong>Rent agreements</strong> — landlords want proof of income
        </li>
      </ul>

      <p>
        Calculate your exact{" "}
        <Link href="/tools/ctc-calculator">
          in-hand salary from CTC
        </Link>
        . Check your{" "}
        <Link href="/tools/income-tax-calculator">
          income tax liability
        </Link>{" "}
        based on gross salary. Generate{" "}
        <Link href="/tools/rent-receipt-generator">rent receipts</Link> using
        your HRA amount.
      </p>

      <hr />

      <p>
        <Link href="/tools/ctc-calculator">
          Calculate Your In-Hand Salary →
        </Link>
      </p>
    </article>
  );
}
