const PDFJS_LEGACY_MODULE = "pdfjs-dist/legacy/build/pdf.mjs";

async function loadPdfJs() {
  const pdfjsLib = await import(PDFJS_LEGACY_MODULE);

  if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
    // Bundled at build time from node_modules/pdfjs-dist (see scripts/generate-sw.mjs).
    // Old code used pdf.js v3.11.174 CDN worker with pdfjs-dist v6 — version mismatch broke loading.
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  }

  return pdfjsLib;
}

export type PdfThumbnail = {
  pageNumber: number;
  dataUrl: string;
};

export async function renderPdfThumbnails(
  file: File,
  scale = 0.35,
): Promise<PdfThumbnail[]> {
  const pdfjsLib = await loadPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const results: PdfThumbnail[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    results.push({ pageNumber: i, dataUrl: canvas.toDataURL("image/jpeg", 0.85) });
  }

  return results;
}

export async function getPdfPageCount(file: File): Promise<number> {
  const pdfjsLib = await loadPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  return pdf.numPages;
}
