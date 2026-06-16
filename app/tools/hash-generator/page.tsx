"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Copy, Hash, UploadCloud } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  generateAllHashes,
  type HashAlgorithm,
} from "@/lib/hash-generator";

const ALGORITHMS: HashAlgorithm[] = ["MD5", "SHA-1", "SHA-256", "SHA-512"];

const EMPTY_HASHES: Record<HashAlgorithm, string> = {
  MD5: "",
  "SHA-1": "",
  "SHA-256": "",
  "SHA-512": "",
};

export default function HashGeneratorPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("SHA-256");
  const [hashes, setHashes] = useState(EMPTY_HASHES);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState<HashAlgorithm | null>(null);
  const [fileMode, setFileMode] = useState(false);

  const runHashes = useCallback(async (text: string) => {
    if (!text) {
      setHashes(EMPTY_HASHES);
      return;
    }
    setIsProcessing(true);
    try {
      const result = await generateAllHashes(text);
      setHashes(result);
    } catch {
      setHashes(EMPTY_HASHES);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  useEffect(() => {
    if (!fileMode) {
      const timer = setTimeout(() => runHashes(input), 150);
      return () => clearTimeout(timer);
    }
  }, [input, fileMode, runHashes]);

  const handleFile = async (file: File) => {
    setFileMode(true);
    setIsProcessing(true);
    try {
      const text = await file.text();
      setInput(text);
      const result = await generateAllHashes(text);
      setHashes(result);
    } catch {
      setHashes(EMPTY_HASHES);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (value: string) => {
    setFileMode(false);
    setInput(value);
  };

  const copyHash = async (algo: HashAlgorithm) => {
    const hash = hashes[algo];
    if (!hash) return;
    await navigator.clipboard.writeText(hash);
    setCopied(algo);
    setTimeout(() => setCopied(null), 2000);
  };

  const truncate = (hash: string) =>
    hash.length > 48 ? `${hash.slice(0, 24)}…${hash.slice(-12)}` : hash;

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

        <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-photo/10">
              <Hash className="h-6 w-6 text-tool-photo" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Hash Generator — MD5 SHA-256 Free Online
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly in your browser.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="hash-generator" />
            </div>
          </div>

          <div className="mt-10 space-y-5">
            <div>
              <textarea
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Enter text to hash..."
                rows={5}
                className="w-full resize-y rounded-xl border border-surface-border bg-surface-card px-4 py-3 font-mono text-sm text-content-primary outline-none transition-colors focus:border-tool-photo"
              />
              <div className="mt-2 flex items-center gap-3">
                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                    e.target.value = "";
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-surface-border bg-surface-card px-3 py-1.5 text-xs font-medium text-content-secondary transition-colors hover:text-content-primary"
                >
                  <UploadCloud className="h-3.5 w-3.5" />
                  Or hash a file
                </button>
                {fileMode && (
                  <button
                    type="button"
                    onClick={() => runHashes(input)}
                    disabled={isProcessing || !input}
                    className="rounded-lg bg-tool-photo px-3 py-1.5 text-xs font-semibold text-white transition-opacity disabled:opacity-50"
                  >
                    Generate Hashes
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {ALGORITHMS.map((algo) => (
                <button
                  key={algo}
                  type="button"
                  onClick={() => setAlgorithm(algo)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    algorithm === algo
                      ? "border-tool-photo bg-tool-photo/10 text-tool-photo"
                      : "border-surface-border bg-surface-card text-content-secondary hover:text-content-primary"
                  }`}
                >
                  {algo}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {ALGORITHMS.map((algo) => (
                <div
                  key={algo}
                  className={`rounded-xl border bg-surface-card p-4 ${
                    algorithm === algo
                      ? "border-tool-photo"
                      : "border-surface-border"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide text-content-secondary">
                      {algo}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyHash(algo)}
                      disabled={!hashes[algo]}
                      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-content-muted transition-colors hover:text-content-primary disabled:opacity-40"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      {copied === algo ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <p
                    className="break-all font-mono text-sm text-content-primary"
                    title={hashes[algo]}
                  >
                    {hashes[algo]
                      ? truncate(hashes[algo])
                      : isProcessing
                        ? "Computing…"
                        : "—"}
                  </p>
                </div>
              ))}
            </div>

            <p className="rounded-lg border border-tool-photo/20 bg-tool-photo/5 px-3 py-2 text-xs text-content-secondary">
              MD5 and SHA-1 are not recommended for security use. Use SHA-256 or
              SHA-512 for cryptographic purposes.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: Hash, title: "Enter", description: "Type text or upload a file" },
                { step: "02", icon: Hash, title: "Hash", description: "All 4 hash algorithms run instantly" },
                { step: "03", icon: Copy, title: "Copy", description: "Copy any hash format" },
              ].map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-photo/10">
                    <step.icon className="h-5 w-5 text-tool-photo" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="hash-generator" />
          <ToolFeedback toolName="Hash Generator" />
          <ToolSeoContent slug="hash-generator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
