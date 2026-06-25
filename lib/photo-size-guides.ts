export interface PhotoSizeGuideFaq {
  question: string;
  answer: string;
}

export interface PixelDimensionRow {
  dpi?: number;
  label?: string;
  pixels: string;
  bestFor: string;
  recommended?: boolean;
}

export interface OrientationWarning {
  title: string;
  items: { label: string; dimensions: string; note: string }[];
  footer: string;
}

export interface FormatComparisonRow {
  document: string;
  size: string;
  pixels: string;
  notes: string;
}

export interface RuleChange {
  oldRule: string;
  newRule: string;
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
  pixelDimensionsTitle?: string;
  pixelDimensionsColumnLabel?: string;
  orientationWarning?: OrientationWarning;
  whyKbLimit?: string;
  rejectionReasons?: string[];
  rejectionReasonsTitle?: string;
  ctaBullets?: string[];
  enhancedCtaLabel?: string;
  alertBanner?: { title: string; body: string };
  formatComparison?: {
    title: string;
    intro: string;
    rows: FormatComparisonRow[];
  };
  ruleChanges?: RuleChange[];
  ruleChangesTitle?: string;
  minKb?: string;
  photoAge?: string;
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
          "Both use 35×45mm portrait proportions, but digital specs differ: Passport Seva requires 630×810 px (10–250KB) while Aadhaar requires 413×531 px (under 50KB). Resize separately for each portal.",
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
    h1: "Indian Passport Photo Size Requirements (2026)",
    dimensions: "630 × 810 pixels",
    physicalSize: "35mm × 45mm (3.5cm × 4.5cm) — portrait",
    maxKb: "250 KB",
    minKb: "10 KB",
    format: "JPEG only",
    background: "Pure white only (off-white rejected by AI)",
    faceCoverage: "80–85% of frame",
    photoAge: "Within 3 months",
    lastVerified: "June 2026",
    alertBanner: {
      title: "Rule Change: September 2025",
      body: "India changed passport photo rules. The old 2×2 inch (51×51mm) square format is NOW REJECTED for Passport Seva applications. New format: 35×45mm portrait rectangle.",
    },
    quickSpecs: [
      "Size: 35 × 45 mm (portrait — NOT square)",
      "Digital pixels: 630 × 810 pixels exactly",
      "File size: 10KB – 250KB (JPEG only)",
      "Background: Pure white only (off-white rejected by AI system)",
      "Face coverage: 80–85% of frame (increased from 70–80% in September 2025)",
      "Glasses: Not recommended (any glare = automatic rejection)",
      "Photo age: Must be within 3 months",
    ],
    formatComparison: {
      title: "3 Different Formats — Don't Mix Them Up",
      intro: "India has 3 completely different photo formats — using the wrong one means rejection:",
      rows: [
        {
          document: "Passport (Passport Seva)",
          size: "35×45mm",
          pixels: "630×810 px",
          notes: "New rule from Sep 2025",
        },
        {
          document: "OCI Card",
          size: "51×51mm (square)",
          pixels: "600×600 px",
          notes: "Still uses old square format",
        },
        {
          document: "e-Visa",
          size: "35×45mm",
          pixels: "350×350 to 1000×1000 px",
          notes: "Slightly different file size limit",
        },
      ],
    },
    ruleChangesTitle: "New 2025–26 Rule Changes",
    ruleChanges: [
      {
        oldRule: "Old: 2×2 inch (51×51mm) square",
        newRule: "New: 35×45mm portrait",
      },
      {
        oldRule: "Old: Face 70–80% of frame",
        newRule: "New: Face 80–85% (tighter crop!)",
      },
      {
        oldRule: "Old: Glasses allowed with care",
        newRule: "New: Glasses strongly discouraged (any glare = instant rejection)",
      },
      {
        oldRule: "Old: Manual check at PSK",
        newRule: "New: AI automated check on upload (Passport Seva 2.0, Feb 2026) — zero tolerance",
      },
    ],
    pixelDimensionsTitle: "Pixel Dimensions",
    pixelDimensionsColumnLabel: "Resolution",
    pixelDimensions: [
      {
        label: "Minimum",
        pixels: "630 × 810 px",
        bestFor: "Passport Seva digital upload",
        recommended: true,
      },
      {
        label: "Print (300 DPI)",
        pixels: "413 × 531 px",
        bestFor: "Physical print at studio",
      },
      {
        label: "High quality",
        pixels: "827 × 1063 px",
        bestFor: "Archive/professional",
      },
    ],
    pixelDimensionsNote:
      "Our photo resizer automatically sets 630×810 pixels for Passport Seva digital upload.",
    rejectionReasonsTitle: "Common Rejection Reasons (2026)",
    rejectionReasons: [
      "Wrong format — still using old 2×2 inch square (most common!)",
      "Face too small — must be 80–85% of frame now (not 70%)",
      "Background not pure white (off-white, grey, shadows rejected by AI)",
      "File size wrong — must be 10KB–250KB exactly",
      "Glasses with any reflection or glare",
      "Photo older than 3 months",
      "Hair covering forehead (affects face height measurement)",
      "Smiling, non-neutral expression",
      "Digital filters, beauty effects, AI retouching (detected and rejected by PSP 2.0)",
    ],
    uploadErrors: [
      "Still using old 51×51mm square format — rejected since September 2025",
      "Digital upload not exactly 630×810 pixels",
      "File size outside 10KB–250KB range",
      "Background not pure white — AI detects off-white and grey tones",
    ],
    resizeSteps: [
      "Take a recent photo (within 3 months) against a pure white wall, no glasses",
      "Open WorkUtilities Photo Resizer and select Passport (India) preset",
      "Upload your photo — 630×810 px and 250 KB limit auto-fill",
      "Ensure white background and face fills 80–85% of frame",
      "Download JPEG and upload to passportindia.gov.in Passport Seva portal",
    ],
    ctaPreset: "passport",
    ctaLabel: "Resize Passport Photo Free",
    enhancedCtaLabel: "Resize Your Passport Photo — Free & Instant",
    ctaBullets: [
      "Auto-sets 35×45mm (630×810 px)",
      "Compresses to 10–250KB",
      "Runs in your browser — photo never uploaded",
    ],
    faqs: [
      {
        question: "What is the passport photo size in India for 2026?",
        answer:
          "35×45mm portrait rectangle (NOT the old 2×2 inch square). Digital upload to Passport Seva requires exactly 630×810 pixels, JPEG under 250KB.",
      },
      {
        question: "Did India change passport photo rules?",
        answer:
          "Yes — from September 1, 2025, India adopted ICAO standards. The old 2×2 inch square format is rejected. New format is 35×45mm portrait with 80–85% face coverage. Passport Seva Program 2.0 (February 2026) added AI-based photo checking.",
      },
      {
        question: "Why is my passport photo getting rejected on Passport Seva?",
        answer:
          "Most common reasons: wrong dimensions (still using old square format), face coverage under 80%, background not pure white (AI detects off-white), file size outside 10KB–250KB range, or any glare from glasses.",
      },
      {
        question: "What is the difference between Passport and OCI Card photo size?",
        answer:
          "Passport Seva requires 35×45mm (630×810px portrait). OCI Card still requires 51×51mm square format. A photo prepared for one will be rejected for the other.",
      },
      {
        question: "Can I wear glasses in an Indian passport photo?",
        answer:
          "Not recommended since September 2025. Any glare, reflection, or shadow from glasses triggers automatic rejection in Passport Seva's AI checking system. Remove glasses for the safest result.",
      },
      {
        question: "Is white background mandatory for Indian passport photo?",
        answer:
          "Yes — pure white only. Off-white, cream, grey, or patterned backgrounds are rejected by Passport Seva 2.0's AI photo checking system.",
      },
      {
        question: "How to make passport size photo online free?",
        answer:
          "Upload your photo to WorkUtilities Photo Resizer, select the Passport (India) preset, and download a 630×810 px JPEG between 10KB and 250KB.",
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
