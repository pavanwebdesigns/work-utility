import Link from "next/link";

const faqs = [
  {
    question: "Is BMI an accurate measure of health?",
    answer:
      "BMI is a useful quick screening tool at a population level, but it has real limitations for individuals — it doesn't account for muscle mass, fat distribution, age, or sex. It's a starting reference point, not a complete health assessment.",
  },
  {
    question: "Why does BMI use height squared instead of just height?",
    answer:
      "Weight tends to scale roughly with the square of height across a population, so dividing by height squared (rather than height alone) produces a more consistent comparison across people of different heights.",
  },
  {
    question: "Do BMI categories differ by country?",
    answer:
      "The WHO categories are the most widely used global standard, but some health organizations in certain regions use adjusted cutoffs for overweight/obese categories based on population-specific health-risk research.",
  },
  {
    question: "Can two people have the same BMI but different health status?",
    answer:
      "Yes — BMI doesn't distinguish between muscle and fat mass, so a muscular, athletic person and a person with higher body fat can show the identical BMI number despite very different body compositions.",
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

export default function BmiCalculatorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Body Mass Index is one of the most widely cited health numbers — but
        what it actually measures, and what it doesn&apos;t, is often
        misunderstood. Use our free{" "}
        <Link href="/tools/bmi-calculator">BMI Calculator</Link> to check your
        number in metric or imperial units, then read on to understand what it
        means.
      </p>

      <hr />

      <h2>What BMI Measures</h2>
      <p>
        Body Mass Index is a simple ratio of weight to height used as a quick,
        population-level screening tool — not a diagnostic measurement of body
        fat or overall health. It gives a single number that places you in a
        weight category relative to your height, which is useful as a starting
        reference but tells only part of the story for any individual.
      </p>

      <hr />

      <h2>The Formula — Metric and Imperial</h2>
      <p>
        <strong>Metric:</strong> weight (kg) ÷ height (m)²
      </p>
      <p>
        <strong>Imperial:</strong> weight (lb) × 703 ÷ height (in)²
      </p>
      <p>
        Our{" "}
        <Link href="/tools/bmi-calculator">BMI Calculator</Link> supports both
        unit systems — enter whichever you use and get an instant result with
        category and healthy weight range.
      </p>

      <hr />

      <h2>WHO BMI Categories</h2>
      <ul>
        <li><strong>Underweight:</strong> below 18.5</li>
        <li><strong>Normal weight:</strong> 18.5–24.9</li>
        <li><strong>Overweight:</strong> 25–29.9</li>
        <li><strong>Obese:</strong> 30 and above</li>
      </ul>
      <p>
        These World Health Organization cutoffs are the most widely used global
        standard. Some regions — for example, parts of Asia — apply slightly
        adjusted thresholds for overweight and obese categories based on
        population-specific health-risk research. The categories are a screening
        framework, not a personal diagnosis.
      </p>

      <hr />

      <h2>Important Limitations</h2>
      <p>
        BMI doesn&apos;t distinguish muscle mass from fat mass — a muscular
        athlete can register as &quot;overweight&quot; despite low body fat. It
        doesn&apos;t account for where fat is distributed in the body, which
        affects health risk independently of total BMI. The same BMI can mean
        different things at different ages or between sexes.
      </p>
      <p>
        BMI is a useful quick screening number for population studies and a
        starting conversation point, not a personal diagnosis. For an
        individual assessment of health or body composition, other measurements
        — waist circumference, body fat percentage, or a doctor&apos;s assessment
        — give a fuller picture.
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

      <p>
        <Link href="/tools/bmi-calculator">Calculate Your BMI Now →</Link>
      </p>
    </article>
  );
}
