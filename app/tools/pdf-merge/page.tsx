"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  FileDown,
  FilePlus,
  ListOrdered,
  Loader2,
  Plus,
  Upload,
  UploadCloud,
  X,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { DinoGame } from "@/components/DinoGame";
import { formatFileSize, mergePDFs } from "@/lib/pdf-merge";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const howItWorksSteps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload",
    description: "Add two or more PDF files",
  },
  {
    step: "02",
    icon: ListOrdered,
    title: "Order",
    description: "Files merge in the order you added them",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Get your combined PDF instantly",
  },
];

export default function PdfMergePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const addMoreRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [outputSize, setOutputSize] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const resetResult = useCallback(() => {
    setMergedBlob(null);
    setPageCount(0);
    setOutputSize(0);
    setError(null);
  }, []);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const list = Array.from(incoming);
      const valid: File[] = [];

      for (const file of list) {
        if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
          setError("Only PDF files are supported.");
          continue;
        }
        if (file.size > MAX_FILE_SIZE) {
          setError("Each PDF must be 50MB or smaller.");
          continue;
        }
        valid.push(file);
      }

      if (valid.length === 0) return;

      setFiles((current) => {
        resetResult();
        setError(null);
        return [...current, ...valid];
      });
    },
    [resetResult]
  );

  const handleRemoveFile = (index: number) => {
    setFiles((current) => current.filter((_, i) => i !== index));
    resetResult();
  };

  const handleClearAll = () => {
    setFiles([]);
    resetResult();
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
    if (addMoreRef.current) addMoreRef.current.value = "";
  };

  const handleMerge = async () => {
    if (files.length < 2) return;

    setIsProcessing(true);
    setError(null);
    resetResult();

    try {
      const result = await mergePDFs(files);
      setMergedBlob(result.blob);
      setPageCount(result.pageCount);
      setOutputSize(result.blob.size);
    } catch {
      setError("Merge failed. Please check your PDF files and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!mergedBlob) return;
    const url = URL.createObjectURL(mergedBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `merged_${Date.now()}.pdf`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleMergeMore = () => {
    handleClearAll();
    inputRef.current?.click();
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
                <FilePlus className="h-6 w-6 text-tool-pdf" strokeWidth={1.75} />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                PDF Merge
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Combine multiple PDF files into one document. Runs entirely in
                your browser.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf,.pdf"
                multiple
                aria-label="Upload PDF file" className="hidden"
                onChange={(e) => {
                  if (e.target.files?.length) addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
              <input
                ref={addMoreRef}
                type="file"
                accept="application/pdf,.pdf"
                multiple
                aria-label="Upload PDF file" className="hidden"
                onChange={(e) => {
                  if (e.target.files?.length) addFiles(e.target.files);
                  e.target.value = "";
                }}
              />

              {files.length === 0 && (
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
                    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
                  }}
                  className={`flex min-h-[160px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-surface-card p-12 transition-colors sm:min-h-[200px] ${
                    isDragging
                      ? "border-tool-pdf"
                      : "border-tool-pdf/30 hover:border-tool-pdf"
                  }`}
                >
                  <UploadCloud className="mb-4 h-10 w-10 text-content-muted" />
                  <p className="font-medium text-content-primary">
                    Drop your PDF files here
                  </p>
                  <p className="mt-1 text-sm text-content-secondary">
                    or click to browse — multiple files, 50MB each
                  </p>
                </button>
              )}

              {files.length > 0 && (
                <div className="space-y-3 rounded-xl border border-surface-border bg-surface-card p-4">
                  {files.map((file, index) => (
                    <div key={`${file.name}-${index}`} className="flex items-center gap-3">
                      <span className="w-6 shrink-0 text-xs font-semibold text-content-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-tool-pdf/10">
                        <FileDown className="h-4 w-4 text-tool-pdf" />
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
                        onClick={() => handleRemoveFile(index)}
                        aria-label={`Remove ${file.name}`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-tool-pdf transition-colors hover:bg-tool-pdf/10"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <p className="text-xs text-content-muted">
                    Files will be merged in the order shown
                  </p>
                  <button
                    type="button"
                    onClick={() => addMoreRef.current?.click()}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-surface-border py-2.5 text-sm text-content-secondary transition-colors hover:border-tool-pdf hover:text-content-primary"
                  >
                    <Plus className="h-4 w-4" />
                    Add more PDFs
                  </button>
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-tool-pdf bg-tool-pdf/5 px-4 py-3 text-center text-sm text-tool-pdf">
                  {error}
                </div>
              )}

              {files.length >= 2 && !mergedBlob && (
                <button
                  type="button"
                  onClick={handleMerge}
                  disabled={isProcessing}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-l-4 border-l-red-400 bg-tool-pdf px-4 py-4 text-base font-semibold text-white shadow-lg shadow-tool-pdf/20 transition-colors hover:bg-[#DC2626] disabled:opacity-70"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Merging...
                    </>
                  ) : (
                    `Merge ${files.length} PDFs`
                  )}
                </button>
              )}

              {mergedBlob && (
                <div className="space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-card p-5">
                      <p className="text-sm text-content-secondary">Pages Merged</p>
                      <p className="mt-1 text-xl font-bold text-content-primary">
                        {pageCount} pages
                      </p>
                    </div>
                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-card p-5">
                      <p className="text-sm text-content-secondary">Output Size</p>
                      <p className="mt-1 text-xl font-bold text-content-primary">
                        {formatFileSize(outputSize)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full rounded-xl bg-tool-convert px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-[#059669]"
                  >
                    Download Merged PDF
                  </button>
                  <button
                    type="button"
                    onClick={handleMergeMore}
                    className="w-full text-center text-sm text-content-secondary transition-colors hover:text-content-primary"
                  >
                    Merge More
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



          <RelatedTools currentSlug="pdf-merge" />
          <ToolFeedback toolName="PDF Merge" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
