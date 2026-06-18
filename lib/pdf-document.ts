import { PDFDocument } from "pdf-lib";

const PDF_LOAD_OPTIONS = { ignoreEncryption: true } as const;

export async function loadPdfDocument(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  return PDFDocument.load(arrayBuffer, PDF_LOAD_OPTIONS);
}

export async function getTotalPages(file: File): Promise<number> {
  const pdf = await loadPdfDocument(file);
  return pdf.getPageCount();
}
