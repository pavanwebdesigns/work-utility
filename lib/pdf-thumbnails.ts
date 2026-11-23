import { getPdfDocument, loadPdfJs } from "@/lib/pdfjs-loader";

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
  const pdf = await getPdfDocument(pdfjsLib, arrayBuffer).promise;
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
  const pdf = await getPdfDocument(pdfjsLib, arrayBuffer).promise;
  return pdf.numPages;
}
