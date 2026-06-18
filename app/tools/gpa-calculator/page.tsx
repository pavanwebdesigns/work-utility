"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  calculateGpa,
  GRADE_OPTIONS,
  type GpaCourse,
} from "@/lib/gpa-calculator";

function createCourse(index: number): GpaCourse {
  return {
    id: `course-${index}`,
    name: `Course ${index}`,
    grade: "B",
    creditHours: 3,
  };
}

export default function GpaCalculatorPage() {
  const [courses, setCourses] = useState<GpaCourse[]>([
    createCourse(1),
    createCourse(2),
    createCourse(3),
  ]);

  const result = useMemo(() => calculateGpa(courses), [courses]);

  const updateCourse = (id: string, updates: Partial<GpaCourse>) => {
    setCourses((current) =>
      current.map((course) =>
        course.id === id ? { ...course, ...updates } : course,
      ),
    );
  };

  const addCourse = () => {
    setCourses((current) => [...current, createCourse(current.length + 1)]);
  };

  const removeCourse = (id: string) => {
    setCourses((current) =>
      current.length > 1 ? current.filter((course) => course.id !== id) : current,
    );
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link href="/" className="text-sm text-content-secondary hover:text-content-primary">
            ← All Tools
          </Link>
        </div>
        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-convert/10">
              <GraduationCap className="h-6 w-6 text-tool-convert" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              GPA Calculator Free — Calculate Your 4.0 Scale GPA
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Add courses with letter grades and credit hours to calculate your weighted GPA on the standard 4.0 scale.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="gpa-calculator" />
            </div>
          </div>

          <div className="mt-10 space-y-4">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="rounded-xl border border-surface-border bg-surface-card p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-content-primary">Course {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeCourse(course.id)}
                    className="rounded-lg p-1.5 text-content-muted hover:bg-surface-base hover:text-red-600"
                    aria-label={`Remove course ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <label className="block sm:col-span-1">
                    <span className="mb-1 block text-xs text-content-muted">Course name</span>
                    <input
                      type="text"
                      value={course.name}
                      onChange={(event) =>
                        updateCourse(course.id, { name: event.target.value })
                      }
                      className="w-full rounded-lg border border-surface-border bg-surface-base px-3 py-2 text-sm text-content-primary"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs text-content-muted">Grade</span>
                    <select
                      value={course.grade}
                      onChange={(event) =>
                        updateCourse(course.id, { grade: event.target.value })
                      }
                      className="w-full rounded-lg border border-surface-border bg-surface-base px-3 py-2 text-sm text-content-primary"
                    >
                      {GRADE_OPTIONS.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs text-content-muted">Credit hours</span>
                    <input
                      type="number"
                      min="0.5"
                      step="0.5"
                      value={course.creditHours}
                      onChange={(event) =>
                        updateCourse(course.id, {
                          creditHours: Number(event.target.value),
                        })
                      }
                      className="w-full rounded-lg border border-surface-border bg-surface-base px-3 py-2 text-sm text-content-primary"
                    />
                  </label>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addCourse}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-surface-border bg-surface-card px-4 py-3 text-sm font-medium text-content-secondary hover:text-content-primary"
            >
              <Plus className="h-4 w-4" />
              Add course
            </button>

            {result && (
              <div className="rounded-xl border border-brand-blue/20 bg-brand-blue/5 p-6 text-center">
                <p className="text-sm text-content-secondary">Weighted GPA</p>
                <p className="mt-1 text-4xl font-bold text-brand-blue">
                  {result.gpa.toFixed(2)}
                </p>
                <p className="mt-2 text-sm text-content-muted">
                  {result.totalCredits} credit hours · {result.totalGradePoints.toFixed(1)} total grade points
                </p>
              </div>
            )}
          </div>

          <RelatedTools currentSlug="gpa-calculator" />
          <ToolFeedback toolName="GPA Calculator" />
          <ToolSeoContent slug="gpa-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
