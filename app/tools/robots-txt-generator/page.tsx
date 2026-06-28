"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Download, FileCode, Plus, Trash2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { LastUpdatedBadge } from "@/components/LastUpdatedBadge";
import {
  CalculatorInput,
} from "@/components/calculator/CalculatorUi";
import {
  createEmptyRule,
  generateRobotsTxt,
  presetToRules,
  ROBOTS_PRESETS,
  ROBOTS_USER_AGENT_PRESETS,
  validateRobotsPath,
  type RobotsPresetId,
  type RobotsRule,
} from "@/lib/robots-txt-generator";

export default function RobotsTxtGeneratorPage() {
  const [rules, setRules] = useState<RobotsRule[]>([createEmptyRule("*")]);
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const robotsTxt = useMemo(
    () => generateRobotsTxt({ rules, sitemapUrl }),
    [rules, sitemapUrl],
  );

  const pathWarnings = useMemo(() => {
    const warnings: string[] = [];
    for (const rule of rules) {
      for (const path of [...rule.allow, ...rule.disallow]) {
        const warning = validateRobotsPath(path);
        if (warning) warnings.push(warning);
      }
    }
    return Array.from(new Set(warnings));
  }, [rules]);

  const applyPreset = (presetId: RobotsPresetId) => {
    const { rules: presetRules, sitemapUrl: presetSitemap } = presetToRules(presetId);
    setRules(presetRules);
    if (presetSitemap) setSitemapUrl(presetSitemap);
  };

  const updateRule = (id: string, patch: Partial<RobotsRule>) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const addRule = () => setRules((prev) => [...prev, createEmptyRule("*")]);

  const removeRule = (id: string) => {
    setRules((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  };

  const addPath = (id: string, type: "allow" | "disallow") => {
    setRules((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, [type]: [...r[type], ""] } : r,
      ),
    );
  };

  const updatePath = (
    id: string,
    type: "allow" | "disallow",
    index: number,
    value: string,
  ) => {
    setRules((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const paths = [...r[type]];
        paths[index] = value;
        return { ...r, [type]: paths };
      }),
    );
  };

  const removePath = (id: string, type: "allow" | "disallow", index: number) => {
    setRules((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        return { ...r, [type]: r[type].filter((_, i) => i !== index) };
      }),
    );
  };

  async function handleCopy() {
    await navigator.clipboard.writeText(robotsTxt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([robotsTxt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-content-secondary hover:text-content-primary">
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <FileCode className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              robots.txt Generator
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Build a valid robots.txt with user-agent rules, allow/disallow paths, and sitemap URL. Copy or download instantly.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="robots-txt-generator" />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {(Object.keys(ROBOTS_PRESETS) as RobotsPresetId[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => applyPreset(id)}
                className="rounded-lg border border-surface-border bg-surface-card px-3 py-1.5 text-xs font-medium text-content-primary transition-colors hover:border-brand-blue/40 sm:text-sm"
              >
                {ROBOTS_PRESETS[id].label}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="rounded-2xl border border-surface-border bg-surface-card p-5"
              >
                <div className="mb-4 flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <label className="mb-2 block text-sm font-medium text-content-primary">
                      User-agent
                    </label>
                    <select
                      value={rule.userAgent}
                      onChange={(e) => updateRule(rule.id, { userAgent: e.target.value })}
                      className="w-full rounded-xl border border-surface-border bg-surface-base px-3 py-2 text-sm"
                    >
                      {ROBOTS_USER_AGENT_PRESETS.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                      {!ROBOTS_USER_AGENT_PRESETS.some((p) => p.value === rule.userAgent) && (
                        <option value={rule.userAgent}>{rule.userAgent}</option>
                      )}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeRule(rule.id)}
                    className="mt-6 rounded-lg p-2 text-content-secondary hover:text-tool-pdf"
                    aria-label="Remove rule"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-content-primary">Disallow</span>
                      <button type="button" onClick={() => addPath(rule.id, "disallow")} className="text-xs text-brand-blue">
                        + Add
                      </button>
                    </div>
                    {rule.disallow.map((path, i) => (
                      <div key={`d-${i}`} className="mb-2 flex gap-2">
                        <CalculatorInput id={`disallow-${rule.id}-${i}`} value={path} onChange={(v) => updatePath(rule.id, "disallow", i, v)} placeholder="/admin/" />
                        <button type="button" onClick={() => removePath(rule.id, "disallow", i)} className="text-content-secondary">×</button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-content-primary">Allow</span>
                      <button type="button" onClick={() => addPath(rule.id, "allow")} className="text-xs text-brand-blue">
                        + Add
                      </button>
                    </div>
                    {rule.allow.map((path, i) => (
                      <div key={`a-${i}`} className="mb-2 flex gap-2">
                        <CalculatorInput id={`allow-${rule.id}-${i}`} value={path} onChange={(v) => updatePath(rule.id, "allow", i, v)} placeholder="/public/" />
                        <button type="button" onClick={() => removePath(rule.id, "allow", i)} className="text-content-secondary">×</button>
                      </div>
                    ))}
                  </div>

                  <label className="mb-2 block text-sm font-medium text-content-primary">
                    Crawl-delay (optional)
                  </label>
                  <CalculatorInput
                    id={`crawl-delay-${rule.id}`}
                    value={rule.crawlDelay?.toString() ?? ""}
                      onChange={(v) =>
                        updateRule(rule.id, {
                          crawlDelay: v ? parseInt(v, 10) || undefined : undefined,
                        })
                      }
                    placeholder="10"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addRule}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-surface-border py-3 text-sm text-content-secondary hover:border-brand-blue/40 hover:text-brand-blue"
            >
              <Plus className="h-4 w-4" /> Add User-agent Rule
            </button>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-content-primary">
              Sitemap URL (optional)
            </label>
            <CalculatorInput
              id="sitemap-url"
              value={sitemapUrl}
                onChange={setSitemapUrl}
                placeholder="https://example.com/sitemap.xml"
            />
          </div>

          {pathWarnings.length > 0 && (
            <div className="mt-4 rounded-xl border border-tool-photo/30 bg-tool-photo/10 p-3 text-sm text-content-primary">
              {pathWarnings.map((w) => (
                <p key={w}>⚠️ {w}</p>
              ))}
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-surface-border bg-surface-card p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-content-primary">Live Preview</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 rounded-lg border border-surface-border px-3 py-1.5 text-sm hover:border-brand-blue/40"
                >
                  <Copy className="h-4 w-4" /> {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1 rounded-lg border border-brand-blue/40 bg-brand-blue/10 px-3 py-1.5 text-sm text-brand-blue"
                >
                  <Download className="h-4 w-4" /> Download
                </button>
              </div>
            </div>
            <pre className="overflow-x-auto rounded-xl bg-surface-base p-4 font-mono text-sm text-content-primary">
              {robotsTxt || "# Add rules above to generate robots.txt"}
            </pre>
          </div>

          <div className="mt-10">
            <RelatedTools currentSlug="robots-txt-generator" />
            <ToolSeoContent slug="robots-txt-generator" />
            <ToolFeedback toolName="robots.txt Generator" />
            <DinoGame />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
