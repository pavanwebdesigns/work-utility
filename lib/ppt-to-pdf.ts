import JSZip from "jszip";
import { jsPDF } from "jspdf";

export interface SlideData {
  slideNumber: number;
  text: string[];
}

export async function convertPptToPdf(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;

  const slideFiles = Object.keys(zip.files)
    .filter((name) => name.match(/ppt\/slides\/slide\d+\.xml$/))
    .sort((a, b) => {
      const numA = parseInt(a.match(/slide(\d+)/)?.[1] || "0");
      const numB = parseInt(b.match(/slide(\d+)/)?.[1] || "0");
      return numA - numB;
    });

  if (slideFiles.length === 0) {
    throw new Error("No slides found. Please upload a valid .pptx file.");
  }

  for (let i = 0; i < slideFiles.length; i++) {
    if (i > 0) doc.addPage();

    const slideXml = await zip.files[slideFiles[i]].async("text");

    const textMatches = slideXml.match(/<a:t[^>]*>([^<]*)<\/a:t>/g) || [];
    const texts = textMatches
      .map((t) => t.replace(/<[^>]+>/g, "").trim())
      .filter((t) => t.length > 0);

    doc.setFillColor(30, 58, 110);
    doc.rect(0, 0, pageWidth, 18, "F");
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(`Slide ${i + 1} of ${slideFiles.length}`, margin, 12);

    let y = 30;
    doc.setTextColor(40, 40, 40);

    texts.forEach((text, idx) => {
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      if (idx === 0) {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(30, 58, 110);
      } else {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(60, 60, 60);
      }

      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, margin, y);
      y += (idx === 0 ? 10 : 7) * lines.length;
    });
  }

  const pdfBytes = doc.output("arraybuffer");
  return new Blob([pdfBytes], { type: "application/pdf" });
}

export async function getPptSlideCount(file: File): Promise<number> {
  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);
  return Object.keys(zip.files).filter((name) =>
    name.match(/ppt\/slides\/slide\d+\.xml$/),
  ).length;
}

export function getSlideCount(slideFiles: string[]): number {
  return slideFiles.length;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
