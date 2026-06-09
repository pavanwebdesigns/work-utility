"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  Eraser,
  Loader2,
  Sparkles,
  Upload,
  UploadCloud,
  X,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { DinoGame } from "@/components/DinoGame";
import { formatFileSize, removeBg } from "@/lib/bg-remove";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const howItWorksSteps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload",
    description: "Select your JPG, PNG, or WebP image",
  },
  {
    step: "02",
    icon: Sparkles,
    title: "Process",
    description: "AI removes the background in your browser",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Get a transparent PNG instantly",
  },
];

export default function BgRemoveClient() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultPreviewUrl, setResultPreviewUrl] = useState<string | null>(
    null
  );
  const [originalSize, setOriginalSize] = useState(0);
  const [outputSize, setOutputSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (resultPreviewUrl) URL.revokeObjectURL(resultPreviewUrl);
    };
  }, [previewUrl, resultPreviewUrl]);

  const resetResult = useCallback(() => {
    setResultBlob(null);
    setOutputSize(0);
    setResultPreviewUrl((current) => {
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

    setFile(selected);
    setOriginalSize(selected.size);
    resetResult();
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return URL.createObjectURL(selected);
    });
    setError(null);
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
    resetResult();
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleProcess = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    resetResult();

    try {
      const blob = await removeBg(file);
      setResultBlob(blob);
      setOutputSize(blob.size);
      setResultPreviewUrl(URL.createObjectURL(blob));
    } catch {
      setError("Background removal failed. Please try a different image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const url = URL.createObjectURL(resultBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `bg-removed_${baseName}.png`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <Header />
      <main id="main-content" className="flex-1">
        <div className="px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex cursor-pointer items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <div className="pt-10 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-image/10">
                <Eraser className="h-6 w-6 text-tool-image" strokeWidth={1.75} />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                Background Remover
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Remove the background from any image with AI. Runs entirely in
                your browser — no uploads.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                className="hidden"
                aria-label="Upload image file"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) handleFileSelect(selected);
                  e.target.value = "";
                }}
              />

              {!file && (
                <button
                  type="button"
                  aria-label="File upload area"
                  onClick={() => inputRef.current?.click()}
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
                  className={`flex min-h-[160px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-surface-card p-12 transition-colors sm:min-h-[200px] ${
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

              {file && previewUrl && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-card p-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-content-primary">
                        {file.name}
                      </p>
                      <p className="mt-0.5 text-sm text-content-secondary">
                        {formatFileSize(originalSize)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemove}
                      aria-label="Remove uploaded image"
                      className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-tool-image transition-colors hover:bg-tool-image/10"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex justify-center rounded-xl border border-surface-border bg-surface-card p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt="Original preview"
                      className="max-h-48 rounded-lg object-contain"
                    />
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-brand-blue/20 bg-brand-blue/5 px-4 py-3 text-center text-sm text-content-secondary">
                AI model loads on first use (~5MB). Subsequent removals are
                instant.
              </div>

              {isProcessing && (
                <div className="rounded-xl border border-surface-border bg-surface-card p-6 text-center">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-tool-image" />
                  <p className="mt-3 font-medium text-content-primary">
                    Removing background... This may take 10–20 seconds
                  </p>
                  <p className="mt-1 text-sm text-content-secondary">
                    AI model is running in your browser
                  </p>
                </div>
              )}

              {error && (
                <p className="text-center text-sm text-tool-image">{error}</p>
              )}

              {file && !resultBlob && !isProcessing && (
                <button
                  type="button"
                  onClick={handleProcess}
                  aria-label="Remove image background"
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-l-4 border-l-purple-400 bg-tool-image px-4 py-4 text-base font-semibold text-white shadow-lg shadow-tool-image/20 transition-colors hover:bg-[#7C3AED]"
                >
                  Remove Background
                </button>
              )}

              {resultBlob && resultPreviewUrl && previewUrl && (
                <div className="space-y-4">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-card p-4">
                      <p className="mb-3 text-sm font-medium text-content-secondary">
                        Original
                      </p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewUrl}
                        alt="Original image"
                        className="mx-auto max-h-[180px] rounded-lg object-contain"
                      />
                    </div>
                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-card p-4">
                      <p className="mb-3 text-sm font-medium text-content-secondary">
                        Result
                      </p>
                      <div
                        className="mx-auto max-w-fit rounded-lg p-2"
                        style={{
                          background:
                            "repeating-conic-gradient(#1A2235 0% 25%, #111827 0% 50%) 0 0 / 20px 20px",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={resultPreviewUrl}
                          alt="Background removed result"
                          className="max-h-[180px] rounded-lg object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-surface-border bg-surface-card p-4 text-center">
                    <span className="text-content-secondary">
                      {formatFileSize(originalSize)}
                    </span>
                    <span className="mx-2 text-content-muted">→</span>
                    <span className="font-bold text-content-primary">
                      {formatFileSize(outputSize)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownload}
                    aria-label="Download transparent PNG"
                    className="w-full cursor-pointer rounded-xl bg-emerald px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-emerald/90"
                  >
                    Download PNG (Transparent)
                  </button>

                  <button
                    type="button"
                    onClick={handleRemove}
                    aria-label="Remove another image"
                    className="w-full cursor-pointer text-center text-sm text-content-secondary transition-colors hover:text-content-primary"
                  >
                    Remove Another
                  </button>
                </div>
              )}

              <p className="text-center text-xs text-content-muted">
                Processing happens entirely in your browser. Your images are
                never uploaded to any server.
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



          <RelatedTools currentSlug="bg-remove" />
          <ToolFeedback toolName="Background Remover" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
