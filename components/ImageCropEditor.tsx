"use client";

import { useCallback, useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Minus, Plus, RotateCcw } from "lucide-react";
import {
  createCroppedImageFile,
  createCroppedPreviewUrl,
} from "@/lib/image-crop";

export type CropAccent = "photo" | "image" | "convert" | "pink";

const accentStyles: Record<
  CropAccent,
  { ring: string; button: string; buttonHover: string; label: string }
> = {
  photo: {
    ring: "ring-tool-photo/40",
    button: "bg-tool-photo hover:bg-[#D97706]",
    buttonHover: "border-tool-photo/40 text-tool-photo",
    label: "text-tool-photo",
  },
  image: {
    ring: "ring-tool-image/40",
    button: "bg-tool-image hover:bg-[#7C3AED]",
    buttonHover: "border-tool-image/40 text-tool-image",
    label: "text-tool-image",
  },
  convert: {
    ring: "ring-tool-convert/40",
    button: "bg-tool-convert hover:bg-[#059669]",
    buttonHover: "border-tool-convert/40 text-tool-convert",
    label: "text-tool-convert",
  },
  pink: {
    ring: "ring-tool-img2pdf/40",
    button: "bg-tool-img2pdf hover:bg-[#DB2777]",
    buttonHover: "border-tool-img2pdf/40 text-tool-img2pdf",
    label: "text-tool-img2pdf",
  },
};

interface ImageCropEditorProps {
  imageSrc: string;
  aspect: number;
  originalFile: File;
  targetLabel?: string;
  accent?: CropAccent;
  onApply: (file: File) => void;
  onCancel: () => void;
}

export function ImageCropEditor({
  imageSrc,
  aspect,
  originalFile,
  targetLabel,
  accent = "photo",
  onApply,
  onCancel,
}: ImageCropEditorProps) {
  const styles = accentStyles[accent];
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
    null
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  useEffect(() => {
    if (!croppedAreaPixels) return;

    let cancelled = false;
    const timeout = window.setTimeout(async () => {
      try {
        const url = await createCroppedPreviewUrl(imageSrc, croppedAreaPixels);
        if (!cancelled) {
          setPreviewUrl((current) => {
            if (current) URL.revokeObjectURL(current);
            return url;
          });
        } else {
          URL.revokeObjectURL(url);
        }
      } catch {
        // Preview is optional; ignore failures.
      }
    }, 150);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [croppedAreaPixels, imageSrc]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleApply = async () => {
    if (!croppedAreaPixels) return;

    setIsApplying(true);
    try {
      const croppedFile = await createCroppedImageFile(
        imageSrc,
        croppedAreaPixels,
        originalFile
      );
      onApply(croppedFile);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="rounded-xl border border-surface-border bg-surface-card p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-content-primary">
            Position your photo
          </h3>
          <p className="mt-1 text-xs text-content-secondary">
            Drag to reposition and zoom so the important area stays inside the
            crop box
            {targetLabel ? ` (${targetLabel})` : ""}.
          </p>
        </div>
        {previewUrl && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-content-muted">Preview</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Crop preview"
              className={`h-14 w-14 rounded-lg border border-surface-border object-cover ring-2 ${styles.ring}`}
            />
          </div>
        )}
      </div>

      <div className="relative h-[280px] w-full max-w-full overflow-hidden rounded-xl bg-surface-elevated sm:h-[360px]">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          objectFit="contain"
          showGrid
          style={{
            containerStyle: {
              background: "#1A2235",
            },
            cropAreaStyle: {
              border: "2px solid rgba(245, 158, 11, 0.9)",
              boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.55)",
            },
          }}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setZoom((value) => Math.max(1, value - 0.1))}
          className="flex items-center gap-1 rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 text-xs text-content-secondary transition-colors hover:border-surface-border hover:text-content-primary"
          aria-label="Zoom out"
        >
          <Minus className="h-3.5 w-3.5" />
          Zoom Out
        </button>
        <button
          type="button"
          onClick={() => setZoom((value) => Math.min(3, value + 0.1))}
          className="flex items-center gap-1 rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 text-xs text-content-secondary transition-colors hover:border-surface-border hover:text-content-primary"
          aria-label="Zoom in"
        >
          <Plus className="h-3.5 w-3.5" />
          Zoom In
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1 rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 text-xs text-content-secondary transition-colors hover:text-content-primary"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Position
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={handleApply}
          disabled={isApplying || !croppedAreaPixels}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-60 ${styles.button}`}
        >
          {isApplying ? "Applying..." : "Apply Crop"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-surface-border px-4 py-3 text-sm text-content-secondary transition-colors hover:text-content-primary"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
