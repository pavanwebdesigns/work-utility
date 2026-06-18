import Link from "next/link";

const faqs = [
  {
    question: "What's the difference between BMR and TDEE?",
    answer:
      "BMR is the calories your body needs at complete rest just to function. TDEE adds your activity level on top of BMR, representing your actual daily maintenance calories.",
  },
  {
    question: "How big of a calorie deficit is safe?",
    answer:
      "A commonly cited general guideline is a moderate deficit of around 500 calories/day below maintenance, which tends to be more sustainable than very aggressive deficits. Significant or rapid deficits should be discussed with a doctor or registered dietitian, especially for extended periods.",
  },
  {
    question: "Is the Mifflin-St Jeor formula 100% accurate for everyone?",
    answer:
      "No formula perfectly predicts individual metabolism — Mifflin-St Jeor is widely regarded as one of the more reliable general estimation formulas, but actual results vary by individual factors like body composition and health conditions.",
  },
  {
    question: "Should I consult a doctor before starting a calorie deficit?",
    answer:
      "Yes, especially if you have any underlying health conditions, a history of disordered eating, are pregnant or breastfeeding, or are considering a significant or long-term deficit — a doctor or registered dietitian can give guidance specific to your situation.",
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

export default function CalorieDeficitCalculatorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Understanding your maintenance calories and a reasonable daily target is a useful starting point for anyone curious about how energy balance works — not a prescription for what to eat. Use our free{" "}
        <Link href="/tools/calorie-deficit-calculator">Calorie Deficit Calculator</Link> to estimate BMR and TDEE using the Mifflin-St Jeor formula.
      </p>

      <hr />

      <h2>BMR — Basal Metabolic Rate</h2>
      <p>
        Basal Metabolic Rate (BMR) is the number of calories your body needs at complete rest just to keep essential functions running — breathing, circulation, cell repair. It&apos;s the baseline before any walking, exercise, or daily activity is accounted for.
      </p>

      <hr />

      <h2>TDEE — Total Daily Energy Expenditure</h2>
      <p>
        Total Daily Energy Expenditure (TDEE) is BMR adjusted for your activity level. It represents your estimated maintenance calories — the amount you&apos;d need to consume daily to maintain your current weight, given how active you are. TDEE is what most people mean when they talk about &quot;maintenance calories.&quot;
      </p>

      <hr />

      <h2>The Mifflin-St Jeor Formula</h2>
      <p>
        The Mifflin-St Jeor equation is generally considered one of the more accurate BMR estimation formulas for most adults, though any formula produces an estimate — not an exact measurement. Individual metabolism varies based on body composition, genetics, health conditions, and other factors no single equation can capture fully.
      </p>

      <hr />

      <h2>What a Calorie Deficit Means</h2>
      <p>
        A calorie deficit means consistently eating below your TDEE so the body draws on stored energy (primarily fat) over time. Moderate, sustainable deficits — commonly cited general guidance is around 500 calories per day below maintenance, roughly translating to about 0.5 kg or 1 lb of fat loss per week — tend to be easier to sustain and more likely to preserve muscle mass and energy levels compared to very large or aggressive deficits.
      </p>

      <hr />

      <h2>Important Note — Not Medical Advice</h2>
      <p>
        This tool provides a general estimate for informational purposes only, not medical or nutritional advice. Anyone with health conditions, a history of disordered eating, who is pregnant or breastfeeding, or who is pursuing a significant deficit should consult a doctor or registered dietitian before making major dietary changes.
      </p>

      <hr />

      <h2>Related Health Tools</h2>
      <p>
        For another common body-metric reference point, see our{" "}
        <Link href="/blog/bmi-calculator-guide">BMI calculator guide</Link> and use the{" "}
        <Link href="/tools/bmi-calculator">BMI Calculator</Link>.
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
      <p><Link href="/tools/calorie-deficit-calculator">Calculate Your Daily Target →</Link></p>
    </article>
  );
}
