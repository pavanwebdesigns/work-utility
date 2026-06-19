import Link from "next/link";

const faqs = [
  {
    question: "What does /24 mean in an IP address like 192.168.1.0/24?",
    answer:
      "The /24 is CIDR notation, meaning the first 24 bits identify the network, leaving 8 bits for host addresses. This gives 256 total IP addresses (2^8), with 254 usable after reserving the network and broadcast addresses.",
  },
  {
    question: "Why are 2 addresses subtracted from the total to get usable hosts?",
    answer:
      "The first address is the network address (identifies the subnet itself, not assignable to devices), and the last address is the broadcast address (used to send to all devices on the subnet at once) — both are reserved and can't be assigned to individual hosts.",
  },
  {
    question: "What's the difference between a subnet mask and a CIDR prefix?",
    answer:
      "They express the same information in different formats. A /24 CIDR prefix is equivalent to a 255.255.255.0 subnet mask — CIDR is more compact and widely used today, while dotted-decimal subnet masks are the older format, still used in some device configuration interfaces.",
  },
  {
    question: "Which CIDR prefix should I use for a small office network?",
    answer:
      "/24 (256 addresses, 254 usable) is the most common choice for small networks, providing enough addresses for typical office use while keeping the subnet manageable. For very small segments (like point-to-point links), /30 (4 addresses, 2 usable) is common.",
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

export default function SubnetCalculatorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Subnetting is essential for network engineers, DevOps professionals, and anyone configuring cloud VPCs or firewalls. Use our free{" "}
        <Link href="/tools/subnet-calculator">Subnet Calculator</Link> to find network address, broadcast, usable hosts, IP range, and subnet mask from any IPv4 CIDR notation.
      </p>
      <hr />
      <h2>What Is Subnetting?</h2>
      <p>
        Subnetting divides a large IP network into smaller segments for security isolation, performance, and efficient IP allocation. Every network engineer and DevOps professional working with cloud VPCs, on-premise networks, firewalls, and router configurations relies on subnet math daily.
      </p>
      <hr />
      <h2>Understanding CIDR Notation</h2>
      <p>
        The <code>/24</code> in <code>192.168.1.0/24</code> means the first 24 bits are the network portion, leaving 8 bits for host addresses — 2<sup>8</sup> = 256 total addresses. After subtracting the network address (first) and broadcast address (last), you get 254 usable host addresses.
      </p>
      <hr />
      <h2>Common Cloud VPC Sizes</h2>
      <p>
        AWS typically recommends a <code>/16</code> for a full VPC (65,536 addresses) and <code>/24</code> subnets within it for individual segments. A <code>/30</code> (4 addresses, 2 usable) is common for point-to-point links between routers.
      </p>
      <hr />
      <h2>Related Reading</h2>
      <ul>
        <li>
          <Link href="/blog/complete-developer-tools-guide">Complete Developer Tools Guide 2026</Link>
        </li>
        <li>
          <Link href="/blog/developer-data-encoding-tools-guide">Developer Data Encoding Tools Guide</Link>
        </li>
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
      <p><Link href="/tools/subnet-calculator">Calculate a Subnet Now →</Link></p>
    </article>
  );
}
