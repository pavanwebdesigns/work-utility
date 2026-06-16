import Link from "next/link";

const faqs = [
  {
    question: "Is gratuity paid even if I resign (not fired)?",
    answer:
      "Yes. Gratuity is owed for resignation, retirement, layoff, or termination — as long as you meet the minimum service requirement. It is not a discretionary bonus.",
  },
  {
    question: "What if my company has fewer than 10 employees?",
    answer:
      "You may still be entitled to gratuity under your employment contract or company policy, but the statutory formula under the Payment of Gratuity Act may not strictly apply — check your offer letter or HR policy.",
  },
  {
    question: "Does gratuity get paid along with my final salary?",
    answer:
      "Employers are required to pay gratuity within 30 days of it becoming due. It's usually processed separately from your final salary settlement.",
  },
  {
    question: "Is the ₹20 lakh exemption per job or for my whole career?",
    answer:
      "It's a lifetime aggregate limit across all employers, not per job.",
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

export default function GratuityCalculationFormulaIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        Gratuity is a lump-sum payment your employer owes you for long service,
        but most employees only think about it when they&apos;re already
        resigning — by which point it&apos;s too late to plan around it. Knowing
        the formula in advance helps you understand exactly what you&apos;re
        entitled to and whether your employer&apos;s settlement is correct. See
        also our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary &amp; Tax Guide for Indian Employees
        </Link>
        .
      </p>

      <hr />

      <h2>Who Is Eligible</h2>

      <p>
        Under the Payment of Gratuity Act, 1972, you&apos;re eligible for
        gratuity if you&apos;ve completed at least 5 years of continuous service
        with the same employer (this 5-year rule has some exceptions, like death
        or disability, where it doesn&apos;t apply). The Act covers
        establishments with 10 or more employees, which includes the vast
        majority of mid-size and large Indian companies.
      </p>

      <hr />

      <h2>The Formula</h2>

      <p>
        For employees covered under the Act, gratuity is calculated as:
      </p>

      <p>
        <strong>
          (Last drawn basic salary + DA) × 15 × number of years of service ÷ 26
        </strong>
      </p>

      <p>
        The &quot;26&quot; represents the typical number of working days in a
        month (assuming a 6-day work week), and &quot;15&quot; represents 15
        days of salary for each completed year of service. Any service period
        over 6 months in your final year is rounded up to a full year.
      </p>

      <hr />

      <h2>Worked Example</h2>

      <p>
        If your last drawn basic + DA is ₹50,000/month and you&apos;ve completed
        12 years of service: ₹50,000 × 15 × 12 ÷ 26 ≈ ₹3,46,154. The{" "}
        <Link href="/tools/gratuity-calculator">Gratuity Calculator</Link> does
        this math instantly and also shows whether your employer falls under the
        Act&apos;s coverage rules — toggle this in the tool if you work for a
        smaller establishment, since the formula and exemption rules differ
        slightly outside the Act.
      </p>

      <hr />

      <h2>The ₹20 Lakh Exemption Limit</h2>

      <p>
        Gratuity received is exempt from income tax up to ₹20 lakh (this limit
        was raised from ₹10 lakh in 2018). Any amount received above ₹20 lakh
        across your career is taxable. For most employees this limit is generous
        enough that gratuity is effectively tax-free, but it&apos;s worth
        checking if you&apos;ve changed jobs multiple times with high gratuity
        payouts.
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

      <hr />

      <h2>Related Reading</h2>
      <ul>
        <li>
          <Link href="/blog/complete-salary-tax-guide-india">
            Complete Salary &amp; Tax Guide for Indian Employees
          </Link>
        </li>
        <li>
          <Link href="/blog/epf-calculator-guide-india">
            EPF Calculator Guide for India
          </Link>
        </li>
        <li>
          <Link href="/blog/lta-exemption-rules-india">
            LTA Exemption Rules in India
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/gratuity-calculator">
          Calculate Your Gratuity Amount →
        </Link>
      </p>
    </article>
  );
}
