"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Plus, Table2, Trash2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { LastUpdatedBadge } from "@/components/LastUpdatedBadge";
import { CopyValueButton } from "@/components/CopyValueButton";
import {
  CalculatorField,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import {
  DEFAULT_ALIGNMENTS,
  DEFAULT_TABLE_GRID,
  generateHtmlTable,
  generateMarkdownTable,
  parseCsvToGrid,
  type ColumnAlignment,
  type TableCell,
} from "@/lib/markdown-table";

type InputMode = "grid" | "csv";
type OutputTab = "markdown" | "html";

export default function MarkdownTablePage() {
  const [inputMode, setInputMode] = useState<InputMode>("grid");
  const [grid, setGrid] = useState<TableCell[][]>(DEFAULT_TABLE_GRID);
  const [alignments, setAlignments] = useState<ColumnAlignment[]>(DEFAULT_ALIGNMENTS);
  const [csvText, setCsvText] = useState("");
  const [outputTab, setOutputTab] = useState<OutputTab>("markdown");

  const markdown = useMemo(
    () => generateMarkdownTable(grid, alignments),
    [alignments, grid],
  );
  const html = useMemo(() => generateHtmlTable(grid), [grid]);
  const activeOutput = outputTab === "markdown" ? markdown : html;

  const updateCell = (row: number, col: number, value: string) => {
    setGrid((prev) =>
      prev.map((r, ri) =>
        r.map((c, ci) => (ri === row && ci === col ? value : c)),
      ),
    );
  };

  const addColumn = () => {
    setGrid((prev) => prev.map((row) => [...row, ""]));
    setAlignments((prev) => [...prev, "left"]);
  };

  const addRow = () => {
    const cols = grid[0]?.length ?? 3;
    setGrid((prev) => [...prev, Array.from({ length: cols }, () => "")]);
  };

  const removeColumn = (colIndex: number) => {
    if ((grid[0]?.length ?? 0) <= 1) return;
    setGrid((prev) => prev.map((row) => row.filter((_, i) => i !== colIndex)));
    setAlignments((prev) => prev.filter((_, i) => i !== colIndex));
  };

  const removeRow = (rowIndex: number) => {
    if (grid.length <= 1) return;
    setGrid((prev) => prev.filter((_, i) => i !== rowIndex));
  };

  const setAlignment = (col: number, align: ColumnAlignment) => {
    setAlignments((prev) => {
      const next = [...prev];
      next[col] = align;
      return next;
    });
  };

  const handleCsvParse = () => {
    const parsed = parseCsvToGrid(csvText);
    if (parsed) {
      setGrid(parsed);
      setAlignments(Array.from({ length: parsed[0].length }, () => "left" as const));
      setInputMode("grid");
    }
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-content-secondary hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-image/10">
              <Table2 className="h-6 w-6 text-tool-image" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Markdown Table Generator
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Build Markdown tables with a visual grid editor or paste CSV data.
              Column alignment, live preview, and HTML export.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="markdown-table" />
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-2xl">
            <ToggleButtonGroup
              value={inputMode}
              onChange={setInputMode}
              ariaLabel="Input mode"
              options={[
                { value: "grid" as const, label: "Visual Grid" },
                { value: "csv" as const, label: "Paste CSV" },
              ]}
            />
          </div>

          {inputMode === "csv" ? (
            <div className="mx-auto mt-6 max-w-2xl space-y-3">
              <CalculatorField label="CSV Data" htmlFor="csv">
                <textarea
                  id="csv"
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  rows={8}
                  placeholder="Name, Age, City&#10;Alice, 30, Mumbai&#10;Bob, 25, Delhi"
                  className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-3 font-mono text-sm text-content-primary focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
              </CalculatorField>
              <button
                type="button"
                onClick={handleCsvParse}
                className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90"
              >
                Parse CSV → Grid
              </button>
            </div>
          ) : (
            <div className="mx-auto mt-6 max-w-3xl overflow-x-auto">
              <div className="mb-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={addColumn}
                  className="inline-flex items-center gap-1 rounded-lg border border-surface-border px-3 py-1.5 text-sm hover:bg-surface-elevated"
                >
                  <Plus className="h-4 w-4" /> Add Column
                </button>
                <button
                  type="button"
                  onClick={addRow}
                  className="inline-flex items-center gap-1 rounded-lg border border-surface-border px-3 py-1.5 text-sm hover:bg-surface-elevated"
                >
                  <Plus className="h-4 w-4" /> Add Row
                </button>
              </div>

              <table className="w-full min-w-[400px] border-collapse text-sm">
                <thead>
                  <tr>
                    {grid[0]?.map((_, col) => (
                      <th key={col} className="p-1">
                        <div className="mb-1 flex items-center justify-between gap-1">
                          <ToggleButtonGroup
                            value={alignments[col] ?? "left"}
                            onChange={(a) => setAlignment(col, a)}
                            ariaLabel={`Column ${col + 1} alignment`}
                            options={[
                              { value: "left" as const, label: "L" },
                              { value: "center" as const, label: "C" },
                              { value: "right" as const, label: "R" },
                            ]}
                          />
                          {(grid[0]?.length ?? 0) > 1 && (
                            <button
                              type="button"
                              onClick={() => removeColumn(col)}
                              className="text-content-muted hover:text-red-500"
                              aria-label={`Remove column ${col + 1}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </th>
                    ))}
                    <th className="w-8" />
                  </tr>
                </thead>
                <tbody>
                  {grid.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td key={colIndex} className="p-1">
                          <input
                            value={cell}
                            onChange={(e) =>
                              updateCell(rowIndex, colIndex, e.target.value)
                            }
                            className={`w-full rounded-lg border px-2 py-1.5 text-sm focus:border-brand-blue focus:outline-none ${
                              rowIndex === 0
                                ? "border-brand-blue/40 bg-brand-blue/5 font-medium"
                                : "border-surface-border bg-surface-card"
                            }`}
                            placeholder={rowIndex === 0 ? "Header" : "Cell"}
                          />
                        </td>
                      ))}
                      <td className="p-1">
                        {grid.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRow(rowIndex)}
                            className="text-content-muted hover:text-red-500"
                            aria-label={`Remove row ${rowIndex + 1}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mx-auto mt-10 max-w-2xl">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <ToggleButtonGroup
                value={outputTab}
                onChange={setOutputTab}
                ariaLabel="Output format"
                options={[
                  { value: "markdown" as const, label: "Markdown" },
                  { value: "html" as const, label: "HTML" },
                ]}
              />
              <CopyValueButton value={activeOutput} label="Copy Output" />
            </div>
            <pre className="overflow-x-auto rounded-xl border border-surface-border bg-surface-elevated p-4 text-xs text-content-primary">
              <code>{activeOutput}</code>
            </pre>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Table2, title: "Visual grid", desc: "Click to edit cells" },
              { icon: Copy, title: "CSV import", desc: "Paste Excel or CSV data" },
              { icon: Plus, title: "Alignment", desc: "Left, center, right per column" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-surface-border bg-surface-card p-5"
              >
                <item.icon className="h-5 w-5 text-tool-image" />
                <p className="mt-2 font-semibold text-content-primary">{item.title}</p>
                <p className="mt-1 text-sm text-content-secondary">{item.desc}</p>
              </div>
            ))}
          </div>

          <RelatedTools currentSlug="markdown-table" />
          <ToolFeedback toolName="Markdown Table Generator" />
          <ToolSeoContent slug="markdown-table" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
