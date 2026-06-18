export const GRADE_POINTS: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
};

export const GRADE_OPTIONS = Object.keys(GRADE_POINTS);

export type GpaCourse = {
  id: string;
  name: string;
  grade: string;
  creditHours: number;
};

export type GpaResult = {
  gpa: number;
  totalCredits: number;
  totalGradePoints: number;
};

export function calculateGpa(courses: GpaCourse[]): GpaResult | null {
  const validCourses = courses.filter(
    (course) =>
      course.creditHours > 0 &&
      Number.isFinite(course.creditHours) &&
      GRADE_POINTS[course.grade] !== undefined,
  );

  if (validCourses.length === 0) return null;

  const totalCredits = validCourses.reduce(
    (sum, course) => sum + course.creditHours,
    0,
  );
  const totalGradePoints = validCourses.reduce(
    (sum, course) => sum + GRADE_POINTS[course.grade] * course.creditHours,
    0,
  );

  if (totalCredits <= 0) return null;

  return {
    gpa: totalGradePoints / totalCredits,
    totalCredits,
    totalGradePoints,
  };
}
