import { PDFDocument } from "pdf-lib";

export interface SplitResult {
  blob: Blob;
  pageNumber: number;
  filename: string;
}

export async function splitPDF(
  file: File,
  pages: number[]
): Promise<SplitResult[]> {
  const arrayBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(arrayBuffer);
  const totalPages = sourcePdf.getPageCount();
  const results: SplitResult[] = [];

  const pagesToExtract =
    pages.length > 0
      ? pages.map((p) => p - 1).filter((p) => p >= 0 && p < totalPages)
      : Array.from({ length: totalPages }, (_, i) => i);

  for (const pageIndex of pagesToExtract) {
    const newPdf = await PDFDocument.create();
    const [page] = await newPdf.copyPages(sourcePdf, [pageIndex]);
    newPdf.addPage(page);
    const pdfBytes = await newPdf.save();
    results.push({
      blob: new Blob([Uint8Array.from(pdfBytes)], { type: "application/pdf" }),
      pageNumber: pageIndex + 1,
      filename: `page_${pageIndex + 1}_${file.name}`,
    });
  }

  return results;
}

export async function getTotalPages(file: File): Promise<number> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  return pdf.getPageCount();
}

export function parsePageInput(input: string): number[] {
  const pages = new Set<number>();
  const parts = input.split(",").map((part) => part.trim());

  for (const part of parts) {
    if (!part) continue;

    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-").map((s) => s.trim());
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (Number.isNaN(start) || Number.isNaN(end)) continue;
      for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
        pages.add(i);
      }
    } else {
      const num = parseInt(part, 10);
      if (!Number.isNaN(num)) pages.add(num);
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
