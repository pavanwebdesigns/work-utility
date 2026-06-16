"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GitCompare } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { diffTexts, type DiffLine } from "@/lib/text-diff";

type ViewMode = "split" | "unified";

export default function TextDiffPage() {
  const [text1, setText1] = useState("Hello World\nLine two\nLine three");
  const [text2, setText2] = useState("Hello World\nLine 2 changed\nLine three\nLine four");
  const [result, setResult] = useState<ReturnType<typeof diffTexts> | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("unified");

  useEffect(() => {
    const timer = setTimeout(() => {
      setResult(diffTexts(text1, text2));
    }, 500);
    return () => clearTimeout(timer);
  }, [text1, text2]);

  const renderUnifiedLine = (line: DiffLine, index: number) => {
    const prefix =
      line.type === "added" ? "+ " : line.type === "removed" ? "- " : "  ";
    const className =
      line.type === "added"
        ? "bg-green-500/10 text-green-400"
        : line.type === "removed"
          ? "bg-red-500/10 text-red-400"
          : "text-content-secondary";

    return (
      <div key={index} className={`flex font-mono text-sm ${className}`}>
        <span className="w-10 shrink-0 select-none text-right pr-2 text-content-muted">
          {line.lineNum1 ?? line.lineNum2 ?? ""}
        </span>
        <span className="whitespace-pre-wrap break-all">
          {prefix}
          {line.content}
        </span>
      </div>
    );
  };

  const leftLines = result?.lines.filter((l) => l.type !== "added") ?? [];
  const rightLines = result?.lines.filter((l) => l.type !== "removed") ?? [];

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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-image/10">
              <GitCompare className="h-6 w-6 text-tool-image" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Text Diff Checker — Compare Text Online Free
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Compare two texts and highlight added, removed, and unchanged lines.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="text-diff" />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-content-primary">
                Original Text
              </label>
              <textarea
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                className="min-h-48 w-full resize-y rounded-xl border border-surface-border bg-surface-card p-4 font-mono text-sm text-content-primary outline-none focus:border-tool-image"
                spellCheck={false}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-content-primary">
                Modified Text
              </label>
              <textarea
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                className="min-h-48 w-full resize-y rounded-xl border border-surface-border bg-surface-card p-4 font-mono text-sm text-content-primary outline-none focus:border-tool-image"
                spellCheck={false}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setResult(diffTexts(text1, text2))}
            className="mt-4 w-full rounded-xl bg-tool-image py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Compare Texts
          </button>

          {result && (
            <>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                  {result.added} lines added
                </span>
                <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                  {result.removed} lines removed
                </span>
                <span className="rounded-full bg-surface-card px-3 py-1 text-xs font-semibold text-content-muted">
                  {result.unchanged} unchanged
                </span>
                <div className="ml-auto inline-flex rounded-lg border border-surface-border bg-surface-card p-0.5">
                  {(
                    [
                      { value: "split" as const, label: "Split" },
                      { value: "unified" as const, label: "Unified" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setViewMode(opt.value)}
                      className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                        viewMode === opt.value
                          ? "bg-tool-image text-white"
                          : "text-content-secondary"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 overflow-auto rounded-xl border border-surface-border bg-surface-card p-3">
                {viewMode === "unified" ? (
                  <div className="space-y-0.5">
                    {result.lines.map(renderUnifiedLine)}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-semibold text-content-secondary">
                        Original
                      </p>
                      <div className="space-y-0.5">
                        {leftLines.map((line, i) => (
                          <div
                            key={i}
                            className={`flex font-mono text-sm ${
                              line.type === "removed"
                                ? "bg-red-500/10 text-red-400"
                                : "text-content-secondary"
                            }`}
                          >
                            <span className="w-8 shrink-0 text-content-muted">
                              {line.lineNum1 ?? ""}
                            </span>
                            <span className="whitespace-pre-wrap break-all">
                              {line.content}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-semibold text-content-secondary">
                        Modified
                      </p>
                      <div className="space-y-0.5">
                        {rightLines.map((line, i) => (
                          <div
                            key={i}
                            className={`flex font-mono text-sm ${
                              line.type === "added"
                                ? "bg-green-500/10 text-green-400"
                                : "text-content-secondary"
                            }`}
                          >
                            <span className="w-8 shrink-0 text-content-muted">
                              {line.lineNum2 ?? ""}
                            </span>
                            <span className="whitespace-pre-wrap break-all">
                              {line.content}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: GitCompare, title: "Paste", description: "Enter original text on the left" },
                { step: "02", icon: GitCompare, title: "Modify", description: "Enter modified text on the right" },
                { step: "03", icon: GitCompare, title: "Compare", description: "See differences highlighted instantly" },
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

          <RelatedTools currentSlug="text-diff" />
          <ToolFeedback toolName="Text Diff Checker" />
          <ToolSeoContent slug="text-diff" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
