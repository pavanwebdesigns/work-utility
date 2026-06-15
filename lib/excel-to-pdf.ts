export async function convertExcelToPdf(file: File): Promise<Blob> {
  const XLSX = await import("xlsx");
  const { jsPDF } = await import("jspdf");

  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;

  workbook.SheetNames.forEach((sheetName, sheetIndex) => {
    if (sheetIndex > 0) doc.addPage();

    const sheet = workbook.Sheets[sheetName];
    const data: string[][] = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: "",
    }) as string[][];

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 58, 110);
    doc.text(sheetName, margin, margin + 5);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);

    let y = margin + 14;
    const lineHeight = 6;
    const maxWidth = pageWidth - margin * 2;

    data.forEach((row, rowIndex) => {
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin + 5;
      }

      const rowText = Array.isArray(row)
        ? row.map((cell) => String(cell ?? "")).join("  |  ")
        : "";

      if (rowIndex === 0) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(30, 30, 30);
      } else {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(80, 80, 80);
      }

      const lines = doc.splitTextToSize(rowText, maxWidth);
      doc.text(lines, margin, y);
      y += lineHeight * lines.length;
    });
  });

  const pdfBytes = doc.output("arraybuffer");
  return new Blob([pdfBytes], { type: "application/pdf" });
}

export async function getExcelSheetCount(file: File): Promise<number> {
  const XLSX = await import("xlsx");
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  return workbook.SheetNames.length;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
