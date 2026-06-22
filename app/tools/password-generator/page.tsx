"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Copy,
  History,
  KeyRound,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { CalculatorField } from "@/components/calculator/CalculatorUi";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  analyzePasswordStrength,
  formatTimeAgo,
  generatePassphrase,
  generatePasswords,
  type GeneratorMode,
  type PassphraseOptions,
  type PassphraseSeparator,
  type PasswordOptions,
  type PasswordStrengthResult,
  type ZxcvbnScore,
} from "@/lib/password-generator";

const HISTORY_LIMIT = 10;
const BULK_MAX = 20;

type HistoryEntry = {
  id: string;
  value: string;
  createdAt: number;
  score: ZxcvbnScore;
  mode: GeneratorMode;
};

const SEPARATOR_OPTIONS: { value: PassphraseSeparator; label: string }[] = [
  { value: "-", label: "Hyphen (-)" },
  { value: "_", label: "Underscore (_)" },
  { value: " ", label: "Space ( )" },
  { value: ".", label: "Period (.)" },
  { value: "", label: "None" },
];

function OptionToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-surface-border bg-surface-card px-4 py-3">
      <span className="text-sm text-content-primary">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-brand-blue"
      />
    </label>
  );
}

function StrengthMeter({ strength }: { strength: PasswordStrengthResult }) {
  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full ${
              index <= strength.score
                ? strength.barClass
                : "bg-surface-border"
            }`}
          />
        ))}
      </div>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-sm font-semibold ${strength.colorClass}`}>
          Strength: {strength.label}
        </p>
        <p className="text-xs text-content-muted">
          Time to crack: {strength.crackTime}
        </p>
      </div>
    </div>
  );
}

function ScoreDot({ score }: { score: ZxcvbnScore }) {
  const colors: Record<ZxcvbnScore, string> = {
    0: "bg-red-500",
    1: "bg-orange-500",
    2: "bg-yellow-500",
    3: "bg-lime-500",
    4: "bg-emerald-500",
  };

  return (
    <span
      className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${colors[score]}`}
      aria-hidden
    />
  );
}

export default function PasswordGeneratorPage() {
  const [mode, setMode] = useState<GeneratorMode>("password");
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(true);
  const [minNumbers, setMinNumbers] = useState(1);
  const [minSymbols, setMinSymbols] = useState(1);
  const [wordCount, setWordCount] = useState(4);
  const [separator, setSeparator] = useState<PassphraseSeparator>("-");
  const [capitalize, setCapitalize] = useState(false);
  const [includeNumber, setIncludeNumber] = useState(false);
  const [bulkCount, setBulkCount] = useState(1);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [optionsOpen, setOptionsOpen] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);

  const passwordOptions: PasswordOptions = useMemo(
    () => ({
      length,
      uppercase,
      lowercase,
      numbers,
      symbols,
      excludeAmbiguous,
      minNumbers,
      minSymbols,
    }),
    [
      excludeAmbiguous,
      length,
      lowercase,
      minNumbers,
      minSymbols,
      numbers,
      symbols,
      uppercase,
    ]
  );

  const passphraseOptions: PassphraseOptions = useMemo(
    () => ({
      wordCount,
      separator,
      capitalize,
      includeNumber,
    }),
    [capitalize, includeNumber, separator, wordCount]
  );

  const primaryResult = results[0] ?? "";
  const primaryStrength = primaryResult
    ? analyzePasswordStrength(primaryResult)
    : null;

  const addToHistory = useCallback(
    (values: string[], activeMode: GeneratorMode) => {
      const entries: HistoryEntry[] = values.map((value) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        value,
        createdAt: Date.now(),
        score: analyzePasswordStrength(value).score,
        mode: activeMode,
      }));

      setHistory((current) => [...entries, ...current].slice(0, HISTORY_LIMIT));
    },
    []
  );

  const generateNew = useCallback(() => {
    try {
      const count = Math.min(Math.max(bulkCount, 1), BULK_MAX);
      const generated =
        mode === "password"
          ? generatePasswords(passwordOptions, count)
          : count === 1
            ? [generatePassphrase(passphraseOptions)]
            : Array.from({ length: count }, () =>
                generatePassphrase(passphraseOptions)
              );

      setResults(generated);
      addToHistory(generated, mode);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to generate passwords."
      );
      setResults([]);
    }
  }, [addToHistory, bulkCount, mode, passphraseOptions, passwordOptions]);

  const handleCopy = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 1500);
  };

  const handleCopyAll = async () => {
    if (!results.length) return;
    await navigator.clipboard.writeText(results.join("\n"));
    setCopiedKey("all");
    window.setTimeout(() => setCopiedKey(null), 1500);
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
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-convert/10">
              <KeyRound className="h-6 w-6 text-tool-convert" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Password Generator — Create Strong Random Passwords Free
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Generate secure random passwords or memorable passphrases with a
              real-time strength meter. Runs entirely in your browser.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="password-generator" />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <div
              className="inline-flex w-full rounded-xl border border-surface-border bg-surface-card p-1"
              role="tablist"
              aria-label="Generator mode"
            >
              <button
                type="button"
                role="tab"
                aria-selected={mode === "password"}
                onClick={() => setMode("password")}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  mode === "password"
                    ? "bg-tool-convert text-white"
                    : "text-content-secondary hover:text-content-primary"
                }`}
              >
                🔑 Password
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "passphrase"}
                onClick={() => setMode("passphrase")}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  mode === "passphrase"
                    ? "bg-tool-convert text-white"
                    : "text-content-secondary hover:text-content-primary"
                }`}
              >
                💬 Passphrase
              </button>
            </div>

            {primaryResult && (
              <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                <div className="flex items-start gap-3">
                  <code className="min-w-0 flex-1 break-all font-mono text-lg text-content-primary sm:text-xl">
                    {primaryResult}
                  </code>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(primaryResult, "primary")}
                      className="inline-flex items-center justify-center rounded-lg border border-surface-border p-2 text-content-secondary transition-colors hover:bg-surface-elevated hover:text-content-primary"
                      aria-label="Copy password"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={generateNew}
                      className="inline-flex items-center justify-center rounded-lg border border-surface-border p-2 text-content-secondary transition-colors hover:bg-surface-elevated hover:text-content-primary"
                      aria-label="Regenerate"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {copiedKey === "primary" && (
                  <p className="mt-2 text-xs text-tool-convert">Copied!</p>
                )}
                {mode === "passphrase" && (
                  <p className="mt-2 text-xs text-content-muted">
                    {wordCount} words
                  </p>
                )}
                {primaryStrength && (
                  <div className="mt-4">
                    <StrengthMeter strength={primaryStrength} />
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-left sm:hidden"
              onClick={() => setOptionsOpen((open) => !open)}
              aria-expanded={optionsOpen}
            >
              <span className="font-medium text-content-primary">Options</span>
              <ChevronDown
                className={`h-5 w-5 text-content-muted transition-transform ${
                  optionsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div className={`space-y-5 ${optionsOpen ? "block" : "hidden sm:block"}`}>
              {mode === "password" ? (
                <>
                  <CalculatorField label={`Password Length: ${length}`} htmlFor="password-length">
                    <input
                      id="password-length"
                      type="range"
                      min={8}
                      max={128}
                      value={length}
                      onChange={(event) => setLength(Number(event.target.value))}
                      aria-label="Password length"
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-border accent-brand-blue"
                    />
                    <div className="mt-2 flex justify-between text-xs text-content-muted">
                      <span>8</span>
                      <span>128</span>
                    </div>
                  </CalculatorField>

                  <div className="grid gap-3">
                    <OptionToggle label="Uppercase (A-Z)" checked={uppercase} onChange={setUppercase} />
                    <OptionToggle label="Lowercase (a-z)" checked={lowercase} onChange={setLowercase} />
                    <OptionToggle label="Numbers (0-9)" checked={numbers} onChange={setNumbers} />
                    <OptionToggle label="Symbols (!@#$%^&*)" checked={symbols} onChange={setSymbols} />
                    <OptionToggle
                      label="Exclude ambiguous characters (0, O, o, l, 1, I, |)"
                      checked={excludeAmbiguous}
                      onChange={setExcludeAmbiguous}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <CalculatorField label="Minimum numbers (1-5)" htmlFor="min-numbers">
                      <input
                        id="min-numbers"
                        type="number"
                        min={1}
                        max={5}
                        value={minNumbers}
                        disabled={!numbers}
                        onChange={(event) =>
                          setMinNumbers(
                            Math.min(5, Math.max(1, Number(event.target.value) || 1))
                          )
                        }
                        className="w-full rounded-xl border border-surface-border bg-surface-elevated px-4 py-3 text-content-primary disabled:opacity-50"
                      />
                    </CalculatorField>
                    <CalculatorField label="Minimum symbols (1-5)" htmlFor="min-symbols">
                      <input
                        id="min-symbols"
                        type="number"
                        min={1}
                        max={5}
                        value={minSymbols}
                        disabled={!symbols}
                        onChange={(event) =>
                          setMinSymbols(
                            Math.min(5, Math.max(1, Number(event.target.value) || 1))
                          )
                        }
                        className="w-full rounded-xl border border-surface-border bg-surface-elevated px-4 py-3 text-content-primary disabled:opacity-50"
                      />
                    </CalculatorField>
                  </div>
                </>
              ) : (
                <>
                  <CalculatorField label={`Word Count: ${wordCount}`} htmlFor="word-count">
                    <input
                      id="word-count"
                      type="range"
                      min={3}
                      max={8}
                      value={wordCount}
                      onChange={(event) => setWordCount(Number(event.target.value))}
                      aria-label="Passphrase word count"
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-border accent-brand-blue"
                    />
                    <div className="mt-2 flex justify-between text-xs text-content-muted">
                      <span>3</span>
                      <span>8</span>
                    </div>
                  </CalculatorField>

                  <CalculatorField label="Separator" htmlFor="passphrase-separator">
                    <select
                      id="passphrase-separator"
                      value={separator}
                      onChange={(event) =>
                        setSeparator(event.target.value as PassphraseSeparator)
                      }
                      className="w-full rounded-xl border border-surface-border bg-surface-elevated px-4 py-3 text-content-primary"
                    >
                      {SEPARATOR_OPTIONS.map((option) => (
                        <option key={option.label} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </CalculatorField>

                  <div className="grid gap-3">
                    <OptionToggle
                      label="Capitalize first letter of each word"
                      checked={capitalize}
                      onChange={setCapitalize}
                    />
                    <OptionToggle
                      label="Include number at end (e.g. -42)"
                      checked={includeNumber}
                      onChange={setIncludeNumber}
                    />
                  </div>
                </>
              )}

              <CalculatorField label={`Generate multiple (1-${BULK_MAX})`} htmlFor="bulk-count">
                <input
                  id="bulk-count"
                  type="number"
                  min={1}
                  max={BULK_MAX}
                  value={bulkCount}
                  onChange={(event) =>
                    setBulkCount(
                      Math.min(
                        BULK_MAX,
                        Math.max(1, Number(event.target.value) || 1)
                      )
                    )
                  }
                  className="w-full rounded-xl border border-surface-border bg-surface-elevated px-4 py-3 text-content-primary"
                />
              </CalculatorField>

              <button
                type="button"
                onClick={generateNew}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-l-4 border-l-emerald bg-tool-convert px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-emerald/90"
              >
                <RefreshCw className="h-5 w-5" />
                {bulkCount > 1
                  ? `Generate ${bulkCount} ${mode === "password" ? "passwords" : "passphrases"}`
                  : mode === "password"
                    ? "Generate Password"
                    : "Generate Passphrase"}
              </button>
            </div>

            {error && (
              <p className="text-center text-sm text-tool-pdf">{error}</p>
            )}

            {results.length > 1 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold text-content-primary">
                    Generated list
                  </h2>
                  <button
                    type="button"
                    onClick={handleCopyAll}
                    className="inline-flex items-center gap-1 rounded-lg border border-surface-border px-3 py-2 text-sm text-content-secondary transition-colors hover:bg-surface-elevated hover:text-content-primary"
                  >
                    <Copy className="h-4 w-4" />
                    {copiedKey === "all" ? "Copied!" : "Copy All"}
                  </button>
                </div>
                {results.map((password, index) => (
                  <div
                    key={`${password}-${index}`}
                    className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-card p-4"
                  >
                    <code className="min-w-0 flex-1 break-all font-mono text-sm text-content-primary">
                      {password}
                    </code>
                    <button
                      type="button"
                      onClick={() => handleCopy(password, `bulk-${index}`)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-surface-border px-3 py-2 text-sm text-content-secondary transition-colors hover:bg-surface-elevated hover:text-content-primary"
                    >
                      <Copy className="h-4 w-4" />
                      {copiedKey === `bulk-${index}` ? "Copied" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-xl border border-surface-border bg-surface-card">
              <button
                type="button"
                onClick={() => setHistoryOpen((open) => !open)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
                aria-expanded={historyOpen}
              >
                <span className="inline-flex items-center gap-2 font-medium text-content-primary">
                  <History className="h-4 w-4" />
                  History ({history.length})
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-content-muted transition-transform ${
                    historyOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {historyOpen && (
                <div className="border-t border-surface-border px-4 py-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-xs text-content-muted">
                      History is stored in memory only and cleared when you close
                      or refresh this page.
                    </p>
                    {history.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setHistory([])}
                        className="shrink-0 text-xs text-content-secondary transition-colors hover:text-content-primary"
                      >
                        Clear history
                      </button>
                    )}
                  </div>

                  {history.length === 0 ? (
                    <p className="text-sm text-content-muted">
                      No generations yet this session.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {history.map((entry) => (
                        <div
                          key={entry.id}
                          className="flex items-center gap-3 rounded-lg border border-surface-border bg-surface-elevated p-3"
                        >
                          <ScoreDot score={entry.score} />
                          <div className="min-w-0 flex-1">
                            <code className="block break-all font-mono text-sm text-content-primary">
                              {entry.value}
                            </code>
                            <p className="mt-1 text-xs text-content-muted">
                              {formatTimeAgo(entry.createdAt)} ·{" "}
                              {entry.mode === "password" ? "Password" : "Passphrase"}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(entry.value, entry.id)}
                            className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-surface-border px-2.5 py-1.5 text-xs text-content-secondary transition-colors hover:bg-surface-card hover:text-content-primary"
                          >
                            <Copy className="h-3.5 w-3.5" />
                            {copiedKey === entry.id ? "Copied" : "Copy"}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  icon: KeyRound,
                  title: "Choose Mode",
                  description: "Pick random password or passphrase style",
                },
                {
                  step: "02",
                  icon: RefreshCw,
                  title: "Generate",
                  description: "Create secure output with crypto randomness",
                },
                {
                  step: "03",
                  icon: ShieldCheck,
                  title: "Check Strength",
                  description: "Review zxcvbn score and copy instantly",
                },
              ].map((step) => (
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

          <RelatedTools currentSlug="password-generator" />
          <ToolFeedback toolName="Password Generator" />
          <ToolSeoContent slug="password-generator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
