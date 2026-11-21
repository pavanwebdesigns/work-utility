/**
 * Exam photo / signature presets with cited sources.
 * Unverified presets stay behind NEXT_PUBLIC_SHOW_UNVERIFIED_IBPS_PRESETS.
 */

export interface ExamPreset {
  id: string;
  name: string;
  resizeLabel: string;
  kind: "photo" | "signature";
  width: number;
  height: number;
  minKb: number;
  maxKb: number;
  dpi: number;
  description: string;
  /** Official page or notification PDF. */
  sourceUrl?: string;
  /** e.g. "Nov 2026" when checked against the official source. */
  verified?: string;
  /** When true, hidden unless the feature flag is on. */
  unverified?: boolean;
  sourceNote?: string;
}

/** Flip on to show IBPS presets before official PDF verification. */
export const SHOW_UNVERIFIED_IBPS_PRESETS =
  process.env.NEXT_PUBLIC_SHOW_UNVERIFIED_IBPS_PRESETS === "true";

export const EXAM_PRESETS: ExamPreset[] = [
  {
    id: "gate-2027-photo",
    name: "GATE 2027 Photo",
    resizeLabel: "GATE 2027 Photo",
    kind: "photo",
    width: 530,
    height: 690,
    minKb: 5,
    maxKb: 600,
    dpi: 72,
    description: "3.5 × 4.5 cm ratio",
    sourceUrl: "https://gate2027.iitm.ac.in/photograph_and_signature",
    verified: "Nov 2026",
  },
  {
    id: "gate-2027-signature",
    name: "GATE 2027 Signature",
    resizeLabel: "GATE 2027 Signature",
    kind: "signature",
    width: 580,
    height: 180,
    minKb: 3,
    maxKb: 300,
    dpi: 72,
    description: "Signature strip",
    sourceUrl: "https://gate2027.iitm.ac.in/photograph_and_signature",
    verified: "Nov 2026",
  },
  {
    id: "ibps-photo",
    name: "IBPS Photo",
    resizeLabel: "IBPS Photo",
    kind: "photo",
    width: 200,
    height: 230,
    minKb: 20,
    maxKb: 50,
    dpi: 72,
    description: "200 × 230 px",
    unverified: true,
    sourceNote: "TODO(verify against official IBPS notification PDF)",
  },
  {
    id: "ibps-signature",
    name: "IBPS Signature",
    resizeLabel: "IBPS Signature",
    kind: "signature",
    width: 140,
    height: 60,
    minKb: 10,
    maxKb: 20,
    dpi: 72,
    description: "140 × 60 px",
    unverified: true,
    sourceNote: "TODO(verify against official IBPS notification PDF)",
  },
  {
    id: "signature-custom",
    name: "Signature (custom size + KB range)",
    resizeLabel: "Custom Signature",
    kind: "signature",
    width: 0,
    height: 0,
    minKb: 10,
    maxKb: 20,
    dpi: 72,
    description: "Set your own size and KB range",
  },
];

export function getVisibleExamPresets(): ExamPreset[] {
  return EXAM_PRESETS.filter(
    (preset) => !preset.unverified || SHOW_UNVERIFIED_IBPS_PRESETS
  );
}

export function getExamPreset(id: string): ExamPreset | undefined {
  return EXAM_PRESETS.find((preset) => preset.id === id);
}
