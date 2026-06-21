export const MAX_BG_REMOVE_SIZE = 10 * 1024 * 1024;
export const ACCEPTED_BG_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const BG_REMOVE_MODEL = "isnet_fp16";
export const BG_REMOVE_FIRST_RUN_KEY = "bg-remove-model-loaded";

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

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export function hasBgRemoveModelLoaded(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(BG_REMOVE_FIRST_RUN_KEY) === "1";
}

export function markBgRemoveModelLoaded(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BG_REMOVE_FIRST_RUN_KEY, "1");
}

export type BgRemoveWorkerEvent =
  | { type: "STATUS"; payload: string }
  | { type: "PROGRESS"; payload: number }
  | { type: "SUCCESS"; payload: Blob }
  | { type: "ERROR"; payload: string };

export function createBgRemoveWorker(): Worker {
  return new Worker("/workers/bg-remove.worker.js", { type: "module" });
}
