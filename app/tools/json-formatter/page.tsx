"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Braces, Check, Copy, Eraser, Minimize2, Wand2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import {
  countJSON,
  formatJSON,
  minifyJSON,
  validateJSON,
} from "@/lib/json-formatter";

type Mode = "format" | "minify";

const howItWorksSteps = [
  {
    step: "01",
    icon: Copy,
    title: "Paste",
    description: "Paste your JSON data in the left panel",
  },
  {
    step: "02",
    icon: Wand2,
    title: "Format",
    description: "Click Format or Minify",
  },
  {
    step: "03",
    icon: Check,
    title: "Copy",
    description: "Copy the output with one click",
  },
];

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("format");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ keys: 0, values: 0, arrays: 0, objects: 0 });
  const [copied, setCopied] = useState(false);

  const processInput = useCallback((value: string, activeMode: Mode) => {
    if (!value.trim()) {
      setOutput("");
      setIsValid(null);
      setError(null);
      setStats({ keys: 0, values: 0, arrays: 0, objects: 0 });
      return;
    }

    const validation = validateJSON(value);
    if (!validation.valid) {
      setIsValid(false);
      setError(validation.error ?? "Invalid JSON");
      setOutput("");
      setStats({ keys: 0, values: 0, arrays: 0, objects: 0 });
      return;
    }

    setIsValid(true);
    setError(null);
    setStats(countJSON(value));

    try {
      const result =
        activeMode === "format" ? formatJSON(value) : minifyJSON(value);
      setOutput(result);
    } catch (err) {
      setIsValid(false);
      setError((err as Error).message);
      setOutput("");
    }
  }, []);

  useEffect(() => {
    processInput(input, mode);
  }, [input, mode, processInput]);

  const handleClear = () => {
    setInput("");
    setOutput("");
    setIsValid(null);
    setError(null);
    setCopied(false);
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

        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <Braces className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              JSON Formatter
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Format, validate, and minify JSON instantly. Paste your data and
              get clean output in seconds.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setMode("format")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  mode === "format"
                    ? "bg-brand-blue text-white"
                    : "bg-surface-elevated text-content-secondary hover:text-content-primary"
                }`}
              >
                Format
              </button>
              <button
                type="button"
                onClick={() => setMode("minify")}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  mode === "minify"
                    ? "bg-brand-blue text-white"
                    : "bg-surface-elevated text-content-secondary hover:text-content-primary"
                }`}
              >
                <Minimize2 className="h-3.5 w-3.5" />
                Minify
              </button>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!output}
                className="flex items-center gap-1.5 rounded-lg bg-surface-elevated px-4 py-2 text-sm font-medium text-content-secondary transition-colors hover:text-content-primary disabled:opacity-50"
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copied!" : "Copy Output"}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1.5 rounded-lg bg-surface-elevated px-4 py-2 text-sm font-medium text-content-secondary transition-colors hover:text-content-primary"
              >
                <Eraser className="h-3.5 w-3.5" />
                Clear
              </button>

              {isValid && (
                <span className="ml-auto flex items-center gap-2 text-xs text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Valid JSON
                </span>
              )}
            </div>

            {isValid && input.trim() && (
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-surface-card px-3 py-1 text-xs text-content-muted">
                  {stats.keys} keys
                </span>
                <span className="rounded-full bg-surface-card px-3 py-1 text-xs text-content-muted">
                  {stats.objects} objects
                </span>
                <span className="rounded-full bg-surface-card px-3 py-1 text-xs text-content-muted">
                  {stats.arrays} arrays
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-content-secondary">
                  Input JSON
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your JSON here..."
                  className={`min-h-[400px] w-full resize-y rounded-xl border bg-surface-card p-4 font-mono text-sm text-content-primary outline-none transition-colors focus:border-brand-blue ${
                    isValid === false
                      ? "border-red-500/50"
                      : "border-surface-border"
                  }`}
                />
                {error && (
                  <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-tool-pdf">
                    Invalid JSON: {error}
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-content-secondary">
                  Output
                </label>
                <textarea
                  value={output}
                  readOnly
                  placeholder="Formatted JSON will appear here..."
                  className="min-h-[400px] w-full resize-y rounded-xl border border-surface-border bg-surface-elevated p-4 font-mono text-sm text-content-primary outline-none"
                />
              </div>
            </div>
          </div>

          <RelatedTools currentSlug="json-formatter" />

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
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                    <step.icon className="h-5 w-5 text-brand-blue" />
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

          <ToolFeedback toolName="JSON Formatter" />
          <ToolSeoContent slug="json-formatter" />
          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
