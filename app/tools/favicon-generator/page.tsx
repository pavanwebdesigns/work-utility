"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import JSZip from "jszip";
import { Copy, Download, Loader2, Sparkles, UploadCloud } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  createPreviewDataUrl,
  generateFaviconPackage,
  type FaviconFile,
} from "@/lib/favicon-generator";

export default function FaviconGeneratorPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [files, setFiles] = useState<FaviconFile[]>([]);
  const [htmlTags, setHtmlTags] = useState("");
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, or WebP).");
      return;
    }
    setError(null);
    setIsProcessing(true);
    try {
      const preview = await createPreviewDataUrl(file);
      setPreviewUrl(preview);
      const result = await generateFaviconPackage(file);
      setFiles(result.files);
      setHtmlTags(result.htmlTags);
    } catch {
      setError("Failed to generate favicons. Try a different image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    files.forEach((f) => zip.file(f.filename, f.blob));
    zip.file("favicon-html-tags.txt", htmlTags);
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "favicon-package.zip";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyTags = async () => {
    await navigator.clipboard.writeText(htmlTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10"><Link href="/" className="text-sm text-content-secondary hover:text-content-primary">← All Tools</Link></div>
        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <div className="pt-10 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
                <Sparkles className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
              </div>
              <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">Favicon Generator Online Free</h1>
              <p className="mx-auto mt-3 max-w-md text-content-secondary">Upload an image and get favicon.ico, all standard PNG sizes, and ready-to-paste HTML link tags.</p>
              <div className="mt-4 flex justify-center"><FavoriteButton slug="favicon-generator" /></div>
            </div>

            <div className="mt-10 space-y-6">
              <input ref={inputRef} type="file" accept="image/*" className="hidden" aria-label="Upload image"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); e.target.value = ""; }} />

              <button type="button" onClick={() => inputRef.current?.click()} aria-label="Image upload area"
                className="flex min-h-[160px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-blue/30 bg-surface-card p-12 hover:border-brand-blue">
                <UploadCloud className="mb-4 h-10 w-10 text-content-muted" />
                <p className="font-medium text-content-primary">Upload a square image (512×512 recommended)</p>
                <p className="mt-1 text-sm text-content-secondary">PNG, JPG, or WebP</p>
              </button>

              {isProcessing && <div className="flex justify-center gap-2 py-6 text-content-secondary"><Loader2 className="h-5 w-5 animate-spin" />Generating favicons...</div>}

              {previewUrl && files.length > 0 && (
                <div className="space-y-5">
                  <div className="rounded-xl border border-surface-border bg-surface-card p-6 text-center">
                    <p className="mb-3 text-sm font-medium text-content-primary">Browser tab preview</p>
                    <div className="mx-auto flex w-fit items-center gap-2 rounded-lg border border-surface-border bg-surface-base px-4 py-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={previewUrl} alt="Favicon preview at 32x32 pixels in a simulated browser tab" className="h-4 w-4" />
                      <span className="text-sm text-content-secondary">Your Site</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {files.filter((f) => f.filename.endsWith(".png") || f.filename.endsWith(".ico")).map((f) => (
                      <div key={f.filename} className="rounded-lg border border-surface-border bg-surface-card p-2 text-center">
                        <p className="mb-2 truncate text-[10px] text-content-muted">{f.filename}</p>
                        <p className="text-xs font-medium text-content-primary">{f.size}px</p>
                      </div>
                    ))}
                  </div>

                  <button type="button" onClick={handleDownloadZip}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-4 text-base font-semibold text-white hover:bg-brand-blue/90">
                    <Download className="h-5 w-5" />Download Favicon Package (ZIP)
                  </button>

                  <div className="rounded-xl border border-surface-border bg-surface-card p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-medium text-content-primary">HTML link tags</p>
                      <button type="button" onClick={handleCopyTags} className="flex items-center gap-1 text-xs text-brand-blue hover:underline">
                        <Copy className="h-3.5 w-3.5" />{copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <pre className="overflow-x-auto rounded-lg bg-surface-base p-3 text-xs text-content-secondary">{htmlTags}</pre>
                  </div>
                </div>
              )}
              {error && <div className="rounded-xl border border-red-400 bg-red-400/5 px-4 py-3 text-center text-sm text-red-400">{error}</div>}
            </div>
          </div>
          <RelatedTools currentSlug="favicon-generator" />
          <ToolFeedback toolName="Favicon Generator" />
          <ToolSeoContent slug="favicon-generator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
