import Link from "next/link";

const faqs = [
  {
    question: "What is a CSS box-shadow?",
    answer:
      "CSS box-shadow adds shadow effects to an element. It takes up to 6 values: horizontal offset, vertical offset, blur radius, spread radius, color, and an optional \"inset\" keyword for inner shadows. Multiple comma-separated shadows can be stacked for more realistic, layered effects.",
  },
  {
    question: "How do I create an inset shadow in CSS?",
    answer:
      'Add the "inset" keyword before the other values: box-shadow: inset 0 2px 4px rgba(0,0,0,0.2). Inset shadows appear inside the element instead of outside, useful for creating pressed button states or depth effects on input fields.',
  },
  {
    question: "How do multi-layer shadows work?",
    answer:
      "Multiple box-shadow values separated by commas stack on top of each other. This technique creates more realistic shadows by simulating how light in the real world produces soft, diffused shadows. Apple's design system, for example, uses 3-4 shadow layers at different blur intensities.",
  },
  {
    question: "What is the difference between box-shadow and filter:drop-shadow?",
    answer:
      "box-shadow only applies to the element's rectangular box — it doesn't follow the element's border-radius or transparent cutouts. filter:drop-shadow follows the element's actual shape, including transparency. However, box-shadow is generally more performant and better supported. Use filter:drop-shadow for non-rectangular elements like PNG icons.",
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

export default function BoxShadowCssGeneratorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        CSS <code>box-shadow</code> adds depth and elevation to UI elements — from
        subtle cards to dramatic glows. Use our free{" "}
        <Link href="/tools/box-shadow-generator">Box Shadow CSS Generator</Link> to
        build multi-layer shadows with live preview. Pair with{" "}
        <Link href="/tools/glassmorphism-generator">Glassmorphism Generator</Link>{" "}
        for frosted glass cards. Part of our{" "}
        <Link href="/blog/complete-developer-tools-guide">
          Complete Developer Tools Guide
        </Link>
        .
      </p>

      <hr />

      <h2>CSS box-shadow Syntax</h2>
      <p>
        <code>box-shadow: offset-x offset-y blur spread color inset;</code> — each
        value controls a different aspect. Offset moves the shadow, blur softens
        edges, spread expands/contracts size, color sets tint, inset flips shadow
        inside the element.
      </p>

      <hr />

      <h2>Multi-Layer Shadows</h2>
      <p>
        Stacking multiple comma-separated shadows creates realistic depth. Apple&apos;s
        design system uses 3 layers at different blur radii — a tight shadow for
        contact, a medium one for elevation, and a soft ambient shadow.
      </p>

      <hr />

      <h2>Inset Shadows</h2>
      <p>
        Add <code>inset</code> for inner shadows — perfect for pressed button states,
        input field depth, or neumorphic designs. Our generator includes an inset
        toggle per layer.
      </p>

      <hr />

      <h2>Colored Shadows (Glow Effects)</h2>
      <p>
        Use colored rgba shadows for glow effects — popular in dark mode UIs and
        accent buttons. Try our &quot;Colored Glow&quot; preset with indigo at 40%
        opacity.
      </p>

      <hr />

      <h2>Performance: box-shadow vs filter:drop-shadow</h2>
      <p>
        <code>box-shadow</code> is hardware-accelerated and preferred for rectangular
        elements. <code>filter:drop-shadow</code> follows non-rectangular shapes but
        costs more. Use box-shadow unless you need shape-aware shadows.
      </p>

      <hr />

      <h2>Tailwind CSS Shadow Utilities</h2>
      <p>
        Tailwind provides <code>shadow-sm</code> through <code>shadow-2xl</code> for
        single standard shadows. Multi-layer or colored shadows need arbitrary
        values: <code>[box-shadow:...]</code> or custom config in{" "}
        <code>tailwind.config.js</code>.
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

      <h2>Related Tools</h2>
      <ul>
        <li>
          <Link href="/tools/glassmorphism-generator">Glassmorphism CSS Generator</Link>
        </li>
        <li><Link href="/tools/css-gradient">CSS Gradient Generator</Link></li>
        <li>
          <Link href="/blog/glassmorphism-css-generator-guide">
            Glassmorphism CSS guide
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/box-shadow-generator">Generate Box Shadow CSS Free →</Link>
      </p>
    </article>
  );
}
