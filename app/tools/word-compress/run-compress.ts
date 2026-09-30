import * as Comlink from "comlink";
import type {
  OfficeCompressLevel,
  OfficeCompressProgress,
  OfficeCompressResult,
} from "@/lib/office-compress";

export type WordCompressOptions = {
  level: OfficeCompressLevel;
  removeEmbeddedFonts?: boolean;
};

type WorkerApi = {
  compressOfficeFile: (
    file: ArrayBuffer,
    options: WordCompressOptions,
    onProgress?: (progress: OfficeCompressProgress) => void,
  ) => Promise<OfficeCompressResult>;
};

const FRIENDLY_ERRORS = [
  "This file is password-protected or in old .doc format",
  "This file is not a Word document.",
];

export function friendlyCompressError(error: unknown): string | null {
  if (!(error instanceof Error)) return null;
  return FRIENDLY_ERRORS.find((message) => error.message.includes(message)) ?? null;
}

async function compressOnMainThread(
  file: ArrayBuffer,
  options: WordCompressOptions,
  onProgress?: (progress: OfficeCompressProgress) => void,
): Promise<OfficeCompressResult> {
  const { compressOfficeFile } = await import("@/lib/office-compress");
  return compressOfficeFile(file, options, onProgress);
}

export async function runWordCompress(
  file: ArrayBuffer,
  options: WordCompressOptions,
  onProgress?: (progress: OfficeCompressProgress) => void,
): Promise<OfficeCompressResult> {
  if (typeof Worker === "undefined" || typeof OffscreenCanvas === "undefined") {
    return compressOnMainThread(file, options, onProgress);
  }

  let worker: Worker;
  try {
    worker = new Worker(
      new URL("../../../workers/office-compress.worker.ts", import.meta.url),
    );
  } catch {
    return compressOnMainThread(file, options, onProgress);
  }

  let failedToStart = false;
  const markStartFailure = () => {
    failedToStart = true;
  };
  worker.addEventListener("error", markStartFailure);

  try {
    const api = Comlink.wrap<WorkerApi>(worker);
    return await api.compressOfficeFile(
      file,
      options,
      onProgress ? Comlink.proxy(onProgress) : undefined,
    );
  } catch (error) {
    if (failedToStart) {
      return compressOnMainThread(file, options, onProgress);
    }
    throw error;
  } finally {
    worker.removeEventListener("error", markStartFailure);
    worker.terminate();
  }
}
