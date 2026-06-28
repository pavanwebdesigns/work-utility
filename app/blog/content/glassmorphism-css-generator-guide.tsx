import Link from "next/link";

const faqs = [
  {
    question: "What CSS property creates the glassmorphism effect?",
    answer:
      "The glassmorphism effect is primarily created by backdrop-filter: blur() combined with a semi-transparent background (rgba). The blur applies to everything behind the element, creating a frosted glass appearance. You also need a subtle border and box-shadow to give the element definition.",
  },
  {
    question: "Does glassmorphism work in Firefox?",
    answer:
      "As of 2026, Firefox has limited backdrop-filter support — it's disabled by default and requires users to enable a flag in about:config. Always implement a fallback using @supports: if backdrop-filter isn't supported, show a higher-opacity background so text remains readable without the blur effect.",
  },
  {
    question: "How do I add glassmorphism in Tailwind CSS?",
    answer:
      "Use Tailwind's backdrop utilities: backdrop-blur-md for blur, bg-white/20 for 20% opacity background, and rounded-2xl for border radius. Some custom blur values may require arbitrary syntax like [backdrop-filter:blur(16px)]. The pure CSS approach gives you more precise control.",
  },
  {
    question: "Is glassmorphism bad for performance?",
    answer:
      "backdrop-filter is GPU-intensive because each glass element requires a separate blur calculation on the GPU. Using 3-5 glass elements on a page is generally fine. Using 10+ glass elements, or animating the blur value, can cause performance issues especially on mobile. Use sparingly on key UI elements only.",
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

export default function GlassmorphismCssGeneratorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Glassmorphism creates a frosted glass UI effect — semi-transparent panels
        with blurred backgrounds behind them. Use our free{" "}
        <Link href="/tools/glassmorphism-generator">
          Glassmorphism CSS Generator
        </Link>{" "}
        to export pure CSS, Tailwind classes, or CSS variables with live preview.
        Part of our{" "}
        <Link href="/blog/complete-developer-tools-guide">
          Complete Developer Tools Guide
        </Link>
        .
      </p>

      <hr />

      <h2>What Is Glassmorphism?</h2>
      <p>
        A UI design trend popularized by Apple macOS Big Sur and Microsoft Fluent
        UI — frosted glass panels that let background content show through with a
        blur effect. Works well for cards, modals, navigation bars, and overlays.
      </p>

      <hr />

      <h2>The CSS Behind Glassmorphism</h2>
      <p>
        The core stack: <code>backdrop-filter: blur()</code> + semi-transparent{" "}
        <code>background: rgba()</code> + subtle <code>border</code> +{" "}
        <code>box-shadow</code>. The blur applies to everything rendered behind the
        element, creating the frosted appearance.
      </p>

      <hr />

      <h2>The -webkit- Prefix</h2>
      <p>
        Safari still requires <code>-webkit-backdrop-filter</code> alongside{" "}
        <code>backdrop-filter</code> for full compatibility. Always include both in
        production CSS.
      </p>

      <hr />

      <h2>Firefox and Glassmorphism</h2>
      <p>
        Firefox has limited <code>backdrop-filter</code> support — disabled by
        default. Use an <code>@supports not (backdrop-filter: blur(1px))</code>{" "}
        fallback with a higher-opacity background so content remains readable. Our
        generator includes this fallback automatically.
      </p>

      <hr />

      <h2>Performance Considerations</h2>
      <p>
        Each glass element triggers a separate GPU blur pass. Limit to 3–5 elements
        per page. Never animate blur values — it causes severe jank on mobile. Use
        glassmorphism on key UI elements only, not every card on the page.
      </p>

      <hr />

      <h2>When to Use Glassmorphism</h2>
      <p>
        Best for: navigation bars, modal overlays, floating cards on colorful
        backgrounds, and hero sections. Avoid: dense data tables, long-form text
        blocks, and pages where readability is critical over aesthetics.
      </p>

      <hr />

      <h2>Tailwind CSS Glassmorphism</h2>
      <p>
        Tailwind provides <code>backdrop-blur-md</code>, <code>bg-white/20</code>,{" "}
        <code>rounded-2xl</code>, and <code>backdrop-saturate-150</code>. Custom
        blur values need arbitrary syntax:{" "}
        <code>[backdrop-filter:blur(12px)]</code>. Our generator outputs all three
        formats — CSS, Tailwind, and CSS variables.
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

      <h2>Related Tools & Guides</h2>
      <ul>
        <li>
          <Link href="/tools/css-gradient">CSS Gradient Generator</Link>
        </li>
        <li>
          <Link href="/blog/design-tools-for-developers-guide">
            Design Tools for Developers Guide
          </Link>
        </li>
        <li>
          <Link href="/blog/complete-developer-tools-guide">
            Complete Developer Tools Guide
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/glassmorphism-generator">
          Generate Glassmorphism CSS Free →
        </Link>
      </p>
    </article>
  );
}
