"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  Loader2,
  RefreshCw,
  TableProperties,
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
import {
  convertExcelToPdf,
  formatFileSize,
  getExcelSheetCount,
} from "@/lib/excel-to-pdf";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const howItWorksSteps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload",
    description: "Select your .xlsx or .xls file",
  },
  {
    step: "02",
    icon: RefreshCw,
    title: "Convert",
    description: "All sheets are converted to PDF pages",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Get your PDF instantly",
  },
];

function isExcelFile(file: File) {
  return (
    file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.type === "application/vnd.ms-excel" ||
    /\.xlsx?$/i.test(file.name)
  );
}

export default function ExcelToPdfPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [outputSize, setOutputSize] = useState(0);
  const [sheetCount, setSheetCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const resetResult = () => {
    setConvertedBlob(null);
    setOutputSize(0);
    setSheetCount(0);
    setError(null);
  };

  const handleFile = useCallback((selected: File) => {
    if (!isExcelFile(selected)) {
      setError("Please select a valid .xlsx or .xls file.");
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
      const [blob, count] = await Promise.all([
        convertExcelToPdf(file),
        getExcelSheetCount(file),
      ]);
      setConvertedBlob(blob);
      setOutputSize(blob.size);
      setSheetCount(count);
    } catch {
      setError("Conversion failed. Please try a different Excel file.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!convertedBlob || !file) return;

    const baseName = file.name.replace(/\.xlsx?$/i, "");
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
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-convert/10">
                <TableProperties
                  className="h-6 w-6 text-tool-convert"
                  strokeWidth={1.75}
                />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                Excel to PDF
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Convert Excel spreadsheets to PDF instantly. All sheets included.
                Runs in your browser — private and free.
              </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="excel-to-pdf" />
            </div>
            </div>

            <div className="mt-10 space-y-6">
              <input
                ref={inputRef}
                type="file"
                accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                aria-label="Upload Excel file"
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
                    ? "border-tool-convert"
                    : "border-tool-convert/30 hover:border-tool-convert"
                }`}
              >
                <UploadCloud className="mb-4 h-10 w-10 text-content-muted" />
                <p className="font-medium text-content-primary">
                  Drop your Excel file here
                </p>
                <p className="mt-1 text-sm text-content-secondary">
                  .xlsx or .xls — max 20MB
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
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-l-4 border-l-emerald-400 bg-[#10B981] px-4 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition-colors hover:bg-[#059669] disabled:opacity-70"
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
                      {sheetCount} sheet{sheetCount === 1 ? "" : "s"} converted
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
                    className="w-full rounded-xl bg-brand-blue px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-[#2563EB]"
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
                Conversion preserves text and basic structure. Complex formatting,
                charts, and images may not render perfectly in the PDF output.
              </p>
            </div>
          </div>

          <RelatedTools currentSlug="excel-to-pdf" />

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

          <ToolFeedback toolName="Excel to PDF" />
          <ToolSeoContent slug="excel-to-pdf" />
          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
