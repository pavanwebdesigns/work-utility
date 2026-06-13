export type SignatureFont =
  | "Dancing Script"
  | "Great Vibes"
  | "Pacifico"
  | "Satisfy"
  | "Caveat";

export const SIGNATURE_FONTS: { value: SignatureFont; label: string }[] = [
  { value: "Dancing Script", label: "Dancing Script" },
  { value: "Great Vibes", label: "Great Vibes" },
  { value: "Pacifico", label: "Pacifico" },
  { value: "Satisfy", label: "Satisfy" },
  { value: "Caveat", label: "Caveat" },
];

export const SIGNATURE_COLORS = [
  { value: "#000000", label: "Black" },
  { value: "#1D4ED8", label: "Blue" },
  { value: "#DC2626", label: "Red" },
] as const;

export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 200;

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: "image/png" | "image/jpeg",
  background: "transparent" | "white" = "transparent"
): Promise<Blob> {
  if (type === "image/jpeg" || background === "white") {
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) throw new Error("Unable to export signature.");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    ctx.drawImage(canvas, 0, 0);

    return new Promise((resolve, reject) => {
      exportCanvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Export failed."))),
        "image/jpeg",
        0.95
      );
    });
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Export failed."))),
      "image/png"
    );
  });
}

export async function copyCanvasToClipboard(canvas: HTMLCanvasElement) {
  const blob = await canvasToBlob(canvas, "image/png", "transparent");
  await navigator.clipboard.write([
    new ClipboardItem({ "image/png": blob }),
  ]);
}

export function removeLightBackground(source: HTMLCanvasElement): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = source.width;
  canvas.height = source.height;
  const ctx = canvas.getContext("2d");
  const sourceCtx = source.getContext("2d");
  if (!ctx || !sourceCtx) return source;

  const imageData = sourceCtx.getImageData(0, 0, source.width, source.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const brightness = (r + g + b) / 3;

    if (brightness > 230) {
      data[i + 3] = 0;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export function loadImageToCanvas(
  file: File,
  canvas: HTMLCanvasElement,
  removeBackground: boolean
): Promise<void> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas unavailable."));
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.min(
        canvas.width / image.width,
        canvas.height / image.height
      );
      const width = image.width * scale;
      const height = image.height * scale;
      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, x, y, width, height);

      if (removeBackground) {
        const processed = removeLightBackground(canvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(processed, 0, 0, canvas.width, canvas.height);
      }

      URL.revokeObjectURL(url);
      resolve();
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Unable to load image."));
    };

    image.src = url;
  });
}

export function renderTypedSignature(
  canvas: HTMLCanvasElement,
  text: string,
  fontFamily: SignatureFont,
  fontSize: number,
  color: string
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${fontSize}px "${fontFamily}", cursive`;
  ctx.fillText(text || "Your Name", canvas.width / 2, canvas.height / 2);
}
