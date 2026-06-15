"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Copy, Table, UploadCloud } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import {
  detectDelimiter,
  parseCSV,
  type ParseOptions,
} from "@/lib/csv-to-json";

const EXAMPLE_CSV = `name,email,city
Alice,alice@example.com,Mumbai
Bob,bob@example.com,Delhi
Carol,carol@example.com,Bangalore`;

type DelimiterOption = ParseOptions["delimiter"] | "auto";
type OutputTab = "json" | "table";

export default function CsvToJsonPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState(EXAMPLE_CSV);
  const [delimiter, setDelimiter] = useState<DelimiterOption>("auto");
  const [hasHeader, setHasHeader] = useState(true);
  const [trimValues, setTrimValues] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<OutputTab>("json");

  const parseResult = useMemo(() => {
    if (!input.trim()) {
      return { json: "", stats: { rowCount: 0, colCount: 0, headers: [] as string[] }, rows: [] as Record<string, string>[] };
    }
    try {
      const resolvedDelimiter =
        delimiter === "auto" ? detectDelimiter(input) : delimiter;
      const options: ParseOptions = {
        hasHeader,
        delimiter: resolvedDelimiter,
        trimValues,
      };
      const result = parseCSV(input, options);
      const json = JSON.stringify(result.json, null, 2);
      const rows = hasHeader
        ? (result.json as Record<string, string>[])
        : [];
      return {
        json,
        stats: {
          rowCount: result.rowCount,
          colCount: result.colCount,
          headers: result.headers,
        },
        rows,
      };
    } catch {
      return null;
    }
  }, [input, delimiter, hasHeader, trimValues]);

  useEffect(() => {
    if (parseResult === null && input.trim()) {
      setError("Failed to parse CSV. Check delimiter and format.");
    } else {
      setError(null);
    }
  }, [parseResult, input]);

  const handleFile = async (file: File) => {
    const text = await file.text();
    setInput(text);
  };

  const copyJson = async () => {
    if (!parseResult?.json) return;
    await navigator.clipboard.writeText(parseResult.json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const previewRows = parseResult?.rows.slice(0, 10) ?? [];
  const headers =
    parseResult?.stats.headers.length
      ? parseResult.stats.headers
      : previewRows.length > 0
        ? Object.keys(previewRows[0])
        : [];

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

        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-convert/10">
              <Table className="h-6 w-6 text-tool-convert" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              CSV to JSON Converter — Free Online
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Paste CSV data or upload a file for instant JSON conversion.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-surface-border bg-surface-card p-3">
            <span className="text-sm font-medium text-content-secondary">Delimiter:</span>
            {(
              [
                { value: "auto" as const, label: "Auto" },
                { value: "," as const, label: "," },
                { value: ";" as const, label: ";" },
                { value: "\t" as const, label: "Tab" },
                { value: "|" as const, label: "|" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setDelimiter(opt.value)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                  delimiter === opt.value
                    ? "bg-tool-convert/10 text-tool-convert"
                    : "text-content-secondary hover:text-content-primary"
                }`}
              >
                {opt.label}
              </button>
            ))}
            <label className="ml-auto flex items-center gap-2 text-sm text-content-secondary">
              <input
                type="checkbox"
                checked={hasHeader}
                onChange={(e) => setHasHeader(e.target.checked)}
              />
              First row is header
            </label>
            <label className="flex items-center gap-2 text-sm text-content-secondary">
              <input
                type="checkbox"
                checked={trimValues}
                onChange={(e) => setTrimValues(e.target.checked)}
              />
              Trim whitespace
            </label>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-content-primary">
                  CSV Input
                </label>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-content-secondary hover:text-content-primary"
                >
                  <UploadCloud className="h-3.5 w-3.5" />
                  Upload CSV file
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                    e.target.value = "";
                  }}
                />
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[300px] w-full resize-y rounded-xl border border-surface-border bg-surface-card p-4 font-mono text-sm text-content-primary outline-none focus:border-tool-convert"
                placeholder={EXAMPLE_CSV}
                spellCheck={false}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="inline-flex rounded-lg border border-surface-border bg-surface-card p-0.5">
                  {(
                    [
                      { value: "json" as const, label: "JSON" },
                      { value: "table" as const, label: "Table Preview" },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.value}
                      type="button"
                      onClick={() => setActiveTab(tab.value)}
                      className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                        activeTab === tab.value
                          ? "bg-tool-convert text-white"
                          : "text-content-secondary"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                {activeTab === "json" && (
                  <button
                    type="button"
                    onClick={copyJson}
                    disabled={!parseResult?.json}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-surface-border px-2.5 py-1 text-xs font-medium text-content-secondary hover:text-content-primary disabled:opacity-40"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                )}
              </div>

              {activeTab === "json" ? (
                <textarea
                  readOnly
                  value={parseResult?.json ?? ""}
                  className="min-h-[300px] w-full resize-y rounded-xl border border-surface-border bg-surface-card p-4 font-mono text-sm text-content-primary outline-none"
                />
              ) : (
                <div className="min-h-[300px] overflow-auto rounded-xl border border-surface-border bg-surface-card">
                  {previewRows.length > 0 && headers.length > 0 ? (
                    <>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-surface-border">
                            {headers.map((h) => (
                              <th
                                key={h}
                                className="px-3 py-2 text-left font-medium text-content-secondary"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {previewRows.map((row, i) => (
                            <tr
                              key={i}
                              className="border-b border-surface-border last:border-b-0"
                            >
                              {headers.map((h) => (
                                <td
                                  key={h}
                                  className="px-3 py-2 text-content-primary"
                                >
                                  {row[h]}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {parseResult && parseResult.stats.rowCount > 10 && (
                        <p className="border-t border-surface-border px-3 py-2 text-xs text-content-muted">
                          Showing 10 of {parseResult.stats.rowCount} rows
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="p-4 text-sm text-content-muted">
                      {hasHeader
                        ? "No data to preview"
                        : "Table preview requires header row"}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {error && (
            <p className="mt-3 text-sm text-tool-pdf">{error}</p>
          )}

          {parseResult && (
            <p className="mt-3 text-sm text-content-secondary">
              {parseResult.stats.rowCount} rows · {parseResult.stats.colCount}{" "}
              columns
              {parseResult.stats.headers.length > 0 &&
                ` · ${parseResult.stats.headers.length} headers`}
            </p>
          )}

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: Table, title: "Paste", description: "Paste CSV data or upload a .csv file" },
                { step: "02", icon: Copy, title: "Convert", description: "JSON output appears instantly" },
                { step: "03", icon: UploadCloud, title: "Copy", description: "Copy the JSON or preview as table" },
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

          <RelatedTools currentSlug="csv-to-json" />
          <ToolFeedback toolName="CSV to JSON" />
          <ToolSeoContent slug="csv-to-json" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
