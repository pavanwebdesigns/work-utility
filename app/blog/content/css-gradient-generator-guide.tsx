import Link from "next/link";

const faqs = [
  {
    question: "What is a CSS gradient?",
    answer:
      "A CSS gradient is a smooth color transition defined in code rather than as an image file, making it infinitely scalable and requiring zero extra file downloads.",
  },
  {
    question: "What's the difference between linear, radial, and conic gradients?",
    answer:
      "Linear gradients transition along a straight line at an angle. Radial gradients radiate outward from a center point. Conic gradients transition around a center point, like a color wheel or pie chart.",
  },
  {
    question: "Can I use CSS gradients for colored text?",
    answer:
      "Yes — apply a gradient as a background, then use background-clip: text and color: transparent to create gradient-colored text, a popular modern design effect.",
  },
  {
    question: "Is the generated CSS compatible with all browsers?",
    answer:
      "Modern CSS gradients are well-supported across all current browsers — vendor prefixes like -webkit- were needed for older browsers but are rarely necessary today.",
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

export default function CssGradientGeneratorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Build beautiful backgrounds without image files using our free{" "}
        <Link href="/tools/css-gradient">CSS Gradient Generator</Link>.
        Pick linear, radial, or conic types, adjust color stops, preview live, and copy the exact <code>background</code> property value in one click.
      </p>
      <hr />
      <h2>Three CSS Gradient Types</h2>
      <p><strong>Linear gradients</strong> transition colors along a straight line at any angle — ideal for hero sections, buttons, and horizontal dividers. Example: <code>linear-gradient(135deg, #667eea 0%, #764ba2 100%)</code>.</p>
      <p><strong>Radial gradients</strong> radiate from a center point outward — great for spotlight effects, circular badges, and soft vignettes behind content.</p>
      <p><strong>Conic gradients</strong> rotate colors around a center point like a pie chart or color wheel — useful for progress rings, decorative charts, and angular backgrounds.</p>
      <hr />
      <h2>Color Stops and Transition Control</h2>
      <p>
        Each color stop defines a color and its position (0% to 100%). Stops closer together create sharper transitions; stops farther apart blend smoothly. Adding intermediate stops lets you build multi-color sunsets, ocean fades, or brand palettes without extra CSS.
      </p>
      <hr />
      <h2>Practical Web Design Uses</h2>
      <ul>
        <li><strong>Hero backgrounds</strong> — full-width gradients replace heavy background images.</li>
        <li><strong>Button hover states</strong> — subtle gradient shifts on interaction.</li>
        <li><strong>Card backgrounds</strong> — soft pastel gradients for modern UI cards.</li>
        <li><strong>Gradient text</strong> — combine with <code>background-clip: text</code> and <code>color: transparent</code> for headline effects.</li>
      </ul>
      <hr />
      <h2>Related Reading</h2>
      <ul>
        <li>
          <Link href="/blog/complete-developer-tools-guide">Complete Developer Tools Guide 2026</Link>
        </li>
        <li>
          <Link href="/blog/design-tools-for-developers-guide">Design Tools for Developers Guide</Link>
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
      <p>
        <Link href="/tools/css-gradient">Create a CSS Gradient Now →</Link>
      </p>
    </article>
  );
}
