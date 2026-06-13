import Link from "next/link";

export default function UnitConversionGuideIndianStudentsContent() {
  return (
    <article className="prose-custom">
      <p>
        Nikhil got admission to a university in Canada. His acceptance letter
        said the campus was &quot;2.3 miles from downtown.&quot; His flight
        luggage limit was &quot;23 kg.&quot; The weather forecast said
        &quot;4°F.&quot; He had studied in CBSE his whole life. Everything was in
        km, kilograms, and Celsius. He needed a crash course in 20 minutes.
      </p>

      <p>
        Indian students encounter unfamiliar units when studying abroad, reading
        international research papers, or even browsing Amazon US. Here&apos;s a
        practical guide to the conversions you&apos;ll actually need.
      </p>

      <hr />

      <h2>Most Common Unit Conversions</h2>

      <h3>Kilometres ↔ Miles</h3>
      <p>
        <strong>1 mile = 1.609 km.</strong> Quick mental math: multiply km by
        0.6 to get approximate miles. Campus 2.3 miles away? That&apos;s about
        3.7 km — walking distance or a short bus ride.
      </p>

      <h3>Kilograms ↔ Pounds (lbs)</h3>
      <p>
        <strong>1 kg = 2.205 lbs.</strong> Airline luggage limit of 23 kg = about
        50 lbs. Weigh your suitcase at home before leaving — overweight charges
        at Indian airports can exceed ₹3,000 per kg.
      </p>

      <h3>Celsius ↔ Fahrenheit</h3>
      <p>
        <strong>°F = (°C × 9/5) + 32.</strong> 4°F is approximately -15°C — that&apos;s
        deep winter in Canada. 25°C (pleasant Indian winter morning) = 77°F.
        Use the{" "}
        <Link href="/tools/unit-converter">Unit Converter</Link> for exact values.
      </p>

      <h3>Square Feet ↔ Square Metres</h3>
      <p>
        <strong>1 sq ft = 0.093 sq m.</strong> A 600 sq ft apartment in Bangalore
        is about 56 sq m. Useful when comparing rental listings abroad.
      </p>

      <h3>Litres ↔ Gallons</h3>
      <p>
        <strong>1 US gallon = 3.785 litres.</strong> Fuel prices in the US are per
        gallon — divide by 3.785 to compare with Indian per-litre rates. Also
        useful for US recipe measurements.
      </p>

      <hr />

      <h2>Unit Conversion for Engineering Students</h2>

      <p>
        Beyond everyday conversions, engineering coursework uses SI units but
        international textbooks and software often default to imperial.
      </p>

      <ul>
        <li>
          <strong>Force:</strong> 1 Newton = 0.225 pounds-force
        </li>
        <li>
          <strong>Pressure:</strong> 1 Pascal = 0.000145 PSI
        </li>
        <li>
          <strong>Energy:</strong> 1 Joule = 0.239 calories
        </li>
        <li>
          <strong>Data:</strong> 1 GB = 1024 MB, 1 TB = 1024 GB — watch for
          decimal vs binary differences in storage specs
        </li>
      </ul>

      <hr />

      <h2>Cooking Conversions</h2>

      <p>
        Moving into a PG with shared kitchen? YouTube recipes use cups and
        tablespoons while you think in ml and grams.
      </p>

      <ul>
        <li>1 cup = 240 ml</li>
        <li>1 tablespoon = 15 ml</li>
        <li>1 teaspoon = 5 ml</li>
      </ul>

      <p>
        Indian recipes often say &quot;2 cups atta&quot; — that&apos;s 480 ml by
        volume, not weight. For baking, weight measurements (grams) are more
        accurate.
      </p>

      <hr />

      <h2>Quick Mental Math Tricks</h2>

      <ul>
        <li>
          <strong>C to F:</strong> Double it and add 30 (approximate). 20°C ≈ 70°F
          (actual: 68°F)
        </li>
        <li>
          <strong>kg to lbs:</strong> Double it and add 10%. 70 kg ≈ 154 lbs
          (actual: 154.3 lbs)
        </li>
        <li>
          <strong>km to miles:</strong> Multiply by 0.6. 10 km ≈ 6 miles (actual:
          6.2 miles)
        </li>
      </ul>

      <p>
        For exam percentage calculations back home, the{" "}
        <Link href="/tools/percentage-calculator">Percentage Calculator</Link>{" "}
        and{" "}
        <Link href="/tools/cgpa-to-percentage">CGPA to Percentage</Link> tools
        handle academic conversions just as easily.
      </p>

      <hr />

      <p>
        <Link href="/tools/unit-converter">Convert Any Unit Free →</Link>
      </p>
    </article>
  );
}
