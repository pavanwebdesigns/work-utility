"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  Eye,
  EyeOff,
  FileDown,
  KeyRound,
  Loader2,
  LockOpen,
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
  checkPDFPassword,
  formatFileSize,
  unlockPDF,
} from "@/lib/pdf-unlock";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const howItWorksSteps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload",
    description: "Select your password-protected PDF",
  },
  {
    step: "02",
    icon: KeyRound,
    title: "Enter Password",
    description: "Type the current PDF password",
  },
  {
    step: "03",
    icon: Download,
    title: "Download",
    description: "Get your unlocked PDF instantly",
  },
];

export default function PdfUnlockPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [unlockedBlob, setUnlockedBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [outputSize, setOutputSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = async (selected: File) => {
    if (selected.type !== "application/pdf" && !selected.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF files are supported.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("PDF must be 50MB or smaller.");
      return;
    }

    setFile(selected);
    setOriginalSize(selected.size);
    setUnlockedBlob(null);
    setOutputSize(0);
    setError(null);
    setPassword("");
    setIsChecking(true);

    try {
      const protected_ = await checkPDFPassword(selected);
      setIsPasswordProtected(protected_);
    } catch {
      setIsPasswordProtected(true);
    } finally {
      setIsChecking(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPassword("");
    setUnlockedBlob(null);
    setOriginalSize(0);
    setOutputSize(0);
    setError(null);
    setIsPasswordProtected(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleUnlock = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    setUnlockedBlob(null);

    try {
      const blob = await unlockPDF(file, password);
      setUnlockedBlob(blob);
      setOutputSize(blob.size);
    } catch {
      setError("Incorrect password. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!unlockedBlob || !file) return;
    const url = URL.createObjectURL(unlockedBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `unlocked_${file.name}`;
    anchor.click();
    URL.revokeObjectURL(url);
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
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-pdf/10">
                <LockOpen className="h-6 w-6 text-tool-pdf" strokeWidth={1.75} />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                Remove PDF Password
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Unlock password-protected PDFs when you know the password.
                Runs in your browser.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf,.pdf"
                aria-label="Upload PDF file" className="hidden"
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
                      ? "border-tool-pdf"
                      : "border-tool-pdf/30 hover:border-tool-pdf"
                  }`}
                >
                  <UploadCloud className="mb-4 h-10 w-10 text-content-muted" />
                  <p className="font-medium text-content-primary">Drop your PDF here</p>
                  <p className="mt-1 text-sm text-content-secondary">
                    or click to browse — max 50MB
                  </p>
                </button>
              )}

              {file && !unlockedBlob && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-card p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-tool-pdf/10">
                      <FileDown className="h-5 w-5 text-tool-pdf" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-content-primary">
                        {file.name}
                      </p>
                      <p className="text-xs text-content-secondary">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleClear}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-tool-pdf transition-colors hover:bg-tool-pdf/10"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {isChecking ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-content-secondary">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Checking PDF...
                    </div>
                  ) : (
                    <>
                      {!isPasswordProtected && (
                        <div className="rounded-xl border border-tool-photo/30 bg-tool-photo/5 px-4 py-3 text-center text-sm text-tool-photo">
                          This PDF is not password protected — you can still
                          remove restrictions and permissions.
                        </div>
                      )}

                      {isPasswordProtected && (
                        <div>
                          <label
                            htmlFor="pdf-password"
                            className="mb-1 block text-sm text-content-secondary"
                          >
                            PDF Password
                          </label>
                          <div className="relative">
                            <input
                              id="pdf-password"
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter PDF password"
                              className="w-full rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 pr-10 text-content-primary"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-content-muted"
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleUnlock}
                        disabled={isProcessing || (isPasswordProtected && !password)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border-l-4 border-l-red-400 bg-tool-pdf px-4 py-4 text-base font-semibold text-white shadow-lg shadow-tool-pdf/20 transition-colors hover:bg-[#DC2626] disabled:opacity-70"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Unlocking...
                          </>
                        ) : (
                          "Remove Password"
                        )}
                      </button>
                    </>
                  )}
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-tool-pdf bg-tool-pdf/5 px-4 py-3 text-center text-sm text-tool-pdf">
                  {error}
                </div>
              )}

              {unlockedBlob && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-tool-convert/30 bg-tool-convert/5 px-4 py-3 text-center text-sm text-tool-convert">
                    Password removed successfully
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-card p-5">
                      <p className="text-sm text-content-secondary">Original Size</p>
                      <p className="mt-1 text-xl font-bold text-content-primary">
                        {formatFileSize(originalSize)}
                      </p>
                    </div>
                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-card p-5">
                      <p className="text-sm text-content-secondary">Output Size</p>
                      <p className="mt-1 text-xl font-bold text-content-primary">
                        {formatFileSize(outputSize)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full rounded-xl bg-tool-convert px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-[#059669]"
                  >
                    Download Unlocked PDF
                  </button>

                  <button
                    type="button"
                    onClick={handleClear}
                    className="w-full text-center text-sm text-content-secondary transition-colors hover:text-content-primary"
                  >
                    Unlock Another
                  </button>
                </div>
              )}

              <p className="text-center text-xs text-content-muted">
                This tool removes password protection from PDFs where you know the
                password. It cannot bypass encryption without the correct
                password.
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



          <RelatedTools currentSlug="pdf-unlock" />
          <ToolFeedback toolName="Remove PDF Password" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
