import { PDFDocument } from "pdf-lib";

export type CompressProgress = {
  currentPage: number;
  totalPages: number;
  percent: number;
  message: string;
};

function clampCompressionPercent(value: number): number {
  if (!Number.isFinite(value)) return 50;
  return Math.min(90, Math.max(10, Math.round(value)));
}

export function getCompressionSettings(compressionPercent: number): {
  sliderValue: number;
  renderScale: number;
  jpegQuality: number;
} {
  const sliderValue = clampCompressionPercent(compressionPercent);
  const ratio = sliderValue / 100;

  return {
    sliderValue,
    jpegQuality: 1 - ratio,
    renderScale: 1 - ratio * 0.4,
  };
}

async function loadPdfJs() {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@6.0.227/legacy/build/pdf.worker.min.mjs`;
  return pdfjsLib;
}

function canvasToJpegBlob(
  canvas: HTMLCanvasElement,
  quality: number
): Promise<Blob> {
  const jpegQuality = Math.min(1, Math.max(0.01, quality));

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error("Failed to compress page")),
      "image/jpeg",
      jpegQuality
    );
  });
}

async function buildCompressedPdf(
  file: File,
  jpegQuality: number,
  renderScale: number,
  onProgress?: (progress: CompressProgress) => void
): Promise<Blob> {
  const pdfjsLib = await loadPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer.slice(0) }).promise;
  const outputPdf = await PDFDocument.create();
  const totalPages = pdf.numPages;

  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    onProgress?.({
      currentPage: pageNumber,
      totalPages,
      percent: Math.round(((pageNumber - 1) / totalPages) * 100),
      message: `Compressing page ${pageNumber} of ${totalPages}...`,
    });

    const page = await pdf.getPage(pageNumber);
    const baseViewport = page.getViewport({ scale: 1 });
    const renderViewport = page.getViewport({ scale: renderScale });

    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(renderViewport.width);
    canvas.height = Math.floor(renderViewport.height);
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Could not initialize canvas for compression");
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvasContext: ctx,
      viewport: renderViewport,
      canvas,
    }).promise;

    const jpegBlob = await canvasToJpegBlob(canvas, jpegQuality);
    const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());
    const jpegImage = await outputPdf.embedJpg(jpegBytes);

    const pdfPage = outputPdf.addPage([
      baseViewport.width,
      baseViewport.height,
    ]);
    pdfPage.drawImage(jpegImage, {
      x: 0,
      y: 0,
      width: baseViewport.width,
      height: baseViewport.height,
    });
  }

  onProgress?.({
    currentPage: totalPages,
    totalPages,
    percent: 100,
    message: "Finalizing compressed PDF...",
  });

  const pdfBytes = await outputPdf.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });

  return new Blob([Uint8Array.from(pdfBytes)], { type: "application/pdf" });
}

export async function compressPDF(
  file: File,
  compressionPercent: number,
  onProgress?: (progress: CompressProgress) => void
): Promise<Blob> {
  const { sliderValue, renderScale, jpegQuality } =
    getCompressionSettings(compressionPercent);

  console.log("[PDF Compress]", { sliderValue, jpegQuality, renderScale });

  const targetSize = Math.round(file.size * (1 - sliderValue / 100));
  let quality = jpegQuality;
  let scale = renderScale;
  let blob = await buildCompressedPdf(file, quality, scale, onProgress);

  console.log("[PDF Compress] result", {
    sliderValue,
    jpegQuality: quality,
    renderScale: scale,
    originalSize: file.size,
    compressedSize: blob.size,
    targetSize,
  });

  // Prevent heavy over-compression when raster output is far below slider target
  if (blob.size < targetSize * 0.6 && sliderValue <= 55) {
    quality = Math.min(0.95, quality + 0.2);
    scale = Math.min(1, scale + 0.12);
    console.log("[PDF Compress] retry lighter", { quality, scale });
    blob = await buildCompressedPdf(file, quality, scale, onProgress);
  }

  // Push harder when output is still above slider target
  if (blob.size > targetSize * 1.25 && sliderValue >= 55) {
    quality = Math.max(0.08, quality - 0.12);
    scale = Math.max(0.55, scale - 0.08);
    console.log("[PDF Compress] retry stronger", { quality, scale });
    blob = await buildCompressedPdf(file, quality, scale, onProgress);
  }

  return blob;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
