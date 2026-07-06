import Link from "next/link";

export default function HowToMakePassportSizePhotoAtHomeContent() {
  return (
    <article className="prose-custom">
      <p>
        Divya needed a passport size photo for her college admission form. The
        deadline was in 3 hours. The nearest photo studio was 4 km away. Her
        mother said &quot;Just click a selfie, it won&apos;t work.&quot; Divya
        proved her wrong in 8 minutes using only her phone.
      </p>

      <p>
        Passport size photos aren&apos;t magic — they&apos;re just correctly sized,
        well-lit headshots. You can make one at home that passes college forms,
        visa applications, and most government portals. No studio required.
      </p>

      <hr />

      <h2>What You Need</h2>

      <p>
        Just a smartphone and decent lighting. That&apos;s literally it. No
        printer needed for digital submissions — only if you need physical prints
        for offline forms.
      </p>

      <hr />

      <h2>Step 1: Click the Right Photo</h2>

      <ul>
        <li>
          <strong>Plain white or light wall</strong> as background — no patterns,
          no furniture visible
        </li>
        <li>
          <strong>Natural light from a window</strong> — face the window, don&apos;t
          stand with light behind you
        </li>
        <li>
          <strong>Neutral expression</strong>, eyes open, mouth closed
        </li>
        <li>
          <strong>No sunglasses, no cap, no headphones</strong>
        </li>
        <li>
          <strong>Frame from chest up</strong> — you&apos;ll crop to passport size
          later
        </li>
      </ul>

      <p>
        Ask someone to click, or use your front camera with a 3-second timer.
        Take 5–6 shots and pick the sharpest one.
      </p>

      <hr />

      <h2>Step 2: Crop to Passport Size</h2>

      <p>
        Open the{" "}
        <Link href="/tools/photo-resizer?preset=passport">
          Photo Resizer — Passport preset
        </Link>
        . Upload your photo, select the Passport preset (35mm × 45mm, typically
        413×531 pixels), and crop so your face covers 70–80% of the frame.
      </p>

      <p>
        Indian passport photos need a white background. If your wall wasn&apos;t
        perfectly white, most portals accept light off-white. For strict
        requirements, use a plain white bedsheet as backdrop.
      </p>

      <hr />

      <h2>Step 3: Check Requirements</h2>

      <ul>
        <li>
          <strong>File size:</strong> Under 1MB for most portals — use{" "}
          <Link href="/tools/image-compress">Image Compress</Link> if needed
        </li>
        <li>
          <strong>Format:</strong> JPG/JPEG (not PNG for most government forms)
        </li>
        <li>
          <strong>Face coverage:</strong> 70–80% of the frame
        </li>
        <li>
          <strong>Dimensions:</strong> 35mm × 45mm (2 inch × 2 inch in some
          contexts)
        </li>
      </ul>

      <p>
        For detailed specs across different documents, read our{" "}
        <Link href="/passport-photo-size-india">Passport Photo Size Guide</Link>.
      </p>

      <hr />

      <h2>Printing at Home vs Photo Shop</h2>

      <p>
        <strong>Digital submission:</strong> Download the resized JPEG and upload
        directly. No printing needed.
      </p>

      <p>
        <strong>Physical copies:</strong> Print on photo paper at any shop — carry
        the digital file on your phone. Cost: ₹40–80 for 4–8 copies at any local
        studio. Still cheaper than a full photo session if you already have the
        digital file ready.
      </p>

      <hr />

      <h2>Which Documents Accept Home-Clicked Photos</h2>

      <ul>
        <li>College admission forms — usually yes</li>
        <li>Internship and job applications — yes for most companies</li>
        <li>PAN card application — yes, with correct dimensions</li>
        <li>Aadhaar enrollment — prepare a printed photo to specs; biometric capture is on-site (no online photo upload)</li>
        <li>Passport application — yes, but follow Ministry of External Affairs specs strictly</li>
        <li>Visa applications — varies by country; some require studio stamp</li>
      </ul>

      <p>
        Divya uploaded her home-clicked photo to her college portal and got
        admitted. Her mother now clicks passport photos for the whole family.
      </p>

      <hr />

      <p>
        <Link href="/tools/photo-resizer?preset=passport">
          Make Passport Photo Free →
        </Link>
      </p>
    </article>
  );
}
