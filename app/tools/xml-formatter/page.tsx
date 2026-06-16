"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Copy, FileCode } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { formatXML, minifyXML, validateXML } from "@/lib/xml-formatter";

const howItWorksSteps = [
  { step: "01", icon: FileCode, title: "Paste XML", description: "Paste your XML data" },
  { step: "02", icon: CheckCircle2, title: "Format/Validate", description: "Beautify, minify, or validate" },
  { step: "03", icon: Copy, title: "Copy", description: "Copy the formatted output" },
];

export default function XmlFormatterPage() {
  const [mode, setMode] = useState<"format" | "minify" | "validate">("format");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const { output, error, isValid } = useMemo(() => {
    if (!input.trim()) {
      return { output: "", error: null as string | null, isValid: false };
    }
    try {
      if (mode === "format") {
        return { output: formatXML(input), error: null, isValid: false };
      }
      if (mode === "minify") {
        return { output: minifyXML(input), error: null, isValid: false };
      }
      const validation = validateXML(input);
      if (!validation.valid) {
        return { output: "", error: validation.error ?? "Invalid XML", isValid: false };
      }
      return { output: "✓ Valid XML", error: null, isValid: true };
    } catch (e) {
      return { output: "", error: (e as Error).message, isValid: false };
    }
  }, [input, mode]);

  const handleCopy = async () => {
    if (!output || mode === "validate") return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isValidDisplay = mode === "validate" && input.trim() && isValid;

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10"><Link href="/" className="text-sm text-content-secondary hover:text-content-primary">← All Tools</Link></div>
        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10"><FileCode className="h-6 w-6 text-brand-blue" /></div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">XML Formatter & Validator</h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">Format, beautify, minify, and validate XML data instantly.</p>
            <div className="mt-4 flex justify-center"><FavoriteButton slug="xml-formatter" /></div>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {(["format", "minify", "validate"] as const).map((m) => (
              <button key={m} type="button" onClick={() => setMode(m)} className={`rounded-xl px-4 py-2 text-sm font-medium capitalize ${mode === m ? "bg-brand-blue text-white" : "border border-surface-border bg-surface-card text-content-primary"}`}>{m}</button>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="<root>...</root>" className="min-h-56 rounded-xl border border-surface-border bg-surface-card px-4 py-4 font-mono text-xs outline-none focus:border-brand-blue sm:text-sm" />
            <textarea readOnly value={output} placeholder="Output..." className="min-h-56 rounded-xl border border-surface-border bg-surface-elevated px-4 py-4 font-mono text-xs sm:text-sm" />
          </div>
          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}</div>
          )}
          {isValidDisplay && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400"><CheckCircle2 className="h-4 w-4" />Valid XML</div>
          )}
          {mode !== "validate" && (
            <button type="button" onClick={handleCopy} disabled={!output} className="mt-4 flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"><Copy className="h-4 w-4" />{copied ? "Copied!" : "Copy Output"}</button>
          )}
          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{howItWorksSteps.map((s) => (<div key={s.title} className="rounded-xl border border-surface-border bg-surface-card p-5"><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10"><s.icon className="h-5 w-5 text-brand-blue" /></div><p className="text-xs font-semibold text-brand-blue">{s.step}</p><p className="mt-1 font-semibold">{s.title}</p><p className="mt-1 text-sm text-content-secondary">{s.description}</p></div>))}</div>
          </div>
          <RelatedTools currentSlug="xml-formatter" /><ToolFeedback toolName="XML Formatter" /><ToolSeoContent slug="xml-formatter" /><DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
