"use client";

import { useRef, useState } from "react";
import { Check, Copy, Loader2, UploadCloud } from "lucide-react";
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
    <>
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
    </>
  );
}

