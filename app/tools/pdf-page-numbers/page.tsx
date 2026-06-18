"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Download, Hash, Loader2, UploadCloud, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  addPageNumbers,
  formatFileSize,
  type PageNumberFormat,
  type PageNumberPosition,
} from "@/lib/pdf-page-numbers";
import { getTotalPages } from "@/lib/pdf-document";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const POSITIONS: { value: PageNumberPosition; label: string }[] = [
  { value: "top-left", label: "Top left" },
  { value: "top-center", label: "Top center" },
  { value: "top-right", label: "Top right" },
  { value: "bottom-left", label: "Bottom left" },
  { value: "bottom-center", label: "Bottom center" },
  { value: "bottom-right", label: "Bottom right" },
];

const FORMATS: { value: PageNumberFormat; label: string }[] = [
  { value: "number", label: "1" },
  { value: "page-x", label: "Page 1" },
  { value: "page-x-of-y", label: "Page 1 of 10" },
];

export default function PdfPageNumbersPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [position, setPosition] = useState<PageNumberPosition>("bottom-center");
  const [format, setFormat] = useState<PageNumberFormat>("page-x");
  const [startNumber, setStartNumber] = useState("1");
  const [skipFirstPage, setSkipFirstPage] = useState(false);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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
    setOutputBlob(null);
    setError(null);
    setIsLoading(true);
    try {
      setPageCount(await getTotalPages(selected));
    } catch {
      setError("Unable to read PDF.");
      setFile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = async () => {
    if (!file) return;
    const start = parseInt(startNumber, 10);
    if (Number.isNaN(start) || start < 1) {
      setError("Starting number must be at least 1.");
      return;
    }
    setIsProcessing(true);
    setError(null);
    try {
      const blob = await addPageNumbers(file, { position, format, startNumber: start, skipFirstPage });
      setOutputBlob(blob);
    } catch {
      setError("Failed to add page numbers. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputBlob || !file) return;
    const url = URL.createObjectURL(outputBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `numbered_${file.name}`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-content-secondary hover:text-content-primary">← All Tools</Link>
        </div>
        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <div className="pt-10 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-pdf/10">
                <Hash className="h-6 w-6 text-tool-pdf" strokeWidth={1.75} />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">Add Page Numbers to PDF Online Free</h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">Choose position, starting number, and format. Number every page in your browser — no upload to server.</p>
              <div className="mt-4 flex justify-center"><FavoriteButton slug="pdf-page-numbers" /></div>
            </div>

            <div className="mt-10 space-y-6">
              <input ref={inputRef} type="file" accept="application/pdf,.pdf" className="hidden" aria-label="Upload PDF"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); e.target.value = ""; }} />

              {!file && (
                <button type="button" onClick={() => inputRef.current?.click()} aria-label="File upload area"
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                  onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if (f) handleFileSelect(f); }}
                  className={`flex min-h-[160px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-surface-card p-12 ${isDragging ? "border-tool-pdf" : "border-tool-pdf/30 hover:border-tool-pdf"}`}>
                  <UploadCloud className="mb-4 h-10 w-10 text-content-muted" />
                  <p className="font-medium text-content-primary">Drop your PDF here</p>
                  <p className="mt-1 text-sm text-content-secondary">or click to browse — max 50MB</p>
                </button>
              )}

              {isLoading && <div className="flex justify-center gap-2 py-8 text-content-secondary"><Loader2 className="h-5 w-5 animate-spin" />Reading PDF...</div>}

              {file && !isLoading && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between rounded-xl border border-surface-border bg-surface-card px-4 py-3">
                    <div><p className="truncate text-sm font-medium text-content-primary">{file.name}</p><p className="text-xs text-content-secondary">{formatFileSize(file.size)} · {pageCount} pages</p></div>
                    <button type="button" onClick={() => { setFile(null); setOutputBlob(null); }} aria-label="Remove file" className="rounded-lg p-2 hover:bg-surface-elevated"><X className="h-4 w-4" /></button>
                  </div>

                  <div className="rounded-xl border border-surface-border bg-surface-card p-4 space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-content-primary">Position</label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {POSITIONS.map((p) => (
                          <button key={p.value} type="button" onClick={() => { setPosition(p.value); setOutputBlob(null); }}
                            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${position === p.value ? "border-tool-pdf bg-tool-pdf/10 text-tool-pdf" : "border-surface-border text-content-secondary hover:border-tool-pdf/50"}`}>
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-content-primary">Format</label>
                      <div className="flex flex-wrap gap-2">
                        {FORMATS.map((f) => (
                          <button key={f.value} type="button" onClick={() => { setFormat(f.value); setOutputBlob(null); }}
                            className={`rounded-lg border px-4 py-2 text-sm font-medium ${format === f.value ? "border-tool-pdf bg-tool-pdf/10 text-tool-pdf" : "border-surface-border text-content-secondary"}`}>
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="start-number" className="mb-2 block text-sm font-medium text-content-primary">Starting number</label>
                      <input id="start-number" type="number" min={1} value={startNumber} onChange={(e) => { setStartNumber(e.target.value); setOutputBlob(null); }}
                        className="w-full rounded-lg border border-surface-border bg-surface-base px-3 py-2 text-sm text-content-primary outline-none focus:border-tool-pdf" />
                    </div>
                    <label className="flex items-center gap-2 text-sm text-content-secondary">
                      <input type="checkbox" checked={skipFirstPage} onChange={(e) => { setSkipFirstPage(e.target.checked); setOutputBlob(null); }} className="rounded" />
                      Skip first page (cover/title page)
                    </label>
                  </div>

                  {!outputBlob && (
                    <button type="button" onClick={handleApply} disabled={isProcessing}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-tool-pdf px-4 py-4 text-base font-semibold text-white hover:bg-[#DC2626] disabled:opacity-70">
                      {isProcessing ? <><Loader2 className="h-5 w-5 animate-spin" />Adding numbers...</> : "Add Page Numbers"}
                    </button>
                  )}
                  {outputBlob && (
                    <button type="button" onClick={handleDownload} className="flex w-full items-center justify-center gap-2 rounded-xl bg-tool-convert px-4 py-4 text-base font-semibold text-white hover:bg-[#059669]">
                      <Download className="h-5 w-5" />Download Numbered PDF
                    </button>
                  )}
                </div>
              )}
              {error && <div className="rounded-xl border border-tool-pdf bg-tool-pdf/5 px-4 py-3 text-center text-sm text-tool-pdf">{error}</div>}
            </div>
          </div>
          <RelatedTools currentSlug="pdf-page-numbers" />
          <ToolFeedback toolName="PDF Page Numbers" />
          <ToolSeoContent slug="pdf-page-numbers" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
