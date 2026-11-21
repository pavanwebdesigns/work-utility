export interface PhotoPreset {
  id: string;
  name: string;
  resizeLabel: string;
  width: number;
  height: number;
  /** Optional lower bound (exam portals often require a range). */
  minKb?: number;
  maxKb: number;
  dpi: number;
  description: string;
}

export const PHOTO_SIZES: PhotoPreset[] = [
  {
    id: "aadhaar",
    name: "Aadhaar Card",
    resizeLabel: "Aadhaar Card Photo",
    width: 413,
    height: 531,
    maxKb: 50,
    dpi: 72,
    description: "35mm × 45mm",
  },
  {
    id: "pan",
    name: "PAN Card",
    resizeLabel: "PAN Card Photo",
    width: 413,
    height: 295,
    maxKb: 300,
    dpi: 72,
    description: "3.5cm × 2.5cm",
  },
  {
    id: "passport",
    name: "Passport (India)",
    resizeLabel: "Passport Photo",
    width: 630,
    height: 810,
    maxKb: 250,
    dpi: 300,
    description: "35mm × 45mm",
  },
  {
    id: "visa",
    name: "Visa Photo",
    resizeLabel: "Visa Photo",
    width: 600,
    height: 600,
    maxKb: 500,
    dpi: 72,
    description: "50mm × 50mm",
  },
  {
    id: "driving-licence",
    name: "Driving Licence",
    resizeLabel: "Driving Licence Photo",
    width: 413,
    height: 531,
    maxKb: 200,
    dpi: 72,
    description: "35mm × 45mm",
  },
  {
    id: "custom",
    name: "Custom Size",
    resizeLabel: "Custom Photo",
    width: 0,
    height: 0,
    maxKb: 0,
    dpi: 72,
    description: "Set your own",
  },
];

export const PRESET_URL_PARAMS = [
  "aadhaar",
  "pan",
  "passport",
  "visa",
  "driving-licence",
] as const;

export type PresetUrlParam = (typeof PRESET_URL_PARAMS)[number];

export function resolvePresetFromUrlParam(
  param: string | null | undefined
): PhotoPreset | undefined {
  if (!param) return undefined;

  const normalized = param.toLowerCase().trim();
  if (!PRESET_URL_PARAMS.includes(normalized as PresetUrlParam)) {
    return undefined;
  }

  return PHOTO_SIZES.find((preset) => preset.id === normalized);
}

export function getPhotoPreset(id: string): PhotoPreset | undefined {
  return PHOTO_SIZES.find((preset) => preset.id === id);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export interface KbLimitStatus {
  sizeBytes: number;
  sizeLabel: string;
  minKb?: number;
  maxKb?: number;
  withinLimits: boolean;
  aboveMax: boolean;
  belowMin: boolean;
  /** e.g. "47.8 KB ✓ (5–600 KB)" or "12.1 KB ⚠ below 20 KB min" */
  display: string;
  warning?: string;
}

export function evaluateKbLimits(
  sizeBytes: number,
  minKb?: number,
  maxKb?: number
): KbLimitStatus {
  const sizeLabel = formatFileSize(sizeBytes);
  const aboveMax =
    typeof maxKb === "number" && maxKb > 0 && sizeBytes > maxKb * 1024;
  const belowMin =
    typeof minKb === "number" && minKb > 0 && sizeBytes < minKb * 1024;
  const withinLimits = !aboveMax && !belowMin;

  let rangeLabel = "";
  if (minKb && maxKb) rangeLabel = `${minKb}–${maxKb} KB`;
  else if (maxKb) rangeLabel = `max ${maxKb} KB`;
  else if (minKb) rangeLabel = `min ${minKb} KB`;

  let display: string;
  let warning: string | undefined;

  if (withinLimits) {
    display = rangeLabel
      ? `${sizeLabel} ✓ (${rangeLabel})`
      : `${sizeLabel} ✓`;
  } else if (aboveMax) {
    display = `${sizeLabel} ⚠ above ${maxKb} KB max`;
    warning = `Could not get under ${maxKb} KB — try a tighter crop`;
  } else {
    display = `${sizeLabel} ⚠ below ${minKb} KB min`;
    warning = `File is ${sizeLabel} — below the ${minKb} KB minimum. Try a higher-resolution source (files are not padded).`;
  }

  return {
    sizeBytes,
    sizeLabel,
    minKb,
    maxKb,
    withinLimits,
    aboveMax,
    belowMin,
    display,
    warning,
  };
}

export const KB_FIT_QUALITY_MAX = 0.95;
export const KB_FIT_QUALITY_FLOOR = 0.35;
export const KB_FIT_QUALITY_STEP = 0.05;
export const KB_FIT_SCALE_MIN = 0.5;
export const KB_FIT_SCALE_STEP = 0.1;

export type SizeEncoder = (params: {
  quality: number;
  width: number;
  height: number;
}) => Promise<{ sizeBytes: number; payload: unknown }>;

export interface FitToKbLimitsResult<T = unknown> {
  payload: T;
  width: number;
  height: number;
  quality: number;
  scale: number;
  sizeBytes: number;
  status: KbLimitStatus;
}

/**
 * Pure control loop for min/max KB fitting.
 * - Above max: step quality down, then scale dimensions down and retry.
 * - Below min: step quality up; if still short at max quality, warn (no padding).
 */
export async function fitToKbLimits<T = unknown>(
  baseWidth: number,
  baseHeight: number,
  encode: SizeEncoder,
  options: { minKb?: number; maxKb?: number } = {}
): Promise<FitToKbLimitsResult<T>> {
  const { minKb, maxKb } = options;
  const hasMax = typeof maxKb === "number" && maxKb > 0;
  const hasMin = typeof minKb === "number" && minKb > 0;

  let scale = 1;
  let quality = KB_FIT_QUALITY_MAX;
  let width = baseWidth;
  let height = baseHeight;
  let encoded = await encode({ quality, width, height });

  if (hasMax) {
    let metMax = encoded.sizeBytes <= maxKb! * 1024;

    while (!metMax && scale >= KB_FIT_SCALE_MIN - 1e-9) {
      quality = KB_FIT_QUALITY_MAX;
      width = Math.max(1, Math.round(baseWidth * scale));
      height = Math.max(1, Math.round(baseHeight * scale));
      encoded = await encode({ quality, width, height });

      while (
        encoded.sizeBytes > maxKb! * 1024 &&
        quality > KB_FIT_QUALITY_FLOOR + 1e-9
      ) {
        quality = Math.max(
          KB_FIT_QUALITY_FLOOR,
          Number((quality - KB_FIT_QUALITY_STEP).toFixed(2))
        );
        encoded = await encode({ quality, width, height });
      }

      metMax = encoded.sizeBytes <= maxKb! * 1024;
      if (metMax) break;
      scale = Number((scale - KB_FIT_SCALE_STEP).toFixed(2));
    }

    if (!metMax) {
      // Keep best (smallest scale/quality) attempt; status will warn.
      width = Math.max(1, Math.round(baseWidth * Math.max(scale, KB_FIT_SCALE_MIN)));
      height = Math.max(
        1,
        Math.round(baseHeight * Math.max(scale, KB_FIT_SCALE_MIN))
      );
    }
  }

  if (hasMin && encoded.sizeBytes < minKb! * 1024 && !hasMax) {
    for (
      let q = quality;
      q <= 1 + 1e-9;
      q = Number((q + KB_FIT_QUALITY_STEP).toFixed(2))
    ) {
      const nextQ = Math.min(1, q);
      const next = await encode({ quality: nextQ, width, height });
      encoded = next;
      quality = nextQ;
      if (encoded.sizeBytes >= minKb! * 1024) break;
    }
  } else if (hasMin && encoded.sizeBytes < minKb! * 1024) {
    // Already under max (or max failed): raise quality at current size, stop if max would break.
    for (
      let q = quality;
      q <= 1 + 1e-9;
      q = Number((q + KB_FIT_QUALITY_STEP).toFixed(2))
    ) {
      const nextQ = Math.min(1, q);
      const next = await encode({ quality: nextQ, width, height });
      if (hasMax && next.sizeBytes > maxKb! * 1024) break;
      encoded = next;
      quality = nextQ;
      if (encoded.sizeBytes >= minKb! * 1024) break;
    }
  }

  const status = evaluateKbLimits(encoded.sizeBytes, minKb, maxKb);

  return {
    payload: encoded.payload as T,
    width,
    height,
    quality,
    scale: width / baseWidth,
    sizeBytes: encoded.sizeBytes,
    status,
  };
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  mime: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Canvas failed"))),
      mime,
      quality
    );
  });
}

export interface ResizePhotoResult {
  blob: Blob;
  width: number;
  height: number;
  status: KbLimitStatus;
}

export async function resizePhoto(
  file: File,
  width: number,
  height: number,
  bgColor: string = "#FFFFFF",
  maxKb?: number,
  minKb?: number
): Promise<ResizePhotoResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    const isTransparent = bgColor === "transparent";

    img.onload = async () => {
      try {
        const mime = isTransparent ? "image/png" : "image/jpeg";

        const drawToCanvas = (w: number, h: number) => {
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("Canvas failed");

          if (!isTransparent) {
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, w, h);
          }

          const scale = Math.max(w / img.width, h / img.height);
          const scaledW = img.width * scale;
          const scaledH = img.height * scale;
          const offsetX = (w - scaledW) / 2;
          const offsetY = (h - scaledH) / 2;
          ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH);
          return canvas;
        };

        if (isTransparent || (!maxKb && !minKb)) {
          const canvas = drawToCanvas(width, height);
          const blob = await canvasToBlob(
            canvas,
            mime,
            isTransparent ? 1.0 : 0.95
          );
          URL.revokeObjectURL(url);
          resolve({
            blob,
            width,
            height,
            status: evaluateKbLimits(blob.size, minKb, maxKb),
          });
          return;
        }

        const fit = await fitToKbLimits<Blob>(
          width,
          height,
          async ({ quality, width: w, height: h }) => {
            const canvas = drawToCanvas(w, h);
            const blob = await canvasToBlob(canvas, mime, quality);
            return { sizeBytes: blob.size, payload: blob };
          },
          { minKb, maxKb }
        );

        URL.revokeObjectURL(url);
        resolve({
          blob: fit.payload,
          width: fit.width,
          height: fit.height,
          status: fit.status,
        });
      } catch (error) {
        URL.revokeObjectURL(url);
        reject(error);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image load failed"));
    };
    img.src = url;
  });
}
