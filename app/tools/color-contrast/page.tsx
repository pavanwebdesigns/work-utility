"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftRight,
  Check,
  Contrast,
  Eye,
  Palette,
  X,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { getContrastRatio, getWCAGRating } from "@/lib/color-contrast";

const howItWorksSteps = [
  {
    step: "01",
    icon: Palette,
    title: "Pick Colors",
    description: "Choose foreground and background colors",
  },
  {
    step: "02",
    icon: Contrast,
    title: "Check Ratio",
    description: "See the contrast ratio instantly",
  },
  {
    step: "03",
    icon: Eye,
    title: "Verify WCAG",
    description: "Check AA and AAA compliance badges",
  },
];

function WcagBadge({ label, pass }: { label: string; pass: boolean }) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
        pass
          ? "border-green-500/30 bg-green-500/10"
          : "border-red-500/30 bg-red-500/10"
      }`}
    >
      <span className="text-sm font-medium text-content-primary">{label}</span>
      {pass ? (
        <Check className="h-5 w-5 text-green-500" />
      ) : (
        <X className="h-5 w-5 text-red-500" />
      )}
    </div>
  );
}

export default function ColorContrastPage() {
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#FFFFFF");

  const ratio = useMemo(
    () => getContrastRatio(foreground, background),
    [foreground, background],
  );
  const ratings = useMemo(() => getWCAGRating(ratio), [ratio]);

  const swapColors = () => {
    setForeground(background);
    setBackground(foreground);
  };

  const updateColor = (
    value: string,
    setter: (v: string) => void,
  ) => {
    if (/^#[0-9A-Fa-f]{0,6}$/.test(value) || value === "") {
      setter(value.startsWith("#") ? value : `#${value}`);
    }
  };

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
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-img2pdf/10">
              <Contrast
                className="h-6 w-6 text-tool-img2pdf"
                strokeWidth={1.75}
              />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Color Contrast Checker — WCAG
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Check color contrast ratios for WCAG accessibility compliance.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-xl space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { label: "Foreground", value: foreground, set: setForeground },
                { label: "Background", value: background, set: setBackground },
              ].map(({ label, value, set }) => (
                <div key={label} className="space-y-2">
                  <label className="text-sm font-medium text-content-primary">
                    {label}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={value.length === 7 ? value : "#000000"}
                      onChange={(e) => set(e.target.value)}
                      className="h-10 w-10 cursor-pointer rounded-lg border border-surface-border bg-transparent"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => updateColor(e.target.value, set)}
                      className="min-w-0 flex-1 rounded-lg border border-surface-border bg-surface-card px-3 py-2 font-mono text-sm text-content-primary outline-none focus:border-tool-img2pdf"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={swapColors}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-surface-border bg-surface-elevated px-4 py-2 text-sm font-medium text-content-primary transition-colors hover:border-tool-img2pdf/40"
            >
              <ArrowLeftRight className="h-4 w-4" />
              Swap colors
            </button>

            <div
              className="rounded-xl border border-surface-border p-8 text-center"
              style={{ backgroundColor: background, color: foreground }}
            >
              <p className="text-2xl font-bold">Sample Text Preview</p>
              <p className="mt-2 text-sm opacity-90">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div className="rounded-xl border border-surface-border bg-surface-card p-6 text-center">
              <p className="text-sm text-content-secondary">Contrast Ratio</p>
              <p className="mt-2 text-4xl font-bold text-tool-img2pdf">
                {ratio.toFixed(2)}:1
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <WcagBadge label="AA Normal" pass={ratings.AA_normal} />
              <WcagBadge label="AA Large" pass={ratings.AA_large} />
              <WcagBadge label="AAA Normal" pass={ratings.AAA_normal} />
              <WcagBadge label="AAA Large" pass={ratings.AAA_large} />
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

          <RelatedTools currentSlug="color-contrast" />
          <ToolFeedback toolName="Color Contrast Checker" />
          <ToolSeoContent slug="color-contrast" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
