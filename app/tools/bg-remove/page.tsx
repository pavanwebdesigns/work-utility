"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Link from "next/link";
import {
  Download,
  Eraser,
  Info,
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
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { downloadBlob } from "@/lib/pdf-api";
import {
  createBgRemoveWorker,
  formatFileSize,
  getBgRemoveDownloadName,
  hasBgRemoveModelLoaded,
  markBgRemoveModelLoaded,
  validateBgRemoveFile,
  type BgRemoveWorkerEvent,
} from "@/lib/bg-remove";

const howItWorksSteps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload",
    description: "Select your JPG, PNG, or WebP image (max 10MB)",
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

const checkerboardStyle: CSSProperties = {
  backgroundColor: "#1a2235",
  backgroundImage:
    "linear-gradient(45deg, #2a3348 25%, transparent 25%), linear-gradient(-45deg, #2a3348 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a3348 75%), linear-gradient(-45deg, transparent 75%, #2a3348 75%)",
  backgroundSize: "16px 16px",
  backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
};

export default function BgRemovePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(
    null
  );
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultPreviewUrl, setResultPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Removing background...");
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showFirstRunBanner, setShowFirstRunBanner] = useState(false);

  useEffect(() => {
    setShowFirstRunBanner(!hasBgRemoveModelLoaded());
  }, []);

  useEffect(() => {
    workerRef.current = createBgRemoveWorker();

    workerRef.current.onmessage = (event: MessageEvent<BgRemoveWorkerEvent>) => {
      const { type, payload } = event.data;

      switch (type) {
        case "STATUS":
          setStatusText(payload);
          break;
        case "PROGRESS":
          setProgress(payload);
          break;
        case "SUCCESS":
          markBgRemoveModelLoaded();
          setShowFirstRunBanner(false);
          setResultBlob(payload);
          setResultPreviewUrl(URL.createObjectURL(payload));
          setIsProcessing(false);
          setProgress(100);
          break;
        case "ERROR":
          setError(
            payload || "Background removal failed. Please try a different image."
          );
          setIsProcessing(false);
          break;
      }
    };

    workerRef.current.onerror = () => {
      setError("Background removal failed. Please try a different image.");
      setIsProcessing(false);
    };

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (originalPreviewUrl) URL.revokeObjectURL(originalPreviewUrl);
      if (resultPreviewUrl) URL.revokeObjectURL(resultPreviewUrl);
    };
  }, [originalPreviewUrl, resultPreviewUrl]);

  const resetResult = useCallback(() => {
    setResultBlob(null);
    setResultPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
    setProgress(0);
    setStatusText("Removing background...");
    setError(null);
  }, []);

  const handleRemove = useCallback(
    (selected: File) => {
      const validationError = validateBgRemoveFile(selected);
      if (validationError) {
        setError(validationError);
        return;
      }

      setError(null);
      resetResult();
      setFile(selected);
      setOriginalPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return URL.createObjectURL(selected);
      });

      setIsProcessing(true);
      setProgress(0);
      setStatusText("Removing background...");
      workerRef.current?.postMessage({ imageBlob: selected });
    },
    [resetResult]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) handleRemove(selected);
    event.target.value = "";
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) handleRemove(dropped);
  };

  const handleRemoveFile = () => {
    setFile(null);
    resetResult();
    setOriginalPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    downloadBlob(resultBlob, getBgRemoveDownloadName(file.name));
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
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
                your browser — no uploads, unlimited free use.
              </p>
              <div className="mt-4 flex justify-center">
                <FavoriteButton slug="bg-remove" />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {showFirstRunBanner && (
                <div className="flex gap-3 rounded-xl border border-brand-blue/30 bg-brand-blue/10 p-4 text-sm text-content-secondary">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                  <p>
                    First use downloads the AI model (~40MB). Subsequent uses
                    are instant.
                  </p>
                </div>
              )}

              {!file && (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
                    isDragging
                      ? "border-tool-image bg-tool-image/10"
                      : "border-surface-border bg-surface-card"
                  }`}
                >
                  <UploadCloud className="mx-auto h-10 w-10 text-tool-image" />
                  <p className="mt-4 font-medium text-content-primary">
                    Drop an image here or click to upload
                  </p>
                  <p className="mt-2 text-sm text-content-secondary">
                    JPG, PNG, or WebP — max 10MB
                  </p>
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="mt-6 rounded-xl bg-tool-image px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7C3AED]"
                  >
                    Choose Image
                  </button>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                </div>
              )}

              {file && (
                <div className="rounded-xl border border-surface-border bg-surface-card p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-content-primary">
                        {file.name}
                      </p>
                      <p className="text-xs text-content-secondary">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      disabled={isProcessing}
                      aria-label="Remove file"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-tool-image transition-colors hover:bg-tool-image/10 disabled:opacity-50"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {isProcessing && (
                <div className="space-y-3 rounded-xl border border-surface-border bg-surface-card p-6">
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin text-tool-image" />
                    <span className="font-medium text-content-primary">
                      {statusText}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-elevated">
                    <div
                      className="h-full rounded-full bg-tool-image transition-all duration-300"
                      style={{ width: `${Math.max(progress, 4)}%` }}
                    />
                  </div>
                  <p className="text-center text-xs text-content-muted">
                    {progress}% complete
                  </p>
                </div>
              )}

              {error && (
                <p className="text-center text-sm text-red-400">{error}</p>
              )}

              {file && originalPreviewUrl && resultPreviewUrl && !isProcessing && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <p className="mb-2 text-sm font-medium text-content-primary">
                        Before
                      </p>
                      <div className="flex justify-center rounded-xl border border-surface-border bg-surface-elevated p-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={originalPreviewUrl}
                          alt="Original"
                          className="max-h-64 w-full object-contain"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium text-content-primary">
                        After
                      </p>
                      <div
                        className="flex justify-center rounded-xl border border-surface-border p-4"
                        style={checkerboardStyle}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={resultPreviewUrl}
                          alt="Background removed"
                          className="max-h-64 w-full object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-l-4 border-l-purple-400 bg-tool-image px-4 py-4 text-base font-semibold text-white shadow-lg shadow-tool-image/20 transition-colors hover:bg-[#7C3AED]"
                  >
                    <Download className="h-5 w-5" />
                    Download {getBgRemoveDownloadName(file.name)}
                  </button>
                </div>
              )}

              <p className="text-center text-xs text-content-muted">
                🔒 Your image is processed entirely in your browser — nothing
                is uploaded to any server
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
          <ToolSeoContent slug="bg-remove" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
