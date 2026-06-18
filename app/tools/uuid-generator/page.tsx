"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, Fingerprint, RefreshCw } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-photo/10">
              <Fingerprint className="h-6 w-6 text-tool-photo" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              UUID Generator Online Free — v4 UUIDs Instantly
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Generate random UUID v4 identifiers. Create one or hundreds at once, with formatting options and one-click copy.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="uuid-generator" />
            </div>
          </div>

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

          <RelatedTools currentSlug="uuid-generator" />
          <ToolFeedback toolName="UUID Generator" />
          <ToolSeoContent slug="uuid-generator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
