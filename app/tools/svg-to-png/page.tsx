"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Download, ImageDown, Loader2, UploadCloud } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  convertSvgToPng,
  parseSvgDimensions,
  readFileAsText,
} from "@/lib/svg-to-png";

const SCALES = [1, 2, 4] as const;

export default function SvgToPngPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [svgContent, setSvgContent] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [baseWidth, setBaseWidth] = useState(512);
  const [baseHeight, setBaseHeight] = useState(512);
  const [scale, setScale] = useState<number>(2);
  const [customWidth, setCustomWidth] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [background, setBackground] = useState<"transparent" | string>("transparent");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!svgContent) { setPreviewUrl(null); return; }
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    const dims = parseSvgDimensions(svgContent);
    setBaseWidth(Math.round(dims.width));
    setBaseHeight(Math.round(dims.height));
    return () => URL.revokeObjectURL(url);
  }, [svgContent]);

  const loadSvg = async (content: string) => {
    setSvgContent(content);
    setError(null);
  };

  const outputWidth = useCustom && customWidth ? parseInt(customWidth, 10) : Math.round(baseWidth * scale);
  const outputHeight = useCustom && customWidth
    ? Math.round((parseInt(customWidth, 10) / baseWidth) * baseHeight)
    : Math.round(baseHeight * scale);

  const handleConvert = async () => {
    if (!svgContent.trim()) return;
    setIsProcessing(true);
    setError(null);
    try {
      const blob = await convertSvgToPng(svgContent, {
        width: outputWidth,
        height: outputHeight,
        background: background === "transparent" ? "transparent" : bgColor,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `svg-export-${outputWidth}x${outputHeight}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Conversion failed. Check your SVG markup.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10"><Link href="/" className="text-sm text-content-secondary hover:text-content-primary">← All Tools</Link></div>
        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <ImageDown className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">SVG to PNG Converter Online Free</h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">Upload or paste SVG, choose resolution and background, download PNG in your browser.</p>
            <div className="mt-4 flex justify-center"><FavoriteButton slug="svg-to-png" /></div>
          </div>

          <div className="mt-10 space-y-6">
            <input ref={fileRef} type="file" accept=".svg,image/svg+xml" className="hidden" aria-label="Upload SVG"
              onChange={async (e) => { const f = e.target.files?.[0]; if (f) await loadSvg(await readFileAsText(f)); e.target.value = ""; }} />
            <button type="button" onClick={() => fileRef.current?.click()}
              className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-blue/30 bg-surface-card p-8 hover:border-brand-blue">
              <UploadCloud className="mb-3 h-8 w-8 text-content-muted" />
              <span className="text-sm font-medium text-content-primary">Upload SVG file</span>
            </button>

            <div>
              <label htmlFor="svg-paste" className="mb-2 block text-sm font-medium text-content-primary">Or paste SVG code</label>
              <textarea id="svg-paste" value={svgContent} onChange={(e) => loadSvg(e.target.value)} rows={6} spellCheck={false}
                placeholder="<svg xmlns='http://www.w3.org/2000/svg' ...></svg>"
                className="w-full rounded-xl border border-surface-border bg-surface-card p-4 font-mono text-xs text-content-primary outline-none focus:border-brand-blue" />
            </div>

            {previewUrl && (
              <div className="rounded-xl border border-surface-border bg-surface-card p-6 text-center">
                <p className="mb-3 text-sm font-medium text-content-primary">Preview</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="SVG preview before PNG conversion" className="mx-auto max-h-48 max-w-full object-contain" />
              </div>
            )}

            <div className="rounded-xl border border-surface-border bg-surface-card p-4 space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-content-primary">Scale</p>
                <div className="flex flex-wrap gap-2">
                  {SCALES.map((s) => (
                    <button key={s} type="button" onClick={() => { setScale(s); setUseCustom(false); }}
                      className={`rounded-lg border px-4 py-2 text-sm ${!useCustom && scale === s ? "border-brand-blue bg-brand-blue/10 text-brand-blue" : "border-surface-border text-content-secondary"}`}>
                      {s}x ({baseWidth * s}×{baseHeight * s})
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-content-secondary">
                <input type="checkbox" checked={useCustom} onChange={(e) => setUseCustom(e.target.checked)} />
                Custom width (px)
              </label>
              {useCustom && (
                <input type="number" value={customWidth} onChange={(e) => setCustomWidth(e.target.value)} placeholder="1024"
                  className="w-full rounded-lg border border-surface-border bg-surface-base px-3 py-2 text-sm" />
              )}
              <div>
                <p className="mb-2 text-sm font-medium text-content-primary">Background</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setBackground("transparent")}
                    className={`rounded-lg border px-4 py-2 text-sm ${background === "transparent" ? "border-brand-blue bg-brand-blue/10 text-brand-blue" : "border-surface-border"}`}>Transparent</button>
                  <button type="button" onClick={() => setBackground("solid")}
                    className={`rounded-lg border px-4 py-2 text-sm ${background !== "transparent" ? "border-brand-blue bg-brand-blue/10 text-brand-blue" : "border-surface-border"}`}>Solid color</button>
                </div>
                {background !== "transparent" && (
                  <input type="color" value={bgColor} onChange={(e) => { setBgColor(e.target.value); setBackground(e.target.value); }}
                    className="mt-2 h-10 w-full cursor-pointer rounded-lg border border-surface-border" aria-label="Background color picker" />
                )}
              </div>
              <p className="text-xs text-content-muted">Output: {outputWidth} × {outputHeight} px</p>
            </div>

            <button type="button" onClick={handleConvert} disabled={!svgContent.trim() || isProcessing}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-4 text-base font-semibold text-white hover:bg-brand-blue/90 disabled:opacity-70">
              {isProcessing ? <><Loader2 className="h-5 w-5 animate-spin" />Converting...</> : <><Download className="h-5 w-5" />Download PNG</>}
            </button>
            {error && <p className="text-center text-sm text-red-400">{error}</p>}
          </div>

          <RelatedTools currentSlug="svg-to-png" />
          <ToolFeedback toolName="SVG to PNG" />
          <ToolSeoContent slug="svg-to-png" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
