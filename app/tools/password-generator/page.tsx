"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Copy, KeyRound, RefreshCw, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { DinoGame } from "@/components/DinoGame";
import { CalculatorField } from "@/components/calculator/CalculatorUi";
import {
  generatePasswords,
  getPasswordStrength,
  getStrengthColor,
  type PasswordOptions,
} from "@/lib/password-generator";

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

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(true);
  const [count, setCount] = useState(3);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const options: PasswordOptions = useMemo(
    () => ({
      length,
      uppercase,
      lowercase,
      numbers,
      symbols,
      excludeAmbiguous,
      count,
    }),
    [count, excludeAmbiguous, length, lowercase, numbers, symbols, uppercase]
  );

  const generateNewPasswords = useCallback(() => {
    try {
      setPasswords(generatePasswords(options));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to generate passwords.");
      setPasswords([]);
    }
  }, [options]);

  const handleCopy = async (password: string, index: number) => {
    await navigator.clipboard.writeText(password);
    setCopiedIndex(index);
    window.setTimeout(() => setCopiedIndex(null), 1500);
  };

  const topStrength = passwords[0]
    ? getPasswordStrength(passwords[0], options)
    : null;

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
              Generate secure random passwords with custom length, character
              types, and strength indicator. Runs entirely in your browser.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label={`Password Length: ${length}`} htmlFor="password-length">
              <input
                id="password-length"
                type="range"
                min={8}
                max={32}
                value={length}
                onChange={(event) => setLength(Number(event.target.value))}
                aria-label="Password length"
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-border accent-brand-blue"
              />
              <div className="mt-2 flex justify-between text-xs text-content-muted">
                <span>8</span>
                <span>32</span>
              </div>
            </CalculatorField>

            <div className="grid gap-3">
              <OptionToggle label="Include Uppercase (A-Z)" checked={uppercase} onChange={setUppercase} />
              <OptionToggle label="Include Lowercase (a-z)" checked={lowercase} onChange={setLowercase} />
              <OptionToggle label="Include Numbers (0-9)" checked={numbers} onChange={setNumbers} />
              <OptionToggle label="Include Symbols (!@#$...)" checked={symbols} onChange={setSymbols} />
              <OptionToggle
                label="Exclude Ambiguous Characters (0, O, l, 1)"
                checked={excludeAmbiguous}
                onChange={setExcludeAmbiguous}
              />
            </div>

            <CalculatorField label={`Number of Passwords: ${count}`} htmlFor="password-count">
              <input
                id="password-count"
                type="range"
                min={1}
                max={10}
                value={count}
                onChange={(event) => setCount(Number(event.target.value))}
                aria-label="Number of passwords"
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-border accent-brand-blue"
              />
              <div className="mt-2 flex justify-between text-xs text-content-muted">
                <span>1</span>
                <span>10</span>
              </div>
            </CalculatorField>

            <button
              type="button"
              onClick={generateNewPasswords}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-l-4 border-l-emerald bg-tool-convert px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-emerald/90"
            >
              <RefreshCw className="h-5 w-5" />
              Generate New
            </button>
          </div>

          {error && (
            <p className="mx-auto mt-4 max-w-xl text-center text-sm text-tool-pdf">
              {error}
            </p>
          )}

          {passwords.length > 0 && (
            <div className="mx-auto mt-10 max-w-xl space-y-4">
              {topStrength && (
                <div className="rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <ShieldCheck className={`h-5 w-5 ${getStrengthColor(topStrength)}`} />
                    <span className={`font-semibold ${getStrengthColor(topStrength)}`}>
                      Strength: {topStrength}
                    </span>
                  </div>
                </div>
              )}

              {passwords.map((password, index) => (
                <div
                  key={`${password}-${index}`}
                  className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-card p-4"
                >
                  <code className="min-w-0 flex-1 break-all text-sm text-content-primary">
                    {password}
                  </code>
                  <button
                    type="button"
                    onClick={() => handleCopy(password, index)}
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-surface-border px-3 py-2 text-sm text-content-secondary transition-colors hover:bg-surface-elevated hover:text-content-primary"
                  >
                    <Copy className="h-4 w-4" />
                    {copiedIndex === index ? "Copied" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: KeyRound, title: "Choose Options", description: "Set length, character types, and count" },
                { step: "02", icon: RefreshCw, title: "Generate", description: "Create random passwords with crypto API" },
                { step: "03", icon: ShieldCheck, title: "Copy Securely", description: "Use strength indicator and copy instantly" },
              ].map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
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

          <RelatedTools currentSlug="password-generator" />
          <ToolFeedback toolName="Password Generator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
