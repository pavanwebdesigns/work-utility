export const MAX_BG_REMOVE_SIZE = 10 * 1024 * 1024;
export const ACCEPTED_BG_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const BG_REMOVE_MODEL = "isnet_fp16";
export const BG_REMOVE_FIRST_RUN_KEY = "bg-remove-model-loaded";

const IMGLY_CDN =
  "https://unpkg.com/@imgly/background-removal@1.7.0/dist/index.mjs";

type RemoveBackgroundFn = (
  image: Blob | string,
  configuration?: {
    proxyToWorker?: boolean;
    model?: string;
    output?: {
      format?: string;
      quality?: number;
      type?: string;
    };
    progress?: (key: string, current: number, total: number) => void;
  }
) => Promise<Blob>;

let removeBackgroundPromise: Promise<RemoveBackgroundFn> | null = null;

async function loadRemoveBackground(): Promise<RemoveBackgroundFn> {
  if (!removeBackgroundPromise) {
    removeBackgroundPromise = import(/* webpackIgnore: true */ IMGLY_CDN).then(
      (mod: { default: RemoveBackgroundFn }) => mod.default
    );
  }
  return removeBackgroundPromise;
}

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

export type BgRemoveCallbacks = {
  onStatus?: (message: string) => void;
  onProgress?: (percent: number) => void;
};

export async function removeBgInBrowser(
  file: File,
  callbacks: BgRemoveCallbacks = {}
): Promise<Blob> {
  const removeBackground = await loadRemoveBackground();
  callbacks.onStatus?.("Removing background...");

  try {
    return await removeBackground(file, {
      // Inference runs in imgly's internal Web Worker (off main thread).
      // Do NOT set publicPath — library defaults to staticimgly.com (valid resources.json).
      proxyToWorker: true,
      model: BG_REMOVE_MODEL,
      output: {
        format: "image/png",
        quality: 1,
        type: "foreground",
      },
      progress: (_key, current, total) => {
        if (total > 0) {
          callbacks.onProgress?.(Math.round((current / total) * 100));
        }
      },
    });
  } catch (err) {
    console.error("[bg-remove]", err);
    const message =
      err instanceof Error ? err.message : "Background removal failed.";
    if (message.includes("Resource metadata not found")) {
      throw new Error(
        "Could not load AI model files. Check your network connection and try again."
      );
    }
    throw new Error(
      message || "Background removal failed. Please try a different image."
    );
  }
}
