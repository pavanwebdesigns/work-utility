"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Check, Copy, Database, Eraser, Minimize2, Wand2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { formatSQL, minifySQL } from "@/lib/sql-formatter";

type Mode = "format" | "minify";

export default function SqlFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("format");
  const [copied, setCopied] = useState(false);

  const processInput = useCallback((value: string, activeMode: Mode) => {
    if (!value.trim()) { setOutput(""); return; }
    setOutput(activeMode === "format" ? formatSQL(value) : minifySQL(value));
  }, []);

  useEffect(() => { processInput(input, mode); }, [input, mode, processInput]);

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10"><Link href="/" className="text-sm text-content-secondary hover:text-content-primary">← All Tools</Link></div>
        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <Database className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">SQL Formatter Online Free</h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">Beautify SQL with keyword capitalization, indentation, and line breaks. Minify mode included.</p>
            <div className="mt-4 flex justify-center"><FavoriteButton slug="sql-formatter" /></div>
          </div>

          <div className="mt-8 flex gap-2">
            {(["format", "minify"] as Mode[]).map((m) => (
              <button key={m} type="button" onClick={() => setMode(m)}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium capitalize ${mode === m ? "border-brand-blue bg-brand-blue/10 text-brand-blue" : "border-surface-border text-content-secondary"}`}>
                {m === "format" ? <Wand2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}{m}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="sql-input" className="text-sm font-medium text-content-primary">Input SQL</label>
                <button type="button" onClick={() => setInput("")} className="text-xs text-content-muted hover:text-content-primary"><Eraser className="inline h-3.5 w-3.5" /> Clear</button>
              </div>
              <textarea id="sql-input" value={input} onChange={(e) => setInput(e.target.value)} rows={16} spellCheck={false}
                placeholder="SELECT id, name FROM users WHERE active = 1 ORDER BY created_at DESC;"
                className="w-full rounded-xl border border-surface-border bg-surface-card p-4 font-mono text-sm text-content-primary outline-none focus:border-brand-blue" />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-content-primary">Output</span>
                <button type="button" onClick={handleCopy} disabled={!output} className="flex items-center gap-1 text-xs text-brand-blue disabled:opacity-50">
                  {copied ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
                </button>
              </div>
              <textarea readOnly value={output} rows={16}
                className="w-full rounded-xl border border-surface-border bg-surface-base p-4 font-mono text-sm text-content-secondary outline-none" />
            </div>
          </div>

          <RelatedTools currentSlug="sql-formatter" />
          <ToolFeedback toolName="SQL Formatter" />
          <ToolSeoContent slug="sql-formatter" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
