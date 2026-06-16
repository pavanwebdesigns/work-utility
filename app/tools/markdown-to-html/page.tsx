"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Code, Copy, Eraser, Eye, FileCode } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  convertMarkdownToHtml,
  getMarkdownStats,
} from "@/lib/markdown-to-html";

const DEFAULT_MARKDOWN = `# Welcome to Markdown to HTML

Convert your **Markdown** text to HTML instantly.

## Features

- Real-time preview
- Copy HTML with one click
- Supports all standard Markdown syntax

## Example Code

\`\`\`javascript
console.log("Hello, World!");
\`\`\`

> This is a blockquote example.

[Visit WorkUtilities](https://workutilities.com)`;

type ViewMode = "preview" | "html";

const howItWorksSteps = [
  {
    step: "01",
    icon: Code,
    title: "Write",
    description: "Type or paste your Markdown",
  },
  {
    step: "02",
    icon: Eye,
    title: "Preview",
    description: "See the rendered HTML instantly",
  },
  {
    step: "03",
    icon: Copy,
    title: "Copy",
    description: "Copy the HTML output",
  },
];

export default function MarkdownToHtmlPage() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const [copied, setCopied] = useState(false);

  const html = useMemo(() => convertMarkdownToHtml(markdown), [markdown]);
  const stats = useMemo(() => getMarkdownStats(markdown), [markdown]);

  useEffect(() => {
    setCopied(false);
  }, [html]);

  const handleCopyHtml = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleCopyPreviewText = async () => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    try {
      await navigator.clipboard.writeText(temp.textContent ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleClear = () => {
    setMarkdown("");
    setCopied(false);
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

        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-image/10">
              <Code className="h-6 w-6 text-tool-image" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Markdown to HTML
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Convert Markdown to HTML with live preview. Copy clean HTML output
              instantly.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="markdown-to-html" />
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyHtml}
                className="flex items-center gap-1.5 rounded-lg bg-[#8B5CF6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#7C3AED]"
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copied!" : "Copy HTML"}
              </button>
              <button
                type="button"
                onClick={handleCopyPreviewText}
                className="flex items-center gap-1.5 rounded-lg bg-surface-elevated px-4 py-2 text-sm font-medium text-content-secondary transition-colors hover:text-content-primary"
              >
                <FileCode className="h-3.5 w-3.5" />
                Copy Preview Text
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1.5 rounded-lg bg-surface-elevated px-4 py-2 text-sm font-medium text-content-secondary transition-colors hover:text-content-primary"
              >
                <Eraser className="h-3.5 w-3.5" />
                Clear
              </button>
              <span className="ml-auto text-xs text-content-muted">
                {stats.words} words · {stats.lines} lines
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-content-secondary">
                  Markdown
                </label>
                <textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className="min-h-[400px] w-full resize-y rounded-xl border border-surface-border bg-surface-card p-4 font-mono text-sm text-content-primary outline-none transition-colors focus:border-tool-image"
                  placeholder="# Hello World&#10;&#10;Type your **markdown** here..."
                />
              </div>

              <div>
                <div className="mb-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setViewMode("preview")}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      viewMode === "preview"
                        ? "bg-tool-image/10 text-tool-image"
                        : "text-content-secondary hover:text-content-primary"
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("html")}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      viewMode === "html"
                        ? "bg-tool-image/10 text-tool-image"
                        : "text-content-secondary hover:text-content-primary"
                    }`}
                  >
                    HTML
                  </button>
                </div>

                {viewMode === "preview" ? (
                  <div
                    className="markdown-preview min-h-[400px] rounded-xl border border-surface-border bg-surface-card p-4 text-sm leading-relaxed text-content-secondary [&_a]:text-brand-blue [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-surface-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:rounded [&_code]:bg-surface-elevated [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-content-primary [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-content-primary [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-content-primary [&_li]:ml-4 [&_ol]:list-decimal [&_p]:mb-3 [&_pre]:mb-3 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-surface-elevated [&_pre]:p-3 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_ul]:list-disc"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                ) : (
                  <textarea
                    value={html}
                    readOnly
                    className="min-h-[400px] w-full resize-y rounded-xl border border-surface-border bg-surface-elevated p-4 font-mono text-sm text-content-primary outline-none"
                  />
                )}
              </div>
            </div>
          </div>

          <RelatedTools currentSlug="markdown-to-html" />

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
                    <step.icon className="h-5 w-5 text-tool-image" />
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

          <ToolFeedback toolName="Markdown to HTML" />
          <ToolSeoContent slug="markdown-to-html" />
          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
