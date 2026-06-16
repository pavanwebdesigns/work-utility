"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeftRight, Check, Copy, Eraser, Link as LinkIcon } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  decodeURL,
  encodeURL,
  encodeURIFull,
} from "@/lib/url-encoder";

type Mode = "encode" | "decode";
type EncodeType = "component" | "full";

const EXAMPLES = [
  { label: "Space → %20", value: "hello world" },
  { label: "& → %26", value: "foo&bar" },
  { label: "= → %3D", value: "key=value" },
];

const howItWorksSteps = [
  { step: "01", icon: Copy, title: "Paste", description: "Enter your URL or encoded text" },
  { step: "02", icon: ArrowLeftRight, title: "Convert", description: "Instantly encoded or decoded" },
  { step: "03", icon: Check, title: "Copy", description: "Copy the result with one click" },
];

export default function UrlEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("encode");
  const [encodeType, setEncodeType] = useState<EncodeType>("component");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      if (mode === "encode") {
        setOutput(
          encodeType === "component"
            ? encodeURL(input)
            : encodeURIFull(input),
        );
      } else {
        setOutput(decodeURL(input));
      }
      setError(null);
    } catch {
      setError("Invalid URL encoding. Please check your input.");
      setOutput("");
    }
  }, [input, mode, encodeType]);

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

  const handleSwap = () => {
    setInput(output);
    setMode((m) => (m === "encode" ? "decode" : "encode"));
    setError(null);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setCopied(false);
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />

      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary">
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <LinkIcon className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">URL Encoder</h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Encode and decode URLs instantly. Convert special characters for safe URL usage.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="url-encoder" />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {(["encode", "decode"] as Mode[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMode(item)}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold capitalize transition-colors ${
                    mode === item
                      ? "border-brand-blue bg-brand-blue/10 text-brand-blue"
                      : "border-surface-border bg-surface-card text-content-secondary"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {mode === "encode" && (
              <div className="grid grid-cols-2 gap-2">
                {([
                  { id: "component" as const, label: "Component" },
                  { id: "full" as const, label: "Full URI" },
                ]).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setEncodeType(item.id)}
                    className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                      encodeType === item.id
                        ? "border-brand-blue bg-brand-blue/10 text-brand-blue"
                        : "border-surface-border bg-surface-card text-content-secondary"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={handleCopy} disabled={!output} className="flex items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2563EB] disabled:opacity-50">
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copied!" : "Copy Output"}
              </button>
              <button type="button" onClick={handleSwap} disabled={!output} className="flex items-center gap-1.5 rounded-lg bg-surface-elevated px-4 py-2 text-sm font-medium text-content-secondary transition-colors hover:text-content-primary disabled:opacity-50">
                <ArrowLeftRight className="h-3.5 w-3.5" />
                Swap
              </button>
              <button type="button" onClick={handleClear} className="flex items-center gap-1.5 rounded-lg bg-surface-elevated px-4 py-2 text-sm font-medium text-content-secondary transition-colors hover:text-content-primary">
                <Eraser className="h-3.5 w-3.5" />
                Clear
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-content-secondary">Input</label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste URL or text here..."
                  className="min-h-[200px] w-full resize-y rounded-xl border border-surface-border bg-surface-card p-4 font-mono text-sm text-content-primary outline-none transition-colors focus:border-brand-blue"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-content-secondary">Output</label>
                <textarea
                  value={output}
                  readOnly
                  placeholder="Result will appear here..."
                  className="min-h-[200px] w-full resize-y rounded-xl border border-surface-border bg-surface-elevated p-4 font-mono text-sm text-content-primary outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-tool-pdf">{error}</div>
            )}

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-content-muted">Examples</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex.label}
                    type="button"
                    onClick={() => setInput(ex.value)}
                    className="rounded-full border border-surface-border bg-surface-card px-3 py-1.5 text-xs text-content-secondary transition-colors hover:border-brand-blue hover:text-brand-blue"
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div key={step.title} className="rounded-xl border border-surface-border bg-surface-card p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                    <step.icon className="h-5 w-5 text-brand-blue" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="url-encoder" />
          <ToolFeedback toolName="URL Encoder" />
          <ToolSeoContent slug="url-encoder" />
          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
