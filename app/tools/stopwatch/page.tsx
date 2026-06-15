"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Clock, Flag, Play, RotateCcw, Square } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { formatLapTime, formatStopwatch } from "@/lib/stopwatch";

type Lap = { lapTime: number; totalTime: number };

export default function StopwatchPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);
  const startTimeRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTimeRef.current);
    }, 10);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
      return;
    }
    startTimeRef.current = Date.now() - elapsedTime;
    setIsRunning(true);
  };

  const handleLap = () => {
    if (!isRunning) return;
    const current = Date.now() - startTimeRef.current;
    const prevTotal = laps.length > 0 ? laps[0].totalTime : 0;
    setLaps((prev) => [
      { lapTime: current - prevTotal, totalTime: current },
      ...prev,
    ]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
    startTimeRef.current = 0;
  };

  const lapTimes = laps.map((l) => l.lapTime);
  const fastest =
    lapTimes.length > 0 ? Math.min(...lapTimes) : null;
  const slowest =
    lapTimes.length > 0 ? Math.max(...lapTimes) : null;

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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <Clock className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Stopwatch Online — Free Timer with Laps
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Precise stopwatch with lap timer and centisecond accuracy.
            </p>
          </div>

          <p
            className={`mt-12 text-center font-mono text-6xl font-bold tabular-nums sm:text-7xl ${
              isRunning ? "text-brand-blue" : "text-content-primary"
            }`}
          >
            {formatStopwatch(elapsedTime)}
          </p>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={handleStartStop}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold text-white ${
                isRunning ? "bg-tool-pdf" : "bg-brand-blue"
              }`}
            >
              {isRunning ? (
                <>
                  <Square className="h-5 w-5" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  Start
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleLap}
              disabled={!isRunning}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-card py-3.5 text-base font-semibold text-content-primary transition-colors hover:bg-surface-elevated disabled:opacity-40"
            >
              <Flag className="h-5 w-5" />
              Lap
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isRunning}
              className="flex items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-card px-4 py-3.5 text-content-primary transition-colors hover:bg-surface-elevated disabled:opacity-40"
              aria-label="Reset"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>

          {laps.length > 0 && (
            <div className="mt-8 overflow-hidden rounded-xl border border-surface-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-border bg-surface-card">
                    <th className="px-4 py-2 text-left font-medium text-content-secondary">
                      #
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-content-secondary">
                      Lap Time
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-content-secondary">
                      Total Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {laps.map((lap, index) => {
                    const lapNum = laps.length - index;
                    const isFastest =
                      fastest !== null && lap.lapTime === fastest && laps.length > 1;
                    const isSlowest =
                      slowest !== null && lap.lapTime === slowest && laps.length > 1;
                    return (
                      <tr
                        key={lapNum}
                        className={`border-b border-surface-border last:border-b-0 ${
                          isFastest
                            ? "bg-tool-convert/5"
                            : isSlowest
                              ? "bg-tool-pdf/5"
                              : ""
                        }`}
                      >
                        <td className="px-4 py-2 font-mono text-content-secondary">
                          {lapNum}
                        </td>
                        <td
                          className={`px-4 py-2 font-mono ${
                            isFastest
                              ? "text-tool-convert"
                              : isSlowest
                                ? "text-tool-pdf"
                                : "text-content-primary"
                          }`}
                        >
                          {formatLapTime(lap.lapTime)}
                        </td>
                        <td className="px-4 py-2 font-mono text-content-primary">
                          {formatLapTime(lap.totalTime)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {!isRunning && elapsedTime > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              <div className="rounded-xl border border-surface-border bg-surface-card p-3">
                <p className="text-content-secondary">Total</p>
                <p className="font-mono font-semibold text-content-primary">
                  {formatStopwatch(elapsedTime)}
                </p>
              </div>
              <div className="rounded-xl border border-surface-border bg-surface-card p-3">
                <p className="text-content-secondary">Laps</p>
                <p className="font-semibold text-content-primary">{laps.length}</p>
              </div>
              {fastest !== null && (
                <div className="rounded-xl border border-surface-border bg-surface-card p-3">
                  <p className="text-content-secondary">Fastest</p>
                  <p className="font-mono font-semibold text-tool-convert">
                    {formatLapTime(fastest)}
                  </p>
                </div>
              )}
              {slowest !== null && (
                <div className="rounded-xl border border-surface-border bg-surface-card p-3">
                  <p className="text-content-secondary">Slowest</p>
                  <p className="font-mono font-semibold text-tool-pdf">
                    {formatLapTime(slowest)}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: Play, title: "Start", description: "Click Start to begin timing" },
                { step: "02", icon: Flag, title: "Lap", description: "Record split times with the Lap button" },
                { step: "03", icon: Square, title: "Stop", description: "Click Stop to pause, Reset to clear" },
              ].map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                    <step.icon className="h-5 w-5 text-brand-blue" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="stopwatch" />
          <ToolFeedback toolName="Stopwatch" />
          <ToolSeoContent slug="stopwatch" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
