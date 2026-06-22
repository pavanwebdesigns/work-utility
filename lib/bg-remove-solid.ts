"use client";

function createCanvas(
  width: number,
  height: number
): OffscreenCanvas | HTMLCanvasElement {
  if (typeof OffscreenCanvas !== "undefined") {
    return new OffscreenCanvas(width, height);
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

async function canvasToPngBlob(
  canvas: OffscreenCanvas | HTMLCanvasElement
): Promise<Blob> {
  if (canvas instanceof OffscreenCanvas) {
    return canvas.convertToBlob({ type: "image/png" });
  }
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error("Failed to export transparent PNG.")),
      "image/png"
    );
  });
}

export async function removeSolidBackground(
  file: File,
  tolerance: number = 35
): Promise<Blob> {
  const img = await createImageBitmap(file);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not initialize canvas for background removal.");
  }

  ctx.drawImage(img, 0, 0);
  img.close();

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  const corners = [
    0,
    (width - 1) * 4,
    (height - 1) * width * 4,
    ((height - 1) * width + (width - 1)) * 4,
  ];
  const bgR = data[corners[0]];
  const bgG = data[corners[0] + 1];
  const bgB = data[corners[0] + 2];

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const diff = Math.sqrt(
      (r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2
    );
    if (diff <= tolerance) {
      data[i + 3] = 0;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvasToPngBlob(canvas);
}
