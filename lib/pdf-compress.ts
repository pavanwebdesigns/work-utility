import { PDFDocument } from "pdf-lib";

export type CompressLevel = "low" | "medium" | "high";

export async function compressPDF(
  file: File,
  level: CompressLevel
): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, {
    updateMetadata: false,
  });

  pdfDoc.setTitle("");
  pdfDoc.setAuthor("");
  pdfDoc.setSubject("");
  pdfDoc.setKeywords([]);
  pdfDoc.setProducer("");
  pdfDoc.setCreator("");

  const compressOptions = {
    low: { useObjectStreams: false },
    medium: { useObjectStreams: true },
    high: { useObjectStreams: true },
  };

  const pdfBytes = await pdfDoc.save(compressOptions[level]);
  return new Blob([Uint8Array.from(pdfBytes)], { type: "application/pdf" });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
