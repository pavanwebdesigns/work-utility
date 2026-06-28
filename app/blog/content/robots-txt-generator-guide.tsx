import Link from "next/link";

const faqs = [
  {
    question: "What is a robots.txt file?",
    answer:
      "A robots.txt file is a text file placed at the root of your website (e.g. https://yoursite.com/robots.txt) that tells search engine crawlers and bots which pages or sections of your site they should or shouldn't crawl. It follows the Robots Exclusion Protocol.",
  },
  {
    question: "Does robots.txt block a page from appearing in search results?",
    answer:
      "No — robots.txt prevents crawlers from accessing a page, but doesn't prevent the page from appearing in search results if other sites link to it. To prevent a page from appearing in search results, use a noindex meta tag or X-Robots-Tag HTTP header instead.",
  },
  {
    question: "How do I block AI crawlers like GPTBot from my website?",
    answer:
      'Add these rules to your robots.txt: "User-agent: GPTBot / Disallow: /" (blocks OpenAI), "User-agent: CCBot / Disallow: /" (blocks Common Crawl), "User-agent: meta-externalagent / Disallow: /" (blocks Meta AI). Note that reputable AI companies honor robots.txt, while malicious bots may not.',
  },
  {
    question: "Can I allow some pages while blocking others for the same bot?",
    answer:
      "Yes — use a combination of Disallow and Allow rules. Allow rules override Disallow rules when both match the same path. The more specific rule takes precedence. For example, you can block /admin/ but allow /admin/login.html.",
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

export default function RobotsTxtGeneratorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Every website should have a <strong>robots.txt</strong> file at its root — a simple
        text file that tells search engines and bots which URLs they can crawl. Use our free{" "}
        <Link href="/tools/robots-txt-generator">robots.txt Generator</Link> to build one
        with presets for WordPress, Next.js, and AI crawler blocking. Part of our{" "}
        <Link href="/blog/complete-developer-tools-guide">Complete Developer Tools Guide</Link>.
      </p>

      <hr />

      <h2>What Is robots.txt?</h2>
      <p>
        A plain-text file at <code>https://yoursite.com/robots.txt</code> that communicates
        crawl preferences to compliant bots. It does not enforce security — it&apos;s a
        polite request, not a firewall.
      </p>

      <hr />

      <h2>Syntax Explained</h2>
      <ul>
        <li><strong>User-agent:</strong> Which bot the rules apply to (<code>*</code> = all)</li>
        <li><strong>Disallow:</strong> Paths the bot should not crawl</li>
        <li><strong>Allow:</strong> Exceptions to Disallow rules</li>
        <li><strong>Sitemap:</strong> URL to your XML sitemap (recommended at file end)</li>
        <li><strong>Crawl-delay:</strong> Optional seconds between requests (not supported by Google)</li>
      </ul>

      <hr />

      <h2>The * Wildcard</h2>
      <p>
        <code>User-agent: *</code> applies the following rules to all crawlers that don&apos;t
        have more specific rules defined elsewhere in the file.
      </p>

      <hr />

      <h2>Common Use Cases</h2>
      <p>
        Block admin areas (<code>/admin/</code>, <code>/wp-admin/</code>), protect staging
        environments, block AI training crawlers (GPTBot, CCBot, Claude-Web), or allow
        everything on a public marketing site. Our generator includes one-click presets.
      </p>

      <hr />

      <h2>What robots.txt Does NOT Do</h2>
      <p>
        Malicious bots ignore robots.txt. It is not authentication or access control — use
        server-level restrictions, firewalls, or auth for sensitive content.
      </p>

      <hr />

      <h2>noindex vs robots.txt</h2>
      <p>
        Use <strong>robots.txt</strong> to prevent crawling. Use <strong>noindex</strong>{" "}
        meta tags or HTTP headers to prevent indexing in search results. For pages you want
        hidden from Google entirely, noindex is the correct tool.
      </p>

      <hr />

      <h2>How to Test Your robots.txt</h2>
      <p>
        Use Google Search Console&apos;s URL Inspection tool or the robots.txt Tester to
        verify crawlers interpret your rules correctly before deploying.
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

      <h2>Related Tools</h2>
      <ul>
        <li><Link href="/tools/dns-lookup">DNS Lookup Tool</Link></li>
        <li><Link href="/tools/cron-generator">Cron Expression Generator</Link></li>
        <li><Link href="/tools/svg-previewer">SVG Code Previewer</Link></li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/robots-txt-generator">Generate robots.txt Free →</Link>
      </p>
    </article>
  );
}
