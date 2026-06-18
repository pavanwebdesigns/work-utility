"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Download, Loader2, Stamp, Upload, UploadCloud, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { applyWatermark, formatFileSize, type WatermarkType } from "@/lib/pdf-watermark";
import { getTotalPages } from "@/lib/pdf-document";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export default function PdfWatermarkPage() {
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [watermarkType, setWatermarkType] = useState<WatermarkType>("text");
  const [text, setText] = useState("DRAFT");
  const [fontSize, setFontSize] = useState("48");
  const [color, setColor] = useState("#888888");
  const [opacity, setOpacity] = useState("0.3");
  const [rotation, setRotation] = useState("-45");
  const [tiled, setTiled] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageScale, setImageScale] = useState("0.25");
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePdfSelect = async (selected: File) => {
    if (!selected.name.toLowerCase().endsWith(".pdf")) { setError("Only PDF files are supported."); return; }
    if (selected.size > MAX_FILE_SIZE) { setError("PDF must be 50MB or smaller."); return; }
    setFile(selected);
    setOutputBlob(null);
    setError(null);
    setIsLoading(true);
    try { setPageCount(await getTotalPages(selected)); } catch { setError("Unable to read PDF."); setFile(null); }
    finally { setIsLoading(false); }
  };

  const handleApply = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    try {
      let blob: Blob;
      if (watermarkType === "text") {
        blob = await applyWatermark(file, {
          type: "text", text: text.trim() || "DRAFT",
          fontSize: parseInt(fontSize, 10) || 48,
          color, opacity: parseFloat(opacity) || 0.3,
          rotation: parseInt(rotation, 10) || -45, tiled,
        });
      } else {
        if (!imageFile) { setError("Upload a logo or image for the watermark."); setIsProcessing(false); return; }
        const bytes = new Uint8Array(await imageFile.arrayBuffer());
        blob = await applyWatermark(file, {
          type: "image", imageBytes: bytes,
          imageMime: imageFile.type === "image/png" ? "image/png" : "image/jpeg",
          opacity: parseFloat(opacity) || 0.3,
          scale: parseFloat(imageScale) || 0.25,
          tiled, rotation: parseInt(rotation, 10) || 0,
        });
      }
      setOutputBlob(blob);
    } catch { setError("Watermark failed. Please try again."); }
    finally { setIsProcessing(false); }
  };

  const handleDownload = () => {
    if (!outputBlob || !file) return;
    const url = URL.createObjectURL(outputBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `watermarked_${file.name}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10"><Link href="/" className="text-sm text-content-secondary hover:text-content-primary">← All Tools</Link></div>
        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <div className="pt-10 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-pdf/10">
                <Stamp className="h-6 w-6 text-tool-pdf" strokeWidth={1.75} />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">Add Watermark to PDF Online Free</h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">Add text or image watermarks with adjustable opacity and placement. Applied to every page in your browser.</p>
              <div className="mt-4 flex justify-center"><FavoriteButton slug="pdf-watermark" /></div>
            </div>

            <div className="mt-10 space-y-6">
              <input ref={pdfInputRef} type="file" accept="application/pdf,.pdf" className="hidden" aria-label="Upload PDF"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePdfSelect(f); e.target.value = ""; }} />
              <input ref={imageInputRef} type="file" accept="image/png,image/jpeg,image/jpg" className="hidden" aria-label="Upload watermark image"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) { setImageFile(f); setOutputBlob(null); } e.target.value = ""; }} />

              {!file && (
                <button type="button" onClick={() => pdfInputRef.current?.click()} aria-label="File upload area"
                  className="flex min-h-[160px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-tool-pdf/30 bg-surface-card p-12 hover:border-tool-pdf">
                  <UploadCloud className="mb-4 h-10 w-10 text-content-muted" />
                  <p className="font-medium text-content-primary">Drop your PDF here</p>
                </button>
              )}

              {file && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between rounded-xl border border-surface-border bg-surface-card px-4 py-3">
                    <div><p className="truncate text-sm font-medium">{file.name}</p><p className="text-xs text-content-secondary">{formatFileSize(file.size)} · {pageCount} pages</p></div>
                    <button type="button" onClick={() => setFile(null)} className="rounded-lg p-2"><X className="h-4 w-4" /></button>
                  </div>

                  <div className="flex gap-2">
                    {(["text", "image"] as WatermarkType[]).map((t) => (
                      <button key={t} type="button" onClick={() => { setWatermarkType(t); setOutputBlob(null); }}
                        className={`flex-1 rounded-lg border py-2 text-sm font-medium capitalize ${watermarkType === t ? "border-tool-pdf bg-tool-pdf/10 text-tool-pdf" : "border-surface-border text-content-secondary"}`}>
                        {t} watermark
                      </button>
                    ))}
                  </div>

                  <div className="rounded-xl border border-surface-border bg-surface-card p-4 space-y-4">
                    {watermarkType === "text" ? (
                      <>
                        <div><label htmlFor="wm-text" className="mb-1 block text-sm font-medium">Text</label>
                          <input id="wm-text" value={text} onChange={(e) => { setText(e.target.value); setOutputBlob(null); }}
                            className="w-full rounded-lg border border-surface-border bg-surface-base px-3 py-2 text-sm" placeholder="DRAFT, CONFIDENTIAL..." /></div>
                        <div><label htmlFor="wm-size" className="mb-1 block text-sm font-medium">Font size</label>
                          <input id="wm-size" type="number" value={fontSize} onChange={(e) => { setFontSize(e.target.value); setOutputBlob(null); }}
                            className="w-full rounded-lg border border-surface-border bg-surface-base px-3 py-2 text-sm" /></div>
                        <div><label htmlFor="wm-color" className="mb-1 block text-sm font-medium">Color</label>
                          <input id="wm-color" type="color" value={color} onChange={(e) => { setColor(e.target.value); setOutputBlob(null); }}
                            className="h-10 w-full cursor-pointer rounded-lg border border-surface-border" /></div>
                      </>
                    ) : (
                      <>
                        <button type="button" onClick={() => imageInputRef.current?.click()}
                          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-surface-border py-3 text-sm text-content-secondary hover:border-tool-pdf">
                          <Upload className="h-4 w-4" />{imageFile ? imageFile.name : "Upload logo or image"}
                        </button>
                        <div><label htmlFor="wm-scale" className="mb-1 block text-sm font-medium">Image size (scale)</label>
                          <input id="wm-scale" type="number" step="0.05" min="0.05" max="1" value={imageScale} onChange={(e) => { setImageScale(e.target.value); setOutputBlob(null); }}
                            className="w-full rounded-lg border border-surface-border bg-surface-base px-3 py-2 text-sm" /></div>
                      </>
                    )}
                    <div><label htmlFor="wm-opacity" className="mb-1 block text-sm font-medium">Opacity ({Math.round((parseFloat(opacity) || 0.3) * 100)}%)</label>
                      <input id="wm-opacity" type="range" min="0.1" max="0.8" step="0.05" value={opacity} onChange={(e) => { setOpacity(e.target.value); setOutputBlob(null); }}
                        className="w-full" /></div>
                    <div><label htmlFor="wm-rotation" className="mb-1 block text-sm font-medium">Rotation (degrees)</label>
                      <input id="wm-rotation" type="number" value={rotation} onChange={(e) => { setRotation(e.target.value); setOutputBlob(null); }}
                        className="w-full rounded-lg border border-surface-border bg-surface-base px-3 py-2 text-sm" /></div>
                    <label className="flex items-center gap-2 text-sm text-content-secondary">
                      <input type="checkbox" checked={tiled} onChange={(e) => { setTiled(e.target.checked); setOutputBlob(null); }} />
                      Tile watermark across page (diagonal pattern)
                    </label>
                  </div>

                  {!outputBlob && (
                    <button type="button" onClick={handleApply} disabled={isProcessing || isLoading}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-tool-pdf px-4 py-4 text-base font-semibold text-white hover:bg-[#DC2626] disabled:opacity-70">
                      {isProcessing ? <><Loader2 className="h-5 w-5 animate-spin" />Applying...</> : "Apply Watermark"}
                    </button>
                  )}
                  {outputBlob && (
                    <button type="button" onClick={handleDownload} className="flex w-full items-center justify-center gap-2 rounded-xl bg-tool-convert px-4 py-4 text-base font-semibold text-white hover:bg-[#059669]">
                      <Download className="h-5 w-5" />Download Watermarked PDF
                    </button>
                  )}
                </div>
              )}
              {error && <div className="rounded-xl border border-tool-pdf bg-tool-pdf/5 px-4 py-3 text-center text-sm text-tool-pdf">{error}</div>}
            </div>
          </div>
          <RelatedTools currentSlug="pdf-watermark" />
          <ToolFeedback toolName="PDF Watermark" />
          <ToolSeoContent slug="pdf-watermark" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
