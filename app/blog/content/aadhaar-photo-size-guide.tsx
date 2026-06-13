import Link from "next/link";

export default function AadhaarPhotoSizeGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Ramesh needed to update his Aadhaar card photo — his current one was from
        2012. He went to the UIDAI portal, filled everything, and reached the
        photo upload step. Error: &quot;Image size must be less than 50KB and
        dimensions 413×531.&quot; His phone photo was 3.5MB and 4032×3024
        pixels. He had no idea where to start.
      </p>

      <p>
        Aadhaar photo requirements are specific — not the same as passport or PAN.
        Get the pixels and KB wrong and the portal rejects instantly. Here&apos;s
        exactly what UIDAI expects.
      </p>

      <hr />

      <h2>Official Aadhaar Photo Requirements (UIDAI)</h2>

      <table>
        <thead>
          <tr>
            <th>Requirement</th>
            <th>Specification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dimensions</td>
            <td>413 × 531 pixels</td>
          </tr>
          <tr>
            <td>File size</td>
            <td>Max 50KB</td>
          </tr>
          <tr>
            <td>Format</td>
            <td>JPG only</td>
          </tr>
          <tr>
            <td>Background</td>
            <td>White or light coloured</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2>Step by Step: Resize Photo for Aadhaar</h2>

      <ol>
        <li>
          Open{" "}
          <Link href="/tools/photo-resizer?preset=aadhaar">
            Photo Resizer — Aadhaar preset
          </Link>
        </li>
        <li>Upload photo and crop face to centre</li>
        <li>
          Compress with{" "}
          <Link href="/tools/image-compress">Image Compress</Link> to under 50KB
        </li>
        <li>Verify dimensions show 413×531 before downloading</li>
        <li>Upload to myaadhaar.uidai.gov.in</li>
      </ol>

      <p>
        See also our dedicated{" "}
        <Link href="/aadhaar-photo-size">Aadhaar Photo Size page</Link>.
      </p>

      <hr />

      <h2>Common Errors and Solutions</h2>

      <p>
        <strong>&quot;File size exceeds 50KB&quot;</strong>
        <br />
        Resize dimensions first, then compress. PNG files are too large — convert
        to JPG.
      </p>

      <p>
        <strong>&quot;Invalid dimensions&quot;</strong>
        <br />
        Must be exactly 413×531 pixels. Use preset — don&apos;t guess manually.
      </p>

      <p>
        <strong>&quot;Face not detected&quot;</strong>
        <br />
        Plain background, face centred, good lighting. Remove glasses if glare
        visible.
      </p>

      <hr />

      <h2>If Online Update Fails — Aadhaar Seva Kendra</h2>

      <p>
        Visit nearest Aadhaar Seva Kendra with original Aadhaar and address proof.
        They capture photo on the spot with correct specs. Book appointment on
        UIDAI website to avoid long queues in cities like Delhi, Mumbai, and
        Bangalore.
      </p>

      <hr />

      <h2>Other Documents with Similar Requirements</h2>

      <ul>
        <li>PAN card — different dimensions (see NSDL guidelines)</li>
        <li>Passport — 51×51mm square format</li>
        <li>Driving licence — state-specific, usually 35×45mm</li>
        <li>SSC/UPSC exams — separate photo and signature limits</li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/photo-resizer?preset=aadhaar">
          Resize Photo for Aadhaar →
        </Link>
      </p>
    </article>
  );
}
