import type { Area } from "react-easy-crop";

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface CropTarget {
  width: number;
  height: number;
}

/** A4 PDF page content area with 10mm margins (210×297mm page). */
export const A4_PDF_CROP_TARGET: CropTarget = {
  width: 190,
  height: 277,
};

const DEFAULT_TOLERANCE = 0.015;

export function getAspectRatio(width: number, height: number): number {
  if (height <= 0) return 1;
  return width / height;
}

export function aspectRatiosMatch(
  imageWidth: number,
  imageHeight: number,
  targetWidth: number,
  targetHeight: number,
  tolerance = DEFAULT_TOLERANCE
): boolean {
  if (targetWidth <= 0 || targetHeight <= 0) return true;

  const imageRatio = getAspectRatio(imageWidth, imageHeight);
  const targetRatio = getAspectRatio(targetWidth, targetHeight);

  return Math.abs(imageRatio - targetRatio) / targetRatio < tolerance;
}

export function getImageDimensionsFromFile(
  file: File
): Promise<ImageDimensions> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}

export async function shouldShowCropUI(
  file: File,
  target: CropTarget
): Promise<boolean> {
  const dimensions = await getImageDimensionsFromFile(file);
  return !aspectRatiosMatch(
    dimensions.width,
    dimensions.height,
    target.width,
    target.height
  );
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", () => reject(new Error("Failed to load image")));
    image.crossOrigin = "anonymous";
    image.src = url;
  });
}

export async function getCroppedImageBlob(
  imageSrc: string,
  pixelCrop: Area,
  mimeType: string = "image/jpeg",
  quality = 0.92
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas failed");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Crop failed"))),
      mimeType,
      quality
    );
  });
}

export function getOutputMimeType(file: File): string {
  if (file.type === "image/png") return "image/png";
  if (file.type === "image/webp") return "image/webp";
  return "image/jpeg";
}

export async function createCroppedImageFile(
  imageSrc: string,
  pixelCrop: Area,
  originalFile: File
): Promise<File> {
  const mimeType = getOutputMimeType(originalFile);
  const blob = await getCroppedImageBlob(imageSrc, pixelCrop, mimeType);
  return new File([blob], originalFile.name, { type: mimeType });
}

export async function createCroppedPreviewUrl(
  imageSrc: string,
  pixelCrop: Area
): Promise<string> {
  const blob = await getCroppedImageBlob(imageSrc, pixelCrop, "image/jpeg", 0.85);
  return URL.createObjectURL(blob);
}
