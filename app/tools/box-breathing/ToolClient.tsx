"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import {clampPhaseSeconds, DEFAULT_BREATHING_DURATIONS, getNextPhase, getPhaseDuration, getVisualScale, PHASE_LABELS, type BreathingDurations, type BreathingPhase} from "@/lib/box-breathing";

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
    <>
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
    </>
  );
}

