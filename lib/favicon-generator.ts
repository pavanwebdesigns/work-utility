export const FAVICON_SIZES = [16, 32, 180, 192, 512] as const;

export type FaviconSize = (typeof FAVICON_SIZES)[number];

export type FaviconFile = {
  filename: string;
  blob: Blob;
  size: number;
};

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Unable to load image"));
    img.src = URL.createObjectURL(file);
  });
}

async function resizeToPng(
  img: HTMLImageElement,
  size: number,
): Promise<Uint8Array> {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  ctx.drawImage(img, 0, 0, size, size);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("PNG export failed"))),
      "image/png",
    );
  });

  return new Uint8Array(await blob.arrayBuffer());
}

function createIcoFromPngs(
  images: { size: number; data: Uint8Array }[],
): Uint8Array {
  const count = images.length;
  const headerSize = 6;
  const entrySize = 16;
  let offset = headerSize + entrySize * count;
  const totalSize =
    offset + images.reduce((sum, img) => sum + img.data.length, 0);
  const buffer = new Uint8Array(totalSize);
  const view = new DataView(buffer.buffer);

  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, count, true);

  images.forEach((img, i) => {
    const entryOffset = headerSize + i * entrySize;
    buffer[entryOffset] = img.size >= 256 ? 0 : img.size;
    buffer[entryOffset + 1] = img.size >= 256 ? 0 : img.size;
    buffer[entryOffset + 2] = 0;
    buffer[entryOffset + 3] = 0;
    view.setUint16(entryOffset + 4, 1, true);
    view.setUint16(entryOffset + 6, 32, true);
    view.setUint32(entryOffset + 8, img.data.length, true);
    view.setUint32(entryOffset + 12, offset, true);
    buffer.set(img.data, offset);
    offset += img.data.length;
  });

  return buffer;
}

export function buildFaviconHtmlTags(): string {
  return `<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">`;
}

function bytesToBlob(data: Uint8Array, type: string): Blob {
  return new Blob([data.slice()], { type });
}

export async function generateFaviconPackage(
  file: File,
): Promise<{ files: FaviconFile[]; htmlTags: string }> {
  const img = await loadImage(file);
  URL.revokeObjectURL(img.src);

  const pngMap = new Map<number, Uint8Array>();
  for (const size of FAVICON_SIZES) {
    pngMap.set(size, await resizeToPng(img, size));
  }

  const icoData = createIcoFromPngs([
    { size: 16, data: pngMap.get(16)! },
    { size: 32, data: pngMap.get(32)! },
  ]);

  const files: FaviconFile[] = [
    {
      filename: "favicon.ico",
      blob: bytesToBlob(icoData, "image/x-icon"),
      size: 16,
    },
    {
      filename: "favicon-16x16.png",
      blob: bytesToBlob(pngMap.get(16)!, "image/png"),
      size: 16,
    },
    {
      filename: "favicon-32x32.png",
      blob: bytesToBlob(pngMap.get(32)!, "image/png"),
      size: 32,
    },
    {
      filename: "apple-touch-icon.png",
      blob: bytesToBlob(pngMap.get(180)!, "image/png"),
      size: 180,
    },
    {
      filename: "android-chrome-192x192.png",
      blob: bytesToBlob(pngMap.get(192)!, "image/png"),
      size: 192,
    },
    {
      filename: "android-chrome-512x512.png",
      blob: bytesToBlob(pngMap.get(512)!, "image/png"),
      size: 512,
    },
  ];

  return { files, htmlTags: buildFaviconHtmlTags() };
}

export async function createPreviewDataUrl(file: File): Promise<string> {
  const img = await loadImage(file);
  const data = await resizeToPng(img, 32);
  const blob = bytesToBlob(data, "image/png");
  return URL.createObjectURL(blob);
}
