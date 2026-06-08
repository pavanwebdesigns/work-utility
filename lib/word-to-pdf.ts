export async function convertWordToPdf(file: File): Promise<Blob> {
  const mammoth = await import("mammoth");
  const arrayBuffer = await file.arrayBuffer();

  const result = await mammoth.extractRawText({ arrayBuffer });
  const text = result.value;
  const lines = text.split("\n").filter((line) => line.trim());

  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;
  let y = 20;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  for (const line of lines) {
    const splitLines = doc.splitTextToSize(line.trim(), maxWidth);
    for (const splitLine of splitLines) {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(splitLine, margin, y);
      y += 7;
    }
    y += 2;
  }

  const pdfBytes = doc.output("arraybuffer");
  return new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
