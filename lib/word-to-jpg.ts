export type WordToJpgResult = {
  blob: Blob;
  /** Single continuous JPG of the full rendered document height */
  outputMode: "single-image-full-document";
};

const DOC_WIDTH_PX = 794;

export async function convertWordToJpg(file: File): Promise<WordToJpgResult> {
  const mammoth = await import("mammoth");
  const html2canvas = (await import("html2canvas")).default;

  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.convertToHtml({ arrayBuffer });

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-10000px";
  container.style.top = "0";
  container.style.width = `${DOC_WIDTH_PX}px`;
  container.style.padding = "48px";
  container.style.background = "#ffffff";
  container.style.color = "#111827";
  container.style.fontFamily =
    'Georgia, "Times New Roman", Times, serif';
  container.style.fontSize = "16px";
  container.style.lineHeight = "1.6";
  container.style.boxSizing = "border-box";
  container.innerHTML = result.value;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      logging: false,
      width: DOC_WIDTH_PX,
      height: container.scrollHeight,
      windowWidth: DOC_WIDTH_PX,
      windowHeight: container.scrollHeight,
    });

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (value) => {
          if (value) resolve(value);
          else reject(new Error("Failed to create JPG image."));
        },
        "image/jpeg",
        0.92
      );
    });

    return {
      blob,
      outputMode: "single-image-full-document",
    };
  } finally {
    document.body.removeChild(container);
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
