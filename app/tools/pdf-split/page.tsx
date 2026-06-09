"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import JSZip from "jszip";
import {
  Download,
  FileDown,
  Loader2,
  Scissors,
  SlidersHorizontal,
  Upload,
  UploadCloud,
  X,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { DinoGame } from "@/components/DinoGame";
import {
  formatFileSize,
  getTotalPages,
  parsePageInput,
  splitPDF,
  type SplitResult,
} from "@/lib/pdf-split";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const howItWorksSteps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload",
    description: "Select your PDF file",
  },
  {
    step: "02",
    icon: SlidersHorizontal,
    title: "Choose",
    description: "Split all pages or select specific ones",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Download individual pages or all as ZIP",
  },
];

export default function PdfSplitPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [mode, setMode] = useState<"all" | "custom">("all");
  const [pageInput, setPageInput] = useState("");
  const [splitResults, setSplitResults] = useState<SplitResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const resetResult = useCallback(() => {
    setSplitResults([]);
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
    resetResult();
    setError(null);
    setMode("all");
    setPageInput("");

    try {
      const count = await getTotalPages(selected);
      setTotalPages(count);
    } catch {
      setError("Unable to read PDF. The file may be corrupted or password-protected.");
      setFile(null);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) handleFileSelect(selected);
    event.target.value = "";
  };

  const handleClear = () => {
    setFile(null);
    setTotalPages(0);
    resetResult();
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSplit = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    resetResult();

    try {
      const pages =
        mode === "all" ? [] : parsePageInput(pageInput);

      if (mode === "custom" && pages.length === 0) {
        setError("Enter valid page numbers (e.g. 1, 3, 5-7, 10).");
        setIsProcessing(false);
        return;
      }

      const results = await splitPDF(file, pages);
      setSplitResults(results);
    } catch {
      setError("Split failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadSingle = (result: SplitResult) => {
    const url = URL.createObjectURL(result.blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = result.filename;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const downloadAllZip = async () => {
    const zip = new JSZip();
    splitResults.forEach((result) => {
      zip.file(result.filename, result.blob);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `split_${Date.now()}.zip`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <div className="pt-10 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-pdf/10">
                <Scissors className="h-6 w-6 text-tool-pdf" strokeWidth={1.75} />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                PDF Split
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Extract pages from a PDF or split into individual files. Runs
                in your browser.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf,.pdf"
                aria-label="Upload PDF file" className="hidden"
                onChange={handleInputChange}
              />

              {!file && (
                <button
                  type="button"
                 aria-label="File upload area" onClick={() => inputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const dropped = e.dataTransfer.files?.[0];
                    if (dropped) handleFileSelect(dropped);
                  }}
                  className={`flex min-h-[160px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-surface-card p-12 transition-colors sm:min-h-[200px] ${
                    isDragging
                      ? "border-tool-pdf"
                      : "border-tool-pdf/30 hover:border-tool-pdf"
                  }`}
                >
                  <UploadCloud className="mb-4 h-10 w-10 text-content-muted" />
                  <p className="font-medium text-content-primary">Drop your PDF here</p>
                  <p className="mt-1 text-sm text-content-secondary">
                    or click to browse — max 50MB
                  </p>
                </button>
              )}

              {file && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-card p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-tool-pdf/10">
                      <FileDown className="h-5 w-5 text-tool-pdf" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-content-primary">
                        {file.name}
                      </p>
                      <p className="text-xs text-content-secondary">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleClear}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-tool-pdf transition-colors hover:bg-tool-pdf/10"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-3 text-center text-sm text-content-secondary">
                    {totalPages} pages detected
                  </div>

                  {splitResults.length === 0 && (
                    <>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={() => setMode("all")}
                          className={`rounded-xl border p-4 text-left transition-colors ${
                            mode === "all"
                              ? "border-tool-pdf bg-tool-pdf/10"
                              : "border-surface-border bg-surface-card hover:border-tool-pdf/50"
                          }`}
                        >
                          <p className="font-medium text-content-primary">
                            Split All Pages
                          </p>
                          <p className="mt-1 text-xs text-content-secondary">
                            Every page becomes a separate PDF
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={() => setMode("custom")}
                          className={`rounded-xl border p-4 text-left transition-colors ${
                            mode === "custom"
                              ? "border-tool-pdf bg-tool-pdf/10"
                              : "border-surface-border bg-surface-card hover:border-tool-pdf/50"
                          }`}
                        >
                          <p className="font-medium text-content-primary">
                            Extract Specific Pages
                          </p>
                          <p className="mt-1 text-xs text-content-secondary">
                            Enter page numbers to extract
                          </p>
                        </button>
                      </div>

                      {mode === "custom" && (
                        <div>
                          <input
                            type="text"
                            value={pageInput}
                            onChange={(e) => setPageInput(e.target.value)}
                            placeholder="e.g. 1, 3, 5-7, 10"
                            className="w-full rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 text-content-primary"
                          />
                          <p className="mt-1 text-xs text-content-muted">
                            Use commas for individual pages, hyphens for ranges
                          </p>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleSplit}
                        disabled={isProcessing}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border-l-4 border-l-red-400 bg-tool-pdf px-4 py-4 text-base font-semibold text-white shadow-lg shadow-tool-pdf/20 transition-colors hover:bg-[#DC2626] disabled:opacity-70"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Splitting...
                          </>
                        ) : (
                          "Split PDF"
                        )}
                      </button>
                    </>
                  )}
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-tool-pdf bg-tool-pdf/5 px-4 py-3 text-center text-sm text-tool-pdf">
                  {error}
                </div>
              )}

              {splitResults.length > 0 && (
                <div className="space-y-4">
                  <div className="space-y-2 rounded-xl border border-surface-border bg-surface-card p-4">
                    {splitResults.map((result) => (
                      <div
                        key={result.pageNumber}
                        className="flex flex-col gap-2 rounded-lg border border-surface-border bg-surface-elevated p-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-content-primary">
                            Page {result.pageNumber}
                          </p>
                          <p className="text-xs text-content-secondary">
                            {formatFileSize(result.blob.size)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => downloadSingle(result)}
                          className="rounded-lg bg-brand-blue px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#2563EB]"
                        >
                          Download
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={downloadAllZip}
                    className="w-full rounded-xl bg-tool-convert px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-[#059669]"
                  >
                    Download All as ZIP
                  </button>

                  <button
                    type="button"
                    onClick={handleClear}
                    className="w-full text-center text-sm text-content-secondary transition-colors hover:text-content-primary"
                  >
                    Split Another
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
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



          <RelatedTools currentSlug="pdf-split" />
          <ToolFeedback toolName="PDF Split" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
