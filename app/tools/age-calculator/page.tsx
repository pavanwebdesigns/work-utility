"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Cake, CalendarDays, Calculator, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { DinoGame } from "@/components/DinoGame";
import { calculateAge, parseDateInput } from "@/lib/age-calculator";

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

  const { result, error } = useMemo(() => {
    if (!dateOfBirth) {
      return { result: null, error: null };
    }

    const dob = parseDateInput(dateOfBirth);
    if (!dob) {
      return { result: null, error: "Please enter a valid date of birth." };
    }

    const age = calculateAge(dob);
    if (!age) {
      return { result: null, error: "Date of birth cannot be in the future." };
    }

    return { result: age, error: null };
  }, [dateOfBirth]);

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
      : `${result.nextBirthdayDays} day${result.nextBirthdayDays === 1 ? "" : "s"} until your next birthday`
    : null;

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex cursor-pointer items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-photo/10">
              <Cake className="h-6 w-6 text-tool-photo" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Age Calculator — Find Your Exact Age Instantly
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Enter your date of birth to get your exact age in years, months,
              and days.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-md">
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
              max={new Date().toISOString().split("T")[0]}
              onChange={(event) => setDateOfBirth(event.target.value)}
              aria-label="Date of birth"
              className="w-full cursor-pointer rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-primary outline-none transition-colors focus:border-brand-blue [color-scheme:dark]"
            />
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
                <p className="flex items-center justify-center gap-2 text-sm font-medium text-content-primary">
                  <span aria-hidden="true">🎂</span>
                  {birthdayMessage}
                </p>
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

          <RelatedTools currentSlug="age-calculator" />
          <ToolFeedback toolName="Age Calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
