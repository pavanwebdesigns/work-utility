export interface PhotoSize {
  id: string;
  name: string;
  width: number;
  height: number;
  dpi: number;
  description: string;
}

export const PHOTO_SIZES: PhotoSize[] = [
  {
    id: "aadhaar",
    name: "Aadhaar Card",
    width: 213,
    height: 213,
    dpi: 72,
    description: "35mm × 35mm",
  },
  {
    id: "pan",
    name: "PAN Card",
    width: 213,
    height: 213,
    dpi: 72,
    description: "35mm × 35mm",
  },
  {
    id: "passport",
    name: "Passport (India)",
    width: 354,
    height: 472,
    dpi: 72,
    description: "2×2 inch",
  },
  {
    id: "visa",
    name: "Visa Photo",
    width: 354,
    height: 472,
    dpi: 72,
    description: "2×2 inch",
  },
  {
    id: "driving",
    name: "Driving License",
    width: 189,
    height: 236,
    dpi: 72,
    description: "25mm × 32mm",
  },
  {
    id: "custom",
    name: "Custom Size",
    width: 0,
    height: 0,
    dpi: 72,
    description: "Set your own",
  },
];

export async function resizePhoto(
  file: File,
  width: number,
  height: number,
  bgColor: string = "#FFFFFF"
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    const isTransparent = bgColor === "transparent";

    img.onload = () => {
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

      canvas.toBlob(
        (blob) =>
          blob ? resolve(blob) : reject(new Error("Canvas failed")),
        isTransparent ? "image/png" : "image/jpeg",
        isTransparent ? 1.0 : 0.95
      );
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
