import Link from "next/link";

const faqs = [
  {
    question: "Why is my federal tax bracket different from my effective tax rate?",
    answer:
      "Your tax bracket is the rate on your highest dollar of income, but the US system is progressive — lower portions of your income are taxed at lower rates first, so your effective (average) rate is always lower than your top bracket.",
  },
  {
    question: "Will a raise ever reduce my take-home pay?",
    answer:
      "No — only the income that falls within a higher bracket is taxed at that bracket's rate; the rest continues being taxed at the lower rates it always was. A raise always increases take-home pay, even if part of it lands in a higher bracket.",
  },
  {
    question: "What's the difference between federal income tax and FICA?",
    answer:
      "Federal income tax funds general government operations and is based on your tax bracket. FICA (Social Security and Medicare taxes) is a separate flat-rate payroll tax that funds those specific programs, calculated differently from income tax.",
  },
  {
    question: "How accurate is the state tax shown?",
    answer:
      "Federal tax and FICA are calculated precisely from current IRS figures. State tax is a simplified flat-rate estimate (or zero, for the 9 no-income-tax states) — for an exact figure, check your specific state's tax tables.",
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

export default function USPaycheckCalculatorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Wondering what you&apos;ll actually take home from your salary? Use our free{" "}
        <Link href="/tools/paycheck-calculator">Paycheck Calculator</Link> to estimate
        net pay after 2026 federal tax, FICA, and deductions — based on current IRS
        brackets.
      </p>
      <hr />
      <h2>Gross Pay vs Net Pay</h2>
      <p>
        Your <strong>gross pay</strong> is your total earnings before any taxes or
        deductions. Your <strong>net pay</strong> (take-home pay) is what lands in your
        bank account after federal income tax, FICA payroll taxes, state tax, and any
        pre-tax deductions like 401(k) contributions or health insurance.
      </p>
      <p>
        Many people look only at their salary figure and are surprised by how much
        smaller their actual paycheck is. This calculator shows both the annual totals
        and a per-pay-period breakdown based on your pay frequency.
      </p>
      <hr />
      <h2>What FICA Actually Funds</h2>
      <p>
        FICA is <em>not</em> the same as federal income tax. It stands for Federal
        Insurance Contributions Act and funds two specific programs:
      </p>
      <ul>
        <li>
          <strong>Social Security (6.2%)</strong> — applied to wages up to the annual
          wage base ($184,500 in 2026)
        </li>
        <li>
          <strong>Medicare (1.45%)</strong> — applied to all wages, with an
          additional 0.9% on high earners above $200,000 (single) or $250,000
          (married filing jointly)
        </li>
      </ul>
      <p>
        These are flat payroll taxes, separate from the progressive federal income tax
        brackets. You&apos;ll see them on every paycheck regardless of your filing
        status.
      </p>
      <hr />
      <h2>The Standard Deduction</h2>
      <p>
        Before federal tax brackets apply, the IRS subtracts the{" "}
        <strong>standard deduction</strong> from your taxable income. For 2026, this is
        $16,100 for single filers, $32,200 for married filing jointly, and $24,150 for
        head of household.
      </p>
      <p>
        Pre-tax deductions (401(k), health insurance, HSA) further reduce your
        taxable income before brackets are applied — which is why contributing to a
        401(k) lowers your federal tax bill.
      </p>
      <hr />
      <h2>Tax Brackets vs Effective Rate — and Why Raises Never Hurt You</h2>
      <p>
        A common misconception: &quot;If I get a raise and move into a higher tax
        bracket, I&apos;ll take home less money.&quot; This is <strong>never true</strong> in
        the US progressive tax system.
      </p>
      <p>
        Only the income <em>inside</em> a higher bracket is taxed at that higher rate.
        The rest of your income continues being taxed at the lower rates it always was.
        A raise always increases your take-home pay — even if part of the raise lands
        in a higher bracket.
      </p>
      <p>
        Your <strong>marginal bracket</strong> is the rate on your last dollar of
        income. Your <strong>effective rate</strong> is your total federal tax divided
        by gross pay — always lower than your top bracket because lower dollars were
        taxed at lower rates first.
      </p>
      <hr />
      <h2>State Tax — What This Calculator Does and Doesn&apos;t Do</h2>
      <p>
        Federal tax and FICA in this calculator use precise 2026 IRS figures. State
        income tax is handled honestly and simply:
      </p>
      <ul>
        <li>
          Nine states have <strong>no wage income tax</strong> (Alaska, Florida, Nevada,
          New Hampshire, South Dakota, Tennessee, Texas, Washington, Wyoming) — state tax
          is $0 automatically
        </li>
        <li>
          For all other states, you can enter your own known effective state tax rate,
          or use the default ~5% rough estimate
        </li>
      </ul>
      <p>
        We do <strong>not</strong> model each state&apos;s actual progressive bracket
        structure in this version — that would require state-by-state rules with high
        error risk if rushed. The estimate is clearly labeled so you aren&apos;t misled.
        For an exact state figure, check your state&apos;s tax tables or your pay stub.
      </p>
      <hr />
      <h2>From Take-Home Pay to Home Affordability</h2>
      <p>
        Once you know your net pay, the natural next step is understanding what home
        price fits your budget. See our{" "}
        <Link href="/blog/mortgage-calculator-guide">mortgage calculator guide</Link>{" "}
        and try the{" "}
        <Link href="/tools/mortgage-calculator">Mortgage Calculator</Link> to see full
        monthly PITI payments and amortization.
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
    </article>
  );
}
