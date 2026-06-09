import { PDFDocument } from "pdf-lib";

export async function mergePDFs(
  files: File[]
): Promise<{ blob: Blob; pageCount: number }> {
  const mergedPdf = await PDFDocument.create();
  let pageCount = 0;

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));
    pageCount += pdf.getPageCount();
  }

  const pdfBytes = await mergedPdf.save();
  return {
    blob: new Blob([Uint8Array.from(pdfBytes)], { type: "application/pdf" }),
    pageCount,
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
