import { PDFDocument, degrees } from "pdf-lib";

export type PageRotation = 0 | 90 | 180 | 270;

export async function applyPageRotations(
  file: File,
  pageRotations: PageRotation[],
): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();

  pages.forEach((page, index) => {
    const rotation = pageRotations[index] ?? 0;
    page.setRotation(degrees(rotation));
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([Uint8Array.from(pdfBytes)], { type: "application/pdf" });
}

export function rotateClockwise(current: PageRotation): PageRotation {
  return ((current + 90) % 360) as PageRotation;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
