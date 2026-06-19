import Link from "next/link";

const faqs = [
  {
    question: "Where do the exchange rates come from?",
    answer:
      "Rates are sourced from the European Central Bank's reference rates, a widely used official benchmark updated each business day.",
  },
  {
    question: "Why is the rate I get from my bank different?",
    answer:
      "The rates shown are mid-market reference rates. Banks and money transfer services add their own spread or fee on top, so the actual rate you receive for a transaction will differ.",
  },
  {
    question: "How often are the rates updated?",
    answer:
      "ECB reference rates are updated each business day (Monday through Friday, excluding ECB holidays). Weekend rates reflect Friday's closing rate.",
  },
  {
    question: "Can I use this for exact transaction planning?",
    answer:
      "Use it as a reference and planning tool — for the exact rate on a specific transaction, check directly with your bank or transfer service at the time of the transaction.",
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

export default function CurrencyConverterGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Convert between major world currencies with our free{" "}
        <Link href="/tools/currency-converter">Currency Converter</Link>.
        Rates come from the European Central Bank reference data — updated each business day and cached for fast loading.
      </p>
      <hr />
      <h2>Where Exchange Rates Come From</h2>
      <p>
        The European Central Bank publishes official reference exchange rates each business day. Frankfurter API serves this data free of charge — widely used as a benchmark for EUR and cross-currency reference rates.
      </p>
      <hr />
      <h2>What Exchange Rates Mean</h2>
      <p>
        An exchange rate tells you how many units of one currency you receive for one unit of another. Rates fluctuate due to supply and demand in global forex markets, central bank policies, and inflation differences between countries.
      </p>
      <hr />
      <h2>Mid-Market vs Bank Rates</h2>
      <p>
        The rates shown here are mid-market (interbank) reference rates. Banks, card issuers, and money transfer services add a spread or fee on top — so your actual transaction rate will differ. Use this tool for travel planning, international shopping estimates, freelancer invoicing, and salary comparisons — not as an exact transaction quote.
      </p>
      <hr />
      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {faqs.map((faq) => (
        <div key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
      <hr />
      <p><Link href="/tools/currency-converter">Convert Currencies Now →</Link></p>
    </article>
  );
}
