"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
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
import {
  formatFileSize,
  PHOTO_SIZES,
  resizePhoto,
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

function isAcceptedImage(file: File) {
  return (
    ACCEPTED_TYPES.includes(file.type) ||
    /\.(jpe?g|png|webp)$/i.test(file.name)
  );
}

export default function PhotoResizerPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resizedBlob, setResizedBlob] = useState<Blob | null>(null);
  const [resizedPreviewUrl, setResizedPreviewUrl] = useState<string | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState("passport");
  const [customWidth, setCustomWidth] = useState(300);
  const [customHeight, setCustomHeight] = useState(300);
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [outputWidth, setOutputWidth] = useState(0);
  const [outputHeight, setOutputHeight] = useState(0);

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

  const getTargetDimensions = useCallback(() => {
    if (selectedSize === "custom") {
      return { width: customWidth, height: customHeight };
    }
    const preset = PHOTO_SIZES.find((size) => size.id === selectedSize);
    return {
      width: preset?.width ?? 354,
      height: preset?.height ?? 472,
    };
  }, [selectedSize, customWidth, customHeight]);

  const isResizeDisabled =
    !file ||
    (selectedSize === "custom" && (customWidth <= 0 || customHeight <= 0));

  const handleFile = useCallback(
    (selected: File) => {
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
      setFile(selected);
      setPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return URL.createObjectURL(selected);
      });
    },
    [resetResult]
  );

  const handleRemoveFile = () => {
    setFile(null);
    resetResult();
    setSelectedSize("passport");
    setCustomWidth(300);
    setCustomHeight(300);
    setBgColor("#FFFFFF");
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

    const { width, height } = getTargetDimensions();
    setIsProcessing(true);
    setError(null);
    resetResult();

    try {
      const blob = await resizePhoto(file, width, height, bgColor);
      setResizedBlob(blob);
      setOutputWidth(width);
      setOutputHeight(height);
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

  const presetSizes = PHOTO_SIZES.filter((size) => size.id !== "custom");

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

            <div className="mt-10 space-y-6">
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
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

              {file && previewUrl && (
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

              {file && !resizedBlob && (
                <>
                  <div>
                    <p className="mb-3 text-sm font-medium text-content-primary">
                      Select photo size
                    </p>
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                      {PHOTO_SIZES.map((size) => (
                        <button
                          key={size.id}
                          type="button"
                          onClick={() => {
                            setSelectedSize(size.id);
                            resetResult();
                          }}
                          className={`rounded-xl border p-4 text-left transition-colors ${
                            selectedSize === size.id
                              ? "border-tool-photo bg-tool-photo/10"
                              : "border-surface-border bg-surface-card"
                          }`}
                        >
                          <p className="font-semibold text-content-primary">
                            {size.name}
                          </p>
                          <p className="mt-1 text-sm text-content-secondary">
                            {size.id === "custom"
                              ? "Custom dimensions"
                              : `${size.width} × ${size.height} px`}
                          </p>
                          <p className="mt-1 text-xs text-content-muted">
                            {size.description}
                          </p>
                        </button>
                      ))}
                    </div>

                    {selectedSize === "custom" && (
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1 block text-xs text-content-muted">
                            Width (px)
                          </label>
                          <input
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
                          <label className="mb-1 block text-xs text-content-muted">
                            Height (px)
                          </label>
                          <input
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
                      </div>
                    )}
                  </div>

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
                      {PHOTO_SIZES.find((s) => s.id === selectedSize)?.name ??
                        "Custom"}
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

          <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-surface-border bg-surface-card p-5">
            <h2 className="mb-4 text-sm font-semibold text-content-primary">
              Reference: Indian Document Photo Sizes
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-surface-border text-content-muted">
                    <th className="pb-2 pr-4 font-medium">Document</th>
                    <th className="pb-2 pr-4 font-medium">Size</th>
                    <th className="pb-2 font-medium">Dimensions</th>
                  </tr>
                </thead>
                <tbody className="text-content-secondary">
                  {presetSizes.map((size) => (
                    <tr
                      key={size.id}
                      className="border-b border-surface-border/50 last:border-0"
                    >
                      <td className="py-2 pr-4 text-content-primary">
                        {size.name}
                      </td>
                      <td className="py-2 pr-4">{size.description}</td>
                      <td className="py-2">
                        {size.width} × {size.height} px
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
