"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BarChart3, FileText, SearchCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { analyzeKeywordDensity } from "@/lib/keyword-density";

const howItWorksSteps = [
  { step: "01", icon: FileText, title: "Paste Content", description: "Paste your article or content text" },
  { step: "02", icon: SearchCheck, title: "Analyze", description: "See keyword frequency and density" },
  { step: "03", icon: BarChart3, title: "See Top Keywords", description: "Review top 20 keywords with density bars" },
];

export default function KeywordDensityPage() {
  const [text, setText] = useState("");
  const [excludeStopWords, setExcludeStopWords] = useState(true);
  const [minLength, setMinLength] = useState(3);

  const result = useMemo(
    () => analyzeKeywordDensity(text, excludeStopWords, minLength),
    [text, excludeStopWords, minLength],
  );

  const maxDensity = result.topKeywords[0]?.density ?? 1;

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10"><Link href="/" className="text-sm text-content-secondary hover:text-content-primary">← All Tools</Link></div>
        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-image/10"><SearchCheck className="h-6 w-6 text-tool-image" /></div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">Keyword Density Checker</h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">Analyze keyword frequency and density in your content for SEO.</p>
            <div className="mt-4 flex justify-center"><FavoriteButton slug="keyword-density" /></div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-content-primary">
              <input type="checkbox" checked={excludeStopWords} onChange={(e) => setExcludeStopWords(e.target.checked)} className="accent-tool-image" />
              Exclude common words
            </label>
            <label className="flex items-center gap-2 text-sm text-content-primary">
              Min length:
              <select value={minLength} onChange={(e) => setMinLength(Number(e.target.value))} className="rounded-lg border border-surface-border bg-surface-card px-2 py-1 text-sm">
                {[2, 3, 4, 5].map((n) => (<option key={n} value={n}>{n}</option>))}
              </select>
            </label>
          </div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your content here..." className="mt-6 min-h-48 w-full rounded-xl border border-surface-border bg-surface-card px-4 py-4 text-sm text-content-primary outline-none focus:border-tool-image" />
          {text && (
            <>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-surface-border bg-surface-card p-4 text-center"><p className="text-sm text-content-secondary">Total Words</p><p className="text-2xl font-bold text-content-primary">{result.totalWords}</p></div>
                <div className="rounded-xl border border-surface-border bg-surface-card p-4 text-center"><p className="text-sm text-content-secondary">Unique Words</p><p className="text-2xl font-bold text-tool-image">{result.uniqueWords}</p></div>
              </div>
              {result.topKeywords.length > 0 && (
                <div className="mt-6 rounded-xl border border-surface-border bg-surface-card p-5">
                  <p className="mb-4 text-sm font-medium text-content-primary">Top Keywords</p>
                  <div className="space-y-3">
                    {result.topKeywords.map((kw) => (
                      <div key={kw.word} className="flex items-center gap-3 text-sm">
                        <span className="w-24 shrink-0 font-medium text-content-primary">{kw.word}</span>
                        <span className="w-10 text-content-secondary">{kw.count}</span>
                        <div className="min-w-0 flex-1"><div className="h-2 overflow-hidden rounded-full bg-surface-elevated"><div className="h-full rounded-full bg-tool-image" style={{ width: `${(kw.density / maxDensity) * 100}%` }} /></div></div>
                        <span className="w-14 text-right text-tool-image">{kw.density.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{howItWorksSteps.map((s) => (<div key={s.title} className="rounded-xl border border-surface-border bg-surface-card p-5"><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-image/10"><s.icon className="h-5 w-5 text-tool-image" /></div><p className="text-xs font-semibold text-tool-image">{s.step}</p><p className="mt-1 font-semibold">{s.title}</p><p className="mt-1 text-sm text-content-secondary">{s.description}</p></div>))}</div>
          </div>
          <RelatedTools currentSlug="keyword-density" /><ToolFeedback toolName="Keyword Density Checker" /><ToolSeoContent slug="keyword-density" /><DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
