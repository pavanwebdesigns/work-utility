"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertCircle, Code, FileText, Regex, Search } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { COMMON_PATTERNS, testRegex } from "@/lib/regex-tester";

const howItWorksSteps = [
  {
    step: "01",
    icon: Regex,
    title: "Write Pattern",
    description: "Enter your regex pattern and flags",
  },
  {
    step: "02",
    icon: FileText,
    title: "Test String",
    description: "Paste text to test against the pattern",
  },
  {
    step: "03",
    icon: Search,
    title: "See Matches",
    description: "View highlighted matches and capture groups",
  },
];

const FLAG_OPTIONS = ["g", "i", "m", "s"] as const;

function HighlightedText({
  text,
  matches,
}: {
  text: string;
  matches: { match: string; index: number }[];
}) {
  if (!text || matches.length === 0) {
    return (
      <span className="whitespace-pre-wrap text-content-primary">{text}</span>
    );
  }

  const sorted = [...matches].sort((a, b) => a.index - b.index);
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  sorted.forEach((m, i) => {
    if (m.index > lastIndex) {
      parts.push(
        <span key={`t-${i}`}>{text.slice(lastIndex, m.index)}</span>,
      );
    }
    parts.push(
      <mark
        key={`m-${i}`}
        className="rounded bg-tool-image/30 text-content-primary"
      >
        {m.match}
      </mark>,
    );
    lastIndex = m.index + m.match.length;
  });

  if (lastIndex < text.length) {
    parts.push(<span key="end">{text.slice(lastIndex)}</span>);
  }

  return <span className="whitespace-pre-wrap">{parts}</span>;
}

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");

  const result = useMemo(
    () => testRegex(pattern, flags, testString),
    [pattern, flags, testString],
  );

  const toggleFlag = (flag: string) => {
    setFlags((prev) =>
      prev.includes(flag) ? prev.replace(flag, "") : prev + flag,
    );
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

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-image/10">
              <Code className="h-6 w-6 text-tool-image" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Regex Tester — Regular Expression Debugger
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Test and debug regular expressions with live match highlighting.
            </p>
          </div>

          <div className="mt-10 space-y-5">
            <div className="rounded-xl border border-surface-border bg-surface-card p-5 space-y-4">
              <div className="flex items-center gap-2 font-mono text-sm text-content-secondary">
                <span>/</span>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="pattern"
                  className="min-w-0 flex-1 rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 text-content-primary outline-none focus:border-tool-image"
                />
                <span>/</span>
                <input
                  type="text"
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  className="w-16 rounded-lg border border-surface-border bg-surface-elevated px-2 py-2 text-center text-content-primary outline-none focus:border-tool-image"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                {FLAG_OPTIONS.map((flag) => (
                  <label
                    key={flag}
                    className="flex cursor-pointer items-center gap-2 text-sm text-content-primary"
                  >
                    <input
                      type="checkbox"
                      checked={flags.includes(flag)}
                      onChange={() => toggleFlag(flag)}
                      className="accent-tool-image"
                    />
                    {flag}
                  </label>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {COMMON_PATTERNS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setPattern(p.pattern)}
                    className="cursor-pointer rounded-full border border-tool-image/30 bg-tool-image/10 px-3 py-1 text-xs font-medium text-tool-image transition-colors hover:bg-tool-image/20"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter test string..."
              className="min-h-40 w-full resize-y rounded-xl border border-surface-border bg-surface-card px-4 py-4 font-mono text-sm leading-relaxed text-content-primary outline-none focus:border-tool-image"
            />

            {!result.isValid && result.error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {result.error}
              </div>
            )}

            {result.isValid && testString && (
              <div className="rounded-xl border border-surface-border bg-surface-card p-4">
                <p className="mb-2 text-xs font-medium text-content-secondary">
                  Highlighted matches
                </p>
                <div className="min-h-16 font-mono text-sm leading-relaxed">
                  <HighlightedText
                    text={testString}
                    matches={result.matches}
                  />
                </div>
              </div>
            )}

            {result.isValid && result.matches.length > 0 && (
              <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                <p className="mb-3 text-sm font-medium text-content-primary">
                  Matches ({result.matches.length})
                </p>
                <div className="space-y-2">
                  {result.matches.map((m, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-surface-border bg-surface-elevated p-3 font-mono text-xs"
                    >
                      <p className="text-content-secondary">
                        Index: {m.index}
                      </p>
                      <p className="mt-1 text-tool-image">
                        Match: &quot;{m.match}&quot;
                      </p>
                      {m.groups.length > 0 && (
                        <p className="mt-1 text-content-primary">
                          Groups: [{m.groups.join(", ")}]
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-image/10">
                    <step.icon
                      className="h-5 w-5 text-tool-image"
                      strokeWidth={1.75}
                    />
                  </div>
                  <p className="text-xs font-semibold text-tool-image">
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

          <RelatedTools currentSlug="regex-tester" />
          <ToolFeedback toolName="Regex Tester" />
          <ToolSeoContent slug="regex-tester" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
