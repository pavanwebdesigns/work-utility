"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  Images,
  ListOrdered,
  Loader2,
  Plus,
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
import { convertImagesToPdf, formatFileSize } from "@/lib/image-to-pdf";
import { ImageCropEditor } from "@/components/ImageCropEditor";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  A4_PDF_CROP_TARGET,
  shouldShowCropUI,
} from "@/lib/image-crop";

const MAX_FILES = 10;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const howItWorksSteps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload",
    description: "Add one or more JPG/PNG images",
  },
  {
    step: "02",
    icon: ListOrdered,
    title: "Order",
    description: "Images appear in the order you added them",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Get a single PDF with all your images",
  },
];

function isAcceptedImage(file: File) {
  return (
    ACCEPTED_TYPES.includes(file.type) ||
    /\.(jpe?g|png|webp)$/i.test(file.name)
  );
}

interface FileEntry {
  file: File;
  previewUrl: string;
}

interface PendingCrop {
  file: File;
  imageSrc: string;
}

export default function ImageToPdfPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const addMoreRef = useRef<HTMLInputElement>(null);
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [cropQueue, setCropQueue] = useState<PendingCrop[]>([]);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputSize, setOutputSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      entries.forEach((entry) => URL.revokeObjectURL(entry.previewUrl));
    };
  }, [entries]);

  const resetResult = useCallback(() => {
    setConvertedBlob(null);
    setOutputSize(0);
    setError(null);
  }, []);

  const appendEntry = useCallback(
    (file: File) => {
      setEntries((current) => {
        if (current.length >= MAX_FILES) return current;

        resetResult();
        return [
          ...current,
          { file, previewUrl: URL.createObjectURL(file) },
        ];
      });
    },
    [resetResult]
  );

  const addFiles = useCallback(
    async (incoming: FileList | File[]) => {
      const list = Array.from(incoming);
      const valid: File[] = [];

      for (const file of list) {
        if (!isAcceptedImage(file)) {
          setError("Only JPG, PNG, and WebP images are supported.");
          continue;
        }
        if (file.size > MAX_FILE_SIZE) {
          setError("Each image must be 10MB or smaller.");
          continue;
        }
        valid.push(file);
      }

      if (valid.length === 0) return;

      const remaining = MAX_FILES - entries.length - cropQueue.length;
      if (remaining <= 0) {
        setError(`Maximum ${MAX_FILES} images allowed.`);
        return;
      }

      const toProcess = valid.slice(0, remaining);
      if (valid.length > remaining) {
        setError(
          `Only ${remaining} more image(s) could be added (max ${MAX_FILES}).`
        );
      } else {
        setError(null);
      }

      for (const file of toProcess) {
        const needsCrop = await shouldShowCropUI(file, A4_PDF_CROP_TARGET);
        if (needsCrop) {
          setCropQueue((current) => [
            ...current,
            { file, imageSrc: URL.createObjectURL(file) },
          ]);
        } else {
          appendEntry(file);
        }
      }
    },
    [appendEntry, cropQueue.length, entries.length]
  );

  const handleRemoveFile = (index: number) => {
    setEntries((current) => {
      const next = [...current];
      const removed = next.splice(index, 1)[0];
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return next;
    });
    resetResult();
  };

  const handleClearAll = () => {
    entries.forEach((entry) => URL.revokeObjectURL(entry.previewUrl));
    cropQueue.forEach((item) => URL.revokeObjectURL(item.imageSrc));
    setEntries([]);
    setCropQueue([]);
    resetResult();
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
    if (addMoreRef.current) addMoreRef.current.value = "";
  };

  const activeCrop = cropQueue[0];

  const handleCropApply = (croppedFile: File) => {
    appendEntry(croppedFile);
    setCropQueue((current) => {
      const [first, ...rest] = current;
      if (first) URL.revokeObjectURL(first.imageSrc);
      return rest;
    });
  };

  const handleCropCancel = () => {
    setCropQueue((current) => {
      const [first, ...rest] = current;
      if (first) URL.revokeObjectURL(first.imageSrc);
      return rest;
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) addFiles(event.target.files);
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
    if (event.dataTransfer.files?.length) addFiles(event.dataTransfer.files);
  };

  const handleConvert = async () => {
    if (entries.length === 0) return;

    setIsProcessing(true);
    setError(null);
    resetResult();

    try {
      const blob = await convertImagesToPdf(entries.map((entry) => entry.file));
      setConvertedBlob(blob);
      setOutputSize(blob.size);
    } catch {
      setError("PDF creation failed. Please try different images.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!convertedBlob) return;

    const url = URL.createObjectURL(convertedBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `images_${Date.now()}.pdf`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleCreateAnother = () => {
    handleClearAll();
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
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-img2pdf/10">
                <Images
                  className="h-6 w-6 text-tool-img2pdf"
                  strokeWidth={1.75}
                />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                Image to PDF
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Combine multiple JPG, PNG images into a single PDF. Each image
                gets its own page. Runs in your browser.
              </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="image-to-pdf" />
            </div>
            </div>

            <div className="mt-10 space-y-6">
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                multiple
                aria-label="Upload image file" className="hidden"
                onChange={handleInputChange}
              />
              <input
                ref={addMoreRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                multiple
                aria-label="Upload image file" className="hidden"
                onChange={handleInputChange}
              />

              {activeCrop && (
                <ImageCropEditor
                  imageSrc={activeCrop.imageSrc}
                  aspect={A4_PDF_CROP_TARGET.width / A4_PDF_CROP_TARGET.height}
                  originalFile={activeCrop.file}
                  targetLabel="A4 PDF page"
                  accent="pink"
                  onApply={handleCropApply}
                  onCancel={handleCropCancel}
                />
              )}

              {entries.length === 0 && !activeCrop && (
                <button
                  type="button"
                 aria-label="File upload area" onClick={() => inputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`flex min-h-[160px] sm:min-h-[200px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-surface-card p-12 transition-colors ${
                    isDragging
                      ? "border-tool-img2pdf"
                      : "border-tool-img2pdf/30 hover:border-tool-img2pdf"
                  }`}
                >
                  <UploadCloud className="mb-4 h-10 w-10 text-content-muted" />
                  <p className="font-medium text-content-primary">
                    Drop your images here
                  </p>
                  <p className="mt-1 text-sm text-content-secondary">
                    or click to browse — up to 10 images, 10MB each
                  </p>
                </button>
              )}

              {entries.length > 0 && (
                <div className="space-y-3 rounded-xl border border-surface-border bg-surface-card p-4">
                  {entries.map((entry, index) => (
                    <div
                      key={`${entry.file.name}-${index}`}
                      className="flex items-center gap-3"
                    >
                      <span className="w-5 shrink-0 text-xs font-semibold text-content-muted">
                        {index + 1}
                      </span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={entry.previewUrl}
                        alt=""
                        className="h-8 w-8 shrink-0 rounded object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-content-primary">
                          {entry.file.name}
                        </p>
                        <p className="text-xs text-content-secondary">
                          {formatFileSize(entry.file.size)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        aria-label={`Remove ${entry.file.name}`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-tool-img2pdf transition-colors hover:bg-tool-img2pdf/10"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  {entries.length < MAX_FILES && (
                    <button
                      type="button"
                      onClick={() => addMoreRef.current?.click()}
                      className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-surface-border py-2.5 text-sm text-content-secondary transition-colors hover:border-tool-img2pdf hover:text-content-primary"
                    >
                      <Plus className="h-4 w-4" />
                      Add more images
                    </button>
                  )}
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-tool-pdf bg-tool-pdf/5 px-4 py-3 text-center text-sm text-tool-pdf">
                  {error}
                </div>
              )}

              {entries.length > 0 && !convertedBlob && (
                <button
                  type="button"
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-l-4 border-l-pink-400 bg-tool-img2pdf px-4 py-4 text-base font-semibold text-white shadow-lg shadow-tool-img2pdf/20 transition-colors hover:bg-[#DB2777] disabled:opacity-70"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Creating PDF...
                    </>
                  ) : (
                    `Create PDF (${entries.length} images)`
                  )}
                </button>
              )}

              {convertedBlob && (
                <div className="space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-card p-5">
                      <p className="text-sm text-content-secondary">
                        Images Combined
                      </p>
                      <p className="mt-1 text-xl font-bold text-content-primary">
                        {entries.length} images
                      </p>
                    </div>
                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-card p-5">
                      <p className="text-sm text-content-secondary">
                        Output PDF Size
                      </p>
                      <p className="mt-1 text-xl font-bold text-content-primary">
                        {formatFileSize(outputSize)}
                      </p>
                    </div>
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
                    onClick={handleCreateAnother}
                    className="w-full text-center text-sm text-content-secondary transition-colors hover:text-content-primary"
                  >
                    Create Another PDF
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
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-img2pdf/10">
                    <step.icon className="h-5 w-5 text-tool-img2pdf" />
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



          <RelatedTools currentSlug="image-to-pdf" />
          <ToolFeedback toolName="Image to PDF" />
          <ToolSeoContent slug="image-to-pdf" />
          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
