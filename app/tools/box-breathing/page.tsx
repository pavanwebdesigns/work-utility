"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Pause, Play, RotateCcw, Wind } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  clampPhaseSeconds,
  DEFAULT_BREATHING_DURATIONS,
  getNextPhase,
  getPhaseDuration,
  getVisualScale,
  PHASE_LABELS,
  type BreathingDurations,
  type BreathingPhase,
} from "@/lib/box-breathing";

const PRESET_478: BreathingDurations = {
  inhale: 4,
  hold1: 7,
  exhale: 8,
  hold2: 4,
};

export default function BoxBreathingPage() {
  const [durations, setDurations] = useState<BreathingDurations>(
    DEFAULT_BREATHING_DURATIONS,
  );
  const [phase, setPhase] = useState<BreathingPhase>("inhale");
  const [secondsLeft, setSecondsLeft] = useState(
    DEFAULT_BREATHING_DURATIONS.inhale,
  );
  const [isRunning, setIsRunning] = useState(false);
  const [rounds, setRounds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const durationsRef = useRef(durations);

  useEffect(() => {
    durationsRef.current = durations;
  }, [durations]);

  const phaseDuration = getPhaseDuration(phase, durations);
  const scale = getVisualScale(phase, secondsLeft, phaseDuration);

  const advancePhase = useCallback(() => {
    setPhase((current) => {
      const next = getNextPhase(current);
      if (current === "hold2") {
        setRounds((r) => r + 1);
      }
      setSecondsLeft(getPhaseDuration(next, durationsRef.current));
      return next;
    });
  }, []);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          advancePhase();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, advancePhase]);

  const handleReset = () => {
    setIsRunning(false);
    setPhase("inhale");
    setSecondsLeft(durations.inhale);
    setRounds(0);
  };

  const updateDuration = (key: keyof BreathingDurations, value: number) => {
    const clamped = clampPhaseSeconds(value);
    setDurations((prev) => {
      const next = { ...prev, [key]: clamped };
      if (!isRunning && phase === key) {
        setSecondsLeft(clamped);
      }
      return next;
    });
  };

  const applyPreset478 = () => {
    setDurations(PRESET_478);
    if (!isRunning) {
      setPhase("inhale");
      setSecondsLeft(PRESET_478.inhale);
    }
  };

  const durationFields: { key: keyof BreathingDurations; label: string }[] = [
    { key: "inhale", label: "Inhale (s)" },
    { key: "hold1", label: "Hold (s)" },
    { key: "exhale", label: "Exhale (s)" },
    { key: "hold2", label: "Hold (s)" },
  ];

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

        <div className="mx-auto max-w-xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <Wind className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Box Breathing Timer Online — 4-4-4-4 Guided Exercise
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Follow the animated square through inhale, hold, exhale, and hold
              phases. Adjust timing or try the 4-7-8 preset.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="box-breathing" />
            </div>
          </div>

          <div className="relative mx-auto mt-10 flex h-[260px] w-[260px] items-center justify-center">
            <div
              className="absolute rounded-2xl border-2 border-brand-blue/40 bg-brand-blue/10 transition-transform duration-1000 ease-in-out"
              style={{
                width: 160,
                height: 160,
                transform: `scale(${scale})`,
              }}
            />
            <div
              className="relative flex h-[160px] w-[160px] items-center justify-center rounded-2xl border-2 border-brand-blue bg-surface-card shadow-sm transition-transform duration-1000 ease-in-out"
              style={{ transform: `scale(${scale})` }}
            >
              <div className="text-center">
                <p className="text-4xl font-bold tabular-nums text-content-primary">
                  {secondsLeft}
                </p>
                <p className="mt-1 text-sm font-medium text-brand-blue">
                  {PHASE_LABELS[phase]}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-content-secondary">
            Round {rounds} completed
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setIsRunning((r) => !r)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue py-3.5 text-base font-semibold text-white transition-opacity hover:bg-brand-blue/90"
            >
              {isRunning ? (
                <>
                  <Pause className="h-5 w-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  {secondsLeft < phaseDuration ? "Resume" : "Start"}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-card py-3 text-sm font-semibold text-content-primary transition-colors hover:bg-surface-elevated"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>

          <div className="mt-8 rounded-xl border border-surface-border bg-surface-card p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-content-primary">
                Phase timing (3–8 seconds)
              </p>
              <button
                type="button"
                onClick={applyPreset478}
                className="rounded-lg border border-brand-blue/30 bg-brand-blue/10 px-3 py-1.5 text-xs font-semibold text-brand-blue transition-colors hover:bg-brand-blue/20"
              >
                4-7-8 preset
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {durationFields.map((field) => (
                <label key={field.key} className="block">
                  <span className="mb-1 block text-xs text-content-muted">
                    {field.label}
                  </span>
                  <input
                    type="number"
                    min={3}
                    max={8}
                    value={durations[field.key]}
                    onChange={(e) =>
                      updateDuration(field.key, Number(e.target.value))
                    }
                    className="w-full rounded-lg border border-surface-border bg-surface-base px-2 py-1.5 text-sm text-content-primary outline-none focus:border-brand-blue"
                  />
                </label>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="box-breathing" />
          <ToolFeedback toolName="Box Breathing Timer" />
          <ToolSeoContent slug="box-breathing" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
