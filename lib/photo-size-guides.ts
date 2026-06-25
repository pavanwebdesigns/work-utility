export interface PhotoSizeGuideFaq {
  question: string;
  answer: string;
}

export interface PixelDimensionRow {
  dpi: number;
  pixels: string;
  bestFor: string;
  recommended?: boolean;
}

export interface OrientationWarning {
  title: string;
  items: { label: string; dimensions: string; note: string }[];
  footer: string;
}

export interface PhotoSizeGuide {
  id: string;
  h1: string;
  dimensions: string;
  physicalSize: string;
  maxKb: string;
  format: string;
  background: string;
  uploadErrors: string[];
  resizeSteps: string[];
  ctaPreset: string;
  ctaLabel: string;
  faqs: PhotoSizeGuideFaq[];
  relatedGuideIds: string[];
  lastVerified?: string;
  quickSpecs?: string[];
  faceCoverage?: string;
  pixelDimensions?: PixelDimensionRow[];
  pixelDimensionsNote?: string;
  orientationWarning?: OrientationWarning;
  whyKbLimit?: string;
  rejectionReasons?: string[];
  ctaBullets?: string[];
  enhancedCtaLabel?: string;
}

export const PHOTO_SIZE_GUIDES: Record<string, PhotoSizeGuide> = {
  aadhaar: {
    id: "aadhaar",
    h1: "Aadhaar Card Photo Size Requirements",
    dimensions: "413 × 531 pixels",
    physicalSize: "35mm × 45mm (3.5cm × 4.5cm)",
    maxKb: "50 KB",
    format: "JPG / JPEG",
    background: "Plain white or light grey",
    faceCoverage: "80–85% of frame",
    lastVerified: "June 2026",
    quickSpecs: [
      "Size: 3.5 × 4.5 cm (portrait)",
      "File size: Under 50KB (JPEG only)",
      "Background: Plain white or light grey",
      "Face coverage: 80–85% of frame",
    ],
    pixelDimensions: [
      { dpi: 200, pixels: "276 × 354 px", bestFor: "Minimum acceptable" },
      {
        dpi: 300,
        pixels: "413 × 531 px",
        bestFor: "Recommended",
        recommended: true,
      },
      { dpi: 600, pixels: "827 × 1063 px", bestFor: "Professional print" },
    ],
    pixelDimensionsNote:
      "Our photo resizer automatically sets 413×531 pixels — the UIDAI recommended resolution at 300 DPI.",
    orientationWarning: {
      title: "Common mistake: Aadhaar and PAN Card dimensions are reversed!",
      items: [
        {
          label: "Aadhaar",
          dimensions: "3.5 cm width × 4.5 cm height",
          note: "Portrait — taller than wide",
        },
        {
          label: "PAN Card",
          dimensions: "4.5 cm width × 3.5 cm height",
          note: "Landscape — wider than tall",
        },
      ],
      footer:
        "Many applicants mix these up and get rejected. Double-check orientation before uploading.",
    },
    whyKbLimit:
      "UIDAI processes over 1.3 billion Aadhaar records. At 50KB per photo, the entire database stays manageable (~65TB). A photo at 1MB would require 1,300TB of storage. The 50KB limit maintains sufficient quality for biometric face-matching while keeping infrastructure practical.",
    rejectionReasons: [
      "Wrong file size (over 50KB) — most common rejection",
      "Wrong orientation (landscape instead of portrait)",
      "Colored background (must be white or very light grey)",
      "Wearing glasses with tinted lenses or glare",
      "Smiling or non-neutral expression",
      "Hair covering forehead or eyes",
      "Photo older than 6 months",
      "Low resolution or blurry image",
      "Heavy makeup, filters, or beauty effects applied",
    ],
    uploadErrors: [
      "Photo file size exceeds 50 KB — compress before uploading to UIDAI portal",
      "Wrong dimensions — photo must be 413×531 pixels (300 DPI equivalent)",
      "Wrong orientation — portrait 3.5×4.5 cm, not landscape",
      "Face too small or not centred — full face should occupy 80–85% of the frame",
    ],
    resizeSteps: [
      "Take or select a recent passport-style photo with a plain background",
      "Open the WorkUtilities Photo Resizer and select the Aadhaar Card preset",
      "Upload your photo — width, height, and 50 KB limit auto-fill",
      "Choose a white background and click Resize Photo",
      "Download the resized JPG and upload to myaadhaar.uidai.gov.in",
    ],
    ctaPreset: "aadhaar",
    ctaLabel: "Resize Aadhaar Photo Free",
    enhancedCtaLabel: "Resize Photo for Aadhaar — Free & Instant",
    ctaBullets: [
      "Auto-sets 3.5×4.5 cm",
      "Compresses to under 50KB",
      "Runs in your browser — photo never uploaded",
    ],
    faqs: [
      {
        question: "What is the exact Aadhaar photo size in pixels?",
        answer:
          "At 300 DPI (recommended): 413×531 pixels. At 200 DPI (minimum): 276×354 pixels. Our photo resizer automatically sets the correct dimensions.",
      },
      {
        question: "Why does UIDAI require photos under 50KB?",
        answer:
          "UIDAI manages over 1.3 billion Aadhaar records. A strict 50KB file size limit keeps the photo database manageable while maintaining enough quality for biometric face-matching during verification.",
      },
      {
        question: "What's the difference between Aadhaar and PAN Card photo size?",
        answer:
          "The dimensions are reversed — Aadhaar is 3.5×4.5 cm (portrait, taller than wide) while PAN Card is 4.5×3.5 cm (landscape, wider than tall). This is one of the most common reasons for application rejection.",
      },
      {
        question: "Can I use the same photo for Aadhaar and Passport?",
        answer:
          "Indian Passport requires 35×45 mm (same proportions) with similar white background requirements. A good passport photo often works for Aadhaar too, but verify the file size is under 50KB for Aadhaar upload specifically.",
      },
      {
        question: "Why was my Aadhaar photo rejected even though it looked correct?",
        answer:
          "Common hidden reasons: file size even 1KB over limit (portals do byte-level validation), slight color tint in background, hair partially covering forehead, or photo older than 6 months. Use our resizer to auto-compress to exactly under 50KB.",
      },
      {
        question: "Can I use a mobile photo for Aadhaar update?",
        answer:
          "Yes, you can use a mobile photo as long as it meets the 413×531 pixel dimension and 50 KB size requirements with a plain background.",
      },
      {
        question: "How do I reduce Aadhaar photo size below 50 KB?",
        answer:
          "Use the WorkUtilities Photo Resizer with the Aadhaar preset — it automatically resizes to 413×531 pixels and compresses to under 50 KB.",
      },
    ],
    relatedGuideIds: [
      "pan",
      "passport",
      "visa",
      "driving-licence",
    ],
  },
  pan: {
    id: "pan",
    h1: "PAN Card Photo Size Requirements",
    dimensions: "413 × 295 pixels",
    physicalSize: "3.5cm × 2.5cm",
    maxKb: "300 KB",
    format: "JPG / JPEG",
    background: "White background preferred",
    uploadErrors: [
      "Photo dimensions don't match 3.5×2.5 cm (413×295 px) requirement",
      "File size exceeds 300 KB on NSDL or UTIITSL portal",
      "Blurry or low-resolution image rejected during verification",
      "Photo cropped incorrectly — face not fully visible",
    ],
    resizeSteps: [
      "Choose a clear front-facing photo with good lighting",
      "Open Photo Resizer and select the PAN Card preset",
      "Upload your image — dimensions and 300 KB limit are set automatically",
      "Select white background and resize",
      "Download and upload to tin-nsdl.com or utiitsl.com PAN application portal",
    ],
    ctaPreset: "pan",
    ctaLabel: "Resize PAN Card Photo Free",
    faqs: [
      {
        question: "What is PAN card photo size for NSDL portal?",
        answer:
          "NSDL requires a photo of 3.5cm × 2.5cm (413×295 pixels) in JPG format, with a maximum file size of 300 KB.",
      },
      {
        question: "Is PAN photo size same for UTIITSL?",
        answer:
          "Yes, both NSDL and UTIITSL use the same photo dimensions of 3.5cm × 2.5cm and accept JPG files up to 300 KB.",
      },
      {
        question: "What DPI is required for PAN card photo?",
        answer:
          "PAN card photos are typically accepted at 72 DPI with dimensions of 413×295 pixels.",
      },
      {
        question: "Can I use the same photo for PAN and Aadhaar?",
        answer:
          "No — Aadhaar requires 413×531 px (portrait) while PAN requires 413×295 px (landscape orientation). Each needs separate resizing.",
      },
      {
        question: "How to resize photo for PAN card online free?",
        answer:
          "Use WorkUtilities Photo Resizer, select the PAN Card preset, upload your photo, and download the correctly sized JPG instantly in your browser.",
      },
    ],
    relatedGuideIds: [
      "aadhaar",
      "passport",
      "visa",
      "driving-licence",
    ],
  },
  passport: {
    id: "passport",
    h1: "Passport Photo Size Requirements",
    dimensions: "350 × 350 pixels",
    physicalSize: "35mm × 35mm (3.5cm × 3.5cm)",
    maxKb: "50 KB",
    format: "JPG / JPEG",
    background: "Plain white background (mandatory)",
    uploadErrors: [
      "Photo not square — Indian passport requires 35×35mm (350×350 px)",
      "Background not plain white — most common rejection reason",
      "File exceeds 50 KB on passport seva portal upload",
      "Face occupies less than 80% of frame or ears not visible",
    ],
    resizeSteps: [
      "Take a passport-style photo against a plain white wall",
      "Open Photo Resizer and select Passport (India) preset",
      "Upload your photo with white background selected",
      "Resize to 350×350 pixels under 50 KB",
      "Download and use for passport seva online application",
    ],
    ctaPreset: "passport",
    ctaLabel: "Resize Passport Photo Free",
    faqs: [
      {
        question: "What is Indian passport photo size in mm?",
        answer:
          "Indian passport photo size is 35mm × 35mm (3.5cm × 3.5cm), which equals 350×350 pixels at standard DPI.",
      },
      {
        question: "What is the passport photo size in KB for online application?",
        answer:
          "The passport seva portal typically accepts photos up to 50 KB in JPG format with a plain white background.",
      },
      {
        question: "Is white background mandatory for Indian passport photo?",
        answer:
          "Yes, a plain white background is mandatory for Indian passport photos. Off-white, grey, or patterned backgrounds are rejected.",
      },
      {
        question: "Can I wear glasses in passport photo?",
        answer:
          "Glasses are generally allowed if there is no glare, but tinted glasses and sunglasses are not permitted.",
      },
      {
        question: "How to make passport size photo online free?",
        answer:
          "Upload your photo to WorkUtilities Photo Resizer, select the Passport preset, and download a 350×350 px photo under 50 KB.",
      },
    ],
    relatedGuideIds: [
      "aadhaar",
      "pan",
      "visa",
      "driving-licence",
    ],
  },
  visa: {
    id: "visa",
    h1: "Visa Photo Size Requirements",
    dimensions: "600 × 600 pixels",
    physicalSize: "50mm × 50mm (5cm × 5cm)",
    maxKb: "500 KB",
    format: "JPG / JPEG",
    background: "White or off-white (varies by country)",
    uploadErrors: [
      "Wrong dimensions — US visa requires 2×2 inch (600×600 px at 300 DPI equivalent)",
      "Head size incorrect — face must be 50–69% of photo height",
      "Background colour wrong for specific country requirements",
      "Photo older than 6 months rejected by embassy portals",
    ],
    resizeSteps: [
      "Check your destination country's specific visa photo rules",
      "Open Photo Resizer and select the Visa Photo preset (600×600 px)",
      "Upload a recent front-facing photo",
      "Choose white background and resize to under 500 KB",
      "Download and upload to VFS Global, US embassy, or relevant portal",
    ],
    ctaPreset: "visa",
    ctaLabel: "Resize Visa Photo Free",
    faqs: [
      {
        question: "What is visa photo size for US visa from India?",
        answer:
          "US visa photos require 2×2 inches (51×51mm), typically 600×600 pixels, with a white background and file size under 240 KB for DS-160 upload.",
      },
      {
        question: "What is Schengen visa photo size?",
        answer:
          "Schengen visa photos are 35×45mm (413×531 pixels) with a light grey or white background — different from the standard 50×50mm visa size.",
      },
      {
        question: "What is UK visa photo size from India?",
        answer:
          "UK visa photos require 35×45mm dimensions with a plain cream or light grey background, matching the standard ICAO passport photo format.",
      },
      {
        question: "Is 600×600 pixels correct for visa photos?",
        answer:
          "600×600 pixels (50×50mm) is the standard for many visa applications including US, Canada, and Australia online submissions.",
      },
      {
        question: "How to resize photo for visa application online?",
        answer:
          "Use WorkUtilities Photo Resizer with the Visa preset to get a 600×600 px photo compressed to your required KB limit.",
      },
    ],
    relatedGuideIds: [
      "aadhaar",
      "pan",
      "passport",
      "driving-licence",
    ],
  },
  "driving-licence": {
    id: "driving-licence",
    h1: "Driving Licence Photo Size Requirements",
    dimensions: "413 × 531 pixels",
    physicalSize: "35mm × 45mm (3.5cm × 4.5cm)",
    maxKb: "200 KB",
    format: "JPG / JPEG",
    background: "Plain white or light background",
    uploadErrors: [
      "Photo exceeds 200 KB on Sarathi Parivahan portal",
      "Wrong aspect ratio — must be 35×45mm portrait (413×531 px)",
      "Face not clearly visible or photo taken from too far",
      "Coloured or patterned background not accepted",
    ],
    resizeSteps: [
      "Take a front-facing photo with plain background and good lighting",
      "Open Photo Resizer and select Driving Licence preset",
      "Upload photo — 413×531 px and 200 KB limit auto-fill",
      "Choose white background and click Resize",
      "Download and upload on parivahan.gov.in Sarathi portal",
    ],
    ctaPreset: "driving-licence",
    ctaLabel: "Resize Driving Licence Photo Free",
    faqs: [
      {
        question: "What is driving licence photo size for Sarathi portal?",
        answer:
          "The Sarathi Parivahan portal requires a photo of 35×45mm (413×531 pixels) in JPG format, maximum 200 KB.",
      },
      {
        question: "Is driving licence photo size same as Aadhaar?",
        answer:
          "Yes, both use 35×45mm (413×531 pixels), but the maximum file size differs — Aadhaar allows 50 KB while driving licence allows 200 KB.",
      },
      {
        question: "What background is required for DL photo upload?",
        answer:
          "A plain white or light-coloured background is required for driving licence photo upload on the Parivahan portal.",
      },
      {
        question: "Can I use my Aadhaar photo for driving licence?",
        answer:
          "You can use the same dimensions but may need to re-compress — Aadhaar photos are capped at 50 KB while DL allows up to 200 KB.",
      },
      {
        question: "How to resize photo for driving licence online free?",
        answer:
          "Use WorkUtilities Photo Resizer with the Driving Licence preset to get a 413×531 px photo under 200 KB instantly.",
      },
    ],
    relatedGuideIds: [
      "aadhaar",
      "pan",
      "passport",
      "visa",
    ],
  },
};

export const PHOTO_SIZE_GUIDE_ROUTES: Record<
  string,
  { path: string; title: string }
> = {
  aadhaar: {
    path: "/aadhaar-photo-size",
    title: "Aadhaar Card Photo Size",
  },
  pan: {
    path: "/pan-card-photo-size",
    title: "PAN Card Photo Size",
  },
  passport: {
    path: "/passport-photo-size-india",
    title: "Passport Photo Size India",
  },
  visa: {
    path: "/visa-photo-size",
    title: "Visa Photo Size",
  },
  "driving-licence": {
    path: "/driving-licence-photo-size",
    title: "Driving Licence Photo Size",
  },
};

export function getPhotoSizeGuide(id: string): PhotoSizeGuide | undefined {
  return PHOTO_SIZE_GUIDES[id];
}
