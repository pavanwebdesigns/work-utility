import Link from "next/link";

export default function RentReceiptForHraExemptionIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        Every March, Kavitha&apos;s company HR sends a reminder: &quot;Submit rent
        receipts for HRA exemption claim.&quot; Every March, Kavitha asks her
        landlord Uncle Ravi for receipts. Uncle Ravi writes them on plain paper
        in his shaky handwriting. Her company keeps rejecting them. This year she
        decided to do it properly.
      </p>

      <p>
        HRA exemption can save ₹30,000–₹60,000 in tax for salaried renters in
        Bangalore, Mumbai, or Delhi. But the receipt format matters. HR and the
        IT department are picky.
      </p>

      <hr />

      <h2>What Is HRA Exemption?</h2>

      <p>
        House Rent Allowance is part of most Indian salary structures. If you
        pay rent and submit valid receipts, a portion of HRA becomes tax-free.
        The exemption depends on basic salary, rent paid, and city (metro vs
        non-metro).
      </p>

      <hr />

      <h2>What Must a Valid Rent Receipt Contain?</h2>

      <ul>
        <li>Tenant name (your full name as per company records)</li>
        <li>Landlord name</li>
        <li>Rent amount in rupees</li>
        <li>Month and year of payment</li>
        <li>Payment mode — cash, UPI, bank transfer, cheque</li>
        <li>Property address</li>
        <li>Landlord signature (or stamp)</li>
        <li>Landlord PAN if annual rent exceeds ₹1 lakh</li>
      </ul>

      <hr />

      <h2>When Is Landlord PAN Mandatory?</h2>

      <p>
        If annual rent paid exceeds <strong>₹1,00,000</strong> (₹8,333/month),
        landlord PAN is mandatory on receipts. Without it, your company may deny
        full HRA exemption. Ask Uncle Ravi for PAN copy along with receipts.
      </p>

      <hr />

      <h2>How to Generate Professional Rent Receipt PDF Free</h2>

      <ol>
        <li>
          Open{" "}
          <Link href="/tools/rent-receipt-generator">
            Rent Receipt Generator
          </Link>
        </li>
        <li>Fill tenant, landlord, amount, address details</li>
        <li>Select payment mode and month</li>
        <li>Check all 12 months for bulk generation</li>
        <li>Download PDF — print or email to HR</li>
      </ol>

      <p>
        Calculate tax savings with our{" "}
        <Link href="/tools/income-tax-calculator">
          Income Tax Calculator
        </Link>
        . Combine all 12 receipts with{" "}
        <Link href="/tools/pdf-merge">PDF Merge</Link> for one submission file.
      </p>

      <hr />

      <h2>Common Rejection Reasons</h2>

      <ul>
        <li>Handwritten receipts without proper format</li>
        <li>Missing landlord PAN when rent &gt; ₹8,333/month</li>
        <li>Rent amount doesn&apos;t match HRA declaration form</li>
        <li>Missing property address or payment mode</li>
        <li>Receipts only for some months — need all 12 or actual months paid</li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/rent-receipt-generator">
          Generate Rent Receipt PDF →
        </Link>
      </p>
    </article>
  );
}
