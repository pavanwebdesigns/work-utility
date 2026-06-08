"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  FileDown,
  Loader2,
  SlidersHorizontal,
  Upload,
  UploadCloud,
  X,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  compressPDF,
  CompressLevel,
  formatFileSize,
} from "@/lib/pdf-compress";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const compressionLevels: {
  id: CompressLevel;
  label: string;
  description: string;
}[] = [
  {
    id: "low",
    label: "Low",
    description: "Smaller file, lower quality",
  },
  {
    id: "medium",
    label: "Medium",
    description: "Balanced (recommended)",
  },
  {
    id: "high",
    label: "High",
    description: "Best quality, larger file",
  },
];

const howItWorksSteps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload",
    description: "Select or drop your PDF file",
  },
  {
    step: "02",
    icon: SlidersHorizontal,
    title: "Choose Quality",
    description: "Pick your compression level",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Get your compressed file instantly",
  },
];

export default function PdfCompressPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressLevel, setCompressLevel] = useState<CompressLevel>("medium");
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const resetResult = () => {
    setCompressedBlob(null);
    setCompressedSize(0);
    setError(null);
  };

  const handleFile = useCallback((selected: File) => {
    if (selected.type !== "application/pdf" && !selected.name.endsWith(".pdf")) {
      setError("Please select a valid PDF file.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("File exceeds the 50MB limit.");
      return;
    }

    setFile(selected);
    setOriginalSize(selected.size);
    resetResult();
  }, []);

  const handleRemoveFile = () => {
    setFile(null);
    setOriginalSize(0);
    resetResult();
    setCompressLevel("medium");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) handleFile(selected);
    event.target.value = "";
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
  };

  const handleCompress = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    resetResult();

    try {
      const blob = await compressPDF(file, compressLevel);
      setCompressedBlob(blob);
      setCompressedSize(blob.size);
    } catch {
      setError("Failed to compress PDF. Please try a different file.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedBlob || !file) return;

    const url = URL.createObjectURL(compressedBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `compressed_${file.name}`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleCompressAnother = () => {
    handleRemoveFile();
    inputRef.current?.click();
  };

  const percentSaved =
    originalSize > 0 && compressedSize > 0
      ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
      : 0;
  const isAlreadyOptimized =
    compressedBlob !== null && compressedSize >= originalSize;

  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <Header />

      <main className="flex-1">
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
                <FileDown className="h-6 w-6 text-tool-pdf" strokeWidth={1.75} />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                PDF Compress
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Reduce your PDF file size while maintaining quality. Files never
                leave your browser.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleInputChange}
              />

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex min-h-[160px] sm:min-h-[200px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-surface-card p-12 transition-colors ${
                  isDragging
                    ? "border-tool-pdf"
                    : "border-brand-blue/30 hover:border-tool-pdf"
                }`}
              >
                <UploadCloud className="mb-4 h-10 w-10 text-content-muted" />
                <p className="font-medium text-content-primary">
                  Drop your PDF here
                </p>
                <p className="mt-1 text-sm text-content-secondary">
                  or click to browse — max 50MB
                </p>
              </button>

              {file && (
                <div className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-card p-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-content-primary">
                      {file.name}
                    </p>
                    <p className="mt-0.5 text-sm text-content-secondary">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    aria-label="Remove file"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-tool-pdf transition-colors hover:bg-tool-pdf/10"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {error && (
                <p className="text-center text-sm text-tool-pdf">{error}</p>
              )}

              {file && (
                <>
                  <div>
                    <p className="mb-3 text-sm font-medium text-content-primary">
                      Compression level
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {compressionLevels.map((level) => (
                        <button
                          key={level.id}
                          type="button"
                          onClick={() => {
                            setCompressLevel(level.id);
                            resetResult();
                          }}
                          className={`rounded-lg border px-4 py-3 text-left transition-colors ${
                            compressLevel === level.id
                              ? "border-tool-pdf bg-tool-pdf/10 text-tool-pdf"
                              : "border-surface-border bg-surface-card text-content-secondary"
                          }`}
                        >
                          <span className="block font-semibold">
                            {level.label}
                          </span>
                          <span className="mt-2 block text-xs text-content-muted">
                            {level.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCompress}
                    disabled={isProcessing}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-l-4 border-l-[#DC2626] bg-tool-pdf px-4 py-4 text-base font-semibold text-white shadow-lg shadow-tool-pdf/20 transition-colors hover:bg-[#DC2626] disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Compressing...
                      </>
                    ) : (
                      "Compress PDF"
                    )}
                  </button>
                </>
              )}

              {compressedBlob && (
                <div className="space-y-4">
                  {isAlreadyOptimized && (
                    <div className="rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-center text-sm text-content-secondary">
                      This PDF is already optimized — no further compression
                      possible
                    </div>
                  )}

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-card p-5">
                      <p className="text-sm text-content-secondary">
                        Original Size
                      </p>
                      <p className="mt-1 text-xl font-bold text-content-primary">
                        {formatFileSize(originalSize)}
                      </p>
                    </div>
                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-card p-5">
                      <p className="text-sm text-content-secondary">
                        Compressed Size
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <p className="text-xl font-bold text-content-primary">
                          {formatFileSize(compressedSize)}
                        </p>
                        {!isAlreadyOptimized && percentSaved > 0 && (
                          <span className="rounded bg-tool-convert/15 px-2 py-0.5 text-xs font-semibold text-tool-convert">
                            {percentSaved}% smaller
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full rounded-xl bg-tool-convert px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-[#059669]"
                  >
                    Download Compressed PDF
                  </button>

                  <button
                    type="button"
                    onClick={handleCompressAnother}
                    className="w-full text-center text-sm text-content-secondary transition-colors hover:text-content-primary"
                  >
                    Compress Another
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
                  <p className="text-2xl font-bold text-content-muted/40">
                    {step.step}
                  </p>
                  <p className="mt-1 font-semibold text-content-primary">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-content-secondary">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
