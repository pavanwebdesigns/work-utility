"use client";

import { useMemo, useState } from "react";
import { Copy, Download, HelpCircle } from "lucide-react";
import {
  CalculatorInput,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import {
  DEFAULT_HTACCESS,
  HTACCESS_RULE_INFO,
  generateHtaccess,
  type HtaccessConfig,
  type WwwMode,
} from "@/lib/htaccess-generator";

function RuleHelp({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex">
      <HelpCircle className="h-4 w-4 text-content-muted" aria-hidden />
      <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden w-64 -translate-x-1/2 rounded-lg border border-surface-border bg-surface-elevated p-2 text-xs text-content-secondary shadow-lg group-hover:block">
        {text}
      </span>
    </span>
  );
}

export default function HtaccessGeneratorPage() {
  const [config, setConfig] = useState<HtaccessConfig>(DEFAULT_HTACCESS);
  const [copied, setCopied] = useState(false);

  const htaccess = useMemo(() => generateHtaccess(config), [config]);

  const updateConfig = <K extends keyof HtaccessConfig>(
    key: K,
    value: HtaccessConfig[K],
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  async function handleCopy() {
    await navigator.clipboard.writeText(htaccess);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([htaccess], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ".htaccess";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
<div className="mt-10 space-y-4">
            <div className="rounded-2xl border border-surface-border bg-surface-card p-5">
              <label className="flex items-center gap-2 text-sm font-medium text-content-primary">
                <input
                  type="checkbox"
                  checked={config.httpsRedirect}
                  onChange={(e) => updateConfig("httpsRedirect", e.target.checked)}
                  className="accent-brand-blue"
                />
                {HTACCESS_RULE_INFO.httpsRedirect.title}
                <RuleHelp text={HTACCESS_RULE_INFO.httpsRedirect.help} />
              </label>
            </div>

            <div className="rounded-2xl border border-surface-border bg-surface-card p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-content-primary">
                {HTACCESS_RULE_INFO.wwwMode.title}
                <RuleHelp text={HTACCESS_RULE_INFO.wwwMode.help} />
              </div>
              <ToggleButtonGroup
                value={config.wwwMode}
                onChange={(v: WwwMode) => updateConfig("wwwMode", v)}
                ariaLabel="WWW redirect mode"
                options={[
                  { value: "none" as const, label: "No change" },
                  { value: "force-www" as const, label: "Force www" },
                  { value: "remove-www" as const, label: "Remove www" },
                ]}
              />
            </div>

            <div className="rounded-2xl border border-surface-border bg-surface-card p-5 space-y-3">
              <p className="text-sm font-medium text-content-primary">
                Custom Error Pages
              </p>
              <div>
                <label className="mb-1 flex items-center gap-2 text-xs text-content-secondary">
                  404 Not Found
                  <RuleHelp text={HTACCESS_RULE_INFO.error404.help} />
                </label>
                <CalculatorInput
                  id="error-404"
                  value={config.error404}
                  onChange={(v) => updateConfig("error404", v)}
                  placeholder="/404.html"
                />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-2 text-xs text-content-secondary">
                  403 Forbidden
                  <RuleHelp text={HTACCESS_RULE_INFO.error403.help} />
                </label>
                <CalculatorInput
                  id="error-403"
                  value={config.error403}
                  onChange={(v) => updateConfig("error403", v)}
                  placeholder="/403.html"
                />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-2 text-xs text-content-secondary">
                  500 Internal Server Error
                  <RuleHelp text={HTACCESS_RULE_INFO.error500.help} />
                </label>
                <CalculatorInput
                  id="error-500"
                  value={config.error500}
                  onChange={(v) => updateConfig("error500", v)}
                  placeholder="/500.html"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-surface-border bg-surface-card p-5">
              <label className="flex items-center gap-2 text-sm font-medium text-content-primary">
                <input
                  type="checkbox"
                  checked={config.browserCaching}
                  onChange={(e) => updateConfig("browserCaching", e.target.checked)}
                  className="accent-brand-blue"
                />
                {HTACCESS_RULE_INFO.browserCaching.title}
                <RuleHelp text={HTACCESS_RULE_INFO.browserCaching.help} />
              </label>
            </div>

            <div className="rounded-2xl border border-surface-border bg-surface-card p-5">
              <label className="flex items-center gap-2 text-sm font-medium text-content-primary">
                <input
                  type="checkbox"
                  checked={config.gzip}
                  onChange={(e) => updateConfig("gzip", e.target.checked)}
                  className="accent-brand-blue"
                />
                {HTACCESS_RULE_INFO.gzip.title}
                <RuleHelp text={HTACCESS_RULE_INFO.gzip.help} />
              </label>
            </div>

            <div className="rounded-2xl border border-surface-border bg-surface-card p-5">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-content-primary">
                Block IP Addresses
                <RuleHelp text={HTACCESS_RULE_INFO.blockIps.help} />
              </label>
              <textarea
                value={config.blockIps}
                onChange={(e) => updateConfig("blockIps", e.target.value)}
                rows={3}
                placeholder="192.168.1.1&#10;10.0.0.1"
                className="w-full rounded-xl border border-surface-border bg-surface-base px-3 py-2 font-mono text-sm"
              />
            </div>

            <div className="rounded-2xl border border-surface-border bg-surface-card p-5">
              <label className="flex items-center gap-2 text-sm font-medium text-content-primary">
                <input
                  type="checkbox"
                  checked={config.disableDirectoryListing}
                  onChange={(e) =>
                    updateConfig("disableDirectoryListing", e.target.checked)
                  }
                  className="accent-brand-blue"
                />
                {HTACCESS_RULE_INFO.disableDirectoryListing.title}
                <RuleHelp text={HTACCESS_RULE_INFO.disableDirectoryListing.help} />
              </label>
            </div>

            <div className="rounded-2xl border border-surface-border bg-surface-card p-5">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-content-primary">
                Protect Sensitive Files
                <RuleHelp text={HTACCESS_RULE_INFO.protectFiles.help} />
              </label>
              <textarea
                value={config.protectFiles}
                onChange={(e) => updateConfig("protectFiles", e.target.value)}
                rows={3}
                placeholder=".env&#10;config.php"
                className="w-full rounded-xl border border-surface-border bg-surface-base px-3 py-2 font-mono text-sm"
              />
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-surface-border bg-surface-card p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-content-primary">
                Live Preview
              </h2>
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
              {htaccess || "# Enable rules above to generate .htaccess"}
            </pre>
          </div>

          <p className="mt-4 text-center text-xs text-content-muted">
            .htaccess only works on Apache servers — Nginx uses server-block
            configuration instead.
          </p>

          <div className="mt-10">
            
            
            
            
          </div>
    </>
  );
}

