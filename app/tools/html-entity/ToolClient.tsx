"use client";

import { useMemo, useState } from "react";
import { Copy, FileCode, Link2 } from "lucide-react";
import {
  COMMON_ENTITIES,
  decodeHTML,
  encodeHTML,
} from "@/lib/html-entity";

const howItWorksSteps = [
  {
    step: "01",
    icon: FileCode,
    title: "Paste",
    description: "Paste your text or HTML entities",
  },
  {
    step: "02",
    icon: Link2,
    title: "Convert",
    description: "Choose encode or decode mode",
  },
  {
    step: "03",
    icon: Copy,
    title: "Copy",
    description: "Copy the converted output",
  },
];

export default function HtmlEntityPage() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input) return "";
    return mode === "encode" ? encodeHTML(input) : decodeHTML(input);
  }, [input, mode]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
<div className="mt-8 flex justify-center gap-2">
            {(["encode", "decode"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`cursor-pointer rounded-xl px-5 py-2 text-sm font-medium capitalize transition-colors ${
                  mode === m
                    ? "bg-tool-img2pdf text-white"
                    : "border border-surface-border bg-surface-card text-content-primary hover:border-tool-img2pdf/40"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-content-primary">
                Input
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === "encode"
                    ? "Type text with <tags> & special chars..."
                    : "Paste HTML entities like &lt;div&gt;..."
                }
                className="min-h-48 w-full resize-y rounded-xl border border-surface-border bg-surface-card px-4 py-4 font-mono text-sm text-content-primary outline-none focus:border-tool-img2pdf"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-content-primary">
                Output
              </label>
              <textarea
                readOnly
                value={output}
                placeholder="Converted output appears here..."
                className="min-h-48 w-full resize-y rounded-xl border border-surface-border bg-surface-elevated px-4 py-4 font-mono text-sm text-content-primary outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!output}
            className="mt-4 flex cursor-pointer items-center gap-2 rounded-xl bg-tool-img2pdf px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-tool-img2pdf/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy Output"}
          </button>

          <div className="mt-10 rounded-xl border border-surface-border bg-surface-card p-5">
            <p className="mb-3 text-sm font-medium text-content-primary">
              Common HTML Entities
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-border text-left text-content-secondary">
                    <th className="pb-2 pr-4">Character</th>
                    <th className="pb-2">Entity</th>
                  </tr>
                </thead>
                <tbody>
                  {COMMON_ENTITIES.map((row) => (
                    <tr
                      key={row.entity}
                      className="border-b border-surface-border/50"
                    >
                      <td className="py-2 pr-4 font-mono text-content-primary">
                        {row.char}
                      </td>
                      <td className="py-2 font-mono text-tool-img2pdf">
                        {row.entity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-img2pdf/10">
                    <step.icon
                      className="h-5 w-5 text-tool-img2pdf"
                      strokeWidth={1.75}
                    />
                  </div>
                  <p className="text-xs font-semibold text-tool-img2pdf">
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

