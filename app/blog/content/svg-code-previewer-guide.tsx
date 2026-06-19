import Link from "next/link";

const faqs = [
  {
    question: "What is SVG and why is it used for web icons?",
    answer:
      "SVG (Scalable Vector Graphics) is a code-based image format that stores shapes mathematically rather than as pixels, allowing it to scale to any size without losing quality — ideal for icons, logos, and UI elements that need to look sharp on all screen resolutions including high-DPI/Retina displays.",
  },
  {
    question: "Can I edit SVG colors and sizes without an image editor?",
    answer:
      "Yes — SVG is just XML/text, so you can directly edit the fill, stroke, width, and height attributes in the code and see the result instantly in a live previewer.",
  },
  {
    question: "Is it safe to paste SVG code from the internet into a previewer?",
    answer:
      "Exercise caution — SVG can contain embedded JavaScript that may run when rendered. A good SVG previewer sanitizes the input by stripping script tags and event handlers before rendering; this tool does that. Still, only paste SVG from trusted sources.",
  },
  {
    question: "How is SVG different from PNG?",
    answer:
      "SVG stores images as mathematical descriptions of shapes (lines, curves, fills) while PNG stores a fixed grid of pixels. SVG scales perfectly at any size, PNG loses quality when scaled up — but PNG handles photographic images better than SVG, which is best suited for icons, logos, and geometric illustrations.",
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

export default function SvgCodePreviewerGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        SVG is code you can edit in a text editor — but seeing the result requires a live preview. Use our free{" "}
        <Link href="/tools/svg-previewer">SVG Code Previewer</Link> to paste SVG markup and render it instantly, with background toggles, prettify, and download.
      </p>
      <hr />
      <h2>What Is SVG?</h2>
      <p>
        SVG (Scalable Vector Graphics) is a code-based image format that stores shapes mathematically rather than as pixels. Unlike raster images like PNG or JPG, SVG scales perfectly to any size — making it ideal for icons, logos, illustrations, and UI elements that need to look sharp on any screen density.
      </p>
      <hr />
      <h2>When to Use a Live SVG Previewer</h2>
      <ul>
        <li><strong>Checking exports</strong> — verify an SVG from Figma or Illustrator before embedding it in code</li>
        <li><strong>Manual editing</strong> — tweak paths, colors, or dimensions and see results instantly</li>
        <li><strong>Debugging</strong> — inspect and fix an SVG that doesn&apos;t display correctly</li>
        <li><strong>Background testing</strong> — see how an icon looks on light, dark, or transparent backgrounds</li>
      </ul>
      <hr />
      <h2>SVG vs PNG/JPG</h2>
      <p>
        SVG is text you can edit in a code editor and style with CSS or JavaScript. PNG and JPG are pixel grids you edit in image software. SVG excels at icons and geometric art; PNG/JPG excel at photographs. When you need a raster version, see our guide on{" "}
        <Link href="/blog/how-to-convert-svg-to-png-online">how to convert SVG to PNG online</Link>.
      </p>
      <hr />
      <h2>Related Reading</h2>
      <ul>
        <li>
          <Link href="/blog/complete-developer-tools-guide">Complete Developer Tools Guide 2026</Link>
        </li>
        <li>
          <Link href="/blog/how-to-convert-svg-to-png-online">How to Convert SVG to PNG Online</Link>
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
      <p><Link href="/tools/svg-previewer">Preview SVG Code Now →</Link></p>
    </article>
  );
}
