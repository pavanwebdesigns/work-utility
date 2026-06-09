export interface PageImage {
  blob: Blob;
  pageNumber: number;
  filename: string;
  previewUrl?: string;
}

export type PdfToJpgQuality = "low" | "medium" | "high";

const QUALITY_SCALE: Record<PdfToJpgQuality, number> = {
  low: 1.0,
  medium: 1.5,
  high: 2.0,
};

const QUALITY_JPEG: Record<PdfToJpgQuality, number> = {
  low: 0.85,
  medium: 0.92,
  high: 0.95,
};

async function loadPdfJs() {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
  return pdfjsLib;
}

export async function getPDFPageCount(file: File): Promise<number> {
  const pdfjsLib = await loadPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  return pdf.numPages;
}

export async function convertPDFToJPG(
  file: File,
  qualityLevel: PdfToJpgQuality = "medium"
): Promise<PageImage[]> {
  const pdfjsLib = await loadPdfJs();
  const scale = QUALITY_SCALE[qualityLevel];
  const jpegQuality = QUALITY_JPEG[qualityLevel];
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const results: PageImage[] = [];
  const baseName = file.name.replace(/\.pdf$/i, "");

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;

    await page.render({ canvasContext: ctx, viewport, canvas }).promise;

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Conversion failed"))),
        "image/jpeg",
        jpegQuality
      );
    });

    results.push({
      blob,
      pageNumber: i,
      filename: `${baseName}_page_${i}.jpg`,
    });
  }

  return results;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
