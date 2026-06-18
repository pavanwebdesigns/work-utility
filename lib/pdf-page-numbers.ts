import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export type PageNumberPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type PageNumberFormat = "number" | "page-x" | "page-x-of-y";

export type PageNumberOptions = {
  position: PageNumberPosition;
  startNumber: number;
  format: PageNumberFormat;
  skipFirstPage: boolean;
};

function formatPageLabel(
  pageNum: number,
  total: number,
  format: PageNumberFormat,
): string {
  if (format === "number") return String(pageNum);
  if (format === "page-x") return `Page ${pageNum}`;
  return `Page ${pageNum} of ${total}`;
}

function getTextPosition(
  position: PageNumberPosition,
  pageWidth: number,
  pageHeight: number,
  textWidth: number,
  fontSize: number,
): { x: number; y: number } {
  const margin = 28;
  const isTop = position.startsWith("top");
  const y = isTop ? pageHeight - margin : margin + fontSize;

  if (position.endsWith("left")) return { x: margin, y };
  if (position.endsWith("right")) return { x: pageWidth - margin - textWidth, y };
  return { x: (pageWidth - textWidth) / 2, y };
}

export async function addPageNumbers(
  file: File,
  options: PageNumberOptions,
): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const total = pages.length;
  const fontSize = 11;
  const color = rgb(0.25, 0.25, 0.25);

  pages.forEach((page, index) => {
    if (options.skipFirstPage && index === 0) return;

    const pageNum =
      options.startNumber + (options.skipFirstPage ? index - 1 : index);
    const label = formatPageLabel(pageNum, total, options.format);
    const textWidth = font.widthOfTextAtSize(label, fontSize);
    const { width, height } = page.getSize();
    const { x, y } = getTextPosition(
      options.position,
      width,
      height,
      textWidth,
      fontSize,
    );

    page.drawText(label, { x, y, size: fontSize, font, color });
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([Uint8Array.from(pdfBytes)], { type: "application/pdf" });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
