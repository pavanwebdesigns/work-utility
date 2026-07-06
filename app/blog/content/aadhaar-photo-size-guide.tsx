import Link from "next/link";

export default function AadhaarPhotoSizeGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Ramesh needed to update his Aadhaar card photo — his current one was from
        2012. He booked an appointment at an Aadhaar enrollment center and prepared
        a printed photo, but staff asked for a specific size: 413×531 pixels, under
        50KB, JPEG format. His phone photo was 3.5MB and 4032×3024 pixels. He
        had no idea where to start.
      </p>

      <p>
        Aadhaar photo updates require an in-person visit to an Aadhaar enrollment
        center. UIDAI captures biometrics (photo, fingerprints, iris) on-site.
        Online updates are available for demographic details (address, name, DOB)
        only — not for photos. The specifications below apply to printed photos
        some centers ask you to bring.
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
            <td>Physical size</td>
            <td>35mm × 45mm (3.5cm × 4.5cm)</td>
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

      <h2>Step by Step: Resize Photo for Aadhaar Enrollment</h2>

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
          if needed
        </li>
        <li>Verify dimensions show 413×531 before downloading</li>
        <li>
          Print the photo and bring it to your Aadhaar enrollment center
          appointment (if required by your center)
        </li>
      </ol>

      <p>
        See also our dedicated{" "}
        <Link href="/aadhaar-photo-size">Aadhaar Photo Size page</Link>.
      </p>

      <hr />

      <h2>Common Specification Errors</h2>

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
        <strong>Photo not accepted at center</strong>
        <br />
        Plain background, face centred, good lighting. Remove glasses if glare is
        visible.
      </p>

      <hr />

      <h2>Visiting an Aadhaar Enrollment Center</h2>

      <p>
        UIDAI does not accept online photo uploads. Visit your nearest Aadhaar
        Seva Kendra or enrollment center with original Aadhaar and address proof.
        Staff capture biometrics on-site. Book an appointment on the UIDAI website
        to avoid long queues in cities like Delhi, Mumbai, and Bangalore.
      </p>

      <hr />

      <h2>Other Documents with Similar Requirements</h2>

      <ul>
        <li>PAN card — different dimensions (see NSDL guidelines)</li>
        <li>Passport — 35×45mm portrait format</li>
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
