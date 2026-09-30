"use client";

import { useCallback, useState } from "react";
import { Binary, Copy, RefreshCw } from "lucide-react";
import {convert, validateInput, type NumberBase} from "@/lib/binary-converter";

const BASE_CONFIG: Record<
  NumberBase,
  { label: string; subtitle: string; hint: string }
> = {
  binary: { label: "Binary", subtitle: "Base 2", hint: "0 and 1 only" },
  decimal: { label: "Decimal", subtitle: "Base 10", hint: "0–9 only" },
  hex: { label: "Hexadecimal", subtitle: "Base 16", hint: "0–9, A–F" },
  octal: { label: "Octal", subtitle: "Base 8", hint: "0–7 only" },
};

const EXAMPLES = ["0", "1", "10", "255", "1024", "65535"];

export default function BinaryConverterPage() {
  const [activeInput, setActiveInput] = useState<NumberBase>("decimal");
  const [values, setValues] = useState({
    binary: "",
    decimal: "",
    hex: "",
    octal: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<NumberBase | null>(null);

  const handleChange = useCallback((base: NumberBase, raw: string) => {
    const value = raw.trim();
    setActiveInput(base);
    setError(null);

    if (!value) {
      setValues({ binary: "", decimal: "", hex: "", octal: "" });
      return;
    }

    if (!validateInput(value, base)) {
      setValues((prev) => ({ ...prev, [base]: value }));
      setError(`Invalid ${BASE_CONFIG[base].label.toLowerCase()} input. ${BASE_CONFIG[base].hint}.`);
      return;
    }

    try {
      const converted = convert(value, base);
      setValues(converted);
    } catch {
      setValues((prev) => ({ ...prev, [base]: value }));
      setError("Invalid number for the selected base");
    }
  }, []);

  const loadExample = (decimal: string) => {
    try {
      const converted = convert(decimal, "decimal");
      setValues(converted);
      setActiveInput("decimal");
      setError(null);
    } catch {
      setError("Could not convert example value");
    }
  };

  const copyValue = async (base: NumberBase) => {
    const value = values[base];
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(base);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
<div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(Object.keys(BASE_CONFIG) as NumberBase[]).map((base) => {
              const config = BASE_CONFIG[base];
              const isActive = activeInput === base;
              return (
                <div
                  key={base}
                  className={`relative rounded-xl border bg-surface-card p-4 transition-colors ${
                    isActive
                      ? "border-tool-image"
                      : "border-surface-border"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => copyValue(base)}
                    className="absolute right-3 top-3 rounded-md p-1.5 text-content-muted transition-colors hover:bg-surface-elevated hover:text-content-primary"
                    aria-label={`Copy ${config.label}`}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  {copied === base && (
                    <span className="absolute right-10 top-3 text-xs text-tool-image">
                      Copied!
                    </span>
                  )}
                  <p className="text-sm font-semibold text-content-primary">
                    {config.label}
                  </p>
                  <p className="text-xs text-content-muted">{config.subtitle}</p>
                  <input
                    type="text"
                    value={values[base]}
                    onChange={(e) => handleChange(base, e.target.value)}
                    onFocus={() => setActiveInput(base)}
                    className="mt-3 w-full rounded-lg border border-surface-border bg-surface-base px-3 py-3 font-mono text-lg text-content-primary outline-none transition-colors focus:border-tool-image"
                    placeholder="0"
                    spellCheck={false}
                    aria-label={`${config.label} input`}
                  />
                  <p className="mt-2 text-xs text-content-muted">{config.hint}</p>
                </div>
              );
            })}
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-tool-pdf/30 bg-tool-pdf/5 px-4 py-3 text-sm text-tool-pdf">
              {error}
            </div>
          )}

          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-content-secondary">
              Common examples (decimal)
            </p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => loadExample(example)}
                  className="rounded-lg border border-surface-border bg-surface-card px-3 py-1.5 font-mono text-sm text-content-secondary transition-colors hover:border-tool-image hover:text-tool-image"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: Binary, title: "Enter", description: "Type in any number system" },
                { step: "02", icon: RefreshCw, title: "Convert", description: "All formats update instantly" },
                { step: "03", icon: Copy, title: "Copy", description: "Copy any format with one click" },
              ].map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
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

