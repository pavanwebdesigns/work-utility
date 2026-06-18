import {
  PDFDocument,
  StandardFonts,
  rgb,
  degrees,
  type PDFPage,
  type PDFFont,
  type PDFImage,
} from "pdf-lib";

export type WatermarkType = "text" | "image";

export type TextWatermarkOptions = {
  type: "text";
  text: string;
  fontSize: number;
  color: string;
  opacity: number;
  rotation: number;
  tiled: boolean;
};

export type ImageWatermarkOptions = {
  type: "image";
  imageBytes: Uint8Array;
  imageMime: string;
  opacity: number;
  scale: number;
  tiled: boolean;
  rotation: number;
};

export type WatermarkOptions = TextWatermarkOptions | ImageWatermarkOptions;

function hexToRgb(hex: string) {
  const cleaned = hex.replace("#", "");
  const num = parseInt(cleaned, 16);
  return rgb(
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255,
  );
}

function drawTextWatermark(
  page: PDFPage,
  font: PDFFont,
  options: TextWatermarkOptions,
) {
  const { width, height } = page.getSize();
  const color = hexToRgb(options.color);
  const textWidth = font.widthOfTextAtSize(options.text, options.fontSize);

  const drawOne = (x: number, y: number) => {
    page.drawText(options.text, {
      x,
      y,
      size: options.fontSize,
      font,
      color,
      opacity: options.opacity,
      rotate: degrees(options.rotation),
    });
  };

  if (options.tiled) {
    const stepX = textWidth + 80;
    const stepY = options.fontSize + 60;
    for (let y = -height; y < height * 2; y += stepY) {
      for (let x = -width; x < width * 2; x += stepX) {
        drawOne(x, y);
      }
    }
  } else {
    drawOne((width - textWidth) / 2, height / 2);
  }
}

function drawImageWatermark(
  page: PDFPage,
  image: PDFImage,
  options: ImageWatermarkOptions,
) {
  const { width, height } = page.getSize();
  const imgW = image.width * options.scale;
  const imgH = image.height * options.scale;

  const drawOne = (x: number, y: number) => {
    page.drawImage(image, {
      x,
      y,
      width: imgW,
      height: imgH,
      opacity: options.opacity,
      rotate: degrees(options.rotation),
    });
  };

  if (options.tiled) {
    const stepX = imgW + 40;
    const stepY = imgH + 40;
    for (let y = 0; y < height; y += stepY) {
      for (let x = 0; x < width; x += stepX) {
        drawOne(x, y);
      }
    }
  } else {
    drawOne((width - imgW) / 2, (height - imgH) / 2);
  }
}

export async function applyWatermark(
  file: File,
  options: WatermarkOptions,
): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();

  if (options.type === "text") {
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    pages.forEach((page) => drawTextWatermark(page, font, options));
  } else {
    const image =
      options.imageMime === "image/png"
        ? await pdfDoc.embedPng(options.imageBytes)
        : await pdfDoc.embedJpg(options.imageBytes);
    pages.forEach((page) => drawImageWatermark(page, image, options));
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([Uint8Array.from(pdfBytes)], { type: "application/pdf" });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
