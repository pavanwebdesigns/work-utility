"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Download, FileImage, UploadCloud } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  convertWordToJpg,
  formatFileSize,
} from "@/lib/word-to-jpg";

export default function WordToJpgPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetOutput = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setPreviewUrl(null);
    setDownloadUrl(null);
  };

  const handleFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith(".docx")) {
      setError("Please upload a .docx Word document.");
      return;
    }

    resetOutput();
    setFileName(file.name);
    setFileSize(file.size);
    setError(null);
    setLoading(true);

    try {
      const result = await convertWordToJpg(file);
      const url = URL.createObjectURL(result.blob);
      setPreviewUrl(url);
      setDownloadUrl(url);
    } catch {
      setError(
        "Conversion failed. Try a simpler document layout or save as PDF first."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl || !fileName) return;
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = fileName.replace(/\.docx$/i, ".jpg");
    anchor.click();
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

        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-convert/10">
              <FileImage
                className="h-6 w-6 text-tool-convert"
                strokeWidth={1.75}
              />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Word to JPG Converter Online Free
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Upload a DOCX file and download it as a JPG image in your
              browser.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="word-to-jpg" />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Works best with simple document layouts. Complex formatting (custom
            fonts, advanced tables) may not render perfectly. Output is a single
            continuous JPG of the full document height — not separate files per
            page.
          </div>

          <div className="mt-8">
            <input
              ref={fileRef}
              type="file"
              accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleFile(file);
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={loading}
              className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-surface-border bg-surface-card px-6 py-12 transition-colors hover:border-brand-blue disabled:opacity-70"
            >
              <UploadCloud className="h-10 w-10 text-content-muted" />
              <span className="text-sm font-medium text-content-primary">
                {loading ? "Converting..." : "Upload .docx file"}
              </span>
              {fileName && fileSize !== null && !loading && (
                <span className="text-xs text-content-muted">
                  {fileName} · {formatFileSize(fileSize)}
                </span>
              )}
            </button>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          {previewUrl && (
            <div className="mt-8 space-y-4">
              <div className="overflow-hidden rounded-xl border border-surface-border bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Converted Word document preview"
                  className="max-h-[480px] w-full object-contain object-top"
                />
              </div>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white hover:bg-brand-blue/90"
              >
                <Download className="h-4 w-4" />
                Download JPG
              </button>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-content-secondary">
            For complex documents, save as PDF in Word first, then use our{" "}
            <Link
              href="/tools/pdf-to-jpg"
              className="font-medium text-brand-blue hover:underline"
            >
              PDF to JPG converter
            </Link>
            .
          </p>

          <RelatedTools currentSlug="word-to-jpg" />
          <ToolFeedback toolName="Word to JPG Converter" />
          <ToolSeoContent slug="word-to-jpg" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
