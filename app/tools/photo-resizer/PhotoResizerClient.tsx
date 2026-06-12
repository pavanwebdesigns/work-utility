"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Download,
  Loader2,
  ScanLine,
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
import { useImageCropGate } from "@/hooks/useImageCropGate";
import {
  formatFileSize,
  getPhotoPreset,
  PHOTO_SIZES,
  resolvePresetFromUrlParam,
  resizePhoto,
  type PhotoPreset,
} from "@/lib/photo-resize";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const BACKGROUND_OPTIONS = [
  { id: "white", label: "White", value: "#FFFFFF" },
  { id: "gray", label: "Light Gray", value: "#F5F5F5" },
  { id: "transparent", label: "Transparent", value: "transparent" },
];

const howItWorksSteps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload",
    description: "Select your photo (JPG, PNG, WebP)",
  },
  {
    step: "02",
    icon: SlidersHorizontal,
    title: "Choose Size",
    description: "Pick from Indian document presets",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Get perfectly sized photo instantly",
  },
];

const presetRows = PHOTO_SIZES.filter((preset) => preset.id !== "custom");

function isAcceptedImage(file: File) {
  return (
    ACCEPTED_TYPES.includes(file.type) ||
    /\.(jpe?g|png|webp)$/i.test(file.name)
  );
}

export function PhotoResizerClient() {
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resizedBlob, setResizedBlob] = useState<Blob | null>(null);
  const [resizedPreviewUrl, setResizedPreviewUrl] = useState<string | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState("passport");
  const [customWidth, setCustomWidth] = useState(350);
  const [customHeight, setCustomHeight] = useState(350);
  const [maxKb, setMaxKb] = useState(50);
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [outputWidth, setOutputWidth] = useState(0);
  const [outputHeight, setOutputHeight] = useState(0);
  const [sourceFile, setSourceFile] = useState<File | null>(null);

  const activePreset = getPhotoPreset(selectedSize);
  const isCustom = selectedSize === "custom";

  const {
    cropSession,
    finalizeFile,
    completeCrop,
    cancelCrop,
    resetOriginal,
  } = useImageCropGate({
    getCropTarget: () =>
      customWidth > 0 && customHeight > 0
        ? { width: customWidth, height: customHeight }
        : null,
    targetLabel: activePreset?.resizeLabel,
  });

  const setFilePreview = useCallback((nextFile: File) => {
    setFile(nextFile);
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return URL.createObjectURL(nextFile);
    });
  }, []);

  const applyPreset = useCallback((preset: PhotoPreset) => {
    setSelectedSize(preset.id);
    if (preset.id !== "custom") {
      setCustomWidth(preset.width);
      setCustomHeight(preset.height);
      setMaxKb(preset.maxKb);
    }
    setResizedBlob(null);
    setOutputWidth(0);
    setOutputHeight(0);
    setResizedPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
    setError(null);
  }, []);

  useEffect(() => {
    const presetParam = searchParams.get("preset");
    const preset = resolvePresetFromUrlParam(presetParam);
    if (preset) {
      applyPreset(preset);
    }
  }, [searchParams, applyPreset]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (resizedPreviewUrl) URL.revokeObjectURL(resizedPreviewUrl);
    };
  }, [previewUrl, resizedPreviewUrl]);

  const resetResult = useCallback(() => {
    setResizedBlob(null);
    setOutputWidth(0);
    setOutputHeight(0);
    setResizedPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
    setError(null);
  }, []);

  const isResizeDisabled =
    !file ||
    customWidth <= 0 ||
    customHeight <= 0 ||
    (!isCustom && maxKb <= 0);

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
      setSourceFile(selected);
      setFile(null);
      setPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return null;
      });

      const result = await finalizeFile(selected);
      if (!result.needsCrop) {
        setFilePreview(selected);
      }
    },
    [finalizeFile, resetResult, setFilePreview]
  );

  useEffect(() => {
    if (!sourceFile) return;

    let cancelled = false;

    (async () => {
      resetResult();
      setFile(null);
      setPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return null;
      });

      const result = await finalizeFile(sourceFile);
      if (cancelled) return;

      if (!result.needsCrop) {
        setFilePreview(sourceFile);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [customWidth, customHeight, sourceFile, finalizeFile, resetResult, setFilePreview]);

  const handleRemoveFile = () => {
    setFile(null);
    setSourceFile(null);
    resetOriginal();
    resetResult();
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleCropApply = (croppedFile: File) => {
    completeCrop(croppedFile);
    setFilePreview(croppedFile);
  };

  const handleCropCancel = () => {
    cancelCrop();
    setSourceFile(null);
    setFile(null);
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

  const handleResize = async () => {
    if (!file || isResizeDisabled) return;

    setIsProcessing(true);
    setError(null);
    resetResult();

    try {
      const targetMaxKb = isCustom ? undefined : maxKb;
      const blob = await resizePhoto(
        file,
        customWidth,
        customHeight,
        bgColor,
        targetMaxKb
      );
      setResizedBlob(blob);
      setOutputWidth(customWidth);
      setOutputHeight(customHeight);
      setResizedPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return URL.createObjectURL(blob);
      });
    } catch {
      setError("Resize failed. Please try a different image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resizedBlob || !file) return;

    const extension = bgColor === "transparent" ? "png" : "jpg";
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const url = URL.createObjectURL(resizedBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${selectedSize}_${baseName}.${extension}`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleResizeAnother = () => {
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
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-photo/10">
                <ScanLine
                  className="h-6 w-6 text-tool-photo"
                  strokeWidth={1.75}
                />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                Photo Resizer
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Resize your photo to exact Aadhaar, PAN, Passport, or Visa
                dimensions. Perfect for Indian government documents.
              </p>
            </div>

            {!isCustom && activePreset && (
              <p className="mt-6 text-center text-sm font-medium text-tool-photo">
                Resizing for: {activePreset.resizeLabel}
              </p>
            )}

            <div className="mt-6 max-w-full rounded-xl border border-surface-border bg-surface-card p-4 sm:p-5">
              <h2 className="mb-4 text-sm font-semibold text-content-primary">
                Document Presets
              </h2>
              <div className="max-w-full overflow-x-auto">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-surface-border text-content-muted">
                      <th className="pb-2 pr-4 font-medium">Document</th>
                      <th className="pb-2 pr-4 font-medium">Dimensions</th>
                      <th className="pb-2 font-medium">Max KB</th>
                    </tr>
                  </thead>
                  <tbody>
                    {presetRows.map((preset) => {
                      const isSelected = selectedSize === preset.id;

                      return (
                        <tr key={preset.id}>
                          <td colSpan={3} className="p-0">
                            <button
                              type="button"
                              onClick={() => applyPreset(preset)}
                              className={`flex w-full items-center border-b border-surface-border/50 px-1 py-3 text-left transition-colors last:border-0 ${
                                isSelected
                                  ? "rounded-lg bg-tool-photo/10 ring-1 ring-tool-photo/40"
                                  : "hover:bg-surface-elevated"
                              }`}
                            >
                              <span
                                className={`w-[42%] pr-4 font-medium ${
                                  isSelected
                                    ? "text-tool-photo"
                                    : "text-content-primary"
                                }`}
                              >
                                {preset.name}
                              </span>
                              <span className="w-[33%] pr-4 text-content-secondary">
                                {preset.width} × {preset.height}px
                              </span>
                              <span className="w-[25%] text-content-secondary">
                                {preset.maxKb} KB
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedSize("custom");
                  resetResult();
                }}
                className={`mt-3 w-full rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                  isCustom
                    ? "border-tool-photo bg-tool-photo/10 text-content-primary"
                    : "border-surface-border bg-surface-elevated text-content-secondary hover:text-content-primary"
                }`}
              >
                Custom Size — set your own width, height, and file size
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="photo-width"
                  className="mb-1 block text-xs text-content-muted"
                >
                  Width (px)
                </label>
                <input
                  id="photo-width"
                  type="number"
                  min={50}
                  max={2000}
                  value={customWidth}
                  onChange={(event) => {
                    setCustomWidth(Number(event.target.value));
                    resetResult();
                  }}
                  className="w-full rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 text-content-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="photo-height"
                  className="mb-1 block text-xs text-content-muted"
                >
                  Height (px)
                </label>
                <input
                  id="photo-height"
                  type="number"
                  min={50}
                  max={2000}
                  value={customHeight}
                  onChange={(event) => {
                    setCustomHeight(Number(event.target.value));
                    resetResult();
                  }}
                  className="w-full rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 text-content-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="photo-max-kb"
                  className="mb-1 block text-xs text-content-muted"
                >
                  Max KB
                </label>
                <input
                  id="photo-max-kb"
                  type="number"
                  min={1}
                  max={5000}
                  value={maxKb}
                  disabled={isCustom}
                  onChange={(event) => {
                    setMaxKb(Number(event.target.value));
                    resetResult();
                  }}
                  className="w-full rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 text-content-primary disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            <div className="mt-10 space-y-6">
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                aria-label="Upload image file"
                className="hidden"
                onChange={handleInputChange}
              />

              {cropSession && (
                <ImageCropEditor
                  imageSrc={cropSession.imageSrc}
                  aspect={cropSession.aspect}
                  originalFile={cropSession.originalFile}
                  targetLabel={cropSession.targetLabel}
                  accent="photo"
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
                      ? "border-tool-photo"
                      : "border-tool-photo/30 hover:border-tool-photo"
                  }`}
                >
                  <UploadCloud className="mb-4 h-10 w-10 text-content-muted" />
                  <p className="font-medium text-content-primary">
                    Drop your photo here
                  </p>
                  <p className="mt-1 text-sm text-content-secondary">
                    or click to browse — max 10MB
                  </p>
                </button>
              )}

              {file && previewUrl && !cropSession && (
                <>
                  <div className="flex justify-center rounded-xl border border-surface-border bg-surface-card p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt="Original preview"
                      className="max-h-[150px] rounded-lg object-contain"
                    />
                  </div>

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
                </>
              )}

              {error && (
                <p className="text-center text-sm text-tool-photo">{error}</p>
              )}

              {file && !resizedBlob && !cropSession && (
                <>
                  <div>
                    <p className="mb-3 text-sm font-medium text-content-primary">
                      Background Color
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {BACKGROUND_OPTIONS.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => {
                            setBgColor(option.value);
                            resetResult();
                          }}
                          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                            bgColor === option.value
                              ? "border-tool-photo bg-tool-photo/10 text-content-primary"
                              : "border-surface-border bg-surface-card text-content-secondary"
                          }`}
                        >
                          <span
                            className="h-4 w-4 rounded-full border border-surface-border"
                            style={{
                              backgroundColor:
                                option.value === "transparent"
                                  ? "transparent"
                                  : option.value,
                              backgroundImage:
                                option.value === "transparent"
                                  ? "linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)"
                                  : undefined,
                              backgroundSize:
                                option.value === "transparent"
                                  ? "8px 8px"
                                  : undefined,
                              backgroundPosition:
                                option.value === "transparent"
                                  ? "0 0, 4px 4px"
                                  : undefined,
                            }}
                          />
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResize}
                    disabled={isProcessing || isResizeDisabled}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-l-4 border-l-amber-400 bg-tool-photo px-4 py-4 text-base font-semibold text-white shadow-lg shadow-tool-photo/20 transition-colors hover:bg-[#D97706] disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Resizing...
                      </>
                    ) : (
                      "Resize Photo"
                    )}
                  </button>
                </>
              )}

              {resizedBlob && resizedPreviewUrl && previewUrl && (
                <div className="space-y-4">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-card p-4">
                      <p className="mb-3 text-sm font-medium text-content-secondary">
                        Original
                      </p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewUrl}
                        alt="Original"
                        className="mx-auto max-h-[180px] rounded-lg object-contain"
                      />
                    </div>
                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-card p-4">
                      <p className="mb-3 text-sm font-medium text-content-secondary">
                        Resized
                      </p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={resizedPreviewUrl}
                        alt="Resized"
                        className="mx-auto max-h-[180px] rounded-lg object-contain"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-surface-border bg-surface-card p-4 text-center sm:text-left">
                    <span className="text-content-secondary">
                      Resized to {outputWidth} × {outputHeight} px
                    </span>
                    <span className="ml-2 rounded bg-tool-photo/15 px-2 py-0.5 text-xs font-semibold text-tool-photo">
                      {activePreset?.name ?? "Custom"}
                    </span>
                    <span className="mt-1 block text-sm text-content-muted sm:mt-0 sm:ml-2 sm:inline">
                      · {formatFileSize(resizedBlob.size)}
                      {!isCustom && maxKb > 0 && ` (max ${maxKb} KB)`}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full rounded-xl bg-tool-convert px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-[#059669]"
                  >
                    Download Photo
                  </button>

                  <button
                    type="button"
                    onClick={handleResizeAnother}
                    className="w-full text-center text-sm text-content-secondary transition-colors hover:text-content-primary"
                  >
                    Resize Another
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

          <RelatedTools currentSlug="photo-resizer" />
          <ToolFeedback toolName="Photo Resizer" />
          <ToolSeoContent slug="photo-resizer" />
          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
