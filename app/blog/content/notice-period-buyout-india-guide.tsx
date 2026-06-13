import Link from "next/link";

export default function NoticePeriodBuyoutIndiaGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Vikram got a dream offer from a startup in Pune. Joining date: 2 weeks.
        His current notice period: 90 days. His new HR said &quot;We can wait 30
        days maximum.&quot; His current HR said &quot;We need 90 days or pay
        buyout.&quot; Vikram had never heard the word buyout before. He spent the
        next 3 hours on Google, completely confused.
      </p>

      <p>
        Notice period buyout is one of those HR terms nobody explains during
        onboarding — until you try to leave. Here&apos;s everything you need to
        know before you resign from Infosys, TCS, or any IT company in India.
      </p>

      <hr />

      <h2>What Is Notice Period Buyout?</h2>

      <p>
        Buyout means paying your current employer for the notice days you
        didn&apos;t serve. Instead of working 90 days, you pay for 60 unserved
        days and leave early. The amount comes from your full and final
        settlement or as a separate payment.
      </p>

      <hr />

      <h2>How to Calculate Buyout Amount</h2>

      <h3>The Formula</h3>
      <p>
        <strong>(Monthly Gross Salary ÷ 30) × Remaining Notice Days</strong>
      </p>

      <h3>Example</h3>
      <p>
        Gross salary: ₹60,000/month. You served 30 days of a 90-day notice. 60
        days remaining.
      </p>
      <p>
        Buyout = (60,000 ÷ 30) × 60 = <strong>₹1,20,000</strong>
      </p>

      <p>
        Calculate your{" "}
        <Link href="/tools/notice-period-calculator">
          last working day
        </Link>{" "}
        and buyout timeline. Use our{" "}
        <Link href="/tools/salary-hike-calculator">
          salary hike calculator
        </Link>{" "}
        to estimate daily salary. Find your gross monthly salary with our{" "}
        <Link href="/tools/ctc-calculator">CTC Calculator</Link>.
      </p>

      <hr />

      <h2>Who Pays Buyout — You or New Company?</h2>

      <ul>
        <li>
          <strong>You pay</strong> — deducted from F&F if you leave early without
          agreement.
        </li>
        <li>
          <strong>New company reimburses</strong> — some startups and MNCs offer
          buyout reimbursement as part of the offer. Always ask during negotiation.
        </li>
        <li>
          <strong>Split deal</strong> — you pay 50%, new employer pays 50%. Common
          for senior hires.
        </li>
      </ul>

      <hr />

      <h2>When Can You Negotiate Early Exit?</h2>

      <ul>
        <li>You have a complete handover document and trained replacement</li>
        <li>Your project phase is finished — no critical deliverables pending</li>
        <li>Your manager supports early release (this matters more than HR policy)</li>
        <li>Company is laying off or restructuring (they may waive notice)</li>
      </ul>

      <hr />

      <h2>What If Company Refuses Early Exit?</h2>

      <p>
        Most employment contracts in India are not easily enforceable for notice
        period in court — but companies can withhold experience letters, mark
        absconding, or deduct buyout from F&F. The practical advice: negotiate
        with your manager first, HR second. Document everything in email.
      </p>

      <hr />

      <p>
        <Link href="/tools/notice-period-calculator">
          Calculate Your Notice Period →
        </Link>
      </p>
    </article>
  );
}
