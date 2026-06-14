import Link from "next/link";

const faqs = [
  {
    question: "How much in-hand salary for 6 LPA CTC?",
    answer:
      "For ₹6 LPA CTC, in-hand salary is typically ₹45,000–₹52,000 per month depending on company structure, PF contribution, and tax regime. Use our CTC Calculator for exact breakdown.",
  },
  {
    question: "Which tax regime is better in 2026?",
    answer:
      "New regime suits most salaried employees without heavy 80C investments. Old regime benefits those with home loans, HRA, and significant deductions. Compare both with our Income Tax Calculator.",
  },
  {
    question: "How much SIP for 1 crore in 10 years?",
    answer:
      "At 12% annual returns, you need roughly ₹43,000/month SIP to reach ₹1 crore in 10 years. Use our SIP Calculator to model different amounts and return rates.",
  },
  {
    question: "What is notice period buyout in India?",
    answer:
      "Notice period buyout lets you leave a job early by paying salary for remaining notice days instead of serving them. Amount depends on gross salary and days remaining.",
  },
  {
    question: "How to calculate EMI for home loan?",
    answer:
      "EMI depends on loan amount, interest rate, and tenure. For ₹50 lakh at 8.5% for 20 years, EMI is approximately ₹43,400. Use our EMI Calculator for exact figures.",
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

export default function CompleteSalaryTaxGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        Rohit joined his first job in Bangalore with a ₹8 LPA offer letter. Three
        months later, he still could not explain why his bank account showed
        ₹52,000 when his CTC implied ₹66,000 per month. Like most Indian
        employees, he was confused by PF, professional tax, TDS, and the old vs
        new tax regime. This guide covers everything from CTC breakdown to SIP
        planning — with free calculators for every step.
      </p>

      <nav className="rounded-xl border border-surface-border bg-surface-card p-5 not-prose">
        <p className="mb-3 text-sm font-semibold text-content-primary">
          Table of Contents
        </p>
        <ul className="space-y-2 text-sm text-brand-blue">
          <li><a href="#ctc">Understanding your CTC and in-hand salary</a></li>
          <li><a href="#tax-regime">Old vs New tax regime — which is better</a></li>
          <li><a href="#save-tax">How to save income tax legally</a></li>
          <li><a href="#sip-fd">SIP vs FD — where to invest</a></li>
          <li><a href="#emi">Home loan EMI planning</a></li>
          <li><a href="#gst">GST for freelancers</a></li>
          <li><a href="#hike">Salary hike negotiation</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </nav>

      <hr />

      <h2 id="ctc">Understanding Your CTC and In-Hand Salary</h2>
      <p>
        CTC (Cost to Company) includes basic salary, HRA, special allowance, PF
        employer contribution, gratuity, and insurance — not all of which lands in
        your bank account. Use the{" "}
        <Link href="/tools/ctc-calculator">CTC Calculator</Link> and read{" "}
        <Link href="/blog/how-to-calculate-in-hand-salary-from-ctc">
          How to calculate in-hand salary from CTC
        </Link>{" "}
        and{" "}
        <Link href="/blog/how-to-read-salary-slip-india">
          How to read salary slip
        </Link>
        .
      </p>

      <h2 id="tax-regime">Old vs New Tax Regime — Which Is Better</h2>
      <p>
        The 2025–26 budget made the new regime default for most employees. Compare
        both with the{" "}
        <Link href="/tools/income-tax-calculator">Income Tax Calculator</Link>.
        Full comparison:{" "}
        <Link href="/blog/old-vs-new-tax-regime-india-2025">
          Old vs New tax regime 2025
        </Link>
        .
      </p>

      <h2 id="save-tax">How to Save Income Tax Legally</h2>
      <p>
        Section 80C (₹1.5 lakh), 80D health insurance, HRA exemption, and home
        loan interest can significantly reduce tax under the old regime. Guide:{" "}
        <Link href="/blog/how-to-save-income-tax-india-legally">
          How to save income tax legally
        </Link>
        . Generate rent receipts with our Rent Receipt Generator for HRA claims.
      </p>

      <h2 id="sip-fd">SIP vs FD — Where to Invest</h2>
      <p>
        FDs offer guaranteed returns; SIPs in mutual funds build wealth over time
        with market-linked returns. Model both with{" "}
        <Link href="/tools/sip-calculator">SIP Calculator</Link> and{" "}
        <Link href="/tools/fd-calculator">FD Calculator</Link>. Read{" "}
        <Link href="/blog/how-to-start-sip-india-beginners-guide">
          How to start SIP in India
        </Link>{" "}
        and{" "}
        <Link href="/blog/fd-vs-sip-india-comparison">FD vs SIP comparison</Link>.
      </p>

      <h2 id="emi">Home Loan EMI Planning</h2>
      <p>
        Before buying property, ensure EMI stays under 40% of take-home salary.
        Calculate with{" "}
        <Link href="/tools/emi-calculator">EMI Calculator</Link>. Full guide:{" "}
        <Link href="/blog/home-loan-emi-guide-india">Home loan EMI guide</Link>.
      </p>

      <h2 id="gst">GST for Freelancers</h2>
      <p>
        GST registration is mandatory when turnover exceeds ₹20 lakh (₹10 lakh in
        special category states). Calculate GST on invoices with{" "}
        <Link href="/tools/gst-calculator">GST Calculator</Link>. Guide:{" "}
        <Link href="/blog/gst-for-freelancers-india">GST for freelancers</Link>.
      </p>

      <h2 id="hike">Salary Hike Negotiation</h2>
      <p>
        Appraisal season in India means negotiating with HR or switching jobs.
        Calculate expected hike with{" "}
        <Link href="/tools/salary-hike-calculator">Salary Hike Calculator</Link>.
        Read{" "}
        <Link href="/blog/salary-hike-negotiation-guide-india">
          Salary hike negotiation guide
        </Link>{" "}
        and{" "}
        <Link href="/blog/notice-period-buyout-india-guide">
          Notice period buyout guide
        </Link>
        . Plan exit dates with{" "}
        <Link href="/tools/notice-period-calculator">
          Notice Period Calculator
        </Link>
        .
      </p>

      <hr />

      <h2 id="faq">Frequently Asked Questions</h2>
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

      <hr />

      <p>
        <Link href="/tools/ctc-calculator">Calculate Your In-Hand Salary →</Link>
      </p>
    </article>
  );
}
