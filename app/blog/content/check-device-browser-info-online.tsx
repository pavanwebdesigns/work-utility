import Link from "next/link";

const faqs = [
  {
    question: "Why does this matter for reporting a bug?",
    answer:
      "Developers and support teams often need to know your exact browser, OS, and screen details to reproduce and fix an issue — providing this upfront saves back-and-forth troubleshooting questions.",
  },
  {
    question: "Is this tool collecting information I wouldn't normally share with websites?",
    answer:
      "No — every website you visit can already see this same browser/device information through standard web APIs; this tool just displays it back to you in a readable format rather than using it silently.",
  },
  {
    question: "Why might my screen resolution look different from what I expect?",
    answer:
      "Device pixel ratio (common on high-DPI/Retina displays) means the reported resolution can differ from your monitor's physical pixel count — the viewport size is what's actually relevant for most web design purposes.",
  },
  {
    question: "Does this tool detect my exact location?",
    answer:
      "No — it reports device/browser technical details (screen, OS, browser version) and your browser's reported timezone setting, not your geographic location.",
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

export default function CheckDeviceBrowserInfoOnlineContent() {
  return (
    <article className="prose-custom">
      <p>
        &quot;What browser and OS are you using?&quot; is one of the first troubleshooting questions — pasting an exact report is faster than typing from memory. Use our free{" "}
        <Link href="/tools/device-info">Device & Browser Info</Link> checker to view and copy your details.
      </p>
      <hr />
      <h2>Bug Reports and Support</h2>
      <p>
        When reporting a bug to a developer or support team, include browser name, version, OS, screen resolution, and viewport size. A copied report is more accurate than guessing.
      </p>
      <hr />
      <h2>Responsive Design Testing</h2>
      <p>
        Quickly verify your viewport size and device pixel ratio when testing responsive layouts — especially on high-DPI displays where physical resolution and CSS pixels differ.
      </p>
      <hr />
      <h2>Nothing Hidden — Just Displayed</h2>
      <p>
        This tool only reads information your browser already exposes to any website through standard APIs. It doesn&apos;t collect anything unusual — it shows you what sites can already see.
      </p>
      <hr />
      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {faqs.map((faq) => (
        <div key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>
      ))}
      <hr />
      <p><Link href="/tools/device-info">Check Your Device Info Now →</Link></p>
    </article>
  );
}
