"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Layers, Plus, Trash2 } from "lucide-react";
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
  BOX_SHADOW_PRESETS,
  DEFAULT_SHADOW_LAYERS,
  PREVIEW_BACKGROUNDS,
  boxShadowInlineStyle,
  createShadowLayer,
  generateBoxShadowCss,
  generateBoxShadowTailwind,
  presetToLayers,
  previewShapeClass,
  type BoxShadowPresetId,
  type PreviewBackground,
  type PreviewShape,
  type ShadowLayer,
} from "@/lib/box-shadow-generator";

type OutputTab = "css" | "tailwind";

export default function BoxShadowGeneratorPage() {
  const [layers, setLayers] = useState<ShadowLayer[]>(DEFAULT_SHADOW_LAYERS);
  const [shape, setShape] = useState<PreviewShape>("rounded");
  const [background, setBackground] = useState<PreviewBackground>("grey");
  const [outputTab, setOutputTab] = useState<OutputTab>("css");
  const [copied, setCopied] = useState(false);

  const cssOutput = useMemo(() => generateBoxShadowCss(layers), [layers]);
  const tailwindOutput = useMemo(() => generateBoxShadowTailwind(layers), [layers]);
  const activeOutput = outputTab === "css" ? cssOutput : tailwindOutput;
  const inlineShadow = useMemo(() => boxShadowInlineStyle(layers), [layers]);

  const applyPreset = (id: BoxShadowPresetId) => {
    setLayers(presetToLayers(id));
  };

  const updateLayer = (id: string, patch: Partial<ShadowLayer>) => {
    setLayers((prev) =>
      prev.map((layer) => (layer.id === id ? { ...layer, ...patch } : layer)),
    );
  };

  const addLayer = () => {
    if (layers.length >= 4) return;
    setLayers((prev) => [...prev, createShadowLayer()]);
  };

  const removeLayer = (id: string) => {
    setLayers((prev) => (prev.length > 1 ? prev.filter((l) => l.id !== id) : prev));
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
              <Layers className="h-6 w-6 text-tool-image" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Box Shadow CSS Generator
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Generate multi-layer CSS box shadows with live preview. Copy pure CSS
              or Tailwind classes with Apple-style presets.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="box-shadow-generator" />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {(Object.keys(BOX_SHADOW_PRESETS) as BoxShadowPresetId[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => applyPreset(id)}
                className="rounded-lg border border-surface-border bg-surface-card px-3 py-1.5 text-xs font-medium text-content-primary transition-colors hover:border-brand-blue/40 sm:text-sm"
              >
                {BOX_SHADOW_PRESETS[id].label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              {layers.map((layer, index) => (
                <div
                  key={layer.id}
                  className="rounded-2xl border border-surface-border bg-surface-card p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-content-primary">
                      Layer {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeLayer(layer.id)}
                      className="text-content-secondary hover:text-tool-pdf"
                      aria-label="Remove layer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-3 text-sm">
                    <label className="block">
                      X offset — {layer.offsetX}px
                      <input
                        type="range"
                        min={-50}
                        max={50}
                        value={layer.offsetX}
                        onChange={(e) =>
                          updateLayer(layer.id, { offsetX: Number(e.target.value) })
                        }
                        className="mt-1 w-full accent-brand-blue"
                      />
                    </label>
                    <label className="block">
                      Y offset — {layer.offsetY}px
                      <input
                        type="range"
                        min={-50}
                        max={50}
                        value={layer.offsetY}
                        onChange={(e) =>
                          updateLayer(layer.id, { offsetY: Number(e.target.value) })
                        }
                        className="mt-1 w-full accent-brand-blue"
                      />
                    </label>
                    <label className="block">
                      Blur — {layer.blur}px
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={layer.blur}
                        onChange={(e) =>
                          updateLayer(layer.id, { blur: Number(e.target.value) })
                        }
                        className="mt-1 w-full accent-brand-blue"
                      />
                    </label>
                    <label className="block">
                      Spread — {layer.spread}px
                      <input
                        type="range"
                        min={-50}
                        max={50}
                        value={layer.spread}
                        onChange={(e) =>
                          updateLayer(layer.id, { spread: Number(e.target.value) })
                        }
                        className="mt-1 w-full accent-brand-blue"
                      />
                    </label>
                    <label className="block">
                      Opacity — {layer.opacity}%
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={layer.opacity}
                        onChange={(e) =>
                          updateLayer(layer.id, { opacity: Number(e.target.value) })
                        }
                        className="mt-1 w-full accent-brand-blue"
                      />
                    </label>
                    <input
                      type="color"
                      value={`#${layer.colorR.toString(16).padStart(2, "0")}${layer.colorG.toString(16).padStart(2, "0")}${layer.colorB.toString(16).padStart(2, "0")}`}
                      onChange={(e) => {
                        const hex = e.target.value.replace("#", "");
                        updateLayer(layer.id, {
                          colorR: parseInt(hex.slice(0, 2), 16),
                          colorG: parseInt(hex.slice(2, 4), 16),
                          colorB: parseInt(hex.slice(4, 6), 16),
                        });
                      }}
                      className="h-10 w-full cursor-pointer rounded-lg border border-surface-border"
                    />
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={layer.inset}
                        onChange={(e) =>
                          updateLayer(layer.id, { inset: e.target.checked })
                        }
                        className="accent-brand-blue"
                      />
                      Inset shadow
                    </label>
                  </div>
                </div>
              ))}

              {layers.length < 4 && (
                <button
                  type="button"
                  onClick={addLayer}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-surface-border py-3 text-sm text-content-secondary hover:border-brand-blue/40 hover:text-brand-blue"
                >
                  <Plus className="h-4 w-4" /> Add Shadow Layer
                </button>
              )}
            </div>

            <div>
              <CalculatorField label="Preview Shape" htmlFor="shape">
                <ToggleButtonGroup
                  value={shape}
                  onChange={setShape}
                  ariaLabel="Preview shape"
                  options={[
                    { value: "square" as const, label: "Square" },
                    { value: "rounded" as const, label: "Rounded" },
                    { value: "pill" as const, label: "Pill" },
                    { value: "circle" as const, label: "Circle" },
                  ]}
                />
              </CalculatorField>

              <CalculatorField label="Background" htmlFor="bg">
                <ToggleButtonGroup
                  value={background}
                  onChange={setBackground}
                  ariaLabel="Preview background"
                  options={[
                    { value: "white" as const, label: "White" },
                    { value: "grey" as const, label: "Grey" },
                    { value: "dark" as const, label: "Dark" },
                    { value: "gradient" as const, label: "Gradient" },
                  ]}
                />
              </CalculatorField>

              <div
                className="mt-4 flex min-h-[240px] items-center justify-center rounded-2xl p-10"
                style={{ background: PREVIEW_BACKGROUNDS[background] }}
              >
                <div
                  className={`flex h-32 w-48 items-center justify-center bg-white text-sm font-medium text-content-primary ${previewShapeClass(shape)}`}
                  style={{ boxShadow: inlineShadow }}
                >
                  Preview
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
            <RelatedTools currentSlug="box-shadow-generator" />
            <ToolSeoContent slug="box-shadow-generator" />
            <ToolFeedback toolName="Box Shadow CSS Generator" />
            <DinoGame />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
