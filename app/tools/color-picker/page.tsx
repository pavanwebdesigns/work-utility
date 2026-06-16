"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Check, Copy, Pipette, Plus, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  hexToRgb,
  hslToRgb,
  normalizeHex,
  rgbToHex,
  rgbToHsl,
} from "@/lib/color-picker";

const howItWorksSteps = [
  {
    step: "01",
    icon: Pipette,
    title: "Pick",
    description: "Use the color picker or enter a HEX/RGB value",
  },
  {
    step: "02",
    icon: Copy,
    title: "Convert",
    description: "Get HEX, RGB, and HSL values instantly",
  },
  {
    step: "03",
    icon: Check,
    title: "Copy",
    description: "Click any value to copy it",
  },
];

const MAX_PALETTE = 10;

export default function ColorPickerPage() {
  const [hex, setHex] = useState("#3B82F6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const [palette, setPalette] = useState<string[]>([]);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const updateFromHex = useCallback((value: string) => {
    const normalized = normalizeHex(value.startsWith("#") ? value : `#${value}`);
    const nextRgb = hexToRgb(normalized);
    const nextHsl = rgbToHsl(nextRgb.r, nextRgb.g, nextRgb.b);
    setHex(normalized);
    setRgb(nextRgb);
    setHsl(nextHsl);
  }, []);

  const updateFromRgb = useCallback((r: number, g: number, b: number) => {
    const nextHex = rgbToHex(r, g, b);
    const nextHsl = rgbToHsl(r, g, b);
    setHex(nextHex);
    setRgb({ r, g, b });
    setHsl(nextHsl);
  }, []);

  const updateFromHsl = useCallback((h: number, s: number, l: number) => {
    const nextRgb = hslToRgb(h, s, l);
    const nextHex = rgbToHex(nextRgb.r, nextRgb.g, nextRgb.b);
    setHex(nextHex);
    setRgb(nextRgb);
    setHsl({ h, s, l });
  }, []);

  const copyValue = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      setTimeout(() => setCopiedValue(null), 2000);
    } catch {
      setCopiedValue(null);
    }
  };

  const saveColor = () => {
    if (palette.includes(hex)) return;
    setPalette((current) => [hex, ...current].slice(0, MAX_PALETTE));
  };

  const removeColor = (color: string) => {
    setPalette((current) => current.filter((item) => item !== color));
  };

  const CopyButton = ({ value }: { value: string }) => (
    <button
      type="button"
      onClick={() => copyValue(value)}
      className="rounded-lg p-1.5 text-content-muted transition-colors hover:bg-surface-elevated hover:text-content-primary"
      aria-label={`Copy ${value}`}
    >
      {copiedValue === value ? (
        <Check className="h-4 w-4 text-emerald-400" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />

      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <div className="pt-4 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-img2pdf/10">
                <Pipette
                  className="h-6 w-6 text-tool-img2pdf"
                  strokeWidth={1.75}
                />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
                Color Picker
              </h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">
                Pick colors and get HEX, RGB, and HSL values instantly. Save
                your favorite colors to a palette.
              </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="color-picker" />
            </div>
            </div>

            <div className="mt-10 space-y-6">
              <div
                className="h-40 w-full rounded-2xl border border-surface-border shadow-inner"
                style={{ backgroundColor: hex }}
              />

              <div>
                <p className="mb-2 text-xs uppercase tracking-wide text-content-muted">
                  Click to pick a color
                </p>
                <input
                  type="color"
                  value={hex}
                  onChange={(e) => updateFromHex(e.target.value)}
                  className="h-12 w-full cursor-pointer rounded-xl border-0 bg-transparent"
                  aria-label="Native color picker"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-surface-border bg-surface-card p-4">
                  <p className="text-xs uppercase text-content-muted">HEX</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-content-muted">#</span>
                    <input
                      type="text"
                      value={hex.replace("#", "")}
                      onChange={(e) => updateFromHex(e.target.value)}
                      maxLength={6}
                      className="w-full bg-transparent font-mono text-lg font-bold text-content-primary outline-none"
                    />
                    <CopyButton value={hex} />
                  </div>
                </div>

                <div className="rounded-xl border border-surface-border bg-surface-card p-4">
                  <p className="text-xs uppercase text-content-muted">RGB</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {(["r", "g", "b"] as const).map((channel) => (
                      <input
                        key={channel}
                        type="number"
                        min={0}
                        max={255}
                        value={rgb[channel]}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          updateFromRgb(
                            channel === "r" ? value : rgb.r,
                            channel === "g" ? value : rgb.g,
                            channel === "b" ? value : rgb.b,
                          );
                        }}
                        className="w-full rounded-lg border border-surface-border bg-surface-elevated px-2 py-1 text-center font-mono text-sm font-bold text-content-primary outline-none"
                        aria-label={`RGB ${channel.toUpperCase()}`}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono text-sm text-content-primary">
                      rgb({rgb.r}, {rgb.g}, {rgb.b})
                    </span>
                    <CopyButton value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
                  </div>
                </div>

                <div className="rounded-xl border border-surface-border bg-surface-card p-4">
                  <p className="text-xs uppercase text-content-muted">HSL</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      min={0}
                      max={360}
                      value={hsl.h}
                      onChange={(e) =>
                        updateFromHsl(Number(e.target.value), hsl.s, hsl.l)
                      }
                      className="w-full rounded-lg border border-surface-border bg-surface-elevated px-2 py-1 text-center font-mono text-sm font-bold text-content-primary outline-none"
                      aria-label="HSL Hue"
                    />
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={hsl.s}
                      onChange={(e) =>
                        updateFromHsl(hsl.h, Number(e.target.value), hsl.l)
                      }
                      className="w-full rounded-lg border border-surface-border bg-surface-elevated px-2 py-1 text-center font-mono text-sm font-bold text-content-primary outline-none"
                      aria-label="HSL Saturation"
                    />
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={hsl.l}
                      onChange={(e) =>
                        updateFromHsl(hsl.h, hsl.s, Number(e.target.value))
                      }
                      className="w-full rounded-lg border border-surface-border bg-surface-elevated px-2 py-1 text-center font-mono text-sm font-bold text-content-primary outline-none"
                      aria-label="HSL Lightness"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono text-sm text-content-primary">
                      hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                    </span>
                    <CopyButton
                      value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-medium text-content-primary">
                    Saved Colors
                  </p>
                  <button
                    type="button"
                    onClick={saveColor}
                    className="flex items-center gap-1.5 rounded-lg bg-tool-img2pdf/10 px-3 py-1.5 text-sm font-medium text-tool-img2pdf transition-colors hover:bg-tool-img2pdf/20"
                  >
                    <Plus className="h-4 w-4" />
                    Save current color
                  </button>
                </div>
                {palette.length === 0 ? (
                  <p className="text-sm text-content-muted">
                    No saved colors yet.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {palette.map((color) => (
                      <div key={color} className="relative">
                        <button
                          type="button"
                          onClick={() => updateFromHex(color)}
                          className="h-8 w-8 rounded-full border border-surface-border"
                          style={{ backgroundColor: color }}
                          aria-label={`Load color ${color}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeColor(color)}
                          className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-surface-elevated text-content-muted hover:text-content-primary"
                          aria-label={`Remove ${color}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <RelatedTools currentSlug="color-picker" />

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
                    <step.icon className="h-5 w-5 text-tool-img2pdf" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">
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

          <ToolFeedback toolName="Color Picker" />
          <ToolSeoContent slug="color-picker" />
          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
