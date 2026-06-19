"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Download, Mic, Pause, Play, Square, Trash2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";

type RecordingStatus = "idle" | "recording" | "paused";
type RecordingSession = {
  id: string;
  blob: Blob;
  url: string;
  durationMs: number;
  createdAt: Date;
};

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getSupportedMimeType(): string | null {
  const types = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/ogg;codecs=opus",
  ];
  for (const type of types) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  return null;
}

export default function AudioRecorderPage() {
  const [status, setStatus] = useState<RecordingStatus>("idle");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [sessions, setSessions] = useState<RecordingSession[]>([]);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);
  const accumulatedRef = useRef(0);
  const finalDurationRef = useRef(0);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    stopTimer();
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setElapsedMs(accumulatedRef.current + (Date.now() - startTimeRef.current));
    }, 100);
  };

  const releaseStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  useEffect(() => {
    return () => {
      stopTimer();
      releaseStream();
      sessions.forEach((session) => URL.revokeObjectURL(session.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStart = async () => {
    setError(null);

    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setError("Your browser does not support microphone recording.");
      return;
    }

    const mimeType = getSupportedMimeType();
    if (!mimeType) {
      setError("WebM audio recording is not supported in this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const session: RecordingSession = {
          id: crypto.randomUUID(),
          blob,
          url,
          durationMs: finalDurationRef.current,
          createdAt: new Date(),
        };
        setSessions((prev) => [session, ...prev]);
        chunksRef.current = [];
        releaseStream();
        mediaRecorderRef.current = null;
        stopTimer();
        setStatus("idle");
        setElapsedMs(0);
        accumulatedRef.current = 0;
      };

      recorder.start(250);
      accumulatedRef.current = 0;
      setElapsedMs(0);
      setStatus("recording");
      startTimer();
    } catch {
      releaseStream();
      setError(
        "Microphone access was denied or no microphone was found. Check browser permissions and try again.",
      );
    }
  };

  const handlePauseResume = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;

    if (status === "recording") {
      recorder.pause();
      accumulatedRef.current += Date.now() - startTimeRef.current;
      stopTimer();
      setStatus("paused");
      return;
    }

    if (status === "paused") {
      recorder.resume();
      startTimer();
      setStatus("recording");
    }
  };

  const handleStop = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      if (status === "recording") {
        finalDurationRef.current =
          accumulatedRef.current + (Date.now() - startTimeRef.current);
      } else {
        finalDurationRef.current = accumulatedRef.current;
      }
      recorder.stop();
    }
  };

  const handleDownload = (session: RecordingSession) => {
    const link = document.createElement("a");
    link.href = session.url;
    link.download = `recording-${session.createdAt.toISOString().slice(0, 19).replace(/[:T]/g, "-")}.webm`;
    link.click();
  };

  const handleClearSessions = () => {
    sessions.forEach((session) => URL.revokeObjectURL(session.url));
    setSessions([]);
  };

  const isActive = status === "recording" || status === "paused";

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

        <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <Mic className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Online Audio Recorder Free — Record from Browser
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Record audio from your microphone, pause and resume as needed, then
              download sessions as WebM files.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="audio-recorder" />
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <div className="rounded-xl border border-surface-border bg-surface-card p-8 text-center">
              <div className="flex items-center justify-center gap-3">
                {status === "recording" && (
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600" />
                  </span>
                )}
                <p className="text-5xl font-bold tabular-nums text-content-primary">
                  {formatDuration(elapsedMs)}
                </p>
              </div>
              <p className="mt-2 text-sm capitalize text-content-secondary">
                {status === "idle" ? "Ready to record" : status}
              </p>
            </div>

            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              {!isActive ? (
                <button
                  type="button"
                  onClick={handleStart}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-blue py-3.5 text-base font-semibold text-white hover:bg-brand-blue/90"
                >
                  <Mic className="h-5 w-5" />
                  Start Recording
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handlePauseResume}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-card py-3.5 text-base font-semibold text-content-primary hover:border-brand-blue"
                  >
                    {status === "recording" ? (
                      <>
                        <Pause className="h-5 w-5" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" />
                        Resume
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleStop}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-base font-semibold text-white hover:bg-red-700"
                  >
                    <Square className="h-5 w-5" />
                    Stop
                  </button>
                </>
              )}
            </div>

            <p className="text-center text-xs text-content-muted">
              Recordings are saved as WebM only. Audio stays in your browser until
              you download it.
            </p>

            {sessions.length > 0 && (
              <div className="rounded-xl border border-surface-border bg-surface-card p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-content-primary">
                    Recordings ({sessions.length})
                  </p>
                  <button
                    type="button"
                    onClick={handleClearSessions}
                    className="flex items-center gap-1 text-xs text-content-muted transition-colors hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Clear all
                  </button>
                </div>
                <ul className="space-y-3">
                  {sessions.map((session) => (
                    <li
                      key={session.id}
                      className="rounded-lg border border-surface-border bg-surface-base p-3"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-content-primary">
                            {session.createdAt.toLocaleString()}
                          </p>
                          <p className="text-xs text-content-muted">
                            {formatDuration(session.durationMs)} · WebM
                          </p>
                          <audio
                            controls
                            src={session.url}
                            className="mt-2 w-full"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDownload(session)}
                          className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue/90"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <RelatedTools currentSlug="audio-recorder" />
          <ToolFeedback toolName="Audio Recorder" />
          <ToolSeoContent slug="audio-recorder" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
