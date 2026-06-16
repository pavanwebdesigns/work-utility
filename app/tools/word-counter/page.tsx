"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlignLeft,
  Clock,
  Copy,
  Eraser,
  Hash,
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
    description: "See words, characters, and reading time update live",
  },
  {
    step: "03",
    icon: Copy,
    title: "Use",
    description: "Copy your text or clear and start again",
  },
];

function formatCount(value: number): string {
  return value.toLocaleString("en-IN");
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

  const statCards = [
    {
      label: "Words",
      value: formatCount(stats.words),
      sub: `${formatCount(stats.paragraphs)} paragraphs`,
      icon: WholeWord,
    },
    {
      label: "Characters",
      value: formatCount(stats.charactersWithSpaces),
      sub: `${formatCount(stats.charactersWithoutSpaces)} without spaces`,
      icon: Type,
    },
    {
      label: "Sentences",
      value: formatCount(stats.sentences),
      sub: "Punctuation-based count",
      icon: AlignLeft,
    },
    {
      label: "Reading Time",
      value: stats.readingTime,
      sub: "At 200 words per minute",
      icon: Clock,
    },
  ];

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex cursor-pointer items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
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
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Count words, characters, sentences, and reading time as you type.
              Private, fast, and free.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="word-counter" />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="rounded-xl border border-surface-border bg-surface-card p-4"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue/10">
                  <card.icon
                    className="h-4 w-4 text-brand-blue"
                    strokeWidth={1.75}
                  />
                </div>
                <p className="text-2xl font-bold text-content-primary">
                  {card.value}
                </p>
                <p className="mt-1 text-sm font-medium text-content-primary">
                  {card.label}
                </p>
                <p className="mt-1 text-xs text-content-muted">{card.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Start typing or paste your text here..."
              aria-label="Text to count words and characters"
              className="min-h-[220px] w-full resize-y rounded-xl border border-surface-border bg-surface-card px-4 py-4 text-sm leading-relaxed text-content-primary outline-none transition-colors focus:border-brand-blue sm:min-h-[280px]"
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
