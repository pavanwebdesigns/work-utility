"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Type } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { useCurrency } from "@/lib/currency-context";
import {
  formatIndianNumber,
  formatInternationalNumber,
  numberToWords,
  numberToWordsInternational,
} from "@/lib/number-to-words";

type NumberSystem = "indian" | "international";

const EXAMPLES = [
  1000, 10000, 100000, 1000000, 10000000, 100000000,
];

const MAX_INDIAN = 9999999999;
const MAX_INTERNATIONAL = 999999999999;

function capitalizeFirst(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function NumberToWordsPage() {
  const { currency } = useCurrency();
  const [input, setInput] = useState("100000");
  const [system, setSystem] = useState<NumberSystem>("indian");
  const [showCurrency, setShowCurrency] = useState(false);
  const [copied, setCopied] = useState(false);

  const numericValue = useMemo(() => {
    const cleaned = input.replace(/,/g, "");
    const num = parseInt(cleaned, 10);
    return Number.isFinite(num) ? num : 0;
  }, [input]);

  const maxValue = system === "indian" ? MAX_INDIAN : MAX_INTERNATIONAL;

  const inWords = useMemo(() => {
    if (!numericValue || numericValue > maxValue) return "";
    const words =
      system === "indian"
        ? numberToWords(numericValue)
        : numberToWordsInternational(numericValue);
    let result = capitalizeFirst(words);
    if (showCurrency) {
      result += currency === "INR" ? " Rupees" : " Dollars";
    }
    return result;
  }, [numericValue, system, showCurrency, currency, maxValue]);

  const handleInputChange = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, "");
    if (!digits) {
      setInput("");
      return;
    }
    const num = parseInt(digits, 10);
    if (!Number.isFinite(num)) return;
    const capped = Math.min(num, maxValue);
    const formatted =
      system === "indian"
        ? formatIndianNumber(capped)
        : formatInternationalNumber(capped);
    setInput(formatted);
  };

  const loadExample = (value: number) => {
    const capped = Math.min(value, maxValue);
    const formatted =
      system === "indian"
        ? formatIndianNumber(capped)
        : formatInternationalNumber(capped);
    setInput(formatted);
  };

  const copyOutput = async () => {
    if (!inWords) return;
    await navigator.clipboard.writeText(inWords);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

        <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-img2pdf/10">
              <Type className="h-6 w-6 text-tool-img2pdf" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Number to Words Converter — Free Online
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Convert numbers to words in English with Indian or International number systems.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="number-to-words" />
            </div>
          </div>

          <div className="mt-10 space-y-5">
            <div className="inline-flex w-full rounded-xl border border-surface-border bg-surface-card p-1">
              {(
                [
                  { value: "indian" as const, label: "Indian System" },
                  { value: "international" as const, label: "International" },
                ] as const
              ).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setSystem(option.value);
                    setInput("");
                  }}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    system === option.value
                      ? "bg-tool-img2pdf text-white"
                      : "text-content-secondary hover:text-content-primary"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div>
              <label
                htmlFor="number-input"
                className="mb-2 block text-sm font-medium text-content-primary"
              >
                Enter Number
              </label>
              <input
                id="number-input"
                type="text"
                inputMode="numeric"
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Type a number"
                className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-2xl font-semibold text-content-primary outline-none transition-colors focus:border-tool-img2pdf"
              />
              <p className="mt-1 text-xs text-content-muted">
                Max: {system === "indian" ? "9,99,99,99,999" : "999,999,999,999"}
              </p>
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm text-content-secondary">
              <input
                type="checkbox"
                checked={showCurrency}
                onChange={(e) => setShowCurrency(e.target.checked)}
                className="rounded border-surface-border"
              />
              Add currency suffix ({currency === "INR" ? "Rupees" : "Dollars"})
            </label>

            <div className="rounded-xl border border-surface-border bg-surface-card p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-content-primary">In Words</h2>
                <button
                  type="button"
                  onClick={copyOutput}
                  disabled={!inWords}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-surface-border px-2.5 py-1 text-xs font-medium text-content-secondary transition-colors hover:text-content-primary disabled:opacity-50"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-lg font-medium leading-relaxed text-content-primary sm:text-xl">
                {inWords || "Enter a valid number"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-content-secondary">Examples</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => loadExample(example)}
                    className="rounded-lg border border-surface-border bg-surface-card px-3 py-1.5 text-sm text-content-secondary transition-colors hover:border-tool-img2pdf hover:text-tool-img2pdf"
                  >
                    {system === "indian"
                      ? formatIndianNumber(example)
                      : formatInternationalNumber(example)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: Type, title: "Enter", description: "Type any number up to 9,99,99,99,999" },
                { step: "02", icon: Type, title: "Choose System", description: "Indian or International format" },
                { step: "03", icon: Copy, title: "Copy", description: "Copy the number in words" },
              ].map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-img2pdf/10">
                    <step.icon className="h-5 w-5 text-tool-img2pdf" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="number-to-words" />
          <ToolFeedback toolName="Number to Words" />
          <ToolSeoContent slug="number-to-words" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
