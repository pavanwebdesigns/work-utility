"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Binary,
  Copy,
  Download,
  Eraser,
  FileText,
  UploadCloud,
  X,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import {
  decodeFromBase64,
  encodeFileToBase64,
  encodeToBase64,
  isValidBase64,
} from "@/lib/base64";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

type Mode = "encode" | "decode";
type InputType = "text" | "file";

const howItWorksSteps = [
  {
    step: "01",
    icon: Binary,
    title: "Choose",
    description: "Select Encode or Decode mode",
  },
  {
    step: "02",
    icon: FileText,
    title: "Input",
    description: "Type text or upload a file",
  },
  {
    step: "03",
    icon: Copy,
    title: "Copy",
    description: "Copy the Base64 output",
  },
];

export default function Base64Page() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<Mode>("encode");
  const [inputType, setInputType] = useState<InputType>("text");
  const [textInput, setTextInput] = useState("");
  const [output, setOutput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const processText = useCallback(
    (value: string) => {
      if (!value) {
        setOutput("");
        setError(null);
        return;
      }

      try {
        if (mode === "encode") {
          setOutput(encodeToBase64(value));
          setError(null);
        } else {
          const trimmed = value.replace(/\s/g, "");
          if (!isValidBase64(trimmed)) {
            setError("Invalid Base64 string.");
            setOutput("");
            return;
          }
          setOutput(decodeFromBase64(trimmed));
          setError(null);
        }
      } catch {
        setError(
          mode === "decode"
            ? "Invalid Base64 string."
            : "Encoding failed. Please check your input.",
        );
        setOutput("");
      }
    },
    [mode],
  );

  useEffect(() => {
    if (inputType === "text") {
      processText(textInput);
    }
  }, [textInput, inputType, processText]);

  useEffect(() => {
    setTextInput("");
    setOutput("");
    setFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }, [mode]);

  const handleFile = async (selected: File) => {
    if (selected.size > MAX_FILE_SIZE) {
      setError("File exceeds the 5MB limit.");
      return;
    }

    setFile(selected);
    setError(null);

    try {
      const encoded = await encodeFileToBase64(selected);
      setOutput(encoded);
    } catch {
      setError("Failed to encode file.");
      setOutput("");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setOutput("");
    setError(null);
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

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownloadTxt = () => {
    if (!output || !file) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${file.name}.base64.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setTextInput("");
    setOutput("");
    setFile(null);
    setError(null);
    setCopied(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const inputChars = inputType === "text" ? textInput.length : (file?.size ?? 0);

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
            <div className="pt-4 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-convert/10">
                <Binary
                  className="h-6 w-6 text-tool-convert"
                  strokeWidth={1.75}
                />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                Base64 Encoder
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Encode and decode Base64 text or files instantly. Private,
                browser-only processing.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <div className="grid grid-cols-2 gap-2">
                {(["encode", "decode"] as Mode[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMode(item)}
                    className={`rounded-xl border px-4 py-3 text-sm font-semibold capitalize transition-colors ${
                      mode === item
                        ? "border-tool-convert bg-tool-convert/10 text-tool-convert"
                        : "border-surface-border bg-surface-card text-content-secondary hover:border-tool-convert/50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {mode === "encode" && (
                <div className="grid grid-cols-2 gap-2">
                  {(["text", "file"] as InputType[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setInputType(item)}
                      className={`rounded-xl border px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
                        inputType === item
                          ? "border-tool-convert bg-tool-convert/10 text-tool-convert"
                          : "border-surface-border bg-surface-card text-content-secondary"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}

              {mode === "encode" && inputType === "file" ? (
                <>
                  <input
                    ref={inputRef}
                    type="file"
                    aria-label="Upload file to encode"
                    className="hidden"
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    aria-label="File upload area"
                    onClick={() => inputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex min-h-[140px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-surface-card p-8 transition-colors ${
                      isDragging
                        ? "border-tool-convert"
                        : "border-tool-convert/30 hover:border-tool-convert"
                    }`}
                  >
                    <UploadCloud className="mb-3 h-8 w-8 text-content-muted" />
                    <p className="font-medium text-content-primary">
                      Drop any file here
                    </p>
                    <p className="mt-1 text-sm text-content-secondary">
                      Max 5MB
                    </p>
                  </button>

                  {file && (
                    <div className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-card p-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-content-primary">
                          {file.name}
                        </p>
                        <p className="mt-0.5 text-sm text-content-secondary">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        aria-label="Remove file"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-tool-convert transition-colors hover:bg-tool-convert/10"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={
                    mode === "encode"
                      ? "Enter text to encode..."
                      : "Enter Base64 to decode..."
                  }
                  className="min-h-[160px] w-full resize-y rounded-xl border border-surface-border bg-surface-card p-4 font-mono text-sm text-content-primary outline-none transition-colors focus:border-tool-convert"
                />
              )}

              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-tool-pdf">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-content-secondary">
                  Output
                </label>
                <textarea
                  value={output}
                  readOnly
                  placeholder="Result will appear here..."
                  className="min-h-[160px] w-full resize-y rounded-xl border border-surface-border bg-surface-elevated p-4 font-mono text-sm text-content-primary outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!output}
                  className="flex items-center gap-1.5 rounded-lg bg-[#10B981] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#059669] disabled:opacity-50"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copied ? "Copied!" : "Copy Output"}
                </button>
                {mode === "encode" && inputType === "file" && output && file && (
                  <button
                    type="button"
                    onClick={handleDownloadTxt}
                    className="flex items-center gap-1.5 rounded-lg bg-surface-elevated px-4 py-2 text-sm font-medium text-content-secondary transition-colors hover:text-content-primary"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download as .txt
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center gap-1.5 rounded-lg bg-surface-elevated px-4 py-2 text-sm font-medium text-content-secondary transition-colors hover:text-content-primary"
                >
                  <Eraser className="h-3.5 w-3.5" />
                  Clear
                </button>
              </div>

              <p className="text-center text-xs text-content-muted">
                Input: {inputChars.toLocaleString("en-IN")} chars → Output:{" "}
                {output.length.toLocaleString("en-IN")} chars
              </p>
            </div>
          </div>

          <RelatedTools currentSlug="base64" />

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
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-convert/10">
                    <step.icon className="h-5 w-5 text-tool-convert" />
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

          <ToolFeedback toolName="Base64 Encoder" />
          <ToolSeoContent slug="base64" />
          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
