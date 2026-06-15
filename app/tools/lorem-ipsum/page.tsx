"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Copy, FileText, RefreshCw, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import {
  generateLorem,
  getLoremStats,
  getMaxCount,
  type LoremType,
} from "@/lib/lorem-ipsum";

const howItWorksSteps = [
  { step: "01", icon: SlidersHorizontal, title: "Choose", description: "Select paragraphs, sentences, or words" },
  { step: "02", icon: FileText, title: "Set Count", description: "Choose how much text you need" },
  { step: "03", icon: Copy, title: "Copy", description: "Copy the generated text instantly" },
];

export default function LoremIpsumPage() {
  const [type, setType] = useState<LoremType>("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const runGenerate = useCallback(() => {
    const max = getMaxCount(type);
    const safeCount = Math.min(Math.max(1, count), max);
    setOutput(generateLorem(type, safeCount, startWithLorem));
  }, [type, count, startWithLorem]);

  useEffect(() => {
    runGenerate();
  }, [runGenerate]);

  const stats = getLoremStats(output);

  const handleTypeChange = (next: LoremType) => {
    setType(next);
    const max = getMaxCount(next);
    if (count > max) setCount(Math.min(3, max));
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
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary">
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-photo/10">
              <FileText className="h-6 w-6 text-tool-photo" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">Lorem Ipsum Generator</h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Generate placeholder lorem ipsum text for designs, mockups, and prototypes.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl space-y-6">
            <div className="grid grid-cols-3 gap-2">
              {(["paragraphs", "sentences", "words"] as LoremType[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleTypeChange(item)}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-medium capitalize transition-colors ${
                    type === item
                      ? "border-tool-photo bg-tool-photo/10 text-tool-photo"
                      : "border-surface-border bg-surface-card text-content-secondary"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="mb-1 block text-xs text-content-muted">Count</label>
                <input
                  type="number"
                  min={1}
                  max={getMaxCount(type)}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value) || 1)}
                  className="w-24 rounded-xl border border-surface-border bg-surface-card px-3 py-2 text-sm text-content-primary outline-none focus:border-tool-photo"
                />
              </div>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-content-secondary">
                <input
                  type="checkbox"
                  checked={startWithLorem}
                  onChange={(e) => setStartWithLorem(e.target.checked)}
                  className="rounded border-surface-border"
                />
                Start with &quot;Lorem ipsum...&quot;
              </label>
            </div>

            <button
              type="button"
              onClick={runGenerate}
              className="w-full rounded-xl bg-[#F59E0B] px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-[#D97706]"
            >
              Generate
            </button>

            <textarea
              value={output}
              readOnly
              className="min-h-64 w-full resize-y rounded-xl border border-surface-border bg-surface-card p-4 text-sm leading-relaxed text-content-primary outline-none"
            />

            <div className="flex items-center justify-between text-xs text-content-muted">
              <span>{stats.words} words · {stats.chars} characters</span>
              <div className="flex gap-2">
                <button type="button" onClick={handleCopy} className="flex items-center gap-1.5 rounded-lg bg-brand-blue px-3 py-1.5 text-sm font-medium text-white hover:bg-[#2563EB]">
                  <Copy className="h-3.5 w-3.5" />
                  {copied ? "Copied!" : "Copy All"}
                </button>
                <button type="button" onClick={runGenerate} className="flex items-center gap-1.5 rounded-lg bg-surface-elevated px-3 py-1.5 text-sm text-content-secondary hover:text-content-primary">
                  <RefreshCw className="h-3.5 w-3.5" />
                  Regenerate
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div key={step.title} className="rounded-xl border border-surface-border bg-surface-card p-5">
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

          <RelatedTools currentSlug="lorem-ipsum" />
          <ToolFeedback toolName="Lorem Ipsum Generator" />
          <ToolSeoContent slug="lorem-ipsum" />
          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
