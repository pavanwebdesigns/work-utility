"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  Info,
  Loader2,
  RefreshCw,
  Smartphone,
  SlidersHorizontal,
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
  convertHeicToJpg,
  convertHeicToPng,
  formatFileSize,
} from "@/lib/heic-to-jpg";

const MAX_FILE_SIZE = 20 * 1024 * 1024;
type OutputFormat = "jpeg" | "png";

const howItWorksSteps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload",
    description: "Select your iPhone HEIC photo",
  },
  {
    step: "02",
    icon: SlidersHorizontal,
    title: "Convert",
    description: "We convert it to JPG or PNG in your browser",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Save the converted image instantly",
  },
];

function isHeicFile(file: File) {
  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    /\.heic$/i.test(file.name) ||
    /\.heif$/i.test(file.name)
  );
}

function isAcceptedFile(file: File) {
  return (
    isHeicFile(file) ||
    file.type.startsWith("image/") ||
    /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)
  );
}

function formatLabel(format: OutputFormat) {
  return format === "jpeg" ? "JPG" : "PNG";
}

function calcSizeChange(original: number, output: number) {
  if (!original) return "0%";
  const pct = ((output - original) / original) * 100;
  return `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`;
}

export default function HeicToJpgPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("jpeg");
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [outputSize, setOutputSize] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [convertedPreviewUrl, setConvertedPreviewUrl] = useState<string | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const resetResult = useCallback(() => {
    setConvertedBlob(null);
    setOutputSize(0);
    setConvertedPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (convertedPreviewUrl) URL.revokeObjectURL(convertedPreviewUrl);
    };
  }, [previewUrl, convertedPreviewUrl]);

  const handleFile = useCallback(
    (selected: File) => {
      if (!isAcceptedFile(selected)) {
        setError("Please select a HEIC or image file.");
        return;
      }
      if (selected.size > MAX_FILE_SIZE) {
        setError("File exceeds the 20MB limit.");
        return;
      }

      setFile(selected);
      setOriginalSize(selected.size);
      resetResult();
      setPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return URL.createObjectURL(selected);
      });
      setError(null);
    },
    [resetResult],
  );

  const handleRemoveFile = () => {
    setFile(null);
    setOriginalSize(0);
    resetResult();
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
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
      const blob =
        outputFormat === "jpeg"
          ? await convertHeicToJpg(file)
          : await convertHeicToPng(file);

      setConvertedBlob(blob);
      setOutputSize(blob.size);
      setConvertedPreviewUrl(URL.createObjectURL(blob));
    } catch {
      setError(
        "Conversion failed. Make sure the file is a valid HEIC photo from your iPhone.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!convertedBlob || !file) return;

    const ext = outputFormat === "jpeg" ? "jpg" : "png";
    const baseName = file.name.replace(/\.(heic|heif)$/i, "");
    const url = URL.createObjectURL(convertedBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${baseName}.${ext}`;
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
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-image/10">
                <Smartphone
                  className="h-6 w-6 text-tool-image"
                  strokeWidth={1.75}
                />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                HEIC to JPG
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Convert iPhone HEIC photos to JPG or PNG instantly. Runs in your
                browser — no upload to any server.
              </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="heic-to-jpg" />
            </div>
            </div>

            <div className="mt-10 space-y-6">
              <input
                ref={inputRef}
                type="file"
                accept=".heic,.HEIC,.heif,.HEIF,image/heic,image/heif,image/*"
                aria-label="Upload HEIC file"
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
                    ? "border-tool-image"
                    : "border-tool-image/30 hover:border-tool-image"
                }`}
              >
                <UploadCloud className="mb-4 h-10 w-10 text-content-muted" />
                <p className="font-medium text-content-primary">
                  Drop your HEIC file here
                </p>
                <p className="mt-1 text-sm text-content-secondary">
                  iPhone photos (.heic) — max 20MB
                </p>
              </button>

              <div className="flex gap-3 rounded-xl border border-surface-border bg-surface-card p-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                <p className="text-sm leading-relaxed text-content-secondary">
                  HEIC is the default photo format on iPhones. Windows and many
                  apps cannot open HEIC files directly. Convert to JPG for
                  universal compatibility.
                </p>
              </div>

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
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-tool-image transition-colors hover:bg-tool-image/10"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {file && !convertedBlob && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {(["jpeg", "png"] as OutputFormat[]).map((format) => (
                      <button
                        key={format}
                        type="button"
                        onClick={() => setOutputFormat(format)}
                        className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                          outputFormat === format
                            ? "border-tool-image bg-tool-image/10 text-tool-image"
                            : "border-surface-border bg-surface-card text-content-secondary hover:border-tool-image/50"
                        }`}
                      >
                        {formatLabel(format)}
                      </button>
                    ))}
                  </div>

                  {previewUrl && (
                    <div className="overflow-hidden rounded-xl border border-surface-border bg-surface-card p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewUrl}
                        alt="Original HEIC preview"
                        className="mx-auto max-h-48 rounded-lg object-contain"
                      />
                    </div>
                  )}
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
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-l-4 border-l-purple-400 bg-[#8B5CF6] px-4 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/20 transition-colors hover:bg-[#7C3AED] disabled:opacity-70"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    `Convert to ${formatLabel(outputFormat)}`
                  )}
                </button>
              )}

              {convertedBlob && (
                <div className="space-y-4">
                  {convertedPreviewUrl && (
                    <div className="overflow-hidden rounded-xl border border-surface-border bg-surface-card p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={convertedPreviewUrl}
                        alt="Converted image preview"
                        className="mx-auto max-h-48 rounded-lg object-contain"
                      />
                    </div>
                  )}

                  <div className="rounded-xl border border-surface-border bg-surface-card p-4 text-center text-sm text-content-secondary">
                    <span className="font-medium text-content-primary">
                      {formatFileSize(originalSize)}
                    </span>
                    {" → "}
                    <span className="font-medium text-content-primary">
                      {formatFileSize(outputSize)}
                    </span>
                    <span className="ml-2 text-tool-image">
                      ({calcSizeChange(originalSize, outputSize)})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full rounded-xl bg-brand-blue px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-[#2563EB]"
                  >
                    Download {formatLabel(outputFormat)}
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
            </div>
          </div>

          <RelatedTools currentSlug="heic-to-jpg" />

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
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-image/10">
                    <step.icon className="h-5 w-5 text-tool-image" />
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

          <ToolFeedback toolName="HEIC to JPG" />
          <ToolSeoContent slug="heic-to-jpg" />
          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
