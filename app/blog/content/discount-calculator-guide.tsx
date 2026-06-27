import Link from "next/link";

const faqs = [
  {
    question: "How do I calculate the final price after a percentage discount?",
    answer:
      "Multiply the original price by (1 − discount/100). For example, a ₹2,500 item at 35% off: ₹2,500 × (1 − 0.35) = ₹2,500 × 0.65 = ₹1,625.",
  },
  {
    question: 'Does "30% off + extra 10% off" equal 40% off?',
    answer:
      "No — stacked discounts are applied sequentially, not added together. 30% off ₹1,000 = ₹700, then 10% off ₹700 = ₹630. The total effective discount is 37%, not 40%.",
  },
  {
    question: "How do I find the original price if I only know the sale price and discount?",
    answer:
      "Divide the sale price by (1 − discount/100). If a shirt costs ₹840 after a 30% discount, the original price was ₹840 ÷ 0.70 = ₹1,200.",
  },
  {
    question: "Is GST applied before or after discount in India?",
    answer:
      "In most cases in India, GST is applied on the discounted price (post-discount). So if a ₹1,000 item has 18% GST and a 20% discount, GST is charged on ₹800 (the discounted price), not ₹1,000. However, this can vary — always check your invoice.",
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

export default function DiscountCalculatorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Whether you are shopping during Flipkart Big Billion Days, Amazon Great
        Indian Festival, or checking a sale tag at a local store, knowing the real
        final price and savings takes a few seconds with the right formula. Our
        free{" "}
        <Link href="/tools/discount-calculator">Discount Calculator</Link> handles
        percentage-off, reverse price lookup, and savings totals instantly in
        your browser — no signup required.
      </p>

      <hr />

      <h2>Basic Discount Formula</h2>

      <p>
        <strong>Sale Price = Original Price × (1 − Discount% ÷ 100)</strong>
      </p>
      <p>
        <strong>Savings = Original Price − Sale Price</strong>
      </p>

      <p>
        Example: ₹2,000 with 25% off → ₹2,000 × 0.75 = <strong>₹1,500</strong>{" "}
        final price, saving ₹500.
      </p>

      <hr />

      <h2>Reverse Calculation — Find the Discount %</h2>

      <p>
        When a store shows both original and sale price, verify the claimed
        discount:
      </p>

      <p>
        <strong>
          Discount% = (Original Price − Sale Price) ÷ Original Price × 100
        </strong>
      </p>

      <p>
        If MRP is ₹1,200 and you pay ₹900, the discount is (300 ÷ 1200) × 100 ={" "}
        <strong>25%</strong>. The{" "}
        <Link href="/tools/discount-calculator">Discount Calculator</Link> has a
        dedicated mode for this.
      </p>

      <hr />

      <h2>Stacked Discounts — Why 30% + 10% ≠ 40%</h2>

      <p>
        Cascading discounts apply one after another on the reduced price, not on
        the original MRP. Example: ₹1,000 item with &quot;30% off + additional
        10% off&quot;:
      </p>

      <ul>
        <li>After 30% off: ₹1,000 × 0.70 = ₹700</li>
        <li>After extra 10% off: ₹700 × 0.90 = ₹630</li>
      </ul>

      <p>
        Effective discount = 37%, not 40% (which would be ₹600). Always calculate
        sequentially during festival sales.
      </p>

      <hr />

      <h2>GST and Discounts in India</h2>

      <p>
        In most retail and e-commerce transactions, GST is levied on the{" "}
        <strong>discounted price</strong>, not the printed MRP. A ₹1,000 product
        with 20% off sells at ₹800; 18% GST applies on ₹800. Rules can vary by
        product category and seller — check the invoice breakdown. For quick GST
        math on bills, use our{" "}
        <Link href="/tools/gst-calculator">GST Calculator</Link> or read{" "}
        <Link href="/blog/gst-for-freelancers-india">
          GST for freelancers in India
        </Link>
        .
      </p>

      <hr />

      <h2>Practical Use Cases</h2>

      <ul>
        <li>Verify Amazon/Flipkart &quot;X% off&quot; during mega sales</li>
        <li>Negotiate bulk discounts for business purchases</li>
        <li>Find original MRP from a final sale price</li>
        <li>Compare effective savings across stacked offers</li>
      </ul>

      <p>
        For mark-based calculations (exam scores, hikes), pair this with our{" "}
        <Link href="/blog/how-to-calculate-percentage-of-marks-india">
          percentage of marks guide
        </Link>{" "}
        and the{" "}
        <Link href="/tools/percentage-calculator">Percentage Calculator</Link>.
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

      <h2>Related Reading</h2>
      <ul>
        <li>
          <Link href="/blog/gst-for-freelancers-india">
            GST for Freelancers in India — When to Register
          </Link>
        </li>
        <li>
          <Link href="/blog/how-to-calculate-percentage-of-marks-india">
            How to Calculate Percentage of Marks — Indian Students
          </Link>
        </li>
        <li>
          <Link href="/blog/tip-calculator-guide">
            Tip Calculator — Split Bills and Calculate Tips
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/discount-calculator">
          Open Discount Calculator Free →
        </Link>
      </p>
    </article>
  );
}
