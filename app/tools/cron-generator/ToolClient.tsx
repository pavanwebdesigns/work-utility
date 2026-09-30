"use client";

import { useMemo, useState } from "react";
import { ClipboardPaste } from "lucide-react";
import {
  CRON_PRESETS,
  DEFAULT_CRON_FIELDS,
  describeCron,
  fieldsToExpression,
  formatCronRunDate,
  getNextCronRuns,
  parseCronExpression,
  type CronFields,
} from "@/lib/cron-generator";

const FIELD_LABELS: { key: keyof CronFields; label: string; hint: string }[] = [
  { key: "minute", label: "Minute", hint: "0–59, *, */5" },
  { key: "hour", label: "Hour", hint: "0–23, *" },
  { key: "dayOfMonth", label: "Day (month)", hint: "1–31, *" },
  { key: "month", label: "Month", hint: "1–12, *" },
  { key: "dayOfWeek", label: "Day (week)", hint: "0–7, 1-5" },
];

export default function CronGeneratorPage() {
  const [fields, setFields] = useState<CronFields>(DEFAULT_CRON_FIELDS);
  const [pasteInput, setPasteInput] = useState("");
  const [parseError, setParseError] = useState<string | null>(null);

  const expression = useMemo(() => fieldsToExpression(fields), [fields]);
  const description = useMemo(() => describeCron(fields), [fields]);
  const nextRuns = useMemo(() => getNextCronRuns(fields, 5), [fields]);

  const updateField = (key: keyof CronFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (presetFields: CronFields) => {
    setFields({ ...presetFields });
    setParseError(null);
  };

  const handlePasteParse = () => {
    const parsed = parseCronExpression(pasteInput);
    if (!parsed) {
      setParseError("Invalid cron expression. Use five space-separated fields.");
      return;
    }
    setFields(parsed);
    setParseError(null);
  };

  return (
    <>
<div className="mt-10 space-y-6">
            <div className="flex flex-wrap gap-2">
              {CRON_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset.fields)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                    expression === preset.expression
                      ? "border-brand-blue bg-brand-blue/10 text-brand-blue"
                      : "border-surface-border bg-surface-card text-content-secondary hover:text-content-primary"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-surface-border bg-surface-card p-4">
              <p className="mb-3 text-sm font-medium text-content-primary">
                Cron fields
              </p>
              <div className="grid gap-3 sm:grid-cols-5">
                {FIELD_LABELS.map((field) => (
                  <label key={field.key} className="block">
                    <span className="mb-1 block text-xs font-medium text-content-secondary">
                      {field.label}
                    </span>
                    <input
                      type="text"
                      value={fields[field.key]}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      className="w-full rounded-lg border border-surface-border bg-surface-base px-2 py-1.5 font-mono text-sm text-content-primary outline-none focus:border-brand-blue"
                    />
                    <span className="mt-1 block text-[10px] text-content-muted">
                      {field.hint}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/5 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-content-muted">
                Expression
              </p>
              <p className="mt-1 font-mono text-lg font-semibold text-content-primary">
                {expression}
              </p>
              <p className="mt-2 text-sm text-content-secondary">{description}</p>
            </div>

            <div className="rounded-xl border border-surface-border bg-surface-card p-4">
              <p className="mb-3 text-sm font-medium text-content-primary">
                Next 5 runs
              </p>
              {nextRuns.length > 0 ? (
                <ul className="space-y-2">
                  {nextRuns.map((run) => (
                    <li
                      key={run.toISOString()}
                      className="rounded-lg bg-surface-base px-3 py-2 text-sm text-content-secondary"
                    >
                      {formatCronRunDate(run)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-content-muted">
                  No upcoming runs found for this expression.
                </p>
              )}
            </div>

            <div className="rounded-xl border border-surface-border bg-surface-card p-4">
              <p className="mb-3 flex items-center gap-2 text-sm font-medium text-content-primary">
                <ClipboardPaste className="h-4 w-4 text-brand-blue" />
                Paste to parse
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={pasteInput}
                  onChange={(e) => setPasteInput(e.target.value)}
                  placeholder="0 9 * * 1-5"
                  className="flex-1 rounded-lg border border-surface-border bg-surface-base px-3 py-2 font-mono text-sm text-content-primary outline-none focus:border-brand-blue"
                />
                <button
                  type="button"
                  onClick={handlePasteParse}
                  className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue/90"
                >
                  Parse
                </button>
              </div>
              {parseError && (
                <p className="mt-2 text-sm text-red-600">{parseError}</p>
              )}
            </div>
          </div>
    </>
  );
}

