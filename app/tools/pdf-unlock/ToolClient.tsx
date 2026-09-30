"use client";

import { useCallback, useRef, useState } from "react";
import {
  Download,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockOpen,
  Upload,
  UploadCloud,
  X,
} from "lucide-react";
import { formatFileSize, unlockPDF } from "@/lib/pdf-api";

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

function isPdfFile(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

export default function PdfUnlockPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((selected: File) => {
    if (!isPdfFile(selected)) {
      setError("Please select a valid PDF file.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("PDF must be 50MB or smaller.");
      return;
    }

    setFile(selected);
    setSuccess(false);
    setError(null);
  }, []);

  const handleClear = () => {
    setFile(null);
    setPassword("");
    setSuccess(false);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleUnlock = async () => {
    if (!file || !password.trim()) {
      setError("Please enter the PDF password.");
      return;
    }

    setIsProcessing(true);
    setSuccess(false);
    setError(null);

    try {
      await unlockPDF(file, password);
      setSuccess(true);
    } catch (err) {
      if (err instanceof Error && err.message === "Incorrect password") {
        setError("❌ Wrong password. Please try again.");
      } else {
        setError("Unlock failed. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
<div className="mx-auto max-w-2xl">
            

            <div className="mt-10 space-y-6">
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf,.pdf"
                aria-label="Upload PDF file"
                className="hidden"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) handleFile(selected);
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
                    if (dropped) handleFile(dropped);
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

              {file && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-card p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-tool-pdf/10">
                      <LockOpen className="h-5 w-5 text-tool-pdf" />
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

                  <div>
                    <label
                      htmlFor="pdf-password"
                      className="mb-2 block text-sm font-medium text-content-primary"
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
                        className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-3 pr-12 text-sm text-content-primary outline-none transition-colors focus:border-tool-pdf"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted transition-colors hover:text-content-primary"
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

                  <div className="rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-xs leading-relaxed text-content-secondary">
                    <p className="font-medium text-content-primary">💡 Common bank PDF passwords</p>
                    <p className="mt-2">SBI: Date of birth (DDMMYYYY)</p>
                    <p>HDFC: DOB + last 4 digits of account</p>
                    <p>ICICI: DOB (DDMMYYYY)</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleUnlock}
                    disabled={isProcessing || !password.trim()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-tool-pdf px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-[#DC2626] disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Unlocking PDF...
                      </>
                    ) : (
                      "Unlock PDF"
                    )}
                  </button>
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-tool-convert/30 bg-tool-convert/5 px-4 py-3 text-center text-sm text-tool-convert">
                  ✅ PDF unlocked! Downloading...
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-tool-pdf bg-tool-pdf/5 px-4 py-3 text-center text-sm text-tool-pdf">
                  {error}
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
    </>
  );
}

