import Link from "next/link";

export default function ResizePhotoForGovernmentFormsIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        Amit spent two hours filling out his passport application online.
        Address, references, emergency contacts — everything done carefully.
        Then he hit the photo upload step. His phone photo was 4MB. The portal
        accepted maximum 1MB. He resized it on his phone — now it was too small
        in pixels. He resized again — now it was the right KB but wrong
        dimensions. The portal kept rejecting it.
      </p>

      <p>
        He gave up that night and restarted the next morning with the right
        information. This guide is what he wished he had found first.
      </p>

      <hr />

      <h2>Photo Requirements for Common Indian Government Documents</h2>

      <h3>Aadhaar Card (enrollment center visit)</h3>
      <p>
        UIDAI does not accept online photo uploads. Photo updates require an
        in-person visit. These specs apply to printed photos some centers ask you
        to bring:
      </p>
      <ul>
        <li>Dimensions: 413 x 531 pixels</li>
        <li>File size: maximum 50KB</li>
        <li>Format: JPG</li>
        <li>Background: white or light colored</li>
      </ul>

      <h3>PAN Card Application (NSDL/UTI)</h3>
      <ul>
        <li>Dimensions: 413 x 531 pixels</li>
        <li>File size: maximum 300KB</li>
        <li>Format: JPG</li>
        <li>Background: white</li>
      </ul>

      <h3>Passport Application</h3>
      <ul>
        <li>Dimensions: 350 x 350 pixels minimum, 1000 x 1000 maximum</li>
        <li>File size: maximum 1MB</li>
        <li>Format: JPG</li>
        <li>Background: plain white</li>
        <li>Face should cover 70-80% of frame</li>
      </ul>

      <h3>Driving Licence (Sarathi Portal)</h3>
      <ul>
        <li>Dimensions: 413 x 531 pixels</li>
        <li>File size: maximum 200KB</li>
        <li>Format: JPG</li>
        <li>Background: white or light</li>
      </ul>

      <h3>Government Exams (UPSC, SSC, State PSC)</h3>
      <ul>
        <li>Dimensions: 350 x 350 pixels (varies by exam)</li>
        <li>File size: 20KB to 50KB (check specific notification)</li>
        <li>Format: JPG</li>
        <li>Background: white or light colored</li>
      </ul>

      <hr />

      <h2>How to Resize Your Photo — Step by Step</h2>

      <ol>
        <li>
          Open{" "}
          <Link href="/tools/photo-resizer">WorkUtilities Photo Resizer</Link>
        </li>
        <li>Upload your photo</li>
        <li>
          Select the document type from presets (Aadhaar, PAN, Passport etc.)
        </li>
        <li>Dimensions and KB limit auto-fill</li>
        <li>Download your resized photo</li>
      </ol>

      <p>
        The preset system means you don&apos;t need to remember any numbers. Just
        select your document type and download.
      </p>

      <hr />

      <h2>Common Mistakes to Avoid</h2>

      <ul>
        <li>
          <strong>Using mobile screenshots</strong> — compression artifacts make
          portal rejection more likely
        </li>
        <li>
          <strong>Black and white photos</strong> — most portals require color
          photos
        </li>
        <li>
          <strong>Sunglasses or cap</strong> — not accepted for any official ID
          document
        </li>
        <li>
          <strong>Old photos</strong> — passport applications require recent
          photos (within 6 months)
        </li>
        <li>
          <strong>Wrong background</strong> — colored backgrounds rejected for
          most government IDs
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/photo-resizer">Resize Your Photo Now →</Link>
      </p>
    </article>
  );
}
