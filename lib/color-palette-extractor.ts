export type PaletteColor = {
  hex: string;
  rgb: { r: number; g: number; b: number };
};

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

function colorDistance(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number },
): number {
  return Math.sqrt(
    (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2,
  );
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Unable to load image"));
    img.src = URL.createObjectURL(file);
  });
}

export async function extractPalette(
  file: File,
  colorCount = 6,
): Promise<PaletteColor[]> {
  const img = await loadImage(file);
  URL.revokeObjectURL(img.src);

  const sampleSize = 120;
  const canvas = document.createElement("canvas");
  canvas.width = sampleSize;
  canvas.height = sampleSize;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
  const { data } = ctx.getImageData(0, 0, sampleSize, sampleSize);

  const buckets = new Map<string, { r: number; g: number; b: number; count: number }>();

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 128) continue;
    const r = Math.round(data[i] / 16) * 16;
    const g = Math.round(data[i + 1] / 16) * 16;
    const b = Math.round(data[i + 2] / 16) * 16;
    const key = `${r},${g},${b}`;
    const existing = buckets.get(key);
    if (existing) existing.count++;
    else buckets.set(key, { r, g, b, count: 1 });
  }

  const sorted = Array.from(buckets.values()).sort((a, b) => b.count - a.count);
  const palette: PaletteColor[] = [];

  for (const bucket of sorted) {
    if (palette.length >= colorCount) break;
    const tooClose = palette.some(
      (c) => colorDistance(c.rgb, bucket) < 40,
    );
    if (tooClose) continue;
    palette.push({
      hex: rgbToHex(bucket.r, bucket.g, bucket.b),
      rgb: { r: bucket.r, g: bucket.g, b: bucket.b },
    });
  }

  return palette;
}
