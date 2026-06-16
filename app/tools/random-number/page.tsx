"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Dices, Hash, List, Shuffle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  generateRandom,
  generateRandomList,
  generateUUID,
  rollDice,
  type RandomMode,
} from "@/lib/random-number";

const DICE_OPTIONS = [4, 6, 8, 10, 12, 20];

const howItWorksSteps = [
  { step: "01", icon: Shuffle, title: "Choose", description: "Pick Single, List, UUID, or Dice mode" },
  { step: "02", icon: Hash, title: "Set Range", description: "Enter min, max, and count" },
  { step: "03", icon: Dices, title: "Generate", description: "Click to get instant random results" },
];

export default function RandomNumberPage() {
  const [mode, setMode] = useState<RandomMode>("single");
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(10);
  const [unique, setUnique] = useState(false);
  const [diceSides, setDiceSides] = useState(6);
  const [diceCount, setDiceCount] = useState(1);
  const [singleResult, setSingleResult] = useState<number | null>(null);
  const [listResult, setListResult] = useState<number[]>([]);
  const [uuidResult, setUuidResult] = useState<string | null>(null);
  const [diceResult, setDiceResult] = useState<number[]>([]);
  const [singleHistory, setSingleHistory] = useState<number[]>([]);
  const [uuidHistory, setUuidHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [flash, setFlash] = useState(false);

  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
  };

  const handleGenerateSingle = () => {
    const safeMin = Math.min(min, max);
    const safeMax = Math.max(min, max);
    const value = generateRandom(safeMin, safeMax);
    setSingleResult(value);
    setSingleHistory((h) => [value, ...h].slice(0, 5));
    triggerFlash();
  };

  const handleGenerateList = () => {
    const safeMin = Math.min(min, max);
    const safeMax = Math.max(min, max);
    setListResult(generateRandomList(safeMin, safeMax, count, unique));
    triggerFlash();
  };

  const handleGenerateUuid = () => {
    const value = generateUUID();
    setUuidResult(value);
    setUuidHistory((h) => [value, ...h].slice(0, 5));
    triggerFlash();
  };

  const handleRollDice = () => {
    setDiceResult(rollDice(diceSides, diceCount));
    triggerFlash();
  };

  const getCopyText = (): string => {
    switch (mode) {
      case "single":
        return singleResult !== null ? String(singleResult) : "";
      case "list":
        return listResult.join("\n");
      case "uuid":
        return uuidResult ?? "";
      case "dice":
        return diceResult.join(", ");
      default:
        return "";
    }
  };

  const handleCopy = async () => {
    const text = getCopyText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleCopyCsv = async () => {
    if (!listResult.length) return;
    try {
      await navigator.clipboard.writeText(listResult.join(","));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const diceTotal = diceResult.reduce((sum, n) => sum + n, 0);

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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-convert/10">
              <Shuffle className="h-6 w-6 text-tool-convert" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">Random Number Generator</h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Generate random numbers, lists, UUIDs, and dice rolls instantly.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="random-number" />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-2xl space-y-6">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {([
                { id: "single" as const, label: "Single" },
                { id: "list" as const, label: "List" },
                { id: "uuid" as const, label: "UUID" },
                { id: "dice" as const, label: "Dice" },
              ]).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMode(item.id)}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                    mode === item.id
                      ? "border-tool-convert bg-tool-convert/10 text-tool-convert"
                      : "border-surface-border bg-surface-card text-content-secondary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {mode === "single" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs text-content-muted">Min</label>
                    <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} className="w-full rounded-xl border border-surface-border bg-surface-card px-3 py-2 text-content-primary outline-none" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-content-muted">Max</label>
                    <input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} className="w-full rounded-xl border border-surface-border bg-surface-card px-3 py-2 text-content-primary outline-none" />
                  </div>
                </div>
                <div className={`rounded-xl border border-surface-border bg-surface-card p-8 text-center transition-opacity ${flash ? "opacity-60" : "opacity-100"}`}>
                  <p className="text-6xl font-bold text-content-primary">{singleResult ?? "—"}</p>
                </div>
                <button type="button" onClick={handleGenerateSingle} className="w-full rounded-xl bg-[#10B981] px-4 py-4 font-semibold text-white hover:bg-[#059669]">Generate</button>
                {singleHistory.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {singleHistory.map((n, i) => (
                      <span key={`${n}-${i}`} className="rounded-full bg-surface-elevated px-3 py-1 text-xs text-content-secondary">{n}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {mode === "list" && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="mb-1 block text-xs text-content-muted">Min</label>
                    <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} className="w-full rounded-xl border border-surface-border bg-surface-card px-3 py-2 text-content-primary outline-none" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-content-muted">Max</label>
                    <input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} className="w-full rounded-xl border border-surface-border bg-surface-card px-3 py-2 text-content-primary outline-none" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-content-muted">Count</label>
                    <input type="number" min={1} max={1000} value={count} onChange={(e) => setCount(Number(e.target.value) || 1)} className="w-full rounded-xl border border-surface-border bg-surface-card px-3 py-2 text-content-primary outline-none" />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm text-content-secondary">
                  <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} />
                  No duplicates
                </label>
                <button type="button" onClick={handleGenerateList} className="w-full rounded-xl bg-[#10B981] px-4 py-4 font-semibold text-white hover:bg-[#059669]">Generate List</button>
                {listResult.length > 0 && (
                  <div className={`max-h-48 overflow-y-auto rounded-xl border border-surface-border bg-surface-card p-4 transition-opacity ${flash ? "opacity-60" : "opacity-100"}`}>
                    {listResult.map((n, i) => (
                      <div key={`${n}-${i}`} className="flex gap-3 border-b border-surface-border py-1.5 text-sm last:border-0">
                        <span className="w-6 text-content-muted">{i + 1}.</span>
                        <span className="font-mono text-content-primary">{n}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <button type="button" onClick={handleCopy} disabled={!listResult.length} className="flex items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-sm text-white disabled:opacity-50">
                    <Copy className="h-3.5 w-3.5" />{copied ? "Copied!" : "Copy All"}
                  </button>
                  <button type="button" onClick={handleCopyCsv} disabled={!listResult.length} className="flex items-center gap-1.5 rounded-lg bg-surface-elevated px-4 py-2 text-sm text-content-secondary hover:text-content-primary disabled:opacity-50">
                    <List className="h-3.5 w-3.5" />Copy as CSV
                  </button>
                </div>
              </div>
            )}

            {mode === "uuid" && (
              <div className="space-y-4">
                <div className={`rounded-xl border border-surface-border bg-surface-card p-6 text-center transition-opacity ${flash ? "opacity-60" : "opacity-100"}`}>
                  <p className="break-all font-mono text-lg text-content-primary">{uuidResult ?? "Click Generate UUID"}</p>
                </div>
                <button type="button" onClick={handleGenerateUuid} className="w-full rounded-xl bg-[#10B981] px-4 py-4 font-semibold text-white hover:bg-[#059669]">Generate UUID</button>
                {uuidHistory.length > 0 && (
                  <div className="space-y-1">
                    {uuidHistory.map((id, i) => (
                      <p key={`${id}-${i}`} className="truncate font-mono text-xs text-content-muted">{id}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {mode === "dice" && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {DICE_OPTIONS.map((sides) => (
                    <button
                      key={sides}
                      type="button"
                      onClick={() => setDiceSides(sides)}
                      className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                        diceSides === sides
                          ? "border-tool-convert bg-tool-convert/10 text-tool-convert"
                          : "border-surface-border bg-surface-card text-content-secondary"
                      }`}
                    >
                      d{sides}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="mb-1 block text-xs text-content-muted">Number of dice (1–10)</label>
                  <input type="number" min={1} max={10} value={diceCount} onChange={(e) => setDiceCount(Math.min(10, Math.max(1, Number(e.target.value) || 1)))} className="w-24 rounded-xl border border-surface-border bg-surface-card px-3 py-2 text-content-primary outline-none" />
                </div>
                <button type="button" onClick={handleRollDice} className="w-full rounded-xl bg-[#10B981] px-4 py-4 font-semibold text-white hover:bg-[#059669]">Roll Dice 🎲</button>
                {diceResult.length > 0 && (
                  <div className={`space-y-3 transition-opacity ${flash ? "opacity-60" : "opacity-100"}`}>
                    <div className="flex flex-wrap justify-center gap-3">
                      {diceResult.map((roll, i) => (
                        <div key={`${roll}-${i}`} className="flex h-16 w-16 items-center justify-center rounded-xl border border-surface-border bg-surface-card text-2xl font-bold text-content-primary">
                          {roll}
                        </div>
                      ))}
                    </div>
                    <p className="text-center text-lg font-semibold text-content-primary">Total: {diceTotal}</p>
                  </div>
                )}
              </div>
            )}

            {mode !== "list" && (
              <button type="button" onClick={handleCopy} disabled={!getCopyText()} className="flex items-center gap-1.5 rounded-lg bg-surface-elevated px-4 py-2 text-sm text-content-secondary hover:text-content-primary disabled:opacity-50">
                <Copy className="h-3.5 w-3.5" />{copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div key={step.title} className="rounded-xl border border-surface-border bg-surface-card p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-convert/10">
                    <step.icon className="h-5 w-5 text-tool-convert" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="random-number" />
          <ToolFeedback toolName="Random Number Generator" />
          <ToolSeoContent slug="random-number" />
          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
