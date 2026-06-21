import { removeBackground, formatFileSize } from "@/lib/pdf-api";

export const MAX_BG_REMOVE_SIZE = 10 * 1024 * 1024;
export const ACCEPTED_BG_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function isAcceptedBgImage(file: File): boolean {
  return (
    ACCEPTED_BG_TYPES.includes(file.type) ||
    /\.(jpe?g|png|webp)$/i.test(file.name)
  );
}

export function validateBgRemoveFile(file: File): string | null {
  if (!isAcceptedBgImage(file)) {
    return "Please upload a JPG, PNG, or WebP image.";
  }
  if (file.size > MAX_BG_REMOVE_SIZE) {
    return "File too large. Maximum size is 10MB.";
  }
  return null;
}

export function getBgRemoveDownloadName(filename: string): string {
  const base = filename.replace(/\.[^.]+$/i, "") || "image";
  return `${base}-no-bg.png`;
}

export async function removeBg(file: File): Promise<Blob> {
  return removeBackground(file);
}

export { formatFileSize };
