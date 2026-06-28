"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, Palette, Pipette } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { LastUpdatedBadge } from "@/components/LastUpdatedBadge";
import { CopyValueButton } from "@/components/CopyValueButton";
import {
  CalculatorField,
  CalculatorInput,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import {
  formatPaletteValue,
  generateCssVariables,
  generatePalette,
  generateTailwindConfig,
  normalizeHex,
  type ColorFormat,
} from "@/lib/color-palette-generator";

type OutputTab = "tailwind" | "css";

const DEFAULT_HEX = "#4f8ef7";

export default function ColorPaletteGeneratorPage() {
  const [hexInput, setHexInput] = useState(DEFAULT_HEX);
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex");
  const [outputTab, setOutputTab] = useState<OutputTab>("tailwind");
  const [copiedAll, setCopiedAll] = useState(false);

  const normalizedHex = useMemo(() => normalizeHex(hexInput) ?? DEFAULT_HEX, [hexInput]);

  const palette = useMemo(
    () => generatePalette(normalizedHex) ?? [],
    [normalizedHex],
  );

  const tailwindOutput = useMemo(
    () => generateTailwindConfig(palette),
    [palette],
  );
  const cssOutput = useMemo(() => generateCssVariables(palette), [palette]);
  const activeOutput = outputTab === "tailwind" ? tailwindOutput : cssOutput;

  async function handleCopyAll() {
    await navigator.clipboard.writeText(activeOutput);
    setCopiedAll(true);
    window.setTimeout(() => setCopiedAll(false), 2000);
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
              Color Palette Generator — Tailwind Scale from Any Hex
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Generate a complete Tailwind 50–950 color scale from your brand hex.
              Copy tailwind.config.js or CSS variables with WCAG contrast badges.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="color-palette-generator" />
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-xl space-y-5">
            <CalculatorField label="Brand Color" htmlFor="hex">
              <div className="flex items-center gap-3">
                <input
                  id="color-picker"
                  type="color"
                  value={normalizedHex}
                  onChange={(e) => setHexInput(e.target.value)}
                  className="h-12 w-14 cursor-pointer rounded-lg border border-surface-border bg-transparent"
                  aria-label="Color picker"
                />
                <CalculatorInput
                  id="hex"
                  value={hexInput}
                  onChange={setHexInput}
                  placeholder="#4f8ef7"
                />
              </div>
            </CalculatorField>

            <div
              className="h-16 rounded-xl border border-surface-border"
              style={{ backgroundColor: normalizedHex }}
              aria-hidden
            />

            <CalculatorField label="Display Format" htmlFor="format">
              <ToggleButtonGroup
                value={colorFormat}
                onChange={setColorFormat}
                ariaLabel="Color format"
                options={[
                  { value: "hex" as const, label: "HEX" },
                  { value: "rgb" as const, label: "RGB" },
                  { value: "hsl" as const, label: "HSL" },
                ]}
              />
            </CalculatorField>
          </div>

          {palette.length > 0 && (
            <div className="mx-auto mt-10 max-w-2xl space-y-2">
              {palette.map((step) => (
                <div
                  key={step.shade}
                  className="flex items-center gap-3 rounded-lg border border-surface-border p-2"
                >
                  <div
                    className="h-10 w-10 shrink-0 rounded-md border border-surface-border/50"
                    style={{ backgroundColor: step.hex }}
                  />
                  <span className="w-10 text-sm font-medium text-content-muted">
                    {step.shade}
                  </span>
                  <code className="min-w-0 flex-1 truncate text-sm text-content-primary">
                    {formatPaletteValue(step, colorFormat)}
                  </code>
                  <span
                    className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                      step.contrastLabel === "W"
                        ? "bg-surface-elevated text-content-primary"
                        : "bg-content-primary text-surface-base"
                    }`}
                    title={
                      step.contrastLabel === "W"
                        ? "White text passes WCAG AA"
                        : "Black text passes WCAG AA"
                    }
                  >
                    {step.contrastLabel === "W" ? "✅ W" : "✅ B"}
                  </span>
                  <CopyValueButton
                    value={formatPaletteValue(step, colorFormat)}
                    label="Copy"
                  />
                </div>
              ))}
            </div>
          )}

          {palette.length > 0 && (
            <div className="mx-auto mt-10 max-w-2xl">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <ToggleButtonGroup
                  value={outputTab}
                  onChange={setOutputTab}
                  ariaLabel="Code output format"
                  options={[
                    { value: "tailwind" as const, label: "Tailwind Config" },
                    { value: "css" as const, label: "CSS Variables" },
                  ]}
                />
                <button
                  type="button"
                  onClick={handleCopyAll}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-surface-border bg-surface-card px-3 py-1.5 text-sm font-medium text-content-primary hover:bg-surface-elevated"
                >
                  {copiedAll ? (
                    <>
                      <Check className="h-4 w-4 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy All
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-xl border border-surface-border bg-surface-elevated p-4 text-xs text-content-primary">
                <code>{activeOutput}</code>
              </pre>
            </div>
          )}

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Palette, title: "50–950 scale", desc: "Full Tailwind color range" },
              { icon: Pipette, title: "HSL algorithm", desc: "Consistent tint & shade" },
              { icon: Check, title: "WCAG contrast", desc: "White or black text badge" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-surface-border bg-surface-card p-5"
              >
                <item.icon className="h-5 w-5 text-tool-image" />
                <p className="mt-2 font-semibold text-content-primary">{item.title}</p>
                <p className="mt-1 text-sm text-content-secondary">{item.desc}</p>
              </div>
            ))}
          </div>

          <RelatedTools currentSlug="color-palette-generator" />
          <ToolFeedback toolName="Color Palette Generator" />
          <ToolSeoContent slug="color-palette-generator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
