import imageCompression from "browser-image-compression";

export type ImageQuality = "low" | "medium" | "high";

export async function compressImage(
  file: File,
  quality: ImageQuality
): Promise<File> {
  const options = {
    low: { maxSizeMB: 0.3, maxWidthOrHeight: 1280, useWebWorker: true },
    medium: { maxSizeMB: 0.8, maxWidthOrHeight: 1920, useWebWorker: true },
    high: { maxSizeMB: 1.5, maxWidthOrHeight: 2560, useWebWorker: true },
  };
  return await imageCompression(file, options[quality]);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
