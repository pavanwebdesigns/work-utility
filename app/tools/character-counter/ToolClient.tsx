"use client";

import { useMemo, useState } from "react";
import {
  AlignLeft,
  Eraser,
  Hash,
  Type,
  WholeWord,
  FileText,
} from "lucide-react";
import { analyzeText } from "@/lib/character-counter";

const howItWorksSteps = [
  {
    step: "01",
    icon: Type,
    title: "Type",
    description: "Type or paste your text into the editor",
  },
  {
    step: "02",
    icon: Hash,
    title: "Count",
    description: "See character and word counts update live",
  },
  {
    step: "03",
    icon: FileText,
    title: "Use Stats",
    description: "Use the stats for essays, tweets, and SEO",
  },
];

function formatCount(value: number): string {
  return value.toLocaleString("en-IN");
}

export default function CharacterCounterPage() {
  const [input, setInput] = useState("");

  const stats = useMemo(() => analyzeText(input), [input]);

  const statCards = [
    { label: "Characters", value: formatCount(stats.characters), icon: Type },
    {
      label: "No Spaces",
      value: formatCount(stats.charactersNoSpaces),
      icon: Hash,
    },
    { label: "Words", value: formatCount(stats.words), icon: WholeWord },
    {
      label: "Sentences",
      value: formatCount(stats.sentences),
      icon: AlignLeft,
    },
    {
      label: "Paragraphs",
      value: formatCount(stats.paragraphs),
      icon: FileText,
    },
  ];

  return (
    <>
<div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
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
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Start typing or paste your text here..."
              aria-label="Text to count characters"
              className="min-h-64 w-full resize-y rounded-xl border border-surface-border bg-surface-card px-4 py-4 text-sm leading-relaxed text-content-primary outline-none transition-colors focus:border-brand-blue"
            />
            <button
              type="button"
              onClick={() => setInput("")}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-elevated px-5 py-3 text-sm font-medium text-content-primary transition-colors hover:border-brand-blue/40"
            >
              <Eraser className="h-4 w-4" />
              Clear
            </button>
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
                  <p className="text-xs font-semibold text-brand-blue">
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
    </>
  );
}

