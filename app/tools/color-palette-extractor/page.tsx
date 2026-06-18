"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Check, Copy, Loader2, Palette, UploadCloud } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  extractPalette,
  type PaletteColor,
} from "@/lib/color-palette-extractor";

export default function ColorPaletteExtractorPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [palette, setPalette] = useState<PaletteColor[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    setError(null);
    setIsProcessing(true);
    setPreviewUrl(URL.createObjectURL(file));
    try {
      setPalette(await extractPalette(file, 6));
    } catch {
      setError("Failed to analyze image.");
      setPalette([]);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyHex = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10"><Link href="/" className="text-sm text-content-secondary hover:text-content-primary">← All Tools</Link></div>
        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <Palette className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">Color Palette Extractor Online Free</h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">Upload an image and get dominant colors with HEX and RGB codes. Click to copy.</p>
            <div className="mt-4 flex justify-center"><FavoriteButton slug="color-palette-extractor" /></div>
          </div>

          <div className="mt-10 space-y-6">
            <input ref={inputRef} type="file" accept="image/*" className="hidden" aria-label="Upload image"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
            <button type="button" onClick={() => inputRef.current?.click()} aria-label="Image upload area"
              className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-blue/30 bg-surface-card p-10 hover:border-brand-blue">
              <UploadCloud className="mb-3 h-8 w-8 text-content-muted" />
              <span className="text-sm font-medium text-content-primary">Upload an image</span>
            </button>

            {isProcessing && <div className="flex justify-center gap-2 text-content-secondary"><Loader2 className="h-5 w-5 animate-spin" />Extracting colors...</div>}

            {previewUrl && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Uploaded image used for color palette extraction" className="rounded-xl border border-surface-border object-contain max-h-64 w-full" />
                <div className="space-y-3">
                  {palette.map((color) => (
                    <button key={color.hex} type="button" onClick={() => copyHex(color.hex)}
                      className="flex w-full items-center gap-3 rounded-xl border border-surface-border bg-surface-card p-3 text-left hover:border-brand-blue">
                      <span className="h-10 w-10 shrink-0 rounded-lg border border-surface-border" style={{ backgroundColor: color.hex }} aria-hidden="true" />
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-sm font-semibold text-content-primary">{color.hex}</p>
                        <p className="text-xs text-content-muted">rgb({color.rgb.r}, {color.rgb.g}, {color.rgb.b})</p>
                      </div>
                      {copiedHex === color.hex ? <Check className="h-4 w-4 text-brand-blue" /> : <Copy className="h-4 w-4 text-content-muted" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {error && <p className="text-center text-sm text-red-400">{error}</p>}
          </div>

          <RelatedTools currentSlug="color-palette-extractor" />
          <ToolFeedback toolName="Color Palette Extractor" />
          <ToolSeoContent slug="color-palette-extractor" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
