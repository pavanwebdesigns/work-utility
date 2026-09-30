"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Download, UploadCloud } from "lucide-react";
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
    <>
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
    </>
  );
}

