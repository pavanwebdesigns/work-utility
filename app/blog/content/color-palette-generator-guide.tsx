import Link from "next/link";

const faqs = [
  {
    question: "What is a Tailwind color scale?",
    answer:
      "Tailwind CSS uses a numeric scale from 50 (lightest) to 950 (darkest) for colors — 11 shades total. This systematic approach ensures visual consistency: shade 50 works for backgrounds, 200-300 for borders, 500 for primary actions, 700-800 for text on light backgrounds, and 900-950 for dark mode backgrounds.",
  },
  {
    question: "How do I add a custom color palette to Tailwind?",
    answer:
      "Add your custom colors in tailwind.config.js under theme.extend.colors: { yourColorName: { 50: '#hex', 100: '#hex', ..., 950: '#hex' } }. This makes classes like bg-yourColorName-100 or text-yourColorName-700 available throughout your project.",
  },
  {
    question: "What is WCAG contrast ratio and why does it matter?",
    answer:
      "WCAG (Web Content Accessibility Guidelines) contrast ratio measures the difference in lightness between text and background. A ratio of 4.5:1 or higher (AA compliance) is required for normal text, 3:1 for large text. This ensures readability for users with visual impairments and is increasingly required for legal compliance.",
  },
  {
    question: "Can I use this palette in non-Tailwind projects?",
    answer:
      "Yes — the CSS variables output (--color-brand-50 etc.) works in any CSS project. Define the variables in :root and use them as var(--color-brand-500) anywhere in your CSS or inline styles.",
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

export default function ColorPaletteGeneratorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        A single brand color is not enough for a polished UI — you need a full scale
        of tints and shades. Use our free{" "}
        <Link href="/tools/color-palette-generator">Color Palette Generator</Link>{" "}
        to create a Tailwind 50–950 scale from any hex. Part of our{" "}
        <Link href="/blog/complete-developer-tools-guide">
          Complete Developer Tools Guide
        </Link>
        .
      </p>

      <hr />

      <h2>What Is a Tailwind Color Scale?</h2>
      <p>
        Tailwind uses 11 shades per color: 50, 100, 200, 300, 400, 500, 600, 700, 800,
        900, and 950. Shade 500 is typically the base brand color. Lighter shades
        work for backgrounds; darker shades for text and hover states.
      </p>

      <hr />

      <h2>Why You Need a Palette, Not Just One Color</h2>
      <p>
        Consistent UI requires semantic shades — backgrounds, borders, text, and hover
        states all need different tones of the same hue. A single hex cannot serve all
        these purposes without looking flat or inaccessible.
      </p>

      <hr />

      <h2>HSL Color Space for Palette Generation</h2>
      <p>
        HSL (Hue, Saturation, Lightness) makes tint and shade generation predictable.
        By keeping hue constant and adjusting lightness, you get harmonious scales
        that feel native to Tailwind&apos;s built-in colors.
      </p>

      <hr />

      <h2>WCAG Contrast and Why It Matters</h2>
      <p>
        WCAG AA requires 4.5:1 contrast ratio for normal text. Our generator badges
        each shade with whether white or black text passes. Use lighter shades (50–200)
        for backgrounds and darker shades (700–950) for text on light backgrounds.
      </p>

      <hr />

      <h2>How to Add Custom Colors to tailwind.config.js</h2>
      <pre>
        <code>{`module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#4f8ef7',
          950: '#0a1628',
        }
      }
    }
  }
}`}</code>
      </pre>

      <hr />

      <h2>CSS Custom Properties Approach</h2>
      <p>
        For non-Tailwind projects, copy the CSS variables output and use{" "}
        <code>var(--color-brand-500)</code> anywhere. Related tools:{" "}
        <Link href="/tools/glassmorphism-generator">Glassmorphism Generator</Link>,{" "}
        <Link href="/tools/css-gradient">CSS Gradient Generator</Link>,{" "}
        <Link href="/tools/box-shadow-generator">Box Shadow Generator</Link>. Guide:{" "}
        <Link href="/blog/glassmorphism-css-generator-guide">
          Glassmorphism CSS generator guide
        </Link>
        .
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
    </article>
  );
}
