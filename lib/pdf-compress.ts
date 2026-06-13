const GHOSTSCRIPT_VERSION = "1.0.1";

export type GhostscriptPreset = "/screen" | "/ebook" | "/printer";

export type CompressProgress = {
  currentPage: number;
  totalPages: number;
  percent: number;
  message: string;
};

export type PdfCompressErrorCode =
  | "PASSWORD_PROTECTED"
  | "INVALID_PDF"
  | "COMPRESSION_FAILED";

export class PdfCompressError extends Error {
  code: PdfCompressErrorCode;

  constructor(code: PdfCompressErrorCode, message?: string) {
    super(message ?? code);
    this.code = code;
    this.name = "PdfCompressError";
  }
}

type GhostscriptModule = {
  FS: {
    writeFile: (path: string, data: Uint8Array) => void;
    readFile: (path: string) => Uint8Array;
    unlink: (path: string) => void;
  };
  run: (args?: string[]) => void;
  callMain?: (args: string[]) => number;
};

let gsModulePromise: Promise<GhostscriptModule> | null = null;

function clampSliderValue(value: number): number {
  if (!Number.isFinite(value)) return 50;
  return Math.min(90, Math.max(10, Math.round(value)));
}

export function getPdfSettings(sliderValue: number): GhostscriptPreset {
  const value = clampSliderValue(sliderValue);
  if (value <= 30) return "/screen";
  if (value <= 60) return "/ebook";
  return "/printer";
}

export function getCompressionSettings(sliderValue: number): {
  quality: GhostscriptPreset;
  scale: GhostscriptPreset;
  pdfSettings: GhostscriptPreset;
} {
  const pdfSettings = getPdfSettings(sliderValue);
  const value = clampSliderValue(sliderValue);

  console.log(`Slider: ${value}%, PDFSETTINGS: ${pdfSettings}`);

  return { quality: pdfSettings, scale: pdfSettings, pdfSettings };
}

export function estimateCompressedSize(
  originalSize: number,
  sliderValue: number
): number {
  const value = clampSliderValue(sliderValue);
  const reductionFactor = ((100 - value) / 100) * 0.88;
  return Math.round(originalSize * (1 - reductionFactor));
}

function logCompressionError(error: unknown) {
  console.error("Compression error details:", error);
  if (error instanceof Error) {
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
  }
}

function isPasswordError(message: string): boolean {
  return /password/i.test(message) || /encrypted/i.test(message);
}

function isInvalidPdfError(message: string): boolean {
  return (
    /invalid/i.test(message) ||
    /corrupt/i.test(message) ||
    /syntax error/i.test(message) ||
    /not a pdf/i.test(message)
  );
}

function toPdfCompressError(error: unknown): PdfCompressError {
  if (error instanceof PdfCompressError) return error;

  const message = error instanceof Error ? error.message : String(error);

  if (isPasswordError(message)) {
    return new PdfCompressError("PASSWORD_PROTECTED");
  }
  if (isInvalidPdfError(message)) {
    return new PdfCompressError("INVALID_PDF");
  }
  if (error instanceof Error) {
    return new PdfCompressError("COMPRESSION_FAILED", error.message);
  }
  return new PdfCompressError("COMPRESSION_FAILED");
}

async function loadGhostscript(): Promise<GhostscriptModule> {
  if (!gsModulePromise) {
    gsModulePromise = (async () => {
      const initGs = (await import("ghostscript-wasm-esm")).default;
      const gs = (await initGs({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/ghostscript-wasm-esm@${GHOSTSCRIPT_VERSION}/${file}`,
      })) as unknown as GhostscriptModule;

      console.log("Ghostscript WASM loaded");
      return gs;
    })();
  }

  return gsModulePromise;
}

function runGhostscript(
  gs: GhostscriptModule,
  inputBytes: Uint8Array,
  pdfSettings: GhostscriptPreset
): Uint8Array {
  const inputPath = "/input.pdf";
  const outputPath = "/output.pdf";

  gs.FS.writeFile(inputPath, inputBytes);

  const args = [
    "-sDEVICE=pdfwrite",
    "-dCompatibilityLevel=1.4",
    `-dPDFSETTINGS=${pdfSettings}`,
    "-dNOPAUSE",
    "-dQUIET",
    "-dBATCH",
    `-sOutputFile=${outputPath}`,
    inputPath,
  ];

  console.log("Ghostscript args:", args.join(" "));

  try {
    if (typeof gs.callMain === "function") {
      gs.callMain(args);
    } else {
      gs.run(args);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(message || "Ghostscript compression failed");
  }

  let outputBytes: Uint8Array;
  try {
    outputBytes = gs.FS.readFile(outputPath);
  } catch {
    throw new Error("Ghostscript did not produce an output file");
  }

  try {
    gs.FS.unlink(inputPath);
    gs.FS.unlink(outputPath);
  } catch {
    // ignore cleanup errors
  }

  return outputBytes;
}

export async function compressPDF(
  file: File,
  sliderValue: number,
  onProgress?: (progress: CompressProgress) => void
): Promise<Blob> {
  const value = clampSliderValue(sliderValue);
  const { pdfSettings } = getCompressionSettings(value);

  try {
    console.log("Starting compression with:", {
      sliderValue: value,
      pdfSettings,
    });
    console.log("Original size:", file.size);

    onProgress?.({
      currentPage: 0,
      totalPages: 1,
      percent: 5,
      message: "Loading compression engine...",
    });

    const gs = await loadGhostscript();

    onProgress?.({
      currentPage: 0,
      totalPages: 1,
      percent: 20,
      message: `Compressing with ${pdfSettings} preset... please wait`,
    });

    const inputBytes = new Uint8Array(await file.arrayBuffer());
    const outputBytes = runGhostscript(gs, inputBytes, pdfSettings);

    onProgress?.({
      currentPage: 1,
      totalPages: 1,
      percent: 100,
      message: "Compression complete",
    });

    console.log("Compressed size:", outputBytes.byteLength);

    return new Blob([outputBytes as BlobPart], { type: "application/pdf" });
  } catch (error) {
    logCompressionError(error);
    throw toPdfCompressError(error);
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export function formatEstimatedFileSize(bytes: number): string {
  return `~${formatFileSize(bytes)}`;
}
