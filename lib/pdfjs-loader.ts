/**
 * Shared PDF.js loader. Always disables eval (CVE-2024-4367 / GHSA-…).
 * `isEvalSupported` was removed from public types in pdfjs-dist 6.x because
 * the library no longer uses eval; we still pass it for defense-in-depth.
 */
export async function loadPdfJs() {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

  if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
    // Copied from node_modules at build/dev time (scripts/generate-sw.mjs).
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  }

  return pdfjsLib;
}

type PdfJsLib = Awaited<ReturnType<typeof loadPdfJs>>;

export function getPdfDocument(
  pdfjsLib: PdfJsLib,
  arrayBuffer: ArrayBuffer,
) {
  return pdfjsLib.getDocument({
    data: arrayBuffer,
    // pdfjs-dist ≥4.2.67 fixed CVE-2024-4367; 6.x dropped the option from
    // DocumentInitParameters because eval paths were removed. Keep setting it.
    ...({ isEvalSupported: false } as object),
  } as Parameters<PdfJsLib["getDocument"]>[0]);
}
