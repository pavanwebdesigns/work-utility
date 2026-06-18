"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  Loader2,
  RotateCw,
  Upload,
  UploadCloud,
  X,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { renderPdfThumbnails } from "@/lib/pdf-thumbnails";
import {
  applyPageRotations,
  formatFileSize,
  rotateClockwise,
  type PageRotation,
} from "@/lib/pdf-rotate";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const howItWorksSteps = [
  { step: "01", icon: Upload, title: "Upload", description: "Select your PDF file" },
  { step: "02", icon: RotateCw, title: "Rotate", description: "Rotate pages individually or all at once" },
  { step: "03", icon: Download, title: "Download", description: "Get your corrected PDF instantly" },
];

export default function PdfRotatePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [thumbnails, setThumbnails] = useState<{ pageNumber: number; dataUrl: string }[]>([]);
  const [rotations, setRotations] = useState<PageRotation[]>([]);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const resetOutput = useCallback(() => {
    setOutputBlob(null);
    setError(null);
  }, []);

  const handleFileSelect = async (selected: File) => {
    if (selected.type !== "application/pdf" && !selected.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF files are supported.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("PDF must be 50MB or smaller.");
      return;
    }

    setFile(selected);
    resetOutput();
    setIsLoading(true);

    try {
      const thumbs = await renderPdfThumbnails(selected);
      setThumbnails(thumbs);
      setRotations(thumbs.map(() => 0 as PageRotation));
    } catch {
      setError("Unable to read PDF. The file may be corrupted or password-protected.");
      setFile(null);
      setThumbnails([]);
    } finally {
      setIsLoading(false);
    }
  };

  const rotatePage = (index: number) => {
    setRotations((prev) => {
      const next = [...prev];
      next[index] = rotateClockwise(next[index] ?? 0);
      return next;
    });
    resetOutput();
  };

  const rotateAll = () => {
    setRotations((prev) => prev.map((r) => rotateClockwise(r)));
    resetOutput();
  };

  const handleApply = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    try {
      const blob = await applyPageRotations(file, rotations);
      setOutputBlob(blob);
    } catch {
      setError("Rotation failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputBlob || !file) return;
    const url = URL.createObjectURL(outputBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `rotated_${file.name}`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setFile(null);
    setThumbnails([]);
    setRotations([]);
    resetOutput();
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary">
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <div className="pt-10 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-pdf/10">
                <RotateCw className="h-6 w-6 text-tool-pdf" strokeWidth={1.75} />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                Rotate PDF Pages Online Free
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Fix sideways or upside-down scanned pages. Rotate individual pages or the whole document — runs in your browser.
              </p>
              <div className="mt-4 flex justify-center">
                <FavoriteButton slug="pdf-rotate" />
              </div>
            </div>

            <div className="mt-10 space-y-6">
              <input ref={inputRef} type="file" accept="application/pdf,.pdf" className="hidden" aria-label="Upload PDF"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); e.target.value = ""; }} />

              {!file && (
                <button type="button" aria-label="File upload area" onClick={() => inputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                  onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if (f) handleFileSelect(f); }}
                  className={`flex min-h-[160px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-surface-card p-12 transition-colors sm:min-h-[200px] ${isDragging ? "border-tool-pdf" : "border-tool-pdf/30 hover:border-tool-pdf"}`}>
                  <UploadCloud className="mb-4 h-10 w-10 text-content-muted" />
                  <p className="font-medium text-content-primary">Drop your PDF here</p>
                  <p className="mt-1 text-sm text-content-secondary">or click to browse — max 50MB</p>
                </button>
              )}

              {isLoading && (
                <div className="flex items-center justify-center gap-2 py-12 text-content-secondary">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading page previews...
                </div>
              )}

              {file && thumbnails.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl border border-surface-border bg-surface-card px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-content-primary">{file.name}</p>
                      <p className="text-xs text-content-secondary">{formatFileSize(file.size)} · {thumbnails.length} pages</p>
                    </div>
                    <button type="button" onClick={handleClear} aria-label="Remove file" className="ml-2 rounded-lg p-2 text-content-muted hover:bg-surface-elevated">
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <button type="button" onClick={rotateAll}
                    className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm font-medium text-content-primary transition-colors hover:border-tool-pdf">
                    Rotate all pages 90° clockwise
                  </button>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {thumbnails.map((thumb, index) => (
                      <div key={thumb.pageNumber} className="rounded-xl border border-surface-border bg-surface-card p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-semibold text-content-muted">Page {thumb.pageNumber}</span>
                          <span className="text-xs text-content-secondary">{rotations[index]}°</span>
                        </div>
                        <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-lg bg-surface-base">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={thumb.dataUrl} alt={`Preview of PDF page ${thumb.pageNumber}`}
                            className="max-h-full max-w-full object-contain transition-transform duration-200"
                            style={{ transform: `rotate(${rotations[index]}deg)` }} />
                        </div>
                        <button type="button" onClick={() => rotatePage(index)}
                          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-surface-border py-2 text-xs font-medium text-content-primary hover:border-tool-pdf">
                          <RotateCw className="h-3.5 w-3.5" />
                          Rotate 90°
                        </button>
                      </div>
                    ))}
                  </div>

                  {!outputBlob && (
                    <button type="button" onClick={handleApply} disabled={isProcessing}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-tool-pdf px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-[#DC2626] disabled:opacity-70">
                      {isProcessing ? <><Loader2 className="h-5 w-5 animate-spin" />Applying rotation...</> : "Apply & Preview Download"}
                    </button>
                  )}

                  {outputBlob && (
                    <div className="space-y-3">
                      <div className="rounded-xl border border-surface-border bg-surface-card p-5 text-center">
                        <p className="text-sm text-content-secondary">Output size</p>
                        <p className="mt-1 text-xl font-bold text-content-primary">{formatFileSize(outputBlob.size)}</p>
                      </div>
                      <button type="button" onClick={handleDownload}
                        className="w-full rounded-xl bg-tool-convert px-4 py-4 text-base font-semibold text-white hover:bg-[#059669]">
                        Download Rotated PDF
                      </button>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-tool-pdf bg-tool-pdf/5 px-4 py-3 text-center text-sm text-tool-pdf">{error}</div>
              )}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div key={step.title} className="rounded-xl border border-surface-border bg-surface-card p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-pdf/10">
                    <step.icon className="h-5 w-5 text-tool-pdf" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="pdf-rotate" />
          <ToolFeedback toolName="PDF Rotate" />
          <ToolSeoContent slug="pdf-rotate" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
