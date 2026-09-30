"use client";

import { useMemo, useState } from "react";
import { ClipboardCopy, Plus, Trash2 } from "lucide-react";
import {
  buildBackgroundProperty,
  buildGradientCss,
  createStopId,
  GRADIENT_PRESETS,
  type ColorStop,
  type GradientType,
} from "@/lib/css-gradient";

const DEFAULT_STOPS: ColorStop[] = [
  { id: createStopId(), color: "#667eea", position: 0 },
  { id: createStopId(), color: "#764ba2", position: 100 },
];

export default function CssGradientPage() {
  const [type, setType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<ColorStop[]>(DEFAULT_STOPS);
  const [copied, setCopied] = useState(false);

  const gradientCss = useMemo(
    () => buildGradientCss(type, angle, stops),
    [angle, stops, type]
  );
  const backgroundProperty = useMemo(
    () => buildBackgroundProperty(type, angle, stops),
    [angle, stops, type]
  );

  const applyPreset = (index: number) => {
    const preset = GRADIENT_PRESETS[index];
    setType(preset.type);
    setAngle(preset.angle);
    setStops(
      preset.stops.map((stop) => ({ ...stop, id: createStopId() }))
    );
  };

  const updateStop = (id: string, patch: Partial<ColorStop>) => {
    setStops((prev) =>
      prev.map((stop) => (stop.id === id ? { ...stop, ...patch } : stop))
    );
  };

  const addStop = () => {
    setStops((prev) => [
      ...prev,
      {
        id: createStopId(),
        color: "#ffffff",
        position: Math.min(100, Math.round(100 / (prev.length + 1))),
      },
    ]);
  };

  const removeStop = (id: string) => {
    setStops((prev) => (prev.length <= 2 ? prev : prev.filter((s) => s.id !== id)));
  };

  const copyCss = async () => {
    await navigator.clipboard.writeText(backgroundProperty);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
<div
            className="mt-10 h-56 w-full rounded-2xl border border-surface-border shadow-inner sm:h-72"
            style={{ background: gradientCss }}
            aria-label="Gradient live preview"
          />

          <div className="mt-8 space-y-5">
            <div>
              <p className="mb-2 text-sm font-medium text-content-primary">
                Gradient type
              </p>
              <div className="flex flex-wrap gap-2">
                {(["linear", "radial", "conic"] as GradientType[]).map(
                  (option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setType(option)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${
                        type === option
                          ? "bg-brand-blue text-white"
                          : "border border-surface-border text-content-primary hover:border-brand-blue"
                      }`}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            </div>

            {(type === "linear" || type === "conic") && (
              <div>
                <label
                  htmlFor="gradient-angle"
                  className="mb-2 block text-sm font-medium text-content-primary"
                >
                  Angle ({angle}°)
                </label>
                <input
                  id="gradient-angle"
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium text-content-primary">
                  Color stops
                </p>
                <button
                  type="button"
                  onClick={addStop}
                  className="inline-flex items-center gap-1 rounded-lg border border-surface-border px-3 py-1.5 text-xs font-medium text-content-primary hover:border-brand-blue"
                >
                  <Plus className="h-3.5 w-3.5" /> Add stop
                </button>
              </div>
              <div className="space-y-3">
                {stops.map((stop) => (
                  <div
                    key={stop.id}
                    className="flex flex-wrap items-center gap-3 rounded-xl border border-surface-border bg-surface-card p-3"
                  >
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) =>
                        updateStop(stop.id, { color: e.target.value })
                      }
                      aria-label={`Color for stop at ${stop.position}%`}
                      className="h-10 w-12 cursor-pointer rounded border border-surface-border bg-transparent"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stop.position}
                      onChange={(e) =>
                        updateStop(stop.id, {
                          position: Number(e.target.value),
                        })
                      }
                      className="min-w-[120px] flex-1"
                      aria-label={`Position for ${stop.color}`}
                    />
                    <span className="w-10 text-sm text-content-secondary">
                      {stop.position}%
                    </span>
                    <button
                      type="button"
                      onClick={() => removeStop(stop.id)}
                      disabled={stops.length <= 2}
                      className="rounded-lg p-2 text-content-secondary hover:text-red-600 disabled:opacity-40"
                      aria-label="Remove color stop"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-content-primary">
                Presets
              </p>
              <div className="flex flex-wrap gap-2">
                {GRADIENT_PRESETS.map((preset, index) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => applyPreset(index)}
                    className="rounded-lg border border-surface-border px-3 py-1.5 text-xs font-medium text-content-primary hover:border-brand-blue"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-surface-border bg-surface-card p-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-content-primary">
                  CSS output
                </p>
                <button
                  type="button"
                  onClick={copyCss}
                  className="inline-flex items-center gap-1 rounded-lg bg-brand-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-blue/90"
                >
                  <ClipboardCopy className="h-3.5 w-3.5" />
                  {copied ? "Copied!" : "Copy CSS"}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-surface-base p-3 text-xs text-content-primary">
                <code>{backgroundProperty}</code>
              </pre>
            </div>
          </div>
    </>
  );
}

