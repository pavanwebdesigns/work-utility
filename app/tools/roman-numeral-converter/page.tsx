"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Languages } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  numberToRoman,
  romanToNumber,
} from "@/lib/roman-numeral-converter";

type ConverterMode = "to-roman" | "to-number";

export default function RomanNumeralConverterPage() {
  const [mode, setMode] = useState<ConverterMode>("to-roman");
  const [numberInput, setNumberInput] = useState("2026");
  const [romanInput, setRomanInput] = useState("MMXXVI");

  const result = useMemo(() => {
    if (mode === "to-roman") {
      const value = Number(numberInput);
      if (!Number.isInteger(value)) {
        return { output: "", error: "Enter a whole number between 1 and 3999." };
      }
      const roman = numberToRoman(value);
      if (!roman) {
        return { output: "", error: "Enter a whole number between 1 and 3999." };
      }
      return { output: roman, error: null };
    }

    const number = romanToNumber(romanInput);
    if (number === null) {
      return { output: "", error: "Enter a valid Roman numeral (I, V, X, L, C, D, M)." };
    }
    return { output: String(number), error: null };
  }, [mode, numberInput, romanInput]);

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link href="/" className="text-sm text-content-secondary hover:text-content-primary">
            ← All Tools
          </Link>
        </div>
        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-pink/10">
              <Languages className="h-6 w-6 text-tool-pink" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Roman Numeral Converter — Number to Roman & Back
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Convert numbers to Roman numerals or Roman numerals to numbers instantly. Supports standard notation from 1 to 3999.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="roman-numeral-converter" />
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <div className="flex gap-2 rounded-xl border border-surface-border bg-surface-card p-1">
              <button
                type="button"
                onClick={() => setMode("to-roman")}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
                  mode === "to-roman"
                    ? "bg-brand-blue text-white"
                    : "text-content-secondary hover:text-content-primary"
                }`}
              >
                Number → Roman
              </button>
              <button
                type="button"
                onClick={() => setMode("to-number")}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
                  mode === "to-number"
                    ? "bg-brand-blue text-white"
                    : "text-content-secondary hover:text-content-primary"
                }`}
              >
                Roman → Number
              </button>
            </div>

            {mode === "to-roman" ? (
              <label className="block rounded-xl border border-surface-border bg-surface-card p-4">
                <span className="mb-2 block text-sm font-medium text-content-primary">Number (1–3999)</span>
                <input
                  type="number"
                  min="1"
                  max="3999"
                  value={numberInput}
                  onChange={(event) => setNumberInput(event.target.value)}
                  className="w-full rounded-lg border border-surface-border bg-surface-base px-3 py-2 text-sm text-content-primary"
                />
              </label>
            ) : (
              <label className="block rounded-xl border border-surface-border bg-surface-card p-4">
                <span className="mb-2 block text-sm font-medium text-content-primary">Roman numeral</span>
                <input
                  type="text"
                  value={romanInput}
                  onChange={(event) => setRomanInput(event.target.value.toUpperCase())}
                  className="w-full rounded-lg border border-surface-border bg-surface-base px-3 py-2 font-mono text-sm uppercase text-content-primary"
                />
              </label>
            )}

            {result.error ? (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {result.error}
              </p>
            ) : (
              <div className="rounded-xl border border-brand-blue/20 bg-brand-blue/5 p-6 text-center">
                <p className="text-sm text-content-secondary">Result</p>
                <p className="mt-1 text-3xl font-bold text-brand-blue">{result.output}</p>
              </div>
            )}
          </div>

          <RelatedTools currentSlug="roman-numeral-converter" />
          <ToolFeedback toolName="Roman Numeral Converter" />
          <ToolSeoContent slug="roman-numeral-converter" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
