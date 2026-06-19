"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Braces, ClipboardCopy, Download } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  convertJsonToCsv,
  EXAMPLE_JSON_TO_CSV,
} from "@/lib/json-to-csv";

export default function JsonToCsvPage() {
  const [input, setInput] = useState(EXAMPLE_JSON_TO_CSV);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => convertJsonToCsv(input), [input]);

  const copyCsv = async () => {
    if (!("csv" in result)) return;
    await navigator.clipboard.writeText(result.csv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCsv = () => {
    if (!("csv" in result)) return;
    const blob = new Blob([result.csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "converted.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-blue/10">
              <Braces className="h-6 w-6 text-tool-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              JSON to CSV Converter Online Free
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Paste a JSON array of objects and download spreadsheet-ready CSV.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="json-to-csv" />
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-content-secondary">
            Need the reverse? Try our{" "}
            <Link
              href="/tools/csv-to-json"
              className="font-medium text-brand-blue hover:underline"
            >
              CSV to JSON converter
            </Link>
            .
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="json-input"
                className="mb-2 block text-sm font-medium text-content-primary"
              >
                JSON input
              </label>
              <textarea
                id="json-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={12}
                spellCheck={false}
                className="w-full rounded-xl border border-surface-border bg-surface-card p-4 font-mono text-xs text-content-primary outline-none focus:border-brand-blue sm:text-sm"
              />
            </div>

            {"error" in result && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {result.error}
              </div>
            )}

            {"csv" in result && (
              <>
                {result.warnings.length > 0 && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    <p className="font-medium">Conversion notes</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {result.warnings.map((warning) => (
                        <li key={warning}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={copyCsv}
                    className="inline-flex items-center gap-2 rounded-xl border border-surface-border px-4 py-2 text-sm font-medium text-content-primary hover:border-brand-blue"
                  >
                    <ClipboardCopy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy CSV"}
                  </button>
                  <button
                    type="button"
                    onClick={downloadCsv}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue/90"
                  >
                    <Download className="h-4 w-4" />
                    Download .csv
                  </button>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-content-primary">
                      CSV preview
                    </p>
                    <p className="text-xs text-content-muted">
                      {result.rowCount} rows · {result.headers.length} columns
                    </p>
                  </div>
                  <pre className="max-h-80 overflow-auto rounded-xl border border-surface-border bg-surface-card p-4 text-xs text-content-primary sm:text-sm">
                    <code>{result.csv}</code>
                  </pre>
                </div>
              </>
            )}
          </div>

          <RelatedTools currentSlug="json-to-csv" />
          <ToolFeedback toolName="JSON to CSV Converter" />
          <ToolSeoContent slug="json-to-csv" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
