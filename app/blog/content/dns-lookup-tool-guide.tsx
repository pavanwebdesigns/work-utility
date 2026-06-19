import Link from "next/link";

const faqs = [
  {
    question: "What is a DNS record?",
    answer:
      "DNS records are instructions stored in DNS servers that tell the internet how to handle requests for a domain — where to find its website (A record), which servers handle its email (MX record), and more.",
  },
  {
    question: "Why might results look different from another DNS lookup tool?",
    answer:
      "DNS results can vary slightly between different DNS resolvers and depend on which nameserver is queried. This tool uses Cloudflare's DNS resolver, which is one of the most accurate and up-to-date.",
  },
  {
    question: "What is TTL in DNS?",
    answer:
      "TTL (Time to Live) is how many seconds other DNS servers should cache this record before asking again for a fresh copy — lower TTL means changes propagate faster, higher TTL reduces DNS query load.",
  },
  {
    question: "How long do DNS changes take to propagate?",
    answer:
      "It depends on the TTL of the old record — if the previous TTL was 3600 seconds (1 hour), propagation can take up to an hour. Lower TTL values (like 300 seconds) allow changes to spread more quickly.",
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

export default function DnsLookupToolGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Check DNS records for any domain with our free{" "}
        <Link href="/tools/dns-lookup">DNS Lookup Tool</Link>.
        Query A, AAAA, CNAME, MX, TXT, NS, and SOA records via Cloudflare DNS — or run all common types at once.
      </p>
      <hr />
      <h2>What Is DNS?</h2>
      <p>
        DNS is the internet&apos;s phonebook — it translates human-readable domain names like <code>example.com</code> into IP addresses that computers use to reach servers.
      </p>
      <hr />
      <h2>Common Record Types</h2>
      <ul>
        <li><strong>A</strong> — IPv4 address for the domain</li>
        <li><strong>AAAA</strong> — IPv6 address</li>
        <li><strong>CNAME</strong> — alias pointing one domain to another</li>
        <li><strong>MX</strong> — mail server records for email delivery</li>
        <li><strong>TXT</strong> — text records for domain verification and SPF/DKIM</li>
        <li><strong>NS</strong> — nameserver records for the authoritative DNS servers</li>
        <li><strong>SOA</strong> — Start of Authority administrative zone info</li>
      </ul>
      <hr />
      <h2>Developer Use Cases</h2>
      <p>
        Verify DNS propagation after updating records, debug email delivery via MX/TXT checks, confirm CNAME points to the right CDN, and inspect nameservers after a domain transfer.
      </p>
      <hr />
      <h2>Related Reading</h2>
      <ul>
        <li><Link href="/blog/complete-developer-tools-guide">Complete Developer Tools Guide 2026</Link></li>
        <li><Link href="/blog/subnet-calculator-guide">Subnet Calculator Guide</Link></li>
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
      <p><Link href="/tools/dns-lookup">Look Up DNS Records Now →</Link></p>
    </article>
  );
}
