import Link from "next/link";

const faqs = [
  {
    question:
      "What is the GST registration threshold for freelancers in India?",
    answer:
      "For service providers in regular states, GST registration is mandatory when annual aggregate turnover exceeds ₹20 lakhs. For special category states (North-East, Himachal Pradesh, Uttarakhand, J&K), the threshold is ₹10 lakhs.",
  },
  {
    question: "Do IT freelancers who export services need GST registration?",
    answer:
      "If aggregate turnover exceeds ₹20 lakhs, yes — even though exports are zero-rated (no GST charged to foreign clients). Registration is needed to file returns, claim refunds, and furnish a Letter of Undertaking (LUT) for export without payment of IGST.",
  },
  {
    question:
      "Is GST mandatory for inter-state supply regardless of turnover?",
    answer:
      "Yes — any inter-state taxable supply requires GST registration regardless of annual turnover. If you invoice a client in another state, you must register even if your total income is below ₹20 lakh.",
  },
  {
    question: "Can I register for GST voluntarily below ₹20 lakhs?",
    answer:
      "Yes — voluntary registration is allowed and often makes sense if you have B2B clients who need GST invoices to claim Input Tax Credit, or if you plan to export services and want a proper GSTIN for compliance.",
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

export default function FreelancerGstRegistrationGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        One of the most common questions Indian freelancers and IT contractors
        ask is whether they need GST registration. Use our free{" "}
        <Link href="/tools/gst-threshold-checker">GST Threshold Checker</Link>{" "}
        to get an instant answer based on your turnover, supply type, and state.
        Related:{" "}
        <Link href="/blog/section-44ada-freelancer-tax-guide">
          Section 44ADA freelancer tax guide
        </Link>{" "}
        and our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary &amp; Tax Guide for India
        </Link>
        .
      </p>

      <hr />

      <h2>GST Thresholds for FY 2026-27</h2>
      <p>
        For <strong>service providers</strong> in regular states, the threshold
        is <strong>₹20 lakh</strong> aggregate annual turnover. In special
        category states, it drops to <strong>₹10 lakh</strong>. For{" "}
        <strong>goods suppliers</strong>, thresholds are ₹40 lakh (regular) and
        ₹20 lakh (special states). Our checker applies the correct limit based
        on your inputs.
      </p>

      <hr />

      <h2>Inter-State Supply — No Threshold Exemption</h2>
      <p>
        If you supply services or goods to clients in another state, GST
        registration is <strong>mandatory regardless of turnover</strong>. A
        Bengaluru freelancer invoicing a Mumbai client must register even at
        ₹5 lakh annual income. This is the most commonly missed rule among new
        freelancers.
      </p>

      <hr />

      <h2>Export of Services — Zero-Rated but Registration May Apply</h2>
      <p>
        IT freelancers exporting software development, consulting, or design
        services to foreign clients enjoy <strong>zero-rated supply</strong> —
        no GST is charged. However, if aggregate turnover exceeds ₹20 lakh,
        registration is still required to file returns and furnish LUT for
        export without IGST payment.
      </p>

      <hr />

      <h2>Voluntary GST Registration</h2>
      <p>
        Below the threshold, you can still register voluntarily. This makes
        sense when B2B clients need GST invoices for Input Tax Credit, when you
        want to claim ITC on business expenses, or when building credibility with
        corporate clients who prefer GST-compliant vendors.
      </p>

      <hr />

      <h2>GST vs Income Tax for Freelancers</h2>
      <p>
        GST and income tax are separate obligations. Crossing the GST threshold
        does not change your income tax regime. Use our{" "}
        <Link href="/tools/freelancer-tax-calculator">
          Freelancer Tax Calculator
        </Link>{" "}
        for Section 44ADA presumptive tax and our{" "}
        <Link href="/tools/income-tax-calculator">Income Tax Calculator</Link>{" "}
        for slab-based estimates under old or new regime.
      </p>

      <hr />

      <h2>How to Register on gst.gov.in</h2>
      <p>
        If registration is mandatory, you must apply within{" "}
        <strong>30 days</strong> of becoming liable. Visit gst.gov.in, complete
        Form GST REG-01 with PAN, Aadhaar, bank details, and business address
        proof. Most freelancers register as sole proprietors under their PAN.
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

      <p>
        <Link href="/tools/gst-threshold-checker">
          Check GST Threshold Free →
        </Link>
      </p>
    </article>
  );
}
