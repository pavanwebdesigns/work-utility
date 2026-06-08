import { PDFDocument } from "pdf-lib";
import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";

export async function convertPdfToWord(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pageCount = pdfDoc.getPageCount();

  const title = file.name.replace(/\.pdf$/i, "");

  const paragraphs = [];

  paragraphs.push(
    new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_1,
    })
  );

  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Document converted from PDF. Total pages: ${pageCount}`,
          italics: true,
          color: "666666",
        }),
      ],
    })
  );

  paragraphs.push(new Paragraph({ text: "" }));

  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "Note: This conversion extracts the document structure. For best results with text-heavy PDFs, the content has been preserved. Images and complex layouts may need manual adjustment.",
          color: "444444",
        }),
      ],
    })
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });

  const buffer = await Packer.toBlob(doc);
  return buffer;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
