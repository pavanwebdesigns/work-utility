import Link from "next/link";

const faqs = [
  {
    question: "What is the current SSY interest rate in 2026?",
    answer:
      "The Sukanya Samriddhi Yojana interest rate for Q1 FY2026-27 (April–June 2026) is 8.2% per annum, compounded annually. The rate is reviewed each quarter by the government and has remained at 8.2% since January 2024.",
  },
  {
    question: "How long do I need to deposit in SSY?",
    answer:
      "Deposits are required for 15 years from the date of account opening. After 15 years, no new deposits are made but the existing balance continues to earn interest until maturity at 21 years from account opening (or until the girl's marriage after age 18, whichever is earlier).",
  },
  {
    question: "When can I withdraw from SSY?",
    answer:
      "Partial withdrawal of up to 50% of the balance at the end of the previous financial year is allowed after the girl turns 18, for educational purposes. Full withdrawal and account closure occurs at 21 years from account opening, or on the girl's marriage (subject to conditions) after she turns 18.",
  },
  {
    question: "Is SSY better than PPF for girl child savings?",
    answer:
      "SSY currently offers a higher interest rate (8.2%) than PPF (7.1%), and both offer EEE tax status. SSY is specifically for girl children with a 21-year lock-in, while PPF has a 15-year lock-in and can be extended. If you're saving specifically for a daughter's education and marriage corpus, SSY is generally better due to the higher rate and purpose-alignment.",
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

export default function SukanyaSamriddhiYojanaCalculatorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Sukanya Samriddhi Yojana (SSY) is a government savings scheme for girl
        children offering 8.2% interest and EEE tax status. Use our free{" "}
        <Link href="/tools/ssy-calculator">SSY Calculator</Link> to project maturity,
        partial withdrawal at 18, and year-by-year growth. Part of our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary & Tax Guide for India
        </Link>
        .
      </p>

      <hr />

      <h2>What Is SSY?</h2>
      <p>
        SSY is a government-backed scheme for girl child education and marriage
        expenses. It currently offers 8.2% per annum (Q1 FY2026-27), compounded
        annually with interest credited on 31 March each year.
      </p>

      <hr />

      <h2>SSY Eligibility and Account Opening</h2>
      <p>
        The girl child must be below 10 years at account opening. Maximum two SSY
        accounts per family (one per girl child). Parents or legal guardians can
        open the account at post offices or authorised banks.
      </p>

      <hr />

      <h2>Investment Limits</h2>
      <p>
        Minimum ₹250 per year, maximum ₹1,50,000 per year. Deposits are mandatory
        for 15 years from account opening. Missing a year incurs a penalty of ₹50
        per year of default.
      </p>

      <hr />

      <h2>SSY Interest Calculation</h2>
      <p>
        Interest is calculated on the lowest balance between the 5th and last day of
        each month, credited annually on 31 March. The rate is reviewed quarterly by
        the government.
      </p>

      <hr />

      <h2>Partial Withdrawal at 18</h2>
      <p>
        After the girl turns 18, up to 50% of the balance at the end of the previous
        financial year can be withdrawn for higher education expenses.
      </p>

      <hr />

      <h2>Account Maturity at 21</h2>
      <p>
        Full withdrawal and account closure at 21 years from opening, or earlier on
        marriage after age 18 (subject to conditions). After year 15, no new deposits
        are made but interest continues to compound.
      </p>

      <hr />

      <h2>SSY vs PPF vs FD</h2>
      <p>
        SSY wins on rate (8.2% vs PPF 7.1%) and EEE status, but has a longer
        lock-in until age 18/21. Compare with{" "}
        <Link href="/tools/ppf-calculator">PPF Calculator</Link> and{" "}
        <Link href="/tools/nps-calculator">NPS Calculator</Link>. Guide:{" "}
        <Link href="/blog/ppf-calculator-guide-india">PPF calculator guide</Link>.
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
