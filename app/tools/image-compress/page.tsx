"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  ImageDown,
  Loader2,
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
import { ImageCropEditor } from "@/components/ImageCropEditor";
import { FavoriteButton } from "@/components/FavoriteButton";
import { useImageCropGate } from "@/hooks/useImageCropGate";
import {
  compressImage,
  formatFileSize,
  ImageQuality,
} from "@/lib/image-compress";
import { getImageDimensionsFromFile } from "@/lib/image-crop";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const qualityLevels: {
  id: ImageQuality;
  label: string;
  description: string;
}[] = [
  {
    id: "low",
    label: "Low",
    description: "Smallest file (~70% smaller)",
  },
  {
    id: "medium",
    label: "Medium",
    description: "Balanced quality (recommended)",
  },
  {
    id: "high",
    label: "High",
    description: "Near-original quality",
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
    title: "Choose Quality",
    description: "Pick compression level",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Save your compressed image",
  },
];

function isAcceptedImage(file: File) {
  return (
    ACCEPTED_TYPES.includes(file.type) ||
    /\.(jpe?g|png|webp)$/i.test(file.name)
  );
}

export default function ImageCompressPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dimensionsRef = useRef<{ width: number; height: number } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<ImageQuality>("medium");
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedPreviewUrl, setCompressedPreviewUrl] = useState<
    string | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    cropSession,
    finalizeFile,
    completeCrop,
    cancelCrop,
    resetOriginal,
  } = useImageCropGate({
    getCropTarget: () => dimensionsRef.current,
  });

  const setFilePreview = useCallback((nextFile: File) => {
    setFile(nextFile);
    setOriginalSize(nextFile.size);
    setQuality("medium");
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return URL.createObjectURL(nextFile);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (compressedPreviewUrl) URL.revokeObjectURL(compressedPreviewUrl);
    };
  }, [previewUrl, compressedPreviewUrl]);

  const resetResult = useCallback(() => {
    setCompressedFile(null);
    setCompressedSize(0);
    setCompressedPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
    setError(null);
  }, []);

  const handleFile = useCallback(
    async (selected: File) => {
      if (!isAcceptedImage(selected)) {
        setError("Please select a JPG, PNG, or WebP image.");
        return;
      }
      if (selected.size > MAX_FILE_SIZE) {
        setError("File too large. Maximum size is 10MB.");
        return;
      }

      setError(null);
      resetResult();
      setFile(null);
      setPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return null;
      });

      const dimensions = await getImageDimensionsFromFile(selected);
      dimensionsRef.current = dimensions;

      const result = await finalizeFile(selected);
      if (!result.needsCrop) {
        setFilePreview(selected);
      }
    },
    [finalizeFile, resetResult, setFilePreview]
  );

  const handleCropApply = (croppedFile: File) => {
    completeCrop(croppedFile);
    dimensionsRef.current = {
      width: dimensionsRef.current?.width ?? 0,
      height: dimensionsRef.current?.height ?? 0,
    };
    setFilePreview(croppedFile);
  };

  const handleCropCancel = () => {
    cancelCrop();
    dimensionsRef.current = null;
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemoveFile = () => {
    setFile(null);
    dimensionsRef.current = null;
    resetOriginal();
    setOriginalSize(0);
    resetResult();
    setQuality("medium");
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

  const handleCompress = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    resetResult();

    try {
      const result = await compressImage(file, quality);
      setCompressedFile(result);
      setCompressedSize(result.size);
      setCompressedPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return URL.createObjectURL(result);
      });
    } catch {
      setError("Compression failed. Please try a different image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedFile || !file) return;

    const url = URL.createObjectURL(compressedFile);
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
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-image/10">
                <ImageDown
                  className="h-6 w-6 text-tool-image"
                  strokeWidth={1.75}
                />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                Image Compress
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Compress JPG, PNG, and WebP images without visible quality
                loss. Runs entirely in your browser.
              </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="image-compress" />
            </div>
            </div>

            <div className="mt-10 space-y-6">
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                aria-label="Upload image file" className="hidden"
                onChange={handleInputChange}
              />

              {cropSession && (
                <ImageCropEditor
                  imageSrc={cropSession.imageSrc}
                  aspect={cropSession.aspect}
                  originalFile={cropSession.originalFile}
                  accent="image"
                  onApply={handleCropApply}
                  onCancel={handleCropCancel}
                />
              )}

              {!cropSession && (
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
                    Drop your image here
                  </p>
                  <p className="mt-1 text-sm text-content-secondary">
                    or click to browse — max 10MB
                  </p>
                </button>
              )}

              {file && !cropSession && (
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
                      aria-label="Remove file"
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

              {file && !compressedFile && !cropSession && (
                <>
                  <div>
                    <p className="mb-3 text-sm font-medium text-content-primary">
                      Compression quality
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {qualityLevels.map((level) => (
                        <button
                          key={level.id}
                          type="button"
                          onClick={() => {
                            setQuality(level.id);
                            resetResult();
                          }}
                          className={`rounded-lg border px-4 py-3 text-left transition-colors ${
                            quality === level.id
                              ? "border-tool-image bg-tool-image/10 text-tool-image"
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
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-l-4 border-l-purple-400 bg-tool-image px-4 py-4 text-base font-semibold text-white shadow-lg shadow-tool-image/20 transition-colors hover:bg-[#7C3AED] disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Compressing...
                      </>
                    ) : (
                      "Compress Image"
                    )}
                  </button>
                </>
              )}

              {compressedFile && compressedPreviewUrl && previewUrl && (
                <div className="space-y-4">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-card p-4">
                      <p className="mb-3 text-sm font-medium text-content-secondary">
                        Before
                      </p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewUrl}
                        alt="Before compression"
                        className="mx-auto max-h-[150px] rounded-lg object-contain"
                      />
                    </div>
                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-card p-4">
                      <p className="mb-3 text-sm font-medium text-content-secondary">
                        After
                      </p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={compressedPreviewUrl}
                        alt="After compression"
                        className="mx-auto max-h-[150px] rounded-lg object-contain"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                    <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:justify-start">
                      <span className="text-content-secondary">
                        {formatFileSize(originalSize)}
                      </span>
                      <span className="text-content-muted">→</span>
                      <span className="font-bold text-content-primary">
                        {formatFileSize(compressedSize)}
                      </span>
                      {percentSaved > 0 && (
                        <span className="rounded bg-tool-convert/15 px-2 py-0.5 text-xs font-semibold text-tool-convert">
                          {percentSaved}% smaller
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full rounded-xl bg-tool-convert px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-[#059669]"
                  >
                    Download Compressed Image
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



          <RelatedTools currentSlug="image-compress" />
          <ToolFeedback toolName="Image Compress" />
          <ToolSeoContent slug="image-compress" />
          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
