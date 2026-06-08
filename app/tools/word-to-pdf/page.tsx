"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  FileBadge,
  Loader2,
  RefreshCw,
  Upload,
  UploadCloud,
  X,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { convertWordToPdf, formatFileSize } from "@/lib/word-to-pdf";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const howItWorksSteps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload",
    description: "Select your .docx Word file",
  },
  {
    step: "02",
    icon: RefreshCw,
    title: "Convert",
    description: "Text is extracted and formatted as PDF",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Get your PDF instantly",
  },
];

function isWordFile(file: File) {
  return (
    file.type === "application/msword" ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    /\.docx?$/i.test(file.name)
  );
}

export default function WordToPdfPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [outputSize, setOutputSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const resetResult = () => {
    setConvertedBlob(null);
    setOutputSize(0);
    setError(null);
  };

  const handleFile = useCallback((selected: File) => {
    if (!isWordFile(selected)) {
      setError("Please select a valid .doc or .docx file.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("File exceeds the 20MB limit.");
      return;
    }

    setFile(selected);
    setOriginalSize(selected.size);
    resetResult();
    setError(null);
  }, []);

  const handleRemoveFile = () => {
    setFile(null);
    setOriginalSize(0);
    resetResult();
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

  const handleConvert = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    resetResult();

    try {
      const blob = await convertWordToPdf(file);
      setConvertedBlob(blob);
      setOutputSize(blob.size);
    } catch {
      setError("Conversion failed. Please try a different Word file.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!convertedBlob || !file) return;

    const baseName = file.name.replace(/\.docx?$/i, "");
    const url = URL.createObjectURL(convertedBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${baseName}.pdf`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleConvertAnother = () => {
    handleRemoveFile();
    inputRef.current?.click();
  };

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
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-convert/10">
                <FileBadge
                  className="h-6 w-6 text-tool-convert"
                  strokeWidth={1.75}
                />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                Word to PDF
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Convert Word documents to PDF instantly. Text and formatting
                preserved. Runs in your browser.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <input
                ref={inputRef}
                type="file"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
                    ? "border-tool-convert"
                    : "border-tool-convert/30 hover:border-tool-convert"
                }`}
              >
                <UploadCloud className="mb-4 h-10 w-10 text-content-muted" />
                <p className="font-medium text-content-primary">
                  Drop your Word file here
                </p>
                <p className="mt-1 text-sm text-content-secondary">
                  or click to browse — .doc, .docx — max 20MB
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
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-tool-convert transition-colors hover:bg-tool-convert/10"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-tool-pdf bg-tool-pdf/5 px-4 py-3 text-center text-sm text-tool-pdf">
                  {error}
                </div>
              )}

              {file && !convertedBlob && (
                <button
                  type="button"
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-l-4 border-l-emerald-400 bg-tool-convert px-4 py-4 text-base font-semibold text-white shadow-lg shadow-tool-convert/20 transition-colors hover:bg-[#059669] disabled:opacity-70"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    "Convert to PDF"
                  )}
                </button>
              )}

              {convertedBlob && (
                <div className="space-y-4">
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
                        Output PDF Size
                      </p>
                      <p className="mt-1 text-xl font-bold text-content-primary">
                        {formatFileSize(outputSize)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full rounded-xl bg-brand-blue px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-[#2563EB]"
                  >
                    Download PDF
                  </button>

                  <button
                    type="button"
                    onClick={handleConvertAnother}
                    className="w-full text-center text-sm text-content-secondary transition-colors hover:text-content-primary"
                  >
                    Convert Another
                  </button>
                </div>
              )}

              <p className="text-center text-xs text-content-muted">
                Best results with text-based .docx files. Complex layouts,
                tables, and images may not render perfectly.
              </p>
            </div>
          </div>

          <RelatedTools currentSlug="word-to-pdf" />

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
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-convert/10">
                    <step.icon className="h-5 w-5 text-tool-convert" />
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
