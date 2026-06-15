"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, Ratio, Ruler } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import {
  calculateHeight,
  calculateWidth,
  COMMON_RATIOS,
  getAspectRatio,
} from "@/lib/aspect-ratio";

const howItWorksSteps = [
  { step: "01", icon: Ruler, title: "Enter", description: "Type your width and height" },
  { step: "02", icon: Calculator, title: "Calculate", description: "Get the aspect ratio instantly" },
  { step: "03", icon: Ratio, title: "Use", description: "Calculate dimensions for any size" },
];

export default function AspectRatioPage() {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [ratioW, setRatioW] = useState(16);
  const [ratioH, setRatioH] = useState(9);
  const [calcTarget, setCalcTarget] = useState<"width" | "height">("width");
  const [knownValue, setKnownValue] = useState(1920);

  const aspectRatio = useMemo(() => {
    if (width > 0 && height > 0) return getAspectRatio(width, height);
    return "—";
  }, [width, height]);

  const calculatedDimension = useMemo(() => {
    if (ratioW <= 0 || ratioH <= 0 || knownValue <= 0) return 0;
    return calcTarget === "width"
      ? calculateHeight(knownValue, ratioW, ratioH)
      : calculateWidth(knownValue, ratioW, ratioH);
  }, [calcTarget, knownValue, ratioW, ratioH]);

  const previewW = 300;
  const previewH =
    ratioW > 0 && ratioH > 0
      ? Math.min(200, Math.round((previewW * ratioH) / ratioW))
      : 100;

  const loadRatio = (w: number, h: number) => {
    setRatioW(w);
    setRatioH(h);
  };

  const isActiveRatio = (w: number, h: number) => ratioW === w && ratioH === h;

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />

      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary">
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-img2pdf/10">
              <Ratio className="h-6 w-6 text-tool-img2pdf" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">Aspect Ratio Calculator</h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Calculate image aspect ratios and find width or height for any ratio instantly.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl space-y-8">
            <section className="rounded-xl border border-surface-border bg-surface-card p-5">
              <h2 className="mb-4 font-semibold text-content-primary">Calculate Aspect Ratio</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs text-content-muted">Width (px)</label>
                  <input
                    type="number"
                    min={1}
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value) || 0)}
                    className="w-full rounded-xl border border-surface-border bg-surface-elevated px-3 py-2 text-lg font-bold text-content-primary outline-none focus:border-tool-img2pdf"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-content-muted">Height (px)</label>
                  <input
                    type="number"
                    min={1}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value) || 0)}
                    className="w-full rounded-xl border border-surface-border bg-surface-elevated px-3 py-2 text-lg font-bold text-content-primary outline-none focus:border-tool-img2pdf"
                  />
                </div>
              </div>
              <p className="mt-4 text-center text-2xl font-bold text-tool-img2pdf">
                Aspect Ratio: {aspectRatio}
              </p>
            </section>

            <section className="rounded-xl border border-surface-border bg-surface-card p-5">
              <h2 className="mb-4 font-semibold text-content-primary">Calculate Dimensions</h2>
              <div className="mb-4 flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={ratioW}
                  onChange={(e) => setRatioW(Number(e.target.value) || 1)}
                  className="w-20 rounded-xl border border-surface-border bg-surface-elevated px-3 py-2 text-center font-bold text-content-primary outline-none"
                />
                <span className="text-content-muted">:</span>
                <input
                  type="number"
                  min={1}
                  value={ratioH}
                  onChange={(e) => setRatioH(Number(e.target.value) || 1)}
                  className="w-20 rounded-xl border border-surface-border bg-surface-elevated px-3 py-2 text-center font-bold text-content-primary outline-none"
                />
              </div>

              <div className="mb-4 flex gap-2">
                {(["width", "height"] as const).map((target) => (
                  <button
                    key={target}
                    type="button"
                    onClick={() => setCalcTarget(target)}
                    className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                      calcTarget === target
                        ? "border-tool-img2pdf bg-tool-img2pdf/10 text-tool-img2pdf"
                        : "border-surface-border bg-surface-elevated text-content-secondary"
                    }`}
                  >
                    Known {target}
                  </button>
                ))}
              </div>

              <div>
                <label className="mb-1 block text-xs text-content-muted">
                  Known {calcTarget} (px)
                </label>
                <input
                  type="number"
                  min={1}
                  value={knownValue}
                  onChange={(e) => setKnownValue(Number(e.target.value) || 0)}
                  className="w-full rounded-xl border border-surface-border bg-surface-elevated px-3 py-2 text-lg font-bold text-content-primary outline-none"
                />
              </div>

              <p className="mt-4 text-center text-2xl font-bold text-content-primary">
                {calcTarget === "width"
                  ? `Height: ${calculatedDimension}px`
                  : `Width: ${calculatedDimension}px`}
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-content-primary">Common Ratios</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {COMMON_RATIOS.map((ratio) => (
                  <button
                    key={ratio.label}
                    type="button"
                    onClick={() => loadRatio(ratio.w, ratio.h)}
                    className={`rounded-xl border p-4 text-left transition-colors ${
                      isActiveRatio(ratio.w, ratio.h)
                        ? "border-tool-img2pdf bg-tool-img2pdf/10"
                        : "border-surface-border bg-surface-card hover:border-tool-img2pdf/50"
                    }`}
                  >
                    <p className="font-bold text-content-primary">{ratio.label}</p>
                    <p className="mt-1 text-xs text-content-secondary">{ratio.desc}</p>
                  </button>
                ))}
              </div>
            </section>

            <div className="flex flex-col items-center">
              <div
                className="flex items-center justify-center rounded-lg border border-brand-blue/30 bg-brand-blue/10 text-sm font-medium text-content-primary"
                style={{ width: previewW, height: previewH }}
              >
                {ratioW}:{ratioH}
              </div>
              <p className="mt-2 text-xs text-content-muted">Ratio preview</p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div key={step.title} className="rounded-xl border border-surface-border bg-surface-card p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-img2pdf/10">
                    <step.icon className="h-5 w-5 text-tool-img2pdf" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="aspect-ratio" />
          <ToolFeedback toolName="Aspect Ratio Calculator" />
          <ToolSeoContent slug="aspect-ratio" />
          <DinoGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
