"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Download, FileCode, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  DEFAULT_SVG_SAMPLE,
  downloadSvg,
  prettifySvg,
  sanitizeSvg,
  type SvgBackground,
} from "@/lib/svg-previewer";

const BACKGROUNDS: { id: SvgBackground; label: string }[] = [
  { id: "checker", label: "Checker" },
  { id: "white", label: "White" },
  { id: "dark", label: "Dark" },
];

function getPreviewBackgroundClass(bg: SvgBackground): string {
  if (bg === "white") return "bg-white";
  if (bg === "dark") return "bg-zinc-900";
  return "bg-[length:16px_16px] bg-[position:0_0,8px_8px] bg-[image:linear-gradient(45deg,#e5e7eb_25%,transparent_25%,transparent_75%,#e5e7eb_75%,#e5e7eb),linear-gradient(45deg,#e5e7eb_25%,transparent_25%,transparent_75%,#e5e7eb_75%,#e5e7eb)]";
}

export default function SvgPreviewerPage() {
  const [code, setCode] = useState(DEFAULT_SVG_SAMPLE);
  const [background, setBackground] = useState<SvgBackground>("checker");
  const [copied, setCopied] = useState(false);

  const sanitized = useMemo(() => sanitizeSvg(code), [code]);
  const hasValidSvg = sanitized.length > 0;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handlePrettify = () => {
    setCode(prettifySvg(code));
  };

  const handleDownload = () => {
    if (!sanitized) return;
    downloadSvg(sanitized);
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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <FileCode className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              SVG Code Previewer Online Free — Live Preview & Editor
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Edit SVG markup on the left and see a sanitized live preview on the
              right. Prettify, copy, or download your code.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="svg-previewer" />
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-blue/90"
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!hasValidSvg}
                className="flex items-center gap-1.5 rounded-lg border border-surface-border bg-surface-card px-4 py-2 text-sm font-medium text-content-primary transition-colors hover:border-brand-blue disabled:opacity-50"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </button>
              <button
                type="button"
                onClick={handlePrettify}
                className="flex items-center gap-1.5 rounded-lg border border-surface-border bg-surface-card px-4 py-2 text-sm font-medium text-content-primary transition-colors hover:border-brand-blue"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Prettify
              </button>
              <div className="ml-auto flex gap-1 rounded-lg border border-surface-border bg-surface-card p-1">
                {BACKGROUNDS.map((bg) => (
                  <button
                    key={bg.id}
                    type="button"
                    onClick={() => setBackground(bg.id)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      background === bg.id
                        ? "bg-brand-blue text-white"
                        : "text-content-secondary hover:text-content-primary"
                    }`}
                  >
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-content-secondary">
                  SVG code
                </label>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  className="min-h-[420px] w-full resize-y rounded-xl border border-surface-border bg-surface-card p-4 font-mono text-sm text-content-primary outline-none transition-colors focus:border-brand-blue"
                  placeholder="<svg>...</svg>"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-content-secondary">
                  Preview
                </label>
                <div
                  className={`flex min-h-[420px] items-center justify-center overflow-auto rounded-xl border border-surface-border p-6 ${getPreviewBackgroundClass(background)}`}
                >
                  {hasValidSvg ? (
                    <div
                      className="max-h-full max-w-full [&_svg]:max-h-[360px] [&_svg]:max-w-full"
                      dangerouslySetInnerHTML={{ __html: sanitized }}
                    />
                  ) : (
                    <p className="text-sm text-content-muted">
                      Enter valid SVG markup to see a preview.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <RelatedTools currentSlug="svg-previewer" />
          <ToolFeedback toolName="SVG Code Previewer" />
          <ToolSeoContent slug="svg-previewer" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
