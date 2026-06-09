import { PDFDocument } from "pdf-lib";

export async function checkPDFPassword(file: File): Promise<boolean> {
  const arrayBuffer = await file.arrayBuffer();
  try {
    await PDFDocument.load(arrayBuffer);
    return false;
  } catch {
    return true;
  }
}

export async function unlockPDF(
  file: File,
  password: string = ""
): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();

  try {
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      password: password || undefined,
      ignoreEncryption: !password,
    } as Parameters<typeof PDFDocument.load>[1]);

    const pdfBytes = await pdfDoc.save();
    return new Blob([Uint8Array.from(pdfBytes)], { type: "application/pdf" });
  } catch {
    throw new Error("Incorrect password or unable to unlock this PDF.");
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
