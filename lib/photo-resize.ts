export interface PhotoPreset {
  id: string;
  name: string;
  resizeLabel: string;
  width: number;
  height: number;
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
    id: "government-exam",
    name: "Government Exam (UPSC/SSC)",
    resizeLabel: "Government Exam Photo",
    width: 350,
    height: 350,
    maxKb: 50,
    dpi: 72,
    description: "35mm × 35mm",
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

export async function resizePhoto(
  file: File,
  width: number,
  height: number,
  bgColor: string = "#FFFFFF",
  maxKb?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    const isTransparent = bgColor === "transparent";

    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas failed"));
        return;
      }

      if (!isTransparent) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
      }

      const scale = Math.max(width / img.width, height / img.height);
      const scaledW = img.width * scale;
      const scaledH = img.height * scale;
      const offsetX = (width - scaledW) / 2;
      const offsetY = (height - scaledH) / 2;

      ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH);
      URL.revokeObjectURL(url);

      try {
        const mime = isTransparent ? "image/png" : "image/jpeg";

        if (!maxKb || isTransparent) {
          resolve(
            await canvasToBlob(canvas, mime, isTransparent ? 1.0 : 0.95)
          );
          return;
        }

        let quality = 0.95;
        let blob = await canvasToBlob(canvas, mime, quality);

        while (blob.size > maxKb * 1024 && quality > 0.35) {
          quality -= 0.05;
          blob = await canvasToBlob(canvas, mime, quality);
        }

        resolve(blob);
      } catch (error) {
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

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
