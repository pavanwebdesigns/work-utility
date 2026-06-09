"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  Loader2,
  RefreshCw,
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
  convertImage,
  detectImageFormat,
  formatFileSize,
  getOutputExtension,
  type ImageFormat,
} from "@/lib/image-converter";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const formatOptions: {
  id: ImageFormat;
  label: string;
  hint: string;
  description: string;
}[] = [
  {
    id: "jpeg",
    label: "JPG",
    hint: "Smaller file size, best for photos",
    description: "best for photos",
  },
  {
    id: "png",
    label: "PNG",
    hint: "Lossless quality, supports transparency",
    description: "best for logos/transparency",
  },
  {
    id: "webp",
    label: "WebP",
    hint: "Modern format, excellent compression",
    description: "best for web",
  },
];

const howItWorksSteps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload",
    description: "Select JPG, PNG, or WebP image",
  },
  {
    step: "02",
    icon: SlidersHorizontal,
    title: "Choose Format",
    description: "Pick your target format",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Get your converted image",
  },
];

function formatLabel(format: ImageFormat): string {
  return format === "jpeg" ? "JPG" : format.toUpperCase();
}

export default function ImageConverterPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>("png");
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [convertedPreviewUrl, setConvertedPreviewUrl] = useState<string | null>(
    null
  );
  const [originalSize, setOriginalSize] = useState(0);
  const [outputSize, setOutputSize] = useState(0);
  const [currentFormat, setCurrentFormat] = useState<ImageFormat | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (convertedPreviewUrl) URL.revokeObjectURL(convertedPreviewUrl);
    };
  }, [previewUrl, convertedPreviewUrl]);

  const resetResult = useCallback(() => {
    setConvertedBlob(null);
    setOutputSize(0);
    setConvertedPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
    setError(null);
  }, []);

  const handleFileSelect = (selected: File) => {
    const isAccepted =
      ACCEPTED_TYPES.includes(selected.type) ||
      /\.(jpe?g|png|webp)$/i.test(selected.name);

    if (!isAccepted) {
      setError("Only JPG, PNG, and WebP images are supported.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("Image must be 10MB or smaller.");
      return;
    }

    const detected = detectImageFormat(selected);
    setFile(selected);
    setOriginalSize(selected.size);
    setCurrentFormat(detected);
    resetResult();

    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return URL.createObjectURL(selected);
    });

    if (detected === "jpeg") setTargetFormat("png");
    else if (detected === "png") setTargetFormat("jpeg");
    else setTargetFormat("jpeg");

    setError(null);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setCurrentFormat(null);
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
    resetResult();
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    resetResult();

    try {
      const blob = await convertImage(file, targetFormat);
      setConvertedBlob(blob);
      setOutputSize(blob.size);
      setConvertedPreviewUrl(URL.createObjectURL(blob));
    } catch {
      setError("Conversion failed. Please try a different image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!convertedBlob || !file) return;
    const ext = getOutputExtension(targetFormat);
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const url = URL.createObjectURL(convertedBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${baseName}.${ext}`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const selectedHint =
    formatOptions.find((option) => option.id === targetFormat)?.hint ?? "";

  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <Header />
      <main id="main-content" className="flex-1">
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
                <RefreshCw className="h-6 w-6 text-tool-image" strokeWidth={1.75} />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                Image Converter
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Convert images between JPG, PNG, and WebP formats. Runs entirely
                in your browser.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                aria-label="Upload image file" className="hidden"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) handleFileSelect(selected);
                  e.target.value = "";
                }}
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
                      ? "border-tool-image"
                      : "border-tool-image/30 hover:border-tool-image"
                  }`}
                >
                  <UploadCloud className="mb-4 h-10 w-10 text-content-muted" />
                  <p className="font-medium text-content-primary">
                    Drop your image here
                  </p>
                  <p className="mt-1 text-sm text-content-secondary">
                    JPG, PNG, or WebP — max 10MB
                  </p>
                </button>
              )}

              {file && (
                <>
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
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-tool-image transition-colors hover:bg-tool-image/10"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {previewUrl && (
                    <div className="flex justify-center rounded-xl border border-surface-border bg-surface-card p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewUrl}
                        alt="Original preview"
                        className="max-h-[120px] rounded-lg object-contain"
                      />
                    </div>
                  )}
                </>
              )}

              {error && (
                <p className="text-center text-sm text-tool-image">{error}</p>
              )}

              {file && !convertedBlob && (
                <>
                  <div>
                    <p className="mb-3 text-sm font-medium text-content-primary">
                      Target format
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {formatOptions.map((option) => {
                        const isCurrent = currentFormat === option.id;
                        const isActive = targetFormat === option.id;

                        return (
                          <button
                            key={option.id}
                            type="button"
                            disabled={isCurrent}
                            onClick={() => {
                              setTargetFormat(option.id);
                              resetResult();
                            }}
                            className={`rounded-lg border px-4 py-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                              isActive
                                ? "border-tool-image bg-tool-image/10 text-tool-image"
                                : "border-surface-border bg-surface-card text-content-secondary"
                            }`}
                          >
                            <span className="block font-semibold">
                              {option.label}
                            </span>
                            <span className="mt-1 block text-xs text-content-muted">
                              {option.description}
                            </span>
                            {isCurrent && (
                              <span className="mt-2 block text-[10px] font-medium text-tool-photo">
                                Current format
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-2 text-xs text-content-muted">{selectedHint}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleConvert}
                    disabled={isProcessing || currentFormat === targetFormat}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-l-4 border-l-purple-400 bg-tool-image px-4 py-4 text-base font-semibold text-white shadow-lg shadow-tool-image/20 transition-colors hover:bg-[#7C3AED] disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Converting...
                      </>
                    ) : (
                      `Convert to ${formatLabel(targetFormat)}`
                    )}
                  </button>
                </>
              )}

              {convertedBlob && convertedPreviewUrl && previewUrl && (
                <div className="space-y-4">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-card p-4">
                      <p className="mb-3 text-sm font-medium text-content-secondary">
                        Before
                      </p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewUrl}
                        alt="Before conversion"
                        className="mx-auto max-h-[150px] rounded-lg object-contain"
                      />
                    </div>
                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-card p-4">
                      <p className="mb-3 text-sm font-medium text-content-secondary">
                        After
                      </p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={convertedPreviewUrl}
                        alt="After conversion"
                        className="mx-auto max-h-[150px] rounded-lg object-contain"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                    <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row">
                      <span className="rounded bg-tool-image/10 px-2 py-0.5 text-xs font-semibold text-tool-image">
                        {currentFormat ? formatLabel(currentFormat) : "—"} →{" "}
                        {formatLabel(targetFormat)}
                      </span>
                      <span className="text-content-secondary">
                        {formatFileSize(originalSize)}
                      </span>
                      <span className="text-content-muted">→</span>
                      <span className="font-bold text-content-primary">
                        {formatFileSize(outputSize)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full rounded-xl bg-tool-convert px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-[#059669]"
                  >
                    Download Converted Image
                  </button>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="w-full text-center text-sm text-content-secondary transition-colors hover:text-content-primary"
                  >
                    Convert Another
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
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-image/10">
                    <step.icon className="h-5 w-5 text-tool-image" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>



          <RelatedTools currentSlug="image-converter" />
          <ToolFeedback toolName="Image Converter" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
