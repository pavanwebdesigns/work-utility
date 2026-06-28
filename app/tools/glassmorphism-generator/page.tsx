"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Palette } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { LastUpdatedBadge } from "@/components/LastUpdatedBadge";
import {
  CalculatorField,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import {
  DEFAULT_GLASS,
  GLASS_PRESETS,
  generateGlassCss,
  generateGlassTailwind,
  generateGlassVariables,
  glassInlineStyle,
  type GlassBackground,
  type GlassPresetId,
  type GlassSettings,
} from "@/lib/glassmorphism-generator";

type OutputTab = "css" | "tailwind" | "variables";

const BACKGROUND_STYLES: Record<GlassBackground, string> = {
  gradient:
    "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)",
  photo:
    "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80') center/cover",
  dark: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
};

export default function GlassmorphismGeneratorPage() {
  const [settings, setSettings] = useState<GlassSettings>(DEFAULT_GLASS);
  const [background, setBackground] = useState<GlassBackground>("gradient");
  const [outputTab, setOutputTab] = useState<OutputTab>("css");
  const [copied, setCopied] = useState(false);

  const cssOutput = useMemo(() => generateGlassCss(settings), [settings]);
  const tailwindOutput = useMemo(
    () => generateGlassTailwind(settings),
    [settings],
  );
  const variablesOutput = useMemo(
    () => generateGlassVariables(settings),
    [settings],
  );

  const activeOutput =
    outputTab === "css"
      ? cssOutput
      : outputTab === "tailwind"
        ? tailwindOutput
        : variablesOutput;

  const applyPreset = (id: GlassPresetId) => {
    setSettings(GLASS_PRESETS[id].settings);
  };

  const updateSetting = <K extends keyof GlassSettings>(
    key: K,
    value: GlassSettings[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  async function handleCopy() {
    await navigator.clipboard.writeText(activeOutput);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-content-secondary hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-image/10">
              <Palette className="h-6 w-6 text-tool-image" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Glassmorphism CSS Generator
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Generate frosted glass CSS with live preview. Copy pure CSS,
              Tailwind classes, or CSS variables — Firefox fallback included.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="glassmorphism-generator" />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {(Object.keys(GLASS_PRESETS) as GlassPresetId[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => applyPreset(id)}
                className="rounded-lg border border-surface-border bg-surface-card px-3 py-1.5 text-xs font-medium text-content-primary transition-colors hover:border-brand-blue/40 sm:text-sm"
              >
                {GLASS_PRESETS[id].label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <CalculatorField label={`Blur — ${settings.blur}px`} htmlFor="blur">
                <input
                  id="blur"
                  type="range"
                  min={0}
                  max={40}
                  value={settings.blur}
                  onChange={(e) => updateSetting("blur", Number(e.target.value))}
                  className="w-full accent-brand-blue"
                />
              </CalculatorField>

              <CalculatorField
                label={`Transparency — ${settings.transparency}%`}
                htmlFor="transparency"
              >
                <input
                  id="transparency"
                  type="range"
                  min={0}
                  max={100}
                  value={settings.transparency}
                  onChange={(e) =>
                    updateSetting("transparency", Number(e.target.value))
                  }
                  className="w-full accent-brand-blue"
                />
              </CalculatorField>

              <CalculatorField
                label={`Saturation — ${settings.saturation}%`}
                htmlFor="saturation"
              >
                <input
                  id="saturation"
                  type="range"
                  min={100}
                  max={200}
                  value={settings.saturation}
                  onChange={(e) =>
                    updateSetting("saturation", Number(e.target.value))
                  }
                  className="w-full accent-brand-blue"
                />
              </CalculatorField>

              <CalculatorField label="Background Color Tint" htmlFor="color">
                <input
                  id="color"
                  type="color"
                  value={`#${settings.colorR.toString(16).padStart(2, "0")}${settings.colorG.toString(16).padStart(2, "0")}${settings.colorB.toString(16).padStart(2, "0")}`}
                  onChange={(e) => {
                    const hex = e.target.value.replace("#", "");
                    updateSetting("colorR", parseInt(hex.slice(0, 2), 16));
                    updateSetting("colorG", parseInt(hex.slice(2, 4), 16));
                    updateSetting("colorB", parseInt(hex.slice(4, 6), 16));
                  }}
                  className="h-10 w-full cursor-pointer rounded-lg border border-surface-border"
                />
              </CalculatorField>

              <CalculatorField
                label={`Border Radius — ${settings.borderRadius}px`}
                htmlFor="radius"
              >
                <input
                  id="radius"
                  type="range"
                  min={0}
                  max={32}
                  value={settings.borderRadius}
                  onChange={(e) =>
                    updateSetting("borderRadius", Number(e.target.value))
                  }
                  className="w-full accent-brand-blue"
                />
              </CalculatorField>

              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-content-primary">
                  <input
                    type="checkbox"
                    checked={settings.borderEnabled}
                    onChange={(e) => updateSetting("borderEnabled", e.target.checked)}
                    className="accent-brand-blue"
                  />
                  Border
                </label>
                {settings.borderEnabled && (
                  <input
                    type="range"
                    min={20}
                    max={80}
                    value={settings.borderOpacity}
                    onChange={(e) =>
                      updateSetting("borderOpacity", Number(e.target.value))
                    }
                    className="min-w-[120px] flex-1 accent-brand-blue"
                    aria-label="Border opacity"
                  />
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-content-primary">
                  <input
                    type="checkbox"
                    checked={settings.shadowEnabled}
                    onChange={(e) => updateSetting("shadowEnabled", e.target.checked)}
                    className="accent-brand-blue"
                  />
                  Shadow
                </label>
                {settings.shadowEnabled && (
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={settings.shadowIntensity}
                    onChange={(e) =>
                      updateSetting("shadowIntensity", Number(e.target.value))
                    }
                    className="min-w-[120px] flex-1 accent-brand-blue"
                    aria-label="Shadow intensity"
                  />
                )}
              </div>
            </div>

            <div>
              <CalculatorField label="Preview Background" htmlFor="bg">
                <ToggleButtonGroup
                  value={background}
                  onChange={setBackground}
                  ariaLabel="Preview background"
                  options={[
                    { value: "gradient" as const, label: "Gradient" },
                    { value: "photo" as const, label: "Photo" },
                    { value: "dark" as const, label: "Dark" },
                  ]}
                />
              </CalculatorField>

              <div
                className="mt-4 flex min-h-[240px] items-center justify-center rounded-2xl p-8"
                style={{ background: BACKGROUND_STYLES[background] }}
              >
                <div
                  className="flex h-[200px] w-[320px] max-w-full items-center justify-center p-6 text-center text-sm font-medium text-white drop-shadow-sm"
                  style={glassInlineStyle(settings)}
                >
                  Glassmorphism Preview
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-surface-border bg-surface-card p-5">
            <div className="mb-4 flex flex-wrap gap-2">
              {(
                [
                  { id: "css" as const, label: "Pure CSS" },
                  { id: "tailwind" as const, label: "Tailwind CSS" },
                  { id: "variables" as const, label: "CSS Variables" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setOutputTab(tab.id)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    outputTab === tab.id
                      ? "bg-brand-blue/10 text-brand-blue"
                      : "text-content-secondary hover:text-content-primary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-content-primary">Output</h2>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded-lg border border-surface-border px-3 py-1.5 text-sm hover:border-brand-blue/40"
              >
                <Copy className="h-4 w-4" /> {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="max-h-80 overflow-auto rounded-xl bg-surface-base p-4 font-mono text-xs text-content-primary sm:text-sm">
              {activeOutput}
            </pre>
          </div>

          <div className="mt-10">
            <RelatedTools currentSlug="glassmorphism-generator" />
            <ToolSeoContent slug="glassmorphism-generator" />
            <ToolFeedback toolName="Glassmorphism CSS Generator" />
            <DinoGame />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
