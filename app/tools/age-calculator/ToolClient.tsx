"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Calculator, Sparkles } from "lucide-react";
import { calculateAge, parseDateInput } from "@/lib/age-calculator";

function todayInputValue(): string {
  return new Date().toISOString().split("T")[0];
}

function formatCount(value: number): string {
  return value.toLocaleString("en-IN");
}

const howItWorksSteps = [
  {
    step: "01",
    icon: CalendarDays,
    title: "Enter DOB",
    description: "Select your date of birth",
  },
  {
    step: "02",
    icon: Calculator,
    title: "Calculate",
    description: "See your exact age instantly",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "Use Results",
    description: "Copy details for forms and records",
  },
];

export default function AgeCalculatorPage() {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [asOfDate, setAsOfDate] = useState("");

  const { result, error } = useMemo(() => {
    if (!dateOfBirth) {
      return { result: null, error: null };
    }

    const dob = parseDateInput(dateOfBirth);
    if (!dob) {
      return { result: null, error: "Please enter a valid date of birth." };
    }

    if (asOfDate) {
      const reference = parseDateInput(asOfDate);
      if (!reference) {
        return { result: null, error: "Please enter a valid 'as of' date." };
      }
      const age = calculateAge(dob, reference);
      if (!age) {
        return {
          result: null,
          error: "Date of birth cannot be after the selected date.",
        };
      }
      return { result: age, error: null };
    }

    const age = calculateAge(dob);
    if (!age) {
      return {
        result: null,
        error: "Date of birth cannot be after the selected date.",
      };
    }

    return { result: age, error: null };
  }, [dateOfBirth, asOfDate]);

  const dobMax = asOfDate || todayInputValue();

  const ageCards = result
    ? [
        { label: "Years", value: result.years },
        { label: "Months", value: result.months },
        { label: "Days", value: result.days },
      ]
    : [];

  const birthdayMessage = result
    ? result.isBirthdayToday
      ? "Happy birthday! 🎂"
      : `Your next birthday is in ${formatCount(result.nextBirthdayDays)} day${result.nextBirthdayDays === 1 ? "" : "s"} (on ${result.nextBirthdayDate})`
    : null;

  const expandedStats = result
    ? [
        { label: "Total months", value: `${formatCount(result.totalMonths)} months` },
        { label: "Total weeks", value: `${formatCount(result.totalWeeks)} weeks` },
        { label: "Total days", value: `${formatCount(result.totalDays)} days` },
        {
          label: "Total hours (approx.)",
          value: `${formatCount(result.totalHours)} hours`,
        },
      ]
    : [];

  return (
    <>
<div className="mx-auto mt-10 max-w-md space-y-5">
            <div>
              <label
                htmlFor="dob-input"
                className="mb-2 block text-sm font-medium text-content-primary"
              >
                Date of Birth
              </label>
              <input
                id="dob-input"
                type="date"
                value={dateOfBirth}
                max={dobMax}
                onChange={(event) => setDateOfBirth(event.target.value)}
                aria-label="Date of birth"
                className="w-full cursor-pointer rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-primary outline-none transition-colors focus:border-brand-blue [color-scheme:dark]"
              />
            </div>

            <div>
              <label
                htmlFor="as-of-input"
                className="mb-2 block text-sm font-medium text-content-primary"
              >
                Calculate age as of
              </label>
              <input
                id="as-of-input"
                type="date"
                value={asOfDate}
                onChange={(event) => setAsOfDate(event.target.value)}
                aria-label="Calculate age as of date"
                className="w-full cursor-pointer rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-primary outline-none transition-colors focus:border-brand-blue [color-scheme:dark]"
              />
              <p className="mt-2 text-xs text-content-muted">
                Age on date (for govt exam cutoff, leave blank for today)
              </p>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-center text-sm text-tool-pdf">{error}</p>
          )}

          {result && (
            <div className="mt-10 space-y-6">
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {ageCards.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-xl border border-tool-photo/30 bg-tool-photo/10 p-4 text-center sm:p-5"
                  >
                    <p className="text-3xl font-bold text-content-primary sm:text-4xl">
                      {card.value}
                    </p>
                    <p className="mt-1 text-sm font-medium text-content-secondary">
                      {card.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card px-5 py-4">
                <p className="flex items-center justify-center gap-2 text-center text-sm font-medium text-content-primary">
                  <span aria-hidden="true">🎂</span>
                  {birthdayMessage}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {expandedStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-surface-border bg-surface-card px-4 py-3"
                  >
                    <p className="text-xs text-content-muted">{stat.label}</p>
                    <p className="mt-1 text-sm font-semibold text-content-primary">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-center text-sm text-content-secondary">
                You were born on a{" "}
                <span className="font-medium text-content-primary">
                  {result.birthDayOfWeek}
                </span>
              </p>
            </div>
          )}

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
                  <p className="text-2xl font-bold text-content-muted/40">
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
    </>
  );
}

