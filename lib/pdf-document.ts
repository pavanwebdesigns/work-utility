import { PDFDocument } from "pdf-lib";

const PDF_LOAD_OPTIONS = { ignoreEncryption: true } as const;

export async function loadPdfDocument(source: File | Uint8Array) {
  const bytes =
    source instanceof Uint8Array
      ? source
      : new Uint8Array(await source.arrayBuffer());
  return PDFDocument.load(bytes, PDF_LOAD_OPTIONS);
}

export async function getTotalPages(file: File): Promise<number> {
  const pdf = await loadPdfDocument(file);
  return pdf.getPageCount();
}
