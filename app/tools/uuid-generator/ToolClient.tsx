"use client";

import { useCallback, useMemo, useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import {
  formatUuid,
  generateUuids,
  type UuidFormatOptions,
} from "@/lib/uuid-generator";

const BULK_OPTIONS = [1, 5, 10, 50, 100];

export default function UuidGeneratorPage() {
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [uuids, setUuids] = useState<string[]>(() => generateUuids(1));
  const [copiedIndex, setCopiedIndex] = useState<number | "all" | null>(null);

  const formatOptions: UuidFormatOptions = useMemo(
    () => ({ uppercase, hyphens }),
    [uppercase, hyphens],
  );

  const formattedUuids = useMemo(
    () => uuids.map((uuid) => formatUuid(uuid, formatOptions)),
    [uuids, formatOptions],
  );

  const regenerate = useCallback(() => {
    setUuids(generateUuids(count));
    setCopiedIndex(null);
  }, [count]);

  const copyOne = async (value: string, index: number) => {
    await navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(formattedUuids.join("\n"));
    setCopiedIndex("all");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
<div className="mt-10 space-y-4">
            <div className="rounded-xl border border-surface-border bg-surface-card p-4">
              <p className="mb-2 text-sm font-medium text-content-primary">How many UUIDs?</p>
              <div className="flex flex-wrap gap-2">
                {BULK_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setCount(option)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      count === option
                        ? "bg-brand-blue text-white"
                        : "bg-surface-base text-content-secondary hover:text-content-primary"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 rounded-xl border border-surface-border bg-surface-card p-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-content-primary">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(event) => setUppercase(event.target.checked)}
                  className="rounded border-surface-border"
                />
                Uppercase
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-content-primary">
                <input
                  type="checkbox"
                  checked={hyphens}
                  onChange={(event) => setHyphens(event.target.checked)}
                  className="rounded border-surface-border"
                />
                Include hyphens
              </label>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={regenerate}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white hover:bg-brand-blue/90"
              >
                <RefreshCw className="h-4 w-4" />
                Generate {count === 1 ? "UUID" : `${count} UUIDs`}
              </button>
              {formattedUuids.length > 1 && (
                <button
                  type="button"
                  onClick={copyAll}
                  className="flex items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm font-semibold text-content-primary hover:bg-surface-base"
                >
                  {copiedIndex === "all" ? (
                    <>
                      <Check className="h-4 w-4" /> Copied all
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copy all
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="space-y-2">
              {formattedUuids.map((uuid, index) => (
                <div
                  key={`${uuid}-${index}`}
                  className="flex items-center gap-2 rounded-xl border border-surface-border bg-surface-card p-3"
                >
                  <code className="min-w-0 flex-1 break-all font-mono text-sm text-content-primary">
                    {uuid}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyOne(uuid, index)}
                    className="shrink-0 rounded-lg p-2 text-content-secondary hover:bg-surface-base hover:text-content-primary"
                    aria-label={`Copy UUID ${index + 1}`}
                  >
                    {copiedIndex === index ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
    </>
  );
}

