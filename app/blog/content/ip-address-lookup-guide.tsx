import Link from "next/link";

const faqs = [
  {
    question: "How accurate is IP geolocation?",
    answer:
      "IP geolocation is approximate — typically accurate to country level and often to city level, but not to exact street address. The location shown is based on where your ISP registered the IP block, which may differ from your actual physical location.",
  },
  {
    question: "Why does my IP show a different city than where I am?",
    answer:
      "IP addresses are assigned in blocks to ISPs, and the registered location of that block may be a different city than where you're physically located — especially if your ISP routes traffic through a regional hub.",
  },
  {
    question: "What's the difference between a public and private IP address?",
    answer:
      "Your public IP is visible to the internet and assigned by your ISP. Private IP addresses (like 192.168.x.x) are used within your local network and not visible externally — this tool shows public IPs only.",
  },
  {
    question: "Can I look up my phone's IP address?",
    answer:
      "Yes — visiting this tool on your phone will show your phone's current public IP (assigned by your mobile carrier or WiFi network).",
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

export default function IpAddressLookupGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Find your public IP or look up any IPv4 address with our free{" "}
        <Link href="/tools/ip-lookup">IP Address Lookup</Link> tool.
        See country, city, ISP, timezone, and coordinates — with clear notes on accuracy limits.
      </p>
      <hr />
      <h2>What Is an IP Address?</h2>
      <p>
        An IP address is a numerical label assigned to each device on a network — like a postal address for internet traffic. IPv4 uses dotted notation (e.g. 192.168.1.1); IPv6 uses a longer colon-separated format introduced to address IPv4 exhaustion.
      </p>
      <hr />
      <h2>What IP Geolocation Shows — and Its Limits</h2>
      <p>
        Geolocation maps an IP to an approximate location based on ISP registration data — typically country and often city-level accuracy, not your precise address. Results can show the wrong city if your ISP routes through a distant hub.
      </p>
      <hr />
      <h2>Developer Use Cases</h2>
      <p>
        Debug network issues, understand traffic origins in server logs, test geo-restriction behavior, and identify suspicious IP addresses in security reviews.
      </p>
      <hr />
      <h2>Related Reading</h2>
      <ul>
        <li><Link href="/blog/complete-developer-tools-guide">Complete Developer Tools Guide 2026</Link></li>
        <li><Link href="/blog/dns-lookup-tool-guide">DNS Lookup Tool Guide</Link></li>
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
      <p><Link href="/tools/ip-lookup">Look Up an IP Address Now →</Link></p>
    </article>
  );
}
