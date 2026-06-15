"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Pause, Play, RotateCcw, Settings, Timer } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import {
  DEFAULT_SETTINGS,
  formatTime,
  getModeColor,
  getModeDuration,
  getModeLabel,
  type PomodoroSettings,
  type TimerMode,
} from "@/lib/pomodoro-timer";

const RADIUS = 120;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function playBeep() {
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = 800;
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.5);
}

export default function PomodoroTimerPage() {
  const [mode, setMode] = useState<TimerMode>("work");
  const [settings, setSettings] = useState<PomodoroSettings>(DEFAULT_SETTINGS);
  const [timeLeft, setTimeLeft] = useState(
    getModeDuration("work", DEFAULT_SETTINGS),
  );
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [draftSettings, setDraftSettings] = useState<PomodoroSettings>(
    DEFAULT_SETTINGS,
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const originalTitle = useRef<string>("");
  const sessionsRef = useRef(0);

  const totalDuration = getModeDuration(mode, settings);
  const progress = totalDuration > 0 ? timeLeft / totalDuration : 0;
  const strokeOffset = CIRCUMFERENCE * (1 - progress);
  const modeColor = getModeColor(mode);
  const cyclePosition = sessionsCompleted % settings.sessionsBeforeLong;

  const advanceMode = useCallback(() => {
    playBeep();
    setIsRunning(false);
    setMode((currentMode) => {
      if (currentMode === "work") {
        sessionsRef.current += 1;
        setSessionsCompleted(sessionsRef.current);
        const nextMode: TimerMode =
          sessionsRef.current % settings.sessionsBeforeLong === 0
            ? "long-break"
            : "short-break";
        setTimeLeft(getModeDuration(nextMode, settings));
        return nextMode;
      }
      setTimeLeft(getModeDuration("work", settings));
      return "work";
    });
  }, [settings]);

  const switchMode = (next: TimerMode) => {
    setMode(next);
    setTimeLeft(getModeDuration(next, settings));
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(getModeDuration(mode, settings));
  };

  const saveSettings = () => {
    setSettings(draftSettings);
    setTimeLeft(getModeDuration(mode, draftSettings));
    setShowSettings(false);
  };

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          advanceMode();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, advanceMode]);

  useEffect(() => {
    originalTitle.current = document.title;
    return () => {
      document.title = originalTitle.current;
    };
  }, []);

  useEffect(() => {
    document.title = `${formatTime(timeLeft)} — Pomodoro`;
  }, [timeLeft]);

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-pdf/10">
              <Timer className="h-6 w-6 text-tool-pdf" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Pomodoro Timer — Free Focus Timer Online
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              25-minute focus sessions with short and long breaks to boost productivity.
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {(
              [
                { value: "work" as const, label: "Focus" },
                { value: "short-break" as const, label: "Short Break" },
                { value: "long-break" as const, label: "Long Break" },
              ] as const
            ).map((pill) => (
              <button
                key={pill.value}
                type="button"
                onClick={() => switchMode(pill.value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                  mode === pill.value
                    ? "text-white"
                    : "border border-surface-border bg-surface-card text-content-secondary hover:text-content-primary"
                }`}
                style={
                  mode === pill.value
                    ? { backgroundColor: getModeColor(pill.value) }
                    : undefined
                }
              >
                {pill.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setDraftSettings(settings);
                setShowSettings((s) => !s);
              }}
              className="ml-1 rounded-lg border border-surface-border bg-surface-card p-2 text-content-secondary transition-colors hover:text-content-primary"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>

          {showSettings && (
            <div className="mt-4 rounded-xl border border-surface-border bg-surface-card p-4 space-y-3">
              {(
                [
                  { key: "workDuration" as const, label: "Work (min)" },
                  { key: "shortBreak" as const, label: "Short Break (min)" },
                  { key: "longBreak" as const, label: "Long Break (min)" },
                  {
                    key: "sessionsBeforeLong" as const,
                    label: "Sessions before long break",
                  },
                ] as const
              ).map((field) => (
                <div key={field.key} className="flex items-center justify-between gap-3">
                  <label className="text-sm text-content-secondary">
                    {field.label}
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={draftSettings[field.key]}
                    onChange={(e) =>
                      setDraftSettings((s) => ({
                        ...s,
                        [field.key]: Math.max(1, parseInt(e.target.value, 10) || 1),
                      }))
                    }
                    className="w-20 rounded-lg border border-surface-border bg-surface-base px-2 py-1 text-sm text-content-primary outline-none focus:border-brand-blue"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={saveSettings}
                className="w-full rounded-lg bg-tool-pdf py-2 text-sm font-semibold text-white"
              >
                Save Settings
              </button>
            </div>
          )}

          <div className="relative mx-auto mt-8 flex h-[280px] w-[280px] items-center justify-center">
            <svg className="absolute inset-0 -rotate-90" width="280" height="280">
              <circle
                cx="140"
                cy="140"
                r={RADIUS}
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-surface-border"
              />
              <circle
                cx="140"
                cy="140"
                r={RADIUS}
                fill="none"
                stroke={modeColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeOffset}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="text-center">
              <p className="text-5xl font-bold tabular-nums text-content-primary">
                {formatTime(timeLeft)}
              </p>
              <p className="mt-2 text-sm font-medium text-content-secondary">
                {getModeLabel(mode)}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setIsRunning((r) => !r)}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold text-white transition-opacity"
              style={{ backgroundColor: modeColor }}
            >
              {isRunning ? (
                <>
                  <Pause className="h-5 w-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  {timeLeft < totalDuration ? "Resume" : "Start"}
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

          <div className="mt-8 text-center">
            <p className="mb-3 text-sm text-content-secondary">
              Session {Math.min(cyclePosition + 1, settings.sessionsBeforeLong)} of{" "}
              {settings.sessionsBeforeLong}
            </p>
            <div className="flex justify-center gap-2">
              {Array.from({ length: settings.sessionsBeforeLong }).map((_, i) => (
                <span
                  key={i}
                  className={`h-3 w-3 rounded-full ${
                    i < cyclePosition
                      ? "bg-tool-pdf"
                      : "border border-surface-border bg-surface-card"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: Play, title: "Start", description: "Click Start to begin a 25-minute focus session" },
                { step: "02", icon: Timer, title: "Focus", description: "Work until the timer rings" },
                { step: "03", icon: Pause, title: "Break", description: "Take a short break, then repeat" },
              ].map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-pdf/10">
                    <step.icon className="h-5 w-5 text-tool-pdf" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="pomodoro-timer" />
          <ToolFeedback toolName="Pomodoro Timer" />
          <ToolSeoContent slug="pomodoro-timer" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
