import Link from "next/link";

export default function AadhaarCardPhotoSizeContent() {
  return (
    <article className="prose-custom">
      <div className="not-prose mb-8 rounded-xl border border-tool-photo/30 bg-tool-photo/5 p-5">
        <p className="text-sm text-content-secondary">
          <strong className="text-content-primary">Quick reference?</strong> See
          our{" "}
          <Link
            href="/aadhaar-photo-size"
            className="font-medium text-tool-photo hover:underline"
          >
            Aadhaar Photo Size guide with instant resize tool →
          </Link>
        </p>
      </div>

      <p>
        You need to update the photo on your Aadhaar card. UIDAI does not allow
        online photo uploads — biometric updates require an in-person visit to an
        Aadhaar enrollment center. Many applicants arrive with a printed photo
        that does not meet specifications and face delays. Others are surprised to
        learn that myAadhaar online updates cover demographic details (address,
        name, DOB) only, not photos.
      </p>

      <p>
        This guide explains what UIDAI checks, how to prepare a compliant printed
        photo for enrollment centers that request one, and common mistakes to
        avoid. For exact pixel dimensions and a one-click resize tool, see our{" "}
        <Link href="/aadhaar-photo-size">Aadhaar Photo Size page</Link>.
      </p>

      <hr />

      <h2>Official UIDAI Photo Requirements (2026)</h2>

      <p>
        These specifications apply to printed photos some enrollment centers ask
        you to bring. UIDAI captures biometrics on-site during your visit:
      </p>

      <table>
        <thead>
          <tr>
            <th>Requirement</th>
            <th>Specification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Physical size</strong>
            </td>
            <td>35mm × 45mm (3.5cm × 4.5cm) — portrait orientation</td>
          </tr>
          <tr>
            <td>
              <strong>Pixel size (recommended)</strong>
            </td>
            <td>413 × 531 pixels at 300 DPI</td>
          </tr>
          <tr>
            <td>
              <strong>File format</strong>
            </td>
            <td>JPEG only</td>
          </tr>
          <tr>
            <td>
              <strong>Maximum file size</strong>
            </td>
            <td>50 KB (strict — byte-level validation)</td>
          </tr>
          <tr>
            <td>
              <strong>Background</strong>
            </td>
            <td>Plain white or very light grey</td>
          </tr>
          <tr>
            <td>
              <strong>Face coverage</strong>
            </td>
            <td>80–85% of the frame, neutral expression</td>
          </tr>
        </tbody>
      </table>

      <p>
        Always verify current requirements at{" "}
        <a
          href="https://uidai.gov.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          uidai.gov.in
        </a>{" "}
        before your visit.
      </p>

      <hr />

      <h2>Why Photos Get Rejected — The Real Reasons</h2>

      <p>
        Most issues fall into two categories: <strong>technical specification
        failures</strong> with printed photos brought to enrollment centers, and{" "}
        <strong>quality issues</strong> flagged during on-site biometric capture.
      </p>

      <h3>Technical rejections (most common)</h3>

      <ol>
        <li>
          <strong>File size over 50KB</strong> — The single most common reason
          when centers require a digital file for printing. Even 51KB fails.
        </li>
        <li>
          <strong>Wrong orientation</strong> — Aadhaar requires portrait
          (3.5×4.5 cm). A landscape image does not meet specs.
        </li>
        <li>
          <strong>Wrong dimensions</strong> — Photos must be 413×531 pixels at
          300 DPI. Studio prints at wrong DPI produce incorrect pixel counts.
        </li>
        <li>
          <strong>Wrong format</strong> — PNG, HEIC, or WebP files must be
          converted to JPEG.
        </li>
      </ol>

      <h3>Quality and compliance issues</h3>

      <ol>
        <li>
          <strong>Coloured or patterned background</strong> — Blue studio
          backgrounds, walls with patterns, or shadows behind the head.
        </li>
        <li>
          <strong>Glasses glare or tinted lenses</strong> — UIDAI recommends
          photos without glasses to avoid biometric matching issues.
        </li>
        <li>
          <strong>Non-neutral expression</strong> — Smiling, mouth open, or
          head tilted.
        </li>
        <li>
          <strong>Hair covering forehead or eyes</strong> — Face must be fully
          visible for biometric verification.
        </li>
        <li>
          <strong>Photo older than 6 months</strong> — Must reflect current
          appearance.
        </li>
        <li>
          <strong>Filters or beauty effects</strong> — Skin smoothing, heavy
          makeup, or Instagram filters alter facial features and fail biometric
          checks.
        </li>
      </ol>

      <hr />

      <h2>Hidden Issues You Might Miss</h2>

      <p>
        These catch applicants who think their photo looks fine:
      </p>

      <ul>
        <li>
          <strong>1KB over the limit</strong> — A 51KB file fails the same as a
          500KB file. Always compress to under 50KB, not &quot;around&quot; 50KB.
        </li>
        <li>
          <strong>Slight background tint</strong> — Off-white walls photographed
          in warm light can appear yellowish. UIDAI expects near-pure white.
        </li>
        <li>
          <strong>Screenshot instead of original</strong> — Taking a screenshot
          of your photo reduces quality and may change file format.
        </li>
        <li>
          <strong>Over-compression artifacts</strong> — Compressing too
          aggressively creates blocky JPEG artifacts that fail quality checks.
        </li>
        <li>
          <strong>Wrong document dimensions</strong> — Using a PAN card or
          passport photo without resizing to Aadhaar specs.
        </li>
      </ul>

      <hr />

      <h2>Why UIDAI Enforces a 50KB Limit</h2>

      <p>
        UIDAI manages over 1.3 billion Aadhaar records. At 50KB per photo, the
        entire photo database stays around 65TB — large but manageable. At 1MB
        per photo, storage would exceed 1,300TB.
      </p>

      <p>
        The limit is not arbitrary. It balances sufficient image quality for
        biometric face-matching with practical infrastructure costs. A
        well-compressed 413×531 JPEG at 50KB retains enough detail for
        verification systems.
      </p>

      <hr />

      <h2>Aadhaar vs PAN Card: The Orientation Trap</h2>

      <p>
        One of the most common mistakes is confusing Aadhaar and PAN Card photo
        dimensions:
      </p>

      <ul>
        <li>
          <strong>Aadhaar:</strong> 3.5 cm width × 4.5 cm height (portrait —
          taller than wide)
        </li>
        <li>
          <strong>PAN Card:</strong> 4.5 cm width × 3.5 cm height (landscape —
          wider than tall)
        </li>
      </ul>

      <p>
        The dimensions are literally reversed. Applicants who reuse a PAN photo
        for Aadhaar (or vice versa) without checking orientation may need to
        reprint. Always verify width and height before your enrollment visit.
      </p>

      <p>
        See our{" "}
        <Link href="/aadhaar-photo-size">Aadhaar Photo Size guide</Link> for a
        full pixel dimension table and instant resize tool.
      </p>

      <hr />

      <h2>How to Prepare a Compliant Photo</h2>

      <p>
        <strong>Step 1:</strong> Take a front-facing photo against a plain white
        wall in natural light. Neutral expression, mouth closed, eyes open.
      </p>

      <p>
        <strong>Step 2:</strong> Use the{" "}
        <Link href="/tools/photo-resizer?preset=aadhaar">
          WorkUtilities Photo Resizer
        </Link>{" "}
        with the Aadhaar preset — it sets 413×531 pixels and compresses to
        under 50KB automatically.
      </p>

      <p>
        <strong>Step 3:</strong> Print the photo and bring it to your Aadhaar
        enrollment center appointment. UIDAI captures biometrics on-site during
        your visit.
      </p>

      <p>
        The resizer runs entirely in your browser. Your photo is never uploaded to
        any server.
      </p>

      <hr />

      <h2>Frequently Asked Questions</h2>

      <p>
        <strong>Q: Can I update my Aadhaar photo online?</strong>
        <br />
        No. UIDAI does not accept online photo uploads. Biometric updates
        require an in-person visit to an Aadhaar enrollment center. Online updates
        cover demographic details only.
      </p>

      <p>
        <strong>Q: Why might my photo be rejected when it looked correct?</strong>
        <br />
        Most likely file size (even 1KB over 50KB), wrong orientation, or a
        slight background colour tint. Prepare your photo with our resizer before
        printing.
      </p>

      <p>
        <strong>Q: Can I fix a rejected photo without retaking it?</strong>
        <br />
        If the issue is size or dimensions, yes — resize with our tool. If the
        issue is background colour, expression, or hair covering your face, you
        need a new photo.
      </p>

      <p>
        <strong>Q: Does UIDAI accept photos from mobile phones?</strong>
        <br />
        Yes, as a starting point — as long as you resize to 413×531 pixels,
        compress to under 50KB, and use a plain background before printing.
      </p>

      <p>
        <strong>Q: How strict is the 50KB limit?</strong>
        <br />
        Extremely strict. 50,001 bytes fails. Always target 45–49KB to leave a
        safety margin.
      </p>

      <p>
        <strong>Q: Where can I find exact pixel dimensions?</strong>
        <br />
        Our{" "}
        <Link href="/aadhaar-photo-size">Aadhaar Photo Size page</Link> has a
        full DPI table (200, 300, 600) and a free resize tool.
      </p>

      <hr />

      <h2>Conclusion</h2>

      <p>
        Aadhaar photo specification issues are almost always preventable. The top
        causes — file size over 50KB, wrong orientation, and coloured
        backgrounds — are technical checks you can fix before your enrollment
        visit.
      </p>

      <p>
        For exact dimensions and one-click resizing, use our{" "}
        <Link href="/aadhaar-photo-size">Aadhaar Photo Size guide</Link> or the{" "}
        <Link href="/tools/photo-resizer?preset=aadhaar">
          Photo Resizer tool
        </Link>{" "}
        — free, instant, and private in your browser.
      </p>
    </article>
  );
}
