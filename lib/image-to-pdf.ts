export async function convertImagesToPdf(files: File[]): Promise<Blob> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;

  for (let i = 0; i < files.length; i++) {
    if (i > 0) doc.addPage();

    const file = files[i];
    const dataUrl = await fileToDataUrl(file);

    const imgDimensions = await getImageDimensions(dataUrl);
    const maxW = pageWidth - margin * 2;
    const maxH = pageHeight - margin * 2;

    const ratio = Math.min(
      maxW / imgDimensions.width,
      maxH / imgDimensions.height
    );
    const imgW = imgDimensions.width * ratio;
    const imgH = imgDimensions.height * ratio;

    const x = (pageWidth - imgW) / 2;
    const y = (pageHeight - imgH) / 2;

    const format = file.type === "image/png" ? "PNG" : "JPEG";
    doc.addImage(dataUrl, format, x, y, imgW, imgH);
  }

  const pdfBytes = doc.output("arraybuffer");
  return new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getImageDimensions(
  dataUrl: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = () => reject(new Error("Image load failed"));
    img.src = dataUrl;
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
