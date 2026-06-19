"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlignLeft,
  Clock,
  Copy,
  Eraser,
  Hash,
  Mic,
  Type,
  WholeWord,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { analyzeText } from "@/lib/word-counter";

const howItWorksSteps = [
  {
    step: "01",
    icon: AlignLeft,
    title: "Paste",
    description: "Type or paste your text into the editor",
  },
  {
    step: "02",
    icon: Hash,
    title: "Count",
    description: "See words, characters, reading time, and more update live",
  },
  {
    step: "03",
    icon: Copy,
    title: "Use",
    description: "Check platform limits, keyword density, and copy when ready",
  },
];

function formatCount(value: number): string {
  return value.toLocaleString("en-IN");
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-surface-border py-2.5 last:border-b-0">
      <span className="text-sm text-content-secondary">{label}</span>
      <span className="text-sm font-semibold text-content-primary">{value}</span>
    </div>
  );
}

export default function WordCounterPage() {
  const [text, setText] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle"
  );

  const stats = useMemo(() => analyzeText(text), [text]);

  const handleClear = () => {
    setText("");
    setCopyStatus("idle");
  };

  const handleCopy = async () => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex cursor-pointer items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <WholeWord
                className="h-6 w-6 text-brand-blue"
                strokeWidth={1.75}
              />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Word Counter Online — Free &amp; Instant
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-content-secondary">
              Count words, characters, sentences, reading time, keyword density,
              and social media limits as you type. Private, fast, and free.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="word-counter" />
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
            <div className="space-y-4">
              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Start typing or paste your text here..."
                aria-label="Text to count words and characters"
                className="min-h-[320px] w-full resize-y rounded-xl border border-surface-border bg-surface-card px-4 py-4 text-sm leading-relaxed text-content-primary outline-none transition-colors focus:border-brand-blue sm:min-h-[420px] lg:min-h-[560px]"
              />

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear text"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-elevated px-5 py-3 text-sm font-medium text-content-primary transition-colors hover:border-brand-blue/40"
                >
                  <Eraser className="h-4 w-4" />
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!text}
                  aria-label="Copy text to clipboard"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Copy className="h-4 w-4" />
                  {copyStatus === "copied"
                    ? "Copied!"
                    : copyStatus === "error"
                      ? "Copy failed"
                      : "Copy Text"}
                </button>
              </div>
            </div>

            <div className="space-y-4 lg:sticky lg:top-6">
              <section className="rounded-xl border border-surface-border bg-surface-card p-4">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-content-primary">
                  <Hash className="h-4 w-4 text-brand-blue" />
                  Core counts
                </h2>
                <StatRow label="Words" value={formatCount(stats.words)} />
                <StatRow
                  label="Characters (with spaces)"
                  value={formatCount(stats.charactersWithSpaces)}
                />
                <StatRow
                  label="Characters (no spaces)"
                  value={formatCount(stats.charactersWithoutSpaces)}
                />
                <StatRow label="Sentences" value={formatCount(stats.sentences)} />
                <StatRow
                  label="Paragraphs"
                  value={formatCount(stats.paragraphs)}
                />
                <StatRow label="Lines" value={formatCount(stats.lines)} />
              </section>

              <section className="rounded-xl border border-surface-border bg-surface-card p-4">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-content-primary">
                  <Clock className="h-4 w-4 text-brand-blue" />
                  Reading &amp; speaking time
                </h2>
                <StatRow
                  label="Reading time (200 wpm)"
                  value={stats.readingTime}
                />
                <StatRow
                  label="Speaking time (130 wpm)"
                  value={stats.speakingTime}
                />
              </section>

              <section className="rounded-xl border border-surface-border bg-surface-card p-4">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-content-primary">
                  <Type className="h-4 w-4 text-brand-blue" />
                  Keyword density
                </h2>
                {stats.topKeywords.length === 0 ? (
                  <p className="text-sm text-content-muted">
                    Top keywords appear here once you add text.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-content-secondary">
                          <th className="pb-2 pr-3 font-medium">Word</th>
                          <th className="pb-2 pr-3 font-medium">Count</th>
                          <th className="pb-2 font-medium">%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.topKeywords.map((item) => (
                          <tr
                            key={item.word}
                            className="border-t border-surface-border"
                          >
                            <td className="py-2 pr-3 font-medium text-content-primary">
                              {item.word}
                            </td>
                            <td className="py-2 pr-3 text-content-secondary">
                              {item.count}
                            </td>
                            <td className="py-2 text-content-secondary">
                              {item.percent.toFixed(1)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              <section className="rounded-xl border border-surface-border bg-surface-card p-4">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-content-primary">
                  <Mic className="h-4 w-4 text-brand-blue" />
                  Platform limits
                </h2>
                <div className="space-y-3">
                  {stats.platformLimits.map((platform) => (
                    <div key={platform.name}>
                      <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                        <span className="font-medium text-content-primary">
                          {platform.name}
                        </span>
                        <span
                          className={
                            platform.over
                              ? "font-semibold text-red-600"
                              : "text-content-secondary"
                          }
                        >
                          {formatCount(platform.current)}/
                          {formatCount(platform.limit)}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-surface-border">
                        <div
                          className={`h-full rounded-full transition-all ${
                            platform.over ? "bg-red-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${platform.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                    <step.icon
                      className="h-5 w-5 text-brand-blue"
                      strokeWidth={1.75}
                    />
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

          <RelatedTools currentSlug="word-counter" />
          <ToolFeedback toolName="Word Counter" />
          <ToolSeoContent slug="word-counter" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
