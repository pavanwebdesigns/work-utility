"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  FileText,
  Loader2,
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
import { convertPdfToWord, formatFileSize } from "@/lib/pdf-to-word";

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
    icon: RefreshCw,
    title: "Convert",
    description: "We extract text and structure",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Get your editable .docx file",
  },
];

export default function PdfToWordPage() {
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
      const blob = await convertPdfToWord(file);
      setConvertedBlob(blob);
      setOutputSize(blob.size);
    } catch {
      setError(
        "Conversion failed. This may be a scanned or protected PDF."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!convertedBlob || !file) return;

    const baseName = file.name.replace(/\.pdf$/i, "");
    const url = URL.createObjectURL(convertedBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${baseName}.docx`;
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
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
                <FileText
                  className="h-6 w-6 text-brand-blue"
                  strokeWidth={1.75}
                />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                PDF to Word
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Convert your PDF to an editable Word document. Text and
                structure preserved. Runs in your browser.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,application/pdf"
                aria-label="Upload PDF file" className="hidden"
                onChange={handleInputChange}
              />

              <button
                type="button"
               aria-label="File upload area" onClick={() => inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex min-h-[160px] sm:min-h-[200px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-surface-card p-12 transition-colors ${
                  isDragging
                    ? "border-brand-blue"
                    : "border-brand-blue/30 hover:border-brand-blue"
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
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-brand-blue transition-colors hover:bg-brand-blue/10"
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
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-l-4 border-l-[#2563EB] bg-brand-blue px-4 py-4 text-base font-semibold text-white shadow-lg shadow-brand-blue/20 transition-colors hover:bg-[#2563EB] disabled:opacity-70"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    "Convert to Word"
                  )}
                </button>
              )}

              {convertedBlob && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-3 text-center text-sm text-content-secondary">
                    Conversion complete — your Word document is ready to
                    download.
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-card p-5">
                      <p className="text-sm text-content-secondary">
                        Original PDF Size
                      </p>
                      <p className="mt-1 text-xl font-bold text-content-primary">
                        {formatFileSize(originalSize)}
                      </p>
                    </div>
                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-card p-5">
                      <p className="text-sm text-content-secondary">
                        Output .docx Size
                      </p>
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
                    Download Word Document
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
                Note: Conversion quality depends on PDF type. Text-based PDFs
                convert best. Scanned PDFs may have limited text extraction.
              </p>
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
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                    <step.icon className="h-5 w-5 text-brand-blue" />
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



          <RelatedTools currentSlug="pdf-to-word" />
          <ToolFeedback toolName="PDF to Word" />
          <ToolSeoContent slug="pdf-to-word" />
          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
