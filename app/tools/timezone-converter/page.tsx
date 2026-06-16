"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Globe, MapPin, Plus, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  COMMON_TIMEZONES,
  convertTime,
  getCurrentTimeInZone,
  getTimezoneOffset,
} from "@/lib/timezone-converter";

const howItWorksSteps = [
  {
    step: "01",
    icon: Clock,
    title: "Pick Time",
    description: "Select a date and time to convert",
  },
  {
    step: "02",
    icon: MapPin,
    title: "Add Zones",
    description: "Add cities to compare time zones",
  },
  {
    step: "03",
    icon: Globe,
    title: "Compare",
    description: "See converted times and live clocks",
  },
];

function toDatetimeLocalValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function TimezoneConverterPage() {
  const [sourceTime, setSourceTime] = useState(() => new Date());
  const [sourceTz, setSourceTz] = useState("Asia/Kolkata");
  const [targetTzList, setTargetTzList] = useState<string[]>([
    "America/New_York",
    "Europe/London",
  ]);
  const [addTz, setAddTz] = useState("Asia/Tokyo");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDatetimeChange = (value: string) => {
    if (!value) return;
    setSourceTime(new Date(value));
  };

  const addTargetZone = () => {
    if (!targetTzList.includes(addTz)) {
      setTargetTzList([...targetTzList, addTz]);
    }
  };

  const removeTargetZone = (tz: string) => {
    setTargetTzList(targetTzList.filter((t) => t !== tz));
  };

  const getLabel = (tz: string) =>
    COMMON_TIMEZONES.find((z) => z.value === tz)?.label ?? tz;

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

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-photo/10">
              <Globe className="h-6 w-6 text-tool-photo" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Time Zone Converter
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Convert time between time zones and compare multiple cities
              instantly.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="timezone-converter" />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <div className="rounded-xl border border-surface-border bg-surface-card p-5 space-y-4">
              <p className="text-sm font-medium text-content-primary">
                Source Time
              </p>
              <input
                type="datetime-local"
                value={toDatetimeLocalValue(sourceTime)}
                onChange={(e) => handleDatetimeChange(e.target.value)}
                className="w-full rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 text-sm text-content-primary outline-none focus:border-tool-photo"
              />
              <select
                value={sourceTz}
                onChange={(e) => setSourceTz(e.target.value)}
                className="w-full rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 text-sm text-content-primary outline-none focus:border-tool-photo"
              >
                {COMMON_TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setSourceTime(new Date())}
                className="cursor-pointer rounded-lg border border-surface-border bg-surface-elevated px-4 py-2 text-sm font-medium text-content-primary transition-colors hover:border-tool-photo/40"
              >
                Add current time
              </button>
            </div>

            <div className="rounded-xl border border-surface-border bg-surface-card p-5 space-y-4">
              <p className="text-sm font-medium text-content-primary">
                Add Comparison Zone
              </p>
              <div className="flex gap-2">
                <select
                  value={addTz}
                  onChange={(e) => setAddTz(e.target.value)}
                  className="min-w-0 flex-1 rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 text-sm text-content-primary outline-none focus:border-tool-photo"
                >
                  {COMMON_TIMEZONES.filter(
                    (tz) => !targetTzList.includes(tz.value),
                  ).map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={addTargetZone}
                  className="flex shrink-0 cursor-pointer items-center gap-1 rounded-lg bg-tool-photo px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-tool-photo/90"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {targetTzList.map((tz) => (
                  <span
                    key={tz}
                    className="inline-flex items-center gap-1 rounded-full border border-tool-photo/30 bg-tool-photo/10 px-3 py-1 text-xs font-medium text-tool-photo"
                  >
                    {getLabel(tz)}
                    <button
                      type="button"
                      onClick={() => removeTargetZone(tz)}
                      className="cursor-pointer rounded-full p-0.5 hover:bg-tool-photo/20"
                      aria-label={`Remove ${getLabel(tz)}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-xl space-y-3">
            <div className="rounded-xl border border-surface-border bg-surface-card p-5">
              <p className="text-sm font-medium text-content-primary">
                {getLabel(sourceTz)}
              </p>
              <p className="mt-1 text-lg font-semibold text-tool-photo">
                {convertTime(sourceTime, sourceTz)}
              </p>
                <p className="mt-1 text-xs text-content-muted">
                  Live: {getCurrentTimeInZone(sourceTz)}{" "}
                  {getTimezoneOffset(sourceTz)}
                  <span className="sr-only">{now.toISOString()}</span>
                </p>
            </div>

            {targetTzList.map((tz) => (
              <div
                key={tz}
                className="rounded-xl border border-surface-border bg-surface-card p-5"
              >
                <p className="text-sm font-medium text-content-primary">
                  {getLabel(tz)}
                </p>
                <p className="mt-1 text-lg font-semibold text-tool-photo">
                  {convertTime(sourceTime, tz)}
                </p>
                <p className="mt-1 text-xs text-content-muted">
                  Live: {getCurrentTimeInZone(tz)} {getTimezoneOffset(tz)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-photo/10">
                    <step.icon
                      className="h-5 w-5 text-tool-photo"
                      strokeWidth={1.75}
                    />
                  </div>
                  <p className="text-xs font-semibold text-tool-photo">
                    {step.step}
                  </p>
                  <p className="mt-1 font-semibold text-content-primary">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-content-secondary">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="timezone-converter" />
          <ToolFeedback toolName="Time Zone Converter" />
          <ToolSeoContent slug="timezone-converter" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
