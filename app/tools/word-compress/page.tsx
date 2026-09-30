"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  FileDown,
  Loader2,
  ShieldCheck,
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
import type { OfficeCompressLevel, OfficeCompressResult } from "@/lib/office-compress";
import {
  friendlyCompressError,
  runWordCompress,
} from "./run-compress";

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".docx", ".docm", ".dotx"] as const;

const levels: { id: OfficeCompressLevel; label: string; description: string }[] = [
  { id: "light", label: "Light", description: "Smaller file, pictures stay sharp" },
  { id: "recommended", label: "Recommended", description: "Best balance for email and portals" },
  { id: "strong", label: "Strong", description: "Smallest file, for tight upload limits" },
];

const howItWorksSteps = [
  { step: "01", icon: Upload, title: "Add your file", description: "Drop a .docx, .docm, or .dotx" },
  { step: "02", icon: SlidersHorizontal, title: "Choose a level", description: "Images are compressed in your browser" },
  { step: "03", icon: Download, title: "Download", description: "Save the smaller Word file" },
];

const LEGACY_DOC_MESSAGE =
  "Old .doc format. Open it in Word or Google Docs and save as .docx, or convert it with our Word to PDF tool.";

function extensionOf(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot).toLowerCase();
}

function isAcceptedWordFile(file: File): boolean {
  return ACCEPTED_EXTENSIONS.includes(extensionOf(file.name) as (typeof ACCEPTED_EXTENSIONS)[number]);
}

function compressedDownloadName(filename: string): string {
  const match = filename.match(/^(.*?)(\.(docx|docm|dotx))$/i);
  if (match) return `${match[1]}-compressed${match[2]}`;
  return `${filename}-compressed.docx`;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function shrinkPercent(original: number, output: number): number {
  if (original <= 0) return 0;
  return Math.max(0, Math.round((1 - output / original) * 100));
}

export default function WordCompressPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const busyRef = useRef(false);
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<OfficeCompressLevel>("recommended");
  const [removeFonts, setRemoveFonts] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [result, setResult] = useState<OfficeCompressResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const resetResult = useCallback(() => {
    setResult(null);
    setProgress(null);
    setError(null);
  }, []);

  const handleFile = useCallback(
    (selected: File) => {
      if (busyRef.current) return;
      const extension = extensionOf(selected.name);
      if (extension === ".doc") {
        setError(LEGACY_DOC_MESSAGE);
        return;
      }
      if (!isAcceptedWordFile(selected)) {
        setError("Please choose a .docx, .docm, or .dotx file.");
        return;
      }
      if (selected.size > MAX_FILE_SIZE) {
        setError("This file is larger than 100 MB.");
        return;
      }
      setFile(selected);
      setLevel("recommended");
      setRemoveFonts(false);
      resetResult();
    },
    [resetResult],
  );

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const pasted = event.clipboardData?.files?.[0];
      if (pasted) handleFile(pasted);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [handleFile]);

  const handleRemoveFile = () => {
    if (busyRef.current) return;
    setFile(null);
    resetResult();
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleCompress = async () => {
    if (!file || busyRef.current) return;
    busyRef.current = true;
    setIsProcessing(true);
    setError(null);
    setResult(null);
    setProgress("Reading document");

    try {
      const buffer = await file.arrayBuffer();
      const compressed = await runWordCompress(
        buffer,
        { level, removeEmbeddedFonts: removeFonts },
        (update) => setProgress(update.stage),
      );
      setResult(compressed);
      setProgress(null);
    } catch (caught) {
      setProgress(null);
      setError(friendlyCompressError(caught) ?? "Couldn't compress this document. Please try a different file.");
    } finally {
      busyRef.current = false;
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || result.unchanged || !file) return;
    const url = URL.createObjectURL(result.blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = compressedDownloadName(file.name);
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const optimizedCount = result?.images.filter((image) => image.action !== "skipped").length ?? 0;
  const skippedCount = result?.images.filter((image) => image.action === "skipped").length ?? 0;

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
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-pdf/10">
                <FileDown className="h-6 w-6 text-tool-pdf" strokeWidth={1.75} />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                Compress Word Document
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Reduce DOCX file size by compressing images — free, private, in your browser.
              </p>
              <p className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-card px-3 py-1.5 text-xs text-content-secondary">
                <ShieldCheck className="h-3.5 w-3.5 text-tool-convert" aria-hidden />
                Runs in your browser — your document is never uploaded
              </p>
              <div className="mt-4 flex justify-center">
                <FavoriteButton slug="word-compress" />
              </div>
            </div>

            <div className="mt-10 space-y-6">
              <input
                ref={inputRef}
                type="file"
                accept=".docx,.docm,.dotx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                aria-label="Upload Word document"
                className="hidden"
                onChange={(event) => {
                  const selected = event.target.files?.[0];
                  if (selected) handleFile(selected);
                  event.target.value = "";
                }}
              />

              <button
                type="button"
                aria-label="File upload area"
                onClick={() => inputRef.current?.click()}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(event) => {
                  event.preventDefault();
                  setIsDragging(false);
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  setIsDragging(false);
                  const dropped = event.dataTransfer.files?.[0];
                  if (dropped) handleFile(dropped);
                }}
                className={`flex min-h-[160px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-surface-card p-12 transition-colors sm:min-h-[200px] ${
                  isDragging ? "border-tool-pdf" : "border-tool-pdf/30 hover:border-tool-pdf"
                }`}
              >
                <UploadCloud className="mb-4 h-10 w-10 text-content-muted" />
                <p className="font-medium text-content-primary">Drop your Word file here</p>
                <p className="mt-1 text-sm text-content-secondary">
                  or click to browse — .docx, .docm, .dotx — max 100 MB. You can also paste a file.
                </p>
              </button>

              {file && (
                <div className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-card p-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-content-primary">{file.name}</p>
                    <p className="mt-0.5 text-sm text-content-secondary">{formatFileSize(file.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    aria-label="Remove file"
                    disabled={isProcessing}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-tool-pdf transition-colors hover:bg-tool-pdf/10 disabled:opacity-50"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {file && !result && (
                <>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {levels.map((item) => {
                      const selected = level === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setLevel(item.id)}
                          disabled={isProcessing}
                          aria-pressed={selected}
                          className={`rounded-xl border p-4 text-left transition-colors disabled:opacity-70 ${
                            selected
                              ? "border-tool-pdf bg-tool-pdf/5"
                              : "border-surface-border bg-surface-card hover:border-tool-pdf/40"
                          }`}
                        >
                          <p className="font-semibold text-content-primary">{item.label}</p>
                          <p className="mt-1 text-sm text-content-secondary">{item.description}</p>
                        </button>
                      );
                    })}
                  </div>

                  <label className="flex items-center gap-2 text-sm text-content-secondary">
                    <input
                      type="checkbox"
                      checked={removeFonts}
                      disabled={isProcessing}
                      onChange={(event) => setRemoveFonts(event.target.checked)}
                      className="h-4 w-4 accent-red-500"
                    />
                    Remove embedded fonts
                  </label>
                </>
              )}

              {error && (
                <div className="rounded-xl border border-tool-pdf bg-tool-pdf/5 px-4 py-3 text-center text-sm text-tool-pdf">
                  {error === LEGACY_DOC_MESSAGE ? (
                    <p>
                      Old .doc format. Open it in Word or Google Docs and save as .docx, or convert it
                      with our{" "}
                      <Link href="/tools/word-to-pdf" className="underline">
                        Word to PDF
                      </Link>{" "}
                      tool.
                    </p>
                  ) : (
                    error
                  )}
                </div>
              )}

              {file && !result && (
                <button
                  type="button"
                  onClick={handleCompress}
                  disabled={isProcessing}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-l-4 border-l-red-300 bg-tool-pdf px-4 py-4 text-base font-semibold text-white shadow-lg shadow-tool-pdf/20 transition-colors hover:bg-red-600 disabled:opacity-70"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {progress
                        ? progress.startsWith("Optimizing")
                          ? `${progress}…`
                          : progress
                        : "Compressing…"}
                    </>
                  ) : (
                    "Compress Word file"
                  )}
                </button>
              )}

              {result && (
                <div className="space-y-4">
                  {result.unchanged ? (
                    <div className="rounded-xl border border-surface-border bg-surface-card p-5 text-center">
                      <p className="text-lg font-semibold text-content-primary">
                        Your file is already optimized
                      </p>
                      {result.notes.map((note) => (
                        <p key={note} className="mt-2 text-sm text-content-secondary">
                          {note}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="rounded-xl border border-surface-border bg-surface-card p-5 text-center">
                        <p className="text-xl font-bold text-content-primary">
                          {formatFileSize(result.originalBytes)} → {formatFileSize(result.outputBytes)} (
                          {shrinkPercent(result.originalBytes, result.outputBytes)}% smaller)
                        </p>
                        <p className="mt-2 text-sm text-content-secondary">
                          {optimizedCount} {optimizedCount === 1 ? "image" : "images"} optimized,{" "}
                          {skippedCount} skipped
                        </p>
                      </div>

                      {result.notes.map((note) => (
                        <p key={note} className="text-center text-sm text-content-secondary">
                          {note}
                        </p>
                      ))}

                      {result.images.length > 0 && (
                        <details className="rounded-xl border border-surface-border bg-surface-card p-4">
                          <summary className="cursor-pointer text-sm font-medium text-content-primary">
                            Image details
                          </summary>
                          <ul className="mt-3 space-y-2 text-sm text-content-secondary">
                            {result.images.map((image) => (
                              <li key={`${image.name}-${image.before}`} className="flex justify-between gap-3">
                                <span className="min-w-0 truncate">{image.name}</span>
                                <span className="shrink-0">
                                  {formatFileSize(image.before)} → {formatFileSize(image.after)} · {image.action}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </details>
                      )}

                      <button
                        type="button"
                        onClick={handleDownload}
                        className="w-full rounded-xl bg-brand-blue px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-[#2563EB]"
                      >
                        Download
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="w-full text-center text-sm text-content-secondary transition-colors hover:text-content-primary"
                  >
                    Compress another
                  </button>

                  <p className="text-center text-sm text-content-secondary">
                    Next steps:{" "}
                    <Link href="/tools/word-to-pdf" className="text-brand-blue hover:underline">
                      Word to PDF
                    </Link>
                    {" · "}
                    <Link href="/tools/pdf-compress" className="text-brand-blue hover:underline">
                      Compress PDF
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div key={step.title} className="rounded-xl border border-surface-border bg-surface-card p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-pdf/10">
                    <step.icon className="h-5 w-5 text-tool-pdf" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools
            currentSlug="word-compress"
            slugs={["word-to-pdf", "pdf-compress", "image-compress", "word-to-jpg"]}
          />
          <ToolFeedback toolName="Compress Word Document" />
          <ToolSeoContent slug="word-compress" />
          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
