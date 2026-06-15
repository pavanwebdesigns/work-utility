"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  Loader2,
  Presentation,
  RefreshCw,
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
import {
  convertPptToPdf,
  formatFileSize,
  getPptSlideCount,
} from "@/lib/ppt-to-pdf";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const howItWorksSteps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload",
    description: "Select your .pptx PowerPoint file",
  },
  {
    step: "02",
    icon: RefreshCw,
    title: "Convert",
    description: "Each slide becomes a PDF page",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Get your PDF presentation",
  },
];

function isPptFile(file: File) {
  return (
    file.type ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    file.type === "application/vnd.ms-powerpoint" ||
    /\.pptx?$/i.test(file.name)
  );
}

function isLegacyPpt(file: File) {
  return (
    file.type === "application/vnd.ms-powerpoint" || /\.ppt$/i.test(file.name)
  );
}

export default function PptToPdfPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [outputSize, setOutputSize] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const resetResult = () => {
    setConvertedBlob(null);
    setOutputSize(0);
    setSlideCount(0);
    setError(null);
  };

  const handleFile = useCallback((selected: File) => {
    if (!isPptFile(selected)) {
      setError("Please select a valid .ppt or .pptx file.");
      return;
    }
    if (isLegacyPpt(selected) && !/\.pptx$/i.test(selected.name)) {
      setError(
        "Legacy .ppt format is not supported in the browser. Please save as .pptx and try again.",
      );
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("File exceeds the 50MB limit.");
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
      const [blob, count] = await Promise.all([
        convertPptToPdf(file),
        getPptSlideCount(file),
      ]);
      setConvertedBlob(blob);
      setOutputSize(blob.size);
      setSlideCount(count);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Conversion failed. Please try a different PowerPoint file.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!convertedBlob || !file) return;

    const baseName = file.name.replace(/\.pptx?$/i, "");
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
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />

      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
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
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-photo/10">
                <Presentation
                  className="h-6 w-6 text-tool-photo"
                  strokeWidth={1.75}
                />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                PPT to PDF
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Convert PowerPoint presentations to PDF instantly. Each slide
                becomes a PDF page — runs in your browser.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <input
                ref={inputRef}
                type="file"
                accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                aria-label="Upload PowerPoint file"
                className="hidden"
                onChange={handleInputChange}
              />

              <button
                type="button"
                aria-label="File upload area"
                onClick={() => inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex min-h-[160px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-surface-card p-12 transition-colors sm:min-h-[200px] ${
                  isDragging
                    ? "border-tool-photo"
                    : "border-tool-photo/30 hover:border-tool-photo"
                }`}
              >
                <UploadCloud className="mb-4 h-10 w-10 text-content-muted" />
                <p className="font-medium text-content-primary">
                  Drop your PowerPoint file here
                </p>
                <p className="mt-1 text-sm text-content-secondary">
                  .pptx recommended — max 50MB
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
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-tool-photo transition-colors hover:bg-tool-photo/10"
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
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-l-4 border-l-amber-400 bg-[#F59E0B] px-4 py-4 text-base font-semibold text-white shadow-lg shadow-amber-500/20 transition-colors hover:bg-[#D97706] disabled:opacity-70"
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
                  <div className="rounded-xl border border-surface-border bg-surface-card p-5 text-center">
                    <p className="text-sm text-content-secondary">
                      {slideCount} slide{slideCount === 1 ? "" : "s"} converted
                    </p>
                    <p className="mt-2 text-content-secondary">
                      <span className="font-medium text-content-primary">
                        {formatFileSize(originalSize)}
                      </span>
                      {" → "}
                      <span className="font-medium text-content-primary">
                        {formatFileSize(outputSize)}
                      </span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full rounded-xl bg-[#10B981] px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-[#059669]"
                  >
                    Download PDF
                  </button>

                  <button
                    type="button"
                    onClick={handleConvertAnother}
                    className="flex w-full items-center justify-center gap-2 text-center text-sm text-content-secondary transition-colors hover:text-content-primary"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Convert Another
                  </button>
                </div>
              )}

              <p className="text-center text-xs text-content-muted">
                Text content is preserved. Images, animations, and complex slide
                layouts may not render in the PDF.
              </p>
            </div>
          </div>

          <RelatedTools currentSlug="ppt-to-pdf" />

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
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-photo/10">
                    <step.icon className="h-5 w-5 text-tool-photo" />
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

          <ToolFeedback toolName="PPT to PDF" />
          <ToolSeoContent slug="ppt-to-pdf" />
          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
