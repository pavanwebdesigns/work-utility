import Link from "next/link";

export default function GstForFreelancersIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        Pooja is a graphic designer in Ahmedabad who works with clients across
        India and two clients in the US. Her income last year: ₹18 lakhs. Her
        accountant called her in March: &quot;Pooja, you should have registered
        for GST 6 months ago.&quot; She had no idea. Nobody told her.
      </p>

      <p>
        Freelancing in India crossed ₹20 lakh? GST registration becomes mandatory.
        Even below that threshold, understanding GST helps you invoice correctly
        and avoid penalties. Here&apos;s the complete guide.
      </p>

      <hr />

      <h2>When Is GST Mandatory for Freelancers?</h2>

      <ul>
        <li>
          <strong>Threshold:</strong> ₹20 lakh annual turnover (₹10 lakh in
          special category states like NE states)
        </li>
        <li>
          <strong>International clients:</strong> export of services is
          zero-rated (0% GST) but registration still required above threshold
        </li>
        <li>
          <strong>Inter-state supply:</strong> any inter-state service triggers
          mandatory registration regardless of turnover in some cases
        </li>
      </ul>

      <hr />

      <h2>How to Calculate GST on Freelance Invoice</h2>

      <h3>Indian Client</h3>
      <p>
        Add 18% GST on top of your fee. Invoice for ₹50,000 + ₹9,000 GST = ₹59,000
        total. You collect GST and pay to government monthly.
      </p>

      <h3>Foreign Client</h3>
      <p>
        0% GST (export of services). Invoice in USD or INR without GST. Still file
        returns showing zero-rated exports.
      </p>

      <h3>Example Invoice Breakdown</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Design services</td>
            <td>₹50,000</td>
          </tr>
          <tr>
            <td>CGST @ 9%</td>
            <td>₹4,500</td>
          </tr>
          <tr>
            <td>SGST @ 9%</td>
            <td>₹4,500</td>
          </tr>
          <tr>
            <td>
              <strong>Total</strong>
            </td>
            <td>
              <strong>₹59,000</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        Calculate GST on your invoice with our{" "}
        <Link href="/tools/gst-calculator">free GST Calculator</Link>.
      </p>

      <hr />

      <h2>GST Rates for Common Freelance Services</h2>

      <ul>
        <li>IT / software development: 18%</li>
        <li>Consulting services: 18%</li>
        <li>Content writing: 18%</li>
        <li>Graphic design: 18%</li>
      </ul>

      <hr />

      <h2>How to File GST Returns</h2>

      <p>
        Monthly filing: <strong>GSTR-1</strong> (outward supplies) and{" "}
        <strong>GSTR-3B</strong> (summary + tax payment). Due by 11th and 20th of
        following month respectively. Use a CA or ClearTax for first few months.
      </p>

      <h3>Input Tax Credit</h3>
      <p>
        GST paid on business expenses (laptop, software, internet) can offset GST
        collected from clients. Keep all GST invoices for purchases.
      </p>

      <hr />

      <p>
        Calculate your{" "}
        <Link href="/tools/ctc-calculator">in-hand income</Link> after GST and
        tax. Use our{" "}
        <Link href="/tools/signature-maker">Signature Maker</Link> for digital
        signing on professional invoices.
      </p>

      <hr />

      <p>
        <Link href="/tools/gst-calculator">
          Calculate GST on Your Invoice →
        </Link>
      </p>
    </article>
  );
}
