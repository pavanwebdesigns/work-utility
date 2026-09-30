"use client";

import { useMemo, useState } from "react";
import { CaseSensitive, Check, Copy, Type } from "lucide-react";
import {
  convertCase,
  getTextStats,
  type CaseType,
} from "@/lib/text-case-converter";

const CASE_OPTIONS: { type: CaseType; label: string }[] = [
  { type: "upper", label: "UPPERCASE" },
  { type: "lower", label: "lowercase" },
  { type: "title", label: "Title Case" },
  { type: "sentence", label: "Sentence case" },
  { type: "camel", label: "camelCase" },
  { type: "pascal", label: "PascalCase" },
  { type: "snake", label: "snake_case" },
  { type: "kebab", label: "kebab-case" },
  { type: "constant", label: "CONSTANT_CASE" },
  { type: "dot", label: "dot.case" },
  { type: "path", label: "path/case" },
];

const howItWorksSteps = [
  { step: "01", icon: Type, title: "Type", description: "Enter your text in the input box" },
  { step: "02", icon: CaseSensitive, title: "Convert", description: "All case formats appear instantly" },
  { step: "03", icon: Copy, title: "Copy", description: "Click any card to copy that format" },
];

export default function TextCaseConverterPage() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const outputs = useMemo(() => {
    const result: Record<CaseType, string> = {} as Record<CaseType, string>;
    CASE_OPTIONS.forEach(({ type }) => {
      result[type] = input ? convertCase(input, type) : "";
    });
    return result;
  }, [input]);

  const stats = useMemo(() => getTextStats(input), [input]);

  const handleCopy = async (type: CaseType, value: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  return (
    <>
<div className="mx-auto mt-10 max-w-4xl space-y-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-32 w-full resize-y rounded-xl border border-surface-border bg-surface-card p-4 text-sm text-content-primary outline-none transition-colors focus:border-tool-image"
            />

            <p className="text-xs text-content-muted">
              {stats.chars} characters · {stats.words} words · {stats.lines} lines
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CASE_OPTIONS.map(({ type, label }) => (
                <div
                  key={type}
                  className="group relative rounded-xl border border-surface-border bg-surface-card p-4"
                >
                  <button
                    type="button"
                    onClick={() => handleCopy(type, outputs[type])}
                    className="absolute right-3 top-3 rounded-lg p-1.5 text-content-muted transition-colors hover:bg-surface-elevated hover:text-content-primary"
                    aria-label={`Copy ${label}`}
                  >
                    {copied === type ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                  <p className="mb-2 pr-8 text-xs uppercase tracking-wide text-content-muted">{label}</p>
                  <p
                    className="truncate font-mono text-sm text-content-primary group-hover:whitespace-normal"
                    title={outputs[type]}
                  >
                    {outputs[type] || "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div key={step.title} className="rounded-xl border border-surface-border bg-surface-card p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-image/10">
                    <step.icon className="h-5 w-5 text-tool-image" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
    </>
  );
}

