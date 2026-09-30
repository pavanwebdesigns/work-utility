"use client";

import { useMemo, useState } from "react";
import { Copy, Download, Sparkles } from "lucide-react";
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
    <>
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
    </>
  );
}

