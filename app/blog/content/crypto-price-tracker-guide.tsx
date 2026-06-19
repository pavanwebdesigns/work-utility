import Link from "next/link";

const faqs = [
  {
    question: "Where do the prices come from?",
    answer:
      "Prices are sourced from CoinGecko, which aggregates data across major cryptocurrency exchanges to provide a representative mid-market price.",
  },
  {
    question: "Why does the price here differ slightly from what I see on a specific exchange?",
    answer:
      "This shows an aggregated mid-market price across multiple exchanges. Individual exchange prices vary slightly based on their own order books and liquidity.",
  },
  {
    question: "How often are prices updated?",
    answer:
      "Prices refresh approximately every 5 minutes. Use the refresh button for the latest data. For second-by-second trading data, use a dedicated exchange platform.",
  },
  {
    question: "Is this financial advice?",
    answer:
      "No — this is a reference price tracker only. Cryptocurrency prices are highly volatile; never make financial decisions based solely on a single tool's data.",
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

export default function CryptoPriceTrackerGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Track live cryptocurrency prices with our free{" "}
        <Link href="/tools/crypto-tracker">Crypto Price Tracker</Link>.
        See Bitcoin, Ethereum, and 15 top coins with 24h change, market cap, volume, and a simple USD/INR converter.
      </p>
      <hr />
      <h2>What the Prices Represent</h2>
      <p>
        CoinGecko aggregates spot prices across major exchanges to produce a representative mid-market price — not the exact price on any single exchange, which varies slightly by order book and liquidity.
      </p>
      <hr />
      <h2>24h Change, Market Cap, and Volume</h2>
      <p>
        <strong>24h change %</strong> shows how much the price moved in the last 24 hours — a quick momentum indicator without a full chart. <strong>Market cap</strong> equals price × circulating supply and ranks coins by total market size. <strong>24h volume</strong> shows trading activity in the last day.
      </p>
      <hr />
      <h2>Risk Note</h2>
      <p>
        Cryptocurrency prices are highly volatile and can drop significantly in short periods. This tool is a reference tracker, not investment advice. Never make financial decisions based solely on price data from any single tool.
      </p>
      <hr />
      <h2>Related Reading</h2>
      <ul>
        <li><Link href="/blog/currency-converter-guide">Currency Converter Guide</Link></li>
        <li><Link href="/blog/compound-interest-calculator-guide">Compound Interest Calculator Guide</Link></li>
      </ul>
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
      <p><Link href="/tools/crypto-tracker">Track Crypto Prices Now →</Link></p>
    </article>
  );
}
