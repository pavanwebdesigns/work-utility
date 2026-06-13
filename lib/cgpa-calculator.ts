export type CgpaScale = "10" | "4";

export type CgpaToPercentageResult = {
  cgpa: number;
  vtuPercentage: number;
  cbsePercentage: number;
  fourPointPercentage: number;
  grade: string;
};

export type PercentageToCgpaResult = {
  percentage: number;
  vtuCgpa: number;
  cbseCgpa: number;
  fourPointCgpa: number;
  grade: string;
};

export function cgpaToVtuPercentage(cgpa: number): number {
  return cgpa * 9.5;
}

export function cgpaToCbsePercentage(cgpa: number): number {
  return (cgpa - 0.75) * 10;
}

export function cgpaToFourPointPercentage(cgpa: number): number {
  return (cgpa / 4) * 100;
}

export function percentageToVtuCgpa(percentage: number): number {
  return percentage / 9.5;
}

export function percentageToCbseCgpa(percentage: number): number {
  return percentage / 10 + 0.75;
}

export function percentageToFourPointCgpa(percentage: number): number {
  return (percentage / 100) * 4;
}

export function getGradeFromPercentage(percentage: number): string {
  if (percentage >= 90) return "O / A+ (Outstanding)";
  if (percentage >= 80) return "A (Excellent)";
  if (percentage >= 70) return "B+ (Very Good)";
  if (percentage >= 60) return "B (Good)";
  if (percentage >= 50) return "C (Average)";
  if (percentage >= 40) return "D (Pass)";
  return "F (Fail)";
}

export function calculateCgpaToPercentage(
  cgpa: number,
  scale: CgpaScale
): CgpaToPercentageResult | null {
  if (cgpa < 0) return null;
  if (scale === "10" && cgpa > 10) return null;
  if (scale === "4" && cgpa > 4) return null;

  const vtuPercentage =
    scale === "10" ? cgpaToVtuPercentage(cgpa) : cgpaToFourPointPercentage(cgpa);
  const cbsePercentage =
    scale === "10" ? cgpaToCbsePercentage(cgpa) : cgpaToFourPointPercentage(cgpa);
  const fourPointPercentage =
    scale === "10" ? (cgpa / 10) * 100 : cgpaToFourPointPercentage(cgpa);
  const primaryPercentage = scale === "10" ? vtuPercentage : fourPointPercentage;

  return {
    cgpa,
    vtuPercentage,
    cbsePercentage,
    fourPointPercentage,
    grade: getGradeFromPercentage(primaryPercentage),
  };
}

export function calculatePercentageToCgpa(
  percentage: number
): PercentageToCgpaResult | null {
  if (percentage < 0 || percentage > 100) return null;

  return {
    percentage,
    vtuCgpa: percentageToVtuCgpa(percentage),
    cbseCgpa: percentageToCbseCgpa(percentage),
    fourPointCgpa: percentageToFourPointCgpa(percentage),
    grade: getGradeFromPercentage(percentage),
  };
}
